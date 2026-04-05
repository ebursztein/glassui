import { z } from 'zod/v4';
import { Size, ThemeColor } from '$lib/types/enums';
import { BaseUIPropsSchema } from '$lib/types/base';
import type { ComponentMeta } from '$lib/theme/types';

export const FileUploadSchema = BaseUIPropsSchema.extend({
  label: z.string().optional(),
  error: z.string().optional(),
  helperText: z.string().optional(),
});

export type FileUploadProps = z.infer<typeof FileUploadSchema>;

export const meta: ComponentMeta = {
  name: 'FileUpload',
  category: 'input',
  description: 'A drag and drop file upload zone with visual feedback.',
  since: '0.9.0',
  props: [
    { name: 'color', type: "primary | secondary | accent | destructive | neutral | gradient | info | success | warning | error", description: 'Theme color for focus/active states.', options: ['primary', 'secondary', 'accent', 'destructive', 'neutral', 'gradient', 'info', 'success', 'warning', 'error'] },
    { name: 'label', type: 'string', description: 'Label text above input' },
    { name: 'error', type: 'string', description: 'Error message' },
    { name: 'helperText', type: 'string', description: 'Helper text' },
    { name: 'glass', type: 'ultra-thin | thin | normal | thick | ultra-thick', default: 'false', description: 'Glass surface density', options: ['false', 'ultra-thin', 'thin', 'true', 'thick', 'ultra-thick'] },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disabled state' },
  ],
  examples: [
    { title: 'Basic', code: '<FileUpload />' },
  ],
  import: "import { FileUpload } from 'glassui';",
};