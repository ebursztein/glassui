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

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch(console.error);
