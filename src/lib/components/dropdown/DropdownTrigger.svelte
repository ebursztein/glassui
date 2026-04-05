<script lang="ts">
  import { getContext, onMount } from 'svelte';
  import { cn } from '$lib/utils/cn';
  import type { Snippet } from 'svelte';

  interface Props {
    class?: string;
    children: Snippet;
    [key: string]: unknown;
  }

  let { class: className, children, ...rest }: Props = $props();

  const ctx = getContext<{
    open: boolean;
    toggle: () => void;
    setTriggerEl: (el: HTMLElement) => void;
    focusFirstItem: () => void;
    focusLastItem: () => void;
  }>('glassui-dropdown');

  let triggerRef: HTMLDivElement;

  onMount(() => {
    if (triggerRef) ctx?.setTriggerEl(triggerRef);
  });

  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (!ctx?.open) ctx?.toggle();
      ctx?.focusFirstItem();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!ctx?.open) ctx?.toggle();
      ctx?.focusLastItem();
    }
  };
</script>

<div
  bind:this={triggerRef}
  class={cn('hs-dropdown-toggle', className)}
  onclick={ctx?.toggle}
  onkeydown={handleKeydown}
  aria-haspopup="menu"
  aria-expanded={ctx?.open}
  tabindex="0"
  role="button"
  {...rest}
>
  {@render children()}
</div>