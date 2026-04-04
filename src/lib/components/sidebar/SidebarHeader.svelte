<script lang="ts">
  import { cn } from '$lib/utils/cn';
  import { getParentUI } from '$lib/interactions/useUI.svelte';
  import type { Snippet } from 'svelte';

  interface Props {
    href?: string;
    class?: string;
    children: Snippet;
    [key: string]: unknown;
  }

  let {
    href = '/',
    class: className,
    children,
    ...rest
  }: Props = $props();

  const parentCtx = getParentUI();
  const insideGlass = $derived(parentCtx().active);
</script>

<div class={cn('mb-3 px-2.5', className)} {...rest}>
  <a href={href} class={cn('text-base font-semibold flex items-center gap-2', !insideGlass && 'text-foreground')}>
    {@render children()}
  </a>
</div>
