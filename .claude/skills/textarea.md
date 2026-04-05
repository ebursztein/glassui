# Textarea

Multi-line text input with size, color, label, and optional glass surface with glow on focus.

## Import

```ts
import { Textarea } from 'glassui';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| size | `xs | sm | md | lg | xl` | `md` | Text size and padding |
| color | `primary | secondary | accent | destructive | neutral | gradient | info | success | warning | error` | — | Color/status border theme |
| label | `string` | — | Label text above textarea |
| error | `string` | — | Error message (sets color to error) |
| helperText | `string` | — | Helper text below textarea |
| glass | `ultra-thin | thin | normal | thick | ultra-thick` | `false` | Glass surface density |
| frosted | `light | medium | heavy` | `false` | Backdrop blur intensity |
| raised | `boolean` | `false` | Elevated with shadow |
| colored | `boolean` | `false` | Colored glass accent orbs behind content |
| glow | `sm | md | lg` | `false` | Glow intensity |
| rows | `number` | `4` | Number of visible rows |
| resize | `none | vertical | both` | `vertical` | Resize behavior |
| disabled | `boolean` | `false` | Disabled state |

## Examples

### Default

```svelte
<Textarea placeholder="Write something..." />
```

### With label

```svelte
<Textarea label="Message" placeholder="Your message" />
```

### Glass + glow

```svelte
<Textarea label="Bio" glass glow placeholder="Tell us about yourself" />
```

## Full Source

```svelte
<script lang="ts">
  import { cn } from '$lib/utils/cn';
  import { useUI } from '$lib/interactions/useUI.svelte';
  import { GlassBackdrop } from '$lib/components/glass';
  import type { HTMLTextareaAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';
  import type { GlassDensity, FrostedLevel } from '$lib/interactions/glass';
  import type { GlowIntensity } from '$lib/interactions/glow';
  import type { Size, ThemeColor } from '$lib/types/enums';

  let textareaCounter = 0;

  interface Props extends HTMLTextareaAttributes {
    value?: any;
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
    resize?: 'none' | 'vertical' | 'both';
    class?: string;
  }

  let {
    id,
    value = $bindable(),
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
    resize = 'vertical',
    rows = 4,
    disabled = false,
    class: className,
    ...rest
  }: Props = $props();

  const effectiveColor = $derived(error ? 'error' as const : color);

  const textareaId = id || `glass-textarea-${textareaCounter++}`;

  const ui = useUI({
    props: () => ({ size, color: effectiveColor, glass, frosted, raised, colored, glow, disabled }),
    role: 'field',
  });

  const sizePadding: Record<Size, string> = {
    xs: 'px-2 py-1.5 text-xs rounded-lg',
    sm: 'px-3 py-2 text-xs rounded-lg',
    md: 'px-4 py-3 text-sm rounded-xl',
    lg: 'px-5 py-3.5 text-base rounded-xl',
    xl: 'px-6 py-4 text-lg rounded-2xl',
  };

  const resizeClasses: Record<string, string> = {
    none: 'resize-none',
    vertical: 'resize-y',
    both: 'resize',
  };

  const textareaClasses = $derived(cn(
    'relative flex w-full transition-all duration-300',
    'focus:outline-none',
    'disabled:cursor-not-allowed disabled:opacity-50',
    ui.className,
    sizePadding[ui.size],
    resizeClasses[resize],
    className,
  ));
</script>

<div class="w-full" style={ui.styles}>
  {#if label}
    <label for={textareaId} class="block text-sm font-medium mb-2 text-[var(--comp-text)]">
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
    <textarea id={textareaId} class={textareaClasses} bind:value {rows} disabled={ui.disabled} aria-describedby={error || helperText ? `${textareaId}-hint` : undefined} aria-invalid={error ? true : undefined} {...rest}></textarea>
  </div>
  {#if error}
    <p id="{textareaId}-hint" class="mt-1.5 text-xs text-error-foreground">
      {#if typeof error === 'string'}
        {error}
      {:else}
        {@render error()}
      {/if}
    </p>
  {:else if helperText}
    <p id="{textareaId}-hint" class="mt-1.5 text-xs text-[var(--comp-text)]/60">
      {#if typeof helperText === 'string'}
        {helperText}
      {:else}
        {@render helperText()}
      {/if}
    </p>
  {/if}
</div>
```