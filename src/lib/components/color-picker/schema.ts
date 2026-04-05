import { z } from 'zod/v4';
import { ThemeColor } from '$lib/types/enums';
import { BaseUIPropsSchema } from '$lib/types/base';
import type { ComponentMeta } from '$lib/theme/types';

export const ColorPickerSchema = BaseUIPropsSchema.extend({
  value: z.string().default('#000000'),
  label: z.string().optional(),
  error: z.string().optional(),
  helperText: z.string().optional(),
});

export type ColorPickerProps = z.infer<typeof ColorPickerSchema>;

export const meta: ComponentMeta = {
  name: 'ColorPicker',
  category: 'input',
  description: 'A styled input for selecting colors, wrapping the native HTML color input.',
  since: '1.2.0',
  props: [
    { name: 'value', type: 'string', default: '#000000', description: 'The bound hex color value.' },
    { name: 'size', type: "xs | sm | md | lg | xl", default: 'md', description: 'Input size', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    { name: 'color', type: "primary | secondary | accent | destructive | neutral | gradient | info | success | warning | error", description: 'Theme color/status', options: ['primary', 'secondary', 'accent', 'destructive', 'neutral', 'gradient', 'info', 'success', 'warning', 'error'] },
    { name: 'label', type: 'string', description: 'Label text above input' },
    { name: 'error', type: 'string', description: 'Error message (sets color to error)' },
    { name: 'helperText', type: 'string', description: 'Helper text below input' },
    { name: 'glass', type: 'ultra-thin | thin | normal | thick | ultra-thick', default: 'false', description: 'Glass surface density', options: ['false', 'ultra-thin', 'thin', 'true', 'thick', 'ultra-thick'] },
    { name: 'frosted', type: 'light | medium | heavy', default: 'false', description: 'Backdrop blur intensity', options: ['false', 'light', 'true', 'heavy'] },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disabled state' },
  ],
  examples: [
    { title: 'Basic', code: '<ColorPicker bind:value={color} />' },
  ],
  import: "import { ColorPicker } from 'glassui';",
};