# Tabs

A set of layered sections of content, known as tab panels, that are displayed one at a time.

## Import

```ts
import { Tabs, TabList, Tab, TabPanel } from 'glassui';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| value | `string` | — | The bound active tab value. |

## Examples

### Basic

```svelte
<Tabs value="1"><TabList><Tab value="1">One</Tab></TabList><TabPanel value="1">Content</TabPanel></Tabs>
```

## Full Source

```svelte
<script lang="ts">
  import { getContext } from 'svelte';
  import { cn } from '$lib/utils/cn';
  import { useUI } from '$lib/interactions/useUI.svelte';
  import type { Snippet } from 'svelte';
  import type { ThemeColor } from '$lib/types/enums';

  interface Props {
    value: string;
    disabled?: boolean;
    color?: ThemeColor;
    class?: string;
    children: Snippet;
    [key: string]: unknown;
  }

  let {
    value,
    disabled = false,
    color,
    class: className,
    children,
    ...rest
  }: Props = $props();

  const ctx = getContext<{ value: string; set value(v: string); variant: string; orientation: string; isGlass: boolean }>('glassui-tabs');

  const isActive = $derived(ctx?.value === value);
  const variant = $derived(ctx?.variant || 'underline');
  const isVertical = $derived(ctx?.orientation === 'vertical');

  // We only activate the glass action UI if it's NOT an underline tab (which is just text).
  const role = $derived(variant === 'underline' ? 'inline' : 'action');

  // The active state inherits the active color. Inactive state is neutral.
  // Segmented tabs are "ghost" when inactive, "solid" when active.
  const ui = useUI({
    props: () => ({
      color: isActive ? color : 'neutral',
      style: (variant === 'segmented' || variant === 'pills') && !isActive ? 'ghost' : 'solid',
      disabled
    }),
    role
  });

  const handleClick = () => {
    if (!disabled && ctx) {
      ctx.value = value;
    }
  };

  const classes = $derived(cn(
    'relative inline-flex items-center justify-center whitespace-nowrap font-medium transition-all duration-200 outline-none',
    'disabled:pointer-events-none disabled:opacity-50',
    'focus-visible:ring-2 focus-visible:ring-[var(--comp-bg)] focus-visible:ring-offset-2',

    // Underline variant
    variant === 'underline' && 'py-3 text-sm border-b-2',
    variant === 'underline' && !isVertical && '-mb-[2px]',
    variant === 'underline' && isVertical && 'w-full text-start justify-start border-b-0 border-r-2 -mr-[2px]',
    variant === 'underline' && isActive && 'border-[var(--comp-text)] text-[var(--comp-text)]',
    variant === 'underline' && !isActive && 'border-transparent text-muted-foreground hover:text-foreground hover:border-line-3',

    // Pills variant
    variant === 'pills' && 'px-4 py-2 text-sm rounded-lg',
    variant === 'pills' && isVertical && 'w-full justify-start',
    variant === 'pills' && isActive && (ctx?.isGlass ? ui.className : 'bg-[var(--comp-bg)] text-[var(--comp-text)] shadow-sm'),
    variant === 'pills' && !isActive && 'text-muted-foreground hover:text-foreground hover:bg-layer-hover',

    // Segmented variant
    variant === 'segmented' && 'px-4 py-1.5 text-sm rounded-lg flex-1',
    variant === 'segmented' && isVertical && 'w-full justify-start',
    variant === 'segmented' && isActive && (ctx?.isGlass ? ui.className : 'bg-surface border border-line-2 text-foreground shadow-sm'),
    variant === 'segmented' && !isActive && 'text-muted-foreground hover:text-foreground',

    className
  ));
</script>

<button
  type="button"
  class={classes}
  style={isActive && (variant === 'pills' || variant === 'segmented') && ctx?.isGlass ? ui.styles : ''}
  role="tab"
  aria-selected={isActive}
  aria-controls={`tabpanel-${value}`}
  id={`tab-${value}`}
  tabindex={isActive ? 0 : -1}
  {disabled}
  onclick={handleClick}
  {...rest}
>
  {#if ui.glowClass && isActive && variant !== 'underline'}
    <div class={ui.glowClass}></div>
  {/if}
  <span class="relative z-10 flex items-center justify-center gap-2">
    {@render children()}
  </span>
</button>
<script lang="ts">
  import { getContext } from 'svelte';
  import { cn } from '$lib/utils/cn';
  import { useUI } from '$lib/interactions/useUI.svelte';
  import { GlassBackdrop } from '$lib/components/glass';
  import type { Snippet } from 'svelte';

  interface Props {
    class?: string;
    children: Snippet;
    [key: string]: unknown;
  }

  let { class: className, children, ...rest }: Props = $props();

  const ctx = getContext<{ value: string; variant: string; orientation: string; isGlass: boolean }>('glassui-tabs');

  // TabList uses role 'container' just to establish context for the inner tabs
  // and handle segmented styling if applicable.
  const ui = useUI({
    props: () => ({}),
    role: 'container'
  });

  const isSegmented = $derived(ctx?.variant === 'segmented');
  const isVertical = $derived(ctx?.orientation === 'vertical');

  const classes = $derived(cn(
    'flex relative',
    isVertical ? 'flex-col min-w-32' : 'flex-row items-center w-full',
    
    // Segmented layout adds background and padding
    isSegmented && !isVertical && 'p-1 rounded-xl gap-1 overflow-x-auto',
    isSegmented && isVertical && 'p-1 rounded-xl gap-1',
    isSegmented && !ctx?.isGlass && 'bg-layer border border-line-2',
    isSegmented && ctx?.isGlass && ui.className,

    // Underline layout adds border bottom/right
    ctx?.variant === 'underline' && !isVertical && 'border-b border-border overflow-x-auto gap-6',
    ctx?.variant === 'underline' && isVertical && 'border-r border-border gap-2 pr-4',

    // Pills layout
    ctx?.variant === 'pills' && !isVertical && 'gap-2 overflow-x-auto',
    ctx?.variant === 'pills' && isVertical && 'gap-2',
    
    className
  ));
</script>

<nav class={classes} style={isSegmented && ctx?.isGlass ? ui.styles : ''} aria-label="Tabs" role="tablist" {...rest}>
  {#if isSegmented && ctx?.isGlass && ui.showBackdrop}
    <GlassBackdrop />
  {/if}
  <div class="relative z-10 flex w-full {isVertical ? 'flex-col' : 'flex-row items-center gap-[inherit]'}">
    {@render children()}
  </div>
</nav>
<script lang="ts">
  import { getContext } from 'svelte';
  import { cn } from '$lib/utils/cn';
  import type { Snippet } from 'svelte';

  interface Props {
    value: string;
    class?: string;
    children: Snippet;
    [key: string]: unknown;
  }

  let {
    value,
    class: className,
    children,
    ...rest
  }: Props = $props();

  const ctx = getContext<{ value: string; variant: string; orientation: string; isGlass: boolean }>('glassui-tabs');

  const isActive = $derived(ctx?.value === value);
</script>

{#if isActive}
  <div
    role="tabpanel"
    id={`tabpanel-${value}`}
    aria-labelledby={`tab-${value}`}
    class={cn('w-full mt-3', className)}
    {...rest}
  >
    {@render children()}
  </div>
{/if}
<script lang="ts">
  import { setContext } from 'svelte';
  import { cn } from '$lib/utils/cn';
  import { useUI } from '$lib/interactions/useUI.svelte';
  import type { Snippet } from 'svelte';
  import type { ThemeColor, RenderStyle } from '$lib/types/enums';

  interface Props {
    value?: string;
    variant?: 'underline' | 'pills' | 'segmented';
    orientation?: 'horizontal' | 'vertical';
    color?: ThemeColor;
    style?: RenderStyle;
    glass?: boolean | 'ultra-thin' | 'thin' | 'normal' | 'thick' | 'ultra-thick';
    frosted?: boolean | 'light' | 'medium' | 'heavy';
    raised?: boolean;
    class?: string;
    children: Snippet;
    [key: string]: unknown;
  }

  let {
    value = $bindable(),
    variant = 'underline',
    orientation = 'horizontal',
    color = 'primary',
    style = 'solid',
    glass,
    frosted,
    raised = false,
    class: className,
    children,
    ...rest
  }: Props = $props();

  const ui = useUI({
    props: () => ({ color, style, glass, frosted, raised }),
    role: 'container',
  });

  setContext('glassui-tabs', {
    get value() { return value; },
    set value(v: string) { value = v; },
    get variant() { return variant; },
    get orientation() { return orientation; },
    get isGlass() { return ui.glass !== false; },
  });

  const classes = $derived(cn(
    'flex w-full',
    orientation === 'vertical' ? 'flex-row gap-6' : 'flex-col',
    className
  ));
</script>

<div class={classes} {...rest}>
  {@render children()}
</div>
```