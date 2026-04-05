<script lang="ts">
  import { getContext } from 'svelte';
  import { cn } from '$lib/utils/cn';
  import type { Snippet } from 'svelte';

  interface Props {
    class?: string;
    children: Snippet;
    [key: string]: unknown;
  }

  let { class: className, children, ...rest }: Props = $props();

  const ctx = getContext<{ tooltipId: string }>('glassui-tooltip');
</script>

<div class={cn('hs-tooltip-toggle inline-flex', className)} aria-describedby={ctx?.tooltipId} {...rest}>
  {@render children()}
</div>