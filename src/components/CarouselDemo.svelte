<script lang="ts">
  import DemoSection from './DemoSection.svelte';
  import Playground from './Playground.svelte';
  import { meta } from '$lib/components/carousel/schema';
  import { Carousel, CarouselSlide } from '$lib/components/carousel';
  import { Button } from '$lib/components/button';

  let currentSlide = $state(0);
</script>

<div class="space-y-16">
  <header>
    <h1 class="text-4xl font-bold tracking-tight text-foreground">{meta.name}</h1>
    <p class="mt-4 text-lg text-muted-foreground">{meta.description}</p>
  </header>

  <Playground {meta}>
    {#snippet preview(props)}
      <div class="w-full max-w-lg mx-auto">
        <Carousel bind:activeIndex={currentSlide} {...props} class="h-64">
          <CarouselSlide>
            <div class="w-full h-full flex flex-col items-center justify-center bg-layer text-center p-6">
              <h2 class="text-2xl font-bold mb-2">Native Swiping & Dragging</h2>
              <p class="text-muted-foreground">Uses CSS Scroll Snap for mobile touch, and native Pointer Events for desktop mouse dragging.</p>
            </div>
          </CarouselSlide>
          <CarouselSlide>
            <div class="w-full h-full flex flex-col items-center justify-center bg-surface text-center p-6">
              <h2 class="text-2xl font-bold mb-2">Loop & Autoplay</h2>
              <p class="text-muted-foreground">Enable infinite looping and timed autoplay. Pauses on hover automatically.</p>
            </div>
          </CarouselSlide>
          <CarouselSlide>
            <div class="w-full h-full flex flex-col items-center justify-center bg-layer text-center p-6">
              <h2 class="text-2xl font-bold mb-2">Keyboard Accessible</h2>
              <p class="text-muted-foreground">Focus the carousel and use Left/Right arrow keys.</p>
            </div>
          </CarouselSlide>
        </Carousel>

        <div class="mt-8 flex justify-center gap-4">
          <Button color="neutral" style="outline" onclick={() => currentSlide = 0}>Jump to Slide 1</Button>
          <Button color="neutral" style="outline" onclick={() => currentSlide = 2}>Jump to Slide 3</Button>
        </div>
      </div>
    {/snippet}
  </Playground>

  <DemoSection id="glass" title="Glass Slides" description="Because Carousel inherits the 'container' role from the UI Engine, it perfectly transforms into a glass pane when you need it.">
    <div class="w-full relative min-h-[400px] flex items-center justify-center p-8 overflow-hidden rounded-2xl bg-gradient-to-br from-teal-500/20 via-emerald-500/20 to-cyan-500/20 border border-line-2">
      <div class="w-full relative z-10 max-w-lg">
        <Carousel glass color="gradient" class="h-64" showArrows={false}>
          <CarouselSlide>
            <div class="w-full h-full flex items-center justify-center text-center p-8">
              <h2 class="text-3xl font-bold text-foreground">Slide One</h2>
            </div>
          </CarouselSlide>
          <CarouselSlide>
            <div class="w-full h-full flex items-center justify-center text-center p-8">
              <h2 class="text-3xl font-bold text-foreground">Slide Two</h2>
            </div>
          </CarouselSlide>
          <CarouselSlide>
            <div class="w-full h-full flex items-center justify-center text-center p-8">
              <h2 class="text-3xl font-bold text-foreground">Slide Three</h2>
            </div>
          </CarouselSlide>
        </Carousel>
      </div>
    </div>
  </DemoSection>
</div>