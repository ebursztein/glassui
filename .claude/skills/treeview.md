# TreeView

A hierarchical list of items, supporting nested folders, icons, and cascading selection.

## Import

```ts
import { TreeView, type TreeItem } from 'glassui';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| items | `TreeItem[]` | — | Hierarchical array of data to render. |
| selected | `string[]` | `[]` | Bound array of selected item IDs. |
| expanded | `string[]` | `[]` | Bound array of expanded folder IDs. |
| selectable | `boolean` | `false` | Whether checkboxes are rendered. |
| autoSelectChildren | `boolean` | `true` | Whether checking a folder automatically checks all its children. |
| color | `primary | secondary | accent | destructive | neutral | gradient | info | success | warning | error` | — | Theme color for checkboxes and active text |
| glass | `ultra-thin | thin | normal | thick | ultra-thick` | `false` | Glass surface density |
| frosted | `light | medium | heavy` | `false` | Backdrop blur intensity |
| raised | `boolean` | `false` | Elevated with shadow |

## Examples

### Basic

```svelte
<TreeView items={[{ id: "1", label: "Folder", children: [{ id: "2", label: "File" }] }]} />
```

## Full Source

```svelte
<script lang="ts">
  import { setContext } from 'svelte';
  import { cn } from '$lib/utils/cn';
  import { useUI } from '$lib/interactions/useUI.svelte';
  import { GlassBackdrop } from '$lib/components/glass';
  import type { TreeItem } from './schema';
  import TreeViewItem from './TreeViewItem.svelte';
  import type { ThemeColor, RenderStyle } from '$lib/types/enums';

  interface Props {
    items: TreeItem[];
    selected?: string[];
    expanded?: string[];
    selectable?: boolean;
    autoSelectChildren?: boolean;
    color?: ThemeColor;
    style?: RenderStyle;
    glass?: boolean | 'ultra-thin' | 'thin' | 'normal' | 'thick' | 'ultra-thick';
    frosted?: boolean | 'light' | 'medium' | 'heavy';
    raised?: boolean;
    colored?: boolean;
    class?: string;
    [key: string]: unknown;
  }

  let {
    items,
    selected = $bindable([]),
    expanded = $bindable([]),
    selectable = false,
    autoSelectChildren = true,
    color = 'primary',
    style = 'solid',
    glass,
    frosted,
    raised = false,
    colored = false,
    class: className,
    ...rest
  }: Props = $props();

  const ui = useUI({
    props: () => ({ color, style, glass, frosted, raised, colored }),
    role: 'container',
  });

  // Utility to gather all descendant IDs recursively
  const getAllIds = (item: TreeItem): string[] => {
    let ids = [item.id];
    if (item.children) {
      for (const child of item.children) {
        ids = ids.concat(getAllIds(child));
      }
    }
    return ids;
  };

  const getDescendantIds = (item: TreeItem): string[] => {
    return item.children ? item.children.flatMap(getAllIds) : [];
  };

  // State machine handlers
  const toggleExpanded = (id: string) => {
    if (expanded.includes(id)) {
      expanded = expanded.filter(v => v !== id);
    } else {
      expanded = [...expanded, id];
    }
  };

  const toggleSelected = (item: TreeItem, forceState?: boolean) => {
    if (!selectable || item.disabled) return;

    const isCurrentlySelected = selected.includes(item.id);
    const nextState = forceState !== undefined ? forceState : !isCurrentlySelected;

    let nextSelected = new Set(selected);

    // If autoSelectChildren, toggle all descendants
    if (autoSelectChildren) {
      const allIds = getAllIds(item);
      for (const targetId of allIds) {
        if (nextState) nextSelected.add(targetId);
        else nextSelected.delete(targetId);
      }
    } else {
      if (nextState) nextSelected.add(item.id);
      else nextSelected.delete(item.id);
    }

    selected = Array.from(nextSelected);

    // After state changes, we must recursively re-evaluate all parent states
    // so indeterminate/checked cascades upward properly.
    if (autoSelectChildren) {
      updateParentStates(items, new Set(selected));
    }
  };

  // Traverses tree and updates selection state bottom-up
  const updateParentStates = (nodes: TreeItem[], currentSelection: Set<string>): Set<string> => {
    let nextSelection = new Set(currentSelection);

    for (const node of nodes) {
      if (node.children && node.children.length > 0) {
        // Recurse first (bottom-up)
        nextSelection = updateParentStates(node.children, nextSelection);

        // Check children states
        const descendantIds = getDescendantIds(node);
        const allSelected = descendantIds.length > 0 && descendantIds.every(id => nextSelection.has(id));

        if (allSelected) {
          nextSelection.add(node.id);
        } else {
          nextSelection.delete(node.id);
        }
      }
    }

    selected = Array.from(nextSelection);
    return nextSelection;
  };

  // Create Context for recursive items
  setContext('glassui-treeview', {
    get expanded() { return expanded; },
    get selected() { return selected; },
    get selectable() { return selectable; },
    get autoSelectChildren() { return autoSelectChildren; },
    toggleExpanded,
    toggleSelected,
    getDescendantIds,
  });

  const classes = $derived(cn(
    'hs-tree-view w-full p-2 text-sm',
    ui.className,
    colored && 'overflow-hidden',
    'rounded-2xl',
    className
  ));
</script>

<div class={classes} style={ui.styles} {...rest} role="tree">
  {#if ui.showBackdrop}
    <GlassBackdrop />
  {/if}
  {#if ui.glowClass}
    <div class={ui.glowClass}></div>
  {/if}
  <div class="relative z-10 flex flex-col w-full">
    <ul role="group">
      {#each items as item (item.id)}
        <TreeViewItem {item} level={1} />
      {/each}
    </ul>
  </div>
</div>
<script lang="ts">
  import { getContext } from 'svelte';
  import { cn } from '$lib/utils/cn';
  import { Icon } from '$lib/components/icon';
  import { Collapse } from '$lib/components/collapse';
  import type { TreeItem } from './schema';

  interface Props {
    item: TreeItem;
    level: number;
    class?: string;
  }

  let { item, level, class: className }: Props = $props();

  const ctx = getContext<{
    expanded: string[];
    selected: string[];
    selectable: boolean;
    autoSelectChildren: boolean;
    toggleExpanded: (id: string) => void;
    toggleSelected: (item: TreeItem, force?: boolean) => void;
    getDescendantIds: (item: TreeItem) => string[];
  }>('glassui-treeview');

  const hasChildren = $derived(item.children && item.children.length > 0);
  const isExpanded = $derived(ctx ? ctx.expanded.includes(item.id) : false);
  const isSelected = $derived(ctx ? ctx.selected.includes(item.id) : false);

  // Indeterminate logic: if autoSelectChildren is on, we check descendants
  const descendantIds = $derived(hasChildren && ctx ? ctx.getDescendantIds(item) : []);
  const selectedDescendantsCount = $derived(ctx ? descendantIds.filter(id => ctx.selected.includes(id)).length : 0);
  const isIndeterminate = $derived(
    ctx?.autoSelectChildren &&
    hasChildren &&
    selectedDescendantsCount > 0 &&
    selectedDescendantsCount < descendantIds.length
  );

  const handleRowClick = (e: MouseEvent) => {
    if (item.disabled) return;
    
    // Toggle expansion if it's a folder
    if (hasChildren) {
      ctx?.toggleExpanded(item.id);
    } else if (ctx?.selectable) {
      // Toggle selection if it's a leaf node
      ctx?.toggleSelected(item);
    }
  };

  const handleCheckboxClick = (e: MouseEvent) => {
    e.stopPropagation();
    if (!item.disabled) {
      ctx?.toggleSelected(item);
    }
  };

  // Dynamic padding based on level depth
  const indentStyles = $derived(`padding-left: ${level * 1}rem`);
</script>

<li class="w-full flex flex-col items-start" role="treeitem" aria-expanded={hasChildren ? isExpanded : undefined}>
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    class={cn(
      'hs-tree-view-item-container flex items-center gap-x-2 py-1.5 px-3 w-full rounded-lg cursor-pointer transition-colors',
      'hover:bg-[var(--comp-hover)] focus:bg-[var(--comp-hover)] outline-none',
      item.disabled && 'opacity-50 pointer-events-none',
      !hasChildren && ctx?.selectable && isSelected && 'bg-[var(--comp-hover)] font-medium text-[var(--comp-text)]',
      className
    )}
    style={indentStyles}
    onclick={handleRowClick}
    tabindex="0"
  >
    <!-- Chevron / Expand Toggle -->
    <div class="w-5 flex justify-center shrink-0">
      {#if hasChildren}
        <button
          type="button"
          class={cn('text-muted-foreground hover:text-[var(--comp-text)] transition-transform duration-200', isExpanded ? 'rotate-90' : '')}
          aria-label="Toggle folder"
          tabindex="-1"
        >
          <Icon name="caret-right" size={16} weight="bold" />
        </button>
      {/if}
    </div>

    <!-- Checkbox (if selectable) -->
    {#if ctx?.selectable}
      <div class="relative flex items-center shrink-0">
        <input
          type="checkbox"
          id={`checkbox-${item.id}`}
          class={cn(
            "peer shrink-0 w-4 h-4 rounded appearance-none border border-[var(--comp-border)] bg-background checked:bg-[var(--comp-bg)] checked:border-[var(--comp-border)] focus:ring-[var(--comp-bg)] transition-all cursor-pointer",
            isIndeterminate && "bg-[var(--comp-bg)] border-[var(--comp-border)]"
          )}
          checked={isSelected}
          disabled={item.disabled}
          onclick={handleCheckboxClick}
        />
        <!-- Custom checkmark/dash overlay for visual correctness against glass/theme background -->
        <span class="absolute inset-0 pointer-events-none flex items-center justify-center text-[var(--comp-text)] opacity-0 peer-checked:opacity-100 transition-opacity">
          {#if isIndeterminate}
            <Icon name="minus" size={12} weight="bold" />
          {:else}
            <Icon name="check" size={12} weight="bold" />
          {/if}
        </span>
        <!-- Hack to force indeterminate visually if CSS classes don't catch it -->
        {#if isIndeterminate && !isSelected}
          <span class="absolute inset-0 pointer-events-none flex items-center justify-center text-[var(--comp-text)]">
             <Icon name="minus" size={12} weight="bold" />
          </span>
        {/if}
      </div>
    {/if}

    <!-- Icon -->
    {#if item.icon}
      <Icon name={item.icon} size={18} class="shrink-0 text-[var(--comp-text)]/70" />
    {:else if hasChildren}
      <Icon name={isExpanded ? 'folder-open' : 'folder'} size={18} weight="fill" class="shrink-0 text-blue-400" />
    {:else}
      <Icon name="file" size={18} weight="regular" class="shrink-0 text-gray-400" />
    {/if}

    <!-- Label -->
    <span class="truncate ml-1">{item.label}</span>
  </div>

  <!-- Children -->
  {#if hasChildren}
    <Collapse open={isExpanded} class="w-full">
      <ul role="group" class="flex flex-col w-full">
        {#each item.children! as child (child.id)}
          <TreeViewItem item={child} level={level + 1} />
        {/each}
      </ul>
    </Collapse>
  {/if}
</li>
```