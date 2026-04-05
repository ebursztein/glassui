import { z } from 'zod/v4';
import { Size, ThemeColor } from '$lib/types/enums';
import { BaseUIPropsSchema } from '$lib/types/base';
import type { ComponentMeta } from '$lib/theme/types';

export const SelectSchema = BaseUIPropsSchema.extend({
  value: z.string().optional(),
  label: z.string().optional(),
  error: z.string().optional(),
  helperText: z.string().optional(),
  placeholder: z.string().optional(),
});

export type SelectProps = z.infer<typeof SelectSchema>;

export const meta: ComponentMeta = {
  name: 'Select',
  category: 'input',
  description: 'Native HTML select dropdown styled to match the input fields, supporting custom colors, sizes, and glass states.',
  since: '0.7.0',
  props: [
    { name: 'value', type: 'string', description: 'The bound selected value.' },
    { name: 'size', type: "xs | sm | md | lg | xl", default: 'md', description: 'Input size', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    { name: 'color', type: "primary | secondary | accent | destructive | neutral | gradient | info | success | warning | error", description: 'Color/status border theme', options: ['primary', 'secondary', 'accent', 'destructive', 'neutral', 'gradient', 'info', 'success', 'warning', 'error'] },
    { name: 'label', type: 'string', description: 'Label text above select' },
    { name: 'error', type: 'string', description: 'Error message (sets color to error)' },
    { name: 'helperText', type: 'string', description: 'Helper text below select' },
    { name: 'placeholder', type: 'string', description: 'Placeholder option text' },
    { name: 'glass', type: 'ultra-thin | thin | normal | thick | ultra-thick', default: 'false', description: 'Glass surface density', options: ['false', 'ultra-thin', 'thin', 'true', 'thick', 'ultra-thick'] },
    { name: 'frosted', type: 'light | medium | heavy', default: 'false', description: 'Backdrop blur intensity', options: ['false', 'light', 'true', 'heavy'] },
    { name: 'raised', type: 'boolean', default: 'false', description: 'Elevated with shadow' },
    { name: 'glow', type: 'sm | md | lg', default: 'false', description: 'Glow intensity', options: ['false', 'sm', 'true', 'lg'] },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disabled state' },
  ],
  examples: [
    { title: 'Basic', code: '<Select><option value="1">Option 1</option></Select>' },
  ],
  import: "import { Select } from 'glassui';",
};