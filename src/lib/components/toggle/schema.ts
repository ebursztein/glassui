import { z } from 'zod/v4';
import { Size } from '$lib/types/enums';
import { BaseUIPropsSchema } from '$lib/types/base';
import type { ComponentMeta } from '$lib/theme/types';

export const ToggleSchema = BaseUIPropsSchema.extend({
  size: Size.default('md'),
  checked: z.boolean().default(false),
  label: z.string().optional(),
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
    { name: 'glass', type: 'ultra-thin | thin | normal | thick | ultra-thick', default: 'false', description: 'Glass surface density', options: ['false', 'ultra-thin', 'thin', 'true', 'thick', 'ultra-thick'] },
    { name: 'frosted', type: 'light | medium | heavy', default: 'false', description: 'Backdrop blur intensity', options: ['false', 'light', 'true', 'heavy'] },
    { name: 'raised', type: 'boolean', default: 'false', description: 'Elevated with shadow' },
    { name: 'colored', type: 'boolean', default: 'false', description: 'Colored glass accent orbs behind content' },
    { name: 'glow', type: 'sm | md | lg', default: 'false', description: 'Glow intensity', options: ['false', 'sm', 'true', 'lg'] },
  ],
  examples: [
    { title: 'Default', code: '<Toggle />' },
    { title: 'With label', code: '<Toggle label="Notifications" />' },
    { title: 'Glass', code: '<Toggle glass label="Dark mode" />' },
    { title: 'Checked', code: '<Toggle checked label="Active" />' },
  ],
  import: "import { Toggle } from 'glassui';",
};
