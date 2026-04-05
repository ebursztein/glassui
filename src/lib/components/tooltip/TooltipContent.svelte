<script lang="ts">
  import { getContext } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import { cn } from '$lib/utils/cn';
  import { useUI } from '$lib/interactions/useUI.svelte';
  import { GlassBackdrop } from '$lib/components/glass';
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
    color: ThemeColor;
    style: RenderStyle;
    glass: GlassDensity | boolean;
    frosted: FrostedLevel | boolean;
    tooltipId: string;
  }>('glassui-tooltip');

  const ui = useUI({
    props: () => ({
      color: ctx?.color || 'neutral',
      style: ctx?.style || 'solid',
      glass: ctx?.glass,
      frosted: ctx?.frosted,
      raised: true,
    }),
    role: 'container'
  });

  const placementClasses: Record<string, string> = {
    'top': 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    'bottom': 'top-full left-1/2 -translate-x-1/2 mt-2',
    'left': 'right-full top-1/2 -translate-y-1/2 mr-2',
    'right': 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  const getPlacementClass = () => {
    return ctx?.placement ? placementClasses[ctx.placement] : placementClasses['top'];
  };

  const getFlyY = () => {
    if (ctx?.placement === 'top') return 4;
    if (ctx?.placement === 'bottom') return -4;
    return 0;
  };

  const getFlyX = () => {
    if (ctx?.placement === 'left') return 4;
    if (ctx?.placement === 'right') return -4;
    return 0;
  };

  const classes = $derived(cn(
    'absolute z-50 px-3 py-1.5 text-sm font-medium rounded-lg shadow-md whitespace-nowrap pointer-events-none',
    getPlacementClass(),
    ui.className,
    className
  ));
</script>

{#if ctx?.open}
  <div
    id={ctx?.tooltipId}
    class={classes}
    style={ui.styles}
    transition:fly={{ x: getFlyX(), y: getFlyY(), duration: 150 }}
    role="tooltip"
    {...rest}
  >
    {#if ui.showBackdrop}
      <GlassBackdrop />
    {/if}
    {#if ui.glowClass}
      <div class={ui.glowClass}></div>
    {/if}
    <span class="relative z-10">{@render children()}</span>
  </div>
{/if}