import { z } from 'zod/v4';
import { ThemeColor, RenderStyle, Size } from '$lib/types/enums';
import { BaseUIPropsSchema } from '$lib/types/base';
import type { ComponentMeta } from '$lib/theme/types';

export const ButtonSchema = BaseUIPropsSchema.extend({
  color: ThemeColor.default('primary'),
  style: RenderStyle.default('solid'),
  size: Size.default('md'),
  loading: z.boolean().default(false),
});

export type ButtonProps = z.infer<typeof ButtonSchema>;

export const meta: ComponentMeta = {
  name: 'Button',
  category: 'button',
  description: 'Button with theme colors, render styles, and composable visual effects.',
  since: '0.1.0',
  props: [
    { name: 'color', type: "primary | secondary | accent | destructive | neutral", default: 'primary', description: 'Theme color', options: ['primary', 'secondary', 'accent', 'destructive', 'neutral'] },
    { name: 'style', type: "solid | outline | ghost", default: 'solid', description: 'Render style', options: ['solid', 'outline', 'ghost'] },
    { name: 'size', type: "xs | sm | md | lg | xl", default: 'md', description: 'Button size', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    { name: 'glass', type: 'ultra-thin | thin | normal | thick | ultra-thick', default: 'false', description: 'Glass surface density', options: ['false', 'ultra-thin', 'thin', 'true', 'thick', 'ultra-thick'] },
    { name: 'frosted', type: 'light | medium | heavy', default: 'false', description: 'Backdrop blur intensity', options: ['false', 'light', 'true', 'heavy'] },
    { name: 'colored', type: 'boolean', default: 'false', description: 'Colored glass accent orbs behind content' },
    { name: 'raised', type: 'boolean', default: 'false', description: 'Elevated with shadow' },
    { name: 'reactive', type: 'boolean', default: 'false', description: 'Cursor-tracking proximity glow (requires glass)' },
    { name: 'glow', type: 'sm | md | lg', default: 'false', description: 'Glow intensity', options: ['false', 'sm', 'true', 'lg'] },
    { name: 'loading', type: 'boolean', default: 'false', description: 'Loading state with spinner' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disabled state' },
  ],
  examples: [
    { title: 'Primary', code: '<Button>Save</Button>' },
    { title: 'Secondary', code: '<Button color="secondary">Details</Button>' },
    { title: 'Outline', code: '<Button style="outline">Cancel</Button>' },
    { title: 'Ghost', code: '<Button style="ghost">More info</Button>' },
    { title: 'Destructive', code: '<Button color="destructive">Delete</Button>' },
    { title: 'Glass', code: '<Button glass glow>Glass</Button>' },
  ],
  import: "import { Button } from 'glassui';",
};
