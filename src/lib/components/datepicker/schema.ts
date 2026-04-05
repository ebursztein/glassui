import { z } from 'zod/v4';
import { Size, ThemeColor } from '$lib/types/enums';
import { BaseUIPropsSchema } from '$lib/types/base';
import type { ComponentMeta } from '$lib/theme/types';

export const DatepickerSchema = BaseUIPropsSchema.extend({
  value: z.string().optional(),
  minDate: z.string().optional(),
  maxDate: z.string().optional(),
  label: z.string().optional(),
  error: z.string().optional(),
  helperText: z.string().optional(),
  placeholder: z.string().optional(),
});

export type DatepickerProps = z.infer<typeof DatepickerSchema>;

export const meta: ComponentMeta = {
  name: 'Datepicker',
  category: 'input',
  description: 'A customizable date picker component.',
  since: '1.2.0',
  props: [
    { name: 'value', type: 'string', description: 'The bound date value (YYYY-MM-DD).' },
    { name: 'minDate', type: 'string', description: 'Minimum selectable date (YYYY-MM-DD).' },
    { name: 'maxDate', type: 'string', description: 'Maximum selectable date (YYYY-MM-DD).' },
    { name: 'size', type: "xs | sm | md | lg | xl", default: 'md', description: 'Input size', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    { name: 'color', type: "primary | secondary | accent | destructive | neutral | gradient | info | success | warning | error", description: 'Theme color/status', options: ['primary', 'secondary', 'accent', 'destructive', 'neutral', 'gradient', 'info', 'success', 'warning', 'error'] },
    { name: 'label', type: 'string', description: 'Label text above input' },
    { name: 'error', type: 'string', description: 'Error message (sets color to error)' },
    { name: 'helperText', type: 'string', description: 'Helper text below input' },
    { name: 'placeholder', type: 'string', description: 'Placeholder input text' },
    { name: 'glass', type: 'ultra-thin | thin | normal | thick | ultra-thick', default: 'false', description: 'Glass surface density', options: ['false', 'ultra-thin', 'thin', 'true', 'thick', 'ultra-thick'] },
    { name: 'frosted', type: 'light | medium | heavy', default: 'false', description: 'Backdrop blur intensity', options: ['false', 'light', 'true', 'heavy'] },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disabled state' },
  ],
  examples: [
    { title: 'Basic', code: '<Datepicker placeholder="Select date" />' },
  ],
  import: "import { Datepicker } from 'glassui';",
};