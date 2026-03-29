import { z } from 'zod/v4';
import type { ComponentMeta } from '$lib/theme/types';

/** Icon stroke weight / style (Phosphor icons only) */
export const IconWeight = z.enum(['thin', 'light', 'regular', 'bold', 'fill', 'duotone']);
export type IconWeight = z.infer<typeof IconWeight>;

/** Icon size in pixels */
export const IconSize = z.union([z.number(), z.string()]).default(24);
export type IconSize = z.infer<typeof IconSize>;

export const IconSchema = z.object({
  name: z.string(),
  size: IconSize,
  weight: IconWeight.default('regular'),
  color: z.string().optional(),
});

export type IconProps = z.infer<typeof IconSchema>;

export const meta: ComponentMeta = {
  name: 'Icon',
  category: 'icon',
  description: 'Renders icons by name. Uses Phosphor icons by default -- pass any icon name like "house", "gear", "heart". Supports all Iconify icon sets via prefix (e.g. "mdi:home").',
  since: '0.1.0',
  props: [
    { name: 'name', type: 'string', description: 'Icon name: "house", "arrow-right", or full iconify name "mdi:home"' },
    { name: 'size', type: 'number | string', default: '24', description: 'Icon size in pixels' },
    { name: 'weight', type: "'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone'", default: "'regular'", description: 'Phosphor weight variant (ph: icons only)', options: ['thin', 'light', 'regular', 'bold', 'fill', 'duotone'] },
    { name: 'color', type: 'string', description: 'Icon color (CSS value). Defaults to currentColor.' },
  ],
  examples: [
    { title: 'Default', code: '<Icon name="house" />' },
    { title: 'Bold 32px', code: '<Icon name="heart" size={32} weight="bold" />' },
    { title: 'Colored', code: '<Icon name="heart" weight="fill" color="red" />' },
    { title: 'Other icon set', code: '<Icon name="mdi:home" size={24} />' },
  ],
  import: "import { Icon } from 'glassui';",
};
