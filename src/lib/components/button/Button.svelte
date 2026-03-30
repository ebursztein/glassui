<script lang="ts">
  import { cn } from '$lib/utils/cn';
  import { focus } from '$lib/interactions/tokens';
  import { getGlassClass, resolveGlass, getParentGlass } from '$lib/interactions/glass';
  import { getGlowClass, type GlowIntensity } from '$lib/interactions/glow';
  import { GlassBackdrop } from '$lib/components/glass';
  import type { Snippet } from 'svelte';
  import type { HTMLButtonAttributes } from 'svelte/elements';
  import type { Variant, Size } from '$lib/types/enums';

  interface Props extends HTMLButtonAttributes {
    variant?: Variant;
    size?: Size;
    glass?: GlassEffect | boolean;
    glassbg?: boolean;
    glow?: GlowIntensity | boolean;
    loading?: boolean;
    children: Snippet;
    class?: string;
  }

  let {
    variant = 'default',
    size = 'md',
    glass = false,
    glassbg = false,
    glow = false,
    loading = false,
    disabled = false,
    children,
    class: className,
    ...rest
  }: Props = $props();

  const isDisabled = $derived(disabled || loading);
  const parentGlass = getParentGlass();
  const effectiveGlass = $derived(resolveGlass(glass) || parentGlass());
  const glassClass = $derived(getGlassClass(effectiveGlass));
  const glowClass = $derived(getGlowClass(glow));

  const solidVariants: Record<Variant, string> = {
    default: cn('bg-surface border border-line-2 text-foreground shadow-sm', 'hover:bg-surface-hover'),
    primary: cn('bg-primary border border-primary-line text-primary-foreground shadow-sm', 'hover:bg-primary-hover'),
    secondary: cn('bg-secondary border border-secondary-line text-secondary-foreground shadow-sm', 'hover:bg-secondary-hover'),
    outline: cn('bg-transparent border-2 border-line-3 text-foreground', 'hover:bg-layer-hover hover:border-line-4'),
    ghost: cn('bg-transparent text-muted-foreground', 'hover:bg-layer-hover hover:text-foreground'),
    destructive: cn('bg-destructive border border-transparent text-destructive-foreground shadow-sm', 'hover:bg-destructive-hover'),
  };

  const sizeClasses: Record<Size, string> = {
    xs: 'h-7 px-2 text-xs rounded-md',
    sm: 'h-8 px-3 text-xs rounded-md',
    md: 'h-10 px-4 py-2 text-sm rounded-lg',
    lg: 'h-12 px-6 text-base rounded-lg',
    xl: 'h-14 px-8 text-lg rounded-lg',
  };

  const baseClasses = cn(
    'relative inline-flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer',
    'font-medium transition-all duration-200 ease-out',
    'disabled:pointer-events-none disabled:opacity-50',
    focus.ring,
    '[&_svg]:pointer-events-none [&_svg]:shrink-0',
  );

  const glassInteraction = 'hover:bg-white/20 active:bg-white/10 transition-colors duration-200';

  const classes = $derived(cn(
    baseClasses,
    glassClass ? cn(glassClass, glassInteraction) : solidVariants[variant],
    sizeClasses[size],
    className,
  ));
</script>

{#if glowClass}
<div class="relative inline-block">
  <div class={glowClass}></div>
  <button class={classes} disabled={isDisabled} aria-busy={loading} {...rest}>
    <span class="relative z-10 flex items-center gap-2">
      {#if loading}
        <svg class="animate-spin h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      {/if}
      {@render children()}
    </span>
  </button>
</div>
{:else}
<button class={classes} disabled={isDisabled} aria-busy={loading} {...rest}>
  <span class="relative z-10 flex items-center gap-2">
    {#if loading}
      <svg class="animate-spin h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    {/if}
    {@render children()}
  </span>
</button>
{/if}
