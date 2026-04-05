# Preline Component Interfaces & Patterns

Source: `tmp/pkg/preline/src/plugins/`

## Table of Contents
1. [Accordion](#accordion)
2. [Carousel](#carousel)
3. [Collapse](#collapse)
4. [ComboBox](#combobox)
5. [Copy Markup](#copy-markup)
6. [DataTable](#datatable)
7. [Datepicker](#datepicker)
8. [Dropdown](#dropdown)
9. [File Upload](#file-upload)
10. [Input Number](#input-number)
11. [Layout Splitter](#layout-splitter)
12. [Overlay (Modal)](#overlay-modal)
13. [PIN Input](#pin-input)
14. [Range Slider](#range-slider)
15. [Remove Element](#remove-element)
16. [Scroll Nav](#scroll-nav)
17. [Scrollspy](#scrollspy)
18. [Select](#select)
19. [Stepper](#stepper)
20. [Strong Password](#strong-password)
21. [Tabs](#tabs)
22. [Textarea Auto Height](#textarea-auto-height)
23. [Theme Switch](#theme-switch)
24. [Toggle Count](#toggle-count)
25. [Toggle Password](#toggle-password)
26. [Tooltip](#tooltip)
27. [Tree View](#tree-view)

---

## Accordion

**Source:** `tmp/pkg/preline/src/plugins/accordion/`

**Interface:**
```typescript
interface IAccordionOptions {}
interface IAccordion {
  toggleClick(evt: Event): void;
  show(): void;
  hide(): void;
  update(): void;
  destroy(): void;
}
```

**Events:** `beforeOpen`, `open`, `beforeClose`, `close`

**HTML Pattern:**
```html
<div class="hs-accordion-group" data-hs-accordion-always-open>
  <div class="hs-accordion active">
    <button type="button" class="hs-accordion-toggle">Title</button>
    <div class="hs-accordion-content">Content</div>
  </div>
</div>
```

**Config:** `[--keep-one-open]`, `[--stop-propagation]` CSS properties

**A11y:** Arrow key navigation between items, Enter/Space to toggle

---

## Carousel

**Source:** `tmp/pkg/preline/src/plugins/carousel/`

**Interface:**
```typescript
interface ICarouselOptions {
  currentIndex: number;
  loadingClasses?: string | string[];
  dotsItemClasses?: string;
  mode?: 'default' | 'scroll-nav';
  isAutoHeight?: boolean;
  isAutoPlay?: boolean;
  isCentered?: boolean;
  isDraggable?: boolean;
  isInfiniteLoop?: boolean;
  isRTL?: boolean;
  isSnap?: boolean;
  hasSnapSpacers?: boolean;
  slidesQty?: number | {xs, sm, md, lg, xl, '2xl'};
  speed?: number;
  updateDelay?: number;
}
interface ICarousel {
  recalculateWidth(): void;
  goToPrev(): void;
  goToNext(): void;
  goTo(i: number): void;
  destroy(): void;
}
```

**Events:** `beforeInit`, `init`, `beforeSlide`, `slide`, `afterSlide`

---

## Collapse

**Source:** `tmp/pkg/preline/src/plugins/collapse/`

**Interface:**
```typescript
interface ICollapseOptions {}
interface ICollapse {
  show(): void;
  hide(): void;
  destroy(): void;
}
```

**HTML Pattern:**
```html
<button class="hs-collapse-toggle" data-hs-collapse="#content"
        aria-expanded="false" aria-controls="content">
  <svg class="hs-collapse-open:hidden"><!-- closed icon --></svg>
  <svg class="hs-collapse-open:block hidden"><!-- open icon --></svg>
</button>
<div id="content" class="hs-collapse hidden overflow-hidden transition-all duration-300"
     role="region">Content</div>
```

---

## ComboBox

**Source:** `tmp/pkg/preline/src/plugins/combobox/`

**Interface:**
```typescript
interface IComboBoxOptions {
  gap?: number;
  viewport?: string | HTMLElement;
  minSearchLength?: number;
  apiUrl?: string;
  apiDataPart?: string;
  apiSearchQuery?: string;
  groupingType?: 'default' | 'tabs';
  preventClientFiltering?: boolean;
  isOpenOnFocus?: boolean;
  keepOriginalOrder?: boolean;
}
interface IComboBox {
  getCurrentData(): {} | {}[];
  open(): void;
  close(): void;
  recalculateDirection(): void;
  destroy(): void;
}
```

**A11y:** Arrow keys, Home, End, Escape, Enter

---

## Copy Markup

**Source:** `tmp/pkg/preline/src/plugins/copy-markup/`

**Interface:**
```typescript
interface ICopyMarkupOptions {
  targetSelector: string;
  wrapperSelector: string;
  limit?: number;
}
```

---

## DataTable

**Source:** `tmp/pkg/preline/src/plugins/datatable/`

**Interface:**
```typescript
interface IDataTableOptions extends DataTables.Config {
  rowSelectingOptions?: {
    selectAllSelector?: string;
    individualSelector?: string;
  };
  pagingOptions?: {
    pageBtnClasses?: string;
  };
}
```

**Dependency:** DataTables.net + jQuery

---

## Datepicker

**Source:** `tmp/pkg/preline/src/plugins/datepicker/`

**Interface:**
```typescript
interface ICustomDatepickerOptions extends VanillaCalendarProOptions {
  removeDefaultStyles?: boolean;
  mode?: 'custom-select' | 'default';
  applyUtilityClasses?: boolean;
  inputModeOptions?: {
    dateSeparator?: string;
    itemsSeparator?: string;
  };
  templates?: {
    time?: string;
    arrowPrev?: string;
    arrowNext?: string;
  };
  dateFormat?: string;
  dateLocale?: string;
  replaceTodayWithText?: boolean;
}
```

**Dependency:** vanilla-calendar-pro

---

## Dropdown

**Source:** `tmp/pkg/preline/src/plugins/dropdown/`

**Interface:**
```typescript
interface IDropdown {
  open(): void;
  close(isAnimated: boolean): void;
  forceClearState(): void;
  destroy(): void;
}
```

**Config CSS properties:** `[--trigger:click|hover]`, `[--auto-close:true|false|inside]`, `[--strategy:static|absolute]`, `[--adaptive:none]`, `[--has-autofocus]`

**HTML Pattern:**
```html
<div class="hs-dropdown [--trigger:hover]">
  <button class="hs-dropdown-toggle" aria-haspopup="menu" aria-expanded="false">
    Menu <svg class="hs-dropdown-open:-rotate-180">chevron</svg>
  </button>
  <div class="hs-dropdown-menu hidden opacity-0 transition-opacity" role="menu">
    <a href="#">Item</a>
  </div>
</div>
```

**Dependency:** @floating-ui/dom for positioning

**A11y:** Escape closes, Arrow keys navigate items, long-press for touch

---

## File Upload

**Source:** `tmp/pkg/preline/src/plugins/file-upload/`

**Interface:**
```typescript
interface IFileUploadOptions extends DropzoneOptions {
  extensions?: {};
  autoHideTrigger?: boolean;
  singleton?: boolean;
}
```

**Dependency:** Dropzone

---

## Input Number

**Source:** `tmp/pkg/preline/src/plugins/input-number/`

**Interface:**
```typescript
interface IInputNumberOptions {
  min?: number;
  max?: number;
  step?: number;
  forceBlankValue?: boolean;
}
interface IInputNumber {
  destroy(): void;
}
```

---

## Layout Splitter

**Source:** `tmp/pkg/preline/src/plugins/layout-splitter/`

**Interface:**
```typescript
interface ILayoutSplitterOptions {
  horizontalSplitterClasses?: string;
  verticalSplitterClasses?: string;
  horizontalSplitterTemplate?: string;
  verticalSplitterTemplate?: string;
  isSplittersAddedManually?: boolean;
}
```

---

## Overlay (Modal)

**Source:** `tmp/pkg/preline/src/plugins/overlay/`

**Interface:**
```typescript
interface IOverlayOptions {
  hiddenClass?: string;              // 'hidden'
  emulateScrollbarSpace?: boolean;
  isClosePrev?: boolean;
  backdropClasses?: string;
  backdropParent?: string | HTMLElement | Document;
  moveOverlayToBody?: number;        // breakpoint
}
interface IOverlay {
  open(): void;
  close(): void;
  destroy(): void;
}
```

**Events:** `beforeOpen`, `open`, `beforeClose`, `close`

**HTML Pattern:**
```html
<button data-hs-overlay="#modal">Open</button>
<div id="modal" class="hs-overlay hidden" role="dialog" aria-labelledby="title">
  <div class="hs-overlay-backdrop"></div>
  <div class="hs-overlay-content">
    <h2 id="title">Title</h2>
    <button data-hs-overlay-close-target="#modal">Close</button>
  </div>
</div>
```

**Features:** Multiple overlay stacking, auto z-index, backdrop creation, focus trap, scrollbar space emulation

**A11y:** Escape closes, Tab trap, auto-focus on open

---

## PIN Input

**Source:** `tmp/pkg/preline/src/plugins/pin-input/`

**Interface:**
```typescript
interface IPinInputOptions {
  availableCharsRE?: RegExp;
}
interface IPinInput {
  destroy(): void;
}
```

---

## Range Slider

**Source:** `tmp/pkg/preline/src/plugins/range-slider/`

**Interface:**
```typescript
interface IRangeSliderOptions extends nouislider.Options {
  disabled?: boolean;
  wrapper?: HTMLElement;
  currentValue?: HTMLElement[];
  formatter?: {
    type?: 'default' | 'range' | 'currency' | 'percent';
    prefix?: string;
    postfix?: string;
  };
  icons?: { handle?: string };
}
```

**Dependency:** nouislider

---

## Remove Element

**Source:** `tmp/pkg/preline/src/plugins/remove-element/`

**Interface:**
```typescript
interface IRemoveElementOptions {
  removeTargetAnimationClass: string;
}
```

---

## Scroll Nav

**Source:** `tmp/pkg/preline/src/plugins/scroll-nav/`

Smooth scrolling navigation with auto-centering active item.

---

## Scrollspy

**Source:** `tmp/pkg/preline/src/plugins/scrollspy/`

**Interface:**
```typescript
interface IScrollspyOptions {
  ignoreScrollUp?: boolean;
}
```

---

## Select

**Source:** `tmp/pkg/preline/src/plugins/select/`

**Interface:**
```typescript
interface ISelectOptions {
  value?: string | string[];
  isOpened?: boolean;
  placeholder?: string;
  hasSearch?: boolean;
  minSearchLength?: number;
  mode?: string;
  scrollToSelected?: boolean;

  // API
  apiUrl?: string | null;
  apiQuery?: string | null;
  apiSearchQueryKey?: string;
  apiFieldsMap?: IApiFieldMap;
  apiLoadMore?: boolean | { perPage, scrollThreshold };

  // Dropdown
  dropdownTag?: string;
  dropdownClasses?: string;
  dropdownPlacement?: string;
  dropdownScope: 'window' | 'parent';

  // Tags mode
  toggleTag?: string;
  tagsItemTemplate?: string;
  toggleCountText?: string;
  toggleCountTextPlacement?: 'postfix' | 'prefix' | 'postfix-no-space' | 'prefix-no-space';

  // Search
  searchTemplate?: string;
  searchMatchMode?: 'substring' | 'chars-sequence' | 'token-all' | 'hybrid';
}
interface ISelect {
  setValue(val: string | string[]): void;
  open(): void;
  close(): void;
  addOption(items: ISingleOption | ISingleOption[]): void;
  removeOption(values: string | string[]): void;
  recalculateDirection(): void;
  destroy(): void;
}
```

**A11y:** Arrow keys, Home, End, Escape, Enter, Space, Tab

---

## Stepper

**Source:** `tmp/pkg/preline/src/plugins/stepper/`

**Interface:**
```typescript
interface IStepperOptions {
  currentIndex?: number;
  isCompleted?: boolean;
  mode?: string;
}
interface IStepper {
  setProcessedNavItem(n?: number): void;
  unsetProcessedNavItem(n?: number): void;
  goToNext(): void;
  goToFinish(): void;
  disableButtons(): void;
  enableButtons(): void;
  setErrorNavItem(n?: number): void;
  destroy(): void;
}
interface IStepperItem {
  index: number;
  isFinal: boolean;
  isCompleted: boolean;
  isSkip: boolean;
  isOptional?: boolean;
  isDisabled?: boolean;
  isProcessed?: boolean;
  hasError?: boolean;
}
```

---

## Strong Password

**Source:** `tmp/pkg/preline/src/plugins/strong-password/`

**Interface:**
```typescript
interface IStrongPasswordOptions {
  target: string | HTMLInputElement;
  hints?: string;
  stripClasses?: string;
  minLength: number;
  mode?: string;
  popoverSpace?: number;
  checksExclude?: string[];
  specialCharactersSet?: string;
}
```

---

## Tabs

**Source:** `tmp/pkg/preline/src/plugins/tabs/`

**Interface:**
```typescript
interface ITabsOptions {
  eventType: 'click' | 'hover';
  preventNavigationResolution: string | number | null;
}
interface ITabs {
  destroy(): void;
}
```

**Event:** `change.hs.tabs` with `{el, tabsId, prev, current}`

**HTML Pattern:**
```html
<nav role="tablist">
  <button class="hs-tab-active:text-primary" data-hs-tab="#panel"
          aria-selected="true" role="tab">Tab</button>
</nav>
<div id="panel" role="tabpanel">Content</div>
```

**A11y:** Arrow keys between tabs, Home/End

---

## Textarea Auto Height

**Source:** `tmp/pkg/preline/src/plugins/textarea-auto-height/`

Auto-growing textarea. Activated via `data-hs-textarea-auto-height` attribute.

---

## Theme Switch

**Source:** `tmp/pkg/preline/src/plugins/theme-switch/`

**Interface:**
```typescript
interface IThemeSwitchOptions {
  theme: 'dark' | 'light' | 'default';
  type: 'change' | 'click';
}
```

Persists to localStorage. Applies class to `<html>`.

---

## Toggle Count

**Source:** `tmp/pkg/preline/src/plugins/toggle-count/`

**Interface:**
```typescript
interface IToggleCountOptions {
  target: string | HTMLInputElement;
  min: number;
  max: number;
  duration: number;
}
```

---

## Toggle Password

**Source:** `tmp/pkg/preline/src/plugins/toggle-password/`

**Interface:**
```typescript
interface ITogglePasswordOptions {
  target: string | HTMLInputElement[];
}
```

---

## Tooltip

**Source:** `tmp/pkg/preline/src/plugins/tooltip/`

Positioned tooltip using @floating-ui/dom. Supports click/hover trigger, smart placement with collision detection.

---

## Tree View

**Source:** `tmp/pkg/preline/src/plugins/tree-view/`

**Interface:**
```typescript
interface ITreeViewOptions {
  items?: ITreeViewItem[];
  controlBy?: 'checkbox' | 'button';
  autoSelectChildren?: boolean;
  isIndeterminate?: boolean;
}
interface ITreeViewItem {
  id: string;
  value: string;
  isDir?: boolean;
  path?: string;
  isSelected?: boolean;
}
```

---

## Shared Utilities

**Source:** `tmp/pkg/preline/src/utils/index.ts`

Key functions:
- `afterTransition(el, cb)` -- wait for CSS transition end
- `dispatch(eventName, detail, el)` -- fire custom events
- `debounce(func, delay)` -- function debouncing
- `isEnoughSpace(el, toggle, position, space, wrapper)` -- dropdown positioning
- `getHighestZIndex(arr)` -- z-index management
- `htmlToElement(html)` -- parse HTML string
- `isFormElement(target)` -- check input/textarea/select
- `isFocused(target)` -- check active element
- `isIOS()` / `isIpadOS()` -- platform detection

## Shared Constants

**Source:** `tmp/pkg/preline/src/constants.ts`

```
BREAKPOINTS: xs=0, sm=640, md=768, lg=1024, xl=1280, 2xl=1536

Keyboard sets per component:
- DROPDOWN: Escape, ArrowUp/Down/Left/Right, Home, End, Enter
- OVERLAY: Escape, Tab
- TABS: ArrowUp/Down/Left/Right, Home, End
- SELECT: Arrow keys, Home, End, Escape, Enter, Space, Tab
- COMBO_BOX: Arrow keys, Home, End, Escape, Enter
```

## Theme System

**Source:** `tmp/pkg/preline/css/themes/`

9 themes, each overriding CSS variables:
- default, ocean, moon, bubblegum, autumn, harvest, cashmere, olive, retro
- OKLCH color space
- Semantic variables: `--primary`, `--card`, `--navbar`, `--overlay`, `--dropdown`
- Per-component: `--card-*`, `--navbar-*`, `--dropdown-*` with hover/focus/active variants
