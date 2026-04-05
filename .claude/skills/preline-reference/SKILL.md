---
name: preline-reference
description: Complete reference of Preline's 27 components -- their interfaces, HTML patterns, accessibility, CSS variables, and theming. Use when building new GlassUI components to understand the Preline original we're drawing inspiration from. Trigger when creating or planning any new component, or when the user mentions Preline.
---

# Preline Component Library Reference

Preline v4.1.3 is a Tailwind CSS component library with 27 headless plugins. GlassUI draws from Preline's component designs, accessibility patterns, and API conventions -- but builds natively in Svelte 5.

The source lives at `tmp/pkg/preline/` in the repo. For the full component inventory with interfaces, HTML structure, and accessibility details, read `references/preline-components.md`.

## Architecture Overview

Each Preline plugin follows this structure:
```
src/plugins/{name}/
  core.ts        -- main class extending HSBasePlugin
  interfaces.ts  -- TypeScript option/component interfaces
  auto.ts        -- auto-initialization on window load
  types.ts       -- (optional) custom types
  variants.css   -- Tailwind custom variants for state styling
```

## Component Categories

### Layout & Display
- **Accordion** -- collapsible sections, supports always-open and keep-one-open modes
- **Collapse** -- single collapsible toggle
- **Tabs** -- tab switching with keyboard nav (click or hover trigger)
- **Carousel** -- slides with drag, touch, infinite loop, responsive slidesQty
- **Stepper** -- multi-step progress with nav items, skip, optional, error states
- **Tree View** -- hierarchical selectable tree with checkbox/button control
- **Layout Splitter** -- resizable panels

### Overlays & Popups
- **Dropdown** -- positioned menu via Floating UI, click/hover trigger, auto-close modes
- **Overlay (Modal)** -- dialog with backdrop, z-index stacking, focus trap, close-previous
- **Tooltip** -- positioned tooltip via Floating UI

### Form Components
- **Select** -- advanced select with search, multi-select, API integration, tags mode
- **ComboBox** -- autocomplete with API, grouping (default/tabs), search modes
- **Datepicker** -- calendar picker (wraps vanilla-calendar-pro)
- **Range Slider** -- dual-range (wraps nouislider)
- **Input Number** -- number spinner with min/max/step
- **PIN Input** -- multi-digit OTP input
- **Textarea Auto Height** -- auto-growing textarea
- **File Upload** -- drag-and-drop (wraps Dropzone)
- **Strong Password** -- strength validator with visual hints
- **Toggle Password** -- show/hide password

### Utility
- **Theme Switch** -- dark/light/system with localStorage persistence
- **Toggle Count** -- animated number counter
- **Copy Markup** -- copy HTML templates
- **Remove Element** -- animated element removal
- **Scroll Nav** -- smooth scrolling nav with auto-center
- **Scrollspy** -- highlights nav based on scroll position
- **DataTable** -- sortable/filterable table (wraps DataTables.net)

### Global
- **Accessibility Manager** -- WCAG keyboard handler for all components

## Key Patterns

### Accessibility (adopt fully)
Every interactive component has:
- Full keyboard nav: Arrow keys, Home, End, Escape, Enter, Tab
- ARIA: `aria-expanded`, `aria-haspopup`, `aria-selected`, `aria-controls`, `role`
- Focus management: auto-focus on open, restore on close, trap in modals
- First-letter navigation in lists

### CSS Variable Theming
Semantic names by component: `--card-*`, `--navbar-*`, `--dropdown-*`, `--overlay-*`
State variants: hover, focus, active, checked
9 built-in themes: default, ocean, moon, bubblegum, autumn, harvest, cashmere, olive, retro
OKLCH color space for perceptual uniformity

### Data Attribute Configuration
Preline uses inline CSS custom properties for per-instance config:
```html
<div class="hs-dropdown [--trigger:hover] [--auto-close:inside]">
```
In GlassUI these become Svelte props instead.

### HTML Composition
Sub-component pattern: Card = Card + CardHeader + CardTitle + CardDescription + CardContent + CardFooter

## Dependencies Preline Uses
- `@floating-ui/dom` -- dropdown/tooltip positioning (we should use this too)
- `vanilla-calendar-pro` -- datepicker
- `nouislider` -- range slider
- `dropzone` -- file upload
- `datatables.net` -- data tables
- `culori` -- OKLCH color conversion
