# Badge

Inline label with theme colors or status colors.

## Import

```ts
import { Badge } from 'glassui';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| color | `primary | secondary | accent | destructive | neutral` | `neutral` | Theme color |
| style | `solid | outline | ghost` | `solid` | Render style |
| size | `xs | sm | md | lg | xl` | `sm` | Badge size |
| status | `info | success | warning | error` | — | Status color (overrides color) |
| dot | `boolean` | `false` | Show dot indicator before text |
| glass | `ultra-thin | thin | normal | thick | ultra-thick` | `false` | Glass surface density |
| frosted | `light | medium | heavy` | `false` | Backdrop blur intensity |
| colored | `boolean` | `false` | Colored glass accent orbs behind content |
| raised | `boolean` | `false` | Elevated with shadow |
| glow | `sm | md | lg` | `false` | Glow intensity |

## Examples

### Default

```svelte
<Badge>Label</Badge>
```

### Primary

```svelte
<Badge color="primary">New</Badge>
```

### Status

```svelte
<Badge status="success">Active</Badge>
```

### Glass

```svelte
<Badge glass status="info">Info</Badge>
```

## Full Source

```svelte
<script lang="ts">
  import { cn } from '$lib/utils/cn';
  import { useUI } from '$lib/interactions/useUI.svelte';
  import { GlassBackdrop } from '$lib/components/glass';
  import type { Snippet } from 'svelte';
  import type { GlassDensity, FrostedLevel } from '$lib/interactions/glass';
  import type { GlowIntensity } from '$lib/interactions/glow';
  import type { ThemeColor, RenderStyle, Variant, Size, Status } from '$lib/types/enums';

  interface Props {
    color?: ThemeColor;
    style?: RenderStyle;
    /** @deprecated Use color + style instead. */
    variant?: Variant;
    size?: Size;
    status?: Status;
    dot?: boolean;
    glass?: GlassDensity | boolean;
    frosted?: FrostedLevel | boolean;
    colored?: boolean;
    raised?: boolean;
    glow?: GlowIntensity | boolean;
    children: Snippet;
    class?: string;
    [key: string]: unknown;
  }

  let {
    color,
    style: renderStyle = 'solid',
    variant,
    size = 'sm',
    status,
    dot = false,
    glass = false,
    frosted = false,
    colored = false,
    raised = false,
    glow = false,
    children,
    class: className,
    ...rest
  }: Props = $props();

  const ui = useUI({
    props: () => ({ color, style: renderStyle, variant, size, status, glass, frosted, colored, raised, glow }),
    role: 'inline',
  });

  const sizeClasses: Record<Size, string> = {
    xs: 'px-1.5 py-0.5 text-[10px]',
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-sm',
    xl: 'px-5 py-2 text-base',
  };

  const dotColors: Record<Status, string> = {
    info: 'bg-status-info-foreground',
    success: 'bg-status-success-foreground',
    warning: 'bg-status-warning-foreground',
    error: 'bg-status-error-foreground',
  };

  const classes = $derived(cn(
    'inline-flex items-center gap-1.5 rounded-full border font-medium transition-all duration-200',
    ui.className,
    sizeClasses[ui.size],
    className,
  ));
</script>

{#snippet badgeContent()}
  <span class={cn(classes, colored && 'overflow-hidden')} style={ui.styles} {...rest}>
    {#if ui.showBackdrop}
      <GlassBackdrop />
    {/if}
    {#if dot}
      <span class={cn('relative z-10 inline-block w-1.5 h-1.5 rounded-full shrink-0', status ? dotColors[status] : 'bg-current')}></span>
    {/if}
    <span class="relative z-10">{@render children()}</span>
  </span>
{/snippet}

{#if ui.glowClass}
  <div class="relative inline-block">
    <div class={ui.glowClass}></div>
    {@render badgeContent()}
  </div>
{:else}
  {@render badgeContent()}
{/if}
```