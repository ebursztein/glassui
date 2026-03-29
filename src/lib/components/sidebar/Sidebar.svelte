<script lang="ts">
  import { cn } from '$lib/utils/cn';
  import type { Snippet } from 'svelte';

  interface Props {
    glass?: boolean;
    class?: string;
    children: Snippet;
    [key: string]: unknown;
  }

  let {
    glass: isGlass = false,
    class: className,
    children,
    ...rest
  }: Props = $props();
</script>

<aside
  class={cn(
    'hidden md:flex w-64 flex-col fixed inset-y-0 start-0 z-40',
    'border-r border-white/10',
    isGlass
      ? 'bg-white/5 backdrop-blur-xl'
      : 'bg-neutral-950/80',
    className,
  )}
  role="navigation"
  aria-label="Sidebar"
  {...rest}
>
  <nav class="flex flex-col h-full overflow-y-auto p-4 gap-1">
    {@render children()}
  </nav>
</aside>
