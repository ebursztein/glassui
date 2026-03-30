<script lang="ts">
  import { Alert } from '$lib/components/alert';
  import { meta } from '$lib/components/alert/schema';
  import PropEditor from './PropEditor.svelte';
  import DemoSection from './DemoSection.svelte';
  import TableOfContents from './TableOfContents.svelte';

  let status = $state<string>('info');
  let title = $state<string>('Heads up');
  let dismissible = $state(false);
  let icon = $state(true);
  let glass = $state(false);
  let glow = $state(false);

  const values = $derived({ status, title, dismissible, icon, glass, glow });


  function enumOrFalse(v: any): string | false {
    return v === 'false' || v === false ? false : v;
  }

  function handleChange(key: string, value: any) {
    if (key === 'status') status = value;
    if (key === 'title') title = value;
    if (key === 'dismissible') dismissible = value;
    if (key === 'icon') icon = value;
    if (key === 'glass') glass = enumOrFalse(value);
    if (key === 'glow') glow = enumOrFalse(value);
  }

  const codeSnippet = $derived(() => {
    const props: string[] = [];
    if (status !== 'info') props.push(`status="${status}"`);
    if (title) props.push(`title="${title}"`);
    if (dismissible) props.push('dismissible');
    if (!icon) props.push('icon={false}');
    if (glass) props.push('glass');
    if (glow) props.push('glow');
    const propsStr = props.length > 0 ? ' ' + props.join(' ') : '';
    return `<Alert${propsStr}>Alert message here.</Alert>`;
  });

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

    <!-- Interactive Playground -->
    <section id="playground" class="scroll-mt-24">
      <h2 class="text-lg font-semibold text-foreground">Playground</h2>
      <p class="mt-1 text-sm text-muted-foreground">Explore all alert props interactively.</p>

      <!-- Live preview -->
      <div class="mt-4 rounded-lg border border-border p-8 flex items-center justify-center min-h-[100px] bg-background">
        <div class="w-full max-w-lg">
          <Alert
            status={status as any}
            title={title || undefined}
            {dismissible}
            {icon}
            {glass}
            {glow}
          >
            {#snippet children()}This is an alert message. You can customize it with the props below.{/snippet}
          </Alert>
        </div>
      </div>

<!-- Code -->
      <pre class="mt-4 text-sm text-primary bg-primary/5 border border-primary/10 rounded-lg p-4 overflow-x-auto"><code>{codeSnippet()}</code></pre>

      <!-- Props -->
      <div class="mt-4 rounded-lg border border-border p-5">
        <h3 class="text-sm font-semibold text-foreground mb-4">Props</h3>
        <PropEditor props={meta.props} {values} onchange={handleChange} />
      </div>
    </section>

    <!-- All Statuses -->
    <DemoSection id="all-statuses" title="All Statuses" description="All four status types with default styling.">
      <div class="w-full space-y-3">
        <Alert status="info">{#snippet children()}This is an informational message.{/snippet}</Alert>
        <Alert status="success">{#snippet children()}Operation completed successfully.{/snippet}</Alert>
        <Alert status="warning">{#snippet children()}Proceed with caution.{/snippet}</Alert>
        <Alert status="error">{#snippet children()}Something went wrong.{/snippet}</Alert>
      </div>
    </DemoSection>

    <!-- With Title -->
    <DemoSection id="with-title" title="With Title" description="Alerts with a bold title above the body text.">
      <div class="w-full space-y-3">
        <Alert status="info" title="Information">{#snippet children()}Something you should know about.{/snippet}</Alert>
        <Alert status="success" title="Success">{#snippet children()}Your changes have been saved.{/snippet}</Alert>
        <Alert status="warning" title="Warning">{#snippet children()}This action cannot be undone.{/snippet}</Alert>
        <Alert status="error" title="Error">{#snippet children()}Failed to connect to the server.{/snippet}</Alert>
      </div>
    </DemoSection>

    <!-- Dismissible -->
    <DemoSection id="dismissible-section" title="Dismissible" description="Alerts with a dismiss button that removes them from the page.">
      <div class="w-full space-y-3">
        <Alert status="info" dismissible title="Dismissible Info">{#snippet children()}Click the X to dismiss this alert.{/snippet}</Alert>
        <Alert status="success" dismissible title="Dismissible Success">{#snippet children()}This alert can be closed.{/snippet}</Alert>
      </div>
    </DemoSection>

    <!-- Glass -->
    <DemoSection id="glass" title="Glass" description="Frosted glass alerts with backdrop blur. Shown on a dark background." glass>
      <div class="w-full space-y-3">
        <Alert status="info" glass title="Information">{#snippet children()}Frosted glass info alert.{/snippet}</Alert>
        <Alert status="success" glass title="Success">{#snippet children()}Glass success alert.{/snippet}</Alert>
        <Alert status="warning" glass title="Warning">{#snippet children()}Glass warning alert.{/snippet}</Alert>
        <Alert status="error" glass title="Error">{#snippet children()}Glass error alert.{/snippet}</Alert>
      </div>
    </DemoSection>

    <!-- Glow -->
    <DemoSection id="glow" title="Glow" description="Gradient glow effect behind the alert. Combine with glass for the full effect." glass>
      <div class="w-full space-y-3">
        <Alert status="info" glow title="Info Glow">{#snippet children()}Glow effect on info alert.{/snippet}</Alert>
        <Alert status="success" glass glow title="Glass + Glow">{#snippet children()}Glass and glow combined.{/snippet}</Alert>
        <Alert status="error" glass glow title="Error Glass + Glow">{#snippet children()}Glass glow on error alert.{/snippet}</Alert>
      </div>
    </DemoSection>

  </div>

  <TableOfContents {sections} />
</div>
