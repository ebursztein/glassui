<script lang="ts">
  import { Button } from '$lib/components/button';
  import { Icon } from '$lib/components/icon';
  import { meta } from '$lib/components/button/schema';
  import Playground from './Playground.svelte';
  import DemoSection from './DemoSection.svelte';
  import TableOfContents from './TableOfContents.svelte';

  const sections = [
    { id: 'playground', label: 'Playground' },
    { id: 'colors', label: 'Colors' },
    { id: 'styles', label: 'Styles' },
    { id: 'with-icons', label: 'With Icons' },
    { id: 'loading', label: 'Loading' },
    { id: 'glass', label: 'Glass' },
    { id: 'effects', label: 'Effects' },
  ];
</script>

<div class="flex gap-10">
  <div class="flex-1 min-w-0 space-y-12">

    <Playground {meta} childrenCode="Click me">
      {#snippet preview(props)}
        <Button {...props}>{#snippet children()}Click me{/snippet}</Button>
      {/snippet}
    </Playground>

    <!-- Colors -->
    <DemoSection id="colors" title="Colors" description="Theme colors. These follow the active theme preset.">
      <Button color="primary">{#snippet children()}Primary{/snippet}</Button>
      <Button color="secondary">{#snippet children()}Secondary{/snippet}</Button>
      <Button color="accent">{#snippet children()}Accent{/snippet}</Button>
      <Button color="destructive">{#snippet children()}Destructive{/snippet}</Button>
      <Button color="neutral">{#snippet children()}Neutral{/snippet}</Button>
    </DemoSection>

    <!-- Styles -->
    <DemoSection id="styles" title="Styles" description="Render styles applied to each color.">
      <Button color="primary" style="solid">{#snippet children()}Solid{/snippet}</Button>
      <Button color="primary" style="outline">{#snippet children()}Outline{/snippet}</Button>
      <Button color="primary" style="ghost">{#snippet children()}Ghost{/snippet}</Button>
    </DemoSection>

    <!-- With Icons -->
    <DemoSection id="with-icons" title="With Icons" description="Buttons with leading or trailing Phosphor icons.">
      <Button color="primary">
        {#snippet children()}<Icon name="floppy-disk" size={16} weight="bold" /> Save{/snippet}
      </Button>
      <Button color="destructive">
        {#snippet children()}<Icon name="trash" size={16} /> Delete{/snippet}
      </Button>
      <Button color="neutral" style="outline">
        {#snippet children()}Next <Icon name="arrow-right" size={16} />{/snippet}
      </Button>
      <Button color="neutral" style="ghost">
        {#snippet children()}<Icon name="plus" size={16} /> Add{/snippet}
      </Button>
    </DemoSection>

    <!-- Loading -->
    <DemoSection id="loading" title="Loading" description="Loading state with a spinner. The button is automatically disabled.">
      <Button color="primary" loading>{#snippet children()}Saving...{/snippet}</Button>
      <Button color="secondary" loading>{#snippet children()}Loading{/snippet}</Button>
      <Button color="neutral" style="outline" loading>{#snippet children()}Please wait{/snippet}</Button>
    </DemoSection>

    <!-- Glass -->
    <DemoSection id="glass" title="Glass" description="Frosted glass surface. Theme color shows through as translucent tint." glass>
      <Button color="primary" glass frosted>{#snippet children()}Primary{/snippet}</Button>
      <Button color="secondary" glass frosted>{#snippet children()}Secondary{/snippet}</Button>
      <Button color="accent" glass frosted>{#snippet children()}Accent{/snippet}</Button>
      <Button color="neutral" glass frosted>{#snippet children()}Neutral{/snippet}</Button>
      <Button color="neutral" style="outline" glass frosted>{#snippet children()}Outline{/snippet}</Button>
      <Button color="neutral" style="ghost" glass frosted>{#snippet children()}Ghost{/snippet}</Button>
    </DemoSection>

    <!-- Effects -->
    <DemoSection id="effects" title="Effects" description="Composable visual effects: raised, glow, colored." glass>
      <Button color="primary" raised>{#snippet children()}Raised{/snippet}</Button>
      <Button color="primary" glow>{#snippet children()}Glow{/snippet}</Button>
      <Button color="primary" glass frosted raised glow>{#snippet children()}Glass + Raised + Glow{/snippet}</Button>
    </DemoSection>

  </div>

  <TableOfContents {sections} />
</div>
