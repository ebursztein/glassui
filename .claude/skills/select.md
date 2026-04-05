# Select

Native HTML select dropdown styled to match the input fields, supporting custom colors, sizes, and glass states.

## Import

```ts
import { Select } from 'glassui';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| value | `string` | — | The bound selected value. |
| size | `xs | sm | md | lg | xl` | `md` | Input size |
| color | `primary | secondary | accent | destructive | neutral | gradient | info | success | warning | error` | — | Color/status border theme |
| label | `string` | — | Label text above select |
| error | `string` | — | Error message (sets color to error) |
| helperText | `string` | — | Helper text below select |
| placeholder | `string` | — | Placeholder option text |
| glass | `ultra-thin | thin | normal | thick | ultra-thick` | `false` | Glass surface density |
| frosted | `light | medium | heavy` | `false` | Backdrop blur intensity |
| raised | `boolean` | `false` | Elevated with shadow |
| glow | `sm | md | lg` | `false` | Glow intensity |
| disabled | `boolean` | `false` | Disabled state |

## Examples

### Basic

```svelte
<Select><option value="1">Option 1</option></Select>
```

## Full Source

```svelte
<script lang="ts">
  import { cn } from '$lib/utils/cn';
  import { useUI } from '$lib/interactions/useUI.svelte';
  import { GlassBackdrop } from '$lib/components/glass';
  import { Icon } from '$lib/components/icon';
  import type { HTMLSelectAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';
  import type { GlassDensity, FrostedLevel } from '$lib/interactions/glass';
  import type { GlowIntensity } from '$lib/interactions/glow';
  import type { Size, ThemeColor } from '$lib/types/enums';

  let selectCounter = 0;

  interface Props extends Omit<HTMLSelectAttributes, 'size'> {
    value?: any;
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
    children: Snippet;
  }

  let {
    id,
    value = $bindable(),
    size = 'md',
    color,
    label,
    error,
    helperText,
    placeholder,
    glass,
    frosted,
    raised = false,
    colored = false,
    glow = false,
    disabled = false,
    class: className,
    children,
    ...rest
  }: Props = $props();

  const effectiveColor = $derived(error ? 'error' as const : color);

  const selectId = id || `glass-select-${selectCounter++}`;

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

  const selectClasses = $derived(cn(
    'relative w-full transition-all duration-300 appearance-none',
    'focus:outline-none',
    'disabled:cursor-not-allowed disabled:opacity-50',
    value === undefined || value === '' ? 'text-muted-foreground' : 'text-foreground',
    ui.className,
    sizeClasses[ui.size],
    className,
  ));
</script>

<div class="w-full" style={ui.styles}>
  {#if label}
    <label for={selectId} class="block text-sm font-medium mb-2 text-[var(--comp-text)]">
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
    
    <select
      id={selectId}
      class={selectClasses}
      bind:value
      disabled={ui.disabled}
      aria-describedby={error || helperText ? `${selectId}-hint` : undefined}
      aria-invalid={error ? true : undefined}
      {...rest}
    >
      {#if placeholder}
        <option value="" disabled selected hidden>{placeholder}</option>
      {/if}
      {@render children()}
    </select>

    <!-- Custom dropdown arrow matching Preline style -->
    <div class="absolute inset-y-0 end-0 flex items-center pr-3.5 pointer-events-none text-[var(--comp-text)]/70">
      <Icon name="caret-down" size={16} weight="bold" />
    </div>
  </div>

  {#if error}
    <p id="{selectId}-hint" class="mt-1.5 text-xs text-error-foreground">
      {#if typeof error === 'string'}
        {error}
      {:else}
        {@render error()}
      {/if}
    </p>
  {:else if helperText}
    <p id="{selectId}-hint" class="mt-1.5 text-xs text-[var(--comp-text)]/60">
      {#if typeof helperText === 'string'}
        {helperText}
      {:else}
        {@render helperText()}
      {/if}
    </p>
  {/if}
</div>
```