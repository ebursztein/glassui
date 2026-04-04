<script lang="ts">
  import { cn } from '$lib/utils/cn';
  import { useUI } from '$lib/interactions/useUI.svelte';
  import type { Snippet } from 'svelte';
  import type { GlassDensity, FrostedLevel } from '$lib/interactions/glass';
  import type { GlowIntensity } from '$lib/interactions/glow';

  interface Props {
    glass?: GlassDensity | boolean;
    frosted?: FrostedLevel | boolean;
    colored?: boolean;
    raised?: boolean;
    glow?: GlowIntensity | boolean;
    class?: string;
    children: Snippet;
    [key: string]: unknown;
  }

  let {
    glass = false,
    frosted = false,
    colored = false,
    raised = false,
    glow = false,
    class: className,
    children,
    ...rest
  }: Props = $props();

  const ui = useUI({
    props: () => ({ glass, frosted, colored, raised, glow }),
    role: 'container',
  });

  // Sidebar uses sidebar semantic tokens for solid mode, not generic container
  const sidebarSolid = 'bg-sidebar';
</script>

<aside
  class={cn(
    'hidden md:flex w-60 flex-col fixed inset-y-0 start-0 z-40',
    'border-r border-sidebar-line',
    ui.glass ? ui.className : sidebarSolid,
    className,
  )}
  style={ui.styles}
  role="navigation"
  aria-label="Sidebar"
  {...rest}
>
  <nav class="flex flex-col h-full overflow-y-auto p-3">
    {@render children()}
  </nav>
</aside>
