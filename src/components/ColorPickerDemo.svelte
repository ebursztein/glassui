<script lang="ts">
  import DemoSection from './DemoSection.svelte';
  import Playground from './Playground.svelte';
  import { meta } from '$lib/components/color-picker/schema';
  import { ColorPicker } from '$lib/components/color-picker';
  import { Card, CardContent } from '$lib/components/card';

  let color = $state('#3b82f6');
</script>

<div class="space-y-16">
  <header>
    <h1 class="text-4xl font-bold tracking-tight text-foreground">{meta.name}</h1>
    <p class="mt-4 text-lg text-muted-foreground">{meta.description}</p>
  </header>

  <Playground {meta}>
    {#snippet preview(props)}
      <div class="w-full flex justify-center max-w-sm">
        <ColorPicker bind:value={color} {...props} />
      </div>
    {/snippet}
  </Playground>

  <DemoSection id="glass" title="Glass Overlay" description="The ColorPicker perfectly aligns with other form fields inside a glass context.">
    <div class="w-full max-w-md mx-auto">
      <Card glass color="gradient" class="min-h-48 p-8 flex flex-col justify-center">
        <CardContent>
          <ColorPicker label="Brand Color" glass color="gradient" />
        </CardContent>
      </Card>
    </div>
  </DemoSection>
</div>