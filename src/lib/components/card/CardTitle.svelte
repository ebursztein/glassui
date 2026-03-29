<script lang="ts">
  import { cn } from '$lib/utils/cn';
  import type { Snippet } from 'svelte';

  interface Props {
    children: Snippet;
    class?: string;
    [key: string]: unknown;
  }

  let { children, class: className, ...rest }: Props = $props();
</script>

<h3 class={cn('text-xl font-semibold text-white leading-none tracking-tight', className)} {...rest}>
  {@render children()}
</h3>
