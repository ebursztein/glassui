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

/** Glass surface density */
export const GlassDensity = z.enum(['ultra-thin', 'thin', 'normal', 'thick', 'ultra-thick']);
export type GlassDensity = z.infer<typeof GlassDensity>;

/** Frosted blur intensity */
export const FrostedLevel = z.enum(['light', 'medium', 'heavy']);
export type FrostedLevel = z.infer<typeof FrostedLevel>;

/** Glow intensity */
export const GlowIntensity = z.enum(['sm', 'md', 'lg']);
export type GlowIntensity = z.infer<typeof GlowIntensity>;
