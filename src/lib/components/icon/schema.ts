import { z } from 'zod/v4';
import type { ComponentMeta } from '$lib/theme/types';

/** Icon stroke weight / style */
export const IconWeight = z.enum(['thin', 'light', 'regular', 'bold', 'fill', 'duotone']);
export type IconWeight = z.infer<typeof IconWeight>;

/** Icon size in pixels */
export const IconSize = z.union([z.number(), z.string()]).default(24);
export type IconSize = z.infer<typeof IconSize>;

export const IconSchema = z.object({
  size: IconSize,
  weight: IconWeight.default('regular'),
  color: z.string().optional(),
  mirrored: z.boolean().default(false),
});

export type IconProps = z.infer<typeof IconSchema>;

export const meta: ComponentMeta = {
  name: 'Icon',
  category: 'icon',
  description: 'Wraps Phosphor Icons with validated size and weight. Import specific icons from phosphor-svelte and pass as the icon prop, or use standalone Phosphor components with size/weight props.',
  since: '0.1.0',
  props: [
    { name: 'icon', type: 'Component', description: 'Phosphor icon component' },
    { name: 'size', type: 'number | string', default: '24', description: 'Icon size in pixels or CSS value' },
    { name: 'weight', type: "'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone'", default: "'regular'", description: 'Icon weight/thickness', options: ['thin', 'light', 'regular', 'bold', 'fill', 'duotone'] },
    { name: 'color', type: 'string', default: "'currentColor'", description: 'Icon color' },
    { name: 'mirrored', type: 'boolean', default: 'false', description: 'Mirror the icon horizontally' },
  ],
  examples: [
    { title: 'Default', code: '<Icon icon={House} />' },
    { title: 'Thin 16px', code: '<Icon icon={Gear} size={16} weight="thin" />' },
    { title: 'Bold 32px', code: '<Icon icon={Heart} size={32} weight="bold" />' },
    { title: 'Direct phosphor', code: '<Heart size={24} weight="fill" color="red" />' },
  ],
  import: "import { Icon } from 'glassui';\nimport { House, Gear, Heart } from 'phosphor-svelte';",
};
