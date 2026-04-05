<script lang="ts">
  import { getContext } from 'svelte';
  import { cn } from '$lib/utils/cn';
  import { useUI } from '$lib/interactions/useUI.svelte';
  import type { Snippet } from 'svelte';
  import type { ThemeColor } from '$lib/types/enums';

  interface Props {
    value: string;
    disabled?: boolean;
    color?: ThemeColor;
    class?: string;
    children: Snippet;
    [key: string]: unknown;
  }

  let {
    value,
    disabled = false,
    color,
    class: className,
    children,
    ...rest
  }: Props = $props();

  const ctx = getContext<{ value: string; set value(v: string); variant: string; orientation: string; isGlass: boolean }>('glassui-tabs');

  const isActive = $derived(ctx?.value === value);
  const variant = $derived(ctx?.variant || 'underline');
  const isVertical = $derived(ctx?.orientation === 'vertical');

  // We only activate the glass action UI if it's NOT an underline tab (which is just text).
  const role = $derived(variant === 'underline' ? 'inline' : 'action');

  // The active state inherits the active color. Inactive state is neutral.
  // Segmented tabs are "ghost" when inactive, "solid" when active.
  const ui = useUI({
    props: () => ({
      color: isActive ? color : 'neutral',
      style: (variant === 'segmented' || variant === 'pills') && !isActive ? 'ghost' : 'solid',
      disabled
    }),
    role
  });

  const handleClick = () => {
    if (!disabled && ctx) {
      ctx.value = value;
    }
  };

  const classes = $derived(cn(
    'relative inline-flex items-center justify-center whitespace-nowrap font-medium transition-all duration-200 outline-none',
    'disabled:pointer-events-none disabled:opacity-50',
    'focus-visible:ring-2 focus-visible:ring-[var(--comp-bg)] focus-visible:ring-offset-2',

    // Underline variant
    variant === 'underline' && 'py-3 text-sm border-b-2',
    variant === 'underline' && !isVertical && '-mb-[2px]',
    variant === 'underline' && isVertical && 'w-full text-start justify-start border-b-0 border-r-2 -mr-[2px]',
    variant === 'underline' && isActive && 'border-[var(--comp-text)] text-[var(--comp-text)]',
    variant === 'underline' && !isActive && 'border-transparent text-muted-foreground hover:text-foreground hover:border-line-3',

    // Pills variant
    variant === 'pills' && 'px-4 py-2 text-sm rounded-lg',
    variant === 'pills' && isVertical && 'w-full justify-start',
    variant === 'pills' && isActive && (ctx?.isGlass ? ui.className : 'bg-[var(--comp-bg)] text-[var(--comp-text)] shadow-sm'),
    variant === 'pills' && !isActive && 'text-muted-foreground hover:text-foreground hover:bg-layer-hover',

    // Segmented variant
    variant === 'segmented' && 'px-4 py-1.5 text-sm rounded-lg flex-1',
    variant === 'segmented' && isVertical && 'w-full justify-start',
    variant === 'segmented' && isActive && (ctx?.isGlass ? ui.className : 'bg-surface border border-line-2 text-foreground shadow-sm'),
    variant === 'segmented' && !isActive && 'text-muted-foreground hover:text-foreground',

    className
  ));
</script>

<button
  type="button"
  class={classes}
  style={isActive && (variant === 'pills' || variant === 'segmented') && ctx?.isGlass ? ui.styles : ''}
  role="tab"
  aria-selected={isActive}
  aria-controls={`tabpanel-${value}`}
  id={`tab-${value}`}
  tabindex={isActive ? 0 : -1}
  {disabled}
  onclick={handleClick}
  {...rest}
>
  {#if ui.glowClass && isActive && variant !== 'underline'}
    <div class={ui.glowClass}></div>
  {/if}
  <span class="relative z-10 flex items-center justify-center gap-2">
    {@render children()}
  </span>
</button>