<script lang="ts">
  import { getContext } from 'svelte';
  import { cn } from '$lib/utils/cn';
  import type { Snippet } from 'svelte';

  interface Props {
    value: string;
    class?: string;
    children: Snippet;
    [key: string]: unknown;
  }

  let {
    value,
    class: className,
    children,
    ...rest
  }: Props = $props();

  const ctx = getContext<{ value: string; variant: string; orientation: string; isGlass: boolean }>('glassui-tabs');

  const isActive = $derived(ctx?.value === value);
</script>

{#if isActive}
  <div
    role="tabpanel"
    id={`tabpanel-${value}`}
    aria-labelledby={`tab-${value}`}
    class={cn('w-full mt-3', className)}
    {...rest}
  >
    {@render children()}
  </div>
{/if}