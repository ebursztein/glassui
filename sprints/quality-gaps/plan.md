# Sprint: Quality Gaps -- A11y, CI Gate, useUI Adoption

## What we're building
Address 4 quality gaps found in code review:
1. **Phase A**: Accessibility fixes for 7 components (keyboard nav + ARIA)
2. **Phase B**: CI gate (check script + GitHub Actions + lefthook)
3. **Phase C**: Component rendering tests (jsdom + testing-library)
4. **Phase D**: useUI adoption for Tooltip + Dropdown

## Key decisions
- Ordered by impact: a11y bugs first (functional), CI gate (prevents regressions), rendering tests (safety net), useUI adoption (consistency)
- Fragile schema parser deferred -- it works and is low risk
- Rendering tests may need Svelte 5 snippet wrapper pattern for children props

## Files to modify

### Phase A (a11y)
- `src/lib/components/layout-splitter/LayoutSplitter.svelte` -- keyboard resize + ARIA separator
- `src/lib/components/tree-view/TreeViewItem.svelte` -- arrow key navigation + aria-level
- `src/lib/components/tooltip/Tooltip.svelte` -- generate tooltip ID
- `src/lib/components/tooltip/TooltipTrigger.svelte` -- aria-describedby
- `src/lib/components/tooltip/TooltipContent.svelte` -- id on tooltip element
- `src/lib/components/dropdown/Dropdown.svelte` -- keyboard open + context updates
- `src/lib/components/dropdown/DropdownTrigger.svelte` -- aria-haspopup, aria-expanded
- `src/lib/components/dropdown/DropdownMenu.svelte` -- roving focus keyboard nav
- `src/lib/components/dropdown/DropdownItem.svelte` -- tabindex, aria-disabled
- `src/lib/components/combobox/ComboBox.svelte` -- arrow key highlight + activedescendant
- `src/lib/components/datepicker/Datepicker.svelte` -- Enter/Space to open
- `src/lib/components/color-picker/ColorPicker.svelte` -- keyboard trigger + role

### Phase B (CI)
- `package.json` -- add "check" script
- `.github/workflows/ci.yml` -- new file
- `lefthook.yml` -- new file

### Phase C (rendering tests)
- `vitest.config.ts` -- add jsdom environment
- `src/lib/components/__tests__/rendering.test.ts` -- new file

### Phase D (useUI)
- `src/lib/components/tooltip/Tooltip.svelte` -- add useUI
- `src/lib/components/dropdown/Dropdown.svelte` -- add useUI
- `src/lib/components/props.test.ts` -- add Tooltip, Dropdown to validation arrays

## What "done" looks like
- All 7 components keyboard-navigable with proper ARIA
- `npm run check` runs tsc + vitest
- GitHub Actions CI on push/PR to main
- lefthook pre-commit runs check
- Rendering tests for Button, Dropdown, ComboBox, Tooltip, Accordion
- Tooltip + Dropdown using useUI with glass context propagation
- All tests pass, build succeeds
