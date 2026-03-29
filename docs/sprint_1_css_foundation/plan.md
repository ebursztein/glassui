# Sprint 1: CSS Foundation + Typography

## Goal
Port Preline's CSS system, set up proper fonts and typography. This is the foundation that all subsequent sprints build upon.

## Tasks

1. Install `@tailwindcss/typography`, add `@plugin` directive
2. Add Inter font via Google Fonts in Layout.astro head
3. Create `@theme` block in globals.css with font families (sans, mono)
4. Port Preline's `@theme inline` block -- semantic color tokens adapted for GlassUI
   - background, foreground, inverse
   - border/line scale (1-8)
   - primary (full 50-950 scale + hover/focus/active states)
   - secondary, layer, surface, muted, destructive
   - Component tokens: sidebar, card, dropdown, overlay, popover, tooltip
5. Port `:root` light mode values from Preline theme.css
6. Port `.dark` dark mode overrides from Preline theme.css
7. Merge existing GlassUI glass tokens (--glass-*) alongside Preline tokens
8. Keep existing theme presets (ocean, ember, violet, mono) -- update them to also override Preline semantic tokens
9. Update globals.css `@layer base` to use `@apply border-border` like Preline
10. Set up heading scale: h1-h6 sizes, weights, line-heights via typography config

## Files
- `src/styles/globals.css`
- `src/lib/theme/tokens.css`
- `src/layouts/Layout.astro`
- `package.json`

## Acceptance Criteria
- Build compiles without errors
- Inter font loads in browser
- `bg-primary`, `text-muted-foreground`, `prose` classes work
- Light mode looks correct
- Dark mode looks correct
- Existing glass tokens still work
- Theme presets still work
