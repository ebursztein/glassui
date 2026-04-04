import { z } from 'zod/v4';
import { GlassField, FrostedField, GlowField } from '$lib/types/base';
import type { ComponentMeta } from '$lib/theme/types';

export const SidebarSchema = z.object({
  glass: GlassField,
  frosted: FrostedField,
  colored: z.boolean().default(false),
  raised: z.boolean().default(false),
  glow: GlowField,
});

export type SidebarProps = z.infer<typeof SidebarSchema>;

export const meta: ComponentMeta = {
  name: 'Sidebar',
  category: 'sidebar',
  description: 'Navigation sidebar with sections, items, header, and footer. Preline-inspired with active state indicators and glass support.',
  since: '0.2.0',
  props: [
    { name: 'glass', type: 'ultra-thin | thin | normal | thick | ultra-thick', default: 'false', description: 'Glass surface density', options: ['false', 'ultra-thin', 'thin', 'true', 'thick', 'ultra-thick'] },
    { name: 'frosted', type: 'light | medium | heavy', default: 'false', description: 'Backdrop blur intensity', options: ['false', 'light', 'true', 'heavy'] },
    { name: 'colored', type: 'boolean', default: 'false', description: 'Colored glass accent orbs behind content' },
    { name: 'raised', type: 'boolean', default: 'false', description: 'Elevated with shadow' },
    { name: 'glow', type: 'sm | md | lg', default: 'false', description: 'Glow intensity', options: ['false', 'sm', 'true', 'lg'] },
  ],
  examples: [
    { title: 'Basic', code: '<Sidebar><SidebarSection label="Nav"><SidebarItem href="/home">Home</SidebarItem></SidebarSection></Sidebar>' },
    { title: 'With icon', code: '<SidebarItem href="/settings" icon="gear">Settings</SidebarItem>' },
    { title: 'Active item', code: '<SidebarItem href="/current" active>Current Page</SidebarItem>' },
    { title: 'Glass', code: '<Sidebar glass><SidebarSection label="Nav"><SidebarItem href="/home">Home</SidebarItem></SidebarSection></Sidebar>' },
  ],
  import: "import { Sidebar, SidebarHeader, SidebarSection, SidebarItem, SidebarFooter } from 'glassui';",
};
