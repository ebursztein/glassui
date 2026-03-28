# GlassUI — Svelte 5 Component Library

## Overview

GlassUI is a glassmorphism design system built with Svelte 5, Astro 5, Tailwind CSS v4, and Zod 4. Components are organized by category and use a unified foundation of shared enums, global state, events, animation tokens, and interaction tokens.

## Quick Start

```bash
npm install
npm run dev       # Start Astro dev server
npm run build     # Production build
```

## Architecture

```
src/lib/                    # The component library
├── types/enums.ts          # Shared Zod enums (Variant, Size, Status, etc.)
├── state/                  # Global state (theme, notifications, dialogs)
├── events/bus.svelte.ts    # Global event bus
├── motion/                 # Animation tokens (springs, durations, easings)
├── interactions/           # Interaction tokens (hover, focus, glass surfaces)
├── theme/                  # CSS tokens + presets
├── utils/cn.ts             # clsx + tailwind-merge
└── components/             # Components by category
    ├── icon/               # Icon (wraps phosphor-svelte)
    ├── button/             # Button
    └── .../                # Future categories
```

## Adding a New Component

1. Create a directory: `src/lib/components/{category}/`
2. Create `schema.ts` with Zod schema + `ComponentMeta` (see existing schemas for format)
3. Create `{Name}.svelte` using Svelte 5 runes (`$props`, `$state`, `$derived`)
4. Create `index.ts` barrel export
5. Add export to `src/lib/index.ts`
6. Run `npx tsx scripts/generate.ts` to regenerate skills
7. Add showcase page in `src/pages/components/{name}.astro`
8. Add nav link in `src/layouts/Layout.astro`

## Component Conventions

- **Names are generic**: `Button`, `Card`, `Input` — not `GlassButton`. "Glass" is the theme.
- **Props use shared enums**: Import `Variant`, `Size`, `Status` from `$lib/types/enums`
- **Interaction tokens are internal**: Components use `hover`, `focus`, `glass` tokens internally. Users don't need to know about them.
- **Svelte 5 runes**: Use `$props()`, `$state()`, `$derived()`, snippets for children
- **Clean user API**: `<Button variant="primary">Save</Button>` — no complexity leaks

## Styling

- Theme is controlled via CSS custom properties in `src/lib/theme/tokens.css`
- Glass surfaces use `bg-white/10 backdrop-blur-xl border-white/20`
- Accents use `--glass-accent-{1,2,3}` and `--glass-glow-{1,2,3}` variables
- Presets: `default`, `ocean`, `ember`, `violet`, `mono` — applied via `data-theme` attribute

## MCP Server

The MCP server at `tools/mcp/` auto-discovers components from `src/lib/components/`. Tools:
- `list_components(category?)` — list components
- `get_component(name)` — get source + schema + examples
- `search_components(query)` — fuzzy search

## Skills

Auto-generated from `schema.ts` files. Run `npx tsx scripts/generate.ts` to regenerate.

## Dependencies

- **Svelte 5** — runes, snippets
- **Astro 5** — SSG, `<Image>`, layouts
- **Tailwind CSS v4** — utility-first styling
- **Zod 4** — schema validation, `z.infer<>` for types
- **phosphor-svelte** — icons with adjustable size/weight
- **clsx + tailwind-merge** — class composition via `cn()`
