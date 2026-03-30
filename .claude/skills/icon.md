# Icon

Renders icons by name. Uses Phosphor icons by default -- pass any icon name like "house", "gear", "heart". Supports all Iconify icon sets via prefix (e.g. "mdi:home").

## Import

```ts
import { Icon } from 'glassui';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| name | `string` | — | Icon name: "house", "arrow-right", or full iconify name "mdi:home" |
| size | `number | string` | `24` | Icon size in pixels |
| weight | `'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone'` | — | Phosphor weight variant (ph: icons only) |
| color | `string` | — | Icon color (CSS value). Defaults to currentColor. |

## Examples

### Default

```svelte
<Icon name="house" />
```

### Bold 32px

```svelte
<Icon name="heart" size={32} weight="bold" />
```

### Colored

```svelte
<Icon name="heart" weight="fill" color="red" />
```

### Other icon set

```svelte
<Icon name="mdi:home" size={24} />
```

## Full Source

```svelte
<script lang="ts">
  import IconifyIcon from '@iconify/svelte';

  interface Props {
    /** Icon name: "house", "arrow-right", or full iconify name "mdi:home" */
    name: string;
    /** Size in pixels */
    size?: number | string;
    /** Phosphor weight (only for ph: icons) */
    weight?: 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone';
    /** Icon color (CSS color value) */
    color?: string;
    /** Additional CSS class */
    class?: string;
    [key: string]: unknown;
  }

  let {
    name,
    size = 24,
    weight = 'regular',
    color,
    class: className,
    ...rest
  }: Props = $props();

  // Resolve full iconify icon name
  // "house" -> "ph:house"
  // "house" + weight="bold" -> "ph:house-bold"
  // "mdi:home" -> "mdi:home" (pass through, weight ignored)
  const icon = $derived(
    name.includes(':')
      ? name
      : `ph:${name}${weight !== 'regular' ? `-${weight}` : ''}`
  );
</script>

<IconifyIcon
  {icon}
  width={size}
  height={size}
  style={color ? `color: ${color}` : undefined}
  class={className}
  {...rest}
/>
```