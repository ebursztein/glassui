# ScrollNav

A sticky top navigation bar that automatically updates its active links based on scroll position, similar to Scrollspy but optimized for horizontal header layouts.

## Import

```ts
import { ScrollNav, ScrollNavLink } from 'glassui';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| activeId | `string` | — | The bound active section ID. |
| offset | `number` | `0` | Scroll offset in pixels before a section is considered active. |
| threshold | `number` | `0.5` | Intersection ratio required to trigger an active state (0.0 to 1.0). |
| color | `primary | secondary | accent | destructive | neutral | gradient | info | success | warning | error` | — | Theme color for active links |
| style | `solid | outline | ghost` | `ghost` | Render style of active links |
| glass | `ultra-thin | thin | normal | thick | ultra-thick` | `false` | Glass surface density |
| frosted | `light | medium | heavy` | `false` | Backdrop blur intensity |
| raised | `boolean` | `true` | Elevated with shadow |

## Examples

### Basic

```svelte
<ScrollNav><ScrollNavLink href="#home">Home</ScrollNavLink></ScrollNav>
```

## Full Source

```svelte
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

  const ctx = getContext<{ activeId: string; color: ThemeColor; style: RenderStyle; register: (id: string) => void }>('glassui-scrollnav');

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
    'inline-flex items-center justify-center py-2 px-4 text-sm font-medium rounded-lg transition-all duration-200 outline-none',
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
```