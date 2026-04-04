import { z } from 'zod/v4';
import { ThemeColor, RenderStyle, Size } from '$lib/types/enums';
import { BaseUIPropsSchema } from '$lib/types/base';
import type { ComponentMeta } from '$lib/theme/types';

export const BadgeSchema = BaseUIPropsSchema.extend({
  color: ThemeColor.default('neutral'),
  style: RenderStyle.default('solid'),
  size: Size.default('sm'),
  dot: z.boolean().default(false),
});

export type BadgeProps = z.infer<typeof BadgeSchema>;

export const meta: ComponentMeta = {
  name: 'Badge',
  category: 'badge',
  description: 'Inline label with theme colors.',
  since: '0.2.0',
  props: [
    { name: 'color', type: "ThemeColor", default: 'neutral', description: 'Theme color', options: ['primary', 'secondary', 'accent', 'destructive', 'neutral', 'info', 'success', 'warning', 'error'] },
    { name: 'style', type: "solid | outline | ghost", default: 'solid', description: 'Render style', options: ['solid', 'outline', 'ghost'] },
    { name: 'size', type: "xs | sm | md | lg | xl", default: 'sm', description: 'Badge size', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    { name: 'dot', type: 'boolean', default: 'false', description: 'Show dot indicator before text' },
    { name: 'glass', type: 'ultra-thin | thin | normal | thick | ultra-thick', default: 'false', description: 'Glass surface density', options: ['false', 'ultra-thin', 'thin', 'true', 'thick', 'ultra-thick'] },
    { name: 'frosted', type: 'light | medium | heavy', default: 'false', description: 'Backdrop blur intensity', options: ['false', 'light', 'true', 'heavy'] },
    { name: 'colored', type: 'boolean', default: 'false', description: 'Colored glass accent orbs behind content' },
    { name: 'raised', type: 'boolean', default: 'false', description: 'Elevated with shadow' },
    { name: 'glow', type: 'sm | md | lg', default: 'false', description: 'Glow intensity', options: ['false', 'sm', 'true', 'lg'] },
  ],
  examples: [
    { title: 'Default', code: '<Badge>Label</Badge>' },
    { title: 'Primary', code: '<Badge color="primary">New</Badge>' },
    { title: 'Status', code: '<Badge color="success">Active</Badge>' },
    { title: 'Glass', code: '<Badge glass color="info">Info</Badge>' },
  ],
  import: "import { Badge } from 'glassui';",
};
