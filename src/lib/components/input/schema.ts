import { z } from 'zod/v4';
import { Size, Status } from '$lib/types/enums';
import { BaseUIPropsSchema } from '$lib/types/base';
import type { ComponentMeta } from '$lib/theme/types';

export const InputSchema = BaseUIPropsSchema.extend({
  size: Size.default('md'),
  status: Status.optional(),
  label: z.string().optional(),
  error: z.string().optional(),
  helperText: z.string().optional(),
});

export type InputProps = z.infer<typeof InputSchema>;

export const meta: ComponentMeta = {
  name: 'Input',
  category: 'input',
  description: 'Text input with size variants, status colors, label, helper text, error messages, and optional glass surface with glow on focus.',
  since: '0.2.0',
  props: [
    { name: 'size', type: "xs | sm | md | lg | xl", default: 'md', description: 'Input size', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    { name: 'status', type: "info | success | warning | error", description: 'Status border color', options: ['info', 'success', 'warning', 'error'] },
    { name: 'label', type: 'string', description: 'Label text above input' },
    { name: 'error', type: 'string', description: 'Error message (sets status to error)' },
    { name: 'helperText', type: 'string', description: 'Helper text below input' },
    { name: 'glass', type: 'ultra-thin | thin | normal | thick | ultra-thick', default: 'false', description: 'Glass surface density', options: ['false', 'ultra-thin', 'thin', 'true', 'thick', 'ultra-thick'] },
    { name: 'frosted', type: 'light | medium | heavy', default: 'false', description: 'Backdrop blur intensity', options: ['false', 'light', 'true', 'heavy'] },
    { name: 'raised', type: 'boolean', default: 'false', description: 'Elevated with shadow' },
    { name: 'colored', type: 'boolean', default: 'false', description: 'Colored glass accent orbs behind content' },
    { name: 'glow', type: 'sm | md | lg', default: 'false', description: 'Glow intensity', options: ['false', 'sm', 'true', 'lg'] },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disabled state' },
  ],
  examples: [
    { title: 'Default', code: '<Input placeholder="Enter text" />' },
    { title: 'With label', code: '<Input label="Email" placeholder="you@example.com" />' },
    { title: 'Glass + glow', code: '<Input label="Name" glass glow placeholder="John" />' },
    { title: 'Error status', code: '<Input label="Email" status="error" placeholder="Invalid" />' },
  ],
  import: "import { Input } from 'glassui';",
};
