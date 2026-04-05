import { z } from 'zod/v4';
import { Size, ThemeColor } from '$lib/types/enums';
import { BaseUIPropsSchema } from '$lib/types/base';
import type { ComponentMeta } from '$lib/theme/types';

export const PinInputSchema = BaseUIPropsSchema.extend({
  value: z.array(z.string()).optional(),
  length: z.number().default(4),
  label: z.string().optional(),
  error: z.string().optional(),
  helperText: z.string().optional(),
  placeholder: z.string().optional(),
});

export type PinInputProps = z.infer<typeof PinInputSchema>;

export const meta: ComponentMeta = {
  name: 'PinInput',
  category: 'input',
  description: 'An optimized input component for one-time passwords (OTP) and verification pins with automatic focus advancing.',
  since: '0.7.0',
  props: [
    { name: 'value', type: 'string[]', description: 'Bound array of pin digits.' },
    { name: 'length', type: 'number', default: '4', description: 'Number of input boxes to render.' },
    { name: 'size', type: "xs | sm | md | lg | xl", default: 'md', description: 'Input size', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    { name: 'color', type: "primary | secondary | accent | destructive | neutral | gradient | info | success | warning | error", description: 'Theme color/status', options: ['primary', 'secondary', 'accent', 'destructive', 'neutral', 'gradient', 'info', 'success', 'warning', 'error'] },
    { name: 'label', type: 'string', description: 'Label text above input' },
    { name: 'error', type: 'string', description: 'Error message (sets color to error)' },
    { name: 'helperText', type: 'string', description: 'Helper text below input' },
    { name: 'placeholder', type: 'string', default: '○', description: 'Placeholder for empty boxes' },
    { name: 'glass', type: 'ultra-thin | thin | normal | thick | ultra-thick', default: 'false', description: 'Glass surface density', options: ['false', 'ultra-thin', 'thin', 'true', 'thick', 'ultra-thick'] },
    { name: 'frosted', type: 'light | medium | heavy', default: 'false', description: 'Backdrop blur intensity', options: ['false', 'light', 'true', 'heavy'] },
    { name: 'raised', type: 'boolean', default: 'false', description: 'Elevated with shadow' },
    { name: 'glow', type: 'sm | md | lg', default: 'false', description: 'Glow intensity', options: ['false', 'sm', 'true', 'lg'] },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disabled state' },
  ],
  examples: [
    { title: 'Basic', code: '<PinInput length={4} />' },
  ],
  import: "import { PinInput } from 'glassui';",
};