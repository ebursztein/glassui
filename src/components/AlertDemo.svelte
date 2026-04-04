<script lang="ts">
  import { Alert } from '$lib/components/alert';
  import { meta } from '$lib/components/alert/schema';
  import Playground from './Playground.svelte';
  import DemoSection from './DemoSection.svelte';
  import TableOfContents from './TableOfContents.svelte';

  const sections = [
    { id: 'playground', label: 'Playground' },
    { id: 'all-statuses', label: 'All Statuses' },
    { id: 'with-title', label: 'With Title' },
    { id: 'dismissible-section', label: 'Dismissible' },
    { id: 'glass', label: 'Glass' },
    { id: 'glow', label: 'Glow' },
  ];
</script>

<div class="flex gap-10">
  <div class="flex-1 min-w-0 space-y-12">

    <Playground {meta} childrenCode="This is an alert message.">
      {#snippet preview(props)}
        <div class="w-full max-w-lg">
          <Alert title="Heads up" {...props}>{#snippet children()}This is an alert message. You can customize it with the props below.{/snippet}</Alert>
        </div>
      {/snippet}
    </Playground>

    <!-- All Statuses -->
    <DemoSection id="all-statuses" title="All Statuses" description="All four status types with default styling.">
      <div class="w-full space-y-3">
        <Alert color="info">{#snippet children()}This is an informational message.{/snippet}</Alert>
        <Alert color="success">{#snippet children()}Operation completed successfully.{/snippet}</Alert>
        <Alert color="warning">{#snippet children()}Proceed with caution.{/snippet}</Alert>
        <Alert color="error">{#snippet children()}Something went wrong.{/snippet}</Alert>
      </div>
    </DemoSection>

    <!-- With Title -->
    <DemoSection id="with-title" title="With Title" description="Alerts with a bold title above the body text.">
      <div class="w-full space-y-3">
        <Alert color="info" title="Information">{#snippet children()}Something you should know about.{/snippet}</Alert>
        <Alert color="success" title="Success">{#snippet children()}Your changes have been saved.{/snippet}</Alert>
        <Alert color="warning" title="Warning">{#snippet children()}This action cannot be undone.{/snippet}</Alert>
        <Alert color="error" title="Error">{#snippet children()}Failed to connect to the server.{/snippet}</Alert>
      </div>
    </DemoSection>

    <!-- Dismissible -->
    <DemoSection id="dismissible-section" title="Dismissible" description="Alerts with a dismiss button that removes them from the page.">
      <div class="w-full space-y-3">
        <Alert color="info" dismissible title="Dismissible Info">{#snippet children()}Click the X to dismiss this alert.{/snippet}</Alert>
        <Alert color="success" dismissible title="Dismissible Success">{#snippet children()}This alert can be closed.{/snippet}</Alert>
      </div>
    </DemoSection>

    <!-- Glass -->
    <DemoSection id="glass" title="Glass" description="Frosted glass alerts with backdrop blur. Shown on a dark background." glass>
      <div class="w-full space-y-3">
        <Alert color="info" glass frosted title="Information">{#snippet children()}Frosted glass info alert.{/snippet}</Alert>
        <Alert color="success" glass frosted title="Success">{#snippet children()}Glass success alert.{/snippet}</Alert>
        <Alert color="warning" glass frosted title="Warning">{#snippet children()}Glass warning alert.{/snippet}</Alert>
        <Alert color="error" glass frosted title="Error">{#snippet children()}Glass error alert.{/snippet}</Alert>
      </div>
    </DemoSection>

    <!-- Glow -->
    <DemoSection id="glow" title="Glow" description="Gradient glow effect behind the alert. Combine with glass for the full effect." glass>
      <div class="w-full space-y-3">
        <Alert color="info" glow title="Info Glow">{#snippet children()}Glow effect on info alert.{/snippet}</Alert>
        <Alert color="success" glass frosted glow title="Glass + Glow">{#snippet children()}Glass and glow combined.{/snippet}</Alert>
        <Alert color="error" glass frosted glow title="Error Glass + Glow">{#snippet children()}Glass glow on error alert.{/snippet}</Alert>
      </div>
    </DemoSection>

  </div>

  <TableOfContents {sections} />
</div>
