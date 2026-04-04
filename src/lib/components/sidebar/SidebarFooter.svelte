<script lang="ts">
  import { cn } from '$lib/utils/cn';
  import type { Snippet } from 'svelte';

  interface Props {
    class?: string;
    children: Snippet;
    [key: string]: unknown;
  }

  let {
    class: className,
    children,
    ...rest
  }: Props = $props();
</script>

<div class={cn('mt-auto p-3 flex flex-col gap-y-3', className)} {...rest}>
  {@render children()}
</div>
