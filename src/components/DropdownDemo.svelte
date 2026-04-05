<script lang="ts">
  import DemoSection from './DemoSection.svelte';
  import Playground from './Playground.svelte';
  import { meta } from '$lib/components/dropdown/schema';
  import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '$lib/components/dropdown';
  import { Button } from '$lib/components/button';
  import { Icon } from '$lib/components/icon';
</script>

<div class="space-y-16">
  <header>
    <h1 class="text-4xl font-bold tracking-tight text-foreground">{meta.name}</h1>
    <p class="mt-4 text-lg text-muted-foreground">{meta.description}</p>
  </header>

  <Playground {meta}>
    {#snippet preview(props)}
      <div class="w-full h-64 flex items-center justify-center relative">
        <Dropdown {...props}>
          <DropdownTrigger>
            <Button>Options <Icon name="caret-down" size={16}/></Button>
          </DropdownTrigger>
          <DropdownMenu>
            <DropdownItem><Icon name="user" size={16}/> Profile</DropdownItem>
            <DropdownItem><Icon name="gear" size={16}/> Settings</DropdownItem>
            <div class="h-px bg-border my-1 mx-2"></div>
            <DropdownItem class="text-destructive hover:bg-destructive/10 focus:bg-destructive/10"><Icon name="sign-out" size={16}/> Logout</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    {/snippet}
  </Playground>

  <DemoSection id="placement" title="Placements" description="Dropdowns can be positioned around their trigger using the placement prop.">
    <div class="w-full h-48 flex items-center justify-center gap-8 relative">
      <Dropdown placement="top-start">
        <DropdownTrigger><Button color="neutral" style="outline">Top</Button></DropdownTrigger>
        <DropdownMenu><DropdownItem>Action 1</DropdownItem><DropdownItem>Action 2</DropdownItem></DropdownMenu>
      </Dropdown>
      
      <Dropdown placement="bottom-start">
        <DropdownTrigger><Button color="neutral" style="outline">Bottom</Button></DropdownTrigger>
        <DropdownMenu><DropdownItem>Action 1</DropdownItem><DropdownItem>Action 2</DropdownItem></DropdownMenu>
      </Dropdown>

      <Dropdown placement="right-start">
        <DropdownTrigger><Button color="neutral" style="outline">Right</Button></DropdownTrigger>
        <DropdownMenu><DropdownItem>Action 1</DropdownItem><DropdownItem>Action 2</DropdownItem></DropdownMenu>
      </Dropdown>
    </div>
  </DemoSection>

  <DemoSection id="glass" title="Glass Context" description="When placed inside a glass container, or when applying the glass prop directly, dropdown menus seamlessly adopt translucent optics.">
    <div class="w-full h-64 flex items-center justify-center relative bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl border border-line-2">
      <Dropdown>
        <DropdownTrigger><Button glass>Glass Menu <Icon name="caret-down" size={16}/></Button></DropdownTrigger>
        <DropdownMenu glass="normal" frosted="medium" color="gradient">
          <DropdownItem>New File</DropdownItem>
          <DropdownItem>Duplicate</DropdownItem>
          <DropdownItem>Share...</DropdownItem>
          <DropdownItem disabled>Delete</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  </DemoSection>
</div>