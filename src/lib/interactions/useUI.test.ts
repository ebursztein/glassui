import { describe, it, expect } from 'vitest';
import {
  computeUIDepth,
  shouldShowBackdrop,
  computeUIOutput,
  buildUIContext,
  INACTIVE_UI_CONTEXT,
  type UIInput,
  type UIContext,
} from './useUI.logic';

// ---------------------------------------------------------------------------
// computeUIDepth
// ---------------------------------------------------------------------------

describe('computeUIDepth', () => {
  it('returns parentDepth + 1 for container when active', () => {
    expect(computeUIDepth('container', 0, true)).toBe(1);
    expect(computeUIDepth('container', 2, true)).toBe(3);
  });

  it('returns parentDepth + 1 for action when active', () => {
    expect(computeUIDepth('action', 0, true)).toBe(1);
    expect(computeUIDepth('action', 1, true)).toBe(2);
  });

  it('returns parentDepth + 1 for inline when active', () => {
    expect(computeUIDepth('inline', 0, true)).toBe(1);
  });

  it('returns parentDepth - 1 for field when active (recessed)', () => {
    expect(computeUIDepth('field', 2, true)).toBe(1);
    expect(computeUIDepth('field', 0, true)).toBe(-1);
  });

  it('returns 0 for any role when parent is inactive', () => {
    expect(computeUIDepth('container', 5, false)).toBe(0);
    expect(computeUIDepth('field', 3, false)).toBe(0);
    expect(computeUIDepth('action', 1, false)).toBe(0);
    expect(computeUIDepth('inline', 2, false)).toBe(0);
  });
});

// ---------------------------------------------------------------------------
// shouldShowBackdrop
// ---------------------------------------------------------------------------

describe('shouldShowBackdrop', () => {
  it('returns false when colored is false', () => {
    expect(shouldShowBackdrop(false, false, 'container', 0)).toBe(false);
    expect(shouldShowBackdrop(false, true, 'container', 0)).toBe(false);
    expect(shouldShowBackdrop(false, true, 'action', 0)).toBe(false);
  });

  it('returns true when colored and not inside glass', () => {
    expect(shouldShowBackdrop(true, false, 'container', 0)).toBe(true);
    expect(shouldShowBackdrop(true, false, 'action', 0)).toBe(true);
    expect(shouldShowBackdrop(true, false, 'field', 0)).toBe(true);
  });

  it('returns true for root container inside glass (depth 0)', () => {
    expect(shouldShowBackdrop(true, true, 'container', 0)).toBe(true);
  });

  it('returns false for nested container inside glass (depth > 0)', () => {
    expect(shouldShowBackdrop(true, true, 'container', 1)).toBe(false);
    expect(shouldShowBackdrop(true, true, 'container', 2)).toBe(false);
  });

  it('returns false for non-container roles inside glass', () => {
    expect(shouldShowBackdrop(true, true, 'action', 0)).toBe(false);
    expect(shouldShowBackdrop(true, true, 'field', 0)).toBe(false);
    expect(shouldShowBackdrop(true, true, 'inline', 0)).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// computeUIOutput - prop resolution
// ---------------------------------------------------------------------------

describe('computeUIOutput - prop resolution', () => {
  const inactiveParent = INACTIVE_UI_CONTEXT;

  it('uses role-based color default: primary for action, neutral for others', () => {
    const action = computeUIOutput({ role: 'action' }, inactiveParent);
    expect(action.color).toBe('primary');

    const container = computeUIOutput({ role: 'container' }, inactiveParent);
    expect(container.color).toBe('neutral');

    const field = computeUIOutput({ role: 'field' }, inactiveParent);
    expect(field.color).toBe('neutral');

    const inline = computeUIOutput({ role: 'inline' }, inactiveParent);
    expect(inline.color).toBe('neutral');
  });

  it('local color wins over parent color', () => {
    const parent: UIContext = { ...inactiveParent, color: 'accent' };
    const output = computeUIOutput({ role: 'action', color: 'destructive' }, parent);
    expect(output.color).toBe('destructive');
  });

  it('does not inherit theme color for non-container roles', () => {
    const parent: UIContext = { ...inactiveParent, color: 'gradient' };
    const action = computeUIOutput({ role: 'action' }, parent);
    expect(action.color).toBe('primary'); // falls back to action default
    const field = computeUIOutput({ role: 'field' }, parent);
    expect(field.color).toBe('neutral');
    const inline = computeUIOutput({ role: 'inline' }, parent);
    expect(inline.color).toBe('neutral');
    // but containers CAN inherit theme
    const container = computeUIOutput({ role: 'container' }, parent);
    expect(container.color).toBe('gradient');
  });

  it('inherits color from parent when not set locally', () => {
    const parent: UIContext = { ...inactiveParent, color: 'accent' };
    const output = computeUIOutput({ role: 'action' }, parent);
    expect(output.color).toBe('accent');
  });

  it('defaults style to solid and size to md', () => {
    const output = computeUIOutput({ role: 'container' }, inactiveParent);
    expect(output.style).toBe('solid');
    expect(output.size).toBe('md');
  });

  it('inherits style and size from parent', () => {
    const parent: UIContext = { ...inactiveParent, style: 'outline', size: 'lg' };
    const output = computeUIOutput({ role: 'action' }, parent);
    expect(output.style).toBe('outline');
    expect(output.size).toBe('lg');
  });

  it('status does not inherit from parent (component-local only)', () => {
    const output = computeUIOutput({ role: 'inline' }, inactiveParent);
    expect(output.status).toBeUndefined();
  });
});

// ---------------------------------------------------------------------------
// computeUIOutput - disabled stickiness
// ---------------------------------------------------------------------------

describe('computeUIOutput - disabled stickiness', () => {
  it('parent disabled=true forces child disabled=true', () => {
    const parent: UIContext = { ...INACTIVE_UI_CONTEXT, disabled: true };
    const output = computeUIOutput({ role: 'action', disabled: false }, parent);
    expect(output.disabled).toBe(true);
  });

  it('local disabled=true when parent is not disabled', () => {
    const output = computeUIOutput({ role: 'action', disabled: true }, INACTIVE_UI_CONTEXT);
    expect(output.disabled).toBe(true);
  });

  it('both disabled=true stays true', () => {
    const parent: UIContext = { ...INACTIVE_UI_CONTEXT, disabled: true };
    const output = computeUIOutput({ role: 'action', disabled: true }, parent);
    expect(output.disabled).toBe(true);
  });

  it('both not disabled stays false', () => {
    const output = computeUIOutput({ role: 'action' }, INACTIVE_UI_CONTEXT);
    expect(output.disabled).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// computeUIOutput - glass tri-state
// ---------------------------------------------------------------------------

describe('computeUIOutput - glass tri-state', () => {
  it('glass=undefined inherits from active parent', () => {
    const parent: UIContext = {
      ...INACTIVE_UI_CONTEXT,
      active: true,
      baseDensity: 'thick',
      depth: 0,
    };
    const output = computeUIOutput({ role: 'container' }, parent);
    expect(output.glass).toBe('thick');
  });

  it('glass=undefined with inactive parent resolves to false', () => {
    const output = computeUIOutput({ role: 'container' }, INACTIVE_UI_CONTEXT);
    expect(output.glass).toBe(false);
  });

  it('glass=true resolves to normal', () => {
    const output = computeUIOutput({ role: 'container', glass: true }, INACTIVE_UI_CONTEXT);
    expect(output.glass).toBe('normal');
  });

  it('glass=false resolves to false (solid for this component)', () => {
    const parent: UIContext = {
      ...INACTIVE_UI_CONTEXT,
      active: true,
      baseDensity: 'normal',
      depth: 0,
    };
    const output = computeUIOutput({ role: 'action', glass: false }, parent);
    expect(output.glass).toBe(false);
  });

  it('glass=density string uses that density', () => {
    const output = computeUIOutput({ role: 'container', glass: 'ultra-thick' }, INACTIVE_UI_CONTEXT);
    expect(output.glass).toBe('ultra-thick');
  });
});

// ---------------------------------------------------------------------------
// computeUIOutput - integration
// ---------------------------------------------------------------------------

describe('computeUIOutput - integration', () => {
  it('returns a complete UIOutput shape', () => {
    const output = computeUIOutput({ role: 'container' }, INACTIVE_UI_CONTEXT);
    expect(output).toHaveProperty('color');
    expect(output).toHaveProperty('style');
    expect(output).toHaveProperty('size');
    expect(output).toHaveProperty('disabled');
    expect(output).toHaveProperty('glass');
    expect(output).toHaveProperty('frosted');
    expect(output).toHaveProperty('depth');
    expect(output).toHaveProperty('insideGlass');
    expect(output).toHaveProperty('raised');
    expect(output).toHaveProperty('reactive');
    expect(output).toHaveProperty('showBackdrop');
    expect(output).toHaveProperty('className');
    expect(output).toHaveProperty('styles');
    expect(output).toHaveProperty('glowClass');
  });

  it('glass mode produces glass classes and style string', () => {
    const output = computeUIOutput({ role: 'container', glass: 'normal' }, INACTIVE_UI_CONTEXT);
    expect(output.className).toContain('glass-pane');
    expect(output.styles).toContain('--glass-density');
    expect(output.styles).toContain('--comp-bg');
  });

  it('solid mode produces style string with CSS variables', () => {
    const output = computeUIOutput({ role: 'container' }, INACTIVE_UI_CONTEXT);
    expect(output.styles).toContain('--comp-bg:');
  });

  it('reactive=true with glass=false produces reactive=false', () => {
    const output = computeUIOutput({ role: 'action', reactive: true }, INACTIVE_UI_CONTEXT);
    expect(output.reactive).toBe(false);
  });

  it('reactive=true with glass active produces reactive=true', () => {
    const output = computeUIOutput({ role: 'action', reactive: true, glass: 'normal' }, INACTIVE_UI_CONTEXT);
    expect(output.reactive).toBe(true);
  });

  it('glow=lg produces correct glowClass', () => {
    const output = computeUIOutput({ role: 'action', glow: 'lg' }, INACTIVE_UI_CONTEXT);
    expect(output.glowClass).toBe('glow-lg');
  });

  it('glow not set produces empty glowClass', () => {
    const output = computeUIOutput({ role: 'action' }, INACTIVE_UI_CONTEXT);
    expect(output.glowClass).toBe('');
  });

  it('frosted auto-derives from glass density', () => {
    const output = computeUIOutput({ role: 'container', glass: 'ultra-thick' }, INACTIVE_UI_CONTEXT);
    expect(output.frosted).toBe('heavy');
  });

  it('frosted=false with glass active still resolves auto-frost in output', () => {
    const output = computeUIOutput({ role: 'container', glass: 'normal', frosted: false }, INACTIVE_UI_CONTEXT);
    // frosted prop resolves to false, but output.frosted auto-derives from glass
    expect(output.frosted).toBe('medium');
  });
});

// ---------------------------------------------------------------------------
// buildUIContext
// ---------------------------------------------------------------------------

describe('buildUIContext', () => {
  it('propagates active=true when glass is active', () => {
    const output = computeUIOutput({ role: 'container', glass: 'normal' }, INACTIVE_UI_CONTEXT);
    const ctx = buildUIContext(output, INACTIVE_UI_CONTEXT);
    expect(ctx.active).toBe(true);
    expect(ctx.baseDensity).toBe('normal');
  });

  it('propagates active=true from parent even when this component is solid', () => {
    const activeParent: UIContext = {
      ...INACTIVE_UI_CONTEXT,
      active: true,
      baseDensity: 'thick',
      depth: 0,
    };
    const output = computeUIOutput({ role: 'action', glass: false }, activeParent);
    const ctx = buildUIContext(output, activeParent);
    expect(ctx.active).toBe(true);
    expect(ctx.baseDensity).toBe('thick');
  });

  it('propagates disabled downward', () => {
    const output = computeUIOutput({ role: 'container', disabled: true }, INACTIVE_UI_CONTEXT);
    const ctx = buildUIContext(output, INACTIVE_UI_CONTEXT);
    expect(ctx.disabled).toBe(true);
  });

  it('propagates color and style', () => {
    const output = computeUIOutput({ role: 'container', color: 'accent', style: 'outline' }, INACTIVE_UI_CONTEXT);
    const ctx = buildUIContext(output, INACTIVE_UI_CONTEXT);
    expect(ctx.color).toBe('accent');
    expect(ctx.style).toBe('outline');
  });
});

// ---------------------------------------------------------------------------
// Context chain integration tests
// ---------------------------------------------------------------------------

describe('context chain integration', () => {
  function chain(steps: Array<{ role: Parameters<typeof computeUIOutput>[0]['role']; props?: Partial<Parameters<typeof computeUIOutput>[0]> }>) {
    let ctx: UIContext = INACTIVE_UI_CONTEXT;
    const outputs: ReturnType<typeof computeUIOutput>[] = [];
    for (const step of steps) {
      const output = computeUIOutput({ role: step.role, ...step.props }, ctx);
      outputs.push(output);
      ctx = buildUIContext(output, ctx);
    }
    return outputs;
  }

  it('Card(color=primary) > Input -- Input inherits primary', () => {
    const [card, input] = chain([
      { role: 'container', props: { color: 'primary', glass: 'normal' } },
      { role: 'field' },
    ]);
    expect(card.color).toBe('primary');
    expect(input.color).toBe('primary');
  });

  it('Card(glass) > Button(glass=false) > Badge -- Button solid, Badge inherits glass', () => {
    const [card, button, badge] = chain([
      { role: 'container', props: { glass: 'normal' } },
      { role: 'action', props: { glass: false } },
      { role: 'inline' },
    ]);
    expect(card.glass).toBe('normal');
    expect(button.glass).toBe(false); // explicitly opted out
    expect(badge.glass).toBe('normal'); // inherits from Card through context (Button propagated active)
  });

  it('Card(glass) > Card(glass) > Input -- depths are 0, 1, 0', () => {
    const [outer, inner, input] = chain([
      { role: 'container', props: { glass: 'normal' } },
      { role: 'container', props: { glass: 'normal' } },
      { role: 'field' },
    ]);
    expect(outer.depth).toBe(0); // root, no parent active
    expect(inner.depth).toBe(1); // container +1 from parent
    expect(input.depth).toBe(0); // field -1 from depth 1
  });

  it('Card(disabled) > Input -- Input inherits disabled', () => {
    const [card, input] = chain([
      { role: 'container', props: { disabled: true, glass: 'normal' } },
      { role: 'field' },
    ]);
    expect(card.disabled).toBe(true);
    expect(input.disabled).toBe(true);
  });

  it('Card(color=primary) > Input(color=error) -- local color overrides inherited color', () => {
    const [, input] = chain([
      { role: 'container', props: { color: 'primary', glass: 'normal' } },
      { role: 'field', props: { color: 'error' } },
    ]);
    expect(input.color).toBe('error'); // local overrides inherited
  });

  it('Card(size=lg) > Button -- Button inherits lg size', () => {
    const [, button] = chain([
      { role: 'container', props: { size: 'lg' } },
      { role: 'action' },
    ]);
    expect(button.size).toBe('lg');
  });

  it('three levels deep: Card > Card > Card -- depths 0, 1, 2', () => {
    const outputs = chain([
      { role: 'container', props: { glass: 'normal' } },
      { role: 'container' },
      { role: 'container' },
    ]);
    expect(outputs[0].depth).toBe(0);
    expect(outputs[1].depth).toBe(1);
    expect(outputs[2].depth).toBe(2);
  });
});
