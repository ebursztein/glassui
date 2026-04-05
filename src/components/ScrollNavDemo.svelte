<script lang="ts">
  import DemoSection from './DemoSection.svelte';
  import Playground from './Playground.svelte';
  import { meta } from '$lib/components/scroll-nav/schema';
  import { ScrollNav, ScrollNavLink } from '$lib/components/scroll-nav';
  import { Card, CardContent } from '$lib/components/card';
</script>

<div class="space-y-16">
  <header>
    <h1 class="text-4xl font-bold tracking-tight text-foreground">{meta.name}</h1>
    <p class="mt-4 text-lg text-muted-foreground">{meta.description}</p>
  </header>

  <Playground {meta}>
    {#snippet preview(props)}
      <div class="w-full relative h-64 overflow-y-auto border border-line-2 bg-layer rounded-2xl">
        <!-- Relative position allows the inner sticky nav to work within this div -->
        <ScrollNav {...props}>
          <div class="font-bold mr-4">Brand</div>
          <div class="flex gap-2">
            <ScrollNavLink href="#intro">Intro</ScrollNavLink>
            <ScrollNavLink href="#pricing">Pricing</ScrollNavLink>
            <ScrollNavLink href="#faq">FAQ</ScrollNavLink>
          </div>
        </ScrollNav>
        
        <div class="p-6 space-y-12">
          <section id="intro" class="min-h-[150px]">
            <h2 class="text-lg font-bold">Introduction</h2>
            <p class="text-muted-foreground">Scroll down to see the active navigation state change.</p>
          </section>
          <section id="pricing" class="min-h-[150px]">
            <h2 class="text-lg font-bold">Pricing</h2>
            <p class="text-muted-foreground">The links above are responsive to the viewport intersection.</p>
          </section>
          <section id="faq" class="min-h-[150px]">
            <h2 class="text-lg font-bold">FAQ</h2>
            <p class="text-muted-foreground">This is the final section.</p>
          </section>
        </div>
      </div>
    {/snippet}
  </Playground>

  <DemoSection id="glass" title="Glass Header Rendering" description="Applying glass to a ScrollNav turns it into a beautiful frosted navbar that floats above the page content.">
    <div class="w-full relative h-96 overflow-y-auto border border-line-2 bg-surface rounded-2xl p-4">
      
      <!-- We render some background text so you can see the glass effect -->
      <div class="absolute inset-0 p-8 pt-24 text-muted-foreground pointer-events-none opacity-50 space-y-4">
        {#each Array(20) as _}
          <div class="w-full h-4 bg-line-2 rounded-full"></div>
        {/each}
      </div>

      <ScrollNav glass color="gradient" offset={50} style="pills">
        <div class="font-bold mr-4 flex items-center gap-2">
          <div class="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white text-xs">G</div>
          GlassUI
        </div>
        <div class="flex gap-1 ml-auto">
          <ScrollNavLink href="#glass-features">Features</ScrollNavLink>
          <ScrollNavLink href="#glass-docs">Docs</ScrollNavLink>
          <ScrollNavLink href="#glass-blog">Blog</ScrollNavLink>
        </div>
      </ScrollNav>
      
      <div class="relative z-10 px-4 pb-20 space-y-32 mt-12">
        <section id="glass-features">
          <Card class="min-h-48">
            <CardContent><h2 class="text-xl font-bold">Features</h2></CardContent>
          </Card>
        </section>
        <section id="glass-docs">
          <Card class="min-h-48">
            <CardContent><h2 class="text-xl font-bold">Documentation</h2></CardContent>
          </Card>
        </section>
        <section id="glass-blog">
          <Card class="min-h-48">
            <CardContent><h2 class="text-xl font-bold">Blog</h2></CardContent>
          </Card>
        </section>
      </div>
    </div>
  </DemoSection>
</div>