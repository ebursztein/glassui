import { z } from 'zod/v4';
import type { ComponentMeta } from '$lib/theme/types';

export const ThemeSwitcherSchema = z.object({
  showPresets: z.boolean().default(true),
  showMode: z.boolean().default(true),
});

export type ThemeSwitcherProps = z.infer<typeof ThemeSwitcherSchema>;

export const meta: ComponentMeta = {
  name: 'ThemeSwitcher',
  category: 'theme-switcher',
  description: 'Compact theme control with preset dots and dark/light mode toggle. Uses global theme state.',
  since: '0.2.0',
  props: [
    { name: 'showPresets', type: 'boolean', default: 'true', description: 'Show theme preset dots' },
    { name: 'showMode', type: 'boolean', default: 'true', description: 'Show dark/light mode toggle' },
  ],
  examples: [
    { title: 'Full', code: '<ThemeSwitcher />' },
    { title: 'Presets only', code: '<ThemeSwitcher showMode={false} />' },
    { title: 'Mode only', code: '<ThemeSwitcher showPresets={false} />' },
  ],
  import: "import { ThemeSwitcher } from 'glassui';",
};
