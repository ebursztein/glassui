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

<div class={cn('mt-auto pt-4 border-t border-white/10 space-y-3', className)} {...rest}>
  {@render children()}
</div>
