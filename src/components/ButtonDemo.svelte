<script lang="ts">
  import { Button } from '$lib/components/button';
  import { Icon } from '$lib/components/icon';
  import { GlassBackdrop } from '$lib/components/glass';
  import { meta } from '$lib/components/button/schema';
  import PropEditor from './PropEditor.svelte';
  import DemoSection from './DemoSection.svelte';
  import TableOfContents from './TableOfContents.svelte';

  let variant = $state<string>('default');
  let size = $state<string>('md');
  let glass = $state<string | boolean>(false);
  let glassbg = $state(false);
  let glow = $state<string | boolean>(false);
  let loading = $state(false);
  let disabled = $state(false);

  // Convert 'false' string to actual false for enum props
  function enumOrFalse(v: any): string | false {
    return v === 'false' || v === false ? false : v;
  }

  const values = $derived({ variant, size, glass, glassbg, glow, loading, disabled });

  function handleChange(key: string, value: any) {
    if (key === 'variant') variant = value;
    if (key === 'size') size = value;
    if (key === 'glass') glass = enumOrFalse(value);
    if (key === 'glassbg') glassbg = value;
    if (key === 'glow') glow = enumOrFalse(value);
    if (key === 'loading') loading = value;
    if (key === 'disabled') disabled = value;
  }

  const codeSnippet = $derived(() => {
    const props: string[] = [];
    if (variant !== 'default') props.push(`variant="${variant}"`);
    if (size !== 'md') props.push(`size="${size}"`);
    if (glass) props.push(glass === true ? 'glass' : `glass="${glass}"`);
    if (glassbg) props.push('glassbg');
    if (glow) props.push(glow === true ? 'glow' : `glow="${glow}"`);
    if (loading) props.push('loading');
    if (disabled) props.push('disabled');
    const propsStr = props.length > 0 ? ' ' + props.join(' ') : '';
    return `<Button${propsStr}>Click me</Button>`;
  });

  const sections = [
    { id: 'playground', label: 'Playground' },
    { id: 'with-icons', label: 'With Icons' },
    { id: 'loading', label: 'Loading' },
    { id: 'glass', label: 'Glass Variants' },
    { id: 'glow', label: 'Glow' },
  ];
</script>

<div class="flex gap-10">
  <div class="flex-1 min-w-0 space-y-12">

    <!-- Interactive Playground -->
    <section id="playground" class="scroll-mt-24">
      <h2 class="text-lg font-semibold text-foreground">Playground</h2>
      <p class="mt-1 text-sm text-muted-foreground">Explore all button props interactively.</p>

      <!-- Live preview -->
      <div class="mt-4 rounded-lg border border-border p-8 flex items-center justify-center min-h-[100px] bg-background">
        <div>
          <Button
            variant={variant as any}
            size={size as any}
            glass={glass || false}
            glow={glow || false}
            {loading} {disabled}
          >
            {#snippet children()}Click me{/snippet}
          </Button>
        </div>
      </div>

      <!-- Code -->
      <pre class="mt-3 text-sm text-primary bg-primary/5 border border-primary/10 rounded-lg p-4 overflow-x-auto"><code>{codeSnippet()}</code></pre>

      <!-- Props -->
      <div class="mt-3 rounded-lg border border-border p-5">
        <h3 class="text-sm font-semibold text-foreground mb-4">Props</h3>
        <PropEditor props={meta.props} {values} onchange={handleChange} />
      </div>
    </section>

    <!-- With Icons -->
    <DemoSection id="with-icons" title="With Icons" description="Buttons with leading or trailing Phosphor icons.">
      <Button variant="primary">
        {#snippet children()}<Icon name="floppy-disk" size={16} weight="bold" /> Save{/snippet}
      </Button>
      <Button variant="destructive">
        {#snippet children()}<Icon name="trash" size={16} /> Delete{/snippet}
      </Button>
      <Button variant="outline">
        {#snippet children()}Next <Icon name="arrow-right" size={16} />{/snippet}
      </Button>
      <Button variant="ghost">
        {#snippet children()}<Icon name="plus" size={16} /> Add{/snippet}
      </Button>
    </DemoSection>

    <!-- Loading -->
    <DemoSection id="loading" title="Loading" description="Loading state with a spinner. The button is automatically disabled.">
      <Button variant="primary" loading>{#snippet children()}Saving...{/snippet}</Button>
      <Button variant="secondary" loading>{#snippet children()}Loading{/snippet}</Button>
      <Button variant="outline" loading>{#snippet children()}Please wait{/snippet}</Button>
    </DemoSection>

    <!-- Glass -->
    <DemoSection id="glass" title="Glass Variants" description="Frosted glass surface with themed gradient backdrop. Toggle glassbg to reveal the effect." glass>
      <Button variant="default" glass glassbg>{#snippet children()}Default{/snippet}</Button>
      <Button variant="primary" glass glassbg>{#snippet children()}Primary{/snippet}</Button>
      <Button variant="secondary" glass glassbg>{#snippet children()}Secondary{/snippet}</Button>
      <Button variant="outline" glass glassbg>{#snippet children()}Outline{/snippet}</Button>
      <Button variant="ghost" glass glassbg>{#snippet children()}Ghost{/snippet}</Button>
      <Button variant="destructive" glass glassbg>{#snippet children()}Destructive{/snippet}</Button>
    </DemoSection>

    <!-- Glow -->
    <DemoSection id="glow" title="Glow" description="Gradient glow behind the button. Colors follow the active theme preset." glass>
      <Button variant="default" glow>{#snippet children()}Solid Glow{/snippet}</Button>
      <Button variant="primary" glow>{#snippet children()}Primary Glow{/snippet}</Button>
      <Button variant="primary" glass glassbg glow>{#snippet children()}Glass + Glow{/snippet}</Button>
    </DemoSection>

  </div>

  <TableOfContents {sections} />
</div>
