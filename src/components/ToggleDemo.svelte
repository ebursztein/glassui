<script lang="ts">
  import { Toggle } from '$lib/components/toggle';
  import { meta } from '$lib/components/toggle/schema';
  import Playground from './Playground.svelte';
  import DemoSection from './DemoSection.svelte';
  import TableOfContents from './TableOfContents.svelte';

  const sections = [
    { id: 'playground', label: 'Playground' },
    { id: 'sizes', label: 'Sizes' },
    { id: 'with-label', label: 'With Label' },
    { id: 'glass', label: 'Glass' },
  ];
</script>

<div class="flex gap-10">
  <div class="flex-1 min-w-0 space-y-12">

    <Playground {meta}>
      {#snippet preview(props)}
        <Toggle label="Toggle me" {...props} />
      {/snippet}
    </Playground>

    <!-- Sizes -->
    <DemoSection id="sizes" title="Sizes" description="Toggles from extra small to extra large.">
      <div class="flex flex-col gap-4">
        <Toggle size="xs" label="Extra small" />
        <Toggle size="sm" label="Small" />
        <Toggle size="md" label="Medium" />
        <Toggle size="lg" label="Large" />
        <Toggle size="xl" label="Extra large" />
      </div>
    </DemoSection>

    <!-- With Label -->
    <DemoSection id="with-label" title="With Label" description="Toggles with descriptive labels and different states.">
      <div class="flex flex-col gap-4">
        <Toggle label="Notifications" />
        <Toggle label="Dark mode" checked={true} />
        <Toggle label="Disabled" disabled />
        <Toggle label="Disabled + checked" disabled checked={true} />
      </div>
    </DemoSection>

    <!-- Glass -->
    <DemoSection id="glass" title="Glass" description="Glass surface toggle with translucent track and glow on check. Best on dark backgrounds." glass>
      <div class="flex flex-col gap-4">
        <Toggle glass label="Glass toggle" />
        <Toggle glass label="Glass checked" checked={true} />
        <Toggle glass label="Glass disabled" disabled />
      </div>
    </DemoSection>

  </div>

  <TableOfContents {sections} />
</div>
