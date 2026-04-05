import { z } from 'zod/v4';
import { Size, ThemeColor } from '$lib/types/enums';
import { BaseUIPropsSchema } from '$lib/types/base';
import type { ComponentMeta } from '$lib/theme/types';

export const RangeSliderSchema = BaseUIPropsSchema.extend({
  value: z.number().default(50),
  min: z.number().default(0),
  max: z.number().default(100),
  step: z.number().default(1),
  label: z.string().optional(),
  error: z.string().optional(),
  helperText: z.string().optional(),
});

export type RangeSliderProps = z.infer<typeof RangeSliderSchema>;

export const meta: ComponentMeta = {
  name: 'RangeSlider',
  category: 'input',
  description: 'A custom-styled native range slider with dynamic progress track rendering and full GlassUI support.',
  since: '0.8.0',
  props: [
    { name: 'value', type: 'number', default: '50', description: 'The bound numeric value.' },
    { name: 'min', type: 'number', default: '0', description: 'Minimum allowed value.' },
    { name: 'max', type: 'number', default: '100', description: 'Maximum allowed value.' },
    { name: 'step', type: 'number', default: '1', description: 'Increment/decrement step size.' },
    { name: 'size', type: "xs | sm | md | lg | xl", default: 'md', description: 'Input size', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    { name: 'color', type: "primary | secondary | accent | destructive | neutral | gradient | info | success | warning | error", description: 'Theme color/status', options: ['primary', 'secondary', 'accent', 'destructive', 'neutral', 'gradient', 'info', 'success', 'warning', 'error'] },
    { name: 'label', type: 'string', description: 'Label text above slider' },
    { name: 'error', type: 'string', description: 'Error message (sets color to error)' },
    { name: 'helperText', type: 'string', description: 'Helper text below slider' },
    { name: 'glass', type: 'ultra-thin | thin | normal | thick | ultra-thick', default: 'false', description: 'Glass surface density', options: ['false', 'ultra-thin', 'thin', 'true', 'thick', 'ultra-thick'] },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disabled state' },
  ],
  examples: [
    { title: 'Basic', code: '<RangeSlider bind:value={volume} />' },
  ],
  import: "import { RangeSlider } from 'glassui';",
};