<script lang="ts">
  import { Toggle } from '$lib/components/toggle';
  import { Card, CardContent } from '$lib/components/card';
  import { meta } from '$lib/components/toggle/schema';
  import PropEditor from './PropEditor.svelte';

  let size = $state<string>('md');
  let checked = $state(false);
  let disabled = $state(false);
  let glass = $state(false);

  const values = $derived({ size, checked, disabled, glass });

  function handleChange(key: string, value: any) {
    if (key === 'size') size = value;
    if (key === 'checked') checked = value;
    if (key === 'disabled') disabled = value;
    if (key === 'glass') glass = value;
  }
</script>

<div class="space-y-8">
  <Card bg="gradient">
    {#snippet children()}
      <CardContent class="flex items-center justify-center min-h-[80px]">
        {#snippet children()}
          <Toggle size={size as any} bind:checked {disabled} {glass} label="Toggle me" />
        {/snippet}
      </CardContent>
    {/snippet}
  </Card>

  <Card>
    {#snippet children()}
      <CardContent>
        {#snippet children()}
          <h3 class="text-sm font-semibold text-white mb-4">Props</h3>
          <PropEditor props={meta.props} {values} onchange={handleChange} />
        {/snippet}
      </CardContent>
    {/snippet}
  </Card>

  <Card bg="gradient">
    {#snippet children()}
      <CardContent>
        {#snippet children()}
          <h3 class="text-sm font-semibold text-white mb-4">Solid vs Glass</h3>
          <div class="flex flex-col gap-4">
            <Toggle label="Solid toggle" />
            <Toggle glass label="Glass toggle" />
          </div>
        {/snippet}
      </CardContent>
    {/snippet}
  </Card>

  <Card>
    {#snippet children()}
      <CardContent>
        {#snippet children()}
          <h3 class="text-sm font-semibold text-white mb-4">Sizes</h3>
          <div class="flex flex-col gap-4">
            <Toggle size="xs" label="Extra small" />
            <Toggle size="sm" label="Small" />
            <Toggle size="md" label="Medium" />
            <Toggle size="lg" label="Large" />
            <Toggle size="xl" label="Extra large" />
          </div>
        {/snippet}
      </CardContent>
    {/snippet}
  </Card>

  <Card>
    {#snippet children()}
      <CardContent>
        {#snippet children()}
          <h3 class="text-sm font-semibold text-white mb-4">States</h3>
          <div class="flex flex-col gap-4">
            <Toggle checked={true} label="Checked" />
            <Toggle disabled label="Disabled" />
            <Toggle disabled checked={true} label="Disabled + checked" />
          </div>
        {/snippet}
      </CardContent>
    {/snippet}
  </Card>
</div>
