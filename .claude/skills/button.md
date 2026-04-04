# Button

Button with theme colors, render styles, and composable visual effects.

## Import

```ts
import { Button } from 'glassui';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| color | `primary | secondary | accent | destructive | neutral` | `primary` | Theme color |
| style | `solid | outline | ghost` | `solid` | Render style |
| size | `xs | sm | md | lg | xl` | `md` | Button size |
| glass | `ultra-thin | thin | normal | thick | ultra-thick` | `false` | Glass surface density |
| frosted | `light | medium | heavy` | `false` | Backdrop blur intensity |
| colored | `boolean` | `false` | Colored glass accent orbs behind content |
| raised | `boolean` | `false` | Elevated with shadow |
| reactive | `boolean` | `false` | Cursor-tracking proximity glow (requires glass) |
| glow | `sm | md | lg` | `false` | Glow intensity |
| loading | `boolean` | `false` | Loading state with spinner |
| disabled | `boolean` | `false` | Disabled state |

## Examples

### Primary

```svelte
<Button>Save</Button>
```

### Secondary

```svelte
<Button color="secondary">Details</Button>
```

### Outline

```svelte
<Button style="outline">Cancel</Button>
```

### Ghost

```svelte
<Button style="ghost">More info</Button>
```

### Destructive

```svelte
<Button color="destructive">Delete</Button>
```

### Glass

```svelte
<Button glass glow>Glass</Button>
```

## Full Source

```svelte
<script lang="ts">
  import { cn } from '$lib/utils/cn';
  import { focus } from '$lib/interactions/tokens';
  import { useUI } from '$lib/interactions/useUI.svelte';
  import { proximityGlow } from '$lib/interactions/proximity-glow';
  import { GlassBackdrop } from '$lib/components/glass';
  import type { Snippet } from 'svelte';
  import type { HTMLButtonAttributes } from 'svelte/elements';
  import type { GlassDensity, FrostedLevel } from '$lib/interactions/glass';
  import type { GlowIntensity } from '$lib/interactions/glow';
  import type { ThemeColor, RenderStyle, Variant, Size } from '$lib/types/enums';

  interface Props extends HTMLButtonAttributes {
    color?: ThemeColor;
    style?: RenderStyle;
    /** @deprecated Use color + style instead. */
    variant?: Variant;
    size?: Size;
    glass?: GlassDensity | boolean;
    frosted?: FrostedLevel | boolean;
    colored?: boolean;
    raised?: boolean;
    reactive?: boolean;
    glow?: GlowIntensity | boolean;
    loading?: boolean;
    children: Snippet;
    class?: string;
  }

  let {
    color,
    style: renderStyle = 'solid',
    variant,
    size = 'md',
    glass = false,
    frosted = false,
    colored = false,
    raised = false,
    reactive = false,
    glow = false,
    loading = false,
    disabled = false,
    children,
    class: className,
    ...rest
  }: Props = $props();

  const ui = useUI({
    props: () => ({ color, style: renderStyle, variant, size, glass, frosted, colored, raised, reactive, glow, disabled }),
    role: 'action',
  });

  const isDisabled = $derived(ui.disabled || loading);

  const sizeClasses: Record<Size, string> = {
    xs: 'h-7 px-2 text-xs rounded-md',
    sm: 'h-8 px-3 text-xs rounded-md',
    md: 'h-10 px-4 py-2 text-sm rounded-lg',
    lg: 'h-12 px-6 text-base rounded-lg',
    xl: 'h-14 px-8 text-lg rounded-lg',
  };

  const baseClasses = cn(
    'relative inline-flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer',
    'font-medium transition-all duration-200 ease-out',
    'disabled:pointer-events-none disabled:opacity-50',
    focus.ring,
    '[&_svg]:pointer-events-none [&_svg]:shrink-0',
  );

  const classes = $derived(cn(
    baseClasses,
    ui.className,
    ui.reactive && 'glass-reactive glass-reactive-border',
    sizeClasses[ui.size],
    className,
  ));
</script>

{#snippet buttonInner()}
  {#if ui.showBackdrop}
    <GlassBackdrop />
  {/if}
  <span class="relative z-10 flex items-center gap-2">
    {#if loading}
      <svg class="animate-spin h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    {/if}
    {@render children()}
  </span>
{/snippet}

{#snippet buttonContent()}
  {#if ui.reactive}
    <button class={cn(classes, colored && 'overflow-hidden')} style={ui.styles} disabled={isDisabled} aria-busy={loading} use:proximityGlow {...rest}>
      {@render buttonInner()}
    </button>
  {:else}
    <button class={cn(classes, colored && 'overflow-hidden')} style={ui.styles} disabled={isDisabled} aria-busy={loading} {...rest}>
      {@render buttonInner()}
    </button>
  {/if}
{/snippet}

{#if ui.glowClass}
  <div class="relative inline-block">
    <div class={ui.glowClass}></div>
    {@render buttonContent()}
  </div>
{:else}
  {@render buttonContent()}
{/if}
```