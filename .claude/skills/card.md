# Card

Container with optional glass surface, glow, and hover effects. Compose with CardHeader, CardTitle, CardDescription, CardContent, CardFooter.

## Import

```ts
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from 'glassui';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| glass | `subtle | frosted | heavy` | `false` | Glass translucency level |
| glassbg | `boolean` | `false` | Themed gradient backdrop |
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
  import { setContext } from 'svelte';
  import { getGlassClasses, resolveGlass, GLASS_CONTEXT_KEY, type GlassEffect } from '$lib/interactions/glass';
  import { getGlowClass, type GlowIntensity } from '$lib/interactions/glow';
  import { GlassBackdrop } from '$lib/components/glass';
  import type { Snippet } from 'svelte';
  import type { HoverEffect } from '$lib/interactions/schema';

  interface Props {
    glass?: GlassEffect | boolean;
    glassbg?: boolean;
    glow?: GlowIntensity | boolean;
    hover?: HoverEffect;
    children: Snippet;
    class?: string;
    [key: string]: unknown;
  }

  let {
    glass = false,
    glassbg = false,
    glow = false,
    hover: hoverEffect = 'none',
    children,
    class: className,
    ...rest
  }: Props = $props();

  const glassEffect = $derived(resolveGlass(glass));
  try { setContext(GLASS_CONTEXT_KEY, () => glassEffect); } catch {}
  const allGlassClasses = $derived(getGlassClasses(glass, 'container'));
  const glowClass = $derived(getGlowClass(glow));

  const solidClasses = 'bg-card border border-card-line';

  const classes = $derived(cn(
    'relative rounded-2xl transition-all duration-300 overflow-hidden',
    allGlassClasses || solidClasses,
    hoverTokens[hoverEffect],
    className,
  ));
</script>

{#if glowClass}
<div class="relative">
  <div class={glowClass}></div>
  <div class={classes} {...rest}>
    {#if glassbg}
      <GlassBackdrop />
    {/if}
    <div class="relative z-10">
      {@render children()}
    </div>
  </div>
</div>
{:else}
<div class={classes} {...rest}>
  {#if glassbg}
    <GlassBackdrop />
  {/if}
  <div class="relative z-10">
    {@render children()}
  </div>
</div>
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
  import type { Snippet } from 'svelte';

  interface Props {
    children: Snippet;
    class?: string;
    [key: string]: unknown;
  }

  let { children, class: className, ...rest }: Props = $props();
</script>

<p class={cn('text-sm text-muted-foreground', className)} {...rest}>
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
  import type { Snippet } from 'svelte';

  interface Props {
    children: Snippet;
    class?: string;
    [key: string]: unknown;
  }

  let { children, class: className, ...rest }: Props = $props();
</script>

<h3 class={cn('text-xl font-semibold text-foreground leading-none tracking-tight', className)} {...rest}>
  {@render children()}
</h3>
```