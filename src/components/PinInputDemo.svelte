<script lang="ts">
  import DemoSection from './DemoSection.svelte';
  import Playground from './Playground.svelte';
  import { meta } from '$lib/components/pin-input/schema';
  import { PinInput } from '$lib/components/pin-input';
  import { Card, CardContent } from '$lib/components/card';

  let pinValue = $state(['1', '2', '3', '4']);
</script>

<div class="space-y-16">
  <header>
    <h1 class="text-4xl font-bold tracking-tight text-foreground">{meta.name}</h1>
    <p class="mt-4 text-lg text-muted-foreground">{meta.description}</p>
  </header>

  <Playground {meta}>
    {#snippet preview(props)}
      <div class="w-full flex justify-center">
        <PinInput bind:value={pinValue} {...props} />
      </div>
    {/snippet}
  </Playground>

  <DemoSection id="lengths" title="Custom Lengths" description="PinInput dynamically renders as many fields as you need.">
    <div class="w-full max-w-md mx-auto flex flex-col gap-8">
      <PinInput label="4-Digit PIN" length={4} placeholder="-" />
      <PinInput label="6-Digit Auth Code" length={6} />
    </div>
  </DemoSection>

  <DemoSection id="glass" title="Glass Overlay Integration" description="Since the PinInput maps directly to the UI Engine as a field, it inherits the parent card's background gradient and glass properties seamlessly.">
    <div class="w-full max-w-md mx-auto">
      <Card glass color="gradient" class="min-h-48 p-6 flex flex-col items-center justify-center text-center">
        <CardContent>
          <h3 class="text-xl font-bold mb-2">Verify Your Account</h3>
          <p class="text-sm opacity-80 mb-6">Enter the 6-digit code sent to your email.</p>
          <PinInput length={6} glass />
        </CardContent>
      </Card>
    </div>
  </DemoSection>
</div>