# Textarea

Multi-line text input with size, status, label, and optional glass surface with glow on focus.

## Import

```ts
import { Textarea } from 'glassui';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| size | `xs | sm | md | lg | xl` | `md` | Text size and padding |
| status | `info | success | warning | error` | — | Status border color |
| label | `string` | — | Label text above textarea |
| error | `string` | — | Error message (sets status to error) |
| helperText | `string` | — | Helper text below textarea |
| glass | `subtle | frosted | heavy` | `false` | Glass translucency level |
| glassbg | `boolean` | `false` | Themed gradient backdrop |
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
  import { getGlassClass, resolveGlass, bumpGlass, getParentGlass } from '$lib/interactions/glass';
  import { getGlowClass, type GlowIntensity } from '$lib/interactions/glow';
  import { GlassBackdrop } from '$lib/components/glass';
  import type { HTMLTextareaAttributes } from 'svelte/elements';
  import type { Size, Status } from '$lib/types/enums';

  let textareaCounter = 0;

  interface Props extends HTMLTextareaAttributes {
    size?: Size;
    status?: Status;
    label?: string;
    error?: string;
    helperText?: string;
    glass?: GlassEffect | boolean;
    glassbg?: boolean;
    glow?: GlowIntensity | boolean;
    resize?: 'none' | 'vertical' | 'both';
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
    resize = 'vertical',
    rows = 4,
    disabled = false,
    class: className,
    ...rest
  }: Props = $props();

  const effectiveStatus = $derived(error ? 'error' as const : status);

  const textareaId = id || `glass-textarea-${textareaCounter++}`;

  const parentGlass = getParentGlass();
  const inherited = $derived(parentGlass());
  const effectiveGlass = $derived(resolveGlass(glass) || (inherited ? bumpGlass(inherited) : false));
  const glassClass = $derived(getGlassClass(effectiveGlass));
  const glowClass = $derived(getGlowClass(glow));

  const sizePadding: Record<Size, string> = {
    xs: 'px-2 py-1.5 text-xs rounded-lg',
    sm: 'px-3 py-2 text-xs rounded-lg',
    md: 'px-4 py-3 text-sm rounded-xl',
    lg: 'px-5 py-3.5 text-base rounded-xl',
    xl: 'px-6 py-4 text-lg rounded-2xl',
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

  const resizeClasses: Record<string, string> = {
    none: 'resize-none',
    vertical: 'resize-y',
    both: 'resize',
  };

  const glassInteraction = cn(
    'placeholder:text-white/40',
    'focus:border-white/40 focus:ring-2 focus:ring-white/20',
  );

  const textareaClasses = $derived(cn(
    'relative flex w-full transition-all duration-300',
    'focus:outline-none',
    'disabled:cursor-not-allowed disabled:opacity-50',
    glassClass ? cn(glassClass, glassInteraction) : solidClasses,
    effectiveStatus ? statusBorders[effectiveStatus] : '',
    sizePadding[size],
    resizeClasses[resize],
    className,
  ));
</script>

<div class="w-full">
  {#if label}
    <label for={textareaId} class="block text-sm font-medium text-foreground mb-2">{label}</label>
  {/if}
  <div class="relative group {glassbg ? 'glass-bg rounded-xl' : ''}">
    {#if glassbg}
      <GlassBackdrop />
    {/if}
    {#if glowClass}
      <div class={glowClass}></div>
    {/if}
    <textarea id={textareaId} class={textareaClasses} {rows} {disabled} aria-describedby={error || helperText ? `${textareaId}-hint` : undefined} aria-invalid={error ? true : undefined} {...rest}></textarea>
  </div>
  {#if error}
    <p id="{textareaId}-hint" class="mt-1.5 text-xs text-status-error-foreground">{error}</p>
  {:else if helperText}
    <p id="{textareaId}-hint" class="mt-1.5 text-xs text-muted-foreground">{helperText}</p>
  {/if}
</div>
```