<script lang="ts">
  import { cn } from '$lib/utils/cn';
  import { getParentUI } from '$lib/interactions/useUI.svelte';
  import type { Snippet } from 'svelte';

  interface Props {
    label?: string;
    class?: string;
    children: Snippet;
    [key: string]: unknown;
  }

  let {
    label,
    class: className,
    children,
    ...rest
  }: Props = $props();

  const parentCtx = getParentUI();
  const insideGlass = $derived(parentCtx().active);
</script>

<div class={cn('pt-3 mt-3 flex flex-col border-t border-sidebar-divider first:border-t-0 first:pt-0 first:mt-0', className)} {...rest}>
  {#if label}
    <span class={cn('block ps-2.5 mb-2 font-medium text-xs uppercase', insideGlass ? 'text-[var(--glass-text-faint)]' : 'text-muted-foreground-1')}>
      {label}
    </span>
  {/if}
  <ul class="flex flex-col gap-y-1">
    {@render children()}
  </ul>
</div>
