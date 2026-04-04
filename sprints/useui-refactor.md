# useUI Refactor -- Context-Driven State Machine

## Context

GlassUI has 8 visual components (Button, Card, Badge, Alert, Input, Textarea, Toggle, Sidebar) plus Icon. Each one independently implements its own glass wiring: reading parent context, resolving props, computing depth, generating styles, wrapping glow, guarding colored backdrops. The result is ~30-40 lines of boilerplate per component that subtly differs between every one of them -- inconsistent prop sets, inconsistent context behavior, inconsistent depth direction, inconsistent color inheritance. Icon doesn't participate at all. This is untenable at 8 components and impossible at 100.

The fix is a Context-Driven State Machine: a unified prop schema (BaseUIProps), a single Svelte 5 rune (useUI), a unified styling engine, and hermetic components that become dumb views.

Full findings are in `tmp/findings.md`.

### Test baseline

3 test files, 299 tests (all passing):
- `src/lib/components/props.test.ts` -- component prop consistency (checks each component has glass/frosted/raised/glow/colored, uses centralized style system, etc.)
- `src/lib/components/demos.test.ts` -- demo validation (glass prop values, stacking coverage, CSS class coverage)
- `src/lib/interactions/styles.test.ts` -- 85+ tests for `getComponentStyles`, `getAlertStyles`, `getFieldStatusOverrides`, `computeDensity`, `resolveGlass`, `resolveFrosted`

The styles.test.ts file is the most critical to preserve. It tests glass density computation, solid/glass class output, role interactions, frost auto-coupling, raised behavior, and alert/field status overrides. When we modify styles.ts (Sprint 1) and absorb getAlertStyles (Sprint 3), these tests must be updated carefully -- not deleted.

### Design decisions

- **Icon size**: Keep backward compatibility. Accept `Size` enum AND raw numbers as escape hatch. We are not prescriptive -- always offer developers an override.
- **Reactive prop**: Keep as a separate explicit prop. Reactive glow can be jarring and the effect needs future tuning. Do not auto-enable from `interactive + glass`.
- **Roles**: Static to component geometry (container, action, field, inline). Never change based on user behavior. `interactive` is a trait layered on top.
- **Disabled propagates**: `disabled` is part of the context, just like color and size. A disabled Card disables all its children automatically. Children can't re-enable themselves -- disabled is sticky downward.
- **ui.styles on wrappers**: `ui.styles` (the CSS custom properties string) is applied to the outermost wrapper element, not to the inner content element. This means `--comp-text`, `--comp-bg`, etc. are set at the wrapper level and all children (text, labels, helper text, sub-components) inherit them via CSS cascade. No manual `insideGlass` checks anywhere -- typography inheritance is foolproof because the CSS variables flow down naturally.

---

## Sprint 1: Foundation -- BaseUIProps + useUI + Styling Engine

**Goal**: Build the three infrastructure pieces. No component migration yet. Everything compiles, existing components untouched.

### Step 1.1: BaseUIProps (The Contract)

**Create** `src/lib/types/base.ts`

```ts
import type { ThemeColor, RenderStyle, Size, Status } from './enums';
import type { GlassDensity, FrostedLevel } from '$lib/interactions/glass';
import type { GlowIntensity } from '$lib/interactions/glow';

export interface BaseUIProps {
  color?: ThemeColor;
  style?: RenderStyle;
  size?: Size;
  status?: Status;
  disabled?: boolean;
  glass?: GlassDensity | boolean;
  frosted?: FrostedLevel | boolean;
  colored?: boolean;
  raised?: boolean;
  glow?: GlowIntensity | boolean;
  interactive?: boolean;
  reactive?: boolean;
}
```

Shared Zod fragments (so component schemas stop re-inlining unions):

```ts
export const GlassField = z.union([
  z.enum(['ultra-thin', 'thin', 'normal', 'thick', 'ultra-thick']),
  z.boolean()
]).default(false);

export const FrostedField = z.union([
  z.enum(['light', 'medium', 'heavy']),
  z.boolean()
]).default(false);

export const GlowField = z.union([
  z.enum(['sm', 'md', 'lg']),
  z.boolean()
]).default(false);

export const BaseUIPropsSchema = z.object({
  color: ThemeColor.optional(),
  style: RenderStyle.optional(),
  size: Size.optional(),
  status: Status.optional(),
  disabled: z.boolean().default(false),
  glass: GlassField,
  frosted: FrostedField,
  colored: z.boolean().default(false),
  raised: z.boolean().default(false),
  glow: GlowField,
  interactive: z.boolean().default(false),
  reactive: z.boolean().default(false),
});
```

**Modify** `src/lib/index.ts` -- export `BaseUIProps` type and `BaseUIPropsSchema`.

### Step 1.2: useUI Rune (The Brain)

**Create** `src/lib/interactions/useUI.svelte.ts`

Does exactly 4 things:
1. **Reads parent context** via `getContext(UI_CONTEXT_KEY)`
2. **Merges local props with parent** -- local wins, `undefined` falls back to parent
3. **Computes glass physics** -- depth, density, frost, CSS output
4. **Sets child context** via `setContext(UI_CONTEXT_KEY)` -- every component is a chain link

**Signature:**

```ts
type UIRole = 'container' | 'action' | 'field' | 'inline';

interface UseUIConfig {
  props: BaseUIProps & Record<string, unknown>;
  role: UIRole;
}

interface UIOutput {
  // Resolved values (after merge with parent context)
  color: ThemeColor;
  style: RenderStyle;
  size: Size;
  status: Status | undefined;
  disabled: boolean;
  glass: GlassDensity | false;
  frosted: FrostedLevel | false;
  raised: boolean;
  interactive: boolean;
  reactive: boolean;

  // Pre-computed for the template
  className: string;       // all glass/solid/interaction classes
  styles: string;          // CSS custom properties string
  glowClass: string;       // glow wrapper class (empty if no glow)
  showBackdrop: boolean;   // whether to render GlassBackdrop
  insideGlass: boolean;    // whether parent context has glass active
  depth: number;           // resolved depth in glass tree
}
```

**Context shape** (replaces `GlassContext`):

```ts
interface UIContext {
  depth: number;
  baseDensity: GlassDensity;
  active: boolean;
  color?: ThemeColor;
  style?: RenderStyle;
  size?: Size;
  status?: Status;
  disabled?: boolean;
}
```

**Merge logic:**

```
resolved.color    = props.color    ?? parent.color    ?? 'neutral'
resolved.style    = props.style    ?? parent.style    ?? 'solid'
resolved.size     = props.size     ?? parent.size     ?? 'md'
resolved.status   = props.status   ?? parent.status   ?? undefined
resolved.disabled = props.disabled || parent.disabled || false   // sticky: once true, stays true
resolved.glass    = resolveGlassTriState(props.glass, parent)
resolved.frosted  = props.frosted !== undefined ? resolveFrosted(props.frosted) : autoFrost
resolved.raised   = props.raised   ?? false
resolved.glow     = props.glow     ?? false
resolved.reactive = props.reactive ?? false
```

**Glass tri-state resolution:**
- `props.glass` is a `GlassDensity` string -> opt in at that density
- `props.glass === true` -> opt in at `'normal'`
- `props.glass === false` -> solid for THIS component, but still propagate parent context to children (opt out without breaking chain)
- `props.glass === undefined` -> inherit from parent (if parent active, use parent baseDensity)

**Depth computation (static per role):**
- container: parentDepth + 1 (or 0 if root)
- action: parentDepth + 1
- inline: parentDepth + 1
- field: parentDepth - 1 (recessed)

**Interaction trait:**
When `interactive` is true:
- container: `cursor-pointer hover:brightness-105 transition-all duration-200`
- action: `hover:brightness-125 active:brightness-90 transition-all duration-200`
- field/inline: no interaction classes

When `reactive` is true AND glass is active:
- Add `glass-reactive glass-reactive-border` classes
- Component still applies `use:proximityGlow` in template (Svelte action, can't be in TS)

**showBackdrop:**
```
colored && (!insideGlass || (role === 'container' && depth === 0))
```
Replaces the inconsistent guards across components.

### Step 1.3: Unify Styling Engine

**Modify** `src/lib/interactions/styles.ts`

1. **Absorb `getAlertStyles`** into `getComponentStyles`. Alert-specific colors become CSS custom properties (`--comp-accent`, `--comp-icon-color`) in the style string. `getComponentStyles` returns `{ class, style }` for all roles including alert containers.

2. **Text color in solid mode**: Add `text-foreground` to solid container/field classes so components never manually check `insideGlass ? 'text-[var(--glass-text)]' : 'text-foreground'`.

3. **Interaction classes**: Already in `glassRoleInteractions` for glass mode. Add solid-mode equivalents so the output is role + interactive-aware regardless of glass state.

### Step 1.4: Clean up glass.ts

**Modify** `src/lib/interactions/glass.ts`
- Keep pure functions: `resolveGlass`, `resolveFrosted`, `computeDensity`, `densityToFrost`
- Remove `getParentGlass` and `GLASS_CONTEXT_KEY` (replaced by useUI)
- Keep `GlassDensity`, `FrostedLevel`, `GlassRole` type exports (used by useUI and styles.ts)
- Remove `GlassContext` type (replaced by `UIContext`)

### Sprint 1 verification

**Tests** (target: 299 existing + ~30 new = ~330):
- `npm test` must still pass all 299 existing tests. Sprint 1 doesn't touch components, so `props.test.ts` and `demos.test.ts` are unchanged.
- `styles.test.ts`: If `getAlertStyles` signature changes in this sprint, update the 15 `getAlertStyles` tests. If we only prep for absorption but keep the old signature, no changes needed yet.
- Create `src/lib/interactions/useUI.test.ts` with ~30 tests:
  - Merge logic: local prop overrides parent, undefined inherits parent, defaults for missing
  - Tri-state glass: density string, true, false, undefined each resolve correctly
  - Depth computation: +1 for container/action/inline, -1 for field
  - showBackdrop guard: colored + depth + insideGlass combinations
  - Context output shape: all fields populated correctly
- `npm run build` compiles (new files exist, old components untouched)

### Sprint 1 files

| Action | File |
|--------|------|
| Create | `src/lib/types/base.ts` |
| Create | `src/lib/interactions/useUI.svelte.ts` |
| Create | `src/lib/interactions/useUI.test.ts` |
| Modify | `src/lib/interactions/styles.ts` |
| Modify | `src/lib/interactions/glass.ts` |
| Modify | `src/lib/index.ts` |

---

## Sprint 2: Container Migration -- Card + Sidebar

**Goal**: Migrate the two context-setting components. These are the roots of the propagation chain.

### Step 2.1: Card.svelte

Rewrite to use `useUI({ props, role: 'container' })`. Delete all manual glass wiring:
- Remove imports: `resolveGlass`, `resolveFrosted`, `getParentGlass`, `GLASS_CONTEXT_KEY`, `setContext`, `getComponentStyles`, `getGlowClass`
- Remove: manual context setting, depth computation, style derivation, glow wrapping
- Keep: `GlassBackdrop` import (for `ui.showBackdrop`), `proximityGlow` import (for `reactive`)
- Keep: component-specific props (`hover`, `tint` -- these pass through to useUI or are handled locally)
- Use `GlowWrapper` for glow instead of inline `{#if glowClass}` pattern

**Card sub-components** (CardHeader, CardTitle, CardDescription, CardContent, CardFooter):
- These are layout primitives. They don't need useUI.
- Read `UI_CONTEXT_KEY` via `getContext` for text color awareness only (replace `GLASS_CONTEXT_KEY` reads if any).

### Step 2.2: Sidebar.svelte

Rewrite to use `useUI({ props, role: 'container' })`.
- Currently only accepts `glass: boolean`. After migration, accepts full `BaseUIProps` including density levels, color, raised, etc.
- Sub-components (SidebarHeader, SidebarSection, SidebarItem, SidebarFooter) read context for glass-aware styling.
- `SidebarItem` may benefit from useUI with `role: 'action'` since it's an interactive nav item.

### Step 2.3: Update schemas

- `card/schema.ts` -- use `BaseUIPropsSchema.extend({ hover: ... })`
- `sidebar/schema.ts` -- use `BaseUIPropsSchema.extend({})` (gains all base props)

### Sprint 2 verification

**Tests**:
- `props.test.ts`: Update Card expectations -- now imports `useUI` instead of `getParentGlass`/`setContext`/`GLASS_CONTEXT_KEY`. Sidebar gains all base props in schema.
- `styles.test.ts`: No changes needed (styles.ts API unchanged from component perspective).
- `npm test` must pass.

**Visual** (`npm run dev`):
- `/components/card` -- all variants render identically to before
- `/components/glass` -- all 7 sections (kitchen sink, solid vs glass, neutral vs colored, tint, depth stacking, reactive, density levels) render identically
- Context propagation: Button/Input inside glass Card inherit glass
- Light mode + dark mode, default + ocean theme presets

### Sprint 2 files

| Action | File |
|--------|------|
| Rewrite | `src/lib/components/card/Card.svelte` |
| Modify | `src/lib/components/card/CardTitle.svelte` (context key update) |
| Modify | `src/lib/components/card/CardDescription.svelte` (context key update) |
| Modify | `src/lib/components/card/schema.ts` |
| Rewrite | `src/lib/components/sidebar/Sidebar.svelte` |
| Modify | `src/lib/components/sidebar/SidebarItem.svelte` |
| Modify | `src/lib/components/sidebar/schema.ts` |
| Modify | `src/lib/components/props.test.ts` |

---

## Sprint 3: Action + Inline Migration -- Button, Badge, Alert

**Goal**: Migrate the three components that sit ON glass surfaces.

### Step 3.1: Button.svelte

Rewrite to use `useUI({ props, role: 'action' })`.
- Delete: all manual glass wiring (~25 lines)
- `disabled` no longer component-specific -- comes from `ui.disabled` (propagated through context)
- Keep: `loading` as component-specific prop
- Keep: `sizeClasses` map (uses `ui.size` now)
- Button currently has its own `effectiveColor` and `effectiveGlass` logic -- all replaced by useUI merge
- Use `GlowWrapper` for glow

### Step 3.2: Badge.svelte

Rewrite to use `useUI({ props, role: 'inline' })`.
- Delete: all manual glass wiring
- Keep: `dot` as component-specific prop
- Keep: `sizeClasses` map

### Step 3.3: Alert.svelte

Rewrite to use `useUI({ props, role: 'container' })`. Alert is a pane, not an action -- it keeps its container geometry (frost, structural borders).
- Delete: all manual glass wiring + the separate `getAlertStyles` call
- After Sprint 1, `getComponentStyles` handles alert-style containers. Alert reads `--comp-accent` etc. from CSS custom properties set in the style string.
- Keep: `dismissible`, `icon`, `title` as component-specific props

### Step 3.4: Update schemas

- `button/schema.ts` -- `BaseUIPropsSchema.extend({ loading: ..., disabled: ... })`
- `badge/schema.ts` -- `BaseUIPropsSchema.extend({ dot: ... })`
- `alert/schema.ts` -- `BaseUIPropsSchema.extend({ title: ..., dismissible: ..., icon: ... })`

### Sprint 3 verification

**Tests**:
- `props.test.ts`: Update Button, Badge, Alert expectations -- useUI imports, no direct glass imports.
- `styles.test.ts`: If `getAlertStyles` is absorbed into `getComponentStyles` in this sprint, migrate the 15 `getAlertStyles` tests to test the unified function with `role: 'container', status: 'info'` etc. The assertions stay the same, just the function call changes. Same for `getFieldStatusOverrides` if absorbed.
- `npm test` must pass.

**Visual** (`npm run dev`):
- `/components/button` -- solid, outline, ghost in all colors, glass and non-glass
- `/components/badge` -- all status colors, dot, solid and glass
- `/components/alert` -- all 4 statuses, solid and glass, dismissible
- Button inside glass Card inherits color and glass
- `<Button glass={false}>` inside `<Card glass>` renders solid (tri-state opt-out)
- `<Card disabled>` disables all Buttons inside it (disabled propagation)
- Light/dark mode, default + ocean theme presets

### Sprint 3 files

| Action | File |
|--------|------|
| Rewrite | `src/lib/components/button/Button.svelte` |
| Rewrite | `src/lib/components/badge/Badge.svelte` |
| Rewrite | `src/lib/components/alert/Alert.svelte` |
| Modify | `src/lib/components/button/schema.ts` |
| Modify | `src/lib/components/badge/schema.ts` |
| Modify | `src/lib/components/alert/schema.ts` |
| Modify | `src/lib/components/props.test.ts` |

---

## Sprint 4: Field + Icon Migration -- Input, Textarea, Toggle, Icon

**Goal**: Migrate the recessed field components and bring Icon into the system.

### Step 4.1: Input.svelte

Rewrite to use `useUI({ props, role: 'field' })`.
- Delete: all manual glass wiring + manual `insideGlass` text color checks
- Delete: `getFieldStatusOverrides` call (absorbed into getComponentStyles in Sprint 1)
- Keep: `label`, `error`, `helperText` as component-specific props
- `disabled` comes from `ui.disabled` (propagated through context -- a disabled Card disables its inputs)
- Label and helper text inherit `--comp-text` from the wrapper via CSS cascade -- no manual check
- `ui.styles` applied to the outermost `<div>` wrapper, not the `<input>` element itself. The input gets `ui.className` for its own styling, but text color flows down from the wrapper.

### Step 4.2: Textarea.svelte

Same pattern as Input. role='field'.
- Keep: `rows`, `resize` as component-specific props

### Step 4.3: Toggle.svelte

Rewrite to use `useUI({ props, role: 'field' })`.
- Delete: all manual glass wiring
- Keep: `checked`, `disabled`, `label`, `onchange` as component-specific props
- Checked state gradient (`from-[var(--glass-accent-1)] to-[var(--glass-accent-2)]`) stays as component-specific visual logic, but uses `ui.glass` to decide glass overlay

### Step 4.4: Icon.svelte

Rewrite to use `useUI({ props, role: 'inline' })`.
- `color` becomes `ThemeColor` (inherited from context). Raw CSS string still accepted as escape hatch: if the value isn't a recognized ThemeColor, pass it through as raw CSS.
- `size` becomes `Size` enum (inherited from context). Raw number still accepted: `Size` maps to `{ xs: 16, sm: 20, md: 24, lg: 28, xl: 32 }`. If a number is passed, use it directly.
- Icon reads `--comp-text` for its color in glass mode. In solid mode, inherits `currentColor` or resolves ThemeColor to a Tailwind class.
- Glass/glow/raised/colored don't produce visible effects on an SVG icon, but Icon still participates in the context chain so it propagates to any theoretical children.

### Step 4.5: Update schemas

- `input/schema.ts` -- `BaseUIPropsSchema.extend({ label: ..., error: ..., helperText: ..., disabled: ... })`
- `textarea/schema.ts` -- `BaseUIPropsSchema.extend({ label: ..., error: ..., helperText: ..., rows: ..., resize: ..., disabled: ... })`
- `toggle/schema.ts` -- `BaseUIPropsSchema.extend({ checked: ..., disabled: ..., label: ... })`
- `icon/schema.ts` -- `BaseUIPropsSchema.extend({ name: z.string(), weight: ..., px: z.number().optional() })`

### Sprint 4 verification

**Tests**:
- `props.test.ts`: Update Input, Textarea, Toggle expectations -- useUI imports, no manual `insideGlass` checks. Add Icon to `VISUAL_COMPONENTS` list.
- `styles.test.ts`: `getFieldStatusOverrides` tests -- update if absorbed, keep assertions.
- `npm test` must pass.

**Visual** (`npm run dev`):
- `/components/input` -- inside and outside glass, all status colors, label/helper text color correct via CSS cascade (no manual checks)
- `/components/textarea` -- same checks as input
- `<Card disabled glass>` with Input inside -- Input is disabled automatically, label/helper text inherit `--comp-text` from wrapper
- `/components/toggle` -- inside glass Card, checked/unchecked states, label color
- `/components/icon` -- inside glass Card picks up parent color. Raw `px={48}` override works. `<Icon name="house" color="primary">` resolves via theme.
- Light/dark mode, default + ocean theme presets

### Sprint 4 files

| Action | File |
|--------|------|
| Rewrite | `src/lib/components/input/Input.svelte` |
| Rewrite | `src/lib/components/textarea/Textarea.svelte` |
| Rewrite | `src/lib/components/toggle/Toggle.svelte` |
| Rewrite | `src/lib/components/icon/Icon.svelte` |
| Modify | `src/lib/components/input/schema.ts` |
| Modify | `src/lib/components/textarea/schema.ts` |
| Modify | `src/lib/components/toggle/schema.ts` |
| Modify | `src/lib/components/icon/schema.ts` |
| Modify | `src/lib/components/props.test.ts` |

---

## Sprint 5: Tests, Demos, Cleanup

**Goal**: Rewrite tests for the new architecture, update demos to showcase context propagation, final cleanup.

### Step 5.1: Rewrite props.test.ts

Replace current tests with new expectations:

1. **Every visual component imports useUI** -- no direct imports of `getParentGlass`, `setContext`, `GLASS_CONTEXT_KEY`, `resolveGlass`, `resolveFrosted`
2. **Every visual component calls useUI with a static role** -- grep for `useUI(`
3. **Every schema uses BaseUIPropsSchema.extend** -- no re-inlined glass/frosted/glow unions
4. **No manual insideGlass checks** -- no `insideGlass ? 'text-[var(--glass-text)]'` patterns
5. **GlassBackdrop usage** -- components with colored still import GlassBackdrop

### Step 5.2: useUI.test.ts (already created in Sprint 1, expand)

Add integration-style tests:
- Full context chain: Card(color=primary) > Input -- Input resolves color=primary
- Tri-state: Card(glass) > Button(glass=false) > Badge -- Button is solid, Badge inherits glass from Card
- Depth stacking: Card(glass) > Card(glass) > Input -- depths are 0, 1, 0 (field recesses from 1)
- Status override: Card(color=primary) > Input(status=error) -- status wins over inherited color

### Step 5.3: Update demos

- Update `GlassDemo.svelte` to showcase context propagation:
  - `<Card color="destructive" size="sm" glass>` with children automatically inheriting
  - `<Button glass={false}>` inside glass Card (tri-state demo)
  - Icon inheriting color from parent Card
- Update other `*Demo.svelte` files if any prop names changed
- Run `npx tsx scripts/generate.ts` to regenerate skills from updated schemas

### Step 5.4: Cleanup

- Remove dead code from `glass.ts` (`getParentGlass`, `GLASS_CONTEXT_KEY`, `GlassContext`)
- Remove `getAlertStyles` export from `styles.ts` if fully absorbed
- Remove `getFieldStatusOverrides` export if fully absorbed
- Verify `GlowWrapper.svelte` is used by all components that need glow
- Remove any unused imports across all migrated files

### Sprint 5 verification
- `npm test` -- all tests pass
- `npm run build` -- production build succeeds
- `npm run dev` -- full visual walkthrough:
  - `/components/glass` -- all sections render correctly
  - `/components/button` -- solid, outline, ghost in all colors
  - `/components/card` -- stacking, reactive, glow, colored
  - `/components/input` -- inside and outside glass
  - `/components/alert` -- all 4 statuses, solid and glass
  - Light mode + dark mode for each page
  - Default, ocean, and ember theme presets
- Screenshot before/after comparison for regression

### Sprint 5 files

| Action | File |
|--------|------|
| Rewrite | `src/lib/components/props.test.ts` |
| Expand | `src/lib/interactions/useUI.test.ts` |
| Modify | `src/components/GlassDemo.svelte` |
| Modify | `src/components/*Demo.svelte` (as needed) |
| Cleanup | `src/lib/interactions/glass.ts` |
| Cleanup | `src/lib/interactions/styles.ts` |
| Modify | `src/lib/components/demos.test.ts` |

---

## Critical Files Reference

### To create
| File | Purpose |
|------|---------|
| `src/lib/types/base.ts` | BaseUIProps interface + BaseUIPropsSchema + shared Zod fragments |
| `src/lib/interactions/useUI.svelte.ts` | The useUI rune |
| `src/lib/interactions/useUI.test.ts` | Rune unit + integration tests |

### To heavily modify
| File | What changes |
|------|-------------|
| `src/lib/interactions/styles.ts` | Absorb getAlertStyles, add solid text-foreground, interaction classes |
| `src/lib/interactions/glass.ts` | Remove getParentGlass, GLASS_CONTEXT_KEY, GlassContext |
| 9 component `.svelte` files | Rewrite to use useUI |
| 7 component `schema.ts` files | Use BaseUIPropsSchema.extend |
| `src/lib/components/props.test.ts` | Rewrite all test expectations |
| `src/lib/index.ts` | Add BaseUIProps export |

### To keep as-is (reuse)
| File | Why |
|------|-----|
| `src/lib/theme/tokens.css` | CSS token system is solid |
| `src/lib/theme/glass.css` | CSS classes are correct |
| `src/lib/interactions/glow.ts` | Pure function, called by useUI |
| `src/lib/interactions/proximity-glow.ts` | Svelte action, used by components |
| `src/lib/interactions/tokens.ts` | Hover/focus presets, used by useUI |
| `src/lib/utils/cn.ts` | Class composition |
| `src/lib/components/glass/GlowWrapper.svelte` | Already built, finally gets used |
| `computeDensity()`, `densityToFrost()`, `resolveGlass()`, `resolveFrosted()` | Pure functions in glass.ts |
| `getGlowClass()` | Pure function in glow.ts |
