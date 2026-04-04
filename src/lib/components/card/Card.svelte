<script lang="ts">
  import { cn } from '$lib/utils/cn';
  import { hover as hoverTokens } from '$lib/interactions/tokens';
  import { useUI } from '$lib/interactions/useUI.svelte';
  import { proximityGlow } from '$lib/interactions/proximity-glow';
  import { GlassBackdrop } from '$lib/components/glass';
  import type { Snippet } from 'svelte';
  import type { HoverEffect } from '$lib/interactions/schema';
  import type { GlassDensity, FrostedLevel } from '$lib/interactions/glass';
  import type { GlowIntensity } from '$lib/interactions/glow';
  import type { ThemeColor } from '$lib/types/enums';
  import type { TintLevel } from '$lib/interactions/styles';

  interface Props {
    color?: ThemeColor;
    tint?: TintLevel;
    glass?: GlassDensity | boolean;
    frosted?: FrostedLevel | boolean;
    colored?: boolean;
    raised?: boolean;
    reactive?: boolean;
    glow?: GlowIntensity | boolean;
    hover?: HoverEffect;
    children: Snippet;
    class?: string;
    [key: string]: unknown;
  }

  let {
    color,
    tint,
    glass,
    frosted,
    colored = false,
    raised = false,
    reactive = false,
    glow = false,
    hover: hoverEffect = 'none',
    children,
    class: className,
    ...rest
  }: Props = $props();

  const ui = useUI({
    props: () => ({ color, tint, glass, frosted, colored, raised, reactive, glow }),
    role: 'container',
  });

  const classes = $derived(cn(
    'relative rounded-2xl transition-all duration-300',
    !ui.reactive && 'overflow-hidden',
    ui.className,
    ui.reactive && 'glass-reactive glass-reactive-border',
    hoverTokens[hoverEffect],
    className,
  ));
</script>

{#snippet cardInner()}
  {#if ui.showBackdrop}
    <GlassBackdrop />
  {/if}
  <div class="relative z-10">
    {@render children()}
  </div>
{/snippet}

{#snippet cardContent()}
  {#if ui.reactive}
    <div class={classes} style={ui.styles} use:proximityGlow {...rest}>
      {@render cardInner()}
    </div>
  {:else}
    <div class={classes} style={ui.styles} {...rest}>
      {@render cardInner()}
    </div>
  {/if}
{/snippet}

{#if ui.glowClass}
  <div class="relative">
    <div class={ui.glowClass}></div>
    {@render cardContent()}
  </div>
{:else}
  {@render cardContent()}
{/if}
