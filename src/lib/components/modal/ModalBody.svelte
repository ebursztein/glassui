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

<div class={cn('p-4 overflow-y-auto text-[var(--comp-text)]', className)} {...rest}>
  {@render children()}
</div>