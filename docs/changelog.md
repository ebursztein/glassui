# GlassUI Changelog

## useUI Refactor: Context-Driven State Machine (2026-04-04)

### New: useUI rune
- Created `useUI` composable -- single entry point replacing ~30-40 lines of per-component glass wiring
- Pure logic in `useUI.logic.ts` (testable without Svelte), thin wrapper in `useUI.svelte.ts`
- Context propagation: color, size, style, disabled flow from parent to children automatically
- Glass tri-state: `glass=false` opts out without breaking the chain for descendants
- Disabled stickiness: `<Card disabled>` disables all children (inputs, buttons)
- `'theme'` color only propagates to containers (not actions/fields/inlines)

### New: BaseUIPropsSchema
- Created shared Zod schema in `src/lib/types/base.ts` with reusable `GlassField`, `FrostedField`, `GlowField` fragments
- All 7 component schemas now use `BaseUIPropsSchema.extend()` instead of re-inlining unions

### Migrated components (all 7 visual)
- **Card** (`container`): removed manual context setting, uses `useUI` + `getParentUI` for sub-components
- **Sidebar** (`container`): gained glass density levels, frosted, colored, raised, glow props
- **Button** (`action`): `ui.disabled` incorporates context + loading state
- **Badge** (`inline`): `ui.showBackdrop` replaces manual `colored && !insideGlass` guard
- **Alert** (`container`): replaced `getAlertStyles` with unified CSS custom properties (`--comp-accent`, `--comp-text`)
- **Input** (`field`): `ui.styles` on wrapper cascades `--comp-text` to label/helper text
- **Textarea** (`field`): same pattern as Input
- **Toggle** (`field`): keeps checked gradient as component-specific logic

### Styling engine enhancements
- `getComponentStyles` now handles container+status (solid + glass) with `--comp-accent`/`--comp-text` CSS vars
- Glass field+status absorbed: `--comp-status` for border/focus ring colors
- Solid field outputs `--comp-text: var(--foreground)` for CSS cascade to labels

### Removed dead code
- `glass.ts`: removed `getParentGlass`, `GLASS_CONTEXT_KEY`, `GlassContext`, `GlassProps`
- `styles.ts`: removed `getAlertStyles`, `getFieldStatusOverrides` (fully absorbed)
- All legacy bridge code removed from Card and Sidebar

### Tests
- 305 tests passing (45 useUI tests including 7 context chain integration tests)
- `props.test.ts` rewritten: validates useUI imports, no old glass wiring, BaseUIPropsSchema usage

## Sprint 2: Rebuild Core Components to Preline Standards (2026-03-30)

### Component Token Migration
- Refactored **Button** solid variants: default uses `bg-surface`/`text-foreground`/`border-line-2` (subtle in both modes); primary uses `bg-primary`/`text-primary-foreground`; outline uses `border-line-3`/`text-foreground`; ghost uses `text-muted-foreground`/`hover:bg-layer-hover`; destructive uses `bg-destructive`/`text-destructive-foreground`
- Refactored **Card** + sub-components: `bg-neutral-900` to `bg-card`; `border-neutral-800` to `border-card-line`; CardTitle `text-white` to `text-foreground`; CardDescription `text-white/60` to `text-muted-foreground`
- Refactored **Badge** solid variants: default uses `bg-surface`/`text-surface-foreground`; primary uses `bg-primary`/`text-primary-foreground`; outline uses `border-line-3`; ghost uses `text-muted-foreground`; status badges updated
- Refactored **Sidebar** + sub-components: `bg-neutral-950/80` to `bg-sidebar`; `border-white/10` to `border-sidebar-line`; nav items use `text-sidebar-nav-foreground`/`hover:bg-sidebar-nav-hover`; active items use `bg-sidebar-nav-active`/`before:bg-primary`
- Refactored **ThemeSwitcher**: `text-white/60` to `text-muted-foreground`; `ring-white/60` to `ring-foreground/60`; hover bg to `hover:bg-layer-hover`
- Refactored **BackgroundSwitcher**: ring/border from `white/XX` to `foreground/60` and `border-line-2`
- Refactored **Input** solid: `bg-neutral-900`/`border-neutral-700` to `bg-layer`/`border-line-2`; labels to `text-foreground`
- Refactored **Textarea** solid: same token migration as Input
- Refactored **Alert** text: title to `text-foreground`; body to `text-muted-foreground`; dismiss button uses semantic tokens
- Refactored **Toggle** track: `bg-neutral-700` to `bg-surface`; label to `text-foreground`

### Background Presets
- Added `light-blue` preset (soft blue gradient with subtle orbs)
- Added `light-warm` preset (warm amber gradient with subtle orbs)
- Updated BackgroundPresetEnum schema to include new presets

### Page/Layout Migration
- Layout.astro: mobile header border to `border-line-1`; text to `text-foreground`; footer labels to `text-muted-foreground`
- All component Astro pages: headings to `text-foreground`; descriptions to `text-muted-foreground`
- index.astro: hero and section headings to semantic tokens
- All Demo.svelte files: section headings to `text-foreground`; descriptions to `text-muted-foreground`/`text-muted-foreground-2`
- PropEditor.svelte: labels to `text-foreground`; descriptions to `text-muted-foreground`

### Glass Variants Preserved
- All glass variants (bg-white/10, backdrop-blur, border-white/20) intentionally left unchanged -- they use the independent `--glass-*` token system

## Sprint 1: CSS Foundation + Typography (2026-03-29)

### CSS Token System
- Ported Preline's full `@theme inline` semantic token mapping (background, foreground, border/line-1-8, primary-50-950, secondary, layer, surface, muted, destructive, component tokens for sidebar/card/dropdown/overlay/popover/tooltip/switch)
- Added `:root` light mode values from Preline theme.css
- Added `.dark` dark mode overrides from Preline theme.css
- Merged existing `--glass-*` tokens alongside Preline tokens (two independent systems coexist)
- Updated theme presets (ocean, ember, violet, mono) to override both glass accents and Preline primary scale

### Typography
- Installed `@tailwindcss/typography` with `@plugin` directive
- Added Inter font via Google Fonts with `preconnect` for performance
- Created `@theme` block with `--font-sans` (Inter) and `--font-mono` (system mono)
- Set up heading scale: h1 (4xl/bold), h2 (3xl/semibold), h3 (2xl/semibold), h4 (xl/semibold), h5 (lg/medium), h6 (base/medium)

### Base Layer
- Updated `@layer base` to use `@apply border-border` like Preline
- Updated body to use `bg-background text-foreground font-sans`
- Tailwind classes now available: `bg-primary`, `text-foreground`, `border-line-2`, `text-muted-foreground`, `prose`, etc.

## Pre-Sprint Work (2026-03-28)

### Foundation
- Transformed einui (React/Next.js) into GlassUI Svelte 5 + Astro
- Built design system foundation: shared enums, global state, motion tokens, interaction tokens
- Created theme system with 5 presets (default, ocean, ember, violet, mono)
- Set up MCP server for component discovery

### Components (11)
- Button -- 5 variants, 5 sizes, glass/glow support
- Icon -- string-based names via @iconify/svelte (`<Icon name="house" />`)
- Card -- composable (Header, Title, Description, Content, Footer), bg prop for gradient orbs
- Badge -- variant + status colors, glass support
- Alert -- 4 statuses, dismissible, icon, glass/glow
- Input -- sizes, statuses, glass/glow
- Toggle -- switch component, sizes, glass
- Textarea -- multi-line input, statuses, glass/glow
- ThemeSwitcher -- preset dots + dark/light toggle
- Background -- full-page layer with 9 switchable orb/gradient presets
- Sidebar -- composable (Header, Section, Item, Footer), active state indicators

### Infrastructure
- Showcase site with demo pages and PropEditor for each component
- Background switcher and theme switcher in sidebar
- search_icons MCP tool for Phosphor icon lookup
