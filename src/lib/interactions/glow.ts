/**
 * Glow Mixin
 *
 * Glow = outer gradient shine. Three intensities.
 * Separate concern from Glass.
 *
 * CSS classes: .glow-sm, .glow-md, .glow-lg
 * Colors: --glass-glow-1/2/3 (from theme presets)
 */

export type GlowIntensity = 'sm' | 'md' | 'lg';

export interface GlowProps {
  glow?: GlowIntensity | boolean;
}

/** Map glow prop to CSS class. Accepts boolean (defaults to 'md') or named intensity. */
export function getGlowClass(glow: GlowIntensity | boolean | undefined): string {
  if (!glow) return '';
  if (glow === true) return 'glow-md';
  return `glow-${glow}`;
}
