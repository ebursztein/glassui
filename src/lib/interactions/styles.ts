/**
 * Unified Component Styling
 *
 * Single composition function that all GlassUI components call to resolve
 * color + style + glass + frosted + depth + raised + role into a final
 * class string + style attribute.
 *
 * Glass mode uses --glass-density CSS custom property (computed from depth)
 * to drive .glass-pane and .glass-surface classes. Blur is independent via
 * .frost-light/medium/heavy classes.
 */

import { cn } from '$lib/utils/cn';
import { type GlassDensity, type FrostedLevel, type GlassRole, computeDensity, densityToFrost } from '$lib/interactions/glass';
import type { ThemeColor, RenderStyle, Variant, Status } from '$lib/types/enums';

// ---------------------------------------------------------------------------
// Color contracts: theme color -> semantic CSS token references
// ---------------------------------------------------------------------------

interface ColorSet {
  bg: string;
  text: string;
  border: string;
  hover: string;
}

const themeColors: Record<ThemeColor, ColorSet> = {
  primary:     { bg: 'var(--primary)',     text: 'var(--primary-foreground)',     border: 'var(--primary-line)',      hover: 'var(--primary-hover)' },
  secondary:   { bg: 'var(--secondary)',   text: 'var(--secondary-foreground)',   border: 'var(--secondary-line)',    hover: 'var(--secondary-hover)' },
  accent:      { bg: 'var(--accent)',     text: 'var(--accent-foreground)',     border: 'var(--accent-line)',      hover: 'var(--accent-hover)' },
  destructive: { bg: 'var(--destructive)', text: 'var(--destructive-foreground)', border: 'transparent',             hover: 'var(--destructive-hover)' },
  neutral:     { bg: 'var(--surface)',     text: 'var(--surface-foreground)',     border: 'var(--surface-line)',      hover: 'var(--surface-hover)' },
  theme:       { bg: 'var(--primary)',     text: 'var(--primary-foreground)',     border: 'var(--primary-line)',      hover: 'var(--primary-hover)' },
};

const statusColors: Record<Status, ColorSet> = {
  info:    { bg: 'var(--status-info)',    text: 'var(--status-info-foreground)',    border: 'var(--status-info-border)',    hover: 'var(--status-info-highlight)' },
  success: { bg: 'var(--status-success)', text: 'var(--status-success-foreground)', border: 'var(--status-success-border)', hover: 'var(--status-success-highlight)' },
  warning: { bg: 'var(--status-warning)', text: 'var(--status-warning-foreground)', border: 'var(--status-warning-border)', hover: 'var(--status-warning-highlight)' },
  error:   { bg: 'var(--status-error)',   text: 'var(--status-error-foreground)',   border: 'var(--status-error-border)',   hover: 'var(--status-error-highlight)' },
};

// ---------------------------------------------------------------------------
// Solid class builders: color x style -> Tailwind classes
// ---------------------------------------------------------------------------

// Pre-built solid classes using Tailwind semantic tokens (for common combos)
const solidActionMap: Record<string, string> = {
  'neutral:solid':      cn('bg-surface border border-line-2 text-foreground shadow-sm', 'hover:bg-surface-hover'),
  'primary:solid':      cn('bg-primary border border-primary-line text-primary-foreground shadow-sm', 'hover:bg-primary-hover'),
  'secondary:solid':    cn('bg-secondary border border-secondary-line text-secondary-foreground shadow-sm', 'hover:bg-secondary-hover'),
  'accent:solid':       cn('bg-accent border border-accent-line text-accent-foreground shadow-sm', 'hover:bg-accent-hover'),
  'destructive:solid':  cn('bg-destructive border border-transparent text-destructive-foreground shadow-sm', 'hover:bg-destructive-hover'),
  'neutral:outline':    cn('bg-transparent border-2 border-line-3 text-foreground', 'hover:bg-layer-hover hover:border-line-4'),
  'primary:outline':    cn('bg-transparent border-2 border-primary text-primary', 'hover:bg-primary/10'),
  'secondary:outline':  cn('bg-transparent border-2 border-secondary text-secondary', 'hover:bg-secondary/10'),
  'accent:outline':     cn('bg-transparent border-2 border-accent text-accent', 'hover:bg-accent/10'),
  'destructive:outline': cn('bg-transparent border-2 border-destructive text-destructive', 'hover:bg-destructive/10'),
  'neutral:ghost':      cn('bg-transparent text-muted-foreground', 'hover:bg-layer-hover hover:text-foreground'),
  'primary:ghost':      cn('bg-transparent text-primary', 'hover:bg-primary/10'),
  'secondary:ghost':    cn('bg-transparent text-secondary', 'hover:bg-secondary/10'),
  'accent:ghost':       cn('bg-transparent text-accent', 'hover:bg-accent/10'),
  'destructive:ghost':  cn('bg-transparent text-destructive', 'hover:bg-destructive/10'),
};

const solidInlineMap: Record<string, string> = {
  'neutral:solid':      'bg-surface border-surface-line text-surface-foreground',
  'primary:solid':      'bg-primary border-primary-line text-primary-foreground',
  'secondary:solid':    'bg-secondary border-secondary-line text-secondary-foreground',
  'accent:solid':       'bg-accent border-accent-line text-accent-foreground',
  'destructive:solid':  'bg-destructive border-transparent text-destructive-foreground',
  'neutral:outline':    'bg-transparent border-line-3 text-foreground',
  'primary:outline':    'bg-transparent border-primary text-primary',
  'secondary:outline':  'bg-transparent border-secondary text-secondary',
  'accent:outline':     'bg-transparent border-accent text-accent',
  'destructive:outline': 'bg-transparent border-destructive text-destructive',
  'neutral:ghost':      'bg-transparent border-transparent text-muted-foreground',
  'primary:ghost':      'bg-transparent border-transparent text-primary',
  'secondary:ghost':    'bg-transparent border-transparent text-secondary',
  'accent:ghost':       'bg-transparent border-transparent text-accent',
  'destructive:ghost':  'bg-transparent border-transparent text-destructive',
};

/** Solid status classes (Alert, Badge) */
const solidStatusClasses: Record<Status, string> = {
  info:    'bg-status-info-highlight border-status-info-border text-status-info-foreground',
  success: 'bg-status-success-highlight border-status-success-border text-status-success-foreground',
  warning: 'bg-status-warning-highlight border-status-warning-border text-status-warning-foreground',
  error:   'bg-status-error-highlight border-status-error-border text-status-error-foreground',
};

/** Solid status classes for Alert */
const solidAlertStatus: Record<Status, { bg: string; accent: string; iconColor: string; titleColor: string; bodyColor: string }> = {
  info:    { bg: 'bg-status-info',    accent: 'border-l-status-info-foreground',    iconColor: 'text-status-info-foreground',    titleColor: 'text-status-info-foreground',    bodyColor: 'text-foreground/80' },
  success: { bg: 'bg-status-success', accent: 'border-l-status-success-foreground', iconColor: 'text-status-success-foreground', titleColor: 'text-status-success-foreground', bodyColor: 'text-foreground/80' },
  warning: { bg: 'bg-status-warning', accent: 'border-l-status-warning-foreground', iconColor: 'text-status-warning-foreground', titleColor: 'text-status-warning-foreground', bodyColor: 'text-foreground/80' },
  error:   { bg: 'bg-status-error',   accent: 'border-l-status-error-foreground',   iconColor: 'text-status-error-foreground',   titleColor: 'text-status-error-foreground',   bodyColor: 'text-foreground/80' },
};

/** Solid field classes (Input, Textarea) */
const solidFieldClasses = cn(
  'bg-layer border border-line-2 text-foreground',
  'placeholder:text-muted-foreground',
  'focus:border-primary focus:ring-2 focus:ring-primary/20',
);

/** Solid status borders for field components */
const solidFieldStatus: Record<Status, string> = {
  info:    'border-status-info-foreground focus:border-status-info-foreground focus:ring-status-info-foreground/20',
  success: 'border-status-success-foreground focus:border-status-success-foreground focus:ring-status-success-foreground/20',
  warning: 'border-status-warning-foreground focus:border-status-warning-foreground focus:ring-status-warning-foreground/20',
  error:   'border-status-error-foreground focus:border-status-error-foreground focus:ring-status-error-foreground/20',
};

/** Solid container classes (Card) */
const solidContainerClasses = 'bg-card border border-card-line text-foreground';

// ---------------------------------------------------------------------------
// Glass role interactions (defined once)
// ---------------------------------------------------------------------------

const glassRoleInteractions: Record<string, string> = {
  field: 'placeholder:text-[var(--glass-text-faint)] focus:border-[var(--comp-text)]/40 focus:ring-2 focus:ring-[var(--comp-text)]/20',
  action: 'hover:brightness-125 active:brightness-90 transition-all duration-200',
};

// ---------------------------------------------------------------------------
// Helpers: resolve color from various input shapes
// ---------------------------------------------------------------------------

function isNeutralColor(color: ThemeColor): boolean {
  return color === 'neutral';
}

function isThemeColor(color: ThemeColor): boolean {
  return color === 'theme';
}

/** Resolve a Variant (legacy) to color + style */
function variantToColorStyle(variant: Variant): { color: ThemeColor; style: RenderStyle } {
  switch (variant) {
    case 'primary': return { color: 'primary', style: 'solid' };
    case 'secondary': return { color: 'secondary', style: 'solid' };
    case 'destructive': return { color: 'destructive', style: 'solid' };
    case 'outline': return { color: 'neutral', style: 'outline' };
    case 'ghost': return { color: 'neutral', style: 'ghost' };
    case 'default':
    default: return { color: 'neutral', style: 'solid' };
  }
}

// ---------------------------------------------------------------------------
// Frost class helper
// ---------------------------------------------------------------------------

const frostClassMap: Record<FrostedLevel, string> = {
  light: 'frost-light',
  medium: 'frost-medium',
  heavy: 'frost-heavy',
};

function getFrostClass(frosted: FrostedLevel | false): string {
  if (!frosted) return '';
  return frostClassMap[frosted];
}

// ---------------------------------------------------------------------------
// getComponentStyles -- the unified composition function
// ---------------------------------------------------------------------------

export type TintLevel = 'subtle' | 'medium' | 'vivid';

export interface ComponentStyleConfig {
  /** Theme color. Defaults to 'neutral'. */
  color?: ThemeColor;
  /** Render style. Defaults to 'solid'. */
  style?: RenderStyle;
  /** Legacy variant (maps to color + style). Use color/style instead. */
  variant?: Variant;
  status?: Status;
  /** Glass density. false = solid mode. */
  glass: GlassDensity | false;
  /** Frosted blur level. undefined = auto-derive from density. false = no blur. */
  frosted?: FrostedLevel | false;
  /** Color tint strength. Controls how saturated the glass surface color is. */
  tint?: TintLevel;
  /** Depth in the glass tree (from context). */
  depth?: number;
  raised?: boolean;
  role: GlassRole;
}

export interface ComponentStyles {
  class: string;
  style: string;
}

/**
 * Compute the final class + style for a component.
 *
 * Accepts either color+style (new) or variant (legacy, auto-mapped).
 * Status overrides color when provided.
 */
export function getComponentStyles(config: ComponentStyleConfig): ComponentStyles {
  const { status, glass, frosted: frostedInput, tint, depth = 0, raised, role } = config;
  // Auto-frost: when frosted is not explicitly provided (undefined) and glass is
  // active, derive a matching blur level from the glass density. Components pass
  // frosted only when the user explicitly set the prop; otherwise it stays undefined.
  const frosted: FrostedLevel | false = frostedInput !== undefined
    ? frostedInput
    : (glass ? densityToFrost(glass) : false);

  // Resolve color + style from config
  let color: ThemeColor;
  let renderStyle: RenderStyle;
  if (config.color) {
    color = config.color;
    renderStyle = config.style ?? 'solid';
  } else if (config.variant) {
    const resolved = variantToColorStyle(config.variant);
    color = resolved.color;
    renderStyle = resolved.style;
  } else {
    color = 'neutral';
    renderStyle = config.style ?? 'solid';
  }

  // Status overrides color
  const colors = status ? statusColors[status] : themeColors[color];
  const neutral = status ? false : isNeutralColor(color);
  const shadow = raised ? 'shadow-lg' : '';

  if (!glass) {
    const solidClasses = cn(getSolidClasses(role, color, renderStyle, status), shadow);
    // Container + status (Alert-style): provide CSS custom properties for per-part rendering
    if (role === 'container' && status) {
      return {
        class: solidClasses,
        style: `--comp-accent: ${colors.text}; --comp-text: var(--foreground)`,
      };
    }
    // Field: provide --comp-text so labels/helper text inherit via CSS cascade
    if (role === 'field') {
      return { class: solidClasses, style: '--comp-text: var(--foreground)' };
    }
    return { class: solidClasses, style: '' };
  }

  // Glass mode: compute density and build classes
  const density = computeDensity(glass, depth);
  const theme = isThemeColor(color);
  const isAction = role === 'action' || role === 'inline';

  // Container/field: frost + surface treatment (unchanged)
  const frostCls = isAction ? '' : getFrostClass(frosted);
  const surfaceCls = isAction ? ''
    : theme ? 'glass-surface glass-theme'
    : neutral ? 'glass-surface glass-neutral'
    : 'glass-surface';

  // RenderStyle-aware treatment for each role.
  // Glass text uses var(--glass-text) (semi-transparent black/white that auto-switches
  // with light/dark mode). For outline/ghost colored actions, the brand color IS the
  // identity -- same pattern as solid mode outline/ghost.
  let paneCls: string;
  let interaction: string;
  let textValue: string;

  if (isAction) {
    if (renderStyle === 'outline') {
      paneCls = 'border-2 border-[var(--comp-border)]';
      interaction = 'hover:bg-[var(--comp-bg)]/10 active:bg-[var(--comp-bg)]/15 transition-all duration-200';
      textValue = neutral ? 'var(--glass-text)' : colors.bg;
    } else if (renderStyle === 'ghost') {
      paneCls = '';
      interaction = 'hover:bg-[var(--comp-bg)]/10 active:bg-[var(--comp-bg)]/15 transition-all duration-200';
      textValue = neutral ? 'var(--glass-text)' : colors.bg;
    } else {
      // solid (default)
      paneCls = 'glass-action';
      interaction = glassRoleInteractions['action'];
      textValue = 'var(--glass-text)';
    }
  } else if (role === 'field') {
    paneCls = 'glass-inset';
    interaction = glassRoleInteractions['field'] ?? '';
    // Status override: colored border + focus ring via --comp-status (absorbs getFieldStatusOverrides)
    if (status) {
      interaction = cn(interaction, 'border-[var(--comp-status)] focus:border-[var(--comp-status)] focus:ring-[var(--comp-status)]/20');
    }
    textValue = 'var(--glass-text)';
  } else {
    // container
    paneCls = 'glass-pane';
    interaction = '';
    textValue = 'var(--glass-text)';
  }

  const tintMultiplier: Record<TintLevel, number> = { subtle: 0.35, medium: 0.65, vivid: 1.0 };
  const tintValue = tint ? tintMultiplier[tint] : 1.0;

  const cls = cn(paneCls, frostCls, surfaceCls, 'text-[var(--comp-text)]', shadow, interaction);
  const styleParts = [
    `--glass-density: ${density.toFixed(3)}`,
    `--comp-bg: ${colors.bg}`,
    `--comp-text: ${textValue}`,
    `--comp-border: ${colors.border}`,
  ];
  if (tint) styleParts.push(`--glass-tint: ${tintValue}`);
  if (status && role === 'container') styleParts.push(`--comp-accent: ${colors.text}`);
  if (status && role === 'field') styleParts.push(`--comp-status: ${colors.text}`);
  const style = styleParts.join('; ');

  return { class: cls, style };
}

/**
 * Get solid-mode classes for a given role/color/style/status.
 */
function getSolidClasses(role: GlassRole, color: ThemeColor, renderStyle: RenderStyle, status?: Status): string {
  const key = `${color}:${renderStyle}`;
  switch (role) {
    case 'action':
      return solidActionMap[key] ?? solidActionMap['neutral:solid'];
    case 'inline':
      if (status) return solidStatusClasses[status];
      return solidInlineMap[key] ?? solidInlineMap['neutral:solid'];
    case 'field':
      if (status) return cn(solidFieldClasses, solidFieldStatus[status]);
      return solidFieldClasses;
    case 'container':
      if (status) return solidAlertStatus[status].bg;
      return solidContainerClasses;
    default:
      return solidContainerClasses;
  }
}

