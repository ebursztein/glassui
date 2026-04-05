<script lang="ts">
  import { cn } from '$lib/utils/cn';
  import { useUI } from '$lib/interactions/useUI.svelte';
  import { GlassBackdrop } from '$lib/components/glass';
  import { Icon } from '$lib/components/icon';
  import { Input } from '$lib/components/input';
  import { Button } from '$lib/components/button';
  import type { Snippet } from 'svelte';
  import type { GlassDensity, FrostedLevel } from '$lib/interactions/glass';
  import type { ThemeColor, RenderStyle } from '$lib/types/enums';
  import type { ColumnDef } from './types';

  interface Props {
    data: Record<string, any>[];
    columns: ColumnDef[];
    sortable?: boolean;
    searchable?: boolean;
    pagination?: boolean;
    pageSize?: number;
    color?: ThemeColor;
    style?: RenderStyle;
    glass?: GlassDensity | boolean;
    frosted?: FrostedLevel | boolean;
    raised?: boolean;
    colored?: boolean;
    class?: string;
    cell?: Snippet<[string, any, Record<string, any>]>; // [columnKey, cellValue, rowData]
    [key: string]: unknown;
  }

  let {
    data = [],
    columns = [],
    sortable = false,
    searchable = false,
    pagination = false,
    pageSize = 10,
    color,
    style,
    glass,
    frosted,
    raised = true,
    colored = false,
    class: className,
    cell: customCell,
    ...rest
  }: Props = $props();

  const ui = useUI({
    props: () => ({ color, style, glass, frosted, raised, colored }),
    role: 'container',
  });

  // State
  let searchQuery = $state('');
  let sortKey = $state<string | null>(null);
  let sortDirection = $state<'asc' | 'desc'>('asc');
  let currentPage = $state(1);

  // 1. Filter
  const filteredData = $derived(
    searchQuery
      ? data.filter(row => 
          Object.values(row).some(val => 
            String(val).toLowerCase().includes(searchQuery.toLowerCase())
          )
        )
      : data
  );

  // 2. Sort
  const sortedData = $derived(() => {
    if (!sortKey) return filteredData;
    
    return [...filteredData].sort((a, b) => {
      const aVal = a[sortKey!];
      const bVal = b[sortKey!];
      
      if (aVal === bVal) return 0;
      
      const comparison = aVal > bVal ? 1 : -1;
      return sortDirection === 'asc' ? comparison : -comparison;
    });
  });

  // 3. Paginate
  const totalPages = $derived(Math.ceil(sortedData().length / pageSize) || 1);
  
  $effect(() => {
    // Reset to page 1 if data shrinks below current page
    if (currentPage > totalPages) currentPage = totalPages;
  });

  const paginatedData = $derived(() => {
    if (!pagination) return sortedData();
    const start = (currentPage - 1) * pageSize;
    return sortedData().slice(start, start + pageSize);
  });

  // Handlers
  const handleSort = (key: string, isSortable?: boolean) => {
    if (!sortable && !isSortable) return;
    
    if (sortKey === key) {
      if (sortDirection === 'asc') {
        sortDirection = 'desc';
      } else {
        sortKey = null;
        sortDirection = 'asc';
      }
    } else {
      sortKey = key;
      sortDirection = 'asc';
    }
  };

  const containerClasses = $derived(cn(
    'flex flex-col w-full rounded-2xl border border-[var(--comp-border)]',
    ui.className,
    colored && 'overflow-hidden',
    className
  ));

  const getAlignClass = (align?: 'left' | 'center' | 'right') => {
    if (align === 'center') return 'text-center';
    if (align === 'right') return 'text-right';
    return 'text-left';
  };
</script>

<div class={containerClasses} style={ui.styles} {...rest}>
  {#if ui.showBackdrop}
    <GlassBackdrop />
  {/if}
  {#if ui.glowClass}
    <div class={ui.glowClass}></div>
  {/if}
  
  <div class="relative z-10 w-full flex flex-col">
    <!-- Header / Toolbar -->
    {#if searchable}
      <div class="p-4 border-b border-[var(--comp-border)] flex justify-between items-center gap-4">
        <div class="w-full max-w-sm relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
            <Icon name="magnifying-glass" size={16} />
          </div>
          <Input 
            bind:value={searchQuery} 
            placeholder="Search..." 
            class="pl-10" 
            size="sm" 
            glass={ui.glass !== false}
          />
        </div>
      </div>
    {/if}

    <!-- Table Wrapper (Scrollable) -->
    <div class="w-full overflow-x-auto">
      <table class="w-full text-sm text-left">
        <thead class="text-xs uppercase text-[var(--comp-text)]/70 bg-[var(--comp-bg)]/5 border-b border-[var(--comp-border)]">
          <tr>
            {#each columns as col}
              <th 
                scope="col" 
                class={cn("px-6 py-3 font-semibold tracking-wider whitespace-nowrap", getAlignClass(col.align))}
              >
                {#if sortable || col.sortable}
                  <button 
                    class="group inline-flex items-center gap-1.5 focus:outline-none hover:text-[var(--comp-text)] transition-colors"
                    onclick={() => handleSort(col.key, col.sortable)}
                  >
                    {col.label}
                    <span class={cn("flex flex-col -space-y-1 text-muted-foreground/50 transition-colors", sortKey === col.key && "text-[var(--comp-text)]")}>
                      <Icon name="caret-up" size={10} weight="bold" class={sortKey === col.key && sortDirection === 'asc' ? 'text-primary' : ''} />
                      <Icon name="caret-down" size={10} weight="bold" class={sortKey === col.key && sortDirection === 'desc' ? 'text-primary' : ''} />
                    </span>
                  </button>
                {:else}
                  {col.label}
                {/if}
              </th>
            {/each}
          </tr>
        </thead>
        <tbody class="divide-y divide-[var(--comp-border)] text-[var(--comp-text)]">
          {#each paginatedData() as row, i (i)}
            <tr class="hover:bg-[var(--comp-hover)]/5 transition-colors">
              {#each columns as col}
                <td class={cn("px-6 py-4 whitespace-nowrap", getAlignClass(col.align))}>
                  {#if customCell}
                    {@render customCell(col.key, row[col.key], row)}
                  {:else}
                    {row[col.key]}
                  {/if}
                </td>
              {/each}
            </tr>
          {:else}
            <tr>
              <td colspan={columns.length} class="px-6 py-8 text-center text-muted-foreground">
                No data found.
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>

    <!-- Pagination Footer -->
    {#if pagination && totalPages > 1}
      <div class="p-4 border-t border-[var(--comp-border)] flex items-center justify-between">
        <span class="text-sm text-[var(--comp-text)]/70">
          Showing <span class="font-semibold text-[var(--comp-text)]">{(currentPage - 1) * pageSize + 1}</span> to <span class="font-semibold text-[var(--comp-text)]">{Math.min(currentPage * pageSize, sortedData().length)}</span> of <span class="font-semibold text-[var(--comp-text)]">{sortedData().length}</span> results
        </span>
        <div class="flex items-center gap-2">
          <Button 
            size="sm" 
            style="outline" 
            color="neutral" 
            disabled={currentPage === 1}
            onclick={() => currentPage--}
          >
            Previous
          </Button>
          <div class="flex items-center gap-1">
            {#each Array(totalPages) as _, i}
              {#if Math.abs(currentPage - (i + 1)) <= 1 || i === 0 || i === totalPages - 1}
                <Button 
                  size="sm" 
                  style={currentPage === i + 1 ? 'solid' : 'ghost'} 
                  color={currentPage === i + 1 ? ui.color : 'neutral'}
                  class="w-8 h-8 p-0 flex items-center justify-center"
                  onclick={() => currentPage = i + 1}
                >
                  {i + 1}
                </Button>
              {:else if Math.abs(currentPage - (i + 1)) === 2}
                <span class="px-1 text-muted-foreground">...</span>
              {/if}
            {/each}
          </div>
          <Button 
            size="sm" 
            style="outline" 
            color="neutral" 
            disabled={currentPage === totalPages}
            onclick={() => currentPage++}
          >
            Next
          </Button>
        </div>
      </div>
    {/if}
  </div>
</div>