import { z } from 'zod/v4';
import { Size, ThemeColor } from '$lib/types/enums';
import { BaseUIPropsSchema } from '$lib/types/base';
import type { ComponentMeta } from '$lib/theme/types';

export const TooltipSchema = BaseUIPropsSchema.extend({
  placement: z.enum(['top', 'bottom', 'left', 'right']).default('top'),
  delay: z.number().default(0),
});

export type TooltipProps = z.infer<typeof TooltipSchema>;

export const meta: ComponentMeta = {
  name: 'Tooltip',
  category: 'overlay',
  description: 'A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.',
  since: '0.9.0',
  props: [
    { name: 'placement', type: 'top | bottom | left | right', default: 'top', options: ['top', 'bottom', 'left', 'right'], description: 'Preferred placement of the tooltip.' },
    { name: 'delay', type: 'number', default: '0', description: 'Delay in milliseconds before the tooltip shows.' },
    { name: 'color', type: "primary | secondary | accent | destructive | neutral | gradient | info | success | warning | error", description: 'Theme color for the tooltip body.', options: ['primary', 'secondary', 'accent', 'destructive', 'neutral', 'gradient', 'info', 'success', 'warning', 'error'] },
    { name: 'glass', type: 'ultra-thin | thin | normal | thick | ultra-thick', default: 'false', description: 'Glass surface density', options: ['false', 'ultra-thin', 'thin', 'true', 'thick', 'ultra-thick'] },
    { name: 'frosted', type: 'light | medium | heavy', default: 'false', description: 'Backdrop blur intensity', options: ['false', 'light', 'true', 'heavy'] },
  ],
  examples: [
    { title: 'Basic', code: '<Tooltip><TooltipTrigger><Button>Hover me</Button></TooltipTrigger><TooltipContent>I am a tooltip</TooltipContent></Tooltip>' },
  ],
  import: "import { Tooltip, TooltipTrigger, TooltipContent } from 'glassui';",
};