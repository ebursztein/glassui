import { z } from 'zod/v4';
import { Size, Status } from '$lib/types/enums';
import { BaseUIPropsSchema } from '$lib/types/base';
import type { ComponentMeta } from '$lib/theme/types';

export const TextareaSchema = BaseUIPropsSchema.extend({
  size: Size.default('md'),
  status: Status.optional(),
  label: z.string().optional(),
  error: z.string().optional(),
  helperText: z.string().optional(),
  rows: z.number().default(4),
  resize: z.enum(['none', 'vertical', 'both']).default('vertical'),
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
    { name: 'error', type: 'string', description: 'Error message (sets status to error)' },
    { name: 'helperText', type: 'string', description: 'Helper text below textarea' },
    { name: 'glass', type: 'ultra-thin | thin | normal | thick | ultra-thick', default: 'false', description: 'Glass surface density', options: ['false', 'ultra-thin', 'thin', 'true', 'thick', 'ultra-thick'] },
    { name: 'frosted', type: 'light | medium | heavy', default: 'false', description: 'Backdrop blur intensity', options: ['false', 'light', 'true', 'heavy'] },
    { name: 'raised', type: 'boolean', default: 'false', description: 'Elevated with shadow' },
    { name: 'colored', type: 'boolean', default: 'false', description: 'Colored glass accent orbs behind content' },
    { name: 'glow', type: 'sm | md | lg', default: 'false', description: 'Glow intensity', options: ['false', 'sm', 'true', 'lg'] },
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
