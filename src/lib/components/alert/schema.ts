import { z } from 'zod/v4';
import { Status } from '$lib/types/enums';
import type { ComponentMeta } from '$lib/theme/types';

export const AlertSchema = z.object({
  status: Status.default('info'),
  title: z.string().optional(),
  dismissible: z.boolean().default(false),
  icon: z.boolean().default(true),
  glass: z.boolean().default(false),
  glow: z.boolean().default(false),
});

export type AlertProps = z.infer<typeof AlertSchema>;

export const meta: ComponentMeta = {
  name: 'Alert',
  category: 'alert',
  description: 'Status-based alert with icon, title, body, and optional dismiss. Glass and glow support.',
  since: '0.2.0',
  props: [
    { name: 'status', type: "info | success | warning | error", default: 'info', description: 'Alert status', options: ['info', 'success', 'warning', 'error'] },
    { name: 'title', type: 'string', description: 'Alert title' },
    { name: 'dismissible', type: 'boolean', default: 'false', description: 'Show dismiss button' },
    { name: 'icon', type: 'boolean', default: 'true', description: 'Show status icon' },
    { name: 'glass', type: 'boolean', default: 'false', description: 'Enable glass surface' },
    { name: 'glow', type: 'boolean', default: 'false', description: 'Gradient glow effect' },
  ],
  examples: [
    { title: 'Info', code: '<Alert status="info" title="Note">Something to know.</Alert>' },
    { title: 'Success', code: '<Alert status="success" title="Saved">Changes saved.</Alert>' },
    { title: 'Warning', code: '<Alert status="warning" title="Careful">This is destructive.</Alert>' },
    { title: 'Error', code: '<Alert status="error" title="Failed">Something went wrong.</Alert>' },
    { title: 'Glass', code: '<Alert status="info" glass title="Glass Alert">Frosted.</Alert>' },
    { title: 'Dismissible', code: '<Alert status="success" dismissible title="Done">Click X to close.</Alert>' },
  ],
  import: "import { Alert } from 'glassui';",
};
