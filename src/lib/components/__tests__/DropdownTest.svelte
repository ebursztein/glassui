<script lang="ts">
  import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '$lib/components/dropdown';
</script>

<Dropdown>
  <DropdownTrigger>
    <button type="button">Open menu</button>
  </DropdownTrigger>
  <DropdownMenu>
    <DropdownItem>Item 1</DropdownItem>
    <DropdownItem>Item 2</DropdownItem>
    <DropdownItem disabled>Item 3</DropdownItem>
  </DropdownMenu>
</Dropdown>
