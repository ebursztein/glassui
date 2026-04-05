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
    close: () => void;
    triggerEl: HTMLElement | null;
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

  let menuEl: HTMLDivElement;

  const handleMenuKeydown = (e: KeyboardEvent) => {
    const items = Array.from(menuEl?.querySelectorAll('[role="menuitem"]:not([disabled])') ?? []) as HTMLElement[];
    const currentIdx = items.indexOf(document.activeElement as HTMLElement);

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        items[(currentIdx + 1) % items.length]?.focus();
        break;
      case 'ArrowUp':
        e.preventDefault();
        items[(currentIdx - 1 + items.length) % items.length]?.focus();
        break;
      case 'Home':
        e.preventDefault();
        items[0]?.focus();
        break;
      case 'End':
        e.preventDefault();
        items[items.length - 1]?.focus();
        break;
      case 'Escape':
        e.preventDefault();
        ctx?.close();
        ctx?.triggerEl?.focus();
        break;
      case 'Tab':
        ctx?.close();
        break;
    }
  };
</script>

{#if ctx?.open}
  <!-- Combined style: UI Engine custom properties + dynamic margin offset -->
  <div
    bind:this={menuEl}
    class={classes}
    style={`${ui.styles} ${getOffsetStyle()}`}
    transition:fly={{ y: ctx?.placement?.startsWith('top') ? 5 : -5, duration: 150 }}
    role="menu"
    onkeydown={handleMenuKeydown}
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