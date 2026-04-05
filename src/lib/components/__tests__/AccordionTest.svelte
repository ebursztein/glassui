<script lang="ts">
  import { Accordion, AccordionItem } from '$lib/components/accordion';

  interface Props {
    type?: 'single' | 'multiple';
  }

  let { type = 'single' }: Props = $props();
</script>

<Accordion {type}>
  <AccordionItem value="item-1" title="Section 1">
    Content for section 1
  </AccordionItem>
  <AccordionItem value="item-2" title="Section 2">
    Content for section 2
  </AccordionItem>
  <AccordionItem value="item-3" title="Section 3">
    Content for section 3
  </AccordionItem>
</Accordion>
