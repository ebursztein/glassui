# Datepicker

A customizable date picker component.

## Import

```ts
import { Datepicker } from 'glassui';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| value | `string` | — | The bound date value (YYYY-MM-DD). |
| minDate | `string` | — | Minimum selectable date (YYYY-MM-DD). |
| maxDate | `string` | — | Maximum selectable date (YYYY-MM-DD). |
| size | `xs | sm | md | lg | xl` | `md` | Input size |
| color | `primary | secondary | accent | destructive | neutral | gradient | info | success | warning | error` | — | Theme color/status |
| label | `string` | — | Label text above input |
| error | `string` | — | Error message (sets color to error) |
| helperText | `string` | — | Helper text below input |
| placeholder | `string` | — | Placeholder input text |
| glass | `ultra-thin | thin | normal | thick | ultra-thick` | `false` | Glass surface density |
| frosted | `light | medium | heavy` | `false` | Backdrop blur intensity |
| disabled | `boolean` | `false` | Disabled state |

## Examples

### Basic

```svelte
<Datepicker placeholder="Select date" />
```

## Full Source

```svelte
<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { Calendar } from 'vanilla-calendar-pro';
  import 'vanilla-calendar-pro/styles/index.css';
  import { cn } from '$lib/utils/cn';
  import { useUI } from '$lib/interactions/useUI.svelte';
  import { GlassBackdrop } from '$lib/components/glass';
  import { Icon } from '$lib/components/icon';
  import type { HTMLInputAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';
  import type { GlassDensity, FrostedLevel } from '$lib/interactions/glass';
  import type { GlowIntensity } from '$lib/interactions/glow';
  import type { Size, ThemeColor } from '$lib/types/enums';

  let datepickerCounter = 0;

  interface Props extends Omit<HTMLInputAttributes, 'size' | 'value'> {
    value?: string;
    minDate?: string;
    maxDate?: string;
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
    value = $bindable(''),
    minDate,
    maxDate,
    size = 'md',
    color,
    label,
    error,
    helperText,
    placeholder = 'Select date',
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
  const inputId = id || `glass-datepicker-${datepickerCounter++}`;

  const ui = useUI({
    props: () => ({ size, color: effectiveColor, glass, frosted, raised, colored, glow, disabled }),
    role: 'field',
  });

  const sizeClasses: Record<Size, string> = {
    xs: 'h-7 pl-8 pr-2 text-xs rounded-lg',
    sm: 'h-8 pl-9 pr-3 text-xs rounded-lg',
    md: 'h-10 pl-10 pr-4 text-sm rounded-xl',
    lg: 'h-12 pl-11 pr-5 text-base rounded-xl',
    xl: 'h-14 pl-12 pr-6 text-lg rounded-2xl',
  };

  const inputClasses = $derived(cn(
    'relative w-full transition-all duration-300',
    'focus:outline-none',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'placeholder:text-[var(--glass-text-faint)] text-foreground bg-transparent',
    ui.className,
    sizeClasses[ui.size],
    className,
  ));

  let containerEl: HTMLElement;
  let calendarInstance: Calendar | null = null;
  let isMenuOpen = $state(false);

  onMount(() => {
    calendarInstance = new Calendar(containerEl, {
      type: 'default',
      date: {
        min: minDate,
        max: maxDate,
      },
      settings: {
        visibility: {
          positionToInput: 'bottom',
        }
      },
      actions: {
        clickDay(e, self) {
          if (self.selectedDates.length > 0) {
            value = self.selectedDates[0];
            isMenuOpen = false;
          }
        },
      },
    });
    calendarInstance.init();
  });

  onDestroy(() => {
    if (calendarInstance) {
      calendarInstance.destroy();
    }
  });

  $effect(() => {
    if (calendarInstance && value) {
      calendarInstance.settings.selected.dates = [value];
      calendarInstance.update();
    }
  });

  const toggleMenu = () => {
    if (!disabled) isMenuOpen = !isMenuOpen;
  };

  const closeMenu = () => {
    isMenuOpen = false;
  };
</script>

<svelte:window onclick={() => { if (isMenuOpen) closeMenu(); }} />

<div class="w-full relative" style={ui.styles}>
  {#if label}
    <label for={inputId} class="block text-sm font-medium mb-2 text-[var(--comp-text)]">
      {#if typeof label === 'string'}
        {label}
      {:else}
        {@render label()}
      {/if}
    </label>
  {/if}
  
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="relative group {colored ? 'overflow-hidden rounded-xl' : ''}" onclick={(e) => e.stopPropagation()}>
    {#if ui.showBackdrop}
      <GlassBackdrop />
    {/if}
    {#if ui.glowClass}
      <div class={ui.glowClass}></div>
    {/if}
    
    <div class="absolute inset-y-0 start-0 flex items-center pl-3 pointer-events-none text-[var(--comp-text)]/70">
      <Icon name="calendar-blank" size={16} weight="bold" />
    </div>

    <input
      id={inputId}
      type="text"
      class={inputClasses}
      bind:value
      {placeholder}
      disabled={ui.disabled}
      onclick={toggleMenu}
      readonly
      aria-expanded={isMenuOpen}
      aria-describedby={error || helperText ? `${inputId}-hint` : undefined}
      aria-invalid={error ? true : undefined}
      {...rest}
    />

    {#if isMenuOpen}
      <div 
        bind:this={containerEl} 
        class="absolute z-50 top-full left-0 mt-2 bg-surface border border-[var(--comp-border)] rounded-xl shadow-lg p-2"
        onclick={(e) => e.stopPropagation()}
      ></div>
    {/if}
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