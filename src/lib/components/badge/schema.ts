import { z } from 'zod/v4';
import { Variant, Size, Status } from '$lib/types/enums';
import type { ComponentMeta } from '$lib/theme/types';

export const BadgeSchema = z.object({
  variant: Variant.default('default'),
  size: Size.default('sm'),
  status: Status.optional(),
  dot: z.boolean().default(false),
  glass: z.union([z.enum(['subtle', 'frosted', 'heavy']), z.boolean()]).default(false),
});

export type BadgeProps = z.infer<typeof BadgeSchema>;

export const meta: ComponentMeta = {
  name: 'Badge',
  category: 'badge',
  description: 'Inline label with variant colors or status colors. Optional glass surface.',
  since: '0.2.0',
  props: [
    { name: 'variant', type: "default | primary | secondary | outline | ghost | destructive", default: 'default', description: 'Visual style', options: ['default', 'primary', 'secondary', 'outline', 'ghost', 'destructive'] },
    { name: 'size', type: "xs | sm | md | lg | xl", default: 'sm', description: 'Badge size', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    { name: 'status', type: "info | success | warning | error", description: 'Status color (overrides variant)', options: ['info', 'success', 'warning', 'error'] },
    { name: 'dot', type: 'boolean', default: 'false', description: 'Show dot indicator before text' },
    { name: 'glass', type: 'subtle | frosted | heavy', default: 'false', description: 'Glass translucency level', options: ['false', 'subtle', 'frosted', 'heavy'] },
  ],
  examples: [
    { title: 'Default', code: '<Badge>Label</Badge>' },
    { title: 'Primary', code: '<Badge variant="primary">New</Badge>' },
    { title: 'Status', code: '<Badge status="success">Active</Badge>' },
    { title: 'Glass', code: '<Badge glass status="info">Info</Badge>' },
  ],
  import: "import { Badge } from 'glassui';",
};
