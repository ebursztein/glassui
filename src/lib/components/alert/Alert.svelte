<script lang="ts">
  import { cn } from '$lib/utils/cn';
  import { useUI } from '$lib/interactions/useUI.svelte';
  import { GlassBackdrop } from '$lib/components/glass';
  import { Icon } from '$lib/components/icon';
  import { slide } from 'svelte/transition';
  import type { Snippet } from 'svelte';
  import type { GlassDensity, FrostedLevel } from '$lib/interactions/glass';
  import type { GlowIntensity } from '$lib/interactions/glow';
  import type { Status } from '$lib/types/enums';

  interface Props {
    status?: Status;
    title?: string;
    dismissible?: boolean;
    icon?: boolean;
    glass?: GlassDensity | boolean;
    frosted?: FrostedLevel | boolean;
    colored?: boolean;
    raised?: boolean;
    glow?: GlowIntensity | boolean;
    children?: Snippet;
    class?: string;
    [key: string]: unknown;
  }

  let {
    status = 'info',
    title,
    dismissible = false,
    icon: showIcon = true,
    glass = false,
    frosted = false,
    colored = false,
    raised = false,
    glow = false,
    children,
    class: className,
    ...rest
  }: Props = $props();

  let dismissed = $state(false);

  const ui = useUI({
    props: () => ({ status, glass, frosted, colored, raised, glow }),
    role: 'container',
  });

  const iconNames: Record<Status, string> = {
    info: 'info',
    success: 'check-circle',
    warning: 'warning',
    error: 'x-circle',
  };

  const classes = $derived(cn(
    'relative rounded-lg border-l-4 p-4 transition-all duration-300',
    'border-l-[var(--comp-accent)]',
    ui.className,
    className,
  ));
</script>

{#snippet alertContent()}
  <div class={classes} style={ui.styles} role="alert" aria-live="assertive" {...rest}>
    <div class="relative z-10 flex items-start gap-3">
      {#if showIcon}
        <Icon name={iconNames[status]} size={20} weight="bold" class="shrink-0 mt-0.5 text-[var(--comp-accent)]" />
      {/if}
      <div class="flex-1 min-w-0">
        {#if title}
          <h3 class="text-sm font-semibold text-[var(--comp-accent)]">{title}</h3>
        {/if}
        {#if children}
          <div class={cn('text-sm text-[var(--comp-text)]/80', title ? 'mt-1' : '')}>
            {@render children()}
          </div>
        {/if}
      </div>
      {#if dismissible}
        <button
          onclick={() => dismissed = true}
          class="shrink-0 p-1.5 rounded-lg transition-colors text-[var(--comp-text)]/60 hover:text-[var(--comp-text)]"
          aria-label="Dismiss"
        >
          <Icon name="x" size={16} />
        </button>
      {/if}
    </div>
  </div>
{/snippet}

{#if !dismissed}
  <div class="relative {colored ? 'overflow-hidden rounded-lg' : ''}" transition:slide={{ duration: 200 }}>
    {#if ui.showBackdrop}
      <GlassBackdrop />
    {/if}
    {#if ui.glowClass}
      <div class={ui.glowClass}></div>
    {/if}
    {@render alertContent()}
  </div>
{/if}
