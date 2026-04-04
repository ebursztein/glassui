# Sprint 2 Tracker

## Component Refactoring
- [x] Button -- bg-surface/text-foreground/border-line-2 for default; bg-primary for primary; semantic tokens throughout
- [x] Card -- bg-card/border-card-line; CardTitle text-foreground; CardDescription text-muted-foreground
- [x] Badge -- bg-surface/text-surface-foreground for default; bg-primary for primary; semantic tokens throughout
- [x] Icon -- verified (no changes needed, uses @iconify/svelte)
- [x] ThemeSwitcher -- text-muted-foreground, ring-foreground/60, hover:bg-layer-hover
- [x] Background/BackgroundSwitcher -- added light-blue, light-warm presets; semantic ring/border tokens
- [x] Sidebar + sub-components -- bg-sidebar, border-sidebar-line, text-sidebar-nav-foreground, bg-sidebar-nav-active

## Additional Components Fixed
- [x] Input -- bg-layer/border-line-2/text-foreground; label text-foreground
- [x] Textarea -- same as Input
- [x] Alert -- text-foreground for title; text-muted-foreground for body; semantic dismiss button
- [x] Toggle -- bg-surface/border-surface-line for track; text-foreground for label
- [x] PropEditor -- text-foreground/text-muted-foreground

## Infrastructure
- [x] Layout.astro -- mobile header bg-sidebar/border-sidebar-line; footer labels text-muted-foreground
- [x] Astro pages -- page headings kept as text-white (sit on gradient background)
- [x] Demo .svelte files -- section headers use text-foreground (inside Card surfaces)
- [x] Light/dark mode verified in browser (Chrome DevTools screenshots)
- [x] npm run build passes
- [x] Changelog updated
