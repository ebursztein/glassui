# GlassUI Design Plan

## Context

Transform enui into a real design system -- not a bag of components, but a coherent system with shared types, global state, global events, consistent animations, and consistent interactions. Every component draws from the same well-defined foundation.

## Core Stack

- Svelte 5 runes ($props, $state, $derived, $effect, snippets)
- Astro 5 docs site (`<Image>`, `<ViewTransitions>`)
- Tailwind CSS v4
- Zod 4 -- single source of truth for all schemas
- Motion (@humanspeak/svelte-motion) -- consistent animation system
- LayerChart (layerchart@next) -- chart foundation
- phosphor-svelte -- icons (adjustable size + weight)

## Key Principles

- Components are named generically: `<Button>`, `<Card>`, `<Icon>` -- "glass" is the theme, not the prefix
- Users write clean code: `<Button variant="primary">Save</Button>` -- all complexity is internal
- Self-building site: The showcase uses ONLY glassui components -- no external UI
- Dynamic prop editor: Each demo page auto-generates controls from the Zod schema (like shadcn)
- Zod 4 as the backbone: Every component's schema with `.meta()` drives types, MCP, skills, showcase, prop editor, and JSON Schema -- single source of truth

## Design System Foundation

### 1. Shared Enums (defined ONCE, used everywhere)

```ts
// src/lib/types/enums.ts
import { z } from 'zod';

// Visual variants - every "styled" component uses these
export const Variant = z.enum(['default', 'primary', 'outline', 'ghost', 'destructive']);
export type Variant = z.infer<typeof Variant>;

// Sizes - every sizeable component uses these
export const Size = z.enum(['xs', 'sm', 'md', 'lg', 'xl']);
export type Size = z.infer<typeof Size>;

// Glass intensity - controls blur/opacity/border strength
export const GlassIntensity = z.enum(['subtle', 'medium', 'strong']);
export type GlassIntensity = z.infer<typeof GlassIntensity>;

// Orientation
export const Orientation = z.enum(['horizontal', 'vertical']);
export type Orientation = z.infer<typeof Orientation>;

// Status - for badges, notifications, alerts
export const Status = z.enum(['info', 'success', 'warning', 'error']);
export type Status = z.infer<typeof Status>;

// Position - for popovers, tooltips, sheets
export const Position = z.enum(['top', 'right', 'bottom', 'left']);
export type Position = z.infer<typeof Position>;

// Radius
export const Radius = z.enum(['none', 'sm', 'md', 'lg', 'xl', 'full']);
export type Radius = z.infer<typeof Radius>;
```

Every component schema references these shared enums -- NOT local copies.

### 2. Global State (`src/lib/state/`)

Svelte 5 rune-based global state using `$state` in module-level stores:

```ts
// src/lib/state/theme.svelte.ts
class ThemeState {
  mode = $state<'light' | 'dark'>('dark');
  preset = $state<string>('default');
  get isDark() { return this.mode === 'dark'; }
  toggle() { this.mode = this.mode === 'dark' ? 'light' : 'dark'; }
  setPreset(name: string) { this.preset = name; /* applies CSS vars */ }
}
export const theme = new ThemeState();

// src/lib/state/notifications.svelte.ts
class NotificationState {
  queue = $state<Notification[]>([]);
  push(n: Notification) { this.queue.push(n); }
  dismiss(id: string) { this.queue = this.queue.filter(n => n.id !== id); }
}
export const notifications = new NotificationState();

// src/lib/state/dialogs.svelte.ts
class DialogState {
  stack = $state<DialogEntry[]>([]);
  open(dialog: DialogEntry) { this.stack.push(dialog); }
  close() { this.stack.pop(); }
  get current() { return this.stack.at(-1); }
  get hasOpen() { return this.stack.length > 0; }
}
export const dialogs = new DialogState();

// src/lib/state/index.ts -- barrel export
export { theme } from './theme.svelte';
export { notifications } from './notifications.svelte';
export { dialogs } from './dialogs.svelte';
```

### 3. Global Events (`src/lib/events/`)

Custom event bus for cross-component communication:

```ts
// src/lib/events/bus.svelte.ts
type EventMap = {
  'glass:theme-changed': { mode: 'light' | 'dark'; preset: string };
  'glass:notification': { id: string; status: Status; message: string };
  'glass:dialog-open': { id: string };
  'glass:dialog-close': { id: string };
  'glass:command-open': void;
  'glass:command-close': void;
  'glass:navigate': { path: string };
};

class EventBus {
  #listeners = new Map<string, Set<Function>>();
  on<K extends keyof EventMap>(event: K, handler: (payload: EventMap[K]) => void) { ... }
  off<K extends keyof EventMap>(event: K, handler: Function) { ... }
  emit<K extends keyof EventMap>(event: K, payload: EventMap[K]) { ... }
}

export const events = new EventBus();
```

### 4. Consistent Animation System (`src/lib/motion/`)

Animation tokens defined ONCE with Zod, every component references them:

```ts
// src/lib/motion/schema.ts
export const SpringPreset = z.enum(['gentle', 'snappy', 'bouncy']);
export const Duration = z.enum(['instant', 'fast', 'normal', 'slow', 'glacial']);
export const Easing = z.enum(['default', 'in', 'out', 'bounce']);
export const TransitionPreset = z.enum([
  'enter', 'exit', 'slideUp', 'slideDown', 'slideLeft', 'slideRight',
]);

export const SpringConfig = z.interface({
  stiffness: z.number(),
  damping: z.number(),
  bounce: z.number().optional(),
});

export const MotionConfig = z.interface({
  spring: SpringPreset.or(SpringConfig).default('snappy'),
  duration: Duration.default('normal'),
  easing: Easing.default('default'),
  enter: TransitionPreset.optional(),
  exit: TransitionPreset.optional(),
});
```

```ts
// src/lib/motion/tokens.ts -- resolved values (runtime)
export const springs: Record<SpringPreset, { stiffness: number; damping: number; bounce?: number }> = {
  gentle: { stiffness: 120, damping: 14 },
  snappy: { stiffness: 300, damping: 20 },
  bouncy: { stiffness: 400, damping: 10, bounce: 0.25 },
};

export const durations: Record<Duration, number> = {
  instant: 0.1, fast: 0.15, normal: 0.3, slow: 0.5, glacial: 0.8,
};

export const easings: Record<Easing, number[]> = {
  default: [0.4, 0, 0.2, 1],
  in: [0.4, 0, 1, 1],
  out: [0, 0, 0.2, 1],
  bounce: [0.68, -0.55, 0.265, 1.55],
};

export const transitions: Record<TransitionPreset, { initial: object; animate: object }> = {
  enter: { initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 } },
  exit: { initial: { opacity: 1, scale: 1 }, animate: { opacity: 0, scale: 0.95 } },
  slideUp: { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 } },
  // ...
};

export function resolveMotion(config: Partial<MotionConfig>) { ... }
```

### 5. Consistent Interactions (`src/lib/interactions/`)

Hover, press, focus, glass surfaces -- all Zod-defined:

```ts
// src/lib/interactions/schema.ts
export const HoverEffect = z.enum(['lift', 'brighten', 'glow', 'none']);
export const FocusEffect = z.enum(['ring', 'glow']);
export const GradientPreset = z.enum(['accent', 'glow', 'highlight']);
```

```ts
// src/lib/interactions/tokens.ts -- resolved Tailwind classes
export const hover: Record<HoverEffect, string> = {
  lift: 'hover:scale-[1.03] active:scale-[0.97]',
  brighten: 'hover:bg-white/20',
  glow: 'hover:border-white/40 hover:shadow-[0_0_12px_var(--glass-glow-2)]',
  none: '',
};

export const focus: Record<FocusEffect, string> = {
  ring: 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 ...',
  glow: 'focus-visible:border-white/40 focus-visible:shadow-[0_0_16px_var(--glass-glow-2)]',
};

export const glass: Record<GlassIntensity, { bg: string; blur: string; border: string; shadow: string }> = {
  subtle: { ... },
  medium: { ... },
  strong: { ... },
};

export const gradients: Record<GradientPreset, string> = {
  accent: 'bg-gradient-to-r from-[var(--glass-accent-1)] via-[var(--glass-accent-2)] to-[var(--glass-accent-3)]',
  glow: '...',
  highlight: '...',
};
```

All token resolution is internal to components. Users write clean markup.

### 6. Icon System (`src/lib/components/icon/`)

Wraps phosphor-svelte with Zod-validated size and weight:

```ts
// src/lib/components/icon/schema.ts
export const IconWeight = z.enum(['thin', 'light', 'regular', 'bold', 'fill', 'duotone']);
export const IconSchema = z.interface({
  name: z.string(),
  size: z.number().default(24),
  weight: IconWeight.default('regular'),
  color: z.string().optional(),
});
```

Usage:
```svelte
<Button variant="primary"><Icon name="FloppyDisk" size={16} weight="bold" /> Save</Button>
```

### 7. Self-Building Showcase Site

The showcase site uses ONLY glassui components -- it eats its own dog food:
- Navigation sidebar: uses `<Card>`, `<Button>` from the lib
- Component demo pages: use `<Card>` for sections, `<Button>` for actions, `<Icon>` for icons
- No external UI library -- everything is glassui
- This proves the components work in a real app and catches issues early

### 8. Dynamic Prop Editor (like shadcn)

Each component demo page includes a live prop editor where you can toggle/change props and see the component update in real-time:

```
+------------------------------------------+
|  Button                                  |
|  ------                                  |
|  +----------------------------+          |
|  |     [  Click me  ]         |  <- Live |
|  |                            |  preview |
|  +----------------------------+          |
|                                          |
|  Props                                   |
|  ------                                  |
|  variant:  [default v]     <- dropdown   |
|  size:     [md v]          <- dropdown   |
|  glowEffect: [toggle]     <- switch     |
|  disabled:   [toggle]     <- switch     |
|                                          |
|  Code                                    |
|  ------                                  |
|  <Button variant="primary" glowEffect>   |
|    Click me                              |
|  </Button>                               |
+------------------------------------------+
```

The prop editor is built from the Zod schema -- it reads the schema's enum values, defaults, and types to auto-generate the controls. Adding a new component with a schema automatically gets a prop editor for free.

## File Structure

```
src/
  lib/                              # THE LIBRARY
    types/
      enums.ts                      # ALL shared enums
    state/
      theme.svelte.ts               # Global theme state
      notifications.svelte.ts       # Global notification queue
      dialogs.svelte.ts             # Global dialog stack
      index.ts
    events/
      bus.svelte.ts                 # Global event bus
    motion/
      schema.ts                     # Zod schemas for springs, durations, easings
      tokens.ts                     # Resolved runtime values
    interactions/
      schema.ts                     # Zod schemas for hover, focus, gradients
      tokens.ts                     # Resolved Tailwind classes
    theme/
      tokens.css                    # CSS custom properties
      presets.ts                    # Named theme presets
    utils/
      cn.ts                         # clsx + tailwind-merge
    components/
      icon/                         # Icon system (wraps phosphor-svelte)
        Icon.svelte
        schema.ts
        index.ts
      button/                       # Button component
        Button.svelte
        schema.ts
        index.ts
    index.ts                        # Barrel exports
  pages/
    index.astro
    components/
      [...slug].astro
  layouts/
    Layout.astro
  styles/
    globals.css
tools/
  mcp/
    src/index.ts
    package.json
    tsconfig.json
scripts/
  generate.ts
.claude/
  skills/
  settings.json
CLAUDE.md
astro.config.mjs
svelte.config.js
package.json
tsconfig.json
```

## Component Schema Pattern

```ts
// src/lib/components/button/schema.ts
import { z } from 'zod';
import { Variant, Size } from '$lib/types/enums';

export const ButtonSchema = z.interface({
  variant: Variant.default('default'),
  size: Size.default('md'),
  glowEffect: z.boolean().default(false),
  disabled: z.boolean().default(false),
}).meta({
  name: 'Button',
  category: 'button',
  description: 'Button component. Glass surface, hover, focus, and motion are handled internally.',
  since: '0.1.0',
  examples: [
    { title: 'Default', code: '<Button>Click me</Button>' },
    { title: 'Primary with glow', code: '<Button variant="primary" glowEffect>Save</Button>' },
    { title: 'Destructive', code: '<Button variant="destructive">Delete</Button>' },
  ],
  import: "import { Button } from 'glassui/button';",
});

export type ButtonProps = z.infer<typeof ButtonSchema>;
```

Every component schema pulls from the same Zod enums. Motion, hover, focus, and glass surface tokens are applied internally by the component -- users get clean props, components get consistent behavior.

## Phase 1: Foundation + Buttons End-to-End

### Step 1: Clean slate
Delete all React/Next.js files. Keep .git/, LICENCE, public/ images.

### Step 2: Scaffold
package.json, astro.config.mjs, svelte.config.js, tsconfig.json

### Step 3: Foundation layer
- `src/lib/types/enums.ts` -- shared Zod enums
- `src/lib/state/` -- theme, notifications, dialogs stores
- `src/lib/events/bus.svelte.ts` -- global event bus
- `src/lib/motion/schema.ts` + `tokens.ts` -- Zod-defined animation system
- `src/lib/interactions/schema.ts` + `tokens.ts` -- Zod-defined hover, focus, surfaces
- `src/lib/theme/tokens.css` -- CSS custom properties
- `src/lib/theme/presets.ts` -- named presets
- `src/lib/utils/cn.ts`
- `src/styles/globals.css`

### Step 4: Layout
`src/layouts/Layout.astro` -- uses Astro `<ViewTransitions>`, dark bg, nav

### Step 5: Icon component
- `src/lib/components/icon/schema.ts`
- `src/lib/components/icon/Icon.svelte`
- `src/lib/components/icon/index.ts`

### Step 6: Button component
- `src/lib/components/button/schema.ts`
- `src/lib/components/button/Button.svelte`
- `src/lib/components/button/index.ts`
- `src/lib/index.ts` (barrel exports Icon + Button)

### Step 7: MCP server
`tools/mcp/` -- auto-discovers components from filesystem

### Step 8: Skill generator
`scripts/generate.ts` -- reads schema.ts files -> generates .claude/skills/

### Step 9: Showcase site (self-building)
- `src/pages/index.astro` -- homepage built with glassui components
- `src/pages/components/[...slug].astro` -- rich demo from schema
- `src/components/PropEditor.svelte` -- dynamic prop editor
- All page UI uses only glassui components

### Step 10: CLAUDE.md

### Step 11: Verify, commit, push

## Verification Checklist

- [ ] `npm run dev` -- starts without errors
- [ ] `/` -- shows Button in component grid
- [ ] `/components/button` -- interactive demo with all variants, props table, code snippets
- [ ] MCP: `list_components()` -> Button; `get_component("Button")` -> source + schema
- [ ] `.claude/skills/glass-button.md` exists with correct content
- [ ] `npm run build` -- succeeds
- [ ] All hover/focus/animation behaviors are consistent (driven by shared tokens)
- [ ] Theme toggle works (dark/light via global state)
