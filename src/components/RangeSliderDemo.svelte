<script lang="ts">
  import DemoSection from './DemoSection.svelte';
  import Playground from './Playground.svelte';
  import { meta } from '$lib/components/range-slider/schema';
  import { RangeSlider } from '$lib/components/range-slider';
  import { Card, CardContent } from '$lib/components/card';

  let volume = $state(50);
  let brightness = $state(75);
</script>

<div class="space-y-16">
  <header>
    <h1 class="text-4xl font-bold tracking-tight text-foreground">{meta.name}</h1>
    <p class="mt-4 text-lg text-muted-foreground">{meta.description}</p>
  </header>

  <Playground {meta}>
    {#snippet preview(props)}
      <div class="w-full flex justify-center max-w-sm">
        <RangeSlider bind:value={volume} {...props} />
      </div>
    {/snippet}
  </Playground>

  <DemoSection id="basic" title="Basic Ranges" description="Range sliders support min, max, and step attributes just like native inputs.">
    <div class="w-full max-w-md mx-auto grid gap-8">
      <div>
        <div class="flex justify-between items-center mb-2">
          <label class="text-sm font-medium">Volume</label>
          <span class="text-xs text-muted-foreground">{volume}%</span>
        </div>
        <RangeSlider bind:value={volume} color="primary" />
      </div>

      <div>
        <div class="flex justify-between items-center mb-2">
          <label class="text-sm font-medium">Brightness</label>
          <span class="text-xs text-muted-foreground">{brightness}%</span>
        </div>
        <RangeSlider bind:value={brightness} color="warning" />
      </div>
    </div>
  </DemoSection>

  <DemoSection id="glass" title="Glass Overlay" description="When inside a glass context, the slider track transforms into a beautiful carved inset field, and the thumb inherits the theme's glass optics automatically.">
    <div class="w-full max-w-md mx-auto">
      <Card glass color="gradient" class="min-h-48 p-8 flex flex-col justify-center">
        <CardContent>
          <RangeSlider label="System Transparency" value={60} color="gradient" glass />
        </CardContent>
      </Card>
    </div>
  </DemoSection>
</div>