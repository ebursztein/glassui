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