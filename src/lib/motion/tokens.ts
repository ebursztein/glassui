import type { SpringPreset, Duration, Easing, TransitionPreset, SpringConfig } from './schema';

export const springs: Record<SpringPreset, SpringConfig> = {
  gentle: { stiffness: 120, damping: 14 },
  snappy: { stiffness: 300, damping: 20 },
  bouncy: { stiffness: 400, damping: 10, bounce: 0.25 },
};

export const durations: Record<Duration, number> = {
  instant: 0.1,
  fast: 0.15,
  normal: 0.3,
  slow: 0.5,
  glacial: 0.8,
};

export const easings: Record<Easing, number[]> = {
  default: [0.4, 0, 0.2, 1],
  in: [0.4, 0, 1, 1],
  out: [0, 0, 0.2, 1],
  bounce: [0.68, -0.55, 0.265, 1.55],
};

export const transitions: Record<TransitionPreset, { initial: Record<string, number>; animate: Record<string, number> }> = {
  enter: { initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 } },
  exit: { initial: { opacity: 1, scale: 1 }, animate: { opacity: 0, scale: 0.95 } },
  slideUp: { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 } },
  slideDown: { initial: { opacity: 0, y: -8 }, animate: { opacity: 1, y: 0 } },
  slideLeft: { initial: { opacity: 0, x: 8 }, animate: { opacity: 1, x: 0 } },
  slideRight: { initial: { opacity: 0, x: -8 }, animate: { opacity: 1, x: 0 } },
};

/** Resolve a spring preset name to its config */
export function resolveSpring(preset: SpringPreset | SpringConfig): SpringConfig {
  if (typeof preset === 'string') return springs[preset];
  return preset;
}
