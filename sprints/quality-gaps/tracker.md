# Sprint: Quality Gaps

## Phase A: Accessibility Fixes
- [x] A1. LayoutSplitter -- keyboard resize + ARIA separator
- [x] A2. TreeViewItem -- arrow key navigation + aria-level
- [x] A3. Tooltip -- aria-describedby linking
- [x] A4. Dropdown -- keyboard navigation + ARIA on trigger
- [x] A5. ComboBox -- arrow key navigation in listbox
- [x] A6. Datepicker -- keyboard to open calendar
- [x] A7. ColorPicker -- keyboard to trigger picker
- [x] Testing gate (Phase A) -- 350 tests pass, build passes
- [ ] Commit: Phase A

## Phase B: CI Gate
- [x] B1. Add `check` script to package.json
- [x] B2. GitHub Actions CI workflow
- [x] B3. Lefthook pre-commit
- [ ] Commit: Phase B

### Notes
- Added `@types/node` to fix pre-existing tsc errors (test files use __dirname, fs, path)
- Added `exclude: ["tools", "tmp", "node_modules", "dist"]` to tsconfig.json

## Phase C: Rendering Tests
- [x] C1. Install @testing-library/svelte + jsdom
- [x] C2. Update vitest config (jsdom environment + svelte plugin + browser resolve)
- [x] C3. Write rendering tests (Button, Dropdown, Tooltip, Accordion) -- 13 tests
- [x] Testing gate (Phase C) -- 363 tests pass, build passes
- [ ] Commit: Phase C

### Notes
- Used `environmentMatchGlobs` to only apply jsdom for `__tests__/` files
- Added `resolve.conditions: ['browser']` to fix Svelte server-side import issue
- Polyfilled `Element.animate` for jsdom (used by Svelte transitions)
- Test wrappers needed for Svelte 5 snippet children (ButtonTest, AccordionTest, etc.)
- Fixed menuEl in DropdownMenu to use $state to clear compiler warning

## Phase D: useUI Adoption
- [x] D1. Tooltip.svelte -- add useUI
- [x] D2. Dropdown.svelte -- add useUI
- [x] D3. Update props.test.ts -- added container component validation section
- [x] Testing gate (Phase D) -- 371 tests pass, build passes
- [x] Commit: Phase D

## Notes
