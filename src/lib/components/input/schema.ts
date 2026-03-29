import { z } from 'zod/v4';
import { Size, Status } from '$lib/types/enums';
import type { ComponentMeta } from '$lib/theme/types';

export const InputSchema = z.object({
  size: Size.default('md'),
  status: Status.optional(),
  label: z.string().optional(),
  glass: z.boolean().default(false),
  glow: z.boolean().default(false),
  disabled: z.boolean().default(false),
});

export type InputProps = z.infer<typeof InputSchema>;

export const meta: ComponentMeta = {
  name: 'Input',
  category: 'input',
  description: 'Text input with size variants, status colors, label, and optional glass surface with glow on focus.',
  since: '0.2.0',
  props: [
    { name: 'size', type: "xs | sm | md | lg | xl", default: 'md', description: 'Input size', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    { name: 'status', type: "info | success | warning | error", description: 'Status border color', options: ['info', 'success', 'warning', 'error'] },
    { name: 'label', type: 'string', description: 'Label text above input' },
    { name: 'glass', type: 'boolean', default: 'false', description: 'Enable glass surface' },
    { name: 'glow', type: 'boolean', default: 'false', description: 'Gradient glow on focus' },
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
