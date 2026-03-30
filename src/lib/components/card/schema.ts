import { z } from 'zod/v4';
import type { ComponentMeta } from '$lib/theme/types';

export const CardSchema = z.object({
  glass: z.union([z.enum(['subtle', 'frosted', 'heavy']), z.boolean()]).default(false),
  glassbg: z.boolean().default(false),
  glow: z.union([z.enum(['sm', 'md', 'lg']), z.boolean()]).default(false),
  hover: z.enum(['lift', 'brighten', 'glow', 'none']).default('none'),
});

export type CardProps = z.infer<typeof CardSchema>;

export const meta: ComponentMeta = {
  name: 'Card',
  category: 'card',
  description: 'Container with optional glass surface, glow, and hover effects. Compose with CardHeader, CardTitle, CardDescription, CardContent, CardFooter.',
  since: '0.2.0',
  props: [
    { name: 'glass', type: 'subtle | frosted | heavy', default: 'false', description: 'Glass translucency level', options: ['false', 'subtle', 'frosted', 'heavy'] },
    { name: 'glassbg', type: 'boolean', default: 'false', description: 'Themed gradient backdrop' },
    { name: 'glow', type: 'sm | md | lg', default: 'false', description: 'Glow intensity', options: ['false', 'sm', 'md', 'lg'] },
    { name: 'hover', type: 'lift | brighten | glow | none', default: 'none', description: 'Hover interaction', options: ['lift', 'brighten', 'glow', 'none'] },
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
