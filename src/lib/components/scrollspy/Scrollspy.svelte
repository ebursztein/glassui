<script lang="ts">
  import { setContext, onMount } from 'svelte';
  import { cn } from '$lib/utils/cn';
  import { useUI } from '$lib/interactions/useUI.svelte';
  import type { Snippet } from 'svelte';
  import type { ThemeColor, RenderStyle } from '$lib/types/enums';

  interface Props {
    activeId?: string;
    offset?: number;
    color?: ThemeColor;
    style?: RenderStyle;
    class?: string;
    children: Snippet;
    [key: string]: unknown;
  }

  let {
    activeId = $bindable(''),
    offset = 0,
    color = 'primary',
    style = 'ghost',
    class: className,
    children,
    ...rest
  }: Props = $props();

  const ui = useUI({
    props: () => ({ color, style }),
    role: 'container',
  });

  // Track all registered link hrefs (which act as targets)
  let sectionIds = $state<string[]>([]);
  let observer: IntersectionObserver | null = null;

  setContext('glassui-scrollspy', {
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

  onMount(() => {
    observer = new IntersectionObserver((entries) => {
      let newlyActive = '';
      let highestRatio = 0;
      
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.intersectionRatio > highestRatio) {
            highestRatio = entry.intersectionRatio;
            newlyActive = entry.target.id;
          }
        }
      });
      
      if (newlyActive) {
        activeId = newlyActive;
      }
    }, {
      rootMargin: `-${offset}px 0px -40% 0px`,
      threshold: [0, 0.25, 0.5, 0.75, 1]
    });

    sectionIds.forEach(observeTarget);

    return () => {
      if (observer) observer.disconnect();
    };
  });
</script>

<div class={cn('relative', className)} {...rest}>
  {@render children()}
</div>