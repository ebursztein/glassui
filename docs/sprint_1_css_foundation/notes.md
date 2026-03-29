# Sprint 1 Notes

## Decisions

- **Font choice**: Inter via Google Fonts for sans-serif, system mono for code
- **Token strategy**: Port Preline's full semantic token system (`@theme inline` block) so Tailwind classes like `bg-primary`, `text-foreground`, `border-line-2` work natively
- **Glass coexistence**: Keep all existing `--glass-*` tokens in their own `:root` block. They are independent of Preline's semantic system and used by the glass surface/glow utilities
- **Theme presets**: Presets override both glass accent colors and Preline primary/secondary scales
- **Dark mode**: Use `.dark` class (matching Preline) instead of `prefers-color-scheme`. The HTML starts with `class="dark"` by default
- **No custom color palettes**: Preline defines khaki/mauve/avocado custom colors -- we skip these for now since GlassUI doesn't use them. Can add later if needed.

## Learnings

- Tailwind v4 uses `@theme` and `@theme inline` blocks instead of the old `tailwind.config.js` approach
- `@theme inline` prevents Tailwind from generating standalone utility classes for each token -- the tokens are only usable via `var()` references
- Preline uses Tailwind's built-in color palette (gray, blue, red, etc.) as the base, then maps semantic tokens on top
