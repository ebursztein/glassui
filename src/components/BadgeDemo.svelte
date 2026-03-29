<script lang="ts">
  import { Badge } from '$lib/components/badge';
  import { Card, CardContent } from '$lib/components/card';
  import { meta } from '$lib/components/badge/schema';
  import PropEditor from './PropEditor.svelte';

  let variant = $state<string>('default');
  let size = $state<string>('sm');
  let status = $state<string>('');
  let glass = $state(false);

  const values = $derived({ variant, size, status: status || undefined, glass });

  function handleChange(key: string, value: any) {
    if (key === 'variant') variant = value;
    if (key === 'size') size = value;
    if (key === 'status') status = value;
    if (key === 'glass') glass = value;
  }
</script>

<div class="space-y-8">
  <Card bg="gradient">
    {#snippet children()}
      <CardContent class="flex items-center justify-center min-h-[80px]">
        {#snippet children()}
          <Badge variant={variant as any} size={size as any} status={status as any || undefined} {glass}>
            {#snippet children()}Label{/snippet}
          </Badge>
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
          <h3 class="text-sm font-semibold text-white mb-4">Solid Variants</h3>
          <div class="flex flex-wrap gap-2">
            <Badge variant="default">{#snippet children()}Default{/snippet}</Badge>
            <Badge variant="primary">{#snippet children()}Primary{/snippet}</Badge>
            <Badge variant="outline">{#snippet children()}Outline{/snippet}</Badge>
            <Badge variant="ghost">{#snippet children()}Ghost{/snippet}</Badge>
            <Badge variant="destructive">{#snippet children()}Destructive{/snippet}</Badge>
          </div>
        {/snippet}
      </CardContent>
    {/snippet}
  </Card>

  <Card bg="gradient">
    {#snippet children()}
      <CardContent>
        {#snippet children()}
          <h3 class="text-sm font-semibold text-white mb-4">Glass Variants</h3>
          <div class="flex flex-wrap gap-2">
            <Badge variant="default" glass>{#snippet children()}Default{/snippet}</Badge>
            <Badge variant="primary" glass>{#snippet children()}Primary{/snippet}</Badge>
            <Badge variant="outline" glass>{#snippet children()}Outline{/snippet}</Badge>
            <Badge variant="destructive" glass>{#snippet children()}Destructive{/snippet}</Badge>
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
          <div class="flex flex-wrap gap-2">
            <Badge status="info">{#snippet children()}Info{/snippet}</Badge>
            <Badge status="success">{#snippet children()}Success{/snippet}</Badge>
            <Badge status="warning">{#snippet children()}Warning{/snippet}</Badge>
            <Badge status="error">{#snippet children()}Error{/snippet}</Badge>
          </div>
          <div class="flex flex-wrap gap-2 mt-3">
            <Badge status="info" glass>{#snippet children()}Info Glass{/snippet}</Badge>
            <Badge status="success" glass>{#snippet children()}Success Glass{/snippet}</Badge>
            <Badge status="warning" glass>{#snippet children()}Warning Glass{/snippet}</Badge>
            <Badge status="error" glass>{#snippet children()}Error Glass{/snippet}</Badge>
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
          <div class="flex flex-wrap items-center gap-2">
            <Badge size="xs">{#snippet children()}XS{/snippet}</Badge>
            <Badge size="sm">{#snippet children()}SM{/snippet}</Badge>
            <Badge size="md">{#snippet children()}MD{/snippet}</Badge>
            <Badge size="lg">{#snippet children()}LG{/snippet}</Badge>
            <Badge size="xl">{#snippet children()}XL{/snippet}</Badge>
          </div>
        {/snippet}
      </CardContent>
    {/snippet}
  </Card>
</div>
