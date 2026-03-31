<script lang="ts">
  import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '$lib/components/card';
  import { Button } from '$lib/components/button';
  import { Input } from '$lib/components/input';
  import { meta } from '$lib/components/card/schema';
  import Playground from './Playground.svelte';
  import DemoSection from './DemoSection.svelte';
  import TableOfContents from './TableOfContents.svelte';

  const sections = [
    { id: 'playground', label: 'Playground' },
    { id: 'hover-effects', label: 'Hover Effects' },
    { id: 'glass', label: 'Glass' },
    { id: 'glow', label: 'Glow' },
  ];
</script>

<div class="flex gap-10">
  <div class="flex-1 min-w-0 space-y-12">

    <Playground {meta} class="min-h-[280px]">
      {#snippet preview(props)}
        <div class="w-full max-w-md">
          <Card {...props}>
            {#snippet children()}
              <CardHeader>
                {#snippet children()}
                  <CardTitle>{#snippet children()}Card Title{/snippet}</CardTitle>
                  <CardDescription>{#snippet children()}A short description of this card's content.{/snippet}</CardDescription>
                {/snippet}
              </CardHeader>
              <CardContent>
                {#snippet children()}
                  <Input placeholder="Type something..." />
                {/snippet}
              </CardContent>
              <CardFooter>
                {#snippet children()}
                  <Button size="sm">{#snippet children()}Save{/snippet}</Button>
                {/snippet}
              </CardFooter>
            {/snippet}
          </Card>
        </div>
      {/snippet}
    </Playground>

    <!-- Hover Effects -->
    <DemoSection id="hover-effects" title="Hover Effects" description="Interactive hover animations. Try hovering each card.">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
        <Card hover="lift">
          {#snippet children()}
            <CardContent>
              {#snippet children()}
                <p class="text-sm font-medium text-foreground">Lift</p>
                <p class="text-xs text-muted-foreground mt-1">hover="lift"</p>
              {/snippet}
            </CardContent>
          {/snippet}
        </Card>
        <Card hover="brighten">
          {#snippet children()}
            <CardContent>
              {#snippet children()}
                <p class="text-sm font-medium text-foreground">Brighten</p>
                <p class="text-xs text-muted-foreground mt-1">hover="brighten"</p>
              {/snippet}
            </CardContent>
          {/snippet}
        </Card>
        <Card hover="glow">
          {#snippet children()}
            <CardContent>
              {#snippet children()}
                <p class="text-sm font-medium text-foreground">Glow</p>
                <p class="text-xs text-muted-foreground mt-1">hover="glow"</p>
              {/snippet}
            </CardContent>
          {/snippet}
        </Card>
      </div>
    </DemoSection>

    <!-- Glass -->
    <DemoSection id="glass" title="Glass" description="Frosted glass surface with backdrop blur. Shown on a dark background." glass>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        <Card glass>
          {#snippet children()}
            <CardHeader>
              {#snippet children()}
                <CardTitle>{#snippet children()}Glass Card{/snippet}</CardTitle>
                <CardDescription>{#snippet children()}Frosted glass surface{/snippet}</CardDescription>
              {/snippet}
            </CardHeader>
            <CardContent>
              {#snippet children()}
                <p class="text-sm text-muted-foreground-2">Translucent with backdrop blur.</p>
              {/snippet}
            </CardContent>
          {/snippet}
        </Card>
        <Card glass="subtle">
          {#snippet children()}
            <CardHeader>
              {#snippet children()}
                <CardTitle>{#snippet children()}Subtle Glass{/snippet}</CardTitle>
                <CardDescription>{#snippet children()}glass="subtle"{/snippet}</CardDescription>
              {/snippet}
            </CardHeader>
            <CardContent>
              {#snippet children()}
                <p class="text-sm text-muted-foreground-2">Light frosted glass.</p>
              {/snippet}
            </CardContent>
          {/snippet}
        </Card>
      </div>
    </DemoSection>

    <!-- Glow -->
    <DemoSection id="glow" title="Glow" description="Gradient glow behind the card. Combine with glass for the full effect." glass>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        <Card glow>
          {#snippet children()}
            <CardContent>
              {#snippet children()}
                <p class="text-sm font-medium text-foreground">Solid + Glow</p>
                <p class="text-xs text-muted-foreground mt-1">glow</p>
              {/snippet}
            </CardContent>
          {/snippet}
        </Card>
        <Card glass glow>
          {#snippet children()}
            <CardContent>
              {#snippet children()}
                <p class="text-sm font-medium text-foreground">Glass + Glow</p>
                <p class="text-xs text-muted-foreground mt-1">glass glow</p>
              {/snippet}
            </CardContent>
          {/snippet}
        </Card>
      </div>
    </DemoSection>

  </div>

  <TableOfContents {sections} />
</div>
