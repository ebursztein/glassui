<script lang="ts">
  import DemoSection from './DemoSection.svelte';
  import Playground from './Playground.svelte';
  import { meta } from '$lib/components/accordion/schema';
  import { Accordion, AccordionItem } from '$lib/components/accordion';
</script>

<div class="space-y-16">
  <header>
    <h1 class="text-4xl font-bold tracking-tight text-foreground">{meta.name}</h1>
    <p class="mt-4 text-lg text-muted-foreground">{meta.description}</p>
  </header>

  <Playground {meta}>
    {#snippet preview(props)}
      <div class="w-full max-w-md">
        <Accordion {...props}>
          <AccordionItem title="Is GlassUI free?" value="1">
            Yes, GlassUI is completely free and open source. It is licensed under the MIT license.
          </AccordionItem>
          <AccordionItem title="Can I use it with Tailwind CSS?" value="2">
            Absolutely! GlassUI is built on top of Tailwind CSS and uses Preline's utility-first approach.
          </AccordionItem>
          <AccordionItem title="Does it support dark mode?" value="3">
            Yes, full dark mode support is baked in, along with dynamic glass effects that adapt to the underlying background.
          </AccordionItem>
        </Accordion>
      </div>
    {/snippet}
  </Playground>

  <DemoSection id="types" title="Accordion Types" description="Accordions can allow single or multiple items open simultaneously.">
    <div class="grid md:grid-cols-2 gap-8">
      <div>
        <h3 class="text-sm font-semibold mb-4 text-foreground">Single (Default)</h3>
        <Accordion type="single" color="neutral" glass="normal">
          <AccordionItem title="First Item" value="1">This is the first item's content.</AccordionItem>
          <AccordionItem title="Second Item" value="2">Only one item can be open at a time.</AccordionItem>
        </Accordion>
      </div>
      <div>
        <h3 class="text-sm font-semibold mb-4 text-foreground">Multiple</h3>
        <Accordion type="multiple" color="neutral" glass="normal">
          <AccordionItem title="First Item" value="1">This is the first item's content.</AccordionItem>
          <AccordionItem title="Second Item" value="2">You can open both of these items at once.</AccordionItem>
        </Accordion>
      </div>
    </div>
  </DemoSection>
</div>