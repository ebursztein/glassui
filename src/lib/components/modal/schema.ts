import { z } from 'zod/v4';
import { Size, ThemeColor } from '$lib/types/enums';
import { BaseUIPropsSchema } from '$lib/types/base';
import type { ComponentMeta } from '$lib/theme/types';

export const ModalSchema = BaseUIPropsSchema.extend({
  open: z.boolean().default(false),
  size: Size.default('md'),
  backdrop: z.boolean().default(true),
  backdropClosable: z.boolean().default(true),
});

export type ModalProps = z.infer<typeof ModalSchema>;

export const meta: ComponentMeta = {
  name: 'Modal',
  category: 'overlay',
  description: 'A dialog box/popup window that is displayed on top of the current page, interrupting the current workflow to prompt the user or display critical information.',
  since: '0.6.0',
  props: [
    { name: 'open', type: 'boolean', default: 'false', description: 'Whether the modal is visible.' },
    { name: 'size', type: "xs | sm | md | lg | xl | full", default: 'md', options: ['xs', 'sm', 'md', 'lg', 'xl', 'full'], description: 'Maximum width of the modal.' },
    { name: 'backdrop', type: 'boolean', default: 'true', description: 'Whether to show the dark backdrop behind the modal.' },
    { name: 'backdropClosable', type: 'boolean', default: 'true', description: 'Whether clicking the backdrop closes the modal.' },
    { name: 'color', type: "primary | secondary | accent | destructive | neutral | gradient | info | success | warning | error", description: 'Theme color applied to the modal surface.', options: ['primary', 'secondary', 'accent', 'destructive', 'neutral', 'gradient', 'info', 'success', 'warning', 'error'] },
    { name: 'style', type: "solid | outline | ghost", default: 'solid', description: 'Render style', options: ['solid', 'outline', 'ghost'] },
    { name: 'glass', type: 'ultra-thin | thin | normal | thick | ultra-thick', default: 'false', description: 'Glass surface density', options: ['false', 'ultra-thin', 'thin', 'true', 'thick', 'ultra-thick'] },
    { name: 'frosted', type: 'light | medium | heavy', default: 'false', description: 'Backdrop blur intensity for the modal pane', options: ['false', 'light', 'true', 'heavy'] },
    { name: 'raised', type: 'boolean', default: 'true', description: 'Elevated with shadow' },
  ],
  examples: [
    { title: 'Basic', code: '<Modal bind:open={isOpen}><ModalContent><ModalHeader><ModalTitle>Title</ModalTitle><ModalClose /></ModalHeader><ModalBody>Content</ModalBody></ModalContent></Modal>' },
  ],
  import: "import { Modal, ModalContent, ModalHeader, ModalTitle, ModalBody, ModalFooter, ModalClose } from 'glassui';",
};