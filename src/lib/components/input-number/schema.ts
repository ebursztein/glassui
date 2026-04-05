import { z } from 'zod/v4';
import { Size, ThemeColor } from '$lib/types/enums';
import { BaseUIPropsSchema } from '$lib/types/base';
import type { ComponentMeta } from '$lib/theme/types';

export const InputNumberSchema = BaseUIPropsSchema.extend({
  value: z.number().default(0),
  min: z.number().optional(),
  max: z.number().optional(),
  step: z.number().default(1),
  label: z.string().optional(),
  error: z.string().optional(),
  helperText: z.string().optional(),
});

export type InputNumberProps = z.infer<typeof InputNumberSchema>;

export const meta: ComponentMeta = {
  name: 'InputNumber',
  category: 'input',
  description: 'A numeric input with increment and decrement buttons, supporting bounds, step intervals, and full UI Engine themes.',
  since: '0.8.0',
  props: [
    { name: 'value', type: 'number', default: '0', description: 'The bound numeric value.' },
    { name: 'min', type: 'number', description: 'Minimum allowed value.' },
    { name: 'max', type: 'number', description: 'Maximum allowed value.' },
    { name: 'step', type: 'number', default: '1', description: 'Increment/decrement step size.' },
    { name: 'size', type: "xs | sm | md | lg | xl", default: 'md', description: 'Input size', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    { name: 'color', type: "primary | secondary | accent | destructive | neutral | gradient | info | success | warning | error", description: 'Theme color/status', options: ['primary', 'secondary', 'accent', 'destructive', 'neutral', 'gradient', 'info', 'success', 'warning', 'error'] },
    { name: 'label', type: 'string', description: 'Label text above input' },
    { name: 'error', type: 'string', description: 'Error message (sets color to error)' },
    { name: 'helperText', type: 'string', description: 'Helper text below input' },
    { name: 'glass', type: 'ultra-thin | thin | normal | thick | ultra-thick', default: 'false', description: 'Glass surface density', options: ['false', 'ultra-thin', 'thin', 'true', 'thick', 'ultra-thick'] },
    { name: 'frosted', type: 'light | medium | heavy', default: 'false', description: 'Backdrop blur intensity', options: ['false', 'light', 'true', 'heavy'] },
    { name: 'raised', type: 'boolean', default: 'false', description: 'Elevated with shadow' },
    { name: 'glow', type: 'sm | md | lg', default: 'false', description: 'Glow intensity', options: ['false', 'sm', 'true', 'lg'] },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disabled state' },
  ],
  examples: [
    { title: 'Basic', code: '<InputNumber bind:value={count} min={0} max={10} />' },
  ],
  import: "import { InputNumber } from 'glassui';",
};