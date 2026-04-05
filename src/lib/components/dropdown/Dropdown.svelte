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

  let triggerEl: HTMLElement | null = $state(null);

  const toggle = () => {
    open = !open;
  };

  const close = () => {
    open = false;
  };

  const focusFirstItem = () => {
    requestAnimationFrame(() => {
      const menu = triggerEl?.closest('.hs-dropdown')?.querySelector('[role="menu"]');
      const first = menu?.querySelector('[role="menuitem"]:not([disabled])') as HTMLElement | null;
      first?.focus();
    });
  };

  const focusLastItem = () => {
    requestAnimationFrame(() => {
      const menu = triggerEl?.closest('.hs-dropdown')?.querySelector('[role="menu"]');
      const items = menu?.querySelectorAll('[role="menuitem"]:not([disabled])');
      const last = items?.[items.length - 1] as HTMLElement | null;
      last?.focus();
    });
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
    close,
    setTriggerEl: (el: HTMLElement) => { triggerEl = el; },
    get triggerEl() { return triggerEl; },
    focusFirstItem,
    focusLastItem,
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

<div
  class={cn('hs-dropdown relative inline-flex', className)}
  onclick={handleContainerClick}
  onmouseenter={handleMouseEnter}
  onmouseleave={handleMouseLeave}
  role="group"
  {...rest}
>
  {@render children()}
</div>