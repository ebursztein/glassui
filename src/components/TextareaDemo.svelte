<script lang="ts">
  import { Textarea } from '$lib/components/textarea';
  import { meta } from '$lib/components/textarea/schema';
  import PropEditor from './PropEditor.svelte';
  import DemoSection from './DemoSection.svelte';
  import TableOfContents from './TableOfContents.svelte';

  let size = $state<string>('md');
  let status = $state<string>('');
  let resize = $state<string>('vertical');
  let glass = $state(false);
  let glow = $state(false);
  let disabled = $state(false);

  const values = $derived({ size, status, resize, glass, glow, disabled });


  function enumOrFalse(v: any): string | false {
    return v === 'false' || v === false ? false : v;
  }

  function handleChange(key: string, value: any) {
    if (key === 'size') size = value;
    if (key === 'status') status = value;
    if (key === 'resize') resize = value;
    if (key === 'glass') glass = enumOrFalse(value);
    if (key === 'glow') glow = enumOrFalse(value);
    if (key === 'disabled') disabled = value;
  }

  const codeSnippet = $derived(() => {
    const props: string[] = [];
    if (size !== 'md') props.push(`size="${size}"`);
    if (status) props.push(`status="${status}"`);
    if (resize !== 'vertical') props.push(`resize="${resize}"`);
    if (glass) props.push('glass');
    if (glow) props.push('glow');
    if (disabled) props.push('disabled');
    const propsStr = props.length > 0 ? ' ' + props.join(' ') : '';
    return `<Textarea label="Message"${propsStr} placeholder="Write something..." />`;
  });

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

    <!-- Interactive Playground -->
    <section id="playground" class="scroll-mt-24">
      <h2 class="text-lg font-semibold text-foreground">Playground</h2>
      <p class="mt-1 text-sm text-muted-foreground">Explore all textarea props interactively.</p>

      <!-- Live preview -->
      <div class="mt-4 rounded-lg border border-border p-8 flex items-center justify-center min-h-[100px] bg-background">
        <div class="w-full max-w-sm">
          <Textarea
            label="Message"
            placeholder="Write something..."
            size={size as any}
            status={status ? status as any : undefined}
            resize={resize as any}
            {glass} {glow} {disabled}
          />
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
        <Textarea label="Glass" placeholder="Frosted textarea" glass rows={3} />
        <Textarea label="Glass + Glow" placeholder="Focus to see glow" glass glow rows={3} />
      </div>
    </DemoSection>

  </div>

  <TableOfContents {sections} />
</div>
