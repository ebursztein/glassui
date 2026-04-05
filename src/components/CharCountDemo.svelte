<script lang="ts">
  import DemoSection from './DemoSection.svelte';
  import Playground from './Playground.svelte';
  import { meta } from '$lib/components/char-count/schema';
  import { CharCount } from '$lib/components/char-count';
  import { Textarea } from '$lib/components/textarea';
  import { Card, CardContent } from '$lib/components/card';

  let text = $state('');
</script>

<div class="space-y-16">
  <header>
    <h1 class="text-4xl font-bold tracking-tight text-foreground">{meta.name}</h1>
    <p class="mt-4 text-lg text-muted-foreground">{meta.description}</p>
  </header>

  <Playground {meta}>
    {#snippet preview(props)}
      <div class="w-full flex justify-center max-w-sm">
        <div class="w-full">
          <Textarea bind:value={text} placeholder="Type something..." />
          <div class="mt-2 text-right">
            <CharCount value={text} {...props} />
          </div>
        </div>
      </div>
    {/snippet}
  </Playground>

  <DemoSection id="maxLength" title="Max Length" description="When passing maxLength, the counter turns into an error state when exceeded.">
    <div class="w-full max-w-md mx-auto">
      <Card>
        <CardContent>
          <Textarea bind:value={text} placeholder="Limit 50 characters..." />
          <div class="mt-2 text-right">
            <CharCount value={text} maxLength={50} />
          </div>
        </CardContent>
      </Card>
    </div>
  </DemoSection>
</div>