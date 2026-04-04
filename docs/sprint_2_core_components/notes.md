# Sprint 2 Notes

## Key Decisions

### Glass variants untouched
Glass variants use `--glass-*` CSS custom properties which are an independent system from Preline semantic tokens. They work correctly in both modes already via the `.light` override block in tokens.css.

### Semantic token mapping
- `text-white` in non-glass contexts -> `text-foreground` (adapts to gray-800 in light, neutral-200 in dark)
- `bg-neutral-900` for card surfaces -> `bg-card` (white in light, neutral-800 in dark)
- `border-white/10` for subtle borders -> `border-line-1` (gray-100 in light, neutral-800 in dark)
- Active sidebar items use `bg-sidebar-nav-active` + `before:bg-primary` for the accent bar

### Background presets
Added light-friendly presets so users on light mode have appealing background options beyond plain white. Dark presets remain unchanged.

### CardContent padding
Kept `p-6 pt-0` as designed -- the pt-0 avoids double padding when CardContent follows CardHeader (which has p-6). This matches Preline's card padding pattern.
