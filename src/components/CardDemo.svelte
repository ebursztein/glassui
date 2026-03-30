<script lang="ts">
  import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '$lib/components/card';
  import { Button } from '$lib/components/button';
  import { Input } from '$lib/components/input';
  import { GlassBackdrop } from '$lib/components/glass';
  import { meta } from '$lib/components/card/schema';
  import PropEditor from './PropEditor.svelte';
  import DemoSection from './DemoSection.svelte';
  import TableOfContents from './TableOfContents.svelte';

  let glass = $state<string | boolean>(false);
  let glassbg = $state(false);
  let glow = $state<string | boolean>(false);
  let hover = $state<string>('none');

  const values = $derived({ glass, glassbg, glow, hover });

  function enumOrFalse(v: any): string | false {
    return v === 'false' || v === false ? false : v;
  }

  function handleChange(key: string, value: any) {
    if (key === 'glass') glass = enumOrFalse(value);
    if (key === 'glassbg') glassbg = value;
    if (key === 'glow') glow = enumOrFalse(value);
    if (key === 'hover') hover = value;
  }

  const codeSnippet = $derived(() => {
    const props: string[] = [];
    if (glass) props.push(glass === true ? 'glass' : `glass="${glass}"`);
    if (glassbg) props.push('glassbg');
    if (glow) props.push(glow === true ? 'glow' : `glow="${glow}"`);
    if (hover !== 'none') props.push(`hover="${hover}"`);
    const propsStr = props.length > 0 ? ' ' + props.join(' ') : '';
    return `<Card${propsStr}>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>Content here</CardContent>
  <CardFooter>
    <Button size="sm">Action</Button>
  </CardFooter>
</Card>`;
  });

  const sections = [
    { id: 'playground', label: 'Playground' },
    { id: 'hover-effects', label: 'Hover Effects' },
    { id: 'glass', label: 'Glass' },
    { id: 'glow', label: 'Glow' },
  ];
</script>

<div class="flex gap-10">
  <div class="flex-1 min-w-0 space-y-12">

    <!-- Interactive Playground -->
    <section id="playground" class="scroll-mt-24">
      <h2 class="text-lg font-semibold text-foreground">Playground</h2>
      <p class="mt-1 text-sm text-muted-foreground">Explore all card props interactively.</p>

      <!-- Live preview -->
      <div class="mt-4 rounded-lg border border-border p-8 flex items-center justify-center min-h-[280px] relative overflow-hidden {glassbg ? 'glass-bg' : 'bg-background'}">
        {#if glassbg}
          <GlassBackdrop />
        {/if}
        <div class="relative z-10 w-full max-w-md">
          <Card
            glass={glass || false}
            {glassbg}
            glow={glow || false}
            hover={hover as any}
          >
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
      </div>

<!-- Code -->
      <pre class="mt-4 text-sm text-primary bg-primary/5 border border-primary/10 rounded-lg p-4 overflow-x-auto"><code>{codeSnippet()}</code></pre>

      <!-- Props -->
      <div class="mt-4 rounded-lg border border-border p-5">
        <h3 class="text-sm font-semibold text-foreground mb-4">Props</h3>
        <PropEditor props={meta.props} {values} onchange={handleChange} />
      </div>
    </section>

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
