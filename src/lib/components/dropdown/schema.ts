import { z } from 'zod/v4';
import { Size, ThemeColor } from '$lib/types/enums';
import { BaseUIPropsSchema } from '$lib/types/base';
import type { ComponentMeta } from '$lib/theme/types';

export const DropdownSchema = BaseUIPropsSchema.extend({
  open: z.boolean().default(false),
  placement: z.enum(['bottom-start', 'bottom-end', 'top-start', 'top-end', 'right-start', 'left-start']).default('bottom-start'),
  trigger: z.enum(['click', 'hover']).default('click'),
  offset: z.number().default(8),
});

export type DropdownProps = z.infer<typeof DropdownSchema>;

export const meta: ComponentMeta = {
  name: 'Dropdown',
  category: 'overlay',
  description: 'A contextual menu that opens adjacent to a trigger element to offer a list of actions or options.',
  since: '0.6.0',
  props: [
    { name: 'open', type: 'boolean', default: 'false', description: 'Whether the dropdown menu is visible.' },
    { name: 'placement', type: 'string', default: 'bottom-start', options: ['bottom-start', 'bottom-end', 'top-start', 'top-end', 'right-start', 'left-start'], description: 'Position of the menu relative to the trigger.' },
    { name: 'trigger', type: 'click | hover', default: 'click', options: ['click', 'hover'], description: 'Action that opens the dropdown.' },
    { name: 'offset', type: 'number', default: '8', description: 'Distance in pixels from the trigger.' },
    { name: 'color', type: "primary | secondary | accent | destructive | neutral | gradient | info | success | warning | error", description: 'Theme color for the dropdown menu pane.', options: ['primary', 'secondary', 'accent', 'destructive', 'neutral', 'gradient', 'info', 'success', 'warning', 'error'] },
    { name: 'style', type: "solid | outline | ghost", default: 'solid', description: 'Render style', options: ['solid', 'outline', 'ghost'] },
    { name: 'glass', type: 'ultra-thin | thin | normal | thick | ultra-thick', default: 'false', description: 'Glass surface density', options: ['false', 'ultra-thin', 'thin', 'true', 'thick', 'ultra-thick'] },
    { name: 'frosted', type: 'light | medium | heavy', default: 'false', description: 'Backdrop blur intensity', options: ['false', 'light', 'true', 'heavy'] },
    { name: 'raised', type: 'boolean', default: 'true', description: 'Elevated with shadow' },
  ],
  examples: [
    { title: 'Basic', code: '<Dropdown><DropdownTrigger><Button>Menu</Button></DropdownTrigger><DropdownMenu><DropdownItem>Profile</DropdownItem><DropdownItem>Settings</DropdownItem></DropdownMenu></Dropdown>' },
  ],
  import: "import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from 'glassui';",
};