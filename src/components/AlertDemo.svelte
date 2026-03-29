<script lang="ts">
  import { Alert } from '$lib/components/alert';
  import { Card, CardContent } from '$lib/components/card';
  import { meta } from '$lib/components/alert/schema';
  import PropEditor from './PropEditor.svelte';

  let status = $state<string>('info');
  let dismissible = $state(false);
  let icon = $state(true);
  let glass = $state(false);
  let glow = $state(false);

  const values = $derived({ status, dismissible, icon, glass, glow });

  function handleChange(key: string, value: any) {
    if (key === 'status') status = value;
    if (key === 'dismissible') dismissible = value;
    if (key === 'icon') icon = value;
    if (key === 'glass') glass = value;
    if (key === 'glow') glow = value;
  }
</script>

<div class="space-y-8">
  <Card bg="gradient">
    {#snippet children()}
      <CardContent>
        {#snippet children()}
          <Alert status={status as any} title="Alert Title" {dismissible} {icon} {glass} {glow}>
            {#snippet children()}This is the alert body text with details.{/snippet}
          </Alert>
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

  <Card>
    {#snippet children()}
      <CardContent>
        {#snippet children()}
          <h3 class="text-sm font-semibold text-white mb-4">All Statuses (Solid)</h3>
          <div class="space-y-3">
            <Alert status="info" title="Information">{#snippet children()}Something to know about.{/snippet}</Alert>
            <Alert status="success" title="Success">{#snippet children()}Operation completed.{/snippet}</Alert>
            <Alert status="warning" title="Warning">{#snippet children()}Proceed with caution.{/snippet}</Alert>
            <Alert status="error" title="Error">{#snippet children()}Something went wrong.{/snippet}</Alert>
          </div>
        {/snippet}
      </CardContent>
    {/snippet}
  </Card>

  <Card bg="gradient">
    {#snippet children()}
      <CardContent>
        {#snippet children()}
          <h3 class="text-sm font-semibold text-white mb-4">All Statuses (Glass)</h3>
          <div class="space-y-3">
            <Alert status="info" glass title="Information">{#snippet children()}Frosted glass alert.{/snippet}</Alert>
            <Alert status="success" glass title="Success">{#snippet children()}Glass success alert.{/snippet}</Alert>
            <Alert status="warning" glass title="Warning">{#snippet children()}Glass warning alert.{/snippet}</Alert>
            <Alert status="error" glass title="Error">{#snippet children()}Glass error alert.{/snippet}</Alert>
          </div>
        {/snippet}
      </CardContent>
    {/snippet}
  </Card>

  <Card>
    {#snippet children()}
      <CardContent>
        {#snippet children()}
          <h3 class="text-sm font-semibold text-white mb-4">Dismissible</h3>
          <Alert status="success" dismissible title="Dismissible">{#snippet children()}Click the X to dismiss.{/snippet}</Alert>
        {/snippet}
      </CardContent>
    {/snippet}
  </Card>
</div>
