# LayoutSplitter

A draggable resizer handle that splits a container into two adjustable panels.

## Import

```ts
import { LayoutSplitter } from 'glassui';
```

## Examples

### Basic

```svelte
<LayoutSplitter><div slot="panel1">Left</div><div slot="panel2">Right</div></LayoutSplitter>
```

## Full Source

```svelte
<script lang="ts">
  import { cn } from '$lib/utils/cn';
  import { useUI } from '$lib/interactions/useUI.svelte';
  import type { Snippet } from 'svelte';
  import type { ThemeColor, RenderStyle } from '$lib/types/enums';
  import type { GlassDensity, FrostedLevel } from '$lib/interactions/glass';

  interface Props {
    orientation?: 'horizontal' | 'vertical';
    initialSize?: number;
    minSize?: number;
    maxSize?: number;
    color?: ThemeColor;
    style?: RenderStyle;
    glass?: GlassDensity | boolean;
    frosted?: FrostedLevel | boolean;
    class?: string;
    panel1: Snippet;
    panel2: Snippet;
    [key: string]: unknown;
  }

  let {
    orientation = 'horizontal',
    initialSize = 50,
    minSize = 10,
    maxSize = 90,
    color = 'primary',
    style = 'solid',
    glass,
    frosted,
    class: className,
    panel1,
    panel2,
    ...rest
  }: Props = $props();

  let containerRef: HTMLDivElement;
  let isDragging = $state(false);
  let size = $state(initialSize); // percentage (0-100)

  const ui = useUI({
    props: () => ({ color, style, glass, frosted }),
    role: 'action',
  });

  const handlePointerDown = (e: PointerEvent) => {
    isDragging = true;
    e.preventDefault(); // prevent text selection while dragging
  };

  const handlePointerMove = (e: PointerEvent) => {
    if (!isDragging || !containerRef) return;
    
    const rect = containerRef.getBoundingClientRect();
    let newSize = 0;

    if (orientation === 'horizontal') {
      const offsetX = e.clientX - rect.left;
      newSize = (offsetX / rect.width) * 100;
    } else {
      const offsetY = e.clientY - rect.top;
      newSize = (offsetY / rect.height) * 100;
    }

    size = Math.max(minSize, Math.min(maxSize, newSize));
  };

  const handlePointerUp = () => {
    isDragging = false;
  };
</script>

<svelte:window 
  onpointermove={handlePointerMove} 
  onpointerup={handlePointerUp} 
/>

<div
  bind:this={containerRef}
  class={cn(
    'flex w-full h-full relative overflow-hidden rounded-2xl border border-[var(--comp-border)] bg-surface',
    orientation === 'horizontal' ? 'flex-row' : 'flex-col',
    className
  )}
  {...rest}
>
  <!-- Panel 1 -->
  <div 
    class="flex-shrink-0 h-full overflow-auto relative z-0" 
    style="{orientation === 'horizontal' ? `width: ${size}%` : `height: ${size}%`}"
  >
    {@render panel1()}
  </div>

  <!-- Resizer Handle -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    class={cn(
      'relative z-10 shrink-0 flex items-center justify-center transition-colors group',
      orientation === 'horizontal' 
        ? 'w-1.5 cursor-col-resize hover:w-2' 
        : 'h-1.5 cursor-row-resize hover:h-2',
      isDragging ? 'bg-[var(--comp-bg)]/40 w-2 h-2' : 'bg-border hover:bg-[var(--comp-bg)]/20',
      ui.className
    )}
    style={ui.styles}
    onpointerdown={handlePointerDown}
  >
    <div 
      class={cn(
        "absolute bg-[var(--comp-bg)] rounded-full transition-opacity duration-200",
        isDragging ? "opacity-100" : "opacity-0 group-hover:opacity-100",
        orientation === 'horizontal' ? "w-1 h-8" : "h-1 w-8"
      )}
    ></div>
  </div>

  <!-- Panel 2 -->
  <div class="flex-1 h-full overflow-auto relative z-0 min-w-0 min-h-0">
    {@render panel2()}
  </div>
</div>
```