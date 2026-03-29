# GlassUI Master Plan

## Vision

GlassUI is **Preline for Svelte 5 + Astro**. We port Preline's 29 components, CSS system, and accessibility patterns into native Svelte 5 runes with Astro SSG. On top of that Preline foundation, we add our unique glass and glow effects as opt-in props.

**Not dark-first.** Light/dark mode are equal citizens. Glass and glow are optional enhancements, not the default look.

## What We Keep from Current GlassUI

- Svelte 5 runes architecture ($props, $state, $derived, snippets)
- Zod 4 schemas as single source of truth
- Glass/glow/blur prop system (opt-in per component)
- Theme presets (default, ocean, ember, violet, mono)
- Background component with switchable orb presets
- MCP server for component discovery
- Motion system (springs, durations, easings)
- Interaction tokens (hover, focus, glass surface presets)
- Icon component (@iconify/svelte with string names)

## What We Rebuild

- **CSS foundation** -- port Preline's @theme system properly (fonts, semantic colors, component tokens, light/dark)
- **All 29 Preline components** -- native Svelte 5, not wrappers
- **Typography** -- @tailwindcss/typography with Inter font, proper heading/body scales
- **Accessibility** -- match Preline's ARIA patterns, keyboard navigation, focus management
- **Showcase site** -- component docs with live demos, prop editors, code snippets

## Component Mapping: Preline -> GlassUI

| # | Preline Component | GlassUI Status | Sprint |
|---|-------------------|----------------|--------|
| 1 | Accordion | NEW | 4 |
| 2 | Collapse | NEW | 4 |
| 3 | Tree View | NEW | 8 |
| 4 | Tabs | NEW | 5 |
| 5 | Scrollspy | NEW | 8 |
| 6 | Scroll Nav | NEW | 8 |
| 7 | Stepper | NEW | 7 |
| 8 | Dropdown | NEW | 5 |
| 9 | Overlay/Modal | NEW | 6 |
| 10 | Tooltip | NEW | 5 |
| 11 | Select | NEW | 6 |
| 12 | ComboBox | NEW | 7 |
| 13 | Datepicker | NEW | 9 |
| 14 | Range Slider | NEW | 9 |
| 15 | Input Number | NEW | 6 |
| 16 | File Upload | NEW | 9 |
| 17 | Strong Password | NEW | 7 |
| 18 | Toggle Password | NEW | 6 |
| 19 | Toggle Count | NEW | 7 |
| 20 | Copy Markup | NEW | 8 |
| 21 | PIN Input | NEW | 7 |
| 22 | Textarea Auto Height | PARTIAL (Textarea exists) | 3 |
| 23 | DataTable | NEW | 10 |
| 24 | Carousel | NEW | 9 |
| 25 | Layout Splitter | NEW | 10 |
| 26 | Remove Element | NEW (utility) | 8 |
| 27 | Theme Switch | EXISTS (ThemeSwitcher) | 2 |
| 28 | Button | EXISTS | 2 |
| 29 | Card | EXISTS (composable) | 2 |
| 30 | Badge | EXISTS | 2 |
| 31 | Alert | EXISTS | 3 |
| 32 | Input | EXISTS | 3 |
| 33 | Toggle | EXISTS | 3 |
| 34 | Sidebar | EXISTS | 3 |
| 35 | Icon | EXISTS | 2 |
| 36 | Background | EXISTS (GlassUI original) | 2 |

---

## Sprint Breakdown

### Sprint 1: CSS Foundation + Typography
**Goal:** Port Preline's CSS system, set up proper fonts and typography.

**Tasks:**
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

**Files:** `src/styles/globals.css`, `src/lib/theme/tokens.css`, `src/layouts/Layout.astro`, `package.json`

**Verify:** Build compiles. Inter font loads. `bg-primary`, `text-muted-foreground`, `prose` classes work. Light mode looks correct. Dark mode looks correct.

---

### Sprint 2: Rebuild Core Components to Preline Standards
**Goal:** Refactor existing components (Button, Card, Badge, Icon, ThemeSwitcher, Background) to use the new Preline-based CSS tokens and work properly in both light and dark modes.

**Tasks:**
1. **Button** -- refactor solid variants to use semantic tokens (bg-primary, bg-secondary, bg-destructive). Glass variants stay as-is. Fix light mode colors.
2. **Card** -- use bg-card, border-card-line tokens. Keep bg prop for gradient orbs. Fix CardContent padding (p-6 always, not pt-0).
3. **Badge** -- use semantic tokens for variant colors. Fix light mode.
4. **Icon** -- no changes needed (already using @iconify/svelte).
5. **ThemeSwitcher** -- verify works with new token system. Add light/dark toggle icon that uses semantic foreground colors.
6. **Background** -- verify orb presets work on light backgrounds. Add light-friendly presets.
7. **Sidebar** -- use Preline's sidebar semantic tokens (bg-sidebar, sidebar-nav-foreground, sidebar-nav-hover, sidebar-nav-active). Fix active indicator to use primary color.

**Files:** All files in `src/lib/components/{button,card,badge,icon,theme-switcher,background,sidebar}/`

**Verify:** Every component looks correct in both light and dark mode. No hardcoded dark-only colors (no raw `text-white`, use `text-foreground` instead).

---

### Sprint 3: Rebuild Form Components to Preline Standards
**Goal:** Refactor Input, Toggle, Textarea, Alert to use semantic tokens. Add Textarea auto-height. Add Sidebar to docs page.

**Tasks:**
1. **Input** -- use bg-layer, border-line-2, text-foreground. Status colors via semantic tokens. Glass variant keeps backdrop-blur.
2. **Toggle** -- use bg-surface, checked state uses bg-primary. Fix light mode.
3. **Textarea** -- use same token pattern as Input. Add auto-height option (like Preline's TextareaAutoHeight).
4. **Alert** -- use semantic status colors. Fix light mode backgrounds.
5. Update all demo files to work with both modes.
6. Add Sidebar component to the showcase (demo page).

**Files:** `src/lib/components/{input,toggle,textarea,alert}/`, demo files

**Verify:** All form components work in light and dark mode. Textarea auto-height works. Glass variants blur correctly against Card bg="gradient" backgrounds.

---

### Sprint 4: Disclosure Components
**Goal:** Build Accordion, Collapse.

**Tasks:**
1. **Collapse** -- simplest first. Toggle visibility with transition. Props: open (boolean), duration. Keyboard: Enter/Space to toggle. ARIA: aria-expanded, aria-controls.
2. **Accordion** -- composed from Collapse items. Props: type (single/multiple), defaultOpen. Only one item open at a time in single mode. Keyboard: Arrow up/down to navigate items.
3. Add glass/glow support to both.
4. Demo pages with prop editors.

**Files:** Create `src/lib/components/{accordion,collapse}/`

**Verify:** Keyboard navigation works. Screen reader announces expanded/collapsed state. Smooth height animation. Glass mode looks correct.

---

### Sprint 5: Navigation + Overlay Components (Part 1)
**Goal:** Build Tabs, Dropdown, Tooltip.

**Tasks:**
1. **Tabs** -- horizontal/vertical orientation. Props: defaultValue, variant. Keyboard: Arrow left/right, Home/End. ARIA: role=tablist, role=tab, role=tabpanel. Use Preline's click/hover trigger pattern.
2. **Dropdown** -- positioned via @floating-ui/dom. Props: trigger (click/hover), placement. Keyboard: Escape to close, arrow keys to navigate items. ARIA: aria-haspopup, aria-expanded.
3. **Tooltip** -- positioned via @floating-ui/dom. Props: content, placement, trigger (hover/click). Keyboard: Escape to dismiss. ARIA: role=tooltip, aria-describedby.
4. Install @floating-ui/dom for positioning.
5. Glass/glow support on all three.

**Dependencies:** `npm install @floating-ui/dom`

**Files:** Create `src/lib/components/{tabs,dropdown,tooltip}/`

**Verify:** Positioning works at all 4 placements. Keyboard navigation matches Preline. Focus trap works in dropdown.

---

### Sprint 6: Overlay + Form Components (Part 2)
**Goal:** Build Modal/Overlay, Select, InputNumber, TogglePassword.

**Tasks:**
1. **Overlay/Modal** -- full modal with backdrop, focus trap, scroll lock. Props: open, size (sm/md/lg/xl/full). Sub-components: OverlayHeader, OverlayBody, OverlayFooter. Keyboard: Escape to close, Tab trap. ARIA: role=dialog, aria-modal. Animate in/out with motion tokens.
2. **Select** -- custom dropdown select. Props: options, value, placeholder, searchable, multiple. Keyboard: Arrow keys, Enter to select, Escape to close. Uses Dropdown positioning internally.
3. **InputNumber** -- numeric input with +/- buttons. Props: min, max, step, value. Keyboard: Arrow up/down to increment. ARIA: role=spinbutton.
4. **TogglePassword** -- show/hide password toggle. Props: visible. Uses Icon component for eye/eye-slash.
5. Glass/glow on all.

**Files:** Create `src/lib/components/{overlay,select,input-number,toggle-password}/`

**Verify:** Modal focus trap works. Select search filters. InputNumber respects min/max. Password toggle changes input type.

---

### Sprint 7: Advanced Form Components
**Goal:** Build Stepper, ComboBox, StrongPassword, ToggleCount, PINInput.

**Tasks:**
1. **Stepper** -- multi-step wizard. Props: steps, currentStep, orientation. Sub-components: StepperItem, StepperContent. Visual progress indicator. Keyboard: arrow navigation between steps.
2. **ComboBox** -- searchable autocomplete with grouped results. Props: options, value, groupBy, allowCustom. Uses Dropdown + Input internally.
3. **StrongPassword** -- password strength meter. Props: minLength, requireUppercase, requireNumber, requireSpecial. Visual strength bar.
4. **ToggleCount** -- animated counter. Props: value, min, max. Smooth number transition.
5. **PINInput** -- multi-digit code input. Props: length, mask. Auto-focus next field. Paste support.

**Files:** Create `src/lib/components/{stepper,combobox,strong-password,toggle-count,pin-input}/`

**Verify:** Stepper navigates correctly. ComboBox filters and groups. PIN auto-advances. Strength meter calculates correctly.

---

### Sprint 8: Utility + Specialized Components
**Goal:** Build TreeView, Scrollspy, ScrollNav, CopyMarkup, RemoveElement.

**Tasks:**
1. **TreeView** -- hierarchical tree with expand/collapse. Props: data, selectable, checkable. Keyboard: Arrow keys to navigate tree. ARIA: role=tree, role=treeitem.
2. **Scrollspy** -- highlights nav item based on scroll position. Props: target (selector), offset. Uses IntersectionObserver.
3. **ScrollNav** -- smooth scroll navigation with auto-centering. Props: items, smooth. Integrates with Scrollspy.
4. **CopyMarkup** -- copies HTML/text to clipboard. Props: target, feedback. Shows success toast via notifications state.
5. **RemoveElement** -- removes DOM elements with animation. Props: target, animation. Uses motion tokens for exit animation.

**Files:** Create `src/lib/components/{tree-view,scrollspy,scroll-nav,copy-markup,remove-element}/`

**Verify:** Tree keyboard navigation works. Scrollspy highlights correct item. Copy writes to clipboard.

---

### Sprint 9: Rich Form + Media Components
**Goal:** Build Datepicker, RangeSlider, FileUpload, Carousel.

**Tasks:**
1. **Datepicker** -- calendar date picker. Props: value, min, max, format, locale. Keyboard: Arrow keys to navigate days, Page up/down for months. Consider using a lightweight calendar library or build from scratch.
2. **RangeSlider** -- dual-handle slider. Props: min, max, step, value (single or range). Keyboard: Arrow keys to adjust. ARIA: role=slider. Consider nouislider integration or custom.
3. **FileUpload** -- drag-and-drop upload zone. Props: accept, maxSize, multiple. Visual progress. DnD events + click-to-browse.
4. **Carousel** -- content slider. Props: autoPlay, loop, slidesPerView, gap. Keyboard: Arrow keys. Touch/drag support. Responsive breakpoints.

**Files:** Create `src/lib/components/{datepicker,range-slider,file-upload,carousel}/`

**Verify:** Datepicker handles locale formats. Slider handles range mode. FileUpload validates file types. Carousel loops and auto-plays.

---

### Sprint 10: Data + Polish + Ship
**Goal:** Build DataTable, LayoutSplitter. Polish everything. Ship v0.5.

**Tasks:**
1. **DataTable** -- sortable, filterable, paginated table. Props: columns, data, sortable, filterable, pageSize. Keyboard: Tab between cells, Enter to sort. Consider lightweight implementation (no jQuery dependency like Preline).
2. **LayoutSplitter** -- resizable split panes. Props: orientation, sizes, minSize. Drag handle with keyboard support (arrow keys to resize).
3. **Polish pass** -- audit every component for:
   - Consistent light/dark mode
   - Glass/glow working correctly
   - ARIA compliance
   - Keyboard navigation
   - Responsive behavior
4. **Documentation** -- complete showcase site with all components, usage examples, API docs
5. **NPM package** -- configure package.json exports, build for distribution
6. Regenerate MCP tools and skills for all components
7. Update CLAUDE.md with final component list

**Files:** Create `src/lib/components/{data-table,layout-splitter}/`, update all docs

**Verify:** Full build passes. All 36 components render in both modes. Showcase site is complete and navigable. Package exports work.

---

### Sprint 11: Packaging, Tree Shaking + Performance
**Goal:** Make GlassUI consumable as an npm package with proper tree shaking, lazy loading for heavy components, and verified performance. Ship v1.0.

**Tasks:**
1. **svelte-package build** -- set up `@sveltejs/package` to compile `src/lib/` into a distributable package. Output individual component files, not one big bundle.
2. **package.json exports map** -- configure conditional exports with `svelte`, `types`, and `default` conditions. Per-component entry points (`glassui/button`, `glassui/card`, etc.) alongside the barrel `glassui` import.
3. **sideEffects field** -- add `"sideEffects": ["**/*.css"]` to package.json so bundlers can tree-shake unused components while preserving CSS imports.
4. **CSS distribution** -- ship tokens + glass utilities as:
   - `glassui/css` -- importable CSS file for Tailwind v4 projects (tokens + @theme inline + glass utilities)
   - `glassui/css/preflight` -- pre-built CSS bundle for non-Tailwind projects (includes all utility classes used by components)
5. **Lazy loading** -- export async wrappers for heavy components (Datepicker, DataTable, Carousel, RangeSlider) so they can be dynamically imported: `import { LazyDatepicker } from 'glassui/lazy'`.
6. **Bundle size budget** -- measure and document per-component sizes. Set budget: <5KB gzipped per simple component, <15KB for complex ones. Add CI check with `size-limit` or similar.
7. **SvelteKit consumption test** -- create `examples/sveltekit-starter/` with a fresh SvelteKit project that imports GlassUI. Verify: tree shaking works (importing Button doesn't bundle DataTable), SSR renders correctly, hydration works, light/dark mode works.
8. **Astro consumption test** -- verify GlassUI works in a standalone Astro project (not just the showcase).
9. **SSR audit** -- verify all components handle `typeof document === 'undefined'` (no SSR crashes). Check theme initialization doesn't flash wrong mode.
10. **Performance audit** -- Lighthouse score on showcase site. Target: Performance >90, Accessibility >95, Best Practices >90.
11. **MCP server update** -- add `get_install_instructions` tool that returns setup steps for SvelteKit/Astro/Vite projects. Update existing tools to include import paths from package (not just `$lib/`).
12. **README + npm publish prep** -- write package README with install, setup, usage, theming, and glass props. Configure npm files/publishConfig.

**Dependencies:**
| Package | Purpose |
|---------|---------|
| @sveltejs/package | Svelte library build tool |
| size-limit | Bundle size CI checks |
| @size-limit/preset-small-lib | Size limit preset for libraries |

**Files:**
- `svelte.config.js` -- add package config
- `package.json` -- exports, sideEffects, files, scripts
- `src/lib/lazy/index.ts` -- async component wrappers
- `examples/sveltekit-starter/` -- consumption test project
- `README.md` -- package documentation

**Verify:**
- `npm run package` produces correct output in `dist/`
- `import { Button } from 'glassui'` works in SvelteKit project
- `import { Button } from 'glassui/button'` works (per-component import)
- Importing only Button does NOT include DataTable code (tree shaking)
- `import 'glassui/css'` loads all tokens in consuming project
- SSR renders all components without errors
- Lighthouse accessibility >95
- Bundle size within budget
- `npm pack` produces clean tarball ready for publish

---

## Architecture Rules (Apply to Every Sprint)

1. **Semantic tokens first** -- use `bg-primary`, `text-foreground`, `border-line-2` not raw colors
2. **Light and dark** -- every component must look correct in both modes
3. **Glass is opt-in** -- `glass`, `blur`, `glow` props are always optional, default false
4. **Zod schema** -- every component gets schema.ts with validation + ComponentMeta
5. **Keyboard accessible** -- match Preline's keyboard patterns for each component
6. **ARIA compliant** -- correct roles, states, properties per WAI-ARIA practices
7. **Svelte 5 runes** -- $props, $state, $derived, snippets. No legacy Svelte patterns.
8. **Demo page** -- every component gets a showcase page with PropEditor
9. **Exports** -- add to `src/lib/index.ts` and nav in Layout.astro
10. **No raw divs in demos** -- use Card component for demo sections

## Dependencies to Add

| Package | Sprint | Purpose |
|---------|--------|---------|
| @tailwindcss/typography | 1 | Prose/heading typography |
| @floating-ui/dom | 5 | Dropdown/tooltip/popover positioning |
| @sveltejs/package | 11 | Svelte library build/packaging |
| size-limit | 11 | Bundle size CI checks |

## Current Component Count: 11 -> Target: 36
