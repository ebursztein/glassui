# Button

Button component with glass surface, 5 variants, 5 sizes, and optional glow effect. Hover, focus, and motion are handled internally by the design system.

## Import

```ts
import { Button } from 'glassui';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | `default | primary | outline | ghost | destructive` | `default` | Visual style variant |
| size | `xs | sm | md | lg | xl` | `md` | Button size |
| glowEffect | `boolean` | `false` | Show gradient glow effect behind button |
| disabled | `boolean` | `false` | Disabled state |

## Examples

### Default

```svelte
<Button>Click me</Button>
```

### Primary with glow

```svelte
<Button variant="primary" glowEffect>Save</Button>
```

### Outline

```svelte
<Button variant="outline">Cancel</Button>
```

### Ghost

```svelte
<Button variant="ghost">More info</Button>
```

### Destructive

```svelte
<Button variant="destructive">Delete</Button>
```

### Small

```svelte
<Button size="sm">Small</Button>
```

### Large

```svelte
<Button size="lg">Large</Button>
```

### With icon

```svelte
<Button variant="primary"><Icon icon={FloppyDisk} size={16} weight="bold" /> Save</Button>
```

## Full Source

```svelte
<script lang="ts">
  import { cn } from '$lib/utils/cn';
  import { hover, focus, glass, gradients } from '$lib/interactions/tokens';
  import type { Snippet } from 'svelte';
  import type { HTMLButtonAttributes } from 'svelte/elements';
  import type { Variant, Size } from '$lib/types/enums';

  interface Props extends HTMLButtonAttributes {
    variant?: Variant;
    size?: Size;
    glowEffect?: boolean;
    children: Snippet;
    class?: string;
  }

  let {
    variant = 'default',
    size = 'md',
    glowEffect = false,
    disabled = false,
    children,
    class: className,
    ...rest
  }: Props = $props();

  const variantClasses: Record<Variant, string> = {
    default: cn(
      'bg-white/20 backdrop-blur-xl border border-white/30 text-[var(--glass-text)]',
      'shadow-[0_4px_16px_rgba(0,0,0,0.2)]',
      'hover:bg-white/30 hover:border-white/40',
      'before:absolute before:inset-0 before:rounded-xl',
      'before:bg-gradient-to-b before:from-white/20 before:to-transparent before:pointer-events-none',
    ),
    primary: cn(
      'bg-gradient-to-r from-[var(--glass-accent-1)] via-[var(--glass-accent-2)] to-[var(--glass-accent-3)]',
      'backdrop-blur-xl border border-white/30 text-white',
      'shadow-[0_4px_20px_rgba(59,130,246,0.4)]',
      'hover:shadow-[0_4px_30px_rgba(59,130,246,0.6)]',
      'before:absolute before:inset-0 before:rounded-xl',
      'before:bg-gradient-to-b before:from-white/30 before:to-transparent before:pointer-events-none',
    ),
    outline: cn(
      'bg-transparent backdrop-blur-sm border-2 border-white/40 text-[var(--glass-text)]',
      'hover:bg-white/10 hover:border-white/60',
    ),
    ghost: cn(
      'bg-transparent text-[var(--glass-text-muted)]',
      'hover:bg-white/10 hover:text-[var(--glass-text)]',
    ),
    destructive: cn(
      'bg-[var(--glass-error)]/30 backdrop-blur-xl border border-red-400/40 text-red-100',
      'shadow-[0_4px_16px_rgba(239,68,68,0.3)]',
      'hover:bg-red-500/40 hover:border-red-400/60',
      'before:absolute before:inset-0 before:rounded-xl',
      'before:bg-gradient-to-b before:from-white/10 before:to-transparent before:pointer-events-none',
    ),
  };

  const sizeClasses: Record<Size, string> = {
    xs: 'h-7 px-2 text-xs rounded-lg',
    sm: 'h-8 px-3 text-xs rounded-lg',
    md: 'h-10 px-4 py-2 text-sm rounded-xl',
    lg: 'h-12 px-6 text-base rounded-xl',
    xl: 'h-14 px-8 text-lg rounded-2xl',
  };

  const baseClasses = cn(
    'relative inline-flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer',
    'font-medium transition-all duration-300 ease-out',
    'disabled:pointer-events-none disabled:opacity-50',
    'hover:scale-[1.03] active:scale-[0.97]',
    focus.ring,
    '[&_svg]:pointer-events-none [&_svg]:shrink-0',
  );

  const classes = $derived(cn(baseClasses, variantClasses[variant], sizeClasses[size], className));
</script>

<div class="relative inline-block">
  {#if glowEffect}
    <div
      class="absolute -inset-1 rounded-xl bg-gradient-to-r from-[var(--glass-glow-1)] via-[var(--glass-glow-2)] to-[var(--glass-glow-3)] blur-lg opacity-70 transition-opacity hover:opacity-100"
    ></div>
  {/if}
  <button class={classes} {disabled} {...rest}>
    <span class="relative z-10 flex items-center gap-2">
      {@render children()}
    </span>
  </button>
</div>
```