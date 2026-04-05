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

  let rowEl: HTMLDivElement;

  const focusTreeItem = (el: Element | null) => {
    if (el instanceof HTMLElement) el.focus();
  };

  const handleKeydown = (e: KeyboardEvent) => {
    const tree = rowEl?.closest('[role="tree"]');
    if (!tree) return;
    const allItems = Array.from(tree.querySelectorAll('[role="treeitem"] > .hs-tree-view-item-container'));
    const idx = allItems.indexOf(rowEl);

    let handled = true;
    switch (e.key) {
      case 'ArrowDown':
        focusTreeItem(allItems[idx + 1] ?? null);
        break;
      case 'ArrowUp':
        focusTreeItem(allItems[idx - 1] ?? null);
        break;
      case 'ArrowRight':
        if (hasChildren && !isExpanded) ctx?.toggleExpanded(item.id);
        else if (hasChildren && isExpanded) {
          // Focus first child
          const childContainer = rowEl?.closest('[role="treeitem"]')?.querySelector('[role="group"] [role="treeitem"] > .hs-tree-view-item-container');
          focusTreeItem(childContainer ?? null);
        }
        break;
      case 'ArrowLeft':
        if (hasChildren && isExpanded) ctx?.toggleExpanded(item.id);
        else {
          // Focus parent item
          const parentGroup = rowEl?.closest('[role="treeitem"]')?.parentElement?.closest('[role="treeitem"]');
          focusTreeItem(parentGroup?.querySelector(':scope > .hs-tree-view-item-container') ?? null);
        }
        break;
      case 'Home':
        focusTreeItem(allItems[0] ?? null);
        break;
      case 'End':
        focusTreeItem(allItems[allItems.length - 1] ?? null);
        break;
      case 'Enter':
      case ' ':
        handleRowClick(e as unknown as MouseEvent);
        break;
      default:
        handled = false;
    }
    if (handled) e.preventDefault();
  };
</script>

<li class="w-full flex flex-col items-start" role="treeitem" aria-expanded={hasChildren ? isExpanded : undefined} aria-level={level}>
  <div
    bind:this={rowEl}
    class={cn(
      'hs-tree-view-item-container flex items-center gap-x-2 py-1.5 px-3 w-full rounded-lg cursor-pointer transition-colors',
      'hover:bg-[var(--comp-hover)] focus:bg-[var(--comp-hover)] outline-none',
      item.disabled && 'opacity-50 pointer-events-none',
      !hasChildren && ctx?.selectable && isSelected && 'bg-[var(--comp-hover)] font-medium text-[var(--comp-text)]',
      className
    )}
    style={indentStyles}
    onclick={handleRowClick}
    onkeydown={handleKeydown}
    tabindex="0"
    role="none"
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