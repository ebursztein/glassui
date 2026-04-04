/**
 * BaseUIProps -- shared contract for all GlassUI visual components.
 *
 * Provides reusable Zod field fragments (GlassField, FrostedField, GlowField)
 * and the full BaseUIPropsSchema that component schemas extend via .extend().
 */

import { z } from 'zod/v4';
import { ThemeColor, RenderStyle, Size, Status } from '$lib/types/enums';
import { GlassDensity, FrostedLevel, GlowIntensity } from '$lib/interactions/schema';

// ---------------------------------------------------------------------------
// Reusable Zod field fragments
// ---------------------------------------------------------------------------

/** Glass density: named level or boolean (true = 'normal') */
export const GlassField = z.union([GlassDensity, z.boolean()]).default(false);

/** Frosted blur: named level or boolean (true = 'medium') */
export const FrostedField = z.union([FrostedLevel, z.boolean()]).default(false);

/** Glow intensity: named level or boolean (true = 'md') */
export const GlowField = z.union([GlowIntensity, z.boolean()]).default(false);

// ---------------------------------------------------------------------------
// Base schema
// ---------------------------------------------------------------------------

export const BaseUIPropsSchema = z.object({
  color: ThemeColor.optional(),
  style: RenderStyle.optional(),
  size: Size.optional(),
  status: Status.optional(),
  glass: GlassField,
  frosted: FrostedField,
  glow: GlowField,
  colored: z.boolean().default(false),
  raised: z.boolean().default(false),
  reactive: z.boolean().default(false),
  disabled: z.boolean().default(false),
});

export type BaseUIProps = z.infer<typeof BaseUIPropsSchema>;
