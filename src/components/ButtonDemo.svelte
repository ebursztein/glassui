<script lang="ts">
  import { Button } from '$lib/components/button';
  import { Icon } from '$lib/components/icon';
  import { meta } from '$lib/components/button/schema';
  import Playground from './Playground.svelte';
  import DemoSection from './DemoSection.svelte';
  import TableOfContents from './TableOfContents.svelte';

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

    <Playground {meta}>
      {#snippet preview(props)}
        <Button {...props}>{#snippet children()}Click me{/snippet}</Button>
      {/snippet}
    </Playground>

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
