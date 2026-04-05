import { z } from 'zod/v4';
import { Size, ThemeColor } from '$lib/types/enums';
import { BaseUIPropsSchema } from '$lib/types/base';
import type { ComponentMeta } from '$lib/theme/types';

export const ComboBoxSchema = BaseUIPropsSchema.extend({
  value: z.string().optional(),
  options: z.array(z.any()), // Array of { label: string, value: string }
  label: z.string().optional(),
  error: z.string().optional(),
  helperText: z.string().optional(),
  placeholder: z.string().optional(),
});

export type ComboBoxProps = z.infer<typeof ComboBoxSchema>;

export const meta: ComponentMeta = {
  name: 'ComboBox',
  category: 'input',
  description: 'An autocomplete dropdown that allows users to type to filter options.',
  since: '0.9.0',
  props: [
    { name: 'value', type: 'string', description: 'The bound selected value.' },
    { name: 'options', type: '{ label: string, value: string }[]', description: 'Array of options to select from.' },
    { name: 'size', type: "xs | sm | md | lg | xl", default: 'md', description: 'Input size', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    { name: 'color', type: "primary | secondary | accent | destructive | neutral | gradient | info | success | warning | error", description: 'Color/status border theme', options: ['primary', 'secondary', 'accent', 'destructive', 'neutral', 'gradient', 'info', 'success', 'warning', 'error'] },
    { name: 'label', type: 'string', description: 'Label text above input' },
    { name: 'error', type: 'string', description: 'Error message' },
    { name: 'helperText', type: 'string', description: 'Helper text' },
    { name: 'placeholder', type: 'string', description: 'Placeholder input text' },
    { name: 'glass', type: 'ultra-thin | thin | normal | thick | ultra-thick', default: 'false', description: 'Glass surface density', options: ['false', 'ultra-thin', 'thin', 'true', 'thick', 'ultra-thick'] },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disabled state' },
  ],
  examples: [
    { title: 'Basic', code: '<ComboBox options={[{label: "Apple", value: "apple"}]} />' },
  ],
  import: "import { ComboBox } from 'glassui';",
};