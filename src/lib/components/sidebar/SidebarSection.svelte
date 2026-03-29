<script lang="ts">
  import { cn } from '$lib/utils/cn';
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
</script>

<div class={cn('mt-4 first:mt-0 flex flex-col gap-1', className)} {...rest}>
  {#if label}
    <span class="px-2 mb-1 text-xs font-semibold uppercase tracking-wider text-white/40">
      {label}
    </span>
  {/if}
  {@render children()}
</div>
