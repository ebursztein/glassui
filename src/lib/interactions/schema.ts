import { z } from 'zod/v4';

/** Hover interaction style */
export const HoverEffect = z.enum(['lift', 'brighten', 'glow', 'none']);
export type HoverEffect = z.infer<typeof HoverEffect>;

/** Focus visibility style */
export const FocusEffect = z.enum(['ring', 'glow']);
export type FocusEffect = z.infer<typeof FocusEffect>;

/** Gradient style preset */
export const GradientPreset = z.enum(['accent', 'glow', 'highlight']);
export type GradientPreset = z.infer<typeof GradientPreset>;
