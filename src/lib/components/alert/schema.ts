import { z } from 'zod/v4';
import { Status } from '$lib/types/enums';
import { BaseUIPropsSchema } from '$lib/types/base';
import type { ComponentMeta } from '$lib/theme/types';

export const AlertSchema = BaseUIPropsSchema.extend({
  status: Status.default('info'),
  title: z.string().optional(),
  dismissible: z.boolean().default(false),
  icon: z.boolean().default(true),
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
    { name: 'glass', type: 'ultra-thin | thin | normal | thick | ultra-thick', default: 'false', description: 'Glass surface density', options: ['false', 'ultra-thin', 'thin', 'true', 'thick', 'ultra-thick'] },
    { name: 'frosted', type: 'light | medium | heavy', default: 'false', description: 'Backdrop blur intensity', options: ['false', 'light', 'true', 'heavy'] },
    { name: 'raised', type: 'boolean', default: 'false', description: 'Elevated with shadow' },
    { name: 'colored', type: 'boolean', default: 'false', description: 'Colored glass accent orbs behind content' },
    { name: 'glow', type: 'sm | md | lg', default: 'false', description: 'Glow intensity', options: ['false', 'sm', 'true', 'lg'] },
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
