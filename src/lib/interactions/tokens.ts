import type { HoverEffect, FocusEffect, GradientPreset } from './schema';

/** Hover Tailwind class presets */
export const hover: Record<HoverEffect, string> = {
  lift: 'hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 transition-all duration-200',
  brighten: 'hover:bg-white/20 transition-colors duration-200',
  glow: 'hover:border-white/40 hover:shadow-[0_0_12px_var(--glass-glow-2)] transition-all duration-300',
  none: '',
};

/** Focus Tailwind class presets */
export const focus: Record<FocusEffect, string> = {
  ring: 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
  glow: 'focus-visible:outline-none focus-visible:border-white/40 focus-visible:shadow-[0_0_16px_var(--glass-glow-2)]',
};

/** Gradient Tailwind class presets */
export const gradients: Record<GradientPreset, string> = {
  accent: 'bg-gradient-to-r from-[var(--glass-accent-1)] via-[var(--glass-accent-2)] to-[var(--glass-accent-3)]',
  glow: 'bg-gradient-to-r from-[var(--glass-glow-1)] via-[var(--glass-glow-2)] to-[var(--glass-glow-3)]',
  highlight: 'bg-gradient-to-b from-white/20 to-transparent',
};
