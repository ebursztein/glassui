import type { HoverEffect, FocusEffect, GradientPreset } from './schema';
import type { GlassIntensity } from '$lib/types/enums';

/** Hover Tailwind class presets */
export const hover: Record<HoverEffect, string> = {
  lift: 'hover:scale-[1.03] active:scale-[0.97] transition-transform duration-200',
  brighten: 'hover:bg-white/20 transition-colors duration-200',
  glow: 'hover:border-white/40 hover:shadow-[0_0_12px_var(--glass-glow-2)] transition-all duration-300',
  none: '',
};

/** Focus Tailwind class presets */
export const focus: Record<FocusEffect, string> = {
  ring: 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent',
  glow: 'focus-visible:outline-none focus-visible:border-white/40 focus-visible:shadow-[0_0_16px_var(--glass-glow-2)]',
};

/** Glass surface Tailwind class presets by intensity */
export const glass: Record<GlassIntensity, { bg: string; blur: string; border: string; shadow: string }> = {
  subtle: {
    bg: 'bg-white/5',
    blur: 'backdrop-blur-xl',
    border: 'border border-white/10',
    shadow: 'shadow-[0_4px_16px_rgba(0,0,0,0.2)]',
  },
  medium: {
    bg: 'bg-white/10',
    blur: 'backdrop-blur-xl',
    border: 'border border-white/20',
    shadow: 'shadow-[0_8px_32px_rgba(0,0,0,0.37)]',
  },
  strong: {
    bg: 'bg-white/15',
    blur: 'backdrop-blur-2xl',
    border: 'border border-white/30',
    shadow: 'shadow-[0_8px_32px_rgba(0,0,0,0.5)]',
  },
};

/** Gradient Tailwind class presets */
export const gradients: Record<GradientPreset, string> = {
  accent: 'bg-gradient-to-r from-[var(--glass-accent-1)] via-[var(--glass-accent-2)] to-[var(--glass-accent-3)]',
  glow: 'bg-gradient-to-r from-[var(--glass-glow-1)] via-[var(--glass-glow-2)] to-[var(--glass-glow-3)]',
  highlight: 'bg-gradient-to-b from-white/20 to-transparent',
};

/** Compose a glass surface class string from intensity */
export function glassClasses(intensity: GlassIntensity): string {
  const g = glass[intensity];
  return `${g.bg} ${g.blur} ${g.border} ${g.shadow}`;
}
