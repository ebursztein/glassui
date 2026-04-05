import { z } from 'zod/v4';
import { BaseUIPropsSchema } from '$lib/types/base';
import type { ComponentMeta } from '$lib/theme/types';

export const LayoutSplitterSchema = BaseUIPropsSchema.extend({
  orientation: z.enum(['horizontal', 'vertical']).default('horizontal'),
  initialSize: z.number().default(50),
  minSize: z.number().default(10),
  maxSize: z.number().default(90),
});

export type LayoutSplitterProps = z.infer<typeof LayoutSplitterSchema>;

export const meta: ComponentMeta = {
  name: 'LayoutSplitter',
  category: 'data display',
  description: 'A draggable resizer handle that splits a container into two adjustable panels.',
  since: '1.3.0',
  props: [
    { name: 'orientation', type: 'horizontal | vertical', default: 'horizontal', options: ['horizontal', 'vertical'], description: 'Layout direction.' },
    { name: 'initialSize', type: 'number', default: '50', description: 'Initial size percentage of the first panel (0-100).' },
    { name: 'minSize', type: 'number', default: '10', description: 'Minimum size percentage of the first panel.' },
    { name: 'maxSize', type: 'number', default: '90', description: 'Maximum size percentage of the first panel.' },
    { name: 'color', type: "primary | secondary | accent | destructive | neutral | gradient | info | success | warning | error", description: 'Theme color for the drag handle on hover/active.', options: ['primary', 'secondary', 'accent', 'destructive', 'neutral', 'gradient', 'info', 'success', 'warning', 'error'] },
    { name: 'glass', type: 'ultra-thin | thin | normal | thick | ultra-thick', default: 'false', description: 'Glass surface density', options: ['false', 'ultra-thin', 'thin', 'true', 'thick', 'ultra-thick'] },
    { name: 'frosted', type: 'light | medium | heavy', default: 'false', description: 'Backdrop blur intensity', options: ['false', 'light', 'true', 'heavy'] },
  ],
  examples: [
    { title: 'Basic', code: '<LayoutSplitter><div slot="panel1">Left</div><div slot="panel2">Right</div></LayoutSplitter>' },
  ],
  import: "import { LayoutSplitter } from 'glassui';",
};