<script lang="ts">
  import DemoSection from './DemoSection.svelte';
  import Playground from './Playground.svelte';
  import { meta } from '$lib/components/layout-splitter/schema';
  import { LayoutSplitter } from '$lib/components/layout-splitter';
</script>

<div class="space-y-16">
  <header>
    <h1 class="text-4xl font-bold tracking-tight text-foreground">{meta.name}</h1>
    <p class="mt-4 text-lg text-muted-foreground">{meta.description}</p>
  </header>

  <Playground {meta}>
    {#snippet preview(props)}
      <div class="w-full h-64 max-w-4xl mx-auto">
        <LayoutSplitter {...props}>
          {#snippet panel1()}
            <div class="w-full h-full flex flex-col items-center justify-center p-4 bg-layer text-muted-foreground text-sm font-medium">
              Left Panel
            </div>
          {/snippet}
          {#snippet panel2()}
            <div class="w-full h-full flex flex-col items-center justify-center p-4 bg-surface text-foreground text-sm font-medium">
              Right Panel
            </div>
          {/snippet}
        </LayoutSplitter>
      </div>
    {/snippet}
  </Playground>

  <DemoSection id="vertical" title="Vertical Orientation" description="You can stack panes vertically with orientation='vertical'.">
    <div class="w-full h-96 max-w-4xl mx-auto">
      <LayoutSplitter orientation="vertical" color="success">
        {#snippet panel1()}
          <div class="w-full h-full p-4 bg-layer font-mono text-xs text-muted-foreground">
            &lt;TopPane&gt;<br/>
            &nbsp;&nbsp;&lt;!-- Code editor area --&gt;<br/>
            &lt;/TopPane&gt;
          </div>
        {/snippet}
        {#snippet panel2()}
          <div class="w-full h-full p-4 bg-surface text-sm font-mono flex items-center justify-center text-success">
            > terminal connected.
          </div>
        {/snippet}
      </LayoutSplitter>
    </div>
  </DemoSection>
</div>