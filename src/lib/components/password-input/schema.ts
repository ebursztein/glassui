import { z } from 'zod/v4';
import { Size, ThemeColor } from '$lib/types/enums';
import { BaseUIPropsSchema } from '$lib/types/base';
import type { ComponentMeta } from '$lib/theme/types';

export const PasswordInputSchema = BaseUIPropsSchema.extend({
  value: z.string().optional(),
  label: z.string().optional(),
  error: z.string().optional(),
  helperText: z.string().optional(),
  placeholder: z.string().optional(),
  showStrength: z.boolean().default(false),
});

export type PasswordInputProps = z.infer<typeof PasswordInputSchema>;

export const meta: ComponentMeta = {
  name: 'PasswordInput',
  category: 'input',
  description: 'A password input field with a visibility toggle and an optional password strength meter.',
  since: '0.9.0',
  props: [
    { name: 'value', type: 'string', description: 'The bound password string.' },
    { name: 'showStrength', type: 'boolean', default: 'false', description: 'Whether to show the strength meter.' },
    { name: 'size', type: "xs | sm | md | lg | xl", default: 'md', description: 'Input size', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    { name: 'color', type: "primary | secondary | accent | destructive | neutral | gradient | info | success | warning | error", description: 'Color/status border theme', options: ['primary', 'secondary', 'accent', 'destructive', 'neutral', 'gradient', 'info', 'success', 'warning', 'error'] },
    { name: 'label', type: 'string', description: 'Label text above input' },
    { name: 'error', type: 'string', description: 'Error message' },
    { name: 'helperText', type: 'string', description: 'Helper text' },
    { name: 'glass', type: 'ultra-thin | thin | normal | thick | ultra-thick', default: 'false', description: 'Glass surface density', options: ['false', 'ultra-thin', 'thin', 'true', 'thick', 'ultra-thick'] },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disabled state' },
  ],
  examples: [
    { title: 'Basic', code: '<PasswordInput />' },
    { title: 'With Strength', code: '<PasswordInput showStrength />' },
  ],
  import: "import { PasswordInput } from 'glassui';",
};