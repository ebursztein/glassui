---
name: glassui-architecture
description: GlassUI component architecture -- how to build components, the glass props system, Svelte 5 conventions, file structure, foundation layers, showcase patterns, and sprint workflow. Use this skill whenever writing or modifying GlassUI components, creating demos, updating the showcase site, or starting a new sprint. Always load this before building anything.
---

# GlassUI Architecture

GlassUI is a **Preline-equivalent component library for Svelte 5 + Astro**. We port Preline's 29 components, CSS system, and accessibility into native Svelte 5. On top of that foundation, we add opt-in glass and glow effects.

**Light and dark are equal citizens.** Glass and glow are optional enhancements, not the default.

## Core Stack

- **Svelte 5** -- runes ($props, $state, $derived, $effect, snippets)
- **Astro 5** -- SSG showcase site
- **Tailwind CSS v4** -- utility-first styling with @theme system
- **@tailwindcss/typography** -- prose/heading control
- **Zod 4** -- single source of truth for schemas (drives types, MCP, skills, prop editor)
- **@iconify/svelte + @iconify-json/ph** -- icons by string name (`<Icon name="house" />`)
- **@floating-ui/dom** -- positioning for dropdowns, tooltips, popovers

## Sprint Workflow

Development is organized into sprints defined in `docs/master_plan.md`. Each sprint has its own directory and tracking files.

### Sprint Structure

```
docs/
  master_plan.md           # Overall plan with 10 sprints, component mapping table
  changelog.md             # Unified changelog -- every sprint appends here
  sprint_1_css_foundation/
    plan.md                # Detailed plan: tasks, files, acceptance criteria
    tracker.md             # Task checklist with status (todo/in-progress/done)
    notes.md               # Decisions, blockers, learnings during the sprint
  sprint_2_core_components/
    plan.md
    tracker.md
    notes.md
  ...
```

### Starting a Sprint

1. Read `docs/master_plan.md` for the sprint scope and component list
2. Create `docs/{sprint_name}/plan.md` with detailed tasks, files to create/modify, and acceptance criteria
3. Create `docs/{sprint_name}/tracker.md` with a checklist of every task
4. Work through the tracker, marking tasks done as you go
5. When the sprint is complete, append a summary to `docs/changelog.md`

### Sprint Plan (`docs/{sprint_name}/plan.md`)

```markdown
# Sprint N: Name

## Goal
One sentence describing what this sprint achieves.

## Tasks
1. Task description -- files affected
2. Task description -- files affected
...

## Files to Create
- src/lib/components/{name}/{Name}.svelte
- src/lib/components/{name}/schema.ts
- src/lib/components/{name}/index.ts
- src/components/{Name}Demo.svelte
- src/pages/components/{name}.astro

## Files to Modify
- src/lib/index.ts -- add exports
- src/layouts/Layout.astro -- add nav link

## Acceptance Criteria
- [ ] `npm run build` passes
- [ ] Component works in light and dark mode
- [ ] Glass/glow props work
- [ ] Keyboard accessible (matching Preline patterns)
- [ ] Demo page with PropEditor
- [ ] Added to showcase nav
```

### Sprint Tracker (`docs/{sprint_name}/tracker.md`)

```markdown
# Sprint N Tracker

## Tasks
- [x] Task 1 -- done
- [x] Task 2 -- done
- [ ] Task 3 -- in progress
- [ ] Task 4 -- todo

## Blockers
- None currently

## Completion
- Started: 2026-03-29
- Target: 2026-04-05
- Status: in-progress
```

### Changelog (`docs/changelog.md`)

Single file tracking all changes across sprints. Each sprint appends a section:

```markdown
# GlassUI Changelog

## Sprint 1: CSS Foundation (2026-03-29)
- Ported Preline @theme system with semantic color tokens
- Added Inter font and @tailwindcss/typography
- Light and dark mode with proper token values
- Merged glass tokens alongside Preline semantic tokens

## Sprint 2: Core Components (2026-04-02)
- Rebuilt Button, Card, Badge on semantic tokens
- Fixed light mode across all core components
- Sidebar uses Preline sidebar tokens
...
```

### Key Sprint Rules

1. **One sprint at a time** -- finish the current sprint before starting the next
2. **Track everything** -- update tracker.md as you work, not at the end
3. **Changelog immediately** -- append to changelog.md when sprint completes
4. **Build must pass** -- every sprint ends with `npm run build` clean
5. **Both modes** -- every component must work in light AND dark mode
6. **master_plan.md is the source of truth** -- if scope changes, update it first

## Glass Props System

Every visual component supports these optional props. They are NOT global theme settings -- they are per-component, per-instance decisions:

```svelte
<!-- Solid by default -->
<Card>solid card</Card>

<!-- Opt into glass -->
<Card glass>frosted glass</Card>
<Card glass blur="xl" glow>heavy glass + glow</Card>

<!-- Mix on the same page -->
<Button variant="primary">Solid</Button>
<Button variant="primary" glass glow>Glass</Button>
<Input label="Email" glass glow />
<Input label="Name" />
```

| Prop | Type | What it does |
|------|------|-------------|
| `glass` | `boolean` | Enables glass surface: backdrop-blur + translucent bg + white/opacity border |
| `blur` | `'sm' \| 'md' \| 'lg' \| 'xl'` | Controls backdrop-blur amount. Only applies when `glass` is true |
| `glow` | `boolean` | Gradient glow effect. Context-aware: persistent on Button/Card, on-focus for Input/Textarea |

## File Structure

```
src/lib/                          # THE LIBRARY
  types/enums.ts                  # Shared Zod enums (Variant, Size, Status, etc.)
  state/                          # Global state (theme, notifications, dialogs)
  events/bus.svelte.ts            # Global event bus
  motion/                         # Animation tokens (springs, durations, easings)
    schema.ts                     # Zod schemas
    tokens.ts                     # Resolved runtime values
  interactions/                   # Interaction tokens
    schema.ts                     # HoverEffect, FocusEffect, GradientPreset
    tokens.ts                     # Resolved Tailwind classes (hover, focus, glass, gradients)
  theme/
    tokens.css                    # CSS custom properties (semantic + glass + presets)
    presets.ts                    # Preset metadata
    types.ts                      # PropMeta, ComponentMeta interfaces
  utils/cn.ts                     # clsx + tailwind-merge
  components/{name}/              # Components by category
    {Name}.svelte                 # Component
    schema.ts                     # Zod schema + ComponentMeta
    index.ts                      # Barrel export

src/components/                   # Showcase demos
  {Name}Demo.svelte               # Interactive demo with PropEditor
  PropEditor.svelte               # Dynamic prop editor from Zod schema

src/pages/                        # Astro pages
  index.astro                     # Homepage
  components/{name}.astro         # Component demo pages

src/layouts/Layout.astro          # Site layout with sidebar nav

docs/                             # Planning and tracking
  master_plan.md                  # 10-sprint roadmap
  changelog.md                    # Unified changelog
  sprint_{name}/                  # Per-sprint plan + tracker + notes
```

## Adding a New Component

### 1. Component file: `src/lib/components/{name}/{Name}.svelte`

```svelte
<script lang="ts">
  import { cn } from '$lib/utils/cn';
  import { hover, focus, glass, gradients } from '$lib/interactions/tokens';
  import type { Snippet } from 'svelte';
  import type { Variant, Size } from '$lib/types/enums';

  interface Props {
    variant?: Variant;
    size?: Size;
    glass?: boolean;
    blur?: 'sm' | 'md' | 'lg' | 'xl';
    glow?: boolean;
    children: Snippet;
    class?: string;
  }

  let {
    variant = 'default',
    size = 'md',
    glass: isGlass = false,
    blur: blurLevel = 'md',
    glow = false,
    children,
    class: className,
    ...rest
  }: Props = $props();

  // Use Record<EnumType, string> for variant/size class maps
  const variantClasses: Record<Variant, string> = { ... };
  const sizeClasses: Record<Size, string> = { ... };

  // Compute classes with $derived
  const classes = $derived(cn(baseClasses, variantClasses[variant], sizeClasses[size], className));
</script>

<button class={classes} {...rest}>
  {@render children()}
</button>
```

Key conventions:
- Use `$props()` rune, destructure with defaults
- Use `Record<EnumType, string>` lookup tables for variant/size classes
- Use `$derived()` for computed classes
- Use `cn()` for class merging
- Accept `children: Snippet`, render with `{@render children()}`
- Accept `class?: string` and spread `...rest`
- Import interaction tokens internally -- users never see them
- Use **semantic color tokens** (`bg-primary`, `text-foreground`, `border-line-2`) not raw colors

### 2. Schema file: `src/lib/components/{name}/schema.ts`

```typescript
import { z } from 'zod/v4';
import { Variant, Size } from '$lib/types/enums';
import type { ComponentMeta } from '$lib/theme/types';

export const ButtonSchema = z.object({
  variant: Variant.default('default'),
  size: Size.default('md'),
  glass: z.boolean().default(false),
  glow: z.boolean().default(false),
  disabled: z.boolean().default(false),
});

export type ButtonProps = z.infer<typeof ButtonSchema>;

export const meta: ComponentMeta = {
  name: 'Button',
  category: 'button',
  description: 'Button with 5 variants, 5 sizes. Optional glass surface and glow.',
  since: '0.1.0',
  props: [ ... ],
  examples: [ ... ],
  import: "import { Button } from 'glassui';",
};
```

### 3. Barrel export: `src/lib/components/{name}/index.ts`

### 4. Add to `src/lib/index.ts`

### 5. Demo: `src/components/{Name}Demo.svelte`

Use Card component for demo sections (not raw divs). Sections that showcase glass use `<Card bg="gradient">`.

### 6. Page: `src/pages/components/{name}.astro`

### 7. Update nav in Layout.astro

### 8. Update sprint tracker

## Shared Enums

All in `src/lib/types/enums.ts`:

| Enum | Values | Use for |
|------|--------|---------|
| Variant | default, primary, outline, ghost, destructive | styled components |
| Size | xs, sm, md, lg, xl | sizeable components |
| GlassIntensity | subtle, medium, strong | internal glass token lookup |
| Status | info, success, warning, error | alerts, badges, notifications |
| Position | top, right, bottom, left | popovers, tooltips |
| Orientation | horizontal, vertical | layout components |
| Radius | none, sm, md, lg, xl, full | border radius |

## Interaction Tokens

In `src/lib/interactions/tokens.ts`. Used internally by components, never exposed to users:

- `hover.lift` / `.brighten` / `.glow` / `.none`
- `focus.ring` / `.glow`
- `glass.subtle` / `.medium` / `.strong`
- `gradients.accent` / `.glow` / `.highlight`
- `glassClasses(intensity)` -- helper composing glass surface string

## Theme System

Two layers of CSS tokens in `src/lib/theme/tokens.css`:

**Preline semantic tokens** (via `@theme inline`):
- `bg-primary`, `text-foreground`, `border-line-2`, `bg-surface`, `text-muted-foreground`
- Component tokens: `bg-sidebar`, `bg-card`, `bg-dropdown`
- Full primary scale (50-950) with hover/focus/active states
- Light mode in `:root`, dark mode in `.dark`

**Glass tokens** (via CSS custom properties):
- Accents: `--glass-accent-{1,2,3}`, `--glass-glow-{1,2,3}`
- Text: `--glass-text`, `--glass-text-muted`, `--glass-text-faint`
- Status: `--glass-info`, `--glass-success`, `--glass-warning`, `--glass-error`
- 5 presets via `[data-theme]`: default, ocean, ember, violet, mono

## Global State

In `src/lib/state/`:
- `theme` -- mode (light/dark) + preset + background, with `toggle()`, `setPreset()`, `setBackground()`
- `notifications` -- queue with `push()`, `dismiss()`, `clear()`
- `dialogs` -- stack with `open()`, `close()`, `current`, `hasOpen`

## MCP Server

At `tools/mcp/` -- auto-discovers components. Tools: `list_components`, `get_component`, `search_components`, `search_icons`.

## Key Principles

1. **Generic names** -- `Button`, `Card`, `Input` -- not `GlassButton`
2. **Clean user API** -- `<Button variant="primary">Save</Button>`
3. **Glass is opt-in** -- `glass`, `blur`, `glow` are per-component props
4. **Light and dark** -- every component works in both modes, using semantic tokens
5. **Self-building site** -- showcase uses ONLY GlassUI components (Card for demo sections)
6. **Zod as backbone** -- schema drives types, MCP, skills, prop editor
7. **Preline parity** -- match Preline's component APIs, accessibility, keyboard navigation
8. **Sprint discipline** -- follow master_plan.md, track in sprint dirs, log in changelog.md
