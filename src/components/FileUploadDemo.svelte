<script lang="ts">
  import DemoSection from './DemoSection.svelte';
  import Playground from './Playground.svelte';
  import { meta } from '$lib/components/file-upload/schema';
  import { FileUpload } from '$lib/components/file-upload';
  import { Card, CardContent } from '$lib/components/card';
</script>

<div class="space-y-16">
  <header>
    <h1 class="text-4xl font-bold tracking-tight text-foreground">{meta.name}</h1>
    <p class="mt-4 text-lg text-muted-foreground">{meta.description}</p>
  </header>

  <Playground {meta}>
    {#snippet preview(props)}
      <div class="w-full flex justify-center max-w-md">
        <FileUpload {...props} />
      </div>
    {/snippet}
  </Playground>

  <DemoSection id="glass" title="Glass File Upload" description="Because it uses the 'container' role, FileUpload can seamlessly become a translucent glass dropzone on top of rich backgrounds.">
    <div class="w-full max-w-lg mx-auto">
      <Card glass color="gradient" class="min-h-48 p-8">
        <CardContent>
          <FileUpload glass="normal" color="gradient" />
        </CardContent>
      </Card>
    </div>
  </DemoSection>
</div>