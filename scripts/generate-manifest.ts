import { writeFileSync, readdirSync, existsSync, readFileSync } from 'fs';
import { join } from 'path';

const LIB_DIR = join(process.cwd(), 'src/lib/components');
const OUT_FILE = join(process.cwd(), 'public/components-manifest.json');

async function generate() {
  const components = [];
  const dirs = readdirSync(LIB_DIR, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  for (const dir of dirs) {
    const schemaPath = join(LIB_DIR, dir, 'schema.ts');
    if (existsSync(schemaPath)) {
      try {
        const content = readFileSync(schemaPath, 'utf-8');
        const nameMatch = content.match(/name:\s*['"]([^'"]+)['"]/);
        const descMatch = content.match(/description:\s*['"]([^'"]+)['"]/);
        
        if (nameMatch) {
           components.push({
             name: nameMatch[1],
             dir: dir,
             description: descMatch ? descMatch[1] : '',
             path: `src/lib/components/${dir}`
           });
        }
      } catch (e) {
        console.error(`Failed to parse schema for ${dir}`, e);
      }
    }
  }

  const manifest = {
    version: "1.0.0",
    generatedAt: new Date().toISOString(),
    components
  };

  writeFileSync(OUT_FILE, JSON.stringify(manifest, null, 2));
  console.log(`✅ Generated manifest with ${components.length} components to ${OUT_FILE}`);
}

generate();
