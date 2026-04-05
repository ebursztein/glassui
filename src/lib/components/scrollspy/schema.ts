import { z } from 'zod/v4';
import { ThemeColor } from '$lib/types/enums';
import { BaseUIPropsSchema } from '$lib/types/base';
import type { ComponentMeta } from '$lib/theme/types';

export const ScrollspySchema = BaseUIPropsSchema.extend({
  activeId: z.string().optional(),
  offset: z.number().default(0),
});

export type ScrollspyProps = z.infer<typeof ScrollspySchema>;

export const meta: ComponentMeta = {
  name: 'Scrollspy',
  category: 'navigation',
  description: 'Navigation mechanism that automatically updates active links based on scroll position to indicate which section is currently in the viewport.',
  since: '0.5.0',
  props: [
    { name: 'activeId', type: 'string', description: 'The bound active section ID.' },
    { name: 'offset', type: 'number', default: '0', description: 'Scroll offset in pixels before a section is considered active.' },
    { name: 'color', type: "primary | secondary | accent | destructive | neutral | gradient | info | success | warning | error", description: 'Theme color for active links', options: ['primary', 'secondary', 'accent', 'destructive', 'neutral', 'gradient', 'info', 'success', 'warning', 'error'] },
    { name: 'style', type: "solid | outline | ghost", default: 'ghost', description: 'Render style of active links', options: ['solid', 'outline', 'ghost'] },
  ],
  examples: [
    { title: 'Basic', code: '<Scrollspy><ScrollspyNav><ScrollspyLink href="#section1">One</ScrollspyLink></ScrollspyNav></Scrollspy>' },
  ],
  import: "import { Scrollspy, ScrollspyNav, ScrollspyLink } from 'glassui';",
};