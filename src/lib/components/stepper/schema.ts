import { z } from 'zod/v4';
import { Size, ThemeColor } from '$lib/types/enums';
import { BaseUIPropsSchema } from '$lib/types/base';
import type { ComponentMeta } from '$lib/theme/types';

export const StepperSchema = BaseUIPropsSchema.extend({
  activeStep: z.number().default(1),
  orientation: z.enum(['horizontal', 'vertical']).default('horizontal'),
});

export type StepperProps = z.infer<typeof StepperSchema>;

export const meta: ComponentMeta = {
  name: 'Stepper',
  category: 'navigation',
  description: 'A component that displays progress through a sequence of logical and numbered steps.',
  since: '0.9.0',
  props: [
    { name: 'activeStep', type: 'number', default: '1', description: 'The current active step (1-indexed).' },
    { name: 'orientation', type: 'horizontal | vertical', default: 'horizontal', options: ['horizontal', 'vertical'], description: 'Layout direction.' },
    { name: 'color', type: "primary | secondary | accent | destructive | neutral | gradient | info | success | warning | error", description: 'Theme color for active/completed steps.', options: ['primary', 'secondary', 'accent', 'destructive', 'neutral', 'gradient', 'info', 'success', 'warning', 'error'] },
  ],
  examples: [
    { title: 'Basic', code: '<Stepper activeStep={2}><Step title="Step 1" /><Step title="Step 2" /><Step title="Step 3" /></Stepper>' },
  ],
  import: "import { Stepper, Step } from 'glassui';",
};