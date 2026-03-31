# Alert

Status-based alert with icon, title, body, and optional dismiss. Glass and glow support.

## Import

```ts
import { Alert } from 'glassui';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| status | `info | success | warning | error` | `info` | Alert status |
| title | `string` | — | Alert title |
| dismissible | `boolean` | `false` | Show dismiss button |
| icon | `boolean` | `true` | Show status icon |
| glass | `subtle | frosted | heavy` | `false` | Glass translucency level |
| glassbg | `boolean` | `false` | Themed gradient backdrop |
| glow | `sm | md | lg` | `false` | Glow intensity |

## Examples

### Info

```svelte
<Alert status="info" title="Note">Something to know.</Alert>
```

### Success

```svelte
<Alert status="success" title="Saved">Changes saved.</Alert>
```

### Warning

```svelte
<Alert status="warning" title="Careful">This is destructive.</Alert>
```

### Error

```svelte
<Alert status="error" title="Failed">Something went wrong.</Alert>
```

### Glass

```svelte
<Alert status="info" glass title="Glass Alert">Frosted.</Alert>
```

### Dismissible

```svelte
<Alert status="success" dismissible title="Done">Click X to close.</Alert>
```

## Full Source

```svelte
<script lang="ts">
  import { cn } from '$lib/utils/cn';
  import { getGlassClasses, type GlassEffect } from '$lib/interactions/glass';
  import { getGlowClass, type GlowIntensity } from '$lib/interactions/glow';
  import { GlassBackdrop } from '$lib/components/glass';
  import { Icon } from '$lib/components/icon';
  import { slide } from 'svelte/transition';
  import type { Snippet } from 'svelte';
  import type { Status } from '$lib/types/enums';

  interface Props {
    status?: Status;
    title?: string;
    dismissible?: boolean;
    icon?: boolean;
    glass?: GlassEffect | boolean;
    glassbg?: boolean;
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
    glassbg = false,
    glow = false,
    children,
    class: className,
    ...rest
  }: Props = $props();

  let dismissed = $state(false);

  const allGlassClasses = $derived(getGlassClasses(glass, 'inline'));
  const glowClass = $derived(getGlowClass(glow));

  const iconNames: Record<Status, string> = {
    info: 'info',
    success: 'check-circle',
    warning: 'warning',
    error: 'x-circle',
  };

  interface StatusConfig { bg: string; accent: string; iconColor: string; titleColor: string; bodyColor: string }

  const solidConfig: Record<Status, StatusConfig> = {
    info: { bg: 'bg-status-info', accent: 'border-l-status-info-foreground', iconColor: 'text-status-info-foreground', titleColor: 'text-status-info-foreground', bodyColor: 'text-foreground/80' },
    success: { bg: 'bg-status-success', accent: 'border-l-status-success-foreground', iconColor: 'text-status-success-foreground', titleColor: 'text-status-success-foreground', bodyColor: 'text-foreground/80' },
    warning: { bg: 'bg-status-warning', accent: 'border-l-status-warning-foreground', iconColor: 'text-status-warning-foreground', titleColor: 'text-status-warning-foreground', bodyColor: 'text-foreground/80' },
    error: { bg: 'bg-status-error', accent: 'border-l-status-error-foreground', iconColor: 'text-status-error-foreground', titleColor: 'text-status-error-foreground', bodyColor: 'text-foreground/80' },
  };

  const glassAccentConfig: Record<Status, { accent: string; iconColor: string; titleColor: string; bodyColor: string }> = {
    info: { accent: 'border-l-cyan-400', iconColor: 'text-cyan-400', titleColor: 'text-status-info-foreground', bodyColor: 'text-[var(--glass-text-muted)]' },
    success: { accent: 'border-l-emerald-400', iconColor: 'text-emerald-400', titleColor: 'text-status-success-foreground', bodyColor: 'text-[var(--glass-text-muted)]' },
    warning: { accent: 'border-l-amber-400', iconColor: 'text-amber-400', titleColor: 'text-status-warning-foreground', bodyColor: 'text-[var(--glass-text-muted)]' },
    error: { accent: 'border-l-red-400', iconColor: 'text-red-400', titleColor: 'text-status-error-foreground', bodyColor: 'text-[var(--glass-text-muted)]' },
  };

  const config = $derived(allGlassClasses ? {
    bg: allGlassClasses,
    ...glassAccentConfig[status],
  } : solidConfig[status]);

  const classes = $derived(cn(
    'relative rounded-lg border-l-4 p-4 transition-all duration-300',
    config.bg,
    config.accent,
    className,
  ));
</script>

{#if !dismissed}
  <div class="relative {glassbg ? 'glass-bg rounded-lg' : ''}" transition:slide={{ duration: 200 }}>
    {#if glassbg}
      <GlassBackdrop />
    {/if}
    {#if glowClass}
      <div class={glowClass}></div>
    {/if}
    <div class={classes} role="alert" aria-live="assertive" {...rest}>
      <div class="relative z-10 flex items-start gap-3">
        {#if showIcon}
          <Icon name={iconNames[status]} size={20} weight="bold" class={cn('shrink-0 mt-0.5', config.iconColor)} />
        {/if}
        <div class="flex-1 min-w-0">
          {#if title}
            <h3 class={cn('text-sm font-semibold', config.titleColor)}>{title}</h3>
          {/if}
          {#if children}
            <div class={cn('text-sm', config.bodyColor, title ? 'mt-1' : '')}>
              {@render children()}
            </div>
          {/if}
        </div>
        {#if dismissible}
          <button
            onclick={() => dismissed = true}
            class="shrink-0 p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-layer-hover transition-colors"
            aria-label="Dismiss"
          >
            <Icon name="x" size={16} />
          </button>
        {/if}
      </div>
    </div>
  </div>
{/if}
```