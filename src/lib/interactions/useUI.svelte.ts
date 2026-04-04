/**
 * useUI -- Context-Driven State Machine for GlassUI Components
 *
 * Thin Svelte wrapper around the pure logic in useUI.logic.ts.
 * Handles context reading/setting and reactive derivation.
 *
 * Usage in a component:
 *   const ui = useUI({
 *     props: () => ({ color, glass, raised, glow, colored, reactive, disabled }),
 *     role: 'action',
 *   });
 *   // Then: ui.className, ui.styles, ui.glowClass, ui.showBackdrop, etc.
 */

import { getContext, setContext } from 'svelte';
import {
  UI_CONTEXT_KEY,
  INACTIVE_UI_CONTEXT,
  computeUIOutput,
  buildUIContext,
  type UIRole,
  type UIInput,
  type UIContext,
  type UIOutput,
} from './useUI.logic';

// Re-export types and constants for convenience
export {
  UI_CONTEXT_KEY,
  INACTIVE_UI_CONTEXT,
  computeUIDepth,
  shouldShowBackdrop,
  computeUIOutput,
  buildUIContext,
  type UIRole,
  type UIInput,
  type UIContext,
  type UIOutput,
} from './useUI.logic';

// ---------------------------------------------------------------------------
// Context reader for sub-components (layout primitives that just need awareness)
// ---------------------------------------------------------------------------

/**
 * Read the parent UI context. Call at component init time (top-level script).
 * Returns a getter that resolves the parent's current UI context.
 * Use this in sub-components (CardTitle, SidebarItem, etc.) that need
 * insideGlass awareness but don't need the full useUI machinery.
 */
export function getParentUI(): () => UIContext {
  try {
    const ctx = getContext<() => UIContext>(UI_CONTEXT_KEY);
    return ctx ?? (() => INACTIVE_UI_CONTEXT);
  } catch {
    return () => INACTIVE_UI_CONTEXT;
  }
}

// ---------------------------------------------------------------------------
// useUI rune
// ---------------------------------------------------------------------------

interface UseUIConfig {
  /** Getter returning the current props. Must be a function for reactivity. */
  props: () => Omit<UIInput, 'role'>;
  /** Static role for this component. */
  role: UIRole;
}

/**
 * The useUI composable. Call at component init time (top-level script).
 *
 * Returns an object with getter properties that reactively track the
 * resolved UI state (className, styles, glowClass, showBackdrop, etc.).
 */
export function useUI(config: UseUIConfig) {
  // 1. Read parent context
  let parentCtx: () => UIContext;
  try {
    const ctx = getContext<() => UIContext>(UI_CONTEXT_KEY);
    parentCtx = ctx ?? (() => INACTIVE_UI_CONTEXT);
  } catch {
    parentCtx = () => INACTIVE_UI_CONTEXT;
  }

  // 2. Reactive computation
  const output = $derived(computeUIOutput({ ...config.props(), role: config.role }, parentCtx()));

  // 3. Set child context (every component is a chain link)
  setContext(UI_CONTEXT_KEY, (): UIContext => buildUIContext(output, parentCtx()));

  // 4. Return object with getters for reactive access
  return {
    get color() { return output.color; },
    get style() { return output.style; },
    get size() { return output.size; },
    get disabled() { return output.disabled; },
    get glass() { return output.glass; },
    get frosted() { return output.frosted; },
    get depth() { return output.depth; },
    get insideGlass() { return output.insideGlass; },
    get raised() { return output.raised; },
    get reactive() { return output.reactive; },
    get showBackdrop() { return output.showBackdrop; },
    get className() { return output.className; },
    get styles() { return output.styles; },
    get glowClass() { return output.glowClass; },
  };
}
