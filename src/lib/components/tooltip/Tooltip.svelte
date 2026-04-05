<script lang="ts">
  import { setContext } from 'svelte';
  import { cn } from '$lib/utils/cn';
  import type { Snippet } from 'svelte';
  import type { ThemeColor, RenderStyle } from '$lib/types/enums';

  interface Props {
    placement?: 'top' | 'bottom' | 'left' | 'right';
    delay?: number;
    color?: ThemeColor;
    style?: RenderStyle;
    glass?: boolean | 'ultra-thin' | 'thin' | 'normal' | 'thick' | 'ultra-thick';
    frosted?: boolean | 'light' | 'medium' | 'heavy';
    class?: string;
    children: Snippet;
    [key: string]: unknown;
  }

  let {
    placement = 'top',
    delay = 0,
    color,
    style,
    glass,
    frosted,
    class: className,
    children,
    ...rest
  }: Props = $props();

  let isHovered = $state(false);
  let hasFocus = $state(false);
  let timeoutId: ReturnType<typeof setTimeout>;
  const tooltipId = `glass-tooltip-${Math.random().toString(36).slice(2, 8)}`;

  const open = $derived(isHovered || hasFocus);

  setContext('glassui-tooltip', {
    get open() { return open; },
    get placement() { return placement; },
    get color() { return color; },
    get style() { return style; },
    get glass() { return glass; },
    get frosted() { return frosted; },
    get tooltipId() { return tooltipId; }
  });

  const handleMouseEnter = () => {
    clearTimeout(timeoutId);
    if (delay > 0) {
      timeoutId = setTimeout(() => { isHovered = true; }, delay);
    } else {
      isHovered = true;
    }
  };

  const handleMouseLeave = () => {
    clearTimeout(timeoutId);
    isHovered = false;
  };

  const handleFocusIn = () => {
    hasFocus = true;
  };

  const handleFocusOut = () => {
    hasFocus = false;
  };
</script>

<div
  class={cn('hs-tooltip relative inline-flex', className)}
  onmouseenter={handleMouseEnter}
  onmouseleave={handleMouseLeave}
  onfocusin={handleFocusIn}
  onfocusout={handleFocusOut}
  role="group"
  {...rest}
>
  {@render children()}
</div>