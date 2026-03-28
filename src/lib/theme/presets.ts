export interface ThemePreset {
  name: string;
  label: string;
  description: string;
}

export const presets: ThemePreset[] = [
  { name: 'default', label: 'Default', description: 'Cyan → Blue → Purple gradient' },
  { name: 'ocean', label: 'Ocean', description: 'Cyan → Sky → Light blue gradient' },
  { name: 'ember', label: 'Ember', description: 'Red → Orange → Yellow gradient' },
  { name: 'violet', label: 'Violet', description: 'Purple → Indigo → Pink gradient' },
  { name: 'mono', label: 'Mono', description: 'White → Gray monochrome' },
];
