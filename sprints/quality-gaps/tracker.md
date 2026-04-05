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
- [ ] B1. Add `check` script to package.json
- [ ] B2. GitHub Actions CI workflow
- [ ] B3. Lefthook pre-commit
- [ ] Commit: Phase B

## Phase C: Rendering Tests
- [ ] C1. Install @testing-library/svelte + jsdom
- [ ] C2. Update vitest config (jsdom environment)
- [ ] C3. Write rendering tests (Button, Dropdown, ComboBox, Tooltip, Accordion)
- [ ] Testing gate (Phase C)
- [ ] Commit: Phase C

## Phase D: useUI Adoption
- [ ] D1. Tooltip.svelte -- add useUI
- [ ] D2. Dropdown.svelte -- add useUI
- [ ] D3. Update props.test.ts
- [ ] Testing gate (Phase D)
- [ ] Commit: Phase D

## Notes
