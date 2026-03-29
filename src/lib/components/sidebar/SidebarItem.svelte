<script lang="ts">
  import { cn } from '$lib/utils/cn';
  import { Icon } from '$lib/components/icon';
  import type { Snippet } from 'svelte';

  interface Props {
    href: string;
    active?: boolean;
    icon?: string;
    class?: string;
    children: Snippet;
    [key: string]: unknown;
  }

  let {
    href,
    active = false,
    icon,
    class: className,
    children,
    ...rest
  }: Props = $props();
</script>

<a
  {href}
  class={cn(
    'relative flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors',
    active
      ? 'text-white bg-white/10 font-medium before:absolute before:inset-y-1 before:-start-1 before:w-1 before:rounded-full before:bg-[var(--glass-accent-2)]'
      : 'text-white/60 hover:text-white hover:bg-white/10',
    className,
  )}
  aria-current={active ? 'page' : undefined}
  {...rest}
>
  {#if icon}
    <Icon name={icon} size={16} class="shrink-0" />
  {/if}
  {@render children()}
</a>
