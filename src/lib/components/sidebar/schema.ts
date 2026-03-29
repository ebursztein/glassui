import { z } from 'zod/v4';
import type { ComponentMeta } from '$lib/theme/types';

export const SidebarSchema = z.object({
  glass: z.boolean().default(false),
});

export type SidebarProps = z.infer<typeof SidebarSchema>;

export const meta: ComponentMeta = {
  name: 'Sidebar',
  category: 'sidebar',
  description: 'Navigation sidebar with sections, items, header, and footer. Preline-inspired with active state indicators and glass support.',
  since: '0.2.0',
  props: [
    { name: 'glass', type: 'boolean', default: 'false', description: 'Enable glass surface on sidebar' },
  ],
  examples: [
    { title: 'Basic', code: '<Sidebar><SidebarSection label="Nav"><SidebarItem href="/home">Home</SidebarItem></SidebarSection></Sidebar>' },
    { title: 'With icon', code: '<SidebarItem href="/settings" icon="gear">Settings</SidebarItem>' },
    { title: 'Active item', code: '<SidebarItem href="/current" active>Current Page</SidebarItem>' },
  ],
  import: "import { Sidebar, SidebarHeader, SidebarSection, SidebarItem, SidebarFooter } from 'glassui';",
};
