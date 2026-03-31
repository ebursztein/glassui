<script lang="ts">
  import { cn } from '$lib/utils/cn';
  import { getGlassClasses, resolveGlass, bumpGlass, getParentGlass, type GlassEffect } from '$lib/interactions/glass';
  import { getGlowClass, type GlowIntensity } from '$lib/interactions/glow';
  import { GlassBackdrop } from '$lib/components/glass';
  import type { HTMLInputAttributes } from 'svelte/elements';
  import type { Size, Status } from '$lib/types/enums';

  let inputCounter = 0;

  interface Props extends HTMLInputAttributes {
    size?: Size;
    status?: Status;
    label?: string;
    error?: string;
    helperText?: string;
    glass?: GlassEffect | boolean;
    glassbg?: boolean;
    glow?: GlowIntensity | boolean;
    class?: string;
  }

  let {
    id,
    size = 'md',
    status,
    label,
    error,
    helperText,
    glass = false,
    glassbg = false,
    glow = false,
    disabled = false,
    class: className,
    ...rest
  }: Props = $props();

  const effectiveStatus = $derived(error ? 'error' as const : status);

  const inputId = id || `glass-input-${inputCounter++}`;

  const parentGlass = getParentGlass();
  const inherited = $derived(parentGlass());
  const effectiveGlass = $derived(resolveGlass(glass) || (inherited ? bumpGlass(inherited) : false));
  const allGlassClasses = $derived(getGlassClasses(effectiveGlass, 'field'));
  const glowClass = $derived(getGlowClass(glow));

  const sizeClasses: Record<Size, string> = {
    xs: 'h-7 px-2 text-xs rounded-lg',
    sm: 'h-8 px-3 text-xs rounded-lg',
    md: 'h-10 px-4 text-sm rounded-xl',
    lg: 'h-12 px-5 text-base rounded-xl',
    xl: 'h-14 px-6 text-lg rounded-2xl',
  };

  const solidClasses = cn(
    'bg-layer border border-line-2 text-foreground',
    'placeholder:text-muted-foreground',
    'focus:border-primary focus:ring-2 focus:ring-primary/20',
  );

  const statusBorders: Record<Status, string> = {
    info: 'border-cyan-500 focus:border-cyan-400 focus:ring-cyan-400/20',
    success: 'border-emerald-500 focus:border-emerald-400 focus:ring-emerald-400/20',
    warning: 'border-amber-500 focus:border-amber-400 focus:ring-amber-400/20',
    error: 'border-red-500 focus:border-red-400 focus:ring-red-400/20',
  };

  const inputClasses = $derived(cn(
    'relative flex w-full transition-all duration-300',
    'focus:outline-none',
    'disabled:cursor-not-allowed disabled:opacity-50',
    allGlassClasses || solidClasses,
    effectiveStatus ? statusBorders[effectiveStatus] : '',
    sizeClasses[size],
    className,
  ));
</script>

<div class="w-full">
  {#if label}
    <label for={inputId} class="block text-sm font-medium text-foreground mb-2">{label}</label>
  {/if}
  <div class="relative group {glassbg ? 'glass-bg rounded-xl' : ''}">
    {#if glassbg}
      <GlassBackdrop />
    {/if}
    {#if glowClass}
      <div class={glowClass}></div>
    {/if}
    <input id={inputId} class={inputClasses} {disabled} aria-describedby={error || helperText ? `${inputId}-hint` : undefined} aria-invalid={error ? true : undefined} {...rest} />
  </div>
  {#if error}
    <p id="{inputId}-hint" class="mt-1.5 text-xs text-status-error-foreground">{error}</p>
  {:else if helperText}
    <p id="{inputId}-hint" class="mt-1.5 text-xs text-muted-foreground">{helperText}</p>
  {/if}
</div>
