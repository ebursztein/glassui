# PinInput

An optimized input component for one-time passwords (OTP) and verification pins with automatic focus advancing.

## Import

```ts
import { PinInput } from 'glassui';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| value | `string[]` | — | Bound array of pin digits. |
| length | `number` | `4` | Number of input boxes to render. |
| size | `xs | sm | md | lg | xl` | `md` | Input size |
| color | `primary | secondary | accent | destructive | neutral | gradient | info | success | warning | error` | — | Theme color/status |
| label | `string` | — | Label text above input |
| error | `string` | — | Error message (sets color to error) |
| helperText | `string` | — | Helper text below input |
| placeholder | `string` | `○` | Placeholder for empty boxes |
| glass | `ultra-thin | thin | normal | thick | ultra-thick` | `false` | Glass surface density |
| frosted | `light | medium | heavy` | `false` | Backdrop blur intensity |
| raised | `boolean` | `false` | Elevated with shadow |
| glow | `sm | md | lg` | `false` | Glow intensity |
| disabled | `boolean` | `false` | Disabled state |

## Examples

### Basic

```svelte
<PinInput length={4} />
```

## Full Source

```svelte
<script lang="ts">
  import { cn } from '$lib/utils/cn';
  import { useUI } from '$lib/interactions/useUI.svelte';
  import { GlassBackdrop } from '$lib/components/glass';
  import type { HTMLInputAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';
  import type { GlassDensity, FrostedLevel } from '$lib/interactions/glass';
  import type { GlowIntensity } from '$lib/interactions/glow';
  import type { Size, ThemeColor } from '$lib/types/enums';

  let pinCounter = 0;

  interface Props extends Omit<HTMLInputAttributes, 'size' | 'value'> {
    value?: string[];
    length?: number;
    size?: Size;
    color?: ThemeColor;
    label?: string | Snippet;
    error?: string | Snippet;
    helperText?: string | Snippet;
    placeholder?: string;
    glass?: GlassDensity | boolean;
    frosted?: FrostedLevel | boolean;
    raised?: boolean;
    colored?: boolean;
    glow?: GlowIntensity | boolean;
    class?: string;
  }

  let {
    id,
    length = 4,
    value = $bindable(Array(length).fill('')),
    size = 'md',
    color,
    label,
    error,
    helperText,
    placeholder = '○',
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
  const pinGroupId = id || `glass-pin-${pinCounter++}`;

  const ui = useUI({
    props: () => ({ size, color: effectiveColor, glass, frosted, raised, colored, glow, disabled }),
    role: 'field',
  });

  const sizeClasses: Record<Size, string> = {
    xs: 'w-7 h-7 text-xs rounded-lg',
    sm: 'w-8 h-8 text-xs rounded-lg',
    md: 'w-10 h-10 text-sm rounded-xl',
    lg: 'w-12 h-12 text-base rounded-xl',
    xl: 'w-14 h-14 text-lg rounded-2xl',
  };

  const inputClasses = $derived(cn(
    'relative text-center font-semibold transition-all duration-300 appearance-none',
    'focus:outline-none',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'placeholder:text-[var(--glass-text-faint)]',
    ui.className,
    sizeClasses[ui.size],
  ));

  let inputRefs: HTMLInputElement[] = [];

  const handleInput = (e: Event, index: number) => {
    const target = e.target as HTMLInputElement;
    const val = target.value;
    
    // Take only the last character typed
    if (val.length > 1) {
        target.value = val.slice(-1);
    }
    
    value[index] = target.value;

    // Auto-advance
    if (target.value !== '' && index < length - 1) {
      inputRefs[index + 1]?.focus();
    }
  };

  const handleKeydown = (e: KeyboardEvent, index: number) => {
    if (e.key === 'Backspace' && value[index] === '' && index > 0) {
      inputRefs[index - 1]?.focus();
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      inputRefs[index + 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData?.getData('text/plain')?.trim();
    if (!pastedData) return;

    for (let i = 0; i < length; i++) {
      if (i < pastedData.length) {
        value[i] = pastedData[i];
      }
    }
    
    // Focus the next empty input or the last input
    const nextEmpty = value.findIndex(v => v === '');
    if (nextEmpty !== -1 && nextEmpty < length) {
        inputRefs[nextEmpty]?.focus();
    } else {
        inputRefs[length - 1]?.focus();
    }
  };
</script>

<div class="w-full" style={ui.styles}>
  {#if label}
    <label for="{pinGroupId}-0" class="block text-sm font-medium mb-2 text-[var(--comp-text)]">
      {#if typeof label === 'string'}
        {label}
      {:else}
        {@render label()}
      {/if}
    </label>
  {/if}
  
  <div class={cn("flex gap-2 relative", className)}>
    {#each Array(length) as _, i}
      <div class="relative group {colored ? 'overflow-hidden rounded-xl' : ''}">
        {#if ui.showBackdrop}
          <GlassBackdrop />
        {/if}
        {#if ui.glowClass}
          <div class={ui.glowClass}></div>
        {/if}
        
        <input
          id={`${pinGroupId}-${i}`}
          type="text"
          class={inputClasses}
          value={value[i] || ''}
          {placeholder}
          maxlength={2}
          disabled={ui.disabled}
          bind:this={inputRefs[i]}
          oninput={(e) => handleInput(e, i)}
          onkeydown={(e) => handleKeydown(e, i)}
          onpaste={i === 0 ? handlePaste : undefined}
          aria-describedby={error || helperText ? `${pinGroupId}-hint` : undefined}
          aria-invalid={error ? true : undefined}
          {...rest}
        />
      </div>
    {/each}
  </div>

  {#if error}
    <p id="{pinGroupId}-hint" class="mt-1.5 text-xs text-error-foreground">
      {#if typeof error === 'string'}
        {error}
      {:else}
        {@render error()}
      {/if}
    </p>
  {:else if helperText}
    <p id="{pinGroupId}-hint" class="mt-1.5 text-xs text-[var(--comp-text)]/60">
      {#if typeof helperText === 'string'}
        {helperText}
      {:else}
        {@render helperText()}
      {/if}
    </p>
  {/if}
</div>
```