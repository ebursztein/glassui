# Alert

Color-based alert with icon, title, body, and optional dismiss. Glass and glow support.

## Import

```ts
import { Alert } from 'glassui';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| color | `ThemeColor` | `info` | Alert color |
| title | `string` | — | Alert title |
| dismissible | `boolean` | `false` | Show dismiss button |
| icon | `boolean` | `true` | Show status icon |
| glass | `ultra-thin | thin | normal | thick | ultra-thick` | `false` | Glass surface density |
| frosted | `light | medium | heavy` | `false` | Backdrop blur intensity |
| raised | `boolean` | `false` | Elevated with shadow |
| colored | `boolean` | `false` | Colored glass accent orbs behind content |
| glow | `sm | md | lg` | `false` | Glow intensity |

## Examples

### Info

```svelte
<Alert color="info" title="Note">Something to know.</Alert>
```

### Success

```svelte
<Alert color="success" title="Saved">Changes saved.</Alert>
```

### Warning

```svelte
<Alert color="warning" title="Careful">This is destructive.</Alert>
```

### Error

```svelte
<Alert color="error" title="Failed">Something went wrong.</Alert>
```

### Glass

```svelte
<Alert color="info" glass title="Glass Alert">Frosted.</Alert>
```

### Dismissible

```svelte
<Alert color="success" dismissible title="Done">Click X to close.</Alert>
```

## Full Source

```svelte
<script lang="ts">
  import { cn } from '$lib/utils/cn';
  import { useUI } from '$lib/interactions/useUI.svelte';
  import { GlassBackdrop } from '$lib/components/glass';
  import { Icon } from '$lib/components/icon';
  import { slide } from 'svelte/transition';
  import type { Snippet } from 'svelte';
  import type { GlassDensity, FrostedLevel } from '$lib/interactions/glass';
  import type { GlowIntensity } from '$lib/interactions/glow';
  import type { ThemeColor } from '$lib/types/enums';

  interface Props {
    color?: ThemeColor;
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
    color = 'info',
    title,
    dismissible = false,
    icon: showIcon = true,
    glass,
    frosted,
    colored = false,
    raised = false,
    glow = false,
    children,
    class: className,
    ...rest
  }: Props = $props();

  let dismissed = $state(false);

  const ui = useUI({
    props: () => ({ color, glass, frosted, colored, raised, glow }),
    role: 'alert',
  });

  const iconNames: Record<string, string> = {
    info: 'info',
    success: 'check-circle',
    warning: 'warning',
    error: 'x-circle',
  };

  const currentIcon = $derived(iconNames[color as string] || 'info');

  const classes = $derived(cn(
    'relative rounded-lg p-4 transition-all duration-300',
    ui.className,
    className,
  ));
</script>

{#snippet alertContent()}
  <div class={classes} style={ui.styles} role="alert" aria-live="assertive" {...rest}>
    <div class="relative z-10 flex items-start gap-3">
      {#if showIcon}
        <Icon name={currentIcon} size={20} weight="bold" class="shrink-0 mt-0.5 text-[var(--comp-accent)]" />
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
```