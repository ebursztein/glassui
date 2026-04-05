<script lang="ts">
  import { cn } from '$lib/utils/cn';
  import { useUI } from '$lib/interactions/useUI.svelte';
  import { GlassBackdrop } from '$lib/components/glass';
  import { Icon } from '$lib/components/icon';
  import type { HTMLInputAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';
  import type { GlassDensity, FrostedLevel } from '$lib/interactions/glass';
  import type { GlowIntensity } from '$lib/interactions/glow';
  import type { Size, ThemeColor } from '$lib/types/enums';

  let inputCounter = 0;

  interface Props extends Omit<HTMLInputAttributes, 'size' | 'type'> {
    value?: string;
    size?: Size;
    color?: ThemeColor;
    label?: string | Snippet;
    error?: string | Snippet;
    helperText?: string | Snippet;
    placeholder?: string;
    showStrength?: boolean;
    glass?: GlassDensity | boolean;
    frosted?: FrostedLevel | boolean;
    raised?: boolean;
    colored?: boolean;
    glow?: GlowIntensity | boolean;
    class?: string;
  }

  let {
    id,
    value = $bindable(''),
    size = 'md',
    color,
    label,
    error,
    helperText,
    placeholder = 'Enter password',
    showStrength = false,
    glass,
    frosted,
    raised = false,
    colored = false,
    glow = false,
    disabled = false,
    class: className,
    ...rest
  }: Props = $props();

  let isVisible = $state(false);
  const effectiveColor = $derived(error ? 'error' as const : color);
  const inputId = id || `glass-password-${inputCounter++}`;

  const ui = useUI({
    props: () => ({ size, color: effectiveColor, glass, frosted, raised, colored, glow, disabled }),
    role: 'field',
  });

  const sizeClasses: Record<Size, string> = {
    xs: 'h-7 pl-2 pr-8 text-xs rounded-lg',
    sm: 'h-8 pl-3 pr-9 text-xs rounded-lg',
    md: 'h-10 pl-4 pr-10 text-sm rounded-xl',
    lg: 'h-12 pl-5 pr-11 text-base rounded-xl',
    xl: 'h-14 pl-6 pr-12 text-lg rounded-2xl',
  };

  const inputClasses = $derived(cn(
    'relative flex w-full transition-all duration-300',
    'focus:outline-none',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'placeholder:text-[var(--glass-text-faint)]',
    ui.className,
    sizeClasses[ui.size],
    className,
  ));

  // Simple password strength calculator (for demo purposes, mirrors Preline functionality)
  const strengthScore = $derived(() => {
    if (!value) return 0;
    let score = 0;
    if (value.length > 6) score += 1;
    if (/[a-z]/.test(value) && /[A-Z]/.test(value)) score += 1;
    if (/\d/.test(value)) score += 1;
    if (/[^A-Za-z0-9]/.test(value)) score += 1;
    return score;
  });

  const strengthColor = $derived(() => {
    const s = strengthScore();
    if (s <= 1) return 'bg-[var(--status-error)]';
    if (s === 2) return 'bg-[var(--status-warning)]';
    if (s === 3) return 'bg-[var(--status-success)]';
    return 'bg-[var(--primary)]';
  });

  const toggleVisibility = () => {
    if (!disabled) isVisible = !isVisible;
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
  
  <div class="relative group {colored ? 'overflow-hidden rounded-xl' : ''}">
    {#if ui.showBackdrop}
      <GlassBackdrop />
    {/if}
    {#if ui.glowClass}
      <div class={ui.glowClass}></div>
    {/if}
    
    <input
      id={inputId}
      type={isVisible ? 'text' : 'password'}
      class={inputClasses}
      bind:value
      {placeholder}
      disabled={ui.disabled}
      aria-describedby={error || helperText || showStrength ? `${inputId}-hint` : undefined}
      aria-invalid={error ? true : undefined}
      {...rest}
    />

    <button
      type="button"
      class="absolute inset-y-0 end-0 flex items-center pr-3 cursor-pointer text-[var(--comp-text)]/60 hover:text-[var(--comp-text)] focus:outline-none transition-colors"
      onclick={toggleVisibility}
      {disabled}
      tabindex="-1"
      aria-label={isVisible ? "Hide password" : "Show password"}
    >
      {#if isVisible}
        <Icon name="eye-slash" size={18} />
      {:else}
        <Icon name="eye" size={18} />
      {/if}
    </button>
  </div>

  {#if showStrength && value.length > 0}
    <div class="mt-2" id="{inputId}-strength">
      <div class="flex items-center gap-x-1">
        {#each Array(4) as _, i}
          <div class={cn("h-1.5 flex-1 rounded-full transition-colors duration-300", i < strengthScore() ? strengthColor() : "bg-border")}></div>
        {/each}
      </div>
      <p class="mt-1.5 text-xs text-muted-foreground text-right">
        {strengthScore() <= 1 ? 'Weak' : strengthScore() === 2 ? 'Fair' : strengthScore() === 3 ? 'Good' : 'Strong'}
      </p>
    </div>
  {/if}

  {#if error}
    <p id="{inputId}-hint" class="mt-1.5 text-xs text-error-foreground">
      {#if typeof error === 'string'}
        {error}
      {:else}
        {@render error()}
      {/if}
    </p>
  {:else if helperText && !showStrength}
    <p id="{inputId}-hint" class="mt-1.5 text-xs text-[var(--comp-text)]/60">
      {#if typeof helperText === 'string'}
        {helperText}
      {:else}
        {@render helperText()}
      {/if}
    </p>
  {/if}
</div>