import { z } from 'zod/v4';
import { ThemeColor } from '$lib/types/enums';
import { BaseUIPropsSchema } from '$lib/types/base';
import type { ComponentMeta } from '$lib/theme/types';

export const TabsSchema = BaseUIPropsSchema.extend({
  value: z.string().optional(),
  orientation: z.enum(['horizontal', 'vertical']).default('horizontal'),
  variant: z.enum(['underline', 'pills', 'segmented']).default('underline'),
});

export type TabsProps = z.infer<typeof TabsSchema>;

export const meta: ComponentMeta = {
  name: 'Tabs',
  category: 'navigation',
  description: 'A set of layered sections of content, known as tab panels, that are displayed one at a time.',
  since: '0.5.0',
  props: [
    { name: 'value', type: 'string', description: 'The bound active tab value.' },
    { name: 'variant', type: 'underline | pills | segmented', default: 'underline', options: ['underline', 'pills', 'segmented'], description: 'Visual style of the tabs.' },
    { name: 'orientation', type: 'horizontal | vertical', default: 'horizontal', options: ['horizontal', 'vertical'], description: 'Layout direction of the tab list.' },
    { name: 'color', type: "primary | secondary | accent | destructive | neutral | gradient | info | success | warning | error", description: 'Theme color for active tabs', options: ['primary', 'secondary', 'accent', 'destructive', 'neutral', 'gradient', 'info', 'success', 'warning', 'error'] },
    { name: 'style', type: "solid | outline | ghost", default: 'solid', description: 'Render style', options: ['solid', 'outline', 'ghost'] },
    { name: 'glass', type: 'ultra-thin | thin | normal | thick | ultra-thick', default: 'false', description: 'Glass surface density', options: ['false', 'ultra-thin', 'thin', 'true', 'thick', 'ultra-thick'] },
    { name: 'frosted', type: 'light | medium | heavy', default: 'false', description: 'Backdrop blur intensity', options: ['false', 'light', 'true', 'heavy'] },
    { name: 'raised', type: 'boolean', default: 'false', description: 'Elevated with shadow' },
  ],
  examples: [
    { title: 'Basic', code: '<Tabs value="1"><TabList><Tab value="1">One</Tab></TabList><TabPanel value="1">Content</TabPanel></Tabs>' },
  ],
  import: "import { Tabs, TabList, Tab, TabPanel } from 'glassui';",
};