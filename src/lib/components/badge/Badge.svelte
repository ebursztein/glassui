<script lang="ts">
  import { cn } from '$lib/utils/cn';
  import { getGlassClasses, type GlassEffect } from '$lib/interactions/glass';
  import type { Snippet } from 'svelte';
  import type { Variant, Size, Status } from '$lib/types/enums';

  interface Props {
    variant?: Variant;
    size?: Size;
    status?: Status;
    dot?: boolean;
    glass?: GlassEffect | boolean;
    children: Snippet;
    class?: string;
    [key: string]: unknown;
  }

  let {
    variant = 'default',
    size = 'sm',
    status,
    dot = false,
    glass = false,
    children,
    class: className,
    ...rest
  }: Props = $props();

  const neutralVariant = !status && (variant === 'default' || variant === 'outline' || variant === 'ghost');
  const allGlassClasses = $derived(getGlassClasses(glass, 'inline', { neutralBg: neutralVariant }));

  const solidVariants: Record<Variant, string> = {
    default: 'bg-surface border-surface-line text-surface-foreground',
    primary: 'bg-primary border-primary-line text-primary-foreground',
    secondary: 'bg-secondary border-secondary-line text-secondary-foreground',
    outline: 'bg-transparent border-line-3 text-foreground',
    ghost: 'bg-transparent border-transparent text-muted-foreground',
    destructive: 'bg-destructive border-transparent text-destructive-foreground',
  };

  const solidStatus: Record<Status, string> = {
    info: 'bg-status-info-highlight border-status-info-border text-status-info-foreground',
    success: 'bg-status-success-highlight border-status-success-border text-status-success-foreground',
    warning: 'bg-status-warning-highlight border-status-warning-border text-status-warning-foreground',
    error: 'bg-status-error-highlight border-status-error-border text-status-error-foreground',
  };

  const sizeClasses: Record<Size, string> = {
    xs: 'px-1.5 py-0.5 text-[10px]',
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-sm',
    xl: 'px-5 py-2 text-base',
  };

  // Glass is additive: keep variant/status color, layer frost on top
  const variantClass = $derived(() => {
    const base = status ? solidStatus[status] : solidVariants[variant];
    if (allGlassClasses) return cn(base, allGlassClasses);
    return base;
  });

  const dotColors: Record<Status, string> = {
    info: 'bg-status-info-foreground',
    success: 'bg-status-success-foreground',
    warning: 'bg-status-warning-foreground',
    error: 'bg-status-error-foreground',
  };

  const classes = $derived(cn(
    'inline-flex items-center gap-1.5 rounded-full border font-medium transition-all duration-200',
    variantClass(),
    sizeClasses[size],
    className,
  ));
</script>

<span class={classes} {...rest}>
  {#if dot}
    <span class={cn('inline-block w-1.5 h-1.5 rounded-full shrink-0', status ? dotColors[status] : 'bg-current')}></span>
  {/if}
  {@render children()}
</span>
