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
