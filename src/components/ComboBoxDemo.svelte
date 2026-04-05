<script lang="ts">
  import DemoSection from './DemoSection.svelte';
  import Playground from './Playground.svelte';
  import { meta } from '$lib/components/combobox/schema';
  import { ComboBox, type ComboBoxOption } from '$lib/components/combobox';
  import { Card, CardContent } from '$lib/components/card';

  let selectedValue = $state('');
  
  const options: ComboBoxOption[] = [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Blueberry', value: 'blueberry' },
    { label: 'Cherry', value: 'cherry' },
    { label: 'Grape', value: 'grape' },
    { label: 'Orange', value: 'orange' },
    { label: 'Strawberry', value: 'strawberry' },
    { label: 'Watermelon', value: 'watermelon' }
  ];
</script>

<div class="space-y-16">
  <header>
    <h1 class="text-4xl font-bold tracking-tight text-foreground">{meta.name}</h1>
    <p class="mt-4 text-lg text-muted-foreground">{meta.description}</p>
  </header>

  <Playground {meta}>
    {#snippet preview(props)}
      <div class="w-full flex justify-center max-w-sm">
        <ComboBox {options} bind:value={selectedValue} {...props} />
      </div>
    {/snippet}
  </Playground>

  <DemoSection id="glass" title="Glass Input Integration" description="ComboBox menus support independent or inherited glass rendering identical to standard select menus.">
    <div class="w-full max-w-md mx-auto">
      <Card glass color="gradient" class="min-h-48 p-8 flex flex-col justify-center">
        <CardContent>
          <ComboBox label="Select a Fruit" {options} glass color="gradient" />
        </CardContent>
      </Card>
    </div>
  </DemoSection>
</div>