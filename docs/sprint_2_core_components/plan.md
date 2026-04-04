# Sprint 2: Rebuild Core Components to Preline Standards

## Goal
Refactor existing components (Button, Card, Badge, Icon, ThemeSwitcher, Background, Sidebar) to use the new Preline-based CSS semantic tokens from `tokens.css`. Every component must look correct in both light and dark mode. Glass variants stay as-is.

## Token Migration Map

| Old (hardcoded)       | New (semantic)               |
|-----------------------|------------------------------|
| `text-white`          | `text-foreground`            |
| `text-white/60`       | `text-muted-foreground`      |
| `text-white/40`       | `text-muted-foreground`      |
| `bg-neutral-900`      | `bg-card` (cards) / `bg-layer` (surfaces) |
| `bg-neutral-800`      | `bg-secondary`               |
| `bg-neutral-950/80`   | `bg-sidebar`                 |
| `border-white/10`     | `border-line-1`              |
| `border-white/20`     | `border-line-2`              |
| `border-neutral-800`  | `border-card-line`           |
| `border-neutral-700`  | `border-line-2`              |
| `border-neutral-600`  | `border-line-3`              |
| `bg-white/10`         | `bg-sidebar-nav-hover` (sidebar) / `bg-layer-hover` (general) |
| `text-neutral-300`    | `text-muted-foreground-2`    |
| `text-neutral-400`    | `text-muted-foreground`      |
| `bg-red-600`          | `bg-destructive`             |
| `hover:bg-neutral-700`| `hover:bg-layer-hover`       |
| `hover:bg-neutral-800`| `hover:bg-secondary-hover`   |

## Tasks

### 1. Button
- Solid variants: replace `bg-neutral-800`/`text-white` with `bg-surface`/`text-foreground`/`border-line-2`
- Primary solid: use `bg-primary`/`text-primary-foreground` with hover/active states
- Outline: use `border-line-3`/`text-foreground`
- Ghost: use `text-muted-foreground` with `hover:bg-layer-hover`/`hover:text-foreground`
- Destructive: use `bg-destructive`/`text-destructive-foreground`
- Glass variants: keep as-is (they use `--glass-*` tokens)

### 2. Card + Sub-components
- Card solid: `bg-card border-card-line`
- CardTitle: `text-foreground`
- CardDescription: `text-muted-foreground`
- CardContent: `p-6` always (fix `pt-0` only when preceded by header)
- Glass variant: keep as-is

### 3. Badge
- Default solid: `bg-surface text-surface-foreground border-surface-line`
- Primary: `bg-primary text-primary-foreground`
- Outline: `border-line-3 text-foreground`
- Ghost: `text-muted-foreground`
- Destructive: `bg-destructive text-destructive-foreground`
- Status colors: use semantic tones where available
- Glass variants: keep as-is

### 4. Icon
- No changes needed (uses @iconify/svelte, no color hardcoding)

### 5. ThemeSwitcher
- Mode toggle: `text-muted-foreground` -> `hover:text-foreground`
- Active preset ring: `ring-foreground/60`
- Hover bg: `hover:bg-layer-hover`

### 6. Background + BackgroundSwitcher
- Add light-friendly presets (light-blue, light-warm)
- BackgroundSwitcher: replace `border-white/XX`, `ring-white/XX` with semantic tokens

### 7. Sidebar + Sub-components
- Sidebar: `bg-sidebar border-sidebar-line`
- SidebarHeader: `text-foreground`
- SidebarSection label: `text-muted-foreground`
- SidebarItem active: `bg-sidebar-nav-active text-foreground` + `before:bg-primary`
- SidebarItem default: `text-sidebar-nav-foreground hover:bg-sidebar-nav-hover`
- SidebarFooter: `border-sidebar-line`

### 8. Layout.astro
- Mobile header: `border-line-1`, `text-foreground`
- Footer labels: `text-muted-foreground`

## Files Modified
- `src/lib/components/button/Button.svelte`
- `src/lib/components/card/Card.svelte`
- `src/lib/components/card/CardTitle.svelte`
- `src/lib/components/card/CardDescription.svelte`
- `src/lib/components/badge/Badge.svelte`
- `src/lib/components/theme-switcher/ThemeSwitcher.svelte`
- `src/lib/components/background/BackgroundSwitcher.svelte`
- `src/lib/components/sidebar/Sidebar.svelte`
- `src/lib/components/sidebar/SidebarHeader.svelte`
- `src/lib/components/sidebar/SidebarSection.svelte`
- `src/lib/components/sidebar/SidebarItem.svelte`
- `src/lib/components/sidebar/SidebarFooter.svelte`
- `src/layouts/Layout.astro`
- `src/lib/state/theme.svelte.ts` (new background presets)

## Verify
- Every component looks correct in light mode
- Every component looks correct in dark mode
- No hardcoded `text-white` outside glass variants
- No hardcoded `bg-neutral-*` outside glass variants
- `npm run build` succeeds
