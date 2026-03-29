<script lang="ts">
  import { cn } from '$lib/utils/cn';
  import type { HTMLTextareaAttributes } from 'svelte/elements';
  import type { Size, Status } from '$lib/types/enums';

  interface Props extends HTMLTextareaAttributes {
    size?: Size;
    status?: Status;
    label?: string;
    glass?: boolean;
    glow?: boolean;
    resize?: 'none' | 'vertical' | 'both';
    class?: string;
  }

  let {
    size = 'md',
    status,
    label,
    glass: isGlass = false,
    glow = false,
    resize = 'vertical',
    rows = 4,
    disabled = false,
    class: className,
    ...rest
  }: Props = $props();

  const sizePadding: Record<Size, string> = {
    xs: 'px-2 py-1.5 text-xs rounded-lg',
    sm: 'px-3 py-2 text-xs rounded-lg',
    md: 'px-4 py-3 text-sm rounded-xl',
    lg: 'px-5 py-3.5 text-base rounded-xl',
    xl: 'px-6 py-4 text-lg rounded-2xl',
  };

  const solidClasses = cn(
    'bg-neutral-900 border border-neutral-700 text-white',
    'placeholder:text-neutral-500',
    'focus:border-[var(--glass-accent-2)] focus:ring-2 focus:ring-[var(--glass-accent-2)]/20',
  );

  const glassClasses = cn(
    'bg-white/10 backdrop-blur-xl border border-white/20 text-white',
    'placeholder:text-white/40',
    'focus:border-white/40 focus:bg-white/15',
  );

  const statusBorders: Record<Status, string> = {
    info: 'border-cyan-500 focus:border-cyan-400 focus:ring-cyan-400/20',
    success: 'border-emerald-500 focus:border-emerald-400 focus:ring-emerald-400/20',
    warning: 'border-amber-500 focus:border-amber-400 focus:ring-amber-400/20',
    error: 'border-red-500 focus:border-red-400 focus:ring-red-400/20',
  };

  const resizeClasses: Record<string, string> = {
    none: 'resize-none',
    vertical: 'resize-y',
    both: 'resize',
  };

  const textareaClasses = $derived(cn(
    'relative flex w-full transition-all duration-300',
    'focus:outline-none',
    'disabled:cursor-not-allowed disabled:opacity-50',
    isGlass ? glassClasses : solidClasses,
    status ? statusBorders[status] : '',
    sizePadding[size],
    resizeClasses[resize],
    className,
  ));
</script>

<div class="w-full">
  {#if label}
    <label class="block text-sm font-medium text-white/80 mb-2">{label}</label>
  {/if}
  <div class="relative group">
    {#if glow}
      <div class="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-cyan-500/0 via-blue-500/0 to-purple-500/0 blur-md opacity-0 transition-all duration-300 group-focus-within:from-cyan-500/30 group-focus-within:via-blue-500/30 group-focus-within:to-purple-500/30 group-focus-within:opacity-70"></div>
    {/if}
    <textarea class={textareaClasses} {rows} {disabled} {...rest}></textarea>
  </div>
</div>
