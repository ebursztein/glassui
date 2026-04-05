<script lang="ts">
  import DemoSection from './DemoSection.svelte';
  import Playground from './Playground.svelte';
  import { meta } from '$lib/components/input-number/schema';
  import { InputNumber } from '$lib/components/input-number';
  import { Card, CardContent } from '$lib/components/card';

  let count = $state(0);
</script>

<div class="space-y-16">
  <header>
    <h1 class="text-4xl font-bold tracking-tight text-foreground">{meta.name}</h1>
    <p class="mt-4 text-lg text-muted-foreground">{meta.description}</p>
  </header>

  <Playground {meta}>
    {#snippet preview(props)}
      <div class="w-full flex justify-center">
        <InputNumber bind:value={count} {...props} />
      </div>
    {/snippet}
  </Playground>

  <DemoSection id="bounds" title="Bounds & Steps" description="Set minimum, maximum, and step intervals to restrict inputs.">
    <div class="w-full max-w-md mx-auto grid gap-6">
      <InputNumber label="Quantity (0-10)" min={0} max={10} value={5} />
      <InputNumber label="Percentage (0-100, step 10)" min={0} max={100} step={10} value={50} />
    </div>
  </DemoSection>

  <DemoSection id="glass" title="Glass Overlay Integration" description="InputNumber operates as a standard field component in the GlassUI engine, allowing it to seamlessly match your other forms on glass surfaces.">
    <div class="w-full max-w-md mx-auto">
      <Card glass color="gradient" class="min-h-48 p-6 flex flex-col justify-center gap-6">
        <InputNumber label="Tickets" min={1} value={2} glass />
        <InputNumber label="Donation Amount ($)" min={5} step={5} value={25} glass color="success" />
      </Card>
    </div>
  </DemoSection>
</div>