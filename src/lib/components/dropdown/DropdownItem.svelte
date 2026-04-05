<script lang="ts">
  import { getContext } from 'svelte';
  import { cn } from '$lib/utils/cn';
  import type { Snippet } from 'svelte';

  interface Props {
    disabled?: boolean;
    class?: string;
    children: Snippet;
    [key: string]: unknown;
  }

  let {
    disabled = false,
    class: className,
    children,
    ...rest
  }: Props = $props();

  const ctx = getContext<{ close: () => void }>('glassui-dropdown');

  const handleClick = () => {
    if (!disabled) {
      ctx?.close();
    }
  };
</script>

<button
  type="button"
  class={cn(
    'w-full flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-[var(--comp-text)] hover:bg-[var(--comp-hover)] focus:outline-none focus:bg-[var(--comp-hover)] transition-colors',
    disabled && 'opacity-50 pointer-events-none',
    className
  )}
  role="menuitem"
  tabindex={-1}
  aria-disabled={disabled || undefined}
  {disabled}
  onclick={handleClick}
  {...rest}
>
  {@render children()}
</button>