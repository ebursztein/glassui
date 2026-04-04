/**
 * Proximity Glow -- Svelte action for cursor-tracking glass highlights.
 *
 * Sets --mouse-x, --mouse-y, and --glow-opacity CSS custom properties
 * on the element. CSS classes (.glass-reactive, .glass-reactive-border)
 * in glass.css consume these to render radial gradient effects.
 *
 * Usage: <div use:proximityGlow>
 *
 * All visual updates go through CSSOM (style.setProperty) to avoid
 * triggering Svelte reactivity -- keeps the render loop at 60fps.
 */

export function proximityGlow(node: HTMLElement) {
  function updatePosition(e: PointerEvent) {
    const rect = node.getBoundingClientRect();
    node.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    node.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  }

  function onPointerEnter(e: PointerEvent) {
    updatePosition(e);
    node.style.setProperty('--glow-opacity', '1');
  }

  function onPointerMove(e: PointerEvent) {
    updatePosition(e);
    node.style.setProperty('--glow-opacity', '1');
  }

  function onPointerLeave() {
    node.style.setProperty('--glow-opacity', '0');
  }

  node.addEventListener('pointerenter', onPointerEnter);
  node.addEventListener('pointermove', onPointerMove);
  node.addEventListener('pointerleave', onPointerLeave);

  return {
    destroy() {
      node.removeEventListener('pointerenter', onPointerEnter);
      node.removeEventListener('pointermove', onPointerMove);
      node.removeEventListener('pointerleave', onPointerLeave);
      node.style.removeProperty('--mouse-x');
      node.style.removeProperty('--mouse-y');
      node.style.removeProperty('--glow-opacity');
    },
  };
}
