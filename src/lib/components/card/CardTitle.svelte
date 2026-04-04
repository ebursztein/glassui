<script lang="ts">
  import { cn } from '$lib/utils/cn';
  import { getParentUI } from '$lib/interactions/useUI.svelte';
  import type { Snippet } from 'svelte';

  interface Props {
    children: Snippet;
    class?: string;
    [key: string]: unknown;
  }

  let { children, class: className, ...rest }: Props = $props();

  const parentCtx = getParentUI();
  const insideGlass = $derived(parentCtx().active);
</script>

<h3 class={cn('text-xl font-semibold leading-none tracking-tight', !insideGlass && 'text-foreground', className)} {...rest}>
  {@render children()}
</h3>
