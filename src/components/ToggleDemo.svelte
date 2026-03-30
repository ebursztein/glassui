<script lang="ts">
  import { Toggle } from '$lib/components/toggle';
  import { meta } from '$lib/components/toggle/schema';
  import PropEditor from './PropEditor.svelte';
  import DemoSection from './DemoSection.svelte';
  import TableOfContents from './TableOfContents.svelte';

  let size = $state<string>('md');
  let checked = $state(false);
  let disabled = $state(false);
  let label = $state('Toggle me');
  let glass = $state(false);

  const values = $derived({ size, checked, disabled, label, glass });


  function enumOrFalse(v: any): string | false {
    return v === 'false' || v === false ? false : v;
  }

  function handleChange(key: string, value: any) {
    if (key === 'size') size = value;
    if (key === 'checked') checked = value;
    if (key === 'disabled') disabled = value;
    if (key === 'label') label = value;
    if (key === 'glass') glass = enumOrFalse(value);
  }

  const codeSnippet = $derived(() => {
    const props: string[] = [];
    if (size !== 'md') props.push(`size="${size}"`);
    if (checked) props.push('checked');
    if (disabled) props.push('disabled');
    if (label) props.push(`label="${label}"`);
    if (glass) props.push('glass');
    const propsStr = props.length > 0 ? ' ' + props.join(' ') : '';
    return `<Toggle${propsStr} />`;
  });

  const sections = [
    { id: 'playground', label: 'Playground' },
    { id: 'sizes', label: 'Sizes' },
    { id: 'with-label', label: 'With Label' },
    { id: 'glass', label: 'Glass' },
  ];
</script>

<div class="flex gap-10">
  <div class="flex-1 min-w-0 space-y-12">

    <!-- Interactive Playground -->
    <section id="playground" class="scroll-mt-24">
      <h2 class="text-lg font-semibold text-foreground">Playground</h2>
      <p class="mt-1 text-sm text-muted-foreground">Explore all toggle props interactively.</p>

      <!-- Live preview -->
      <div class="mt-4 rounded-lg border border-border p-8 flex items-center justify-center min-h-[100px] bg-background">
        <Toggle
          size={size as any}
          bind:checked
          {disabled}
          {label}
          glass={glass}
        />
      </div>

<!-- Code -->
      <pre class="mt-4 text-sm text-primary bg-primary/5 border border-primary/10 rounded-lg p-4 overflow-x-auto"><code>{codeSnippet()}</code></pre>

      <!-- Props -->
      <div class="mt-4 rounded-lg border border-border p-5">
        <h3 class="text-sm font-semibold text-foreground mb-4">Props</h3>
        <PropEditor props={meta.props} {values} onchange={handleChange} />
      </div>
    </section>

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
