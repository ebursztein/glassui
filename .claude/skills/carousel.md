# Carousel

A native, touch-friendly, CSS scroll-snap carousel supporting autoplay, looping, keyboard navigation, and mouse dragging.

## Import

```ts
import { Carousel, CarouselSlide } from 'glassui';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| activeIndex | `number` | `0` | The bound index of the currently active slide. |
| showPagination | `boolean` | `true` | Whether to show the dot pagination. |
| showArrows | `boolean` | `true` | Whether to show previous/next arrows. |
| autoplay | `number` | — | Autoplay interval in milliseconds. Omit to disable. |
| loop | `boolean` | `false` | Whether the carousel should wrap around when reaching the end. |
| keyboard | `boolean` | `true` | Whether to support Left/Right arrow keys for navigation. |
| color | `primary | secondary | accent | destructive | neutral | gradient | info | success | warning | error` | — | Theme color for pagination/arrows. |
| glass | `ultra-thin | thin | normal | thick | ultra-thick` | `false` | Glass surface density |
| frosted | `light | medium | heavy` | `false` | Backdrop blur intensity |
| raised | `boolean` | `true` | Elevated with shadow |

## Examples

### Basic

```svelte
<Carousel><CarouselSlide>1</CarouselSlide><CarouselSlide>2</CarouselSlide></Carousel>
```

## Full Source

```svelte
<script lang="ts">
  import { setContext, onMount, onDestroy } from 'svelte';
  import { cn } from '$lib/utils/cn';
  import { useUI } from '$lib/interactions/useUI.svelte';
  import { GlassBackdrop } from '$lib/components/glass';
  import { Button } from '$lib/components/button';
  import { Icon } from '$lib/components/icon';
  import type { Snippet } from 'svelte';
  import type { GlassDensity, FrostedLevel } from '$lib/interactions/glass';
  import type { ThemeColor, RenderStyle } from '$lib/types/enums';

  interface Props {
    activeIndex?: number;
    showPagination?: boolean;
    showArrows?: boolean;
    autoplay?: number;
    loop?: boolean;
    keyboard?: boolean;
    color?: ThemeColor;
    style?: RenderStyle;
    glass?: GlassDensity | boolean;
    frosted?: FrostedLevel | boolean;
    raised?: boolean;
    colored?: boolean;
    class?: string;
    children: Snippet;
    [key: string]: unknown;
  }

  let {
    activeIndex = $bindable(0),
    showPagination = true,
    showArrows = true,
    autoplay,
    loop = false,
    keyboard = true,
    color = 'primary',
    style = 'solid',
    glass,
    frosted,
    raised = true,
    colored = false,
    class: className,
    children,
    ...rest
  }: Props = $props();

  const ui = useUI({
    props: () => ({ color, style, glass, frosted, raised, colored }),
    role: 'container',
  });

  let trackRef: HTMLDivElement;
  let observer: IntersectionObserver | null = null;
  let totalSlides = $state(0);

  // Autoplay State
  let autoplayInterval: ReturnType<typeof setInterval> | null = null;
  let isHovering = $state(false);

  // Drag State
  let isDragging = $state(false);
  let startX = 0;
  let scrollLeft = 0;

  // Expose context for CarouselSlide to register themselves
  setContext('glassui-carousel', {
    registerSlide: () => {
      totalSlides += 1;
      return totalSlides - 1; // 0-indexed
    }
  });

  const scrollToIndex = (index: number) => {
    if (!trackRef) return;
    const slides = trackRef.querySelectorAll('.hs-carousel-slide');
    if (slides[index]) {
      // Use smooth scrolling to snap to the specific slide
      slides[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    }
  };

  const next = () => {
    if (activeIndex < totalSlides - 1) {
      scrollToIndex(activeIndex + 1);
    } else if (loop) {
      scrollToIndex(0);
    }
  };

  const prev = () => {
    if (activeIndex > 0) {
      scrollToIndex(activeIndex - 1);
    } else if (loop) {
      scrollToIndex(totalSlides - 1);
    }
  };

  const startAutoplay = () => {
    if (autoplay && autoplay > 0 && !isHovering && !isDragging) {
      stopAutoplay();
      autoplayInterval = setInterval(next, autoplay);
    }
  };

  const stopAutoplay = () => {
    if (autoplayInterval) {
      clearInterval(autoplayInterval);
      autoplayInterval = null;
    }
  };

  // Sync external activeIndex changes
  $effect(() => {
    // A small delay prevents IntersectionObserver fighting with external state bindings
    setTimeout(() => {
        if (trackRef && activeIndex >= 0 && activeIndex < totalSlides) {
            scrollToIndex(activeIndex);
        }
    }, 10);
  });

  // Watch for hover changes to pause autoplay
  $effect(() => {
    if (isHovering || isDragging) {
      stopAutoplay();
    } else {
      startAutoplay();
    }
  });

  onMount(() => {
    startAutoplay();

    // Setup IntersectionObserver to detect which slide is currently in view
    // so we can update the activeIndex during manual touch swiping
    observer = new IntersectionObserver((entries) => {
      let maxRatio = 0;
      let targetIndex = activeIndex;

      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
          maxRatio = entry.intersectionRatio;
          const indexAttr = entry.target.getAttribute('data-index');
          if (indexAttr) targetIndex = parseInt(indexAttr, 10);
        }
      });

      if (maxRatio > 0.5 && targetIndex !== activeIndex) {
        activeIndex = targetIndex;
      }
    }, {
      root: trackRef,
      threshold: [0.5, 0.75, 1.0]
    });

    const slides = trackRef.querySelectorAll('.hs-carousel-slide');
    slides.forEach(slide => observer?.observe(slide));

    return () => {
      if (observer) observer.disconnect();
      stopAutoplay();
    };
  });

  const handlePointerDown = (e: PointerEvent) => {
    isDragging = true;
    startX = e.pageX - trackRef.offsetLeft;
    scrollLeft = trackRef.scrollLeft;
    // Disable smooth scrolling and snapping while actively dragging
    trackRef.style.scrollBehavior = 'auto';
    trackRef.style.scrollSnapType = 'none';
  };

  const handlePointerMove = (e: PointerEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - trackRef.offsetLeft;
    const walk = (x - startX) * 2; // scroll-fast multiplier
    trackRef.scrollLeft = scrollLeft - walk;
  };

  const handlePointerUp = () => {
    isDragging = false;
    // Re-enable snapping and smooth scrolling
    trackRef.style.scrollBehavior = 'smooth';
    trackRef.style.scrollSnapType = 'x mandatory';
    // Small nudge to trigger the snap
    trackRef.scrollLeft += 1;
    trackRef.scrollLeft -= 1;
  };

  const handlePointerLeave = () => {
    if (isDragging) handlePointerUp();
  };

  const handleKeydown = (e: KeyboardEvent) => {
    if (!keyboard) return;
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      next();
    }
  };
</script>

<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  class={cn('relative w-full overflow-hidden rounded-2xl border border-[var(--comp-border)] bg-surface outline-none focus-visible:ring-2 focus-visible:ring-[var(--comp-bg)]', ui.className, className)}
  style={ui.styles}
  onmouseenter={() => isHovering = true}
  onmouseleave={() => isHovering = false}
  onkeydown={handleKeydown}
  tabindex={keyboard ? 0 : -1}
  role="region"
  aria-roledescription="carousel"
  {...rest}
>
  {#if ui.showBackdrop}
    <GlassBackdrop />
  {/if}
  {#if ui.glowClass}
    <div class={ui.glowClass}></div>
  {/if}

  <!-- Scrollable Track -->
  <div 
    bind:this={trackRef}
    class="relative z-10 flex w-full h-full overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar select-none"
    style="scrollbar-width: none; -ms-overflow-style: none;"
    onpointerdown={handlePointerDown}
    onpointermove={handlePointerMove}
    onpointerup={handlePointerUp}
    onpointerleave={handlePointerLeave}
  >
    {@render children()}
  </div>

  <!-- Navigation Arrows -->
  {#if showArrows && totalSlides > 1}
    <div class="absolute inset-y-0 left-0 z-20 flex items-center pl-4 pointer-events-none">
      <Button 
        size="sm" 
        style="solid" 
        color="neutral" 
        class="rounded-full w-10 h-10 p-0 pointer-events-auto shadow-md"
        onclick={prev}
        disabled={!loop && activeIndex === 0}
        aria-label="Previous slide"
      >
        <Icon name="caret-left" size={16} weight="bold" />
      </Button>
    </div>
    <div class="absolute inset-y-0 right-0 z-20 flex items-center pr-4 pointer-events-none">
      <Button 
        size="sm" 
        style="solid" 
        color="neutral" 
        class="rounded-full w-10 h-10 p-0 pointer-events-auto shadow-md"
        onclick={next}
        disabled={!loop && activeIndex === totalSlides - 1}
        aria-label="Next slide"
      >
        <Icon name="caret-right" size={16} weight="bold" />
      </Button>
    </div>
  {/if}

  <!-- Pagination Dots -->
  {#if showPagination && totalSlides > 1}
    <div class="absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-2 pointer-events-none">
      {#each Array(totalSlides) as _, i}
        <button
          type="button"
          class={cn(
            'w-2.5 h-2.5 rounded-full transition-all duration-300 pointer-events-auto',
            activeIndex === i 
                ? 'bg-[var(--comp-bg)] scale-125' 
                : 'bg-[var(--comp-text)]/20 hover:bg-[var(--comp-text)]/40'
          )}
          aria-label={`Go to slide ${i + 1}`}
          aria-current={activeIndex === i ? 'true' : undefined}
          onclick={() => scrollToIndex(i)}
        ></button>
      {/each}
    </div>
  {/if}
</div>

<style>
  /* Hide scrollbar for Chrome, Safari and Opera */
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
</style>
<script lang="ts">
  import { getContext, onMount } from 'svelte';
  import { cn } from '$lib/utils/cn';
  import type { Snippet } from 'svelte';

  interface Props {
    class?: string;
    children: Snippet;
    [key: string]: unknown;
  }

  let { class: className, children, ...rest }: Props = $props();

  const ctx = getContext<{ registerSlide: () => number }>('glassui-carousel');

  let slideIndex = $state(0);
  onMount(() => {
    if (ctx) {
      slideIndex = ctx.registerSlide();
    }
  });
</script>

<div 
  class={cn('hs-carousel-slide shrink-0 w-full h-full snap-center', className)} 
  data-index={slideIndex}
  {...rest}
>
  {@render children()}
</div>
```