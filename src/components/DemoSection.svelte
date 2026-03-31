<script lang="ts">
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
    <div
      class="mt-4 rounded-lg border border-border p-6 flex flex-wrap items-center justify-center gap-4 relative overflow-hidden glass-bg {className ?? ''}"
      style="background: linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%);"
    >
      <!-- Gradient orbs to show glass effect -->
      <div class="absolute top-[20%] left-[15%] w-48 h-48 rounded-full blur-3xl opacity-40" style="background: rgba(6,182,212,0.6);"></div>
      <div class="absolute top-[10%] right-[20%] w-40 h-40 rounded-full blur-3xl opacity-40" style="background: rgba(139,92,246,0.6);"></div>
      <div class="absolute bottom-[15%] left-[45%] w-36 h-36 rounded-full blur-3xl opacity-30" style="background: rgba(59,130,246,0.6);"></div>
      <div class="relative z-10 flex flex-wrap items-center justify-center gap-4 w-full">
        {@render children()}
      </div>
    </div>
  {:else}
    <div
      class="mt-4 rounded-lg border border-border p-6 flex flex-wrap items-center justify-center gap-4 bg-background {className ?? ''}"
    >
      {@render children()}
    </div>
  {/if}
</section>
