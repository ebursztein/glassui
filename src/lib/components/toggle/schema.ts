import { z } from 'zod/v4';
import { Size } from '$lib/types/enums';
import type { ComponentMeta } from '$lib/theme/types';

export const ToggleSchema = z.object({
  size: Size.default('md'),
  checked: z.boolean().default(false),
  disabled: z.boolean().default(false),
  label: z.string().optional(),
  glass: z.boolean().default(false),
});

export type ToggleProps = z.infer<typeof ToggleSchema>;

export const meta: ComponentMeta = {
  name: 'Toggle',
  category: 'toggle',
  description: 'Switch toggle with size variants, label, and optional glass surface. Keyboard accessible.',
  since: '0.2.0',
  props: [
    { name: 'size', type: "xs | sm | md | lg | xl", default: 'md', description: 'Toggle size', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    { name: 'checked', type: 'boolean', default: 'false', description: 'Toggle state (bindable)' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disabled state' },
    { name: 'label', type: 'string', description: 'Label text beside toggle' },
    { name: 'glass', type: 'boolean', default: 'false', description: 'Enable glass surface' },
  ],
  examples: [
    { title: 'Default', code: '<Toggle />' },
    { title: 'With label', code: '<Toggle label="Notifications" />' },
    { title: 'Glass', code: '<Toggle glass label="Dark mode" />' },
    { title: 'Checked', code: '<Toggle checked label="Active" />' },
  ],
  import: "import { Toggle } from 'glassui';",
};
