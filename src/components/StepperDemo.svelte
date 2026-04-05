<script lang="ts">
  import DemoSection from './DemoSection.svelte';
  import Playground from './Playground.svelte';
  import { meta } from '$lib/components/stepper/schema';
  import { Stepper, Step } from '$lib/components/stepper';
  import { Button } from '$lib/components/button';

  let currentStep = $state(2);
</script>

<div class="space-y-16">
  <header>
    <h1 class="text-4xl font-bold tracking-tight text-foreground">{meta.name}</h1>
    <p class="mt-4 text-lg text-muted-foreground">{meta.description}</p>
  </header>

  <Playground {meta}>
    {#snippet preview(props)}
      <div class="w-full max-w-2xl px-4 py-8">
        <Stepper bind:activeStep={currentStep} {...props}>
          <Step title="Details" description="Basic account info" />
          <Step title="Profile" description="Add your avatar" />
          <Step title="Review" description="Confirm details" />
        </Stepper>

        <div class="mt-12 flex justify-between">
          <Button disabled={currentStep <= 1} onclick={() => currentStep -= 1} color="neutral" style="outline">Previous</Button>
          <Button disabled={currentStep >= 3} onclick={() => currentStep += 1}>Next Step</Button>
        </div>
      </div>
    {/snippet}
  </Playground>

  <DemoSection id="vertical" title="Vertical Stepper" description="Vertical orientation for sidebars or wizards.">
    <div class="w-full max-w-md mx-auto p-8 border border-line-2 bg-surface rounded-2xl">
      <Stepper activeStep={2} orientation="vertical" color="gradient">
        <Step title="Create account" description="Register your email" />
        <Step title="Verify email" description="Click the magic link" />
        <Step title="Setup payment" description="Add a credit card" />
        <Step title="Start trial" description="Explore the features" />
      </Stepper>
    </div>
  </DemoSection>
</div>