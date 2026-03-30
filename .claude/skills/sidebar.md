# Sidebar

Navigation sidebar with sections, items, header, and footer. Preline-inspired with active state indicators and glass support.

## Import

```ts
import { Sidebar, SidebarHeader, SidebarSection, SidebarItem, SidebarFooter } from 'glassui';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| glass | `boolean` | `false` | Enable glass surface on sidebar |

## Examples

### Basic

```svelte
<Sidebar><SidebarSection label="Nav"><SidebarItem href="/home">Home</SidebarItem></SidebarSection></Sidebar>
```

### With icon

```svelte
<SidebarItem href="/settings" icon="gear">Settings</SidebarItem>
```

### Active item

```svelte
<SidebarItem href="/current" active>Current Page</SidebarItem>
```

## Full Source

```svelte
<script lang="ts">
  import { cn } from '$lib/utils/cn';
  import type { Snippet } from 'svelte';

  interface Props {
    glass?: boolean;
    class?: string;
    children: Snippet;
    [key: string]: unknown;
  }

  let {
    glass: isGlass = false,
    class: className,
    children,
    ...rest
  }: Props = $props();
</script>

<aside
  class={cn(
    'hidden md:flex w-60 flex-col fixed inset-y-0 start-0 z-40',
    'border-r border-sidebar-line',
    isGlass
      ? 'bg-white/5 backdrop-blur-xl'
      : 'bg-sidebar',
    className,
  )}
  role="navigation"
  aria-label="Sidebar"
  {...rest}
>
  <nav class="flex flex-col h-full overflow-y-auto p-3">
    {@render children()}
  </nav>
</aside>

<script lang="ts">
  import { cn } from '$lib/utils/cn';
  import type { Snippet } from 'svelte';

  interface Props {
    class?: string;
    children: Snippet;
    [key: string]: unknown;
  }

  let {
    class: className,
    children,
    ...rest
  }: Props = $props();
</script>

<div class={cn('mt-auto p-3 flex flex-col gap-y-3', className)} {...rest}>
  {@render children()}
</div>

<script lang="ts">
  import { cn } from '$lib/utils/cn';
  import type { Snippet } from 'svelte';

  interface Props {
    href?: string;
    class?: string;
    children: Snippet;
    [key: string]: unknown;
  }

  let {
    href = '/',
    class: className,
    children,
    ...rest
  }: Props = $props();
</script>

<div class={cn('mb-3 px-2.5', className)} {...rest}>
  <a href={href} class="text-base font-semibold text-foreground flex items-center gap-2">
    {@render children()}
  </a>
</div>

<script lang="ts">
  import { cn } from '$lib/utils/cn';
  import { Icon } from '$lib/components/icon';
  import type { Snippet } from 'svelte';

  interface Props {
    href: string;
    active?: boolean;
    icon?: string;
    class?: string;
    children: Snippet;
    [key: string]: unknown;
  }

  let {
    href,
    active = false,
    icon,
    class: className,
    children,
    ...rest
  }: Props = $props();
</script>

<li>
  <a
    {href}
    class={cn(
      'w-full flex items-center gap-x-2 py-2 px-2.5 text-sm rounded-lg transition-colors',
      'focus:outline-hidden focus:bg-sidebar-nav-focus',
      active
        ? 'bg-sidebar-nav-active text-foreground font-medium'
        : 'text-sidebar-nav-foreground hover:bg-sidebar-nav-hover',
      className,
    )}
    aria-current={active ? 'page' : undefined}
    {...rest}
  >
    {#if icon}
      <Icon name={icon} size={16} class="shrink-0" />
    {/if}
    {@render children()}
  </a>
</li>

<script lang="ts">
  import { cn } from '$lib/utils/cn';
  import type { Snippet } from 'svelte';

  interface Props {
    label?: string;
    class?: string;
    children: Snippet;
    [key: string]: unknown;
  }

  let {
    label,
    class: className,
    children,
    ...rest
  }: Props = $props();
</script>

<div class={cn('pt-3 mt-3 flex flex-col border-t border-sidebar-divider first:border-t-0 first:pt-0 first:mt-0', className)} {...rest}>
  {#if label}
    <span class="block ps-2.5 mb-2 font-medium text-xs uppercase text-muted-foreground-1">
      {label}
    </span>
  {/if}
  <ul class="flex flex-col gap-y-1">
    {@render children()}
  </ul>
</div>
```