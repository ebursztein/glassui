<script lang="ts">
  import DemoSection from './DemoSection.svelte';
  import Playground from './Playground.svelte';
  import { meta } from '$lib/components/data-table/schema';
  import { DataTable, type ColumnDef } from '$lib/components/data-table';
  import { Badge } from '$lib/components/badge';
  import { Button } from '$lib/components/button';

  const demoColumns: ColumnDef[] = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'role', label: 'Role' },
    { key: 'status', label: 'Status', align: 'center' },
    { key: 'actions', label: '', align: 'right' }
  ];

  const demoData = [
    { id: 1, name: 'Alice Smith', role: 'Designer', status: 'active' },
    { id: 2, name: 'Bob Jones', role: 'Developer', status: 'offline' },
    { id: 3, name: 'Charlie Brown', role: 'Manager', status: 'active' },
    { id: 4, name: 'Diana Prince', role: 'Designer', status: 'active' },
    { id: 5, name: 'Evan Wright', role: 'Developer', status: 'offline' },
    { id: 6, name: 'Fiona Gallagher', role: 'Support', status: 'active' },
  ];
</script>

<div class="space-y-16">
  <header>
    <h1 class="text-4xl font-bold tracking-tight text-foreground">{meta.name}</h1>
    <p class="mt-4 text-lg text-muted-foreground">{meta.description}</p>
  </header>

  <Playground {meta}>
    {#snippet preview(props)}
      <div class="w-full max-w-4xl">
        <DataTable columns={demoColumns} data={demoData.slice(0,3)} {...props}>
          {#snippet cell(key, value)}
            {#if key === 'status'}
              <Badge color={value === 'active' ? 'success' : 'neutral'} style="outline">{value}</Badge>
            {:else if key === 'actions'}
              <Button size="xs" color="neutral" style="ghost">Edit</Button>
            {:else}
              {value}
            {/if}
          {/snippet}
        </DataTable>
      </div>
    {/snippet}
  </Playground>

  <DemoSection id="features" title="Sorting, Searching, and Pagination" description="DataTable handles massive amounts of data efficiently. Enable all features at once for a complete data grid experience.">
    <div class="w-full">
      <DataTable 
        columns={demoColumns} 
        data={demoData} 
        sortable 
        searchable 
        pagination 
        pageSize={3}
        color="primary"
      >
        {#snippet cell(key, value)}
          {#if key === 'status'}
            <Badge color={value === 'active' ? 'success' : 'neutral'} style="outline">{value}</Badge>
          {:else if key === 'actions'}
            <Button size="xs" color="neutral" style="ghost">Edit</Button>
          {:else}
            {value}
          {/if}
        {/snippet}
      </DataTable>
    </div>
  </DemoSection>

  <DemoSection id="glass" title="Glass Optic Rendering" description="As a container component, DataTable perfectly inherits the glass rendering engine, applying frosted effects to its backdrop while retaining semantic row interactions.">
    <div class="w-full relative min-h-[400px] flex items-center justify-center p-8 overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 border border-line-2">
      <div class="w-full relative z-10">
        <DataTable 
          columns={demoColumns} 
          data={demoData.slice(0,3)} 
          glass="thick" 
          frosted="heavy" 
          color="gradient"
          colored
        >
          {#snippet cell(key, value)}
            {#if key === 'status'}
              <Badge color={value === 'active' ? 'success' : 'neutral'} glass style="outline">{value}</Badge>
            {:else if key === 'actions'}
              <Button size="xs" glass color="neutral" style="ghost">Edit</Button>
            {:else}
              {value}
            {/if}
          {/snippet}
        </DataTable>
      </div>
    </div>
  </DemoSection>
</div>