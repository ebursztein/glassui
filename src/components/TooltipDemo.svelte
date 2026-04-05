<script lang="ts">
  import DemoSection from './DemoSection.svelte';
  import Playground from './Playground.svelte';
  import { meta } from '$lib/components/tooltip/schema';
  import { Tooltip, TooltipTrigger, TooltipContent } from '$lib/components/tooltip';
  import { Button } from '$lib/components/button';
  import { Icon } from '$lib/components/icon';
</script>

<div class="space-y-16">
  <header>
    <h1 class="text-4xl font-bold tracking-tight text-foreground">{meta.name}</h1>
    <p class="mt-4 text-lg text-muted-foreground">{meta.description}</p>
  </header>

  <Playground {meta}>
    {#snippet preview(props)}
      <div class="w-full h-32 flex items-center justify-center relative">
        <Tooltip {...props}>
          <TooltipTrigger>
            <Button>Hover me</Button>
          </TooltipTrigger>
          <TooltipContent>
            This is a popup tooltip.
          </TooltipContent>
        </Tooltip>
      </div>
    {/snippet}
  </Playground>

  <DemoSection id="placement" title="Placements" description="Tooltips can be positioned around their trigger.">
    <div class="w-full h-48 flex items-center justify-center gap-8 relative">
      <Tooltip placement="top">
        <TooltipTrigger><Button color="neutral" style="outline">Top</Button></TooltipTrigger>
        <TooltipContent>Tooltip on top</TooltipContent>
      </Tooltip>
      
      <Tooltip placement="bottom">
        <TooltipTrigger><Button color="neutral" style="outline">Bottom</Button></TooltipTrigger>
        <TooltipContent>Tooltip on bottom</TooltipContent>
      </Tooltip>

      <Tooltip placement="right">
        <TooltipTrigger><Button color="neutral" style="outline">Right</Button></TooltipTrigger>
        <TooltipContent>Tooltip on right</TooltipContent>
      </Tooltip>
      
      <Tooltip placement="left">
        <TooltipTrigger><Button color="neutral" style="outline">Left</Button></TooltipTrigger>
        <TooltipContent>Tooltip on left</TooltipContent>
      </Tooltip>
    </div>
  </DemoSection>

  <DemoSection id="glass" title="Glass Overlay" description="When placed inside a glass container, tooltips seamlessly adopt translucent optics.">
    <div class="w-full h-48 flex items-center justify-center gap-6 relative bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl border border-line-2">
      <Tooltip glass="normal" color="gradient">
        <TooltipTrigger><Button glass><Icon name="info" size={16} /> Gradient Tooltip</Button></TooltipTrigger>
        <TooltipContent>
          Beautifully frosted.
        </TooltipContent>
      </Tooltip>

      <Tooltip glass="normal" color="destructive">
        <TooltipTrigger><Button glass><Icon name="warning" size={16} /> Destructive Tooltip</Button></TooltipTrigger>
        <TooltipContent>
          Warning information here.
        </TooltipContent>
      </Tooltip>
    </div>
  </DemoSection>
</div>