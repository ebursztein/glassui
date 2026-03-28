import { z } from 'zod/v4';
import { Variant, Size } from '$lib/types/enums';
import type { ComponentMeta } from '$lib/theme/types';

export const ButtonSchema = z.object({
  variant: Variant.default('default'),
  size: Size.default('md'),
  glowEffect: z.boolean().default(false),
  disabled: z.boolean().default(false),
});

export type ButtonProps = z.infer<typeof ButtonSchema>;

export const meta: ComponentMeta = {
  name: 'Button',
  category: 'button',
  description: 'Button component with glass surface, 5 variants, 5 sizes, and optional glow effect. Hover, focus, and motion are handled internally by the design system.',
  since: '0.1.0',
  props: [
    { name: 'variant', type: "default | primary | outline | ghost | destructive", default: 'default', description: 'Visual style variant', options: ['default', 'primary', 'outline', 'ghost', 'destructive'] },
    { name: 'size', type: "xs | sm | md | lg | xl", default: 'md', description: 'Button size', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    { name: 'glowEffect', type: 'boolean', default: 'false', description: 'Show gradient glow effect behind button' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disabled state' },
  ],
  examples: [
    { title: 'Default', code: '<Button>Click me</Button>' },
    { title: 'Primary with glow', code: '<Button variant="primary" glowEffect>Save</Button>' },
    { title: 'Outline', code: '<Button variant="outline">Cancel</Button>' },
    { title: 'Ghost', code: '<Button variant="ghost">More info</Button>' },
    { title: 'Destructive', code: '<Button variant="destructive">Delete</Button>' },
    { title: 'Small', code: '<Button size="sm">Small</Button>' },
    { title: 'Large', code: '<Button size="lg">Large</Button>' },
    { title: 'With icon', code: '<Button variant="primary"><Icon icon={FloppyDisk} size={16} weight="bold" /> Save</Button>' },
  ],
  import: "import { Button } from 'glassui';",
};
