<script lang="ts">
  import DemoSection from './DemoSection.svelte';
  import Playground from './Playground.svelte';
  import { meta } from '$lib/components/collapse/schema';
  import { Collapse } from '$lib/components/collapse';
  import { Button } from '$lib/components/button';
  import { Card, CardContent } from '$lib/components/card';

  let isBasicOpen = $state(false);
</script>

<div class="space-y-16">
  <header>
    <h1 class="text-4xl font-bold tracking-tight text-foreground">{meta.name}</h1>
    <p class="mt-4 text-lg text-muted-foreground">{meta.description}</p>
  </header>

  <Playground {meta}>
    {#snippet preview(props)}
      <div class="w-full max-w-md flex flex-col items-center gap-4">
        <!-- We create a local state for the playground preview -->
        <Button color="primary" onclick={() => props.open = !props.open}>Toggle Collapse</Button>
        <Collapse {...props}>
          <Card>
            <CardContent>
              <p class="text-sm">This content slides up and down gracefully. The collapse wrapper has no visual styling on its own, it merely controls height.</p>
            </CardContent>
          </Card>
        </Collapse>
      </div>
    {/snippet}
  </Playground>

  <DemoSection id="basic" title="Basic Usage" description="Bind a boolean to the open prop to toggle visibility.">
    <div class="w-full max-w-md mx-auto space-y-4">
      <Button onclick={() => { isBasicOpen = !isBasicOpen }}>Click to reveal</Button>
      <Collapse bind:open={isBasicOpen}>
        <div class="p-6 bg-surface border border-line-2 rounded-xl text-sm text-foreground">
          Hidden content revealed smoothly.
        </div>
      </Collapse>
    </div>
  </DemoSection>
</div>