<script lang="ts">
  import { cn } from '$lib/utils/cn';
  import type { Snippet } from 'svelte';

  interface Props {
    class?: string;
    children: Snippet;
    [key: string]: unknown;
  }

  let { class: className, children, ...rest }: Props = $props();
</script>

<div class={cn('flex justify-end items-center gap-x-2 py-3 px-4 border-t border-[var(--comp-border)]', className)} {...rest}>
  {@render children()}
</div>