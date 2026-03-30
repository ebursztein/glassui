import { z } from 'zod/v4';
import { Variant, Size } from '$lib/types/enums';
import type { ComponentMeta } from '$lib/theme/types';

export const ButtonSchema = z.object({
  variant: Variant.default('default'),
  size: Size.default('md'),
  glass: z.union([z.enum(['subtle', 'frosted', 'heavy']), z.boolean()]).default(false),
  glassbg: z.boolean().default(false),
  glow: z.union([z.enum(['sm', 'md', 'lg']), z.boolean()]).default(false),
  loading: z.boolean().default(false),
  disabled: z.boolean().default(false),
});

export type ButtonProps = z.infer<typeof ButtonSchema>;

export const meta: ComponentMeta = {
  name: 'Button',
  category: 'button',
  description: 'Button with 6 variants, 5 sizes. Optional glass surface and glow effect.',
  since: '0.1.0',
  props: [
    { name: 'variant', type: "default | primary | secondary | outline | ghost | destructive", default: 'default', description: 'Visual style variant', options: ['default', 'primary', 'secondary', 'outline', 'ghost', 'destructive'] },
    { name: 'size', type: "xs | sm | md | lg | xl", default: 'md', description: 'Button size', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    { name: 'glass', type: 'subtle | frosted | heavy', default: 'false', description: 'Glass translucency level', options: ['false', 'subtle', 'frosted', 'heavy'] },
    { name: 'glassbg', type: 'boolean', default: 'false', description: 'Themed gradient backdrop' },
    { name: 'glow', type: 'sm | md | lg', default: 'false', description: 'Glow intensity', options: ['false', 'sm', 'md', 'lg'] },
    { name: 'loading', type: 'boolean', default: 'false', description: 'Loading state with spinner' },
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
