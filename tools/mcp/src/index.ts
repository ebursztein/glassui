#!/usr/bin/env node
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import * as fs from 'fs';
import * as path from 'path';

// Resolve the components directory relative to this file
const COMPONENTS_DIR = path.resolve(import.meta.dirname, '../../../src/lib/components');

interface ComponentInfo {
  name: string;
  category: string;
  description: string;
  since: string;
  props: Array<{
    name: string;
    type: string;
    default?: string;
    description: string;
    options?: string[];
  }>;
  examples: Array<{ title: string; code: string }>;
  import: string;
  source: string;
}

/** Scan the components directory and discover all components with meta */
function discoverComponents(): ComponentInfo[] {
  const components: ComponentInfo[] = [];

  if (!fs.existsSync(COMPONENTS_DIR)) return components;

  const categories = fs.readdirSync(COMPONENTS_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory());

  for (const category of categories) {
    const catDir = path.join(COMPONENTS_DIR, category.name);
    const schemaPath = path.join(catDir, 'schema.ts');

    if (!fs.existsSync(schemaPath)) continue;

    // Read schema.ts to extract the meta object
    const schemaSource = fs.readFileSync(schemaPath, 'utf-8');
    const meta = extractMeta(schemaSource);
    if (!meta) continue;

    // Find the .svelte files for source code
    const svelteFiles = fs.readdirSync(catDir).filter((f) => f.endsWith('.svelte'));
    const sources: string[] = [];
    for (const sf of svelteFiles) {
      sources.push(fs.readFileSync(path.join(catDir, sf), 'utf-8'));
    }

    components.push({
      ...meta,
      source: sources.join('\n\n---\n\n'),
    });
  }

  return components;
}

/** Extract meta from schema.ts source — simple regex-based parser */
function extractMeta(source: string): Omit<ComponentInfo, 'source'> | null {
  try {
    // Extract name
    const nameMatch = source.match(/name:\s*['"]([^'"]+)['"]/);
    const categoryMatch = source.match(/category:\s*['"]([^'"]+)['"]/);
    const descMatch = source.match(/description:\s*['"]([^'"]+)['"]/);
    const sinceMatch = source.match(/since:\s*['"]([^'"]+)['"]/);
    const importMatch = source.match(/import:\s*["']([^"']+)["']/);

    if (!nameMatch) return null;

    // Extract props
    const props: ComponentInfo['props'] = [];
    const propsRegex = /\{\s*name:\s*'([^']+)',\s*type:\s*'([^']+)',(?:\s*default:\s*'([^']*)',)?\s*description:\s*'([^']+)'(?:,\s*options:\s*\[([^\]]+)\])?\s*\}/g;
    let propMatch;
    while ((propMatch = propsRegex.exec(source)) !== null) {
      props.push({
        name: propMatch[1],
        type: propMatch[2],
        default: propMatch[3],
        description: propMatch[4],
        options: propMatch[5]?.split(',').map((s) => s.trim().replace(/['"]/g, '')),
      });
    }

    // Extract examples
    const examples: ComponentInfo['examples'] = [];
    const examplesRegex = /\{\s*title:\s*'([^']+)',\s*code:\s*'([^']+)'\s*\}/g;
    let exMatch;
    while ((exMatch = examplesRegex.exec(source)) !== null) {
      examples.push({ title: exMatch[1], code: exMatch[2] });
    }

    return {
      name: nameMatch[1],
      category: categoryMatch?.[1] ?? 'unknown',
      description: descMatch?.[1] ?? '',
      since: sinceMatch?.[1] ?? '0.1.0',
      props,
      examples,
      import: importMatch?.[1] ?? '',
    };
  } catch {
    return null;
  }
}

// Create MCP server
const server = new McpServer({
  name: 'glassui',
  version: '0.1.0',
});

// Tool: list_components
server.tool(
  'list_components',
  'List all GlassUI components, optionally filtered by category',
  { category: z.string().optional().describe('Filter by category name') },
  async ({ category }) => {
    const components = discoverComponents();
    const filtered = category
      ? components.filter((c) => c.category === category)
      : components;

    const listing = filtered.map((c) => ({
      name: c.name,
      category: c.category,
      description: c.description,
      import: c.import,
    }));

    return {
      content: [{ type: 'text' as const, text: JSON.stringify(listing, null, 2) }],
    };
  },
);

// Tool: get_component
server.tool(
  'get_component',
  'Get full details of a GlassUI component including source code, props, and examples',
  { name: z.string().describe('Component name (e.g. "Button", "Icon")') },
  async ({ name }) => {
    const components = discoverComponents();
    const comp = components.find(
      (c) => c.name.toLowerCase() === name.toLowerCase(),
    );

    if (!comp) {
      return {
        content: [{ type: 'text' as const, text: `Component "${name}" not found. Available: ${components.map((c) => c.name).join(', ')}` }],
      };
    }

    return {
      content: [{ type: 'text' as const, text: JSON.stringify(comp, null, 2) }],
    };
  },
);

// Tool: search_components
server.tool(
  'search_components',
  'Search GlassUI components by name, category, or description',
  { query: z.string().describe('Search query') },
  async ({ query }) => {
    const components = discoverComponents();
    const q = query.toLowerCase();
    const results = components.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q),
    );

    const listing = results.map((c) => ({
      name: c.name,
      category: c.category,
      description: c.description,
      import: c.import,
    }));

    return {
      content: [{ type: 'text' as const, text: JSON.stringify(listing, null, 2) }],
    };
  },
);

// Icon search: load Phosphor icon names from @iconify-json/ph
const ICONS_JSON = path.resolve(import.meta.dirname, '../../../node_modules/@iconify-json/ph/icons.json');

function loadIconNames(): string[] {
  try {
    const raw = JSON.parse(fs.readFileSync(ICONS_JSON, 'utf-8'));
    // Icon names include weight suffixes (e.g. "house-bold", "house-fill").
    // Extract unique base names (without weight suffixes).
    const weightSuffixes = ['-thin', '-light', '-bold', '-fill', '-duotone'];
    const baseNames = new Set<string>();
    for (const name of Object.keys(raw.icons ?? {})) {
      let base = name;
      for (const suffix of weightSuffixes) {
        if (name.endsWith(suffix)) {
          base = name.slice(0, -suffix.length);
          break;
        }
      }
      baseNames.add(base);
    }
    return [...baseNames].sort();
  } catch {
    return [];
  }
}

// Tool: search_icons
server.tool(
  'search_icons',
  'Search Phosphor icon names available in GlassUI. Returns matching icon names you can use with <Icon name="..." />',
  { query: z.string().describe('Search query (e.g. "arrow", "user", "chart")') },
  async ({ query }) => {
    const names = loadIconNames();
    const q = query.toLowerCase();
    const results = names.filter((n) => n.includes(q));
    const limited = results.slice(0, 50);

    const response = {
      total: results.length,
      showing: limited.length,
      icons: limited.map((name) => ({
        name,
        usage: `<Icon name="${name}" />`,
        weights: ['thin', 'light', 'regular', 'bold', 'fill', 'duotone'],
      })),
    };

    return {
      content: [{ type: 'text' as const, text: JSON.stringify(response, null, 2) }],
    };
  },
);

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch(console.error);
