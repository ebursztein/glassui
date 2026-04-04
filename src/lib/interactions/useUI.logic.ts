/**
 * useUI Pure Logic
 *
 * All computation for the useUI rune lives here as pure functions.
 * No Svelte runtime dependency -- fully testable with vitest.
 *
 * The companion useUI.svelte.ts file wraps these in $derived + context.
 */

import type { ThemeColor, RenderStyle, Size, Status, Variant } from '$lib/types/enums';
import type { GlassDensity, FrostedLevel } from '$lib/interactions/glass';
import type { GlowIntensity } from '$lib/interactions/glow';
import type { TintLevel } from '$lib/interactions/styles';
import { resolveGlass, resolveFrosted, densityToFrost } from '$lib/interactions/glass';
import { getComponentStyles } from '$lib/interactions/styles';
import { getGlowClass } from '$lib/interactions/glow';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type UIRole = 'container' | 'field' | 'action' | 'inline';

/** What a component passes into useUI. */
export interface UIInput {
  role: UIRole;
  color?: ThemeColor;
  style?: RenderStyle;
  variant?: Variant;
  size?: Size;
  status?: Status;
  disabled?: boolean;
  glass?: GlassDensity | boolean;
  frosted?: FrostedLevel | boolean;
  glow?: GlowIntensity | boolean;
  colored?: boolean;
  raised?: boolean;
  reactive?: boolean;
  tint?: TintLevel;
}

/** What flows through Svelte context between parent and child. */
export interface UIContext {
  color?: ThemeColor;
  style?: RenderStyle;
  size?: Size;
  disabled: boolean;
  glass: GlassDensity | false;
  depth: number;
  active: boolean;
  baseDensity: GlassDensity;
}

/** Everything the component template needs. */
export interface UIOutput {
  color: ThemeColor;
  style: RenderStyle;
  size: Size;
  status: Status | undefined;
  disabled: boolean;
  glass: GlassDensity | false;
  frosted: FrostedLevel | false;
  depth: number;
  insideGlass: boolean;
  raised: boolean;
  reactive: boolean;
  showBackdrop: boolean;
  className: string;
  styles: string;
  glowClass: string;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

export const UI_CONTEXT_KEY = 'glassui-ui';

export const INACTIVE_UI_CONTEXT: UIContext = {
  disabled: false,
  glass: false,
  depth: 0,
  active: false,
  baseDensity: 'normal',
};

// ---------------------------------------------------------------------------
// Pure computation functions
// ---------------------------------------------------------------------------

/**
 * Compute depth in the glass tree based on role and parent state.
 * container/action/inline: +1 (raised above surface)
 * field: -1 (recessed into surface)
 * inactive parent: always 0
 */
export function computeUIDepth(role: UIRole, parentDepth: number, parentActive: boolean): number {
  if (!parentActive) return 0;
  if (role === 'field') return parentDepth - 1;
  return parentDepth + 1;
}

/**
 * Determine whether GlassBackdrop should render.
 * Only shows when colored is true AND either:
 * - not inside a glass tree (standalone colored component)
 * - is a root container (role=container, depth=0)
 */
export function shouldShowBackdrop(
  colored: boolean,
  insideGlass: boolean,
  role: UIRole,
  depth: number,
): boolean {
  if (!colored) return false;
  if (!insideGlass) return true;
  return role === 'container' && depth === 0;
}

/**
 * Resolve the glass tri-state against parent context.
 *
 * - undefined: inherit from parent (if active, use baseDensity; else false)
 * - true: opt in at 'normal'
 * - false: solid for THIS component (parent still propagates to children)
 * - string: opt in at that specific density
 */
function resolveGlassTriState(
  glass: GlassDensity | boolean | undefined,
  parent: UIContext,
): GlassDensity | false {
  if (glass === undefined) {
    return parent.active ? parent.baseDensity : false;
  }
  return resolveGlass(glass);
}

/**
 * The main computation function. Takes component input + parent context,
 * returns everything the template needs.
 */
export function computeUIOutput(input: UIInput, parent: UIContext): UIOutput {
  // 1. Glass tri-state
  const effectiveGlass = resolveGlassTriState(input.glass, parent);

  // 2. Merge props with parent fallback
  // 'gradient' is a container-only concept (multi-color glass surface) -- non-containers
  // can't render it, so they fall back to their role default instead of inheriting it.
  const roleDefault: ThemeColor = input.role === 'action' ? 'primary' : 'neutral';
  const inheritedColor = (parent.color === 'gradient' && input.role !== 'container' && input.role !== 'alert') ? undefined : parent.color;
  const color: ThemeColor = input.color ?? inheritedColor ?? roleDefault;
  const style: RenderStyle = input.style ?? parent.style ?? 'solid';
  const size: Size = input.size ?? parent.size ?? 'md';
  const disabled = (input.disabled ?? false) || parent.disabled; // sticky OR

  // 3. Depth
  const depth = computeUIDepth(input.role, parent.depth, parent.active);

  // 4. Frosted -- resolve explicit value, let getComponentStyles auto-derive when undefined
  const frosted = resolveFrosted(input.frosted);

  // 5. Styles via existing engine
  const componentStyles = getComponentStyles({
    ...(input.variant ? { variant: input.variant } : { color, style }),
    glass: effectiveGlass,
    ...(frosted ? { frosted } : {}),
    tint: input.tint,
    depth,
    raised: input.raised,
    role: input.role,
  });

  // 6. Glow
  const glowClass = getGlowClass(input.glow);

  // 7. Derived booleans
  const insideGlass = parent.active;
  const reactive = (input.reactive ?? false) && effectiveGlass !== false;
  const showBackdrop = shouldShowBackdrop(input.colored ?? false, insideGlass, input.role, depth);

  return {
    color,
    style,
    size,
    disabled,
    glass: effectiveGlass,
    frosted: frosted || (effectiveGlass ? densityToFrost(effectiveGlass) : false),
    depth,
    insideGlass,
    raised: input.raised ?? false,
    reactive,
    showBackdrop,
    className: componentStyles.class,
    styles: componentStyles.style,
    glowClass,
  };
}

/**
 * Build the context to propagate to children via setContext.
 */
export function buildUIContext(output: UIOutput, parentCtx: UIContext): UIContext {
  return {
    color: output.color,
    style: output.style,
    size: output.size,
    disabled: output.disabled,
    glass: output.glass,
    depth: output.depth,
    active: output.glass !== false || parentCtx.active,
    baseDensity: (output.glass !== false ? output.glass : parentCtx.baseDensity) || 'normal',
  };
}
