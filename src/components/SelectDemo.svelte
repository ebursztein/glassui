<script lang="ts">
  import DemoSection from './DemoSection.svelte';
  import Playground from './Playground.svelte';
  import { meta } from '$lib/components/select/schema';
  import { Select } from '$lib/components/select';
  import { Card, CardContent } from '$lib/components/card';
  import { Badge } from '$lib/components/badge';

  let selectedValue = $state('1');
</script>

<div class="space-y-16">
  <header>
    <h1 class="text-4xl font-bold tracking-tight text-foreground">{meta.name}</h1>
    <p class="mt-4 text-lg text-muted-foreground">{meta.description}</p>
  </header>

  <Playground {meta}>
    {#snippet preview(props)}
      <div class="w-full max-w-sm">
        <Select bind:value={selectedValue} {...props}>
          <option value="1">Svelte</option>
          <option value="2">React</option>
          <option value="3">Vue</option>
          <option value="4" disabled>Angular (Disabled)</option>
        </Select>
      </div>
    {/snippet}
  </Playground>

  <DemoSection id="states" title="Validation States" description="Like Inputs, Select menus automatically format themselves when given an error.">
    <div class="w-full max-w-md mx-auto grid gap-6">
      <Select label="Preferred Framework" value="1">
        <option value="1">Svelte 5</option>
      </Select>

      <Select label="Database" error="PostgreSQL connection failed." color="error" value="1">
        <option value="1">PostgreSQL</option>
      </Select>
      
      <Select label="Success State" helperText="Looks good!" color="success" value="1">
        <option value="1">MongoDB</option>
      </Select>
    </div>
  </DemoSection>

  <DemoSection id="glass" title="Glass Optic Consistency" description="Because Select is a 'field' role in the GlassUI engine, it perfectly mimics the optical recess and border styling of Input and Textarea fields when rendered on a glass pane.">
    <div class="w-full max-w-2xl mx-auto">
      <Card glass color="gradient" class="min-h-64 p-8">
        <CardContent class="grid md:grid-cols-2 gap-8">
          <div>
            <h3 class="text-xl font-bold mb-4">Account Settings</h3>
            <p class="opacity-80 text-sm">Notice how both the text input and the select dropdown share the identical inset optical shadow and translucent border variables.</p>
          </div>
          <div class="space-y-6">
            <Select label="Timezone" placeholder="Select timezone..." glass>
              <option value="pst">Pacific Time (PT)</option>
              <option value="est">Eastern Time (ET)</option>
              <option value="utc">Universal Time (UTC)</option>
            </Select>

            <Select label="Language" disabled glass helperText="Feature locked">
              <option value="en">English</option>
            </Select>
          </div>
        </CardContent>
      </Card>
    </div>
  </DemoSection>
</div>