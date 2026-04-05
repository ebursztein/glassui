<script lang="ts">
  import { getContext, onMount } from 'svelte';
  import { cn } from '$lib/utils/cn';
  import { useUI } from '$lib/interactions/useUI.svelte';
  import type { Snippet } from 'svelte';
  import type { ThemeColor, RenderStyle } from '$lib/types/enums';

  interface Props {
    href: string;
    class?: string;
    children: Snippet;
    [key: string]: unknown;
  }

  let {
    href,
    class: className,
    children,
    ...rest
  }: Props = $props();

  const ctx = getContext<{ activeId: string; color: ThemeColor; style: RenderStyle; register: (id: string) => void }>('glassui-scrollspy');

  const cleanHref = $derived(href.startsWith('#') ? href.substring(1) : href);
  const isActive = $derived(ctx?.activeId === cleanHref);

  onMount(() => {
    if (ctx && cleanHref) {
      ctx.register(cleanHref);
    }
  });

  const ui = useUI({
    props: () => ({
      color: isActive ? ctx?.color : 'neutral',
      style: isActive ? ctx?.style : 'ghost'
    }),
    role: 'action'
  });

  const classes = $derived(cn(
    'block w-full text-start py-2 px-3 text-sm font-medium rounded-lg transition-all duration-200 outline-none',
    'focus-visible:ring-2 focus-visible:ring-[var(--comp-bg)] focus-visible:ring-offset-2',
    ui.className,
    className
  ));

  const handleClick = (e: MouseEvent) => {
    // Smooth scroll to target if it's an internal link
    if (href.startsWith('#')) {
      e.preventDefault();
      const target = document.getElementById(cleanHref);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };
</script>

<a
  {href}
  class={classes}
  style={ui.styles}
  aria-current={isActive ? 'page' : undefined}
  onclick={handleClick}
  {...rest}
>
  {@render children()}
</a>