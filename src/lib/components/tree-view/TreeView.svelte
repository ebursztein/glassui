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