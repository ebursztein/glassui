<script lang="ts">
  import DemoSection from './DemoSection.svelte';
  import Playground from './Playground.svelte';
  import { meta, type TreeItem } from '$lib/components/tree-view/schema';
  import { TreeView } from '$lib/components/tree-view';
  import { Badge } from '$lib/components/badge';

  const demoItems: TreeItem[] = [
    {
      id: '1',
      label: 'src',
      children: [
        {
          id: '2',
          label: 'components',
          children: [
            { id: '3', label: 'Button.svelte' },
            { id: '4', label: 'Card.svelte' },
            { id: '5', label: 'TreeView.svelte' }
          ]
        },
        {
          id: '6',
          label: 'utils',
          children: [
            { id: '7', label: 'cn.ts' },
            { id: '8', label: 'math.ts', disabled: true }
          ]
        },
        { id: '9', label: 'index.ts' }
      ]
    },
    {
      id: '10',
      label: 'public',
      children: [
        { id: '11', label: 'favicon.ico' },
        { id: '12', label: 'robots.txt' }
      ]
    },
    { id: '13', label: 'package.json' },
    { id: '14', label: 'README.md' }
  ];

  let selectedFiles = $state<string[]>(['3', '7']);
</script>

<div class="space-y-16">
  <header>
    <h1 class="text-4xl font-bold tracking-tight text-foreground">{meta.name}</h1>
    <p class="mt-4 text-lg text-muted-foreground">{meta.description}</p>
  </header>

  <Playground {meta}>
    {#snippet preview(props)}
      <div class="w-full max-w-md border border-line-2 bg-layer rounded-2xl">
        <TreeView items={demoItems} {...props} />
      </div>
    {/snippet}
  </Playground>

  <DemoSection id="selectable" title="Cascading Selection" description="Bind to the `selected` prop to track checked files. When `autoSelectChildren` is true, selecting a folder automatically selects its descendants, and partial selections result in an indeterminate dash state.">
    <div class="w-full max-w-md mx-auto space-y-4">
      <div class="border border-line-2 bg-surface rounded-2xl">
        <TreeView
          items={demoItems}
          selectable
          autoSelectChildren
          bind:selected={selectedFiles}
        />
      </div>
      
      <div class="p-4 bg-layer border border-line-2 rounded-xl">
        <p class="text-sm font-medium text-foreground mb-2">Selected Node IDs:</p>
        <div class="flex flex-wrap gap-2">
          {#each selectedFiles as id}
            <Badge color="primary" style="ghost">{id}</Badge>
          {:else}
            <span class="text-sm text-muted-foreground">None</span>
          {/each}
        </div>
      </div>
    </div>
  </DemoSection>
</div>