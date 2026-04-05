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