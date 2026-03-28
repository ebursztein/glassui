# Icon

Wraps Phosphor Icons with validated size and weight. Import specific icons from phosphor-svelte and pass as the icon prop, or use standalone Phosphor components with size/weight props.

## Import

```ts
import { Icon } from 'glassui';\nimport { House, Gear, Heart } from 'phosphor-svelte';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| icon | `Component` | — | Phosphor icon component |
| size | `number | string` | `24` | Icon size in pixels or CSS value |
| weight | `'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone'` | — | Icon weight/thickness |
| color | `string` | — | Icon color |
| mirrored | `boolean` | `false` | Mirror the icon horizontally |

## Examples

### Default

```svelte
<Icon icon={House} />
```

### Thin 16px

```svelte
<Icon icon={Gear} size={16} weight="thin" />
```

### Bold 32px

```svelte
<Icon icon={Heart} size={32} weight="bold" />
```

### Direct phosphor

```svelte
<Heart size={24} weight="fill" color="red" />
```

## Full Source

```svelte
<script lang="ts">
  import type { Component } from 'svelte';
  import type { IconWeight } from './schema';

  interface Props {
    /** Phosphor icon component */
    icon: Component<any>;
    /** Size in pixels or CSS value */
    size?: number | string;
    /** Icon weight/thickness */
    weight?: IconWeight;
    /** Icon color */
    color?: string;
    /** Mirror horizontally */
    mirrored?: boolean;
    /** Additional CSS class */
    class?: string;
    [key: string]: unknown;
  }

  let {
    icon,
    size = 24,
    weight = 'regular',
    color = 'currentColor',
    mirrored = false,
    class: className,
    ...rest
  }: Props = $props();
</script>

<svelte:component
  this={icon}
  {size}
  {weight}
  {color}
  {mirrored}
  class={className}
  {...rest}
/>
```