import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

/**
 * Demo validation tests.
 *
 * These tests read *Demo.svelte source files and validate that:
 * 1. Glass sections mentioning frost/blur have components with frosted prop
 * 2. Glass prop values in demos are valid schema options
 * 3. At least one demo shows glass stacking (Card > Button/Input)
 * 4. Schema examples don't use old/invalid glass values
 */

const DEMOS_DIR = path.resolve(__dirname, '../../../src/components');
const SCHEMAS_DIR = path.resolve(__dirname);

// Valid glass density values (from the schema)
const VALID_GLASS_VALUES = ['ultra-thin', 'thin', 'normal', 'thick', 'ultra-thick'];
// Old values that should no longer appear
const OLD_GLASS_VALUES = ['subtle', 'frosted', 'heavy'];

// All demo files with glass sections
const GLASS_DEMO_FILES = [
  'ButtonDemo.svelte',
  'CardDemo.svelte',
  'InputDemo.svelte',
  'TextareaDemo.svelte',
  'BadgeDemo.svelte',
  'AlertDemo.svelte',
  'ToggleDemo.svelte',
];

function readFile(dir: string, file: string): string {
  return fs.readFileSync(path.join(dir, file), 'utf-8');
}

/**
 * Extract DemoSection blocks from a Svelte file.
 * Returns array of { description, content } for sections with glass prop.
 */
function extractGlassDemoSections(source: string): { description: string; content: string }[] {
  const sections: { description: string; content: string }[] = [];
  // Match <DemoSection ... glass ...> blocks
  // DemoSection blocks end at the next </DemoSection>
  const regex = /<DemoSection[^>]*\bglass\b[^>]*>/g;
  let match;
  while ((match = regex.exec(source)) !== null) {
    const startTag = match[0];
    const startPos = match.index;

    // Extract description from the tag
    const descMatch = startTag.match(/description="([^"]*)"/);
    const description = descMatch ? descMatch[1] : '';

    // Find the closing </DemoSection>
    const endTag = '</DemoSection>';
    const endPos = source.indexOf(endTag, startPos);
    if (endPos === -1) continue;

    const content = source.slice(startPos, endPos + endTag.length);
    sections.push({ description, content });
  }
  return sections;
}

// ---------------------------------------------------------------------------
// Test 1: Glass sections mentioning frost/blur must have frosted prop
// ---------------------------------------------------------------------------

describe('Demo glass/frosted consistency', () => {
  for (const file of GLASS_DEMO_FILES) {
    const name = file.replace('Demo.svelte', '');
    const source = readFile(DEMOS_DIR, file);
    const sections = extractGlassDemoSections(source);

    for (const section of sections) {
      if (/frost|blur|backdrop/i.test(section.description)) {
        it(`${name}: section "${section.description.slice(0, 50)}..." has frosted prop`, () => {
          expect(
            section.content,
            `DemoSection describes frost/blur but no component has frosted prop.\n` +
            `Description: "${section.description}"\n` +
            `Fix: add frosted to glass components in this section.`,
          ).toMatch(/\bfrosted\b/);
        });
      }
    }
  }
});

// ---------------------------------------------------------------------------
// Test 2: Glass prop values in demos are valid
// ---------------------------------------------------------------------------

describe('Demo glass prop values are valid', () => {
  const allDemoFiles = fs.readdirSync(DEMOS_DIR).filter(f => f.endsWith('Demo.svelte'));

  for (const file of allDemoFiles) {
    const name = file.replace('Demo.svelte', '');
    const source = readFile(DEMOS_DIR, file);

    it(`${name}: no old glass values (subtle/frosted/heavy)`, () => {
      // Match glass="value" patterns -- but not inside description strings or text content
      const glassValuePattern = /\bglass="([^"]+)"/g;
      let match;
      const invalidValues: string[] = [];
      while ((match = glassValuePattern.exec(source)) !== null) {
        const value = match[1];
        if (OLD_GLASS_VALUES.includes(value)) {
          invalidValues.push(value);
        }
      }
      expect(
        invalidValues,
        `${name} uses old glass values: ${invalidValues.join(', ')}. ` +
        `Valid values: ${VALID_GLASS_VALUES.join(', ')}`,
      ).toHaveLength(0);
    });

    it(`${name}: glass prop values are from valid set`, () => {
      const glassValuePattern = /\bglass="([^"]+)"/g;
      let match;
      const invalidValues: string[] = [];
      while ((match = glassValuePattern.exec(source)) !== null) {
        const value = match[1];
        if (!VALID_GLASS_VALUES.includes(value)) {
          invalidValues.push(value);
        }
      }
      expect(
        invalidValues,
        `${name} uses invalid glass values: ${invalidValues.join(', ')}. ` +
        `Valid values: ${VALID_GLASS_VALUES.join(', ')}`,
      ).toHaveLength(0);
    });
  }
});

// ---------------------------------------------------------------------------
// Test 3: At least one demo has glass stacking (Card > Button/Input)
// ---------------------------------------------------------------------------

describe('Demo stacking coverage', () => {
  it('at least one demo shows glass Card with interactive children', () => {
    let hasStacking = false;
    const allDemoFiles = fs.readdirSync(DEMOS_DIR).filter(f => f.endsWith('Demo.svelte'));

    for (const file of allDemoFiles) {
      const source = readFile(DEMOS_DIR, file);
      const sections = extractGlassDemoSections(source);

      for (const section of sections) {
        // Look for a Card with glass that contains a Button, Input, or Toggle
        const cardGlassPattern = /<Card[^>]*\bglass\b/;
        const hasGlassCard = cardGlassPattern.test(section.content);
        const hasInteractiveChild = /<(Button|Input|Toggle)\b/.test(section.content);
        if (hasGlassCard && hasInteractiveChild) {
          hasStacking = true;
        }
      }
    }

    expect(
      hasStacking,
      'No demo shows glass stacking (Card with glass containing Button/Input/Toggle). ' +
      'Add a stacking demo to CardDemo.svelte.',
    ).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// Test 4: Schema examples don't use old glass values
// ---------------------------------------------------------------------------

describe('Schema examples use valid glass values', () => {
  const SCHEMAS = [
    'button/schema.ts',
    'card/schema.ts',
    'badge/schema.ts',
    'alert/schema.ts',
    'input/schema.ts',
    'textarea/schema.ts',
    'toggle/schema.ts',
  ];

  for (const schema of SCHEMAS) {
    const name = schema.split('/')[0];
    const source = readFile(SCHEMAS_DIR, schema);

    it(`${name} schema examples have no old glass values`, () => {
      // Extract example code strings
      const codePattern = /code:\s*'([^']+)'/g;
      let match;
      const oldValues: string[] = [];
      while ((match = codePattern.exec(source)) !== null) {
        const code = match[1];
        for (const old of OLD_GLASS_VALUES) {
          // Check for glass="old_value" in example code
          if (code.includes(`glass="${old}"`) || code.includes(`glass='${old}'`)) {
            oldValues.push(`glass="${old}" in example: ${code.slice(0, 60)}`);
          }
        }
      }
      expect(
        oldValues,
        `${name} schema has old glass values in examples: ${oldValues.join('; ')}`,
      ).toHaveLength(0);
    });
  }
});

// ---------------------------------------------------------------------------
// Test 5: CSS class coverage -- every glass class referenced in TS exists in CSS
// ---------------------------------------------------------------------------

describe('Glass CSS class coverage', () => {
  const GLASS_CSS = path.resolve(__dirname, '../theme/glass.css');
  const STYLES_TS = path.resolve(__dirname, '../interactions/styles.ts');
  const GLOW_TS = path.resolve(__dirname, '../interactions/glow.ts');

  it('all glass/frost/glow classes referenced in styles.ts exist in glass.css', () => {
    const css = fs.readFileSync(GLASS_CSS, 'utf8');
    const stylesTs = fs.readFileSync(STYLES_TS, 'utf8');
    const glowTs = fs.readFileSync(GLOW_TS, 'utf8');

    // Extract class names defined in CSS
    const definedClasses = new Set<string>();
    const cssClassPattern = /\.(glass-[a-z_-]+|frost-[a-z_-]+|glow-[a-z_-]+)\b/g;
    let match;
    while ((match = cssClassPattern.exec(css)) !== null) {
      definedClasses.add(match[1]);
    }

    // Extract class names referenced in TS as string literals
    const referencedClasses = new Set<string>();
    const tsClassPattern = /['"`](glass-[a-z_-]+|frost-[a-z_-]+|glow-[a-z_-]+)['"`]/g;
    const tsSource = stylesTs + '\n' + glowTs;
    while ((match = tsClassPattern.exec(tsSource)) !== null) {
      referencedClasses.add(match[1]);
    }

    const orphans = [...referencedClasses].filter(c => !definedClasses.has(c));
    expect(
      orphans,
      `CSS classes referenced in TS but not defined in glass.css: ${orphans.join(', ')}`,
    ).toHaveLength(0);
  });
});
