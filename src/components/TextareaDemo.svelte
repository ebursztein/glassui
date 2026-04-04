<script lang="ts">
  import { Textarea } from '$lib/components/textarea';
  import { meta } from '$lib/components/textarea/schema';
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
          <Textarea label="Message" placeholder="Write something..." {...props} />
        </div>
      {/snippet}
    </Playground>

    <!-- Status Colors -->
    <DemoSection id="status-colors" title="Status Colors" description="Colored borders to indicate textarea state.">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
        <Textarea label="Info" status="info" placeholder="Informational" rows={3} />
        <Textarea label="Success" status="success" placeholder="Looks good" rows={3} />
        <Textarea label="Warning" status="warning" placeholder="Check this" rows={3} />
        <Textarea label="Error" status="error" placeholder="Invalid value" rows={3} />
      </div>
    </DemoSection>

    <!-- Error Message -->
    <DemoSection id="error-message" title="Error Message" description="The error prop sets the status to error and displays a message below the textarea.">
      <div class="w-full max-w-sm">
        <Textarea label="Bio" placeholder="Tell us about yourself..." error="Bio must be at least 20 characters." rows={3} />
      </div>
    </DemoSection>

    <!-- Helper Text -->
    <DemoSection id="helper-text" title="Helper Text" description="Supportive text below the textarea for additional context.">
      <div class="w-full max-w-sm">
        <Textarea label="Description" placeholder="Describe your project..." helperText="Markdown is supported. Maximum 500 characters." rows={3} />
      </div>
    </DemoSection>

    <!-- Sizes -->
    <DemoSection id="sizes" title="Sizes" description="Five size variants from extra-small to extra-large.">
      <div class="space-y-3 w-full max-w-md">
        <Textarea size="xs" placeholder="Extra small (xs)" rows={2} />
        <Textarea size="sm" placeholder="Small (sm)" rows={2} />
        <Textarea size="md" placeholder="Medium (md)" rows={2} />
        <Textarea size="lg" placeholder="Large (lg)" rows={2} />
        <Textarea size="xl" placeholder="Extra large (xl)" rows={2} />
      </div>
    </DemoSection>

    <!-- Glass -->
    <DemoSection id="glass" title="Glass" description="Optional glass surface with backdrop blur and glow on focus. Shown on a dark background." glass>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
        <Textarea label="Glass" placeholder="Frosted textarea" glass frosted rows={3} />
        <Textarea label="Glass + Glow" placeholder="Focus to see glow" glass frosted glow rows={3} />
      </div>
    </DemoSection>

  </div>

  <TableOfContents {sections} />
</div>
