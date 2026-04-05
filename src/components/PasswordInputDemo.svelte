<script lang="ts">
  import DemoSection from './DemoSection.svelte';
  import Playground from './Playground.svelte';
  import { meta } from '$lib/components/password-input/schema';
  import { PasswordInput } from '$lib/components/password-input';

  let pwd = $state('');
</script>

<div class="space-y-16">
  <header>
    <h1 class="text-4xl font-bold tracking-tight text-foreground">{meta.name}</h1>
    <p class="mt-4 text-lg text-muted-foreground">{meta.description}</p>
  </header>

  <Playground {meta}>
    {#snippet preview(props)}
      <div class="w-full flex justify-center max-w-sm">
        <PasswordInput bind:value={pwd} {...props} />
      </div>
    {/snippet}
  </Playground>

  <DemoSection id="strength" title="Strength Meter" description="The component includes an optional built-in password strength meter.">
    <div class="w-full max-w-md mx-auto grid gap-6">
      <PasswordInput label="New Password" showStrength={true} placeholder="Type a strong password" />
    </div>
  </DemoSection>
</div>