# RangeSlider

A custom-styled native range slider with dynamic progress track rendering and full GlassUI support.

## Import

```ts
import { RangeSlider } from 'glassui';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| value | `number` | `50` | The bound numeric value. |
| min | `number` | `0` | Minimum allowed value. |
| max | `number` | `100` | Maximum allowed value. |
| step | `number` | `1` | Increment/decrement step size. |
| size | `xs | sm | md | lg | xl` | `md` | Input size |
| color | `primary | secondary | accent | destructive | neutral | gradient | info | success | warning | error` | — | Theme color/status |
| label | `string` | — | Label text above slider |
| error | `string` | — | Error message (sets color to error) |
| helperText | `string` | — | Helper text below slider |
| glass | `ultra-thin | thin | normal | thick | ultra-thick` | `false` | Glass surface density |
| disabled | `boolean` | `false` | Disabled state |

## Examples

### Basic

```svelte
<RangeSlider bind:value={volume} />
```

## Full Source

```svelte
<script lang="ts">
  import { cn } from '$lib/utils/cn';
  import { useUI } from '$lib/interactions/useUI.svelte';
  import { GlassBackdrop } from '$lib/components/glass';
  import type { HTMLInputAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';
  import type { GlassDensity } from '$lib/interactions/glass';
  import type { Size, ThemeColor } from '$lib/types/enums';

  let sliderCounter = 0;

  interface Props extends Omit<HTMLInputAttributes, 'size' | 'value' | 'min' | 'max' | 'step'> {
    value?: number;
    min?: number;
    max?: number;
    step?: number;
    size?: Size;
    color?: ThemeColor;
    label?: string | Snippet;
    error?: string | Snippet;
    helperText?: string | Snippet;
    glass?: GlassDensity | boolean;
    disabled?: boolean;
    class?: string;
  }

  let {
    id,
    value = $bindable(50),
    min = 0,
    max = 100,
    step = 1,
    size = 'md',
    color = 'primary',
    label,
    error,
    helperText,
    glass,
    disabled = false,
    class: className,
    ...rest
  }: Props = $props();

  const effectiveColor = $derived(error ? 'error' as const : color);
  const sliderId = id || `glass-slider-${sliderCounter++}`;

  const ui = useUI({
    props: () => ({ size, color: effectiveColor, glass, disabled }),
    role: 'field', // Range uses field role for inset styling semantics on the track
  });

  const percentage = $derived(((value - min) / (max - min)) * 100);

  const sizeClasses: Record<Size, string> = {
    xs: 'h-1 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3',
    sm: 'h-1.5 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4',
    md: 'h-2 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5',
    lg: 'h-3 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6',
    xl: 'h-4 [&::-webkit-slider-thumb]:w-7 [&::-webkit-slider-thumb]:h-7',
  };

  const containerClasses = $derived(cn(
    'relative w-full rounded-full transition-all duration-300 appearance-none bg-transparent',
    'focus:outline-none',
    'disabled:cursor-not-allowed disabled:opacity-50',
    
    // Custom Thumb Styling (The Handle)
    '[&::-webkit-slider-thumb]:appearance-none',
    '[&::-webkit-slider-thumb]:rounded-full',
    '[&::-webkit-slider-thumb]:bg-[var(--comp-bg)]',
    '[&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[var(--comp-border)]',
    '[&::-webkit-slider-thumb]:shadow-sm',
    '[&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:duration-150',
    !disabled && '[&::-webkit-slider-thumb]:hover:scale-110',
    !disabled && 'active:[&::-webkit-slider-thumb]:scale-95',
    
    // Thumb positioning adjustments
    'xs' === size && '[&::-webkit-slider-thumb]:-mt-1',
    'sm' === size && '[&::-webkit-slider-thumb]:-mt-[5px]',
    'md' === size && '[&::-webkit-slider-thumb]:-mt-1.5',
    'lg' === size && '[&::-webkit-slider-thumb]:-mt-1.5',
    'xl' === size && '[&::-webkit-slider-thumb]:-mt-1.5',

    sizeClasses[ui.size],
    className,
  ));

  // The track uses linear-gradient to simulate filling the progress bar
  const trackStyle = $derived(`
    background: linear-gradient(
      to right, 
      var(--comp-bg) 0%, 
      var(--comp-bg) ${percentage}%, 
      transparent ${percentage}%, 
      transparent 100%
    );
  `);
</script>

<div class="w-full" style={ui.styles}>
  {#if label}
    <label for={sliderId} class="block text-sm font-medium mb-2 text-[var(--comp-text)]">
      {#if typeof label === 'string'}
        {label}
      {:else}
        {@render label()}
      {/if}
    </label>
  {/if}
  
  <div class="relative flex items-center py-2 group">
    <!-- The physical track background (inset shadow) -->
    <div class={cn("absolute inset-y-2 left-0 right-0 rounded-full pointer-events-none", ui.glass !== false ? 'glass-inset border border-transparent' : 'bg-layer border border-line-2')} />
    
    <input
      id={sliderId}
      type="range"
      class={containerClasses}
      style={trackStyle}
      bind:value
      {min}
      {max}
      {step}
      disabled={ui.disabled}
      aria-describedby={error || helperText ? `${sliderId}-hint` : undefined}
      aria-invalid={error ? true : undefined}
      {...rest}
    />
  </div>

  {#if error}
    <p id="{sliderId}-hint" class="mt-1 text-xs text-error-foreground">
      {#if typeof error === 'string'}
        {error}
      {:else}
        {@render error()}
      {/if}
    </p>
  {:else if helperText}
    <p id="{sliderId}-hint" class="mt-1 text-xs text-[var(--comp-text)]/60">
      {#if typeof helperText === 'string'}
        {helperText}
      {:else}
        {@render helperText()}
      {/if}
    </p>
  {/if}
</div>
```