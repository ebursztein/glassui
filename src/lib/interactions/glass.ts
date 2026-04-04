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
export type GlassRole = 'container' | 'field' | 'action' | 'inline';

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
// Density computation
// ---------------------------------------------------------------------------

const densityBase: Record<GlassDensity, number> = {
  'ultra-thin': 0.08,
  'thin':       0.15,
  'normal':     0.25,
  'thick':      0.40,
  'ultra-thick': 0.55,
};

/**
 * Compute the effective density (0..1) for a glass component at a given depth.
 *
 * Positive depth: exponential curve adds ~15-20% per level, diminishing.
 * Negative depth (recessed fields): halves density per level, floor at 5%.
 * Cap at 0.85 so glass never becomes fully opaque.
 */
export function computeDensity(baseDensity: GlassDensity, depth: number): number {
  const base = densityBase[baseDensity];
  if (depth < 0) {
    const scale = Math.pow(0.5, Math.abs(depth));
    return Math.max(base * scale, 0.05);
  }
  const increment = 0.50;
  const compounded = base + increment * (1 - Math.exp(-depth * 0.5));
  return Math.min(compounded, 0.85);
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
