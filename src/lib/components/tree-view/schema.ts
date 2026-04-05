import { z } from 'zod/v4';
import { ThemeColor } from '$lib/types/enums';
import { BaseUIPropsSchema } from '$lib/types/base';
import type { ComponentMeta } from '$lib/theme/types';

export interface TreeItem {
  id: string;
  label: string;
  icon?: string;
  disabled?: boolean;
  children?: TreeItem[];
  [key: string]: any;
}

export const TreeViewSchema = BaseUIPropsSchema.extend({
  items: z.array(z.any()), // array of TreeItems
  selected: z.array(z.string()).default([]),
  expanded: z.array(z.string()).default([]),
  selectable: z.boolean().default(false),
  autoSelectChildren: z.boolean().default(true),
});

export type TreeViewProps = z.infer<typeof TreeViewSchema>;

export const meta: ComponentMeta = {
  name: 'TreeView',
  category: 'disclosure',
  description: 'A hierarchical list of items, supporting nested folders, icons, and cascading selection.',
  since: '0.4.0',
  props: [
    { name: 'items', type: 'TreeItem[]', description: 'Hierarchical array of data to render.' },
    { name: 'selected', type: 'string[]', default: '[]', description: 'Bound array of selected item IDs.' },
    { name: 'expanded', type: 'string[]', default: '[]', description: 'Bound array of expanded folder IDs.' },
    { name: 'selectable', type: 'boolean', default: 'false', description: 'Whether checkboxes are rendered.' },
    { name: 'autoSelectChildren', type: 'boolean', default: 'true', description: 'Whether checking a folder automatically checks all its children.' },
    { name: 'color', type: "primary | secondary | accent | destructive | neutral | gradient | info | success | warning | error", description: 'Theme color for checkboxes and active text', options: ['primary', 'secondary', 'accent', 'destructive', 'neutral', 'gradient', 'info', 'success', 'warning', 'error'] },
    { name: 'glass', type: 'ultra-thin | thin | normal | thick | ultra-thick', default: 'false', description: 'Glass surface density', options: ['false', 'ultra-thin', 'thin', 'true', 'thick', 'ultra-thick'] },
    { name: 'frosted', type: 'light | medium | heavy', default: 'false', description: 'Backdrop blur intensity', options: ['false', 'light', 'true', 'heavy'] },
    { name: 'raised', type: 'boolean', default: 'false', description: 'Elevated with shadow' },
  ],
  examples: [
    { title: 'Basic', code: '<TreeView items={[{ id: "1", label: "Folder", children: [{ id: "2", label: "File" }] }]} />' },
  ],
  import: "import { TreeView, type TreeItem } from 'glassui';",
};