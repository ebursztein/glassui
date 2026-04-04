<script lang="ts">
  import { cn } from '$lib/utils/cn';
  import { useUI } from '$lib/interactions/useUI.svelte';
  import { GlassBackdrop } from '$lib/components/glass';
  import type { HTMLTextareaAttributes } from 'svelte/elements';
  import type { GlassDensity, FrostedLevel } from '$lib/interactions/glass';
  import type { GlowIntensity } from '$lib/interactions/glow';
  import type { Size, Status } from '$lib/types/enums';

  let textareaCounter = 0;

  interface Props extends HTMLTextareaAttributes {
    size?: Size;
    status?: Status;
    label?: string;
    error?: string;
    helperText?: string;
    glass?: GlassDensity | boolean;
    frosted?: FrostedLevel | boolean;
    raised?: boolean;
    colored?: boolean;
    glow?: GlowIntensity | boolean;
    resize?: 'none' | 'vertical' | 'both';
    class?: string;
  }

  let {
    id,
    size = 'md',
    status,
    label,
    error,
    helperText,
    glass,
    frosted,
    raised = false,
    colored = false,
    glow = false,
    resize = 'vertical',
    rows = 4,
    disabled = false,
    class: className,
    ...rest
  }: Props = $props();

  const effectiveStatus = $derived(error ? 'error' as const : status);

  const textareaId = id || `glass-textarea-${textareaCounter++}`;

  const ui = useUI({
    props: () => ({ size, status: effectiveStatus, glass, frosted, raised, colored, glow, disabled }),
    role: 'field',
  });

  const sizePadding: Record<Size, string> = {
    xs: 'px-2 py-1.5 text-xs rounded-lg',
    sm: 'px-3 py-2 text-xs rounded-lg',
    md: 'px-4 py-3 text-sm rounded-xl',
    lg: 'px-5 py-3.5 text-base rounded-xl',
    xl: 'px-6 py-4 text-lg rounded-2xl',
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
    ui.className,
    sizePadding[ui.size],
    resizeClasses[resize],
    className,
  ));
</script>

<div class="w-full" style={ui.styles}>
  {#if label}
    <label for={textareaId} class="block text-sm font-medium mb-2 text-[var(--comp-text)]">{label}</label>
  {/if}
  <div class="relative group {colored ? 'overflow-hidden rounded-xl' : ''}">
    {#if ui.showBackdrop}
      <GlassBackdrop />
    {/if}
    {#if ui.glowClass}
      <div class={ui.glowClass}></div>
    {/if}
    <textarea id={textareaId} class={textareaClasses} {rows} disabled={ui.disabled} aria-describedby={error || helperText ? `${textareaId}-hint` : undefined} aria-invalid={error ? true : undefined} {...rest}></textarea>
  </div>
  {#if error}
    <p id="{textareaId}-hint" class="mt-1.5 text-xs text-status-error-foreground">{error}</p>
  {:else if helperText}
    <p id="{textareaId}-hint" class="mt-1.5 text-xs text-[var(--comp-text)]/60">{helperText}</p>
  {/if}
</div>
