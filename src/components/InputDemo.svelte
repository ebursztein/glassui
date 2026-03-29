<script lang="ts">
  import { Input } from '$lib/components/input';
  import { Card, CardContent } from '$lib/components/card';
  import { meta } from '$lib/components/input/schema';
  import PropEditor from './PropEditor.svelte';

  let size = $state<string>('md');
  let glass = $state(false);
  let glow = $state(false);
  let disabled = $state(false);

  const values = $derived({ size, glass, glow, disabled });

  function handleChange(key: string, value: any) {
    if (key === 'size') size = value;
    if (key === 'glass') glass = value;
    if (key === 'glow') glow = value;
    if (key === 'disabled') disabled = value;
  }
</script>

<div class="space-y-8">
  <Card bg="gradient">
    {#snippet children()}
      <CardContent>
        {#snippet children()}
          <div class="max-w-md mx-auto">
            <Input label="Email" placeholder="you@example.com" size={size as any} {glass} {glow} {disabled} />
          </div>
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
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
            <Input label="Solid" placeholder="Default input" />
            <Input label="Glass + Glow" placeholder="Frosted input" glass glow />
          </div>
        {/snippet}
      </CardContent>
    {/snippet}
  </Card>

  <Card>
    {#snippet children()}
      <CardContent>
        {#snippet children()}
          <h3 class="text-sm font-semibold text-white mb-4">Status</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
            <Input label="Info" status="info" placeholder="Info state" />
            <Input label="Success" status="success" placeholder="Valid" />
            <Input label="Warning" status="warning" placeholder="Check this" />
            <Input label="Error" status="error" placeholder="Invalid email" />
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
          <div class="space-y-3 max-w-md">
            <Input size="xs" placeholder="XS input" />
            <Input size="sm" placeholder="SM input" />
            <Input size="md" placeholder="MD input" />
            <Input size="lg" placeholder="LG input" />
            <Input size="xl" placeholder="XL input" />
          </div>
        {/snippet}
      </CardContent>
    {/snippet}
  </Card>
</div>
