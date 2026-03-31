<script lang="ts">
  import { GlassBackdrop } from '$lib/components/glass';
  import type { Snippet } from 'svelte';

  interface Props {
    id: string;
    title: string;
    description?: string;
    glass?: boolean;
    children: Snippet;
    class?: string;
  }

  let {
    id,
    title,
    description,
    glass = false,
    children,
    class: className,
  }: Props = $props();
</script>

<section {id} class="scroll-mt-24">
  <h2 class="text-lg font-semibold text-foreground">{title}</h2>
  {#if description}
    <p class="mt-1 text-sm text-muted-foreground">{description}</p>
  {/if}
  {#if glass}
    <div class="mt-4 rounded-lg border border-border p-6 flex flex-wrap items-center justify-center gap-4 relative overflow-hidden glass-bg {className ?? ''}">
      <GlassBackdrop />
      <div class="relative z-10 flex flex-wrap items-center justify-center gap-4 w-full">
        {@render children()}
      </div>
    </div>
  {:else}
    <div class="mt-4 rounded-lg border border-border p-6 flex flex-wrap items-center justify-center gap-4 bg-background {className ?? ''}">
      {@render children()}
    </div>
  {/if}
</section>
