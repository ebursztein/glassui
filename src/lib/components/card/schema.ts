import { z } from 'zod/v4';
import { BaseUIPropsSchema } from '$lib/types/base';
import type { ComponentMeta } from '$lib/theme/types';

export const CardSchema = BaseUIPropsSchema.extend({
  hover: z.enum(['lift', 'brighten', 'glow', 'none']).default('none'),
});

export type CardProps = z.infer<typeof CardSchema>;

export const meta: ComponentMeta = {
  name: 'Card',
  category: 'card',
  description: 'Container with optional glass surface, glow, and hover effects. Compose with CardHeader, CardTitle, CardDescription, CardContent, CardFooter.',
  since: '0.2.0',
  props: [
    { name: 'color', type: 'primary | secondary | accent | destructive | neutral | theme', default: 'neutral', description: 'Theme color tint for glass surface', options: ['neutral', 'primary', 'secondary', 'accent', 'destructive', 'theme'] },
    { name: 'glass', type: 'ultra-thin | thin | normal | thick | ultra-thick', default: 'false', description: 'Glass surface density', options: ['false', 'ultra-thin', 'thin', 'true', 'thick', 'ultra-thick'] },
    { name: 'frosted', type: 'light | medium | heavy', default: 'false', description: 'Backdrop blur intensity', options: ['false', 'light', 'true', 'heavy'] },
    { name: 'raised', type: 'boolean', default: 'false', description: 'Elevated with shadow' },
    { name: 'colored', type: 'boolean', default: 'false', description: 'Colored glass accent orbs behind content' },
    { name: 'reactive', type: 'boolean', default: 'false', description: 'Cursor-tracking proximity glow (requires glass)' },
    { name: 'glow', type: 'sm | md | lg', default: 'false', description: 'Glow intensity', options: ['false', 'sm', 'true', 'lg'] },
    { name: 'hover', type: 'lift | brighten | glow | none', default: 'none', description: 'Hover interaction', options: ['lift', 'brighten', 'glow', 'none'] },
  ],
  examples: [
    { title: 'Solid', code: '<Card><CardContent>Content</CardContent></Card>' },
    { title: 'Glass', code: '<Card glass><CardContent>Frosted</CardContent></Card>' },
    { title: 'Glass + glow', code: '<Card glass glow><CardContent>Glowing</CardContent></Card>' },
    { title: 'Reactive', code: '<Card glass reactive><CardContent>Hover to see glow</CardContent></Card>' },
    { title: 'With header', code: '<Card><CardHeader><CardTitle>Title</CardTitle><CardDescription>Description</CardDescription></CardHeader><CardContent>Body</CardContent></Card>' },
    { title: 'Hoverable', code: '<Card hover="lift"><CardContent>Lifts on hover</CardContent></Card>' },
  ],
  import: "import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from 'glassui';",
};
