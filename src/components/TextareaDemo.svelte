<script lang="ts">
  import { Textarea } from '$lib/components/textarea';
  import { Card, CardContent } from '$lib/components/card';
  import { meta } from '$lib/components/textarea/schema';
  import PropEditor from './PropEditor.svelte';

  let size = $state<string>('md');
  let glass = $state(false);
  let glow = $state(false);
  let resize = $state<string>('vertical');
  let disabled = $state(false);

  const values = $derived({ size, glass, glow, resize, disabled });

  function handleChange(key: string, value: any) {
    if (key === 'size') size = value;
    if (key === 'glass') glass = value;
    if (key === 'glow') glow = value;
    if (key === 'resize') resize = value;
    if (key === 'disabled') disabled = value;
  }
</script>

<div class="space-y-8">
  <Card bg="gradient">
    {#snippet children()}
      <CardContent>
        {#snippet children()}
          <div class="max-w-md mx-auto">
            <Textarea label="Message" placeholder="Write something..." size={size as any} {glass} {glow} resize={resize as any} {disabled} />
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
            <Textarea label="Solid" placeholder="Default textarea" />
            <Textarea label="Glass + Glow" placeholder="Frosted textarea" glass glow />
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
            <Textarea label="Success" status="success" placeholder="Valid input" rows={3} />
            <Textarea label="Error" status="error" placeholder="Fix this" rows={3} />
          </div>
        {/snippet}
      </CardContent>
    {/snippet}
  </Card>
</div>
