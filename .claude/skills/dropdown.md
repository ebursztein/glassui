# Dropdown

A contextual menu that opens adjacent to a trigger element to offer a list of actions or options.

## Import

```ts
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from 'glassui';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| open | `boolean` | `false` | Whether the dropdown menu is visible. |

## Examples

### Basic

```svelte
<Dropdown><DropdownTrigger><Button>Menu</Button></DropdownTrigger><DropdownMenu><DropdownItem>Profile</DropdownItem><DropdownItem>Settings</DropdownItem></DropdownMenu></Dropdown>
```

## Full Source

```svelte
<script lang="ts">
  import { setContext } from 'svelte';
  import { cn } from '$lib/utils/cn';
  import type { Snippet } from 'svelte';
  import type { ThemeColor, RenderStyle } from '$lib/types/enums';

  interface Props {
    open?: boolean;
    placement?: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end' | 'right-start' | 'left-start';
    trigger?: 'click' | 'hover';
    offset?: number;
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
    open = $bindable(false),
    placement = 'bottom-start',
    trigger = 'click',
    offset = 8,
    color,
    style,
    glass,
    frosted,
    raised = true,
    class: className,
    children,
    ...rest
  }: Props = $props();

  const toggle = () => {
    open = !open;
  };

  const close = () => {
    open = false;
  };

  setContext('glassui-dropdown', {
    get open() { return open; },
    get placement() { return placement; },
    get offset() { return offset; },
    get color() { return color; },
    get style() { return style; },
    get glass() { return glass; },
    get frosted() { return frosted; },
    get raised() { return raised; },
    toggle,
    close
  });

  const handleWindowClick = (e: MouseEvent) => {
    if (trigger === 'click' && open) {
      close();
    }
  };

  const handleWindowKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && open) {
      close();
    }
  };

  const handleContainerClick = (e: MouseEvent) => {
    // Stop propagation so window click doesn't immediately close it
    // when clicking inside the dropdown area itself.
    e.stopPropagation();
  };

  const handleMouseEnter = () => {
    if (trigger === 'hover') open = true;
  };

  const handleMouseLeave = () => {
    if (trigger === 'hover') open = false;
  };
</script>

<svelte:window onclick={handleWindowClick} onkeydown={handleWindowKeydown} />

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<div
  class={cn('hs-dropdown relative inline-flex', className)}
  onclick={handleContainerClick}
  onmouseenter={handleMouseEnter}
  onmouseleave={handleMouseLeave}
  {...rest}
>
  {@render children()}
</div>
<script lang="ts">
  import { getContext } from 'svelte';
  import { cn } from '$lib/utils/cn';
  import type { Snippet } from 'svelte';

  interface Props {
    disabled?: boolean;
    class?: string;
    children: Snippet;
    [key: string]: unknown;
  }

  let {
    disabled = false,
    class: className,
    children,
    ...rest
  }: Props = $props();

  const ctx = getContext<{ close: () => void }>('glassui-dropdown');

  const handleClick = () => {
    if (!disabled) {
      ctx?.close();
    }
  };
</script>

<button
  type="button"
  class={cn(
    'w-full flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-[var(--comp-text)] hover:bg-[var(--comp-hover)] focus:outline-none focus:bg-[var(--comp-hover)] transition-colors',
    disabled && 'opacity-50 pointer-events-none',
    className
  )}
  role="menuitem"
  {disabled}
  onclick={handleClick}
  {...rest}
>
  {@render children()}
</button>
<script lang="ts">
  import { getContext } from 'svelte';
  import { cn } from '$lib/utils/cn';
  import { useUI } from '$lib/interactions/useUI.svelte';
  import { GlassBackdrop } from '$lib/components/glass';
  import { fade, fly } from 'svelte/transition';
  import type { Snippet } from 'svelte';
  import type { ThemeColor, RenderStyle } from '$lib/types/enums';
  import type { GlassDensity, FrostedLevel } from '$lib/interactions/glass';

  interface Props {
    class?: string;
    children: Snippet;
    [key: string]: unknown;
  }

  let { class: className, children, ...rest }: Props = $props();

  const ctx = getContext<{
    open: boolean;
    placement: string;
    offset: number;
    color: ThemeColor;
    style: RenderStyle;
    glass: GlassDensity | boolean;
    frosted: FrostedLevel | boolean;
    raised: boolean;
  }>('glassui-dropdown');

  const ui = useUI({
    props: () => ({
      color: ctx?.color || 'neutral',
      style: ctx?.style || 'solid',
      glass: ctx?.glass,
      frosted: ctx?.frosted,
      raised: ctx?.raised ?? true,
    }),
    role: 'container'
  });

  const placementClasses: Record<string, string> = {
    'bottom-start': 'top-full left-0',
    'bottom-end': 'top-full right-0',
    'top-start': 'bottom-full left-0',
    'top-end': 'bottom-full right-0',
    'right-start': 'top-0 left-full',
    'left-start': 'top-0 right-full',
  };

  const getPlacementClass = () => {
    return ctx?.placement ? placementClasses[ctx.placement] : placementClasses['bottom-start'];
  };

  const getOffsetStyle = () => {
    if (!ctx?.offset) return '';
    const p = ctx.placement || 'bottom-start';
    if (p.startsWith('bottom')) return `margin-top: ${ctx.offset}px;`;
    if (p.startsWith('top')) return `margin-bottom: ${ctx.offset}px;`;
    if (p.startsWith('right')) return `margin-left: ${ctx.offset}px;`;
    if (p.startsWith('left')) return `margin-right: ${ctx.offset}px;`;
    return '';
  };

  const classes = $derived(cn(
    'absolute z-50 min-w-48 p-1 rounded-xl flex flex-col gap-0.5',
    getPlacementClass(),
    ui.className,
    className
  ));
</script>

{#if ctx?.open}
  <!-- Combined style: UI Engine custom properties + dynamic margin offset -->
  <div
    class={classes}
    style={`${ui.styles} ${getOffsetStyle()}`}
    transition:fly={{ y: ctx?.placement?.startsWith('top') ? 5 : -5, duration: 150 }}
    role="menu"
    {...rest}
  >
    {#if ui.showBackdrop}
      <GlassBackdrop />
    {/if}
    {#if ui.glowClass}
      <div class={ui.glowClass}></div>
    {/if}
    <div class="relative z-10 flex flex-col w-full">
      {@render children()}
    </div>
  </div>
{/if}
<script lang="ts">
  import { getContext } from 'svelte';
  import { cn } from '$lib/utils/cn';
  import type { Snippet } from 'svelte';

  interface Props {
    class?: string;
    children: Snippet;
    [key: string]: unknown;
  }

  let { class: className, children, ...rest }: Props = $props();

  const ctx = getContext<{ open: boolean; toggle: () => void }>('glassui-dropdown');
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<div class={cn('hs-dropdown-toggle', className)} onclick={ctx?.toggle} {...rest}>
  {@render children()}
</div>
```