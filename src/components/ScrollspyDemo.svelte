<script lang="ts">
  import DemoSection from './DemoSection.svelte';
  import Playground from './Playground.svelte';
  import { meta } from '$lib/components/scrollspy/schema';
  import { Scrollspy, ScrollspyNav, ScrollspyLink } from '$lib/components/scrollspy';
  import { Card, CardContent } from '$lib/components/card';
</script>

<div class="space-y-16">
  <header>
    <h1 class="text-4xl font-bold tracking-tight text-foreground">{meta.name}</h1>
    <p class="mt-4 text-lg text-muted-foreground">{meta.description}</p>
  </header>

  <Playground {meta}>
    {#snippet preview(props)}
      <div class="w-full max-w-md grid grid-cols-3 gap-6 relative">
        <div class="col-span-1 sticky top-4 self-start">
          <Scrollspy {...props} class="border border-line-2 bg-layer p-4 rounded-xl">
            <h3 class="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">On this page</h3>
            <ScrollspyNav>
              <ScrollspyLink href="#section-1">1. Introduction</ScrollspyLink>
              <ScrollspyLink href="#section-2">2. Architecture</ScrollspyLink>
              <ScrollspyLink href="#section-3">3. Deployment</ScrollspyLink>
            </ScrollspyNav>
          </Scrollspy>
        </div>
        
        <div class="col-span-2 h-64 overflow-y-auto border border-line-2 rounded-xl p-6 bg-surface space-y-12">
          <section id="section-1">
            <h2 class="text-lg font-bold text-foreground mb-2">Introduction</h2>
            <p class="text-sm text-muted-foreground">This is the first section. Scroll down to see the active link update automatically.</p>
            <div class="h-32"></div>
          </section>
          
          <section id="section-2">
            <h2 class="text-lg font-bold text-foreground mb-2">Architecture</h2>
            <p class="text-sm text-muted-foreground">The architecture is fully reactive, observing elements as they enter the viewport.</p>
            <div class="h-32"></div>
          </section>
          
          <section id="section-3">
            <h2 class="text-lg font-bold text-foreground mb-2">Deployment</h2>
            <p class="text-sm text-muted-foreground">Deploy your site confidently knowing the scroll tracking handles offset margins properly.</p>
            <div class="h-32"></div>
          </section>
        </div>
      </div>
    {/snippet}
  </Playground>

  <DemoSection id="basic" title="Scrollspy with Glass" description="When inside a glass container, Scrollspy links automatically inherit the active context and highlight themselves beautifully.">
    <div class="max-w-3xl grid grid-cols-4 gap-8">
      <!-- Nav -->
      <div class="col-span-1 sticky top-24 self-start">
        <Scrollspy color="gradient" style="pills" offset={100}>
          <ScrollspyNav>
            <ScrollspyLink href="#item-alpha">Alpha</ScrollspyLink>
            <ScrollspyLink href="#item-beta">Beta</ScrollspyLink>
            <ScrollspyLink href="#item-gamma">Gamma</ScrollspyLink>
          </ScrollspyNav>
        </Scrollspy>
      </div>

      <!-- Content -->
      <div class="col-span-3 space-y-24">
        <section id="item-alpha">
          <Card glass color="gradient" class="min-h-48">
            <CardContent>
              <h2 class="text-xl font-bold">Alpha Section</h2>
              <p class="mt-4 opacity-80">This section is being tracked. Scroll past it to see the sidebar update.</p>
            </CardContent>
          </Card>
        </section>

        <section id="item-beta">
          <Card glass color="neutral" class="min-h-48">
            <CardContent>
              <h2 class="text-xl font-bold">Beta Section</h2>
              <p class="mt-4 opacity-80">The observer handles multiple entries and selects the one with the highest intersection ratio.</p>
            </CardContent>
          </Card>
        </section>

        <section id="item-gamma">
          <Card glass color="destructive" class="min-h-48">
            <CardContent>
              <h2 class="text-xl font-bold">Gamma Section</h2>
              <p class="mt-4 opacity-80">Final section. Note how clicking the links smoothly scrolls you here.</p>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  </DemoSection>
</div>