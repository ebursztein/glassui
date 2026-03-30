<script lang="ts">
  import type { Snippet } from 'svelte';
  import { getGlowClass, type GlowIntensity } from '$lib/interactions/glow';

  interface Props {
    glow: GlowIntensity | boolean;
    children: Snippet;
    class?: string;
  }

  let { glow, children, class: className }: Props = $props();
  const glowClass = $derived(getGlowClass(glow));
</script>

<!--
  Wraps an element with a glow effect.
  The glow div sits behind the content using absolute positioning.
-->
<div class="relative inline-block {className ?? ''}">
  {#if glowClass}
    <div class={glowClass}></div>
  {/if}
  <div class="relative">
    {@render children()}
  </div>
</div>
