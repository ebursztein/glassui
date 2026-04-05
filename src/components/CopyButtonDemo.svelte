<script lang="ts">
  import DemoSection from './DemoSection.svelte';
  import Playground from './Playground.svelte';
  import { meta } from '$lib/components/copy-button/schema';
  import { CopyButton } from '$lib/components/copy-button';
  import { Card, CardContent } from '$lib/components/card';
  import { Input } from '$lib/components/input';
</script>

<div class="space-y-16">
  <header>
    <h1 class="text-4xl font-bold tracking-tight text-foreground">{meta.name}</h1>
    <p class="mt-4 text-lg text-muted-foreground">{meta.description}</p>
  </header>

  <Playground {meta}>
    {#snippet preview(props)}
      <div class="w-full flex justify-center">
        <CopyButton value="npm install glassui" {...props} />
      </div>
    {/snippet}
  </Playground>

  <DemoSection id="usage" title="Usage alongside inputs" description="Often used alongside disabled input fields to easily copy API keys or URLs.">
    <div class="w-full max-w-md mx-auto space-y-4">
      <div class="relative">
        <Input value="https://glassui.dev/components" disabled class="pr-12" />
        <div class="absolute inset-y-0 right-1 flex items-center">
          <CopyButton value="https://glassui.dev/components" size="sm" />
        </div>
      </div>
      
      <div class="flex items-center gap-4 p-4 border border-line-2 bg-layer rounded-xl">
        <div class="flex-1 overflow-hidden">
          <p class="text-sm font-medium mb-1">API Key</p>
          <p class="text-xs text-muted-foreground truncate">sk_live_51M...</p>
        </div>
        <CopyButton value="sk_live_51M..." iconOnly={false} style="outline" size="sm" color="neutral" />
      </div>
    </div>
  </DemoSection>
</div>