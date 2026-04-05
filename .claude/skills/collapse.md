# Collapse

A low-level wrapper that vertically slides its content open and closed. Not visually styled by default.

## Import

```ts
import { Collapse } from 'glassui';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| open | `boolean` | `false` | Whether the content is visible and expanded |
| id | `string` | — | ID for the collapsible region (used for aria-controls) |

## Examples

### Basic

```svelte
<Collapse open={true}>Content</Collapse>
```

## Full Source

```svelte
<script lang="ts">
  import { slide } from 'svelte/transition';
  import { cn } from '$lib/utils/cn';
  import type { Snippet } from 'svelte';

  let collapseCounter = 0;

  interface Props {
    open?: boolean;
    id?: string;
    class?: string;
    children: Snippet;
    [key: string]: unknown;
  }

  let {
    open = $bindable(false),
    id,
    class: className,
    children,
    ...rest
  }: Props = $props();

  const collapseId = id || `glass-collapse-${collapseCounter++}`;
</script>

{#if open}
  <div
    id={collapseId}
    class={cn('w-full overflow-hidden', className)}
    transition:slide={{ duration: 300 }}
    {...rest}
  >
    {@render children()}
  </div>
{/if}
```