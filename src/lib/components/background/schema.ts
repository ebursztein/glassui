import { z } from 'zod/v4';
import type { ComponentMeta } from '$lib/theme/types';

export const BackgroundPresetEnum = z.enum([
  'dark', 'black', 'white', 'blue', 'gradient-blue', 'iridescent', 'forest', 'sunset', 'mesh',
  'light-blue', 'light-warm',
]);

export const BackgroundSchema = z.object({});
export const BackgroundSwitcherSchema = z.object({});

export type BackgroundProps = z.infer<typeof BackgroundSchema>;
export type BackgroundSwitcherProps = z.infer<typeof BackgroundSwitcherSchema>;

export const meta: ComponentMeta = {
  name: 'Background',
  category: 'background',
  description: 'Full-page background layer with switchable presets (dark, gradient, iridescent, etc.). Use BackgroundSwitcher to let users pick a background.',
  since: '0.1.0',
  props: [],
  examples: [
    { title: 'Background layer', code: '<Background />' },
    { title: 'Switcher', code: '<BackgroundSwitcher />' },
    { title: 'Set via state', code: "theme.setBackground('gradient-blue')" },
  ],
  import: "import { Background, BackgroundSwitcher } from 'glassui';",
};
