<script lang="ts">
  import { cn } from '$lib/utils/cn';
  import type { Snippet } from 'svelte';
  import type { Variant, Size, Status } from '$lib/types/enums';

  interface Props {
    variant?: Variant;
    size?: Size;
    status?: Status;
    glass?: boolean;
    children: Snippet;
    class?: string;
    [key: string]: unknown;
  }

  let {
    variant = 'default',
    size = 'sm',
    status,
    glass: isGlass = false,
    children,
    class: className,
    ...rest
  }: Props = $props();

  const solidVariants: Record<Variant, string> = {
    default: 'bg-neutral-700 border-neutral-600 text-white',
    primary: 'bg-[var(--glass-accent-2)] border-[var(--glass-accent-2)] text-white',
    outline: 'bg-transparent border-neutral-600 text-neutral-300',
    ghost: 'bg-transparent border-transparent text-neutral-400',
    destructive: 'bg-red-600 border-red-500 text-white',
  };

  const glassVariants: Record<Variant, string> = {
    default: 'bg-white/15 border-white/25 text-white backdrop-blur-xl',
    primary: 'bg-gradient-to-r from-cyan-500/30 to-blue-500/30 border-cyan-400/30 text-cyan-100 backdrop-blur-xl',
    outline: 'bg-transparent border-white/30 text-white/80 backdrop-blur-xl',
    ghost: 'bg-transparent border-transparent text-white/60',
    destructive: 'bg-red-500/20 border-red-400/30 text-red-100 backdrop-blur-xl',
  };

  const solidStatus: Record<Status, string> = {
    info: 'bg-cyan-600 border-cyan-500 text-white',
    success: 'bg-emerald-600 border-emerald-500 text-white',
    warning: 'bg-amber-600 border-amber-500 text-white',
    error: 'bg-red-600 border-red-500 text-white',
  };

  const glassStatus: Record<Status, string> = {
    info: 'bg-cyan-500/20 border-cyan-400/30 text-cyan-100 backdrop-blur-xl',
    success: 'bg-emerald-500/20 border-emerald-400/30 text-emerald-100 backdrop-blur-xl',
    warning: 'bg-amber-500/20 border-amber-400/30 text-amber-100 backdrop-blur-xl',
    error: 'bg-red-500/20 border-red-400/30 text-red-100 backdrop-blur-xl',
  };

  const sizeClasses: Record<Size, string> = {
    xs: 'px-1.5 py-0.5 text-[10px]',
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-sm',
    xl: 'px-5 py-2 text-base',
  };

  const variantClass = $derived(() => {
    if (status) return isGlass ? glassStatus[status] : solidStatus[status];
    return isGlass ? glassVariants[variant] : solidVariants[variant];
  });

  const classes = $derived(cn(
    'inline-flex items-center rounded-full border font-medium transition-all duration-300',
    variantClass(),
    sizeClasses[size],
    className,
  ));
</script>

<span class={classes} {...rest}>
  {@render children()}
</span>
