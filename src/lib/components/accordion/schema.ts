import { z } from 'zod/v4';
import { Size, ThemeColor } from '$lib/types/enums';
import { BaseUIPropsSchema } from '$lib/types/base';
import type { ComponentMeta } from '$lib/theme/types';

export const AccordionSchema = BaseUIPropsSchema.extend({
  type: z.enum(['single', 'multiple']).default('single'),
  value: z.union([z.string(), z.array(z.string())]).optional(),
});

export type AccordionProps = z.infer<typeof AccordionSchema>;

export const meta: ComponentMeta = {
  name: 'Accordion',
  category: 'disclosure',
  description: 'A vertically stacked set of interactive headings that each reveal an associated section of content.',
  since: '0.4.0',
  props: [
    { name: 'type', type: 'single | multiple', default: 'single', options: ['single', 'multiple'], description: 'Whether one or multiple items can be open at the same time.' },
    { name: 'value', type: 'string | string[]', description: 'The controlled value of the open item(s).' },
    { name: 'color', type: "primary | secondary | accent | destructive | neutral | gradient | info | success | warning | error", description: 'Theme color for accordion', options: ['primary', 'secondary', 'accent', 'destructive', 'neutral', 'gradient', 'info', 'success', 'warning', 'error'] },
    { name: 'style', type: "solid | outline | ghost", default: 'solid', description: 'Render style', options: ['solid', 'outline', 'ghost'] },
    { name: 'glass', type: 'ultra-thin | thin | normal | thick | ultra-thick', default: 'false', description: 'Glass surface density', options: ['false', 'ultra-thin', 'thin', 'true', 'thick', 'ultra-thick'] },
    { name: 'frosted', type: 'light | medium | heavy', default: 'false', description: 'Backdrop blur intensity', options: ['false', 'light', 'true', 'heavy'] },
    { name: 'raised', type: 'boolean', default: 'false', description: 'Elevated with shadow' },
  ],
  examples: [
    { title: 'Single', code: '<Accordion><AccordionItem title="Item 1">Content 1</AccordionItem></Accordion>' },
    { title: 'Multiple', code: '<Accordion type="multiple"><AccordionItem title="Item 1">Content 1</AccordionItem></Accordion>' }
  ],
  import: "import { Accordion, AccordionItem } from 'glassui';",
};