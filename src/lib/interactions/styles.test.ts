import { describe, it, expect } from 'vitest';
import { getComponentStyles } from './styles';
import { computeDensity, resolveGlass, resolveFrosted, type GlassDensity } from './glass';

// ---------------------------------------------------------------------------
// getComponentStyles: solid mode
// ---------------------------------------------------------------------------

describe('getComponentStyles - solid mode', () => {
  const roles = ['container', 'field', 'action', 'inline'] as const;
  const variants = ['default', 'primary', 'secondary', 'outline', 'ghost', 'destructive'] as const;
  const statuses = ['info', 'success', 'warning', 'error'] as const;

  it('returns non-empty class for every role', () => {
    for (const role of roles) {
      const result = getComponentStyles({ glass: false, role });
      expect(result.class, `role=${role}`).not.toBe('');
    }
  });

  it('returns empty style in solid mode (except field which sets --comp-text)', () => {
    for (const role of roles) {
      const result = getComponentStyles({ glass: false, role });
      if (role === 'field') {
        expect(result.style, `role=${role}`).toContain('--comp-text');
      } else {
        expect(result.style, `role=${role}`).toBe('');
      }
    }
  });

  it('returns different classes for each variant in action role', () => {
    const classes = new Set<string>();
    for (const variant of variants) {
      const result = getComponentStyles({ variant, glass: false, role: 'action' });
      classes.add(result.class);
    }
    expect(classes.size).toBe(variants.length);
  });

  it('returns different classes for each status in inline role', () => {
    const classes = new Set<string>();
    for (const status of statuses) {
      const result = getComponentStyles({ status, glass: false, role: 'inline' });
      classes.add(result.class);
    }
    expect(classes.size).toBe(statuses.length);
  });
});

// ---------------------------------------------------------------------------
// getComponentStyles: glass mode
// ---------------------------------------------------------------------------

describe('getComponentStyles - glass mode', () => {
  const densities: GlassDensity[] = ['ultra-thin', 'thin', 'normal', 'thick', 'ultra-thick'];
  const roles = ['container', 'field', 'action', 'inline'] as const;

  it('returns glass-pane class for every density', () => {
    for (const glass of densities) {
      const result = getComponentStyles({ glass, role: 'container' });
      expect(result.class, `glass=${glass}`).toContain('glass-pane');
    }
  });

  it('returns glass-surface class for every density', () => {
    for (const glass of densities) {
      const result = getComponentStyles({ glass, role: 'container' });
      expect(result.class, `glass=${glass}`).toContain('glass-surface');
    }
  });

  it('returns --glass-density in style for glass mode', () => {
    const result = getComponentStyles({ glass: 'normal', role: 'container' });
    expect(result.style).toContain('--glass-density:');
  });

  it('returns --comp-bg, --comp-text, --comp-border in style', () => {
    const result = getComponentStyles({ variant: 'primary', glass: 'normal', role: 'action' });
    expect(result.style).toContain('--comp-bg:');
    expect(result.style).toContain('--comp-text:');
    expect(result.style).toContain('--comp-border:');
  });

  it('uses var(--glass-text) for --comp-text in glass mode containers', () => {
    const result = getComponentStyles({ glass: 'normal', role: 'container' });
    expect(result.style).toContain('--comp-text: var(--glass-text)');
  });

  it('uses var(--glass-text) for --comp-text in glass solid actions', () => {
    const result = getComponentStyles({ color: 'primary', glass: 'normal', role: 'action' });
    expect(result.style).toContain('--comp-text: var(--glass-text)');
  });

  it('uses var(--glass-text) for --comp-text in glass fields', () => {
    const result = getComponentStyles({ glass: 'normal', role: 'field' });
    expect(result.style).toContain('--comp-text: var(--glass-text)');
  });

  it('does not use var(--glass-text) in solid mode', () => {
    const result = getComponentStyles({ glass: false, role: 'container' });
    expect(result.style).not.toContain('var(--glass-text)');
  });

  it('uses glass-neutral class for neutral variants on containers', () => {
    for (const variant of ['default', 'outline', 'ghost'] as const) {
      const result = getComponentStyles({ variant, glass: 'normal', role: 'container' });
      expect(result.class, `variant=${variant}`).toContain('glass-neutral');
    }
  });

  it('does not use glass-neutral for colored variants on containers', () => {
    for (const variant of ['primary', 'secondary', 'destructive'] as const) {
      const result = getComponentStyles({ variant, glass: 'normal', role: 'container' });
      expect(result.class, `variant=${variant}`).not.toContain('glass-neutral');
    }
  });

  it('solid actions in glass mode get glass-action treatment (no surface/frost)', () => {
    const result = getComponentStyles({ glass: 'normal', role: 'action' });
    expect(result.class).toContain('glass-action');
    expect(result.class).not.toContain('glass-surface');
    expect(result.class).not.toMatch(/frost-/);
  });

  it('outline actions in glass mode get border, no glass-action', () => {
    const result = getComponentStyles({ color: 'neutral', style: 'outline', glass: 'normal', role: 'action' });
    expect(result.class).not.toContain('glass-action');
    expect(result.class).toContain('border-2');
    expect(result.style).toContain('--comp-text: var(--glass-text)');
  });

  it('outline colored actions in glass mode use brand color for text', () => {
    const result = getComponentStyles({ color: 'primary', style: 'outline', glass: 'normal', role: 'action' });
    expect(result.class).not.toContain('glass-action');
    expect(result.class).toContain('border-2');
    expect(result.style).toContain('--comp-text: var(--primary)');
  });

  it('ghost actions in glass mode get no bg, no border', () => {
    const result = getComponentStyles({ color: 'neutral', style: 'ghost', glass: 'normal', role: 'action' });
    expect(result.class).not.toContain('glass-action');
    expect(result.class).not.toContain('border-2');
    expect(result.style).toContain('--comp-text: var(--glass-text)');
  });

  it('ghost colored actions in glass mode use brand color for text', () => {
    const result = getComponentStyles({ color: 'primary', style: 'ghost', glass: 'normal', role: 'action' });
    expect(result.class).not.toContain('glass-action');
    expect(result.style).toContain('--comp-text: var(--primary)');
  });

  it('outline inline in glass mode gets border treatment', () => {
    const result = getComponentStyles({ color: 'primary', style: 'outline', glass: 'normal', role: 'inline' });
    expect(result.class).not.toContain('glass-action');
    expect(result.class).toContain('border-2');
    expect(result.style).toContain('--comp-text: var(--primary)');
  });

  it('returns text-[var(--comp-text)] in glass mode', () => {
    const result = getComponentStyles({ glass: 'normal', role: 'container' });
    expect(result.class).toContain('text-[var(--comp-text)]');
  });

  it('does not return text-[var(--comp-text)] in solid mode', () => {
    const result = getComponentStyles({ glass: false, role: 'container' });
    expect(result.class).not.toContain('text-[var(--comp-text)]');
  });

  it('adds frost class when frosted is set', () => {
    const result = getComponentStyles({ glass: 'normal', frosted: 'medium', role: 'container' });
    expect(result.class).toContain('frost-medium');
  });

  it('adds frost-light class for light frosted', () => {
    const result = getComponentStyles({ glass: 'normal', frosted: 'light', role: 'container' });
    expect(result.class).toContain('frost-light');
  });

  it('adds frost-heavy class for heavy frosted', () => {
    const result = getComponentStyles({ glass: 'normal', frosted: 'heavy', role: 'container' });
    expect(result.class).toContain('frost-heavy');
  });

  it('does not add frost class when frosted is false', () => {
    const result = getComponentStyles({ glass: 'normal', frosted: false, role: 'container' });
    expect(result.class).not.toContain('frost-');
  });

  it('auto-frosts when frosted is undefined (auto-coupling)', () => {
    const result = getComponentStyles({ glass: 'normal', role: 'container' });
    expect(result.class).toContain('frost-medium');
  });
});

// ---------------------------------------------------------------------------
// getComponentStyles: raised
// ---------------------------------------------------------------------------

describe('getComponentStyles - raised', () => {
  it('adds shadow-lg when raised=true in solid mode', () => {
    const result = getComponentStyles({ glass: false, raised: true, role: 'container' });
    expect(result.class).toContain('shadow-lg');
  });

  it('adds shadow-lg when raised=true in glass mode', () => {
    const result = getComponentStyles({ glass: 'normal', raised: true, role: 'action' });
    expect(result.class).toContain('shadow-lg');
  });

  it('does not add shadow-lg when raised=false', () => {
    const result = getComponentStyles({ glass: false, raised: false, role: 'container' });
    expect(result.class).not.toContain('shadow-lg');
  });

  it('does not add shadow-lg when raised is undefined', () => {
    const result = getComponentStyles({ glass: false, role: 'container' });
    expect(result.class).not.toContain('shadow-lg');
  });
});

// ---------------------------------------------------------------------------
// getComponentStyles: role interactions
// ---------------------------------------------------------------------------

describe('getComponentStyles - role interactions in glass mode', () => {
  it('action role gets hover:brightness in glass mode', () => {
    const result = getComponentStyles({ glass: 'normal', role: 'action' });
    expect(result.class).toContain('hover:brightness');
  });

  it('field role gets placeholder and focus styles in glass mode', () => {
    const result = getComponentStyles({ glass: 'normal', role: 'field' });
    expect(result.class).toContain('placeholder:');
    expect(result.class).toContain('focus:');
  });

  it('container role does not get action interactions', () => {
    const result = getComponentStyles({ glass: 'normal', role: 'container' });
    expect(result.class).not.toContain('hover:brightness');
    expect(result.class).not.toContain('placeholder:');
  });
});

// ---------------------------------------------------------------------------
// computeDensity: depth-based density curve
// ---------------------------------------------------------------------------

describe('computeDensity', () => {
  it('increases density with depth', () => {
    const d0 = computeDensity('normal', 0);
    const d1 = computeDensity('normal', 1);
    const d2 = computeDensity('normal', 2);
    expect(d1).toBeGreaterThan(d0);
    expect(d2).toBeGreaterThan(d1);
  });

  it('diminishing returns at higher depths', () => {
    const jump01 = computeDensity('normal', 1) - computeDensity('normal', 0);
    const jump12 = computeDensity('normal', 2) - computeDensity('normal', 1);
    const jump23 = computeDensity('normal', 3) - computeDensity('normal', 2);
    expect(jump12).toBeLessThan(jump01);
    expect(jump23).toBeLessThan(jump12);
  });

  it('never exceeds 0.85', () => {
    expect(computeDensity('ultra-thick', 100)).toBeLessThanOrEqual(0.85);
  });

  it('ultra-thin has lowest base density', () => {
    expect(computeDensity('ultra-thin', 0)).toBeLessThan(computeDensity('thin', 0));
    expect(computeDensity('thin', 0)).toBeLessThan(computeDensity('normal', 0));
  });

  it('ultra-thick has highest base density', () => {
    expect(computeDensity('ultra-thick', 0)).toBeGreaterThan(computeDensity('thick', 0));
    expect(computeDensity('thick', 0)).toBeGreaterThan(computeDensity('normal', 0));
  });

  // ---------------------------------------------------------------------------
  // Visual quality: minimum gaps that ensure stacking is actually visible
  // ---------------------------------------------------------------------------

  it('normal base density is at least 20% (visible on dark backgrounds)', () => {
    expect(computeDensity('normal', 0)).toBeGreaterThanOrEqual(0.20);
  });

  it('depth 0 to depth 1 jump is at least 15% for normal density', () => {
    const jump = computeDensity('normal', 1) - computeDensity('normal', 0);
    expect(jump, 'button inside card must be visibly denser').toBeGreaterThanOrEqual(0.15);
  });

  it('depth 1 to depth 2 jump is at least 8% for normal density', () => {
    const jump = computeDensity('normal', 2) - computeDensity('normal', 1);
    expect(jump, 'deeply nested element must still be distinguishable').toBeGreaterThanOrEqual(0.08);
  });

  it('recessed field (depth -1) is at least 40% thinner than its parent (depth 0)', () => {
    const parent = computeDensity('normal', 0);
    const field = computeDensity('normal', -1);
    const ratio = field / parent;
    expect(ratio, 'input must look clearly thinner than card').toBeLessThanOrEqual(0.60);
  });

  it('recessed field at depth -1 inside nested card is thinner than the nested card', () => {
    // Card depth 1, Input depth 0 (1-1). Input must be thinner than card depth 1.
    const nestedCard = computeDensity('normal', 1);
    const inputInside = computeDensity('normal', 0);
    expect(
      inputInside,
      'input inside nested card should be visibly thinner than the card',
    ).toBeLessThan(nestedCard * 0.75);
  });

  it('deeper recessed fields (depth -2) are even thinner', () => {
    const d_neg1 = computeDensity('normal', -1);
    const d_neg2 = computeDensity('normal', -2);
    expect(d_neg2).toBeLessThan(d_neg1);
  });

  it('stacking scenario produces visibly distinct layers', () => {
    // Card(0) > Card(1) > Button(2) must each be clearly different
    const card0 = computeDensity('normal', 0);
    const card1 = computeDensity('normal', 1);
    const button = computeDensity('normal', 2);
    const input = computeDensity('normal', -1);

    // Each layer gap must be at least 10% opacity points
    expect(card1 - card0, 'nested card vs outer card').toBeGreaterThanOrEqual(0.10);
    expect(button - card1, 'button vs nested card').toBeGreaterThanOrEqual(0.08);

    // Input must be clearly thinner than its parent card
    expect(card0 - input, 'outer card vs input').toBeGreaterThanOrEqual(0.08);

    // Button must be at least 50% opacity (clearly raised)
    expect(button, 'button should feel solid').toBeGreaterThanOrEqual(0.50);
  });
});

// ---------------------------------------------------------------------------
// resolveGlass / resolveFrosted: input normalization
// ---------------------------------------------------------------------------

describe('resolveGlass', () => {
  it('returns false for undefined', () => {
    expect(resolveGlass(undefined)).toBe(false);
  });

  it('returns false for false', () => {
    expect(resolveGlass(false)).toBe(false);
  });

  it('returns "normal" for true', () => {
    expect(resolveGlass(true)).toBe('normal');
  });

  it('passes through named densities unchanged', () => {
    const densities: GlassDensity[] = ['ultra-thin', 'thin', 'normal', 'thick', 'ultra-thick'];
    for (const d of densities) {
      expect(resolveGlass(d)).toBe(d);
    }
  });
});

describe('resolveFrosted', () => {
  it('returns false for undefined', () => {
    expect(resolveFrosted(undefined)).toBe(false);
  });

  it('returns false for false', () => {
    expect(resolveFrosted(false)).toBe(false);
  });

  it('returns "medium" for true', () => {
    expect(resolveFrosted(true)).toBe('medium');
  });

  it('passes through named levels unchanged', () => {
    expect(resolveFrosted('light')).toBe('light');
    expect(resolveFrosted('medium')).toBe('medium');
    expect(resolveFrosted('heavy')).toBe('heavy');
  });
});

// ---------------------------------------------------------------------------
// computeDensity: adversarial / edge-case tests
// ---------------------------------------------------------------------------

describe('computeDensity - adversarial', () => {
  it('all 5 densities produce strictly increasing values at depth 0', () => {
    const densities: GlassDensity[] = ['ultra-thin', 'thin', 'normal', 'thick', 'ultra-thick'];
    for (let i = 1; i < densities.length; i++) {
      expect(
        computeDensity(densities[i], 0),
        `${densities[i]} should be denser than ${densities[i-1]}`
      ).toBeGreaterThan(computeDensity(densities[i-1], 0));
    }
  });

  it('all 5 densities produce strictly increasing values at depth 3', () => {
    const densities: GlassDensity[] = ['ultra-thin', 'thin', 'normal', 'thick', 'ultra-thick'];
    for (let i = 1; i < densities.length; i++) {
      expect(
        computeDensity(densities[i], 3),
        `${densities[i]} should be denser than ${densities[i-1]} at depth 3`
      ).toBeGreaterThan(computeDensity(densities[i-1], 3));
    }
  });

  it('negative depth always returns less than depth 0 for every density', () => {
    const densities: GlassDensity[] = ['ultra-thin', 'thin', 'normal', 'thick', 'ultra-thick'];
    for (const d of densities) {
      expect(
        computeDensity(d, -1),
        `${d} at depth -1 should be < depth 0`
      ).toBeLessThan(computeDensity(d, 0));
    }
  });

  it('deeper negative depths produce progressively thinner values', () => {
    expect(computeDensity('normal', -2)).toBeLessThan(computeDensity('normal', -1));
    expect(computeDensity('normal', -3)).toBeLessThan(computeDensity('normal', -2));
  });

  it('density is always positive, never zero or negative', () => {
    const densities: GlassDensity[] = ['ultra-thin', 'thin', 'normal', 'thick', 'ultra-thick'];
    for (const d of densities) {
      for (const depth of [-10, -1, 0, 1, 5, 50]) {
        expect(
          computeDensity(d, depth),
          `${d} at depth ${depth}`
        ).toBeGreaterThan(0);
      }
    }
  });

  it('cap holds for every density at extreme depth', () => {
    const densities: GlassDensity[] = ['ultra-thin', 'thin', 'normal', 'thick', 'ultra-thick'];
    for (const d of densities) {
      expect(computeDensity(d, 1000)).toBeLessThanOrEqual(0.85);
    }
  });

  it('adjacent depths always produce distinct values (no plateaus before depth 10)', () => {
    for (let depth = 0; depth < 10; depth++) {
      const current = computeDensity('normal', depth);
      const next = computeDensity('normal', depth + 1);
      expect(next, `depth ${depth} -> ${depth+1}`).toBeGreaterThan(current);
    }
  });

  it('stacking scenario: Card > Card > Button > Input all have distinct densities', () => {
    // Card depth 0, nested Card depth 1, Button depth 2 (+1), Input depth 0 (-1 from card 1)
    const card0 = computeDensity('normal', 0);
    const card1 = computeDensity('normal', 1);
    const button = computeDensity('normal', 2);
    const input = computeDensity('normal', -1);

    expect(card1).toBeGreaterThan(card0);
    expect(button).toBeGreaterThan(card1);
    expect(input).toBeLessThan(card0);
  });

  it('deep stacking scenario: 5 nested cards each denser than parent', () => {
    const values = [];
    for (let i = 0; i < 5; i++) {
      values.push(computeDensity('normal', i));
    }
    for (let i = 1; i < values.length; i++) {
      expect(values[i]).toBeGreaterThan(values[i-1]);
    }
  });

  it('recessed field inside deep nesting is still thinner than its parent', () => {
    // Card at depth 4, Input at depth 3 (4-1)
    const parentCard = computeDensity('normal', 4);
    const recessedInput = computeDensity('normal', 3);
    expect(recessedInput).toBeLessThan(parentCard);
  });
});

// ---------------------------------------------------------------------------
// getComponentStyles: glass + frosted independence
// ---------------------------------------------------------------------------

describe('getComponentStyles - glass/frosted independence', () => {
  it('glass without frosted auto-derives frost from density', () => {
    const result = getComponentStyles({ glass: 'thick', role: 'container' });
    expect(result.class).toContain('glass-pane');
    expect(result.class).toContain('frost-medium');
  });

  it('glass with frosted=false explicitly disables frost', () => {
    const result = getComponentStyles({ glass: 'thick', frosted: false, role: 'container' });
    expect(result.class).toContain('glass-pane');
    expect(result.class).not.toMatch(/frost-/);
  });

  it('different densities at same depth produce different --glass-density values', () => {
    const thin = getComponentStyles({ glass: 'thin', depth: 0, role: 'container' });
    const thick = getComponentStyles({ glass: 'thick', depth: 0, role: 'container' });
    const thinDensity = parseFloat(thin.style.match(/--glass-density:\s*([\d.]+)/)![1]);
    const thickDensity = parseFloat(thick.style.match(/--glass-density:\s*([\d.]+)/)![1]);
    expect(thickDensity).toBeGreaterThan(thinDensity);
  });

  it('same density at different depths produce different --glass-density values', () => {
    const d0 = getComponentStyles({ glass: 'normal', depth: 0, role: 'container' });
    const d3 = getComponentStyles({ glass: 'normal', depth: 3, role: 'container' });
    const density0 = parseFloat(d0.style.match(/--glass-density:\s*([\d.]+)/)![1]);
    const density3 = parseFloat(d3.style.match(/--glass-density:\s*([\d.]+)/)![1]);
    expect(density3).toBeGreaterThan(density0);
  });

  it('frosted level does not affect --glass-density value', () => {
    const noFrost = getComponentStyles({ glass: 'normal', depth: 1, role: 'container' });
    const heavyFrost = getComponentStyles({ glass: 'normal', depth: 1, frosted: 'heavy', role: 'container' });
    const d1 = parseFloat(noFrost.style.match(/--glass-density:\s*([\d.]+)/)![1]);
    const d2 = parseFloat(heavyFrost.style.match(/--glass-density:\s*([\d.]+)/)![1]);
    expect(d1).toBe(d2);
  });

  it('glass=false produces no glass classes regardless of frosted', () => {
    const result = getComponentStyles({ glass: false, frosted: 'heavy', role: 'container' });
    expect(result.class).not.toContain('glass-pane');
    expect(result.class).not.toContain('frost-');
    expect(result.style).toBe('');
  });
});
