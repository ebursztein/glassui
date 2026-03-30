#!/usr/bin/env node
/**
 * Reads all schema.ts files from src/lib/components/
 * and generates Claude Code skills in .claude/skills/
 *
 * Uses a simple line-by-line parser that handles nested quotes.
 */
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const COMPONENTS_DIR = path.join(ROOT, 'src/lib/components');
const SKILLS_DIR = path.join(ROOT, '.claude/skills');

interface PropMeta {
  name: string;
  type: string;
  default?: string;
  description: string;
  options?: string[];
}

interface ComponentMeta {
  name: string;
  category: string;
  description: string;
  props: PropMeta[];
  examples: Array<{ title: string; code: string }>;
  import: string;
}

/** Extract a string value after a key in the source */
function extractString(source: string, key: string): string | undefined {
  // Try single quotes first (meta values typically use single quotes)
  const sqRegex = new RegExp(`${key}:\\s*'([^']*)'`);
  const sqMatch = source.match(sqRegex);
  if (sqMatch) return sqMatch[1];

  // Fall back to double quotes
  const dqRegex = new RegExp(`${key}:\\s*"([^"]*)"`);
  const dqMatch = source.match(dqRegex);
  if (dqMatch) return dqMatch[1];

  return undefined;
}

/** Parse the meta object from schema.ts */
function parseMeta(source: string): ComponentMeta | null {
  const name = extractString(source, 'name');
  if (!name) return null;

  const category = extractString(source, 'category') ?? 'unknown';
  const description = extractString(source, 'description') ?? '';

  // Extract import — it uses double quotes wrapping single-quoted import
  const importMatch = source.match(/import:\s*"([^"]*)"/);
  const importStr = importMatch?.[1] ?? '';

  // Extract props array — find each { name: ... } block
  const props: PropMeta[] = [];
  // Match entire prop objects one at a time
  const propsSection = source.match(/props:\s*\[([\s\S]*?)\],/);
  if (propsSection) {
    const propsStr = propsSection[1];
    // Split on }, { boundaries
    const propBlocks = propsStr.split(/\}\s*,\s*\{/).map((b) => b.replace(/^\s*\{|\}\s*$/g, ''));
    for (const block of propBlocks) {
      const pName = block.match(/name:\s*'([^']+)'/)?.[1];
      const pDesc = block.match(/description:\s*'([^']+)'/)?.[1];
      // Type can use double quotes to wrap single-quoted union types
      const pType = block.match(/type:\s*'([^']+)'/)?.[1] ?? block.match(/type:\s*"([^"]+)"/)?.[1];
      const pDefault = block.match(/default:\s*'([^']*)'/)?.[1];
      const pOptions = block.match(/options:\s*\[([^\]]+)\]/)?.[1]
        ?.split(',')
        .map((s) => s.trim().replace(/['"]/g, ''));

      if (pName && pDesc) {
        props.push({
          name: pName,
          type: pType ?? 'unknown',
          default: pDefault,
          description: pDesc,
          options: pOptions,
        });
      }
    }
  }

  // Extract examples
  const examples: Array<{ title: string; code: string }> = [];
  const exSection = source.match(/examples:\s*\[([\s\S]*?)\],/);
  if (exSection) {
    const exStr = exSection[1];
    const exBlocks = exStr.split(/\}\s*,\s*\{/).map((b) => b.replace(/^\s*\{|\}\s*$/g, ''));
    for (const block of exBlocks) {
      const title = block.match(/title:\s*'([^']+)'/)?.[1];
      const code = block.match(/code:\s*'([^']+)'/)?.[1];
      if (title && code) {
        examples.push({ title, code });
      }
    }
  }

  return { name, category, description, props, examples, import: importStr };
}

/** Generate skill markdown */
function generateSkill(meta: ComponentMeta, svelteSource: string): string {
  const lines: string[] = [];
  lines.push(`# ${meta.name}\n`);
  lines.push(`${meta.description}\n`);

  lines.push(`## Import\n`);
  lines.push('```ts');
  lines.push(meta.import);
  lines.push('```\n');

  if (meta.props.length > 0) {
    lines.push(`## Props\n`);
    lines.push('| Prop | Type | Default | Description |');
    lines.push('|------|------|---------|-------------|');
    for (const p of meta.props) {
      lines.push(`| ${p.name} | \`${p.type}\` | ${p.default ? `\`${p.default}\`` : '—'} | ${p.description} |`);
    }
    lines.push('');
  }

  if (meta.examples.length > 0) {
    lines.push(`## Examples\n`);
    for (const ex of meta.examples) {
      lines.push(`### ${ex.title}\n`);
      lines.push('```svelte');
      lines.push(ex.code);
      lines.push('```\n');
    }
  }

  lines.push(`## Full Source\n`);
  lines.push('```svelte');
  lines.push(svelteSource.trim());
  lines.push('```');

  return lines.join('\n');
}

function main() {
  fs.mkdirSync(SKILLS_DIR, { recursive: true });

  // Clean existing
  const existing = fs.readdirSync(SKILLS_DIR).filter((f) => f.endsWith('.md'));
  for (const f of existing) fs.unlinkSync(path.join(SKILLS_DIR, f));

  if (!fs.existsSync(COMPONENTS_DIR)) {
    console.log('No components directory found');
    return;
  }

  const categories = fs.readdirSync(COMPONENTS_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory());

  let count = 0;
  for (const cat of categories) {
    const catDir = path.join(COMPONENTS_DIR, cat.name);
    const schemaPath = path.join(catDir, 'schema.ts');
    if (!fs.existsSync(schemaPath)) continue;

    const schemaSource = fs.readFileSync(schemaPath, 'utf-8');
    const meta = parseMeta(schemaSource);
    if (!meta) continue;

    const svelteFiles = fs.readdirSync(catDir).filter((f) => f.endsWith('.svelte'));
    const svelteSource = svelteFiles
      .map((f) => fs.readFileSync(path.join(catDir, f), 'utf-8'))
      .join('\n');

    const skill = generateSkill(meta, svelteSource);
    const skillName = meta.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
    fs.writeFileSync(path.join(SKILLS_DIR, `${skillName}.md`), skill);
    console.log(`Generated: .claude/skills/${skillName}.md`);
    count++;
  }

  console.log(`\nGenerated ${count} skill(s)`);
}

main();
