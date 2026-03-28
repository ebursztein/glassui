import { z } from 'zod/v4';

/** Visual variant — every styled component uses these */
export const Variant = z.enum(['default', 'primary', 'outline', 'ghost', 'destructive']);
export type Variant = z.infer<typeof Variant>;

/** Component size */
export const Size = z.enum(['xs', 'sm', 'md', 'lg', 'xl']);
export type Size = z.infer<typeof Size>;

/** Glass surface intensity — controls blur, opacity, border */
export const GlassIntensity = z.enum(['subtle', 'medium', 'strong']);
export type GlassIntensity = z.infer<typeof GlassIntensity>;

/** Layout orientation */
export const Orientation = z.enum(['horizontal', 'vertical']);
export type Orientation = z.infer<typeof Orientation>;

/** Status — for badges, notifications, alerts */
export const Status = z.enum(['info', 'success', 'warning', 'error']);
export type Status = z.infer<typeof Status>;

/** Positioning */
export const Position = z.enum(['top', 'right', 'bottom', 'left']);
export type Position = z.infer<typeof Position>;

/** Border radius preset */
export const Radius = z.enum(['none', 'sm', 'md', 'lg', 'xl', 'full']);
export type Radius = z.infer<typeof Radius>;
