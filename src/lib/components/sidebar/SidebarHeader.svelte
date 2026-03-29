<script lang="ts">
  import { cn } from '$lib/utils/cn';
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
</script>

<div class={cn('mb-6 px-2', className)} {...rest}>
  <a href={href} class="text-xl font-bold text-white flex items-center gap-2">
    {@render children()}
  </a>
</div>
