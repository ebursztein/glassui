<script lang="ts">
  import DemoSection from './DemoSection.svelte';
  import Playground from './Playground.svelte';
  import { meta } from '$lib/components/datepicker/schema';
  import { Datepicker } from '$lib/components/datepicker';
  import { Card, CardContent } from '$lib/components/card';

  let date = $state('');
</script>

<div class="space-y-16">
  <header>
    <h1 class="text-4xl font-bold tracking-tight text-foreground">{meta.name}</h1>
    <p class="mt-4 text-lg text-muted-foreground">{meta.description}</p>
  </header>

  <Playground {meta}>
    {#snippet preview(props)}
      <div class="w-full flex justify-center max-w-sm">
        <Datepicker bind:value={date} {...props} />
      </div>
    {/snippet}
  </Playground>

  <DemoSection id="glass" title="Glass Overlay" description="The Datepicker inherits glass settings smoothly for its input field.">
    <div class="w-full max-w-md mx-auto">
      <Card glass color="gradient" class="min-h-48 p-8 flex flex-col justify-center">
        <CardContent>
          <Datepicker label="Departure Date" glass color="gradient" />
        </CardContent>
      </Card>
    </div>
  </DemoSection>
</div>