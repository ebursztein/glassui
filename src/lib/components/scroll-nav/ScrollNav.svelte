<script lang="ts">
  import { setContext, onMount } from 'svelte';
  import { cn } from '$lib/utils/cn';
  import { useUI } from '$lib/interactions/useUI.svelte';
  import { GlassBackdrop } from '$lib/components/glass';
  import type { Snippet } from 'svelte';
  import type { ThemeColor, RenderStyle } from '$lib/types/enums';
  import type { GlassDensity, FrostedLevel } from '$lib/interactions/glass';

  interface Props {
    activeId?: string;
    offset?: number;
    threshold?: number;
    color?: ThemeColor;
    style?: RenderStyle;
    glass?: GlassDensity | boolean;
    frosted?: FrostedLevel | boolean;
    raised?: boolean;
    class?: string;
    children: Snippet;
    [key: string]: unknown;
  }

  let {
    activeId = $bindable(''),
    offset = 0,
    threshold = 0.5,
    color = 'primary',
    style = 'ghost',
    glass,
    frosted,
    raised = true,
    class: className,
    children,
    ...rest
  }: Props = $props();

  const ui = useUI({
    props: () => ({ color, style, glass, frosted, raised }),
    role: 'container',
  });

  let sectionIds = $state<string[]>([]);
  let observer: IntersectionObserver | null = null;
  let isScrolled = $state(false);

  setContext('glassui-scrollnav', {
    get activeId() { return activeId; },
    get color() { return color; },
    get style() { return style; },
    register: (id: string) => {
      const cleanId = id.startsWith('#') ? id.substring(1) : id;
      if (cleanId && !sectionIds.includes(cleanId)) {
        sectionIds = [...sectionIds, cleanId];
        observeTarget(cleanId);
      }
    }
  });

  function observeTarget(id: string) {
    if (!observer) return;
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  }

  const handleScroll = () => {
    isScrolled = window.scrollY > 20;
  };

  onMount(() => {
    // Observer for active links
    observer = new IntersectionObserver((entries) => {
      let highestRatio = 0;
      let newlyActive = '';
      
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > highestRatio) {
          highestRatio = entry.intersectionRatio;
          newlyActive = entry.target.id;
        }
      });
      
      if (newlyActive && highestRatio >= threshold) {
        activeId = newlyActive;
      }
    }, {
      rootMargin: `-${offset}px 0px 0px 0px`,
      threshold: [0, 0.25, 0.5, 0.75, 1.0]
    });

    sectionIds.forEach(observeTarget);

    // Initial check for sticky shadow logic
    handleScroll();

    return () => {
      if (observer) observer.disconnect();
    };
  });
</script>

<svelte:window onscroll={handleScroll} />

<nav
  class={cn(
    'sticky top-0 z-40 w-full flex items-center px-4 py-3 transition-all duration-300',
    isScrolled && raised ? 'shadow-md' : '',
    ui.className,
    className
  )}
  style={ui.styles}
  {...rest}
>
  {#if ui.showBackdrop}
    <GlassBackdrop />
  {/if}
  {#if ui.glowClass}
    <div class={ui.glowClass}></div>
  {/if}
  <div class="relative z-10 flex w-full items-center justify-between gap-4">
    {@render children()}
  </div>
</nav>