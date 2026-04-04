# Input

Text input with size variants, status colors, label, helper text, error messages, and optional glass surface with glow on focus.

## Import

```ts
import { Input } from 'glassui';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| size | `xs | sm | md | lg | xl` | `md` | Input size |
| status | `info | success | warning | error` | — | Status border color |
| label | `string` | — | Label text above input |
| error | `string` | — | Error message (sets status to error) |
| helperText | `string` | — | Helper text below input |
| glass | `ultra-thin | thin | normal | thick | ultra-thick` | `false` | Glass surface density |
| frosted | `light | medium | heavy` | `false` | Backdrop blur intensity |
| raised | `boolean` | `false` | Elevated with shadow |
| colored | `boolean` | `false` | Colored glass accent orbs behind content |
| glow | `sm | md | lg` | `false` | Glow intensity |
| disabled | `boolean` | `false` | Disabled state |

## Examples

### Default

```svelte
<Input placeholder="Enter text" />
```

### With label

```svelte
<Input label="Email" placeholder="you@example.com" />
```

### Glass + glow

```svelte
<Input label="Name" glass glow placeholder="John" />
```

### Error status

```svelte
<Input label="Email" status="error" placeholder="Invalid" />
```

## Full Source

```svelte
<script lang="ts">
  import { cn } from '$lib/utils/cn';
  import { useUI } from '$lib/interactions/useUI.svelte';
  import { GlassBackdrop } from '$lib/components/glass';
  import type { HTMLInputAttributes } from 'svelte/elements';
  import type { GlassDensity, FrostedLevel } from '$lib/interactions/glass';
  import type { GlowIntensity } from '$lib/interactions/glow';
  import type { Size, Status } from '$lib/types/enums';

  let inputCounter = 0;

  interface Props extends HTMLInputAttributes {
    size?: Size;
    status?: Status;
    label?: string;
    error?: string;
    helperText?: string;
    glass?: GlassDensity | boolean;
    frosted?: FrostedLevel | boolean;
    raised?: boolean;
    colored?: boolean;
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
    frosted = false,
    raised = false,
    colored = false,
    glow = false,
    disabled = false,
    class: className,
    ...rest
  }: Props = $props();

  const effectiveStatus = $derived(error ? 'error' as const : status);

  const inputId = id || `glass-input-${inputCounter++}`;

  const ui = useUI({
    props: () => ({ size, status: effectiveStatus, glass, frosted, raised, colored, glow, disabled }),
    role: 'field',
  });

  const sizeClasses: Record<Size, string> = {
    xs: 'h-7 px-2 text-xs rounded-lg',
    sm: 'h-8 px-3 text-xs rounded-lg',
    md: 'h-10 px-4 text-sm rounded-xl',
    lg: 'h-12 px-5 text-base rounded-xl',
    xl: 'h-14 px-6 text-lg rounded-2xl',
  };

  const inputClasses = $derived(cn(
    'relative flex w-full transition-all duration-300',
    'focus:outline-none',
    'disabled:cursor-not-allowed disabled:opacity-50',
    ui.className,
    sizeClasses[ui.size],
    className,
  ));
</script>

<div class="w-full" style={ui.styles}>
  {#if label}
    <label for={inputId} class="block text-sm font-medium mb-2 text-[var(--comp-text)]">{label}</label>
  {/if}
  <div class="relative group {colored ? 'overflow-hidden rounded-xl' : ''}">
    {#if ui.showBackdrop}
      <GlassBackdrop />
    {/if}
    {#if ui.glowClass}
      <div class={ui.glowClass}></div>
    {/if}
    <input id={inputId} class={inputClasses} disabled={ui.disabled} aria-describedby={error || helperText ? `${inputId}-hint` : undefined} aria-invalid={error ? true : undefined} {...rest} />
  </div>
  {#if error}
    <p id="{inputId}-hint" class="mt-1.5 text-xs text-status-error-foreground">{error}</p>
  {:else if helperText}
    <p id="{inputId}-hint" class="mt-1.5 text-xs text-[var(--comp-text)]/60">{helperText}</p>
  {/if}
</div>
```