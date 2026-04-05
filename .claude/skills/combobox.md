# ComboBox

An autocomplete dropdown that allows users to type to filter options.

## Import

```ts
import { ComboBox } from 'glassui';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| value | `string` | — | The bound selected value. |
| options | `{ label: string, value: string }[]` | — | Array of options to select from. |
| size | `xs | sm | md | lg | xl` | `md` | Input size |
| color | `primary | secondary | accent | destructive | neutral | gradient | info | success | warning | error` | — | Color/status border theme |
| label | `string` | — | Label text above input |
| error | `string` | — | Error message |
| helperText | `string` | — | Helper text |
| placeholder | `string` | — | Placeholder input text |
| glass | `ultra-thin | thin | normal | thick | ultra-thick` | `false` | Glass surface density |
| disabled | `boolean` | `false` | Disabled state |

## Examples

### Basic

```svelte
<ComboBox options={[{label: "Apple", value: "apple"}]} />
```

## Full Source

```svelte
<script lang="ts">
  import { cn } from '$lib/utils/cn';
  import { useUI } from '$lib/interactions/useUI.svelte';
  import { GlassBackdrop } from '$lib/components/glass';
  import { Icon } from '$lib/components/icon';
  import { fade, fly } from 'svelte/transition';
  import type { HTMLInputAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';
  import type { GlassDensity, FrostedLevel } from '$lib/interactions/glass';
  import type { GlowIntensity } from '$lib/interactions/glow';
  import type { Size, ThemeColor } from '$lib/types/enums';
  import type { ComboBoxOption } from './types';

  let comboboxCounter = 0;

  interface Props extends Omit<HTMLInputAttributes, 'size' | 'value'> {
    value?: string;
    options?: ComboBoxOption[];
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
    options = [],
    size = 'md',
    color,
    label,
    error,
    helperText,
    placeholder = 'Search...',
    glass,
    frosted,
    raised = false,
    colored = false,
    glow = false,
    disabled = false,
    class: className,
    ...rest
  }: Props = $props();

  let isOpen = $state(false);
  let searchQuery = $state('');

  // Sync search query with current value label when selection changes
  $effect(() => {
    if (value) {
      const selectedOpt = options.find(o => o.value === value);
      if (selectedOpt && !isOpen) {
        searchQuery = selectedOpt.label;
      }
    } else if (!isOpen) {
      searchQuery = '';
    }
  });

  const effectiveColor = $derived(error ? 'error' as const : color);
  const comboId = id || `glass-combobox-${comboboxCounter++}`;

  const ui = useUI({
    props: () => ({ size, color: effectiveColor, glass, frosted, raised, colored, glow, disabled }),
    role: 'field',
  });

  // Also create a UI state for the dropdown menu so it matches the input
  const menuUi = useUI({
    props: () => ({ color: effectiveColor, glass: glass !== false ? (glass === true ? 'normal' : glass) : false, frosted: true, raised: true }),
    role: 'container',
  });

  const sizeClasses: Record<Size, string> = {
    xs: 'h-7 pl-2 pr-8 text-xs rounded-lg',
    sm: 'h-8 pl-3 pr-9 text-xs rounded-lg',
    md: 'h-10 pl-4 pr-10 text-sm rounded-xl',
    lg: 'h-12 pl-5 pr-11 text-base rounded-xl',
    xl: 'h-14 pl-6 pr-12 text-lg rounded-2xl',
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

  const filteredOptions = $derived(
    options.filter(opt => opt.label.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleInput = (e: Event) => {
    isOpen = true;
    searchQuery = (e.target as HTMLInputElement).value;
    if (searchQuery === '') {
      value = '';
    }
  };

  const selectOption = (opt: ComboBoxOption) => {
    value = opt.value;
    searchQuery = opt.label;
    isOpen = false;
  };

  const closeMenu = () => {
    isOpen = false;
    // Restore label if we didn't select anything new
    const selectedOpt = options.find(o => o.value === value);
    if (selectedOpt) {
      searchQuery = selectedOpt.label;
    } else {
      searchQuery = '';
    }
  };

  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeMenu();
    }
  };
</script>

<svelte:window onclick={() => { if (isOpen) closeMenu(); }} />

<div class="w-full relative" style={ui.styles}>
  {#if label}
    <label for={comboId} class="block text-sm font-medium mb-2 text-[var(--comp-text)]">
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
    
    <input
      id={comboId}
      type="text"
      class={inputClasses}
      bind:value={searchQuery}
      {placeholder}
      disabled={ui.disabled}
      oninput={handleInput}
      onfocus={() => { if (!disabled) isOpen = true; }}
      onkeydown={handleKeydown}
      autocomplete="off"
      aria-expanded={isOpen}
      aria-controls="{comboId}-menu"
      aria-describedby={error || helperText ? `${comboId}-hint` : undefined}
      aria-invalid={error ? true : undefined}
      {...rest}
    />

    <div class="absolute inset-y-0 end-0 flex items-center pr-3 pointer-events-none text-[var(--comp-text)]/70">
      <Icon name="caret-down" size={16} weight="bold" class={cn("transition-transform duration-200", isOpen && "rotate-180")} />
    </div>

    <!-- Dropdown Menu -->
    {#if isOpen}
      <div
        id="{comboId}-menu"
        class={cn("absolute z-50 top-full left-0 w-full mt-2 p-1 rounded-xl flex flex-col gap-0.5 max-h-60 overflow-y-auto shadow-lg", menuUi.className)}
        style={menuUi.styles}
        transition:fly={{ y: -5, duration: 150 }}
        role="listbox"
      >
        {#if menuUi.showBackdrop}
          <GlassBackdrop />
        {/if}
        <div class="relative z-10 flex flex-col w-full">
          {#each filteredOptions as opt}
            <button
              type="button"
              class={cn(
                'w-full flex items-center justify-between py-2 px-3 rounded-lg text-sm transition-colors text-start',
                value === opt.value 
                  ? 'bg-[var(--comp-bg)] text-[var(--comp-text)]' 
                  : 'text-[var(--comp-text)] hover:bg-[var(--comp-hover)] focus:bg-[var(--comp-hover)]'
              )}
              role="option"
              aria-selected={value === opt.value}
              onclick={() => selectOption(opt)}
            >
              <span class="truncate">{opt.label}</span>
              {#if value === opt.value}
                <Icon name="check" size={14} weight="bold" class="shrink-0" />
              {/if}
            </button>
          {:else}
            <div class="py-3 px-4 text-sm text-center text-[var(--comp-text)]/60">
              No results found
            </div>
          {/each}
        </div>
      </div>
    {/if}
  </div>

  {#if error}
    <p id="{comboId}-hint" class="mt-1.5 text-xs text-error-foreground">
      {#if typeof error === 'string'}
        {error}
      {:else}
        {@render error()}
      {/if}
    </p>
  {:else if helperText}
    <p id="{comboId}-hint" class="mt-1.5 text-xs text-[var(--comp-text)]/60">
      {#if typeof helperText === 'string'}
        {helperText}
      {:else}
        {@render helperText()}
      {/if}
    </p>
  {/if}
</div>
```