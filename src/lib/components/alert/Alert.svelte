<script lang="ts">
  import { cn } from '$lib/utils/cn';
  import { blurLevels } from '$lib/interactions/tokens';
  import { Icon } from '$lib/components/icon';
  import type { Snippet } from 'svelte';
  import type { Status } from '$lib/types/enums';

  interface Props {
    status?: Status;
    title?: string;
    dismissible?: boolean;
    icon?: boolean;
    glass?: boolean;
    glow?: boolean;
    children?: Snippet;
    class?: string;
    [key: string]: unknown;
  }

  let {
    status = 'info',
    title,
    dismissible = false,
    icon: showIcon = true,
    glass: isGlass = false,
    glow = false,
    children,
    class: className,
    ...rest
  }: Props = $props();

  let dismissed = $state(false);

  const iconNames: Record<Status, string> = {
    info: 'info',
    success: 'check-circle',
    warning: 'warning',
    error: 'x-circle',
  };

  const solidConfig: Record<Status, { bg: string; border: string; iconBg: string; iconColor: string }> = {
    info: { bg: 'bg-cyan-950', border: 'border-cyan-800', iconBg: 'bg-cyan-900', iconColor: 'text-cyan-400' },
    success: { bg: 'bg-emerald-950', border: 'border-emerald-800', iconBg: 'bg-emerald-900', iconColor: 'text-emerald-400' },
    warning: { bg: 'bg-amber-950', border: 'border-amber-800', iconBg: 'bg-amber-900', iconColor: 'text-amber-400' },
    error: { bg: 'bg-red-950', border: 'border-red-800', iconBg: 'bg-red-900', iconColor: 'text-red-400' },
  };

  const glassConfig: Record<Status, { bg: string; border: string; iconBg: string; iconColor: string }> = {
    info: { bg: 'bg-cyan-500/10 backdrop-blur-xl', border: 'border-cyan-400/30', iconBg: 'bg-cyan-500/20', iconColor: 'text-cyan-400' },
    success: { bg: 'bg-emerald-500/10 backdrop-blur-xl', border: 'border-emerald-400/30', iconBg: 'bg-emerald-500/20', iconColor: 'text-emerald-400' },
    warning: { bg: 'bg-amber-500/10 backdrop-blur-xl', border: 'border-amber-400/30', iconBg: 'bg-amber-500/20', iconColor: 'text-amber-400' },
    error: { bg: 'bg-red-500/10 backdrop-blur-xl', border: 'border-red-400/30', iconBg: 'bg-red-500/20', iconColor: 'text-red-400' },
  };

  const config = $derived(isGlass ? glassConfig[status] : solidConfig[status]);

  const classes = $derived(cn(
    'relative rounded-xl border p-4 transition-all duration-300',
    config.bg,
    config.border,
    className,
  ));
</script>

{#if !dismissed}
  <div class="relative">
    {#if glow}
      <div class="absolute -inset-1.5 rounded-xl bg-gradient-to-r from-[var(--glass-glow-1)] via-[var(--glass-glow-2)] to-[var(--glass-glow-3)] blur-xl opacity-40"></div>
    {/if}
    <div class={classes} role="alert" {...rest}>
      <div class="relative z-10 flex items-start gap-3">
        {#if showIcon}
          <div class={cn('flex items-center justify-center w-8 h-8 rounded-lg shrink-0 border border-white/10', config.iconBg)}>
            <Icon name={iconNames[status]} size={20} weight="bold" class={config.iconColor} />
          </div>
        {/if}
        <div class="flex-1 min-w-0">
          {#if title}
            <h4 class="font-medium text-white">{title}</h4>
          {/if}
          {#if children}
            <div class={cn('text-sm text-white/60', title ? 'mt-1' : '')}>
              {@render children()}
            </div>
          {/if}
        </div>
        {#if dismissible}
          <button
            onclick={() => dismissed = true}
            class="shrink-0 p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Dismiss"
          >
            <Icon name="x" size={16} />
          </button>
        {/if}
      </div>
    </div>
  </div>
{/if}
