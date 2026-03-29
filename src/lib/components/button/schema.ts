import { z } from 'zod/v4';
import { Variant, Size } from '$lib/types/enums';
import type { ComponentMeta } from '$lib/theme/types';

export const ButtonSchema = z.object({
  variant: Variant.default('default'),
  size: Size.default('md'),
  glass: z.boolean().default(false),
  blur: z.enum(['sm', 'md', 'lg', 'xl']).default('xl'),
  glow: z.boolean().default(false),
  disabled: z.boolean().default(false),
});

export type ButtonProps = z.infer<typeof ButtonSchema>;

export const meta: ComponentMeta = {
  name: 'Button',
  category: 'button',
  description: 'Button with 5 variants, 5 sizes. Optional glass surface and glow effect.',
  since: '0.1.0',
  props: [
    { name: 'variant', type: "default | primary | outline | ghost | destructive", default: 'default', description: 'Visual style variant', options: ['default', 'primary', 'outline', 'ghost', 'destructive'] },
    { name: 'size', type: "xs | sm | md | lg | xl", default: 'md', description: 'Button size', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    { name: 'glass', type: 'boolean', default: 'false', description: 'Enable glass surface (backdrop-blur + translucent bg)' },
    { name: 'glow', type: 'boolean', default: 'false', description: 'Gradient glow effect behind button' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disabled state' },
  ],
  examples: [
    { title: 'Default', code: '<Button>Click me</Button>' },
    { title: 'Primary', code: '<Button variant="primary">Save</Button>' },
    { title: 'Glass', code: '<Button glass>Glass</Button>' },
    { title: 'Glass + glow', code: '<Button variant="primary" glass glow>Save</Button>' },
    { title: 'Outline', code: '<Button variant="outline">Cancel</Button>' },
    { title: 'Ghost', code: '<Button variant="ghost">More info</Button>' },
    { title: 'Destructive', code: '<Button variant="destructive">Delete</Button>' },
    { title: 'With icon', code: '<Button variant="primary"><Icon icon={FloppyDisk} size={16} weight="bold" /> Save</Button>' },
  ],
  import: "import { Button } from 'glassui';",
};
