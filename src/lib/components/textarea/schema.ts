import { z } from 'zod/v4';
import { Size, Status } from '$lib/types/enums';
import type { ComponentMeta } from '$lib/theme/types';

export const TextareaSchema = z.object({
  size: Size.default('md'),
  status: Status.optional(),
  label: z.string().optional(),
  glass: z.boolean().default(false),
  glow: z.boolean().default(false),
  rows: z.number().default(4),
  resize: z.enum(['none', 'vertical', 'both']).default('vertical'),
  disabled: z.boolean().default(false),
});

export type TextareaProps = z.infer<typeof TextareaSchema>;

export const meta: ComponentMeta = {
  name: 'Textarea',
  category: 'textarea',
  description: 'Multi-line text input with size, status, label, and optional glass surface with glow on focus.',
  since: '0.2.0',
  props: [
    { name: 'size', type: "xs | sm | md | lg | xl", default: 'md', description: 'Text size and padding', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    { name: 'status', type: "info | success | warning | error", description: 'Status border color', options: ['info', 'success', 'warning', 'error'] },
    { name: 'label', type: 'string', description: 'Label text above textarea' },
    { name: 'glass', type: 'boolean', default: 'false', description: 'Enable glass surface' },
    { name: 'glow', type: 'boolean', default: 'false', description: 'Gradient glow on focus' },
    { name: 'rows', type: 'number', default: '4', description: 'Number of visible rows' },
    { name: 'resize', type: "none | vertical | both", default: 'vertical', description: 'Resize behavior', options: ['none', 'vertical', 'both'] },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disabled state' },
  ],
  examples: [
    { title: 'Default', code: '<Textarea placeholder="Write something..." />' },
    { title: 'With label', code: '<Textarea label="Message" placeholder="Your message" />' },
    { title: 'Glass + glow', code: '<Textarea label="Bio" glass glow placeholder="Tell us about yourself" />' },
  ],
  import: "import { Textarea } from 'glassui';",
};
