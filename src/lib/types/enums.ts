import { z } from 'zod/v4';

/** Visual variant — every styled component uses these */
export const Variant = z.enum(['default', 'primary', 'secondary', 'outline', 'ghost', 'destructive']);
export type Variant = z.infer<typeof Variant>;

/** Theme color — which color from the theme palette. 'theme' uses all three palette colors. */
export const ThemeColor = z.enum(['primary', 'secondary', 'accent', 'destructive', 'neutral', 'theme']);
export type ThemeColor = z.infer<typeof ThemeColor>;

/** Component render style — how the color is applied */
export const RenderStyle = z.enum(['solid', 'outline', 'ghost']);
export type RenderStyle = z.infer<typeof RenderStyle>;

/** Component size */
export const Size = z.enum(['xs', 'sm', 'md', 'lg', 'xl']);
export type Size = z.infer<typeof Size>;

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
