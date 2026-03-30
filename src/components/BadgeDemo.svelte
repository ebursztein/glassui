<script lang="ts">
  import { Badge } from '$lib/components/badge';
  import { meta } from '$lib/components/badge/schema';
  import PropEditor from './PropEditor.svelte';
  import DemoSection from './DemoSection.svelte';
  import TableOfContents from './TableOfContents.svelte';

  let variant = $state<string>('default');
  let size = $state<string>('sm');
  let status = $state<string>('');
  let dot = $state(false);
  let glass = $state(false);

  const values = $derived({ variant, size, status, dot, glass });


  function enumOrFalse(v: any): string | false {
    return v === 'false' || v === false ? false : v;
  }

  function handleChange(key: string, value: any) {
    if (key === 'variant') variant = value;
    if (key === 'size') size = value;
    if (key === 'status') status = value;
    if (key === 'dot') dot = value;
    if (key === 'glass') glass = enumOrFalse(value);
  }

  const codeSnippet = $derived(() => {
    const props: string[] = [];
    if (variant !== 'default') props.push(`variant="${variant}"`);
    if (size !== 'sm') props.push(`size="${size}"`);
    if (status) props.push(`status="${status}"`);
    if (dot) props.push('dot');
    if (glass) props.push('glass');
    const propsStr = props.length > 0 ? ' ' + props.join(' ') : '';
    return `<Badge${propsStr}>Label</Badge>`;
  });

  const sections = [
    { id: 'playground', label: 'Playground' },
    { id: 'status', label: 'Status' },
    { id: 'dot', label: 'Dot Indicator' },
    { id: 'glass-variants', label: 'Glass Variants' },
  ];
</script>

<div class="flex gap-10">
  <div class="flex-1 min-w-0 space-y-12">

    <!-- Interactive Playground -->
    <section id="playground" class="scroll-mt-24">
      <h2 class="text-lg font-semibold text-foreground">Playground</h2>
      <p class="mt-1 text-sm text-muted-foreground">Explore all badge props interactively.</p>

      <!-- Live preview -->
      <div class="mt-4 rounded-lg border border-border p-8 flex items-center justify-center min-h-[100px] bg-background">
        <Badge
          variant={variant as any}
          size={size as any}
          status={status ? status as any : undefined}
          {dot}
          glass={glass}
        >
          {#snippet children()}Label{/snippet}
        </Badge>
      </div>

<!-- Code -->
      <pre class="mt-4 text-sm text-primary bg-primary/5 border border-primary/10 rounded-lg p-4 overflow-x-auto"><code>{codeSnippet()}</code></pre>

      <!-- Props -->
      <div class="mt-4 rounded-lg border border-border p-5">
        <h3 class="text-sm font-semibold text-foreground mb-4">Props</h3>
        <PropEditor props={meta.props} {values} onchange={handleChange} />
      </div>
    </section>

    <!-- Status -->
    <DemoSection id="status" title="Status" description="Status-colored badges for contextual information. Status overrides the variant color.">
      <Badge status="info">{#snippet children()}Info{/snippet}</Badge>
      <Badge status="success">{#snippet children()}Success{/snippet}</Badge>
      <Badge status="warning">{#snippet children()}Warning{/snippet}</Badge>
      <Badge status="error">{#snippet children()}Error{/snippet}</Badge>
    </DemoSection>

    <!-- Dot Indicator -->
    <DemoSection id="dot" title="Dot Indicator" description="Badges with a dot indicator before the text for additional visual signaling.">
      <Badge dot>{#snippet children()}Default{/snippet}</Badge>
      <Badge dot status="info">{#snippet children()}Info{/snippet}</Badge>
      <Badge dot status="success">{#snippet children()}Active{/snippet}</Badge>
      <Badge dot status="warning">{#snippet children()}Pending{/snippet}</Badge>
      <Badge dot status="error">{#snippet children()}Offline{/snippet}</Badge>
    </DemoSection>

    <!-- Glass Variants -->
    <DemoSection id="glass-variants" title="Glass Variants" description="Frosted glass badges with backdrop blur. Best on dark or gradient backgrounds." glass>
      <Badge variant="default" glass>{#snippet children()}Default{/snippet}</Badge>
      <Badge variant="primary" glass>{#snippet children()}Primary{/snippet}</Badge>
      <Badge variant="secondary" glass>{#snippet children()}Secondary{/snippet}</Badge>
      <Badge variant="outline" glass>{#snippet children()}Outline{/snippet}</Badge>
      <Badge variant="destructive" glass>{#snippet children()}Destructive{/snippet}</Badge>
      <Badge status="info" glass>{#snippet children()}Info{/snippet}</Badge>
      <Badge status="success" glass>{#snippet children()}Success{/snippet}</Badge>
      <Badge status="warning" glass>{#snippet children()}Warning{/snippet}</Badge>
      <Badge status="error" glass>{#snippet children()}Error{/snippet}</Badge>
    </DemoSection>

  </div>

  <TableOfContents {sections} />
</div>
