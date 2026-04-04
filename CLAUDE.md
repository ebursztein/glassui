# GlassUI -- Svelte 5 Component Library

## Overview

GlassUI is a Preline-equivalent component library for Svelte 5 + Astro. We port Preline's components, CSS system, and accessibility into native Svelte 5, then add opt-in glass and glow effects on top. Light and dark modes are equal citizens. Glass is optional, not the default.

## Sprint Workflow

Development follows `docs/master_plan.md` (10 sprints, 36 components). Each sprint has:
- `docs/{sprint_name}/plan.md` -- detailed tasks and acceptance criteria
- `docs/{sprint_name}/tracker.md` -- task checklist with status
- `docs/{sprint_name}/notes.md` -- decisions and learnings
- `docs/changelog.md` -- unified changelog (append after each sprint)

## Quick Start

```bash
npm install
npm run dev       # Start Astro dev server
npm run build     # Production build
npm test          # Run vitest (TDD -- tests must pass before and after changes)
```

## Visual Effect Props

Every visual component supports 4 independent, composable effect props:

```svelte
<Card>solid</Card>
<Card glass>frosted translucent</Card>
<Card raised>elevated with shadow</Card>
<Card glow>outer gradient shine</Card>
<Card colored>accent orbs behind</Card>
<Card glass raised glow colored>all four</Card>
```

| Prop | Type | Effect |
|------|------|--------|
| `glass` | `subtle \| frosted \| heavy \| boolean` | Frosted translucent surface (internal only, no bleed) |
| `raised` | `boolean` | Elevated with box-shadow |
| `glow` | `sm \| md \| lg \| boolean` | Outer gradient shine using theme colors |
| `colored` | `boolean` | Themed accent orbs behind content |

All styling flows through `getComponentStyles()` in `src/lib/interactions/styles.ts`. Tests in `src/lib/components/props.test.ts` enforce that all components support all 4 props consistently.

## Architecture

```
src/lib/                    # The component library
  types/enums.ts            # Shared Zod enums (Variant, Size, ThemeColor, etc.)
  state/                    # Global state (theme, notifications, dialogs)
  events/bus.svelte.ts      # Global event bus
  motion/                   # Animation tokens (springs, durations, easings)
  interactions/             # Interaction tokens (hover, focus, glass surfaces)
  theme/                    # CSS tokens + presets
  utils/cn.ts               # clsx + tailwind-merge
  components/               # Components by category
    icon/                   # Icon (wraps phosphor-svelte)
    button/                 # Button
    .../                    # More components
src/components/             # Showcase demos (PropEditor, *Demo.svelte)
src/pages/                  # Astro pages
src/layouts/Layout.astro    # Site layout
```

## Adding a New Component

1. Read the Preline reference skill for the component's original design
2. Create `src/lib/components/{name}/` with `{Name}.svelte`, `schema.ts`, `index.ts`
3. Use Svelte 5 runes (`$props`, `$state`, `$derived`), shared enums, `cn()`, interaction tokens
4. Add glass/blur/glow props support
5. Add export to `src/lib/index.ts`
6. Create `src/components/{Name}Demo.svelte` with PropEditor integration
7. Create `src/pages/components/{name}.astro`
8. Add nav link in `src/layouts/Layout.astro`
9. Run `npx tsx scripts/generate.ts` to regenerate skills

## Component Conventions

- **Generic names**: `Button`, `Card`, `Input` -- not `GlassButton`
- **Shared enums**: Import `Variant`, `Size`, `ThemeColor` from `$lib/types/enums`
- **Tokens are internal**: Components use `hover`, `focus`, `glass` tokens internally. Users never see them.
- **Svelte 5 runes**: `$props()`, `$state()`, `$derived()`, snippets for children
- **Clean API**: `<Button variant="primary">Save</Button>`
- **Glass is opt-in**: `glass`, `blur`, `glow` are per-instance props, not a theme switch
- **Preline-inspired**: Draw from Preline's design and accessibility, build natively in Svelte 5

## Styling

- Theme colors via CSS custom properties in `src/lib/theme/tokens.css`
- Accents: `--glass-accent-{1,2,3}` and `--glass-glow-{1,2,3}`
- Presets: `default`, `ocean`, `ember`, `violet`, `mono` via `data-theme` attribute
- Glass surface classes from `$lib/interactions/tokens` (used internally by components)

## Reference Material

- **Master plan**: `docs/master_plan.md` -- 10-sprint roadmap with component mapping
- **Changelog**: `docs/changelog.md` -- unified log of all completed work
- **Preline source**: `preline/` in repo root -- the original component library we port from
- **Design plan**: `docs/PLAN.md` -- the original design system spec
- **Skills**: `.claude/skills/glassui-architecture/` -- build conventions + sprint workflow
- **Skills**: `.claude/skills/preline-reference/` -- Preline component inventory

## MCP Server

At `tools/mcp/` -- auto-discovers components from `src/lib/components/`. Tools:
- `list_components(category?)` -- list components
- `get_component(name)` -- get source + schema + examples
- `search_components(query)` -- fuzzy search

## Skills

Auto-generated from `schema.ts` files. Run `npx tsx scripts/generate.ts` to regenerate.

## Dependencies

- **Svelte 5** -- runes, snippets
- **Astro 5** -- SSG, layouts
- **Tailwind CSS v4** -- utility-first styling with @theme system
- **@tailwindcss/typography** -- prose/heading typography
- **Zod 4** -- schema validation, `z.infer<>` for types
- **@iconify/svelte + @iconify-json/ph** -- icons by string name (`<Icon name="house" />`)
- **@floating-ui/dom** -- dropdown/tooltip/popover positioning
- **clsx + tailwind-merge** -- class composition via `cn()`
