/**
 * Glass Mixin
 *
 * Glass = translucent frosted surface. Three intensities.
 * GlassBg = themed gradient orb backdrop that makes glass visible.
 * Glass cascades via Svelte context -- children inherit parent's glass.
 *
 * CSS classes: .glass-subtle, .glass-frosted, .glass-heavy, .glass-bg
 * Colors: --glass-accent-1/2/3 (from theme presets)
 */

import { getContext } from 'svelte';

export type GlassEffect = 'subtle' | 'frosted' | 'heavy';

export interface GlassProps {
  glass?: GlassEffect | boolean;
  glassbg?: boolean;
}

export const GLASS_CONTEXT_KEY = 'glassui-glass';

/** Resolve a glass prop to a concrete effect or false. */
export function resolveGlass(glass: GlassEffect | boolean | undefined): GlassEffect | false {
  if (!glass) return false;
  if (glass === true) return 'frosted';
  return glass;
}

/** Bump glass intensity up one level (for child inputs that need more contrast). */
export function bumpGlass(effect: GlassEffect): GlassEffect {
  if (effect === 'subtle') return 'frosted';
  return 'heavy';
}

/**
 * Read the parent glass context. Call at component init time (top-level script).
 * Returns a getter that resolves the parent's current glass effect, or false.
 */
export function getParentGlass(): () => GlassEffect | false {
  try {
    const ctx = getContext<() => GlassEffect | false>(GLASS_CONTEXT_KEY);
    return ctx ?? (() => false);
  } catch {
    return () => false;
  }
}

/** Map glass effect to frost CSS class (blur + border + shadow, no background). */
export function getGlassClass(glass: GlassEffect | boolean | undefined): string {
  const effect = resolveGlass(glass);
  if (!effect) return '';
  return `glass-${effect}`;
}

/** Neutral translucent white background for glass elements with no color of their own. */
export function getGlassBgClass(glass: GlassEffect | boolean | undefined): string {
  const effect = resolveGlass(glass);
  if (!effect) return '';
  return `glass-bg-${effect}`;
}

/* ================================================
   Centralized glass class composition
   One call replaces the 3-function dance per component.
   ================================================ */

export type GlassRole = 'container' | 'field' | 'action' | 'inline';

/** Role-specific interaction classes, defined once. */
export const glassInteractions: Record<string, string> = {
  field: 'placeholder:text-foreground/40 focus:border-primary/40 focus:ring-2 focus:ring-primary/20',
  action: 'hover:brightness-125 active:brightness-90 transition-all duration-200',
};

/**
 * Get the full glass class string for a component.
 * Returns frost + neutral bg (when applicable) + role interaction.
 * Returns '' when glass is off.
 */
export function getGlassClasses(
  glass: GlassEffect | boolean | undefined,
  role: GlassRole,
  options?: { neutralBg?: boolean },
): string {
  const effect = resolveGlass(glass);
  if (!effect) return '';

  const frost = `glass-${effect}`;
  const includeNeutralBg = options?.neutralBg ?? (role === 'container' || role === 'field');
  const bg = includeNeutralBg ? `glass-bg-${effect}` : '';
  const interaction = glassInteractions[role] ?? '';

  return [frost, bg, interaction].filter(Boolean).join(' ');
}

/** Gradient orb definitions for GlassBackdrop. Uses CSS var references so they follow the theme. */
export const glassBgOrbs = [
  { x: '20%', y: '20%', size: '12rem', color: 'var(--glass-accent-1)' },
  { x: '65%', y: '15%', size: '10rem', color: 'var(--glass-accent-3)' },
  { x: '45%', y: '65%', size: '9rem',  color: 'var(--glass-accent-2)' },
];
