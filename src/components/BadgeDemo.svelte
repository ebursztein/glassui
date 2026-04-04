<script lang="ts">
  import { Badge } from '$lib/components/badge';
  import { meta } from '$lib/components/badge/schema';
  import Playground from './Playground.svelte';
  import DemoSection from './DemoSection.svelte';
  import TableOfContents from './TableOfContents.svelte';

  const sections = [
    { id: 'playground', label: 'Playground' },
    { id: 'status', label: 'Status' },
    { id: 'dot', label: 'Dot Indicator' },
    { id: 'glass-variants', label: 'Glass Variants' },
  ];
</script>

<div class="flex gap-10">
  <div class="flex-1 min-w-0 space-y-12">

    <Playground {meta} childrenCode="Label">
      {#snippet preview(props)}
        <Badge {...props}>{#snippet children()}Label{/snippet}</Badge>
      {/snippet}
    </Playground>

    <!-- Status -->
    <DemoSection id="status" title="Status" description="Status-colored badges for contextual information. Status overrides the variant color.">
      <Badge color="info">{#snippet children()}Info{/snippet}</Badge>
      <Badge color="success">{#snippet children()}Success{/snippet}</Badge>
      <Badge color="warning">{#snippet children()}Warning{/snippet}</Badge>
      <Badge color="error">{#snippet children()}Error{/snippet}</Badge>
    </DemoSection>

    <!-- Dot Indicator -->
    <DemoSection id="dot" title="Dot Indicator" description="Badges with a dot indicator before the text for additional visual signaling.">
      <Badge dot>{#snippet children()}Default{/snippet}</Badge>
      <Badge dot color="info">{#snippet children()}Info{/snippet}</Badge>
      <Badge dot color="success">{#snippet children()}Active{/snippet}</Badge>
      <Badge dot color="warning">{#snippet children()}Pending{/snippet}</Badge>
      <Badge dot color="error">{#snippet children()}Offline{/snippet}</Badge>
    </DemoSection>

    <!-- Glass Variants -->
    <DemoSection id="glass-variants" title="Glass Variants" description="Frosted glass badges with backdrop blur. Best on dark or gradient backgrounds." glass>
      <Badge variant="default" glass frosted>{#snippet children()}Default{/snippet}</Badge>
      <Badge variant="primary" glass frosted>{#snippet children()}Primary{/snippet}</Badge>
      <Badge variant="secondary" glass frosted>{#snippet children()}Secondary{/snippet}</Badge>
      <Badge variant="outline" glass frosted>{#snippet children()}Outline{/snippet}</Badge>
      <Badge variant="destructive" glass frosted>{#snippet children()}Destructive{/snippet}</Badge>
      <Badge color="info" glass frosted>{#snippet children()}Info{/snippet}</Badge>
      <Badge color="success" glass frosted>{#snippet children()}Success{/snippet}</Badge>
      <Badge color="warning" glass frosted>{#snippet children()}Warning{/snippet}</Badge>
      <Badge color="error" glass frosted>{#snippet children()}Error{/snippet}</Badge>
    </DemoSection>

  </div>

  <TableOfContents {sections} />
</div>
