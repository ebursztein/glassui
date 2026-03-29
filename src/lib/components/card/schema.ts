import { z } from 'zod/v4';
import type { ComponentMeta } from '$lib/theme/types';

export const CardSchema = z.object({
  glass: z.boolean().default(false),
  blur: z.enum(['sm', 'md', 'lg', 'xl']).default('xl'),
  glow: z.boolean().default(false),
  hover: z.enum(['lift', 'brighten', 'glow', 'none']).default('none'),
  bg: z.enum(['gradient', 'mesh']).optional(),
});

export type CardProps = z.infer<typeof CardSchema>;

export const meta: ComponentMeta = {
  name: 'Card',
  category: 'card',
  description: 'Container with optional glass surface, glow, and hover effects. Compose with CardHeader, CardTitle, CardDescription, CardContent, CardFooter.',
  since: '0.2.0',
  props: [
    { name: 'glass', type: 'boolean', default: 'false', description: 'Enable glass surface (backdrop-blur + translucent bg)' },
    { name: 'blur', type: 'sm | md | lg | xl', default: 'xl', description: 'Backdrop blur level (requires glass)', options: ['sm', 'md', 'lg', 'xl'] },
    { name: 'glow', type: 'boolean', default: 'false', description: 'Gradient glow effect behind card' },
    { name: 'hover', type: 'lift | brighten | glow | none', default: 'none', description: 'Hover interaction', options: ['lift', 'brighten', 'glow', 'none'] },
    { name: 'bg', type: 'gradient | mesh', description: 'Internal gradient orb background -- makes glass components inside look great', options: ['gradient', 'mesh'] },
  ],
  examples: [
    { title: 'Solid', code: '<Card><CardContent>Content</CardContent></Card>' },
    { title: 'Glass', code: '<Card glass><CardContent>Frosted</CardContent></Card>' },
    { title: 'Glass + glow', code: '<Card glass glow><CardContent>Glowing</CardContent></Card>' },
    { title: 'With header', code: '<Card><CardHeader><CardTitle>Title</CardTitle><CardDescription>Description</CardDescription></CardHeader><CardContent>Body</CardContent></Card>' },
    { title: 'Hoverable', code: '<Card hover="lift"><CardContent>Lifts on hover</CardContent></Card>' },
  ],
  import: "import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from 'glassui';",
};
