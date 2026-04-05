import { z } from 'zod/v4';
import { ThemeColor } from '$lib/types/enums';
import { BaseUIPropsSchema } from '$lib/types/base';
import type { ComponentMeta } from '$lib/theme/types';

export const ScrollNavSchema = BaseUIPropsSchema.extend({
  activeId: z.string().optional(),
  offset: z.number().default(0),
  threshold: z.number().default(0.5),
});

export type ScrollNavProps = z.infer<typeof ScrollNavSchema>;

export const meta: ComponentMeta = {
  name: 'ScrollNav',
  category: 'navigation',
  description: 'A sticky top navigation bar that automatically updates its active links based on scroll position, similar to Scrollspy but optimized for horizontal header layouts.',
  since: '1.4.0',
  props: [
    { name: 'activeId', type: 'string', description: 'The bound active section ID.' },
    { name: 'offset', type: 'number', default: '0', description: 'Scroll offset in pixels before a section is considered active.' },
    { name: 'threshold', type: 'number', default: '0.5', description: 'Intersection ratio required to trigger an active state (0.0 to 1.0).' },
    { name: 'color', type: "primary | secondary | accent | destructive | neutral | gradient | info | success | warning | error", description: 'Theme color for active links', options: ['primary', 'secondary', 'accent', 'destructive', 'neutral', 'gradient', 'info', 'success', 'warning', 'error'] },
    { name: 'style', type: "solid | outline | ghost", default: 'ghost', description: 'Render style of active links', options: ['solid', 'outline', 'ghost'] },
    { name: 'glass', type: 'ultra-thin | thin | normal | thick | ultra-thick', default: 'false', description: 'Glass surface density', options: ['false', 'ultra-thin', 'thin', 'true', 'thick', 'ultra-thick'] },
    { name: 'frosted', type: 'light | medium | heavy', default: 'false', description: 'Backdrop blur intensity', options: ['false', 'light', 'true', 'heavy'] },
    { name: 'raised', type: 'boolean', default: 'true', description: 'Elevated with shadow' },
  ],
  examples: [
    { title: 'Basic', code: '<ScrollNav><ScrollNavLink href="#home">Home</ScrollNavLink></ScrollNav>' },
  ],
  import: "import { ScrollNav, ScrollNavLink } from 'glassui';",
};