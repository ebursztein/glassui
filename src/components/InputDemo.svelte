<script lang="ts">
  import { Input } from '$lib/components/input';
  import { meta } from '$lib/components/input/schema';
  import Playground from './Playground.svelte';
  import DemoSection from './DemoSection.svelte';
  import TableOfContents from './TableOfContents.svelte';

  const sections = [
    { id: 'playground', label: 'Playground' },
    { id: 'status-colors', label: 'Status Colors' },
    { id: 'error-message', label: 'Error Message' },
    { id: 'helper-text', label: 'Helper Text' },
    { id: 'sizes', label: 'Sizes' },
    { id: 'glass', label: 'Glass' },
  ];
</script>

<div class="flex gap-10">
  <div class="flex-1 min-w-0 space-y-12">

    <Playground {meta}>
      {#snippet preview(props)}
        <div class="w-full max-w-sm">
          <Input label="Email" placeholder="you@example.com" {...props} />
        </div>
      {/snippet}
    </Playground>

    <!-- Status Colors -->
    <DemoSection id="status-colors" title="Status Colors" description="Colored borders to indicate input state.">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
        <Input label="Info" status="info" placeholder="Informational" />
        <Input label="Success" status="success" placeholder="Looks good" />
        <Input label="Warning" status="warning" placeholder="Check this" />
        <Input label="Error" status="error" placeholder="Invalid value" />
      </div>
    </DemoSection>

    <!-- Error Message -->
    <DemoSection id="error-message" title="Error Message" description="The error prop sets the status to error and displays a message below the input.">
      <div class="w-full max-w-sm">
        <Input label="Email" placeholder="you@example.com" error="Please enter a valid email address." />
      </div>
    </DemoSection>

    <!-- Helper Text -->
    <DemoSection id="helper-text" title="Helper Text" description="Supportive text below the input for additional context.">
      <div class="w-full max-w-sm">
        <Input label="Username" placeholder="johndoe" helperText="Must be 3-20 characters, letters and numbers only." />
      </div>
    </DemoSection>

    <!-- Sizes -->
    <DemoSection id="sizes" title="Sizes" description="Five size variants from extra-small to extra-large.">
      <div class="space-y-3 w-full max-w-md">
        <Input size="xs" placeholder="Extra small (xs)" />
        <Input size="sm" placeholder="Small (sm)" />
        <Input size="md" placeholder="Medium (md)" />
        <Input size="lg" placeholder="Large (lg)" />
        <Input size="xl" placeholder="Extra large (xl)" />
      </div>
    </DemoSection>

    <!-- Glass -->
    <DemoSection id="glass" title="Glass" description="Optional glass surface with backdrop blur and glow on focus. Shown on a dark background." glass>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
        <Input label="Glass" placeholder="Frosted input" glass />
        <Input label="Glass + Glow" placeholder="Focus to see glow" glass glow />
      </div>
    </DemoSection>

  </div>

  <TableOfContents {sections} />
</div>
