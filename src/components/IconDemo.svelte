<script lang="ts">
  import { Icon } from '$lib/components/icon';
  import { meta } from '$lib/components/icon/schema';
  import PropEditor from './PropEditor.svelte';
  import DemoSection from './DemoSection.svelte';
  import TableOfContents from './TableOfContents.svelte';

  let name = $state('heart');
  let weight = $state<string>('regular');
  let size = $state<number>(32);
  let color = $state('');

  const values = $derived({ name, weight, size: String(size), color });

  function handleChange(key: string, value: any) {
    if (key === 'name') name = value;
    if (key === 'weight') weight = value;
    if (key === 'size') size = Number(value) || 24;
    if (key === 'color') color = value;
  }

  const codeSnippet = $derived(() => {
    const props: string[] = [`name="${name}"`];
    if (size !== 24) props.push(`size={${size}}`);
    if (weight !== 'regular') props.push(`weight="${weight}"`);
    if (color) props.push(`color="${color}"`);
    return `<Icon ${props.join(' ')} />`;
  });

  const sampleIcons = [
    'house', 'gear', 'heart', 'magnifying-glass', 'bell', 'user',
    'star', 'lightning', 'check', 'x',
    'arrow-right', 'arrow-left', 'plus', 'minus',
    'eye', 'eye-slash', 'lock', 'lock-open',
  ];

  const sections = [
    { id: 'playground', label: 'Playground' },
    { id: 'weights', label: 'Weights' },
    { id: 'sizes', label: 'Sizes' },
  ];
</script>

<div class="flex gap-10">
  <div class="flex-1 min-w-0 space-y-12">

    <!-- Interactive Playground -->
    <section id="playground" class="scroll-mt-24">
      <h2 class="text-lg font-semibold text-foreground">Playground</h2>
      <p class="mt-1 text-sm text-muted-foreground">Explore icon props interactively. Click any icon below to preview it.</p>

      <!-- Live preview -->
      <div class="mt-4 rounded-lg border border-border p-8 flex items-center justify-center min-h-[100px] bg-background">
        <Icon {name} {size} weight={weight as any} color={color || undefined} />
      </div>

      <!-- Icon gallery for selection -->
      <div class="mt-4 rounded-lg border border-border p-4">
        <div class="grid grid-cols-6 sm:grid-cols-9 gap-2">
          {#each sampleIcons as iconName}
            <button
              class="flex flex-col items-center gap-1.5 p-2.5 rounded-lg transition-colors {name === iconName ? 'bg-primary/10 text-primary' : 'hover:bg-layer-hover text-foreground'}"
              onclick={() => name = iconName}
            >
              <Icon name={iconName} size={20} weight={weight as any} />
              <span class="text-[9px] text-muted-foreground text-center leading-tight">{iconName}</span>
            </button>
          {/each}
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

    <!-- Weights -->
    <DemoSection id="weights" title="Weights" description="Phosphor icons support 6 weight variants. Each weight changes the visual density of the icon.">
      <div class="grid grid-cols-6 gap-6">
        {#each ['thin', 'light', 'regular', 'bold', 'fill', 'duotone'] as w}
          <div class="flex flex-col items-center gap-2">
            <Icon name="heart" size={32} weight={w as any} />
            <span class="text-xs text-muted-foreground">{w}</span>
          </div>
        {/each}
      </div>
    </DemoSection>

    <!-- Sizes -->
    <DemoSection id="sizes" title="Sizes" description="Icons can be rendered at any pixel size.">
      <div class="flex items-end gap-6">
        {#each [16, 20, 24, 32, 40, 48] as s}
          <div class="flex flex-col items-center gap-2">
            <Icon name="star" size={s} weight="fill" />
            <span class="text-xs text-muted-foreground">{s}px</span>
          </div>
        {/each}
      </div>
    </DemoSection>

  </div>

  <TableOfContents {sections} />
</div>
