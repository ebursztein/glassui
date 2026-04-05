import { z } from 'zod/v4';
import type { ComponentMeta } from '$lib/theme/types';

export const CollapseSchema = z.object({
  open: z.boolean().default(false),
  id: z.string().optional(),
});

export type CollapseProps = z.infer<typeof CollapseSchema>;

export const meta: ComponentMeta = {
  name: 'Collapse',
  category: 'disclosure',
  description: 'A low-level wrapper that vertically slides its content open and closed. Not visually styled by default.',
  since: '0.4.0',
  props: [
    { name: 'open', type: 'boolean', default: 'false', description: 'Whether the content is visible and expanded' },
    { name: 'id', type: 'string', description: 'ID for the collapsible region (used for aria-controls)' },
  ],
  examples: [
    { title: 'Basic', code: '<Collapse open={true}>Content</Collapse>' }
  ],
  import: "import { Collapse } from 'glassui';",
};