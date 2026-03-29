<script lang="ts">
  import { cn } from '$lib/utils/cn';
  import { hover as hoverTokens, focus, blurLevels } from '$lib/interactions/tokens';
  import type { Snippet } from 'svelte';
  import type { HoverEffect } from '$lib/interactions/schema';

  interface Props {
    glass?: boolean;
    blur?: 'sm' | 'md' | 'lg' | 'xl';
    glow?: boolean;
    hover?: HoverEffect;
    bg?: 'gradient' | 'mesh';
    children: Snippet;
    class?: string;
    [key: string]: unknown;
  }

  let {
    glass: isGlass = false,
    blur: blurLevel = 'xl',
    glow = false,
    hover: hoverEffect = 'none',
    bg,
    children,
    class: className,
    ...rest
  }: Props = $props();

  const solidClasses = cn(
    'bg-neutral-900 border border-neutral-800',
  );

  const glassClasses = cn(
    'bg-white/10 border border-white/20',
    'shadow-[0_8px_32px_rgba(0,0,0,0.37)]',
    'before:absolute before:inset-0 before:rounded-[inherit]',
    'before:bg-gradient-to-b before:from-white/10 before:to-transparent before:pointer-events-none',
    'after:absolute after:inset-px after:rounded-[calc(inherit-1px)]',
    'after:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] after:pointer-events-none',
  );

  const classes = $derived(cn(
    'relative rounded-2xl transition-all duration-300 overflow-hidden',
    isGlass ? glassClasses : solidClasses,
    isGlass ? blurLevels[blurLevel] : '',
    hoverTokens[hoverEffect],
    className,
  ));
</script>

<div class="relative">
  {#if glow}
    <div
      class="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[var(--glass-glow-1)] via-[var(--glass-glow-2)] to-[var(--glass-glow-3)] blur-xl opacity-70"
    ></div>
  {/if}
  <div class={classes} {...rest}>
    {#if bg === 'gradient'}
      <div class="absolute inset-0 rounded-[inherit] overflow-hidden">
        <div class="absolute top-[15%] left-[20%] w-64 h-64 rounded-full blur-3xl" style="background: var(--glass-accent-1);opacity:0.3;"></div>
        <div class="absolute top-[10%] right-[15%] w-52 h-52 rounded-full blur-3xl" style="background: var(--glass-accent-3);opacity:0.3;"></div>
        <div class="absolute bottom-[15%] left-[40%] w-48 h-48 rounded-full blur-3xl" style="background: var(--glass-accent-2);opacity:0.25;"></div>
      </div>
    {:else if bg === 'mesh'}
      <div class="absolute inset-0 rounded-[inherit] overflow-hidden">
        <div class="absolute top-[10%] left-[15%] w-56 h-56 rounded-full blur-3xl" style="background: var(--glass-accent-1);opacity:0.3;"></div>
        <div class="absolute top-[20%] right-[10%] w-48 h-48 rounded-full blur-3xl" style="background: var(--glass-accent-3);opacity:0.3;"></div>
        <div class="absolute bottom-[10%] left-[50%] w-44 h-44 rounded-full blur-3xl" style="background: var(--glass-accent-2);opacity:0.25;"></div>
        <div class="absolute bottom-[30%] left-[10%] w-40 h-40 rounded-full blur-3xl" style="background: rgba(236,72,153,0.2);"></div>
        <div class="absolute top-[50%] right-[30%] w-36 h-36 rounded-full blur-3xl" style="background: rgba(16,185,129,0.2);"></div>
      </div>
    {/if}
    <div class="relative z-10">
      {@render children()}
    </div>
  </div>
</div>
