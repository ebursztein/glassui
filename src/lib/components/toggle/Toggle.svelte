<script lang="ts">
  import { cn } from '$lib/utils/cn';
  import { focus } from '$lib/interactions/tokens';
  import { getGlassClass, getGlassBgClass, type GlassEffect } from '$lib/interactions/glass';
  import { getGlowClass, type GlowIntensity } from '$lib/interactions/glow';
  import { GlassBackdrop } from '$lib/components/glass';
  import type { Size } from '$lib/types/enums';

  interface Props {
    size?: Size;
    checked?: boolean;
    disabled?: boolean;
    label?: string;
    glass?: GlassEffect | boolean;
    glassbg?: boolean;
    glow?: GlowIntensity | boolean;
    class?: string;
    onchange?: (checked: boolean) => void;
    [key: string]: unknown;
  }

  let {
    size = 'md',
    checked = $bindable(false),
    disabled = false,
    label,
    glass = false,
    glassbg = false,
    glow = false,
    class: className,
    onchange,
    ...rest
  }: Props = $props();

  const sizeConfig: Record<string, { track: string; thumb: string; translate: string }> = {
    xs: { track: 'h-4 w-7', thumb: 'h-3 w-3', translate: 'translate-x-3' },
    sm: { track: 'h-5 w-9', thumb: 'h-4 w-4', translate: 'translate-x-4' },
    md: { track: 'h-6 w-11', thumb: 'h-5 w-5', translate: 'translate-x-5' },
    lg: { track: 'h-7 w-[52px]', thumb: 'h-6 w-6', translate: 'translate-x-6' },
    xl: { track: 'h-8 w-[60px]', thumb: 'h-7 w-7', translate: 'translate-x-7' },
  };

  const config = $derived(sizeConfig[size] || sizeConfig.md);

  const glassClass = $derived(getGlassClass(glass));
  const glassBgClass = $derived(getGlassBgClass(glass));
  const glowClass = $derived(getGlowClass(glow));

  const solidUnchecked = 'bg-surface border-surface-line';
  const solidChecked = 'bg-gradient-to-r from-[var(--glass-accent-1)] to-[var(--glass-accent-2)] border-[var(--glass-accent-2)]';

  const trackClasses = $derived(cn(
    'relative inline-flex items-center rounded-full border cursor-pointer transition-all duration-300',
    'disabled:cursor-not-allowed disabled:opacity-50',
    focus.ring,
    config.track,
    checked
      ? cn(solidChecked, glassClass)
      : cn(glassClass ? cn(glassClass, glassBgClass) : solidUnchecked),
    className,
  ));

  const thumbClasses = $derived(cn(
    'relative z-10 block rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.3)] transition-transform duration-300',
    config.thumb,
    checked ? config.translate : 'translate-x-0.5',
  ));

  function toggle() {
    if (disabled) return;
    checked = !checked;
    onchange?.(checked);
  }
</script>

<div class="relative inline-flex items-center gap-3 {glassbg ? 'glass-bg rounded-full' : ''}">
  {#if glassbg}
    <GlassBackdrop />
  {/if}
  {#if glowClass}
    <div class={glowClass}></div>
  {/if}
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    {disabled}
    class={trackClasses}
    onclick={toggle}
    onkeydown={(e) => { if (e.key === 'Enter') toggle(); }}
    {...rest}
  >
    <span class={thumbClasses}></span>
  </button>
  {#if label}
    <span class="text-sm text-foreground">{label}</span>
  {/if}
</div>
