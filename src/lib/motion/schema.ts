import { z } from 'zod/v4';

/** Physics-based spring animation preset */
export const SpringPreset = z.enum(['gentle', 'snappy', 'bouncy']);
export type SpringPreset = z.infer<typeof SpringPreset>;

/** Animation duration preset */
export const Duration = z.enum(['instant', 'fast', 'normal', 'slow', 'glacial']);
export type Duration = z.infer<typeof Duration>;

/** Easing curve preset */
export const Easing = z.enum(['default', 'in', 'out', 'bounce']);
export type Easing = z.infer<typeof Easing>;

/** Standard transition animation preset */
export const TransitionPreset = z.enum([
  'enter', 'exit', 'slideUp', 'slideDown', 'slideLeft', 'slideRight',
]);
export type TransitionPreset = z.infer<typeof TransitionPreset>;

/** Spring physics configuration */
export const SpringConfig = z.object({
  stiffness: z.number(),
  damping: z.number(),
  bounce: z.number().optional(),
});
export type SpringConfig = z.infer<typeof SpringConfig>;
