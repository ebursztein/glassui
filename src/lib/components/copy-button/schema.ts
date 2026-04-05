import { z } from 'zod/v4';
import { Size, ThemeColor } from '$lib/types/enums';
import { BaseUIPropsSchema } from '$lib/types/base';
import type { ComponentMeta } from '$lib/theme/types';

export const CopyButtonSchema = BaseUIPropsSchema.extend({
  value: z.string(),
  iconOnly: z.boolean().default(true),
});

export type CopyButtonProps = z.infer<typeof CopyButtonSchema>;

export const meta: ComponentMeta = {
  name: 'CopyButton',
  category: 'input',
  description: 'A small utility button that copies text to the clipboard and provides visual feedback.',
  since: '0.9.0',
  props: [
    { name: 'value', type: 'string', description: 'The text to copy to the clipboard.' },
    { name: 'iconOnly', type: 'boolean', default: 'true', description: 'If true, only shows the icon. If false, shows "Copy" text.' },
    { name: 'size', type: "xs | sm | md | lg | xl", default: 'md', description: 'Button size', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    { name: 'color', type: "primary | secondary | accent | destructive | neutral | gradient | info | success | warning | error", description: 'Theme color', options: ['primary', 'secondary', 'accent', 'destructive', 'neutral', 'gradient', 'info', 'success', 'warning', 'error'] },
    { name: 'style', type: "solid | outline | ghost", default: 'ghost', description: 'Render style', options: ['solid', 'outline', 'ghost'] },
    { name: 'glass', type: 'ultra-thin | thin | normal | thick | ultra-thick', default: 'false', description: 'Glass surface density', options: ['false', 'ultra-thin', 'thin', 'true', 'thick', 'ultra-thick'] },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disabled state' },
  ],
  examples: [
    { title: 'Basic', code: '<CopyButton value="npm install glassui" />' },
  ],
  import: "import { CopyButton } from 'glassui';",
};