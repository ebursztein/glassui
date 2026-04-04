<script lang="ts">
  import { cn } from '$lib/utils/cn';
  import { Icon } from '$lib/components/icon';
  import { getParentUI } from '$lib/interactions/useUI.svelte';
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

  const parentCtx = getParentUI();
  const insideGlass = $derived(parentCtx().active);
</script>

<li>
  <a
    {href}
    class={cn(
      'w-full flex items-center gap-x-2 py-2 px-2.5 text-sm rounded-lg transition-colors',
      'focus:outline-hidden focus:bg-sidebar-nav-focus',
      active
        ? cn(insideGlass ? 'font-medium' : 'bg-sidebar-nav-active text-foreground font-medium')
        : cn(insideGlass ? 'text-[var(--glass-text-muted)] hover:text-[var(--glass-text)]' : 'text-sidebar-nav-foreground hover:bg-sidebar-nav-hover'),
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
</li>
