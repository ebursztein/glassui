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
import type { ThemeColor, RenderStyle, Variant } from '$lib/types/enums';

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
  gradient:    { bg: 'var(--primary)',     text: 'var(--primary-foreground)',     border: 'var(--primary-line)',      hover: 'var(--primary-hover)' },
  info:        { bg: 'var(--status-info)',    text: 'var(--status-info-foreground)',    border: 'var(--status-info-border)',    hover: 'var(--status-info-highlight)' },
  success:     { bg: 'var(--status-success)', text: 'var(--status-success-foreground)', border: 'var(--status-success-border)', hover: 'var(--status-success-highlight)' },
  warning:     { bg: 'var(--status-warning)', text: 'var(--status-warning-foreground)', border: 'var(--status-warning-border)', hover: 'var(--status-warning-highlight)' },
  error:       { bg: 'var(--status-error)',   text: 'var(--status-error-foreground)',   border: 'var(--status-error-border)',   hover: 'var(--status-error-highlight)' },
};

// ---------------------------------------------------------------------------
// Solid class builders: color x style -> Tailwind classes
// ---------------------------------------------------------------------------

// Pre-built solid classes using Tailwind semantic tokens (for common combos)
const solidActionMap: Record<string, string> = {
  'neutral:solid':      cn('bg-surface border border-line-2 text-foreground shadow-sm', 'hover:bg-surface-hover active:bg-[var(--surface-hover)] active:brightness-95 transition-all'),
  'primary:solid':      cn('bg-primary border border-primary-line text-primary-foreground shadow-sm', 'hover:bg-primary-hover active:bg-[var(--primary-hover)] active:brightness-95 transition-all'),
  'secondary:solid':    cn('bg-secondary border border-secondary-line text-secondary-foreground shadow-sm', 'hover:bg-secondary-hover active:bg-[var(--secondary-hover)] active:brightness-95 transition-all'),
  'accent:solid':       cn('bg-accent border border-accent-line text-accent-foreground shadow-sm', 'hover:bg-accent-hover active:bg-[var(--accent-hover)] active:brightness-95 transition-all'),
  'destructive:solid':  cn('bg-destructive border border-transparent text-destructive-foreground shadow-sm', 'hover:bg-destructive-hover active:bg-[var(--destructive-hover)] active:brightness-95 transition-all'),
  'info:solid':         cn('bg-status-info-highlight border border-status-info-border text-status-info-foreground shadow-sm', 'hover:brightness-95 active:brightness-90 transition-all'),
  'success:solid':      cn('bg-status-success-highlight border border-status-success-border text-status-success-foreground shadow-sm', 'hover:brightness-95 active:brightness-90 transition-all'),
  'warning:solid':      cn('bg-status-warning-highlight border border-status-warning-border text-status-warning-foreground shadow-sm', 'hover:brightness-95 active:brightness-90 transition-all'),
  'error:solid':        cn('bg-status-error-highlight border border-status-error-border text-status-error-foreground shadow-sm', 'hover:brightness-95 active:brightness-90 transition-all'),
  'neutral:outline':    cn('bg-transparent border-2 border-line-3 text-foreground', 'hover:bg-layer-hover hover:border-line-4 active:bg-layer-hover active:brightness-95 transition-all'),
  'primary:outline':    cn('bg-transparent border-2 border-primary text-primary', 'hover:bg-primary/10 active:bg-primary/20 transition-all'),
  'secondary:outline':  cn('bg-transparent border-2 border-secondary text-secondary', 'hover:bg-secondary/10 active:bg-secondary/20 transition-all'),
  'accent:outline':     cn('bg-transparent border-2 border-accent text-accent', 'hover:bg-accent/10 active:bg-accent/20 transition-all'),
  'destructive:outline': cn('bg-transparent border-2 border-destructive text-destructive', 'hover:bg-destructive/10 active:bg-destructive/20 transition-all'),
  'info:outline':       cn('bg-transparent border-2 border-status-info-border text-status-info-foreground', 'hover:bg-status-info/10 active:bg-status-info/20 transition-all'),
  'success:outline':    cn('bg-transparent border-2 border-status-success-border text-status-success-foreground', 'hover:bg-status-success/10 active:bg-status-success/20 transition-all'),
  'warning:outline':    cn('bg-transparent border-2 border-status-warning-border text-status-warning-foreground', 'hover:bg-status-warning/10 active:bg-status-warning/20 transition-all'),
  'error:outline':      cn('bg-transparent border-2 border-status-error-border text-status-error-foreground', 'hover:bg-status-error/10 active:bg-status-error/20 transition-all'),
  'neutral:ghost':      cn('bg-transparent text-muted-foreground', 'hover:bg-layer-hover hover:text-foreground active:bg-layer-hover active:brightness-95 transition-all'),
  'primary:ghost':      cn('bg-transparent text-primary', 'hover:bg-primary/10 active:bg-primary/20 transition-all'),
  'secondary:ghost':    cn('bg-transparent text-secondary', 'hover:bg-secondary/10 active:bg-secondary/20 transition-all'),
  'accent:ghost':       cn('bg-transparent text-accent', 'hover:bg-accent/10 active:bg-accent/20 transition-all'),
  'destructive:ghost':  cn('bg-transparent text-destructive', 'hover:bg-destructive/10 active:bg-destructive/20 transition-all'),
  'info:ghost':         cn('bg-transparent text-status-info-foreground', 'hover:bg-status-info/10 active:bg-status-info/20 transition-all'),
  'success:ghost':      cn('bg-transparent text-status-success-foreground', 'hover:bg-status-success/10 active:bg-status-success/20 transition-all'),
  'warning:ghost':      cn('bg-transparent text-status-warning-foreground', 'hover:bg-status-warning/10 active:bg-status-warning/20 transition-all'),
  'error:ghost':        cn('bg-transparent text-status-error-foreground', 'hover:bg-status-error/10 active:bg-status-error/20 transition-all'),
};

const solidInlineMap: Record<string, string> = {
  'neutral:solid':      'bg-surface border border-surface-line text-surface-foreground',
  'primary:solid':      'bg-primary border border-primary-line text-primary-foreground',
  'secondary:solid':    'bg-secondary border border-secondary-line text-secondary-foreground',
  'accent:solid':       'bg-accent border border-accent-line text-accent-foreground',
  'destructive:solid':  'bg-destructive border border-transparent text-destructive-foreground',
  'info:solid':         'bg-status-info-highlight border border-status-info-border text-status-info-foreground',
  'success:solid':      'bg-status-success-highlight border border-status-success-border text-status-success-foreground',
  'warning:solid':      'bg-status-warning-highlight border border-status-warning-border text-status-warning-foreground',
  'error:solid':        'bg-status-error-highlight border border-status-error-border text-status-error-foreground',
  'neutral:outline':    'bg-transparent border border-line-3 text-foreground',
  'primary:outline':    'bg-transparent border border-primary text-primary',
  'secondary:outline':  'bg-transparent border border-secondary text-secondary',
  'accent:outline':     'bg-transparent border border-accent text-accent',
  'destructive:outline': 'bg-transparent border border-destructive text-destructive',
  'info:outline':       'bg-transparent border border-status-info-border text-status-info-foreground',
  'success:outline':    'bg-transparent border border-status-success-border text-status-success-foreground',
  'warning:outline':    'bg-transparent border border-status-warning-border text-status-warning-foreground',
  'error:outline':      'bg-transparent border border-status-error-border text-status-error-foreground',
  'neutral:ghost':      'bg-transparent border border-transparent text-muted-foreground',
  'primary:ghost':      'bg-transparent border border-transparent text-primary',
  'secondary:ghost':    'bg-transparent border border-transparent text-secondary',
  'accent:ghost':       'bg-transparent border border-transparent text-accent',
  'destructive:ghost':  'bg-transparent border border-transparent text-destructive',
  'info:ghost':         'bg-transparent border border-transparent text-status-info-foreground',
  'success:ghost':      'bg-transparent border border-transparent text-status-success-foreground',
  'warning:ghost':      'bg-transparent border border-transparent text-status-warning-foreground',
  'error:ghost':        'bg-transparent border border-transparent text-status-error-foreground',
};

/** Solid status classes for Alert */
const solidAlertStatus: Record<string, { bg: string; accent: string; iconColor: string; titleColor: string; bodyColor: string }> = {
  info:    { bg: 'bg-status-info',    accent: 'border-l-status-info-foreground',    iconColor: 'text-status-info-foreground',    titleColor: 'text-status-info-foreground',    bodyColor: 'text-foreground/80' },
  success: { bg: 'bg-status-success', accent: 'border-l-status-success-foreground', iconColor: 'text-status-success-foreground', titleColor: 'text-status-success-foreground', bodyColor: 'text-foreground/80' },
  warning: { bg: 'bg-status-warning', accent: 'border-l-status-warning-foreground', iconColor: 'text-status-warning-foreground', titleColor: 'text-status-warning-foreground', bodyColor: 'text-foreground/80' },
  error:   { bg: 'bg-status-error',   accent: 'border-l-status-error-foreground',   iconColor: 'text-status-error-foreground',   titleColor: 'text-status-error-foreground',   bodyColor: 'text-foreground/80' },
  // Fallbacks for non-status colors if used as alert
  primary: { bg: 'bg-primary/10',     accent: 'border-l-primary',     iconColor: 'text-primary',     titleColor: 'text-primary',     bodyColor: 'text-foreground/80' },
  secondary: { bg: 'bg-secondary/10', accent: 'border-l-secondary',   iconColor: 'text-secondary',   titleColor: 'text-secondary',   bodyColor: 'text-foreground/80' },
  accent: { bg: 'bg-accent/10',       accent: 'border-l-accent',       iconColor: 'text-accent',       titleColor: 'text-accent',       bodyColor: 'text-foreground/80' },
  destructive: { bg: 'bg-destructive/10', accent: 'border-l-destructive', iconColor: 'text-destructive', titleColor: 'text-destructive', bodyColor: 'text-foreground/80' },
  neutral: { bg: 'bg-surface',        accent: 'border-l-foreground/50', iconColor: 'text-foreground', titleColor: 'text-foreground', bodyColor: 'text-foreground/80' },
  theme: { bg: 'bg-primary/10',       accent: 'border-l-primary',     iconColor: 'text-primary',     titleColor: 'text-primary',     bodyColor: 'text-foreground/80' },
};

/** Solid field classes (Input, Textarea) */
const solidFieldClasses = cn(
  'bg-layer border border-line-2 text-foreground',
  'placeholder:text-muted-foreground',
  'focus:border-primary focus:ring-2 focus:ring-primary/20',
);

/** Solid status borders for field components */
const solidFieldStatus: Record<string, string> = {
  info:    'border-status-info-foreground focus:border-status-info-foreground focus:ring-status-info-foreground/20',
  success: 'border-status-success-foreground focus:border-status-success-foreground focus:ring-status-success-foreground/20',
  warning: 'border-status-warning-foreground focus:border-status-warning-foreground focus:ring-status-warning-foreground/20',
  error:   'border-status-error-foreground focus:border-status-error-foreground focus:ring-status-error-foreground/20',
};

// ---------------------------------------------------------------------------
// Glass role interactions (defined once)
// ---------------------------------------------------------------------------

const glassRoleInteractions: Record<string, string> = {
  field: 'placeholder:text-[var(--glass-text-faint)] focus:border-[var(--comp-text)]/40 focus:ring-2 focus:ring-[var(--comp-text)]/20',
  action: 'glass-interactive',
};

// ---------------------------------------------------------------------------
// Helpers: resolve color from various input shapes
// ---------------------------------------------------------------------------

function isNeutralColor(color: ThemeColor): boolean {
  return color === 'neutral';
}

function isGradientColor(color: ThemeColor): boolean {
  return color === 'gradient';
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

const statusColorNames = ['info', 'success', 'warning', 'error'];

/**
 * Compute the final class + style for a component.
 *
 * Accepts either color+style (new) or variant (legacy, auto-mapped).
 */
export function getComponentStyles(config: ComponentStyleConfig): ComponentStyles {
  const { glass, frosted: frostedInput, tint, depth = 0, raised, role } = config;
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

  const colors = themeColors[color];
  const neutral = isNeutralColor(color);
  const shadow = raised ? 'shadow-lg' : '';
  const isStatusColor = statusColorNames.includes(color);

  if (!glass) {
    const solidClasses = cn('text-[var(--comp-text)]', getSolidClasses(role, color, renderStyle), shadow);

    let solidTextValue: string;
    if (role === 'field') {
      solidTextValue = 'var(--foreground)';
    } else if (renderStyle === 'outline' || renderStyle === 'ghost') {
      const brandColor = isStatusColor ? colors.text : colors.bg;
      solidTextValue = neutral && role !== 'inline' ? 'var(--foreground)' : brandColor;
    } else {
      solidTextValue = colors.text;
    }

    // Provide CSS custom properties so inheritance (labels, borders, text) works seamlessly
    // even for solid components
    const styleParts = [
      `--comp-bg: ${colors.bg}`,
      `--comp-hover: ${colors.hover}`,
      `--comp-text: ${solidTextValue}`,
      `--comp-border: ${colors.border}`,
    ];
    if (role === 'alert') styleParts.push(`--comp-accent: ${colors.text}`);
    if (isStatusColor && role === 'field') styleParts.push(`--comp-status: ${colors.text}`);
    return { class: solidClasses, style: styleParts.join('; ') };
  }

  // Glass mode: compute density and build classes
  const density = computeDensity(glass, depth);
  const theme = isGradientColor(color);
  const isAction = role === 'action' || role === 'inline';

  // Container/field/alert: frost + surface treatment (unchanged)
  const frostCls = isAction ? '' : getFrostClass(frosted);
  const surfaceCls = isAction ? ''
    : theme ? 'glass-surface glass-gradient'
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
    const brandColor = isStatusColor ? colors.text : colors.bg;
    if (renderStyle === 'outline') {
      paneCls = 'border-2 border-[var(--comp-border)]';
      interaction = role === 'action' ? 'glass-interactive' : '';
      textValue = neutral && role !== 'inline' ? 'var(--glass-text)' : brandColor;
    } else if (renderStyle === 'ghost') {
      paneCls = '';
      interaction = role === 'action' ? 'glass-interactive' : '';
      textValue = neutral && role !== 'inline' ? 'var(--glass-text)' : brandColor;
    } else {
      // solid (default)
      paneCls = 'glass-action';
      interaction = role === 'action' ? glassRoleInteractions['action'] : '';
      textValue = 'var(--glass-text)';
    }
  } else if (role === 'field') {
    paneCls = 'glass-inset';
    interaction = glassRoleInteractions['field'] ?? '';
    // Status override: colored border + focus ring via --comp-status (absorbs getFieldStatusOverrides)
    if (isStatusColor) {
      interaction = cn(interaction, 'border-[var(--comp-status)] focus:border-[var(--comp-status)] focus:ring-[var(--comp-status)]/20');
    }
    textValue = 'var(--glass-text)';
  } else {
    // container or alert
    if (renderStyle === 'outline') {
      paneCls = 'border-2 border-[var(--comp-border)]';
    } else if (renderStyle === 'ghost') {
      paneCls = '';
    } else {
      paneCls = 'glass-pane';
    }
    if (role === 'alert' && renderStyle === 'solid') {
      paneCls = cn(paneCls, `border-l-4 border-l-[var(--comp-accent)]`);
    }
    interaction = '';
    textValue = 'var(--glass-text)';
  }

  const tintMultiplier: Record<TintLevel, number> = { subtle: 0.35, medium: 0.65, vivid: 1.0 };
  const tintValue = tint ? tintMultiplier[tint] : 1.0;

  const cls = cn(paneCls, frostCls, surfaceCls, 'text-[var(--comp-text)]', shadow, interaction);
  const styleParts = [
    `--glass-density: ${density.toFixed(3)}`,
    `--comp-bg: ${colors.bg}`,
    `--comp-hover: ${colors.hover}`,
    `--comp-text: ${textValue}`,
    `--comp-border: ${colors.border}`,
  ];
  if (tint) styleParts.push(`--glass-tint: ${tintValue}`);
  if (role === 'alert') styleParts.push(`--comp-accent: ${colors.text}`);
  if (isStatusColor && role === 'field') styleParts.push(`--comp-status: ${colors.text}`);
  const style = styleParts.join('; ');

  return { class: cls, style };
}

/**
 * Get solid-mode classes for a given role/color/style/status.
 */
function getSolidClasses(role: GlassRole, color: ThemeColor, renderStyle: RenderStyle): string {
  const key = `${color}:${renderStyle}`;
  switch (role) {
    case 'action':
      return solidActionMap[key] ?? solidActionMap['neutral:solid'];
    case 'inline':
      return solidInlineMap[key] ?? solidInlineMap['neutral:solid'];
    case 'field':
      if (statusColorNames.includes(color)) return cn(solidFieldClasses, solidFieldStatus[color]);
      return solidFieldClasses;
    case 'alert':
      return cn(solidAlertStatus[color]?.bg || solidAlertStatus['neutral'].bg, 'border border-transparent border-l-4', solidAlertStatus[color]?.accent || solidAlertStatus['neutral'].accent);
    case 'container':
      if (renderStyle === 'outline') {
        return `bg-transparent border-2 border-[var(--comp-border)]`;
      }
      if (renderStyle === 'ghost') {
        return `bg-transparent border-transparent`;
      }
      if (color === 'neutral') {
        return 'bg-card border border-card-line';
      }
      return `bg-[var(--comp-bg)] border border-[var(--comp-border)]`;
    default:
      return 'bg-card border border-card-line';
  }
}


