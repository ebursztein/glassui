/**
 * Glass System -- Pure Functions
 *
 * Two independent visual properties:
 *   glass   = surface density/opacity (how see-through the pane is)
 *   frosted = backdrop blur intensity (independent of density)
 *
 * Depth stacking: components track their depth in the glass tree via
 * useUI context. Each layer auto-compounds density on a diminishing
 * curve so arbitrary nesting never hits a wall.
 *
 * Role offsets:
 *   container/action/inline = +1 (raised above surface)
 *   field                   = -1 (recessed into surface)
 *
 * CSS output: --glass-density custom property drives .glass-pane and
 * .glass-surface classes. Blur uses .frost-light/medium/heavy.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type GlassDensity = 'ultra-thin' | 'thin' | 'normal' | 'thick' | 'ultra-thick';
export type FrostedLevel = 'light' | 'medium' | 'heavy';
export type GlassRole = 'container' | 'field' | 'action' | 'inline' | 'alert';

// ---------------------------------------------------------------------------
// Resolvers
// ---------------------------------------------------------------------------

/** Resolve a glass prop to a concrete density or false. */
export function resolveGlass(glass: GlassDensity | boolean | undefined): GlassDensity | false {
  if (!glass) return false;
  if (glass === true) return 'normal';
  return glass;
}

/** Resolve a frosted prop to a concrete level or false. */
export function resolveFrosted(frosted: FrostedLevel | boolean | undefined): FrostedLevel | false {
  if (!frosted) return false;
  if (frosted === true) return 'medium';
  return frosted;
}
// ---------------------------------------------------------------------------
// Density computation (Lookup Table)
// ---------------------------------------------------------------------------

/**
 * Hand-tuned lookup table for glass density scaling.
 * Rather than an arbitrary exponential math formula, this guarantees that:
 * 1. Densities step up smoothly and predictably.
 * 2. Ultra-thin remains delicate even when stacked.
 * 3. Each positive depth layer roughly equals the next base density
 *    (e.g., thin at depth 1 ~= normal at depth 0).
 */
const densityScale: Record<GlassDensity, Record<number, number>> = {
  // ultra-thin: very delicate. Good for minimal dividers or subtle panels.
  'ultra-thin':  { '-2': 0.02, '-1': 0.06, '0': 0.12, '1': 0.20, '2': 0.28, '3': 0.36, '4': 0.42 },
  // thin: standard for floating UI.
  'thin':        { '-2': 0.05, '-1': 0.12, '0': 0.20, '1': 0.30, '2': 0.40, '3': 0.48, '4': 0.55 },
  // normal: sturdy, good contrast.
  'normal':      { '-2': 0.08, '-1': 0.18, '0': 0.30, '1': 0.42, '2': 0.52, '3': 0.60, '4': 0.68 },
  // thick: high legibility.
  'thick':       { '-2': 0.15, '-1': 0.30, '0': 0.45, '1': 0.58, '2': 0.68, '3': 0.76, '4': 0.82 },
  // ultra-thick: approaches solid.
  'ultra-thick': { '-2': 0.30, '-1': 0.45, '0': 0.60, '1': 0.75, '2': 0.85, '3': 0.92, '4': 0.96 },
};

/**
 * Compute the effective density (0..1) for a glass component at a given depth.
 */
export function computeDensity(baseDensity: GlassDensity, depth: number): number {
  const scale = densityScale[baseDensity];
  const clampedDepth = Math.max(-2, Math.min(depth, 4));
  return scale[clampedDepth] || 0.25;
}

// ---------------------------------------------------------------------------
// Auto-frost: derive blur level from density when not explicitly set
// ---------------------------------------------------------------------------

/** Map a glass density to a default frosted level for auto-coupling. */
export function densityToFrost(density: GlassDensity): FrostedLevel {
  switch (density) {
    case 'ultra-thin': return 'light';
    case 'thin':       return 'light';
    case 'normal':     return 'medium';
    case 'thick':      return 'medium';
    case 'ultra-thick': return 'heavy';
  }
}

// ---------------------------------------------------------------------------
// GlassBackdrop orbs
// ---------------------------------------------------------------------------

/** Gradient orb definitions for GlassBackdrop. Uses CSS var references so they follow the theme. */
export const glassBgOrbs = [
  { x: '20%', y: '20%', size: '12rem', color: 'var(--glass-accent-1)' },
  { x: '65%', y: '15%', size: '10rem', color: 'var(--glass-accent-3)' },
  { x: '45%', y: '65%', size: '9rem',  color: 'var(--glass-accent-2)' },
];
