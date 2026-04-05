# Scrollspy

Navigation mechanism that automatically updates active links based on scroll position to indicate which section is currently in the viewport.

## Import

```ts
import { Scrollspy, ScrollspyNav, ScrollspyLink } from 'glassui';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| activeId | `string` | — | The bound active section ID. |
| offset | `number` | `0` | Scroll offset in pixels before a section is considered active. |
| color | `primary | secondary | accent | destructive | neutral | gradient | info | success | warning | error` | — | Theme color for active links |
| style | `solid | outline | ghost` | `ghost` | Render style of active links |

## Examples

### Basic

```svelte
<Scrollspy><ScrollspyNav><ScrollspyLink href="#section1">One</ScrollspyLink></ScrollspyNav></Scrollspy>
```

## Full Source

```svelte
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
<script lang="ts">
  import { cn } from '$lib/utils/cn';
  import type { Snippet } from 'svelte';

  interface Props {
    class?: string;
    children: Snippet;
    [key: string]: unknown;
  }

  let { class: className, children, ...rest }: Props = $props();
</script>

<nav class={cn('flex flex-col gap-2', className)} {...rest}>
  {@render children()}
</nav>
```