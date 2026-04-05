# Accordion

A vertically stacked set of interactive headings that each reveal an associated section of content.

## Import

```ts
import { Accordion, AccordionItem } from 'glassui';
```

## Examples

### Single

```svelte
<Accordion><AccordionItem title="Item 1">Content 1</AccordionItem></Accordion>
```

### Multiple

```svelte
<Accordion type="multiple"><AccordionItem title="Item 1">Content 1</AccordionItem></Accordion>
```

## Full Source

```svelte
<script lang="ts">
  import { setContext } from 'svelte';
  import { cn } from '$lib/utils/cn';
  import { useUI } from '$lib/interactions/useUI.svelte';
  import { GlassBackdrop } from '$lib/components/glass';
  import type { Snippet } from 'svelte';
  import type { GlassDensity, FrostedLevel } from '$lib/interactions/glass';
  import type { GlowIntensity } from '$lib/interactions/glow';
  import type { ThemeColor, RenderStyle } from '$lib/types/enums';

  interface Props {
    type?: 'single' | 'multiple';
    value?: string | string[];
    color?: ThemeColor;
    style?: RenderStyle;
    glass?: GlassDensity | boolean;
    frosted?: FrostedLevel | boolean;
    raised?: boolean;
    colored?: boolean;
    glow?: GlowIntensity | boolean;
    class?: string;
    children: Snippet;
    [key: string]: unknown;
  }

  let {
    type = 'single',
    value = $bindable([]),
    color,
    style = 'solid',
    glass,
    frosted,
    raised = false,
    colored = false,
    glow = false,
    class: className,
    children,
    ...rest
  }: Props = $props();

  const ui = useUI({
    props: () => ({ color, style, glass, frosted, raised, colored, glow }),
    role: 'container',
  });

  // State machine for Accordion context
  let activeValues = $state<string[]>(Array.isArray(value) ? value : (value ? [value] : []));

  const toggle = (id: string) => {
    if (type === 'single') {
      activeValues = activeValues.includes(id) ? [] : [id];
    } else {
      if (activeValues.includes(id)) {
        activeValues = activeValues.filter(v => v !== id);
      } else {
        activeValues = [...activeValues, id];
      }
    }
    value = type === 'single' ? (activeValues.length > 0 ? activeValues[0] : '') : activeValues;
  };

  setContext('glassui-accordion', {
    get values() { return activeValues; },
    toggle
  });

  const classes = $derived(cn(
    'hs-accordion-group w-full flex flex-col',
    ui.className,
    colored && 'overflow-hidden',
    'rounded-2xl',
    className
  ));
</script>

<div class={classes} style={ui.styles} {...rest}>
  {#if ui.showBackdrop}
    <GlassBackdrop />
  {/if}
  {#if ui.glowClass}
    <div class={ui.glowClass}></div>
  {/if}
  <div class="relative z-10 flex flex-col w-full divide-y divide-[var(--comp-border)]">
    {@render children()}
  </div>
</div>
<script lang="ts">
  import { getContext } from 'svelte';
  import { slide } from 'svelte/transition';
  import { cn } from '$lib/utils/cn';
  import { Icon } from '$lib/components/icon';
  import type { Snippet } from 'svelte';

  let itemCounter = 0;

  interface Props {
    value?: string;
    title: string | Snippet;
    disabled?: boolean;
    class?: string;
    children: Snippet;
    [key: string]: unknown;
  }

  let {
    value,
    title,
    disabled = false,
    class: className,
    children,
    ...rest
  }: Props = $props();

  const ctx = getContext<{ values: string[]; toggle: (id: string) => void }>('glassui-accordion');
  const id = value || `accordion-item-${itemCounter++}`;
  
  const isOpen = $derived(ctx ? ctx.values.includes(id) : false);

  const handleToggle = () => {
    if (!disabled && ctx) {
      ctx.toggle(id);
    }
  };
</script>

<div class={cn('hs-accordion w-full', isOpen && 'active', className)} {...rest}>
  <button
    type="button"
    class={cn(
      'hs-accordion-toggle w-full inline-flex items-center justify-between gap-x-3 py-4 px-5 text-start font-medium transition-all duration-200',
      'hover:bg-[var(--comp-hover)]',
      'focus:outline-none focus:bg-[var(--comp-hover)]',
      'disabled:opacity-50 disabled:pointer-events-none',
      isOpen ? 'text-[var(--comp-text)]' : 'text-[var(--comp-text)]/80',
    )}
    aria-expanded={isOpen}
    aria-controls={`${id}-collapse`}
    {disabled}
    onclick={handleToggle}
  >
    <span class="flex-1">
      {#if typeof title === 'string'}
        {title}
      {:else}
        {@render title()}
      {/if}
    </span>
    
    <span class="shrink-0 transition-transform duration-300 {isOpen ? 'rotate-180' : ''}">
      <Icon name="caret-down" size={16} weight="bold" />
    </span>
  </button>
  
  {#if isOpen}
    <div
      id={`${id}-collapse`}
      class="hs-accordion-content w-full overflow-hidden"
      transition:slide={{ duration: 300 }}
    >
      <div class="pb-4 px-5 text-sm text-[var(--comp-text)]/80">
        {@render children()}
      </div>
    </div>
  {/if}
</div>
```