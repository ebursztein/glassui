import { z } from 'zod/v4';
import { Size, ThemeColor } from '$lib/types/enums';
import { BaseUIPropsSchema } from '$lib/types/base';
import type { ComponentMeta } from '$lib/theme/types';

export const DataTableSchema = BaseUIPropsSchema.extend({
  data: z.array(z.record(z.string(), z.any())).default([]),
  columns: z.array(z.object({
    key: z.string(),
    label: z.string(),
    sortable: z.boolean().optional(),
    align: z.enum(['left', 'center', 'right']).optional(),
  })).default([]),
  sortable: z.boolean().default(false),
  searchable: z.boolean().default(false),
  pagination: z.boolean().default(false),
  pageSize: z.number().default(10),
});

export type DataTableProps = z.infer<typeof DataTableSchema>;

export const meta: ComponentMeta = {
  name: 'DataTable',
  category: 'data display',
  description: 'A powerful data grid component with built-in sorting, searching, and pagination, fully styled for GlassUI.',
  since: '1.0.0',
  props: [
    { name: 'data', type: 'Record<string, any>[]', description: 'Array of data objects to display.' },
    { name: 'columns', type: '{ key: string, label: string, sortable?: boolean, align?: "left" | "center" | "right" }[]', description: 'Column definitions.' },
    { name: 'sortable', type: 'boolean', default: 'false', description: 'Enable clicking column headers to sort data.' },
    { name: 'searchable', type: 'boolean', default: 'false', description: 'Enable a global search input to filter rows.' },
    { name: 'pagination', type: 'boolean', default: 'false', description: 'Enable paginating data into multiple pages.' },
    { name: 'pageSize', type: 'number', default: '10', description: 'Number of rows per page (if pagination is enabled).' },
    { name: 'color', type: "primary | secondary | accent | destructive | neutral | gradient | info | success | warning | error", description: 'Theme color for active states (pagination, sorting icons)', options: ['primary', 'secondary', 'accent', 'destructive', 'neutral', 'gradient', 'info', 'success', 'warning', 'error'] },
    { name: 'glass', type: 'ultra-thin | thin | normal | thick | ultra-thick', default: 'false', description: 'Glass surface density', options: ['false', 'ultra-thin', 'thin', 'true', 'thick', 'ultra-thick'] },
    { name: 'frosted', type: 'light | medium | heavy', default: 'false', description: 'Backdrop blur intensity', options: ['false', 'light', 'true', 'heavy'] },
    { name: 'raised', type: 'boolean', default: 'true', description: 'Elevated with shadow' },
  ],
  examples: [
    { title: 'Basic', code: '<DataTable columns={[{key: "name", label: "Name"}]} data={[{name: "Alice"}]} />' },
  ],
  import: "import { DataTable } from 'glassui';",
};