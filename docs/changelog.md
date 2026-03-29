# GlassUI Changelog

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
