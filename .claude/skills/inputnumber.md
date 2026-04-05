# InputNumber

A numeric input with increment and decrement buttons, supporting bounds, step intervals, and full UI Engine themes.

## Import

```ts
import { InputNumber } from 'glassui';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| value | `number` | `0` | The bound numeric value. |
| min | `number` | — | Minimum allowed value. |
| max | `number` | — | Maximum allowed value. |
| step | `number` | `1` | Increment/decrement step size. |
| size | `xs | sm | md | lg | xl` | `md` | Input size |
| color | `primary | secondary | accent | destructive | neutral | gradient | info | success | warning | error` | — | Theme color/status |
| label | `string` | — | Label text above input |
| error | `string` | — | Error message (sets color to error) |
| helperText | `string` | — | Helper text below input |
| glass | `ultra-thin | thin | normal | thick | ultra-thick` | `false` | Glass surface density |
| frosted | `light | medium | heavy` | `false` | Backdrop blur intensity |
| raised | `boolean` | `false` | Elevated with shadow |
| glow | `sm | md | lg` | `false` | Glow intensity |
| disabled | `boolean` | `false` | Disabled state |

## Examples

### Basic

```svelte
<InputNumber bind:value={count} min={0} max={10} />
```

## Full Source

```svelte
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

  let counter = 0;

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
    frosted?: FrostedLevel | boolean;
    raised?: boolean;
    colored?: boolean;
    glow?: GlowIntensity | boolean;
    class?: string;
  }

  let {
    id,
    value = $bindable(0),
    min,
    max,
    step = 1,
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
  const inputId = id || `glass-input-number-${counter++}`;

  const ui = useUI({
    props: () => ({ size, color: effectiveColor, glass, frosted, raised, colored, glow, disabled }),
    role: 'field',
  });

  const sizeClasses: Record<Size, string> = {
    xs: 'h-7 text-xs rounded-lg',
    sm: 'h-8 text-xs rounded-lg',
    md: 'h-10 text-sm rounded-xl',
    lg: 'h-12 text-base rounded-xl',
    xl: 'h-14 text-lg rounded-2xl',
  };

  const buttonPadding: Record<Size, string> = {
    xs: 'w-7 px-1',
    sm: 'w-8 px-2',
    md: 'w-10 px-3',
    lg: 'w-12 px-4',
    xl: 'w-14 px-5',
  };

  const containerClasses = $derived(cn(
    'relative flex items-center w-full transition-all duration-300',
    'disabled:cursor-not-allowed disabled:opacity-50',
    ui.className,
    sizeClasses[ui.size],
    className,
  ));

  // Correct floating point math errors
  const round = (num: number) => Math.round(num * 100000000) / 100000000;

  const increment = () => {
    if (disabled) return;
    const next = round(value + step);
    if (max !== undefined && next > max) {
      value = max;
    } else {
      value = next;
    }
  };

  const decrement = () => {
    if (disabled) return;
    const next = round(value - step);
    if (min !== undefined && next < min) {
      value = min;
    } else {
      value = next;
    }
  };

  const handleInput = (e: Event) => {
    const target = e.target as HTMLInputElement;
    let parsed = parseFloat(target.value);
    
    if (isNaN(parsed)) {
      parsed = min ?? 0;
    }

    if (min !== undefined && parsed < min) parsed = min;
    if (max !== undefined && parsed > max) parsed = max;
    
    value = parsed;
    target.value = String(parsed);
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
    
    <div class={containerClasses}>
      <button
        type="button"
        class={cn('flex justify-center items-center h-full text-[var(--comp-text)] hover:bg-[var(--comp-text)]/10 active:bg-[var(--comp-text)]/20 transition-colors rounded-l-[inherit]', buttonPadding[ui.size])}
        onclick={decrement}
        {disabled}
        aria-label="Decrease"
      >
        <Icon name="minus" size={14} weight="bold" />
      </button>

      <input
        id={inputId}
        type="number"
        class="flex-1 w-full h-full text-center bg-transparent border-x border-[var(--comp-border)] text-foreground focus:outline-none focus:bg-[var(--comp-hover)]/5 transition-colors appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        {value}
        {min}
        {max}
        {step}
        disabled={ui.disabled}
        aria-describedby={error || helperText ? `${inputId}-hint` : undefined}
        aria-invalid={error ? true : undefined}
        onchange={handleInput}
        {...rest}
      />

      <button
        type="button"
        class={cn('flex justify-center items-center h-full text-[var(--comp-text)] hover:bg-[var(--comp-text)]/10 active:bg-[var(--comp-text)]/20 transition-colors rounded-r-[inherit]', buttonPadding[ui.size])}
        onclick={increment}
        {disabled}
        aria-label="Increase"
      >
        <Icon name="plus" size={14} weight="bold" />
      </button>
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
```