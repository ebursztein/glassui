# Card

Container with optional glass surface, glow, and hover effects. Compose with CardHeader, CardTitle, CardDescription, CardContent, CardFooter.

## Import

```ts
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from 'glassui';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| color | `primary | secondary | accent | destructive | neutral | theme` | `neutral` | Theme color tint for glass surface |
| glass | `ultra-thin | thin | normal | thick | ultra-thick` | `false` | Glass surface density |
| frosted | `light | medium | heavy` | `false` | Backdrop blur intensity |
| raised | `boolean` | `false` | Elevated with shadow |
| colored | `boolean` | `false` | Colored glass accent orbs behind content |
| reactive | `boolean` | `false` | Cursor-tracking proximity glow (requires glass) |
| glow | `sm | md | lg` | `false` | Glow intensity |
| hover | `lift | brighten | glow | none` | `none` | Hover interaction |

## Examples

### Solid

```svelte
<Card><CardContent>Content</CardContent></Card>
```

### Glass

```svelte
<Card glass><CardContent>Frosted</CardContent></Card>
```

### Glass + glow

```svelte
<Card glass glow><CardContent>Glowing</CardContent></Card>
```

### Reactive

```svelte
<Card glass reactive><CardContent>Hover to see glow</CardContent></Card>
```

### With header

```svelte
<Card><CardHeader><CardTitle>Title</CardTitle><CardDescription>Description</CardDescription></CardHeader><CardContent>Body</CardContent></Card>
```

### Hoverable

```svelte
<Card hover="lift"><CardContent>Lifts on hover</CardContent></Card>
```

## Full Source

```svelte
<script lang="ts">
  import { cn } from '$lib/utils/cn';
  import { hover as hoverTokens } from '$lib/interactions/tokens';
  import { useUI } from '$lib/interactions/useUI.svelte';
  import { proximityGlow } from '$lib/interactions/proximity-glow';
  import { GlassBackdrop } from '$lib/components/glass';
  import type { Snippet } from 'svelte';
  import type { HoverEffect } from '$lib/interactions/schema';
  import type { GlassDensity, FrostedLevel } from '$lib/interactions/glass';
  import type { GlowIntensity } from '$lib/interactions/glow';
  import type { ThemeColor } from '$lib/types/enums';
  import type { TintLevel } from '$lib/interactions/styles';

  interface Props {
    color?: ThemeColor;
    tint?: TintLevel;
    glass?: GlassDensity | boolean;
    frosted?: FrostedLevel | boolean;
    colored?: boolean;
    raised?: boolean;
    reactive?: boolean;
    glow?: GlowIntensity | boolean;
    hover?: HoverEffect;
    children: Snippet;
    class?: string;
    [key: string]: unknown;
  }

  let {
    color,
    tint,
    glass = false,
    frosted = false,
    colored = false,
    raised = false,
    reactive = false,
    glow = false,
    hover: hoverEffect = 'none',
    children,
    class: className,
    ...rest
  }: Props = $props();

  const ui = useUI({
    props: () => ({ color, tint, glass, frosted, colored, raised, reactive, glow }),
    role: 'container',
  });

  const classes = $derived(cn(
    'relative rounded-2xl transition-all duration-300',
    !ui.reactive && 'overflow-hidden',
    ui.className,
    ui.reactive && 'glass-reactive glass-reactive-border',
    hoverTokens[hoverEffect],
    className,
  ));
</script>

{#snippet cardInner()}
  {#if ui.showBackdrop}
    <GlassBackdrop />
  {/if}
  <div class="relative z-10">
    {@render children()}
  </div>
{/snippet}

{#snippet cardContent()}
  {#if ui.reactive}
    <div class={classes} style={ui.styles} use:proximityGlow {...rest}>
      {@render cardInner()}
    </div>
  {:else}
    <div class={classes} style={ui.styles} {...rest}>
      {@render cardInner()}
    </div>
  {/if}
{/snippet}

{#if ui.glowClass}
  <div class="relative">
    <div class={ui.glowClass}></div>
    {@render cardContent()}
  </div>
{:else}
  {@render cardContent()}
{/if}

<script lang="ts">
  import { cn } from '$lib/utils/cn';
  import type { Snippet } from 'svelte';

  interface Props {
    children: Snippet;
    class?: string;
    [key: string]: unknown;
  }

  let { children, class: className, ...rest }: Props = $props();
</script>

<div class={cn('p-6 pt-0', className)} {...rest}>
  {@render children()}
</div>

<script lang="ts">
  import { cn } from '$lib/utils/cn';
  import { getParentUI } from '$lib/interactions/useUI.svelte';
  import type { Snippet } from 'svelte';

  interface Props {
    children: Snippet;
    class?: string;
    [key: string]: unknown;
  }

  let { children, class: className, ...rest }: Props = $props();

  const parentCtx = getParentUI();
  const insideGlass = $derived(parentCtx().active);
</script>

<p class={cn('text-sm', insideGlass ? 'text-[var(--glass-text-muted)]' : 'text-muted-foreground', className)} {...rest}>
  {@render children()}
</p>

<script lang="ts">
  import { cn } from '$lib/utils/cn';
  import type { Snippet } from 'svelte';

  interface Props {
    children: Snippet;
    class?: string;
    [key: string]: unknown;
  }

  let { children, class: className, ...rest }: Props = $props();
</script>

<div class={cn('flex items-center p-6 pt-0', className)} {...rest}>
  {@render children()}
</div>

<script lang="ts">
  import { cn } from '$lib/utils/cn';
  import type { Snippet } from 'svelte';

  interface Props {
    children: Snippet;
    class?: string;
    [key: string]: unknown;
  }

  let { children, class: className, ...rest }: Props = $props();
</script>

<div class={cn('flex flex-col gap-1.5 p-6', className)} {...rest}>
  {@render children()}
</div>

<script lang="ts">
  import { cn } from '$lib/utils/cn';
  import { getParentUI } from '$lib/interactions/useUI.svelte';
  import type { Snippet } from 'svelte';

  interface Props {
    children: Snippet;
    class?: string;
    [key: string]: unknown;
  }

  let { children, class: className, ...rest }: Props = $props();

  const parentCtx = getParentUI();
  const insideGlass = $derived(parentCtx().active);
</script>

<h3 class={cn('text-xl font-semibold leading-none tracking-tight', !insideGlass && 'text-foreground', className)} {...rest}>
  {@render children()}
</h3>
```