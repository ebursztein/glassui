<script lang="ts">
  import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '$lib/components/card';
  import { Button } from '$lib/components/button';
  import { Input } from '$lib/components/input';
  import { Badge } from '$lib/components/badge';
  import { Toggle } from '$lib/components/toggle';
  import DemoSection from './DemoSection.svelte';
  import TableOfContents from './TableOfContents.svelte';

  const sections = [
    { id: 'kitchen-sink', label: 'All Effects' },
    { id: 'solid-vs-glass', label: 'Solid vs Glass' },
    { id: 'neutral-vs-colored', label: 'Neutral vs Colored' },
    { id: 'tint', label: 'Tint Strength' },
    { id: 'carved-fields', label: 'Depth Stacking' },
    { id: 'reactive', label: 'Reactive Glow' },
    { id: 'density', label: 'Density Levels' },
  ];
</script>

<div class="flex gap-10">
  <div class="flex-1 min-w-0 space-y-12">

    <!-- Kitchen Sink -->
    <DemoSection id="kitchen-sink" title="All Effects" description="Every glass effect combination in one grid." glass>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
        <Card glass color="primary">
          {#snippet children()}
            <CardContent>{#snippet children()}<p class="text-sm font-medium">Glass</p><p class="text-xs opacity-70 mt-1">glass color="primary"</p>{/snippet}</CardContent>
          {/snippet}
        </Card>
        <Card glass color="primary" raised>
          {#snippet children()}
            <CardContent>{#snippet children()}<p class="text-sm font-medium">Glass + Raised</p><p class="text-xs opacity-70 mt-1">glass raised</p>{/snippet}</CardContent>
          {/snippet}
        </Card>
        <Card glass color="primary" glow>
          {#snippet children()}
            <CardContent>{#snippet children()}<p class="text-sm font-medium">Glass + Glow</p><p class="text-xs opacity-70 mt-1">glass glow</p>{/snippet}</CardContent>
          {/snippet}
        </Card>
        <Card glass color="secondary" colored>
          {#snippet children()}
            <CardContent>{#snippet children()}<p class="text-sm font-medium">Glass + Colored</p><p class="text-xs opacity-70 mt-1">glass colored color="secondary"</p>{/snippet}</CardContent>
          {/snippet}
        </Card>
        <Card glass color="accent" reactive>
          {#snippet children()}
            <CardContent>{#snippet children()}<p class="text-sm font-medium">Glass + Reactive</p><p class="text-xs opacity-70 mt-1">glass reactive color="accent"</p>{/snippet}</CardContent>
          {/snippet}
        </Card>
        <Card glass color="accent" colored glow reactive>
          {#snippet children()}
            <CardContent>{#snippet children()}<p class="text-sm font-medium">Everything</p><p class="text-xs opacity-70 mt-1">glass colored glow reactive</p>{/snippet}</CardContent>
          {/snippet}
        </Card>
      </div>
    </DemoSection>

    <!-- Solid vs Glass -->
    <DemoSection id="solid-vs-glass" title="Solid vs Glass" description="Same card, one solid and one glass. Glass adds translucent surface, edge highlights, and graduated shadow." glass>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        <Card>
          {#snippet children()}
            <CardHeader>
              {#snippet children()}
                <CardTitle>{#snippet children()}Solid Card{/snippet}</CardTitle>
                <CardDescription>{#snippet children()}Default opaque surface{/snippet}</CardDescription>
              {/snippet}
            </CardHeader>
            <CardContent>
              {#snippet children()}
                <Input placeholder="Solid input" />
              {/snippet}
            </CardContent>
            <CardFooter>
              {#snippet children()}<Button size="sm">{#snippet children()}Save{/snippet}</Button>{/snippet}
            </CardFooter>
          {/snippet}
        </Card>
        <Card glass color="primary">
          {#snippet children()}
            <CardHeader>
              {#snippet children()}
                <CardTitle>{#snippet children()}Glass Card{/snippet}</CardTitle>
                <CardDescription>{#snippet children()}Translucent with auto-blur{/snippet}</CardDescription>
              {/snippet}
            </CardHeader>
            <CardContent>
              {#snippet children()}
                <Input placeholder="Carved input" />
              {/snippet}
            </CardContent>
            <CardFooter>
              {#snippet children()}<Button size="sm">{#snippet children()}Save{/snippet}</Button>{/snippet}
            </CardFooter>
          {/snippet}
        </Card>
      </div>
    </DemoSection>

    <!-- Neutral vs Colored -->
    <DemoSection id="neutral-vs-colored" title="Neutral vs Colored" description="Without color prop, glass is neutral gray. With color prop, glass tints to the theme color. The colored prop adds gradient orbs that follow the component color." glass>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
        <Card glass>
          {#snippet children()}
            <CardContent>{#snippet children()}<p class="text-sm font-medium">Neutral</p><p class="text-xs opacity-70 mt-1">glass (no color)</p>{/snippet}</CardContent>
          {/snippet}
        </Card>
        <Card glass color="primary">
          {#snippet children()}
            <CardContent>{#snippet children()}<p class="text-sm font-medium">Primary</p><p class="text-xs opacity-70 mt-1">glass color="primary"</p>{/snippet}</CardContent>
          {/snippet}
        </Card>
        <Card glass color="primary" colored>
          {#snippet children()}
            <CardContent>{#snippet children()}<p class="text-sm font-medium">Primary + Colored</p><p class="text-xs opacity-70 mt-1">glass color="primary" colored</p>{/snippet}</CardContent>
          {/snippet}
        </Card>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mt-4">
        <Card glass color="accent">
          {#snippet children()}
            <CardContent>{#snippet children()}<p class="text-sm font-medium">Accent</p><p class="text-xs opacity-70 mt-1">glass color="accent"</p>{/snippet}</CardContent>
          {/snippet}
        </Card>
        <Card glass color="accent" colored>
          {#snippet children()}
            <CardContent>{#snippet children()}<p class="text-sm font-medium">Accent + Colored</p><p class="text-xs opacity-70 mt-1">glass color="accent" colored</p>{/snippet}</CardContent>
          {/snippet}
        </Card>
        <Card glass color="secondary" colored>
          {#snippet children()}
            <CardContent>{#snippet children()}<p class="text-sm font-medium">Secondary + Colored</p><p class="text-xs opacity-70 mt-1">glass color="secondary" colored</p>{/snippet}</CardContent>
          {/snippet}
        </Card>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mt-4">
        <Card glass color="gradient">
          {#snippet children()}
            <CardContent>{#snippet children()}<p class="text-sm font-medium">Theme Gradient</p><p class="text-xs opacity-70 mt-1">glass color="gradient"</p>{/snippet}</CardContent>
          {/snippet}
        </Card>
        <Card glass color="gradient" colored>
          {#snippet children()}
            <CardContent>{#snippet children()}<p class="text-sm font-medium">Theme + Colored</p><p class="text-xs opacity-70 mt-1">glass color="gradient" colored</p>{/snippet}</CardContent>
          {/snippet}
        </Card>
      </div>
    </DemoSection>

    <!-- Tint Strength -->
    <DemoSection id="tint" title="Tint Strength" description="The tint prop controls how saturated the glass color is. Subtle for backgrounds, vivid for emphasis." glass>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
        <Card glass color="gradient" tint="subtle">
          {#snippet children()}
            <CardContent>{#snippet children()}<p class="text-sm font-medium">Subtle</p><p class="text-xs opacity-70 mt-1">tint="subtle" (35%)</p>{/snippet}</CardContent>
          {/snippet}
        </Card>
        <Card glass color="gradient" tint="medium">
          {#snippet children()}
            <CardContent>{#snippet children()}<p class="text-sm font-medium">Medium</p><p class="text-xs opacity-70 mt-1">tint="medium" (65%)</p>{/snippet}</CardContent>
          {/snippet}
        </Card>
        <Card glass color="gradient">
          {#snippet children()}
            <CardContent>{#snippet children()}<p class="text-sm font-medium">Vivid (default)</p><p class="text-xs opacity-70 mt-1">no tint (100%)</p>{/snippet}</CardContent>
          {/snippet}
        </Card>
      </div>
    </DemoSection>

    <!-- Depth Stacking -->
    <DemoSection id="carved-fields" title="Depth Stacking" description="Card-in-card with controls at each level. Inputs carve in, buttons rise above. Inner card inherits theme color." glass>
      <div class="w-full max-w-2xl">
        <Card glass color="gradient" tint="medium">
          {#snippet children()}
            <CardContent>
              {#snippet children()}
                <p class="text-xs opacity-70 mb-3">Outer card (depth 0, theme)</p>
                <div class="space-y-3 mb-4">
                  <Input placeholder="Outer input (carved)" />
                  <div class="flex gap-2">
                    <Button size="sm">{#snippet children()}Outer button{/snippet}</Button>
                    <Toggle label="Toggle" />
                  </div>
                </div>
                <Card glass>
                  {#snippet children()}
                    <CardContent>
                      {#snippet children()}
                        <p class="text-xs opacity-70 mb-3">Inner card (depth 1, inherits theme)</p>
                        <div class="space-y-3">
                          <Input placeholder="Inner input (deeper carve)" />
                          <div class="flex gap-2">
                            <Button size="sm">{#snippet children()}Inner button{/snippet}</Button>
                            <Badge>{#snippet children()}Badge{/snippet}</Badge>
                          </div>
                        </div>
                      {/snippet}
                    </CardContent>
                  {/snippet}
                </Card>
              {/snippet}
            </CardContent>
          {/snippet}
        </Card>
      </div>
    </DemoSection>

    <!-- Reactive Glow -->
    <DemoSection id="reactive" title="Reactive Glow" description="Hover your mouse over each card. A radial glow follows the pointer across the surface and catches the border." glass>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
        <Card glass reactive color="primary">
          {#snippet children()}
            <CardContent>{#snippet children()}<p class="text-sm font-medium">Primary Reactive</p><p class="text-xs opacity-70 mt-1">Hover me</p>{/snippet}</CardContent>
          {/snippet}
        </Card>
        <Card glass="thick" reactive color="secondary">
          {#snippet children()}
            <CardContent>{#snippet children()}<p class="text-sm font-medium">Secondary Thick</p><p class="text-xs opacity-70 mt-1">Hover me</p>{/snippet}</CardContent>
          {/snippet}
        </Card>
        <Card glass reactive glow color="accent">
          {#snippet children()}
            <CardContent>{#snippet children()}<p class="text-sm font-medium">Accent + Glow</p><p class="text-xs opacity-70 mt-1">Hover me</p>{/snippet}</CardContent>
          {/snippet}
        </Card>
      </div>
    </DemoSection>

    <!-- Density Levels -->
    <DemoSection id="density" title="Density Levels" description="Five levels from ultra-thin to ultra-thick. Higher density = stronger surface tint, deeper shadow, and internal diffusion at thick+." glass>
      <div class="grid grid-cols-1 md:grid-cols-5 gap-3 w-full">
        {#each ['ultra-thin', 'thin', 'normal', 'thick', 'ultra-thick'] as level}
          <Card glass={level} color="primary">
            {#snippet children()}
              <CardContent>
                {#snippet children()}
                  <p class="text-sm font-medium">{level}</p>
                {/snippet}
              </CardContent>
            {/snippet}
          </Card>
        {/each}
      </div>
    </DemoSection>

  </div>

  <TableOfContents {sections} />
</div>
