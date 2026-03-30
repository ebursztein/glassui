<script lang="ts">
  import { cn } from '$lib/utils/cn';
  import { hover as hoverTokens } from '$lib/interactions/tokens';
  import { setContext } from 'svelte';
  import { getGlassClass, resolveGlass, GLASS_CONTEXT_KEY, type GlassEffect } from '$lib/interactions/glass';
  import { getGlowClass, type GlowIntensity } from '$lib/interactions/glow';
  import { GlassBackdrop } from '$lib/components/glass';
  import type { Snippet } from 'svelte';
  import type { HoverEffect } from '$lib/interactions/schema';

  interface Props {
    glass?: GlassEffect | boolean;
    glassbg?: boolean;
    glow?: GlowIntensity | boolean;
    hover?: HoverEffect;
    children: Snippet;
    class?: string;
    [key: string]: unknown;
  }

  let {
    glass = false,
    glassbg = false,
    glow = false,
    hover: hoverEffect = 'none',
    children,
    class: className,
    ...rest
  }: Props = $props();

  const glassEffect = $derived(resolveGlass(glass));
  try { setContext(GLASS_CONTEXT_KEY, () => glassEffect); } catch {}
  const glassClass = $derived(getGlassClass(glass));
  const glowClass = $derived(getGlowClass(glow));

  const solidClasses = 'bg-card border border-card-line';

  const classes = $derived(cn(
    'relative rounded-2xl transition-all duration-300 overflow-hidden',
    glassClass || solidClasses,
    hoverTokens[hoverEffect],
    className,
  ));
</script>

{#if glowClass}
<div class="relative">
  <div class={glowClass}></div>
  <div class={classes} {...rest}>
    {#if glassbg}
      <GlassBackdrop />
    {/if}
    <div class="relative z-10">
      {@render children()}
    </div>
  </div>
</div>
{:else}
<div class={classes} {...rest}>
  {#if glassbg}
    <GlassBackdrop />
  {/if}
  <div class="relative z-10">
    {@render children()}
  </div>
</div>
{/if}
