<script lang="ts">
  import { cn } from '$lib/utils/cn';
  import { useUI } from '$lib/interactions/useUI.svelte';
  import { GlassBackdrop } from '$lib/components/glass';
  import type { HTMLInputAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';
  import type { GlassDensity, FrostedLevel } from '$lib/interactions/glass';
  import type { GlowIntensity } from '$lib/interactions/glow';
  import type { Size, ThemeColor } from '$lib/types/enums';

  let counter = 0;

  interface Props extends Omit<HTMLInputAttributes, 'size' | 'type'> {
    value?: string;
    size?: Size;
    color?: ThemeColor;
    label?: string | Snippet;
    error?: string | Snippet;
    helperText?: string | Snippet;
    glass?: GlassDensity | boolean;
    frosted?: FrostedLevel | boolean;
    raised?: boolean;
    colored?: boolean;
    glow?: GlowIntensity | boolean;
    class?: string;
  }

  let {
    id,
    value = $bindable('#000000'),
    size = 'md',
    color,
    label,
    error,
    helperText,
    glass,
    frosted,
    raised = false,
    colored = false,
    glow = false,
    disabled = false,
    class: className,
    ...rest
  }: Props = $props();

  const effectiveColor = $derived(error ? 'error' as const : color);
  const inputId = id || `glass-color-picker-${counter++}`;

  const ui = useUI({
    props: () => ({ size, color: effectiveColor, glass, frosted, raised, colored, glow, disabled }),
    role: 'field',
  });

  const sizeClasses: Record<Size, string> = {
    xs: 'h-7 pl-2 pr-2 text-xs rounded-lg',
    sm: 'h-8 pl-3 pr-3 text-xs rounded-lg',
    md: 'h-10 pl-4 pr-4 text-sm rounded-xl',
    lg: 'h-12 pl-5 pr-5 text-base rounded-xl',
    xl: 'h-14 pl-6 pr-6 text-lg rounded-2xl',
  };

  const inputClasses = $derived(cn(
    'relative flex items-center justify-between w-full transition-all duration-300',
    'focus:outline-none',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'text-foreground bg-transparent',
    ui.className,
    sizeClasses[ui.size],
    className,
  ));

  const swatchSizes: Record<Size, string> = {
    xs: 'w-4 h-4',
    sm: 'w-5 h-5',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-10 h-10',
  };
</script>

<div class="w-full" style={ui.styles}>
  {#if label}
    <label for={inputId} class="block text-sm font-medium mb-2 text-[var(--comp-text)]">
      {#if typeof label === 'string'}
        {label}
      {:else}
        {@render label()}
      {/if}
    </label>
  {/if}
  
  <div
    class="relative group {colored ? 'overflow-hidden rounded-xl' : ''}"
    onclick={() => document.getElementById(inputId)?.click()}
    onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); document.getElementById(inputId)?.click(); } }}
    tabindex="0"
    role="group"
    aria-label="Color picker"
  >
    {#if ui.showBackdrop}
      <GlassBackdrop />
    {/if}
    {#if ui.glowClass}
      <div class={ui.glowClass}></div>
    {/if}
    
    <div class={inputClasses}>
      <span class="truncate mr-3 font-mono text-[var(--comp-text)]">{value}</span>
      <div 
        class={cn('shrink-0 rounded shadow-sm border border-[var(--comp-border)] cursor-pointer', swatchSizes[ui.size])}
        style={`background-color: ${value};`}
      >
        <input
          id={inputId}
          type="color"
          class="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
          bind:value
          disabled={ui.disabled}
          aria-describedby={error || helperText ? `${inputId}-hint` : undefined}
          aria-invalid={error ? true : undefined}
          {...rest}
        />
      </div>
    </div>
  </div>

  {#if error}
    <p id="{inputId}-hint" class="mt-1.5 text-xs text-error-foreground">
      {#if typeof error === 'string'}
        {error}
      {:else}
        {@render error()}
      {/if}
    </p>
  {:else if helperText}
    <p id="{inputId}-hint" class="mt-1.5 text-xs text-[var(--comp-text)]/60">
      {#if typeof helperText === 'string'}
        {helperText}
      {:else}
        {@render helperText()}
      {/if}
    </p>
  {/if}
</div>