<script lang="ts">
  import { cn } from '$lib/utils/cn';
  import { useUI } from '$lib/interactions/useUI.svelte';
  import { GlassBackdrop } from '$lib/components/glass';
  import { fly } from 'svelte/transition';
  import type { Snippet } from 'svelte';
  import type { GlassDensity, FrostedLevel } from '$lib/interactions/glass';
  import type { ThemeColor, RenderStyle } from '$lib/types/enums';

  interface Props {
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
    color?: ThemeColor;
    style?: RenderStyle;
    glass?: GlassDensity | boolean;
    frosted?: FrostedLevel | boolean;
    raised?: boolean;
    colored?: boolean;
    class?: string;
    children: Snippet;
    [key: string]: unknown;
  }

  let {
    size = 'md',
    color = 'neutral',
    style = 'solid',
    glass,
    frosted,
    raised = true,
    colored = false,
    class: className,
    children,
    ...rest
  }: Props = $props();

  const ui = useUI({
    props: () => ({ color, style, glass, frosted, raised, colored }),
    role: 'container',
  });

  const sizeMap: Record<string, string> = {
    xs: 'max-w-xs',
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'max-w-full m-4',
  };

  const classes = $derived(cn(
    'relative w-full rounded-2xl flex flex-col',
    sizeMap[size],
    ui.className,
    colored && 'overflow-hidden',
    className
  ));
</script>

<div
  class={classes}
  style={ui.styles}
  transition:fly={{ y: 20, duration: 200 }}
  {...rest}
>
  {#if ui.showBackdrop}
    <GlassBackdrop />
  {/if}
  {#if ui.glowClass}
    <div class={ui.glowClass}></div>
  {/if}
  <div class="relative z-10 w-full flex flex-col">
    {@render children()}
  </div>
</div>