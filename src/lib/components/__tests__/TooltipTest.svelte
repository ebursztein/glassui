<script lang="ts">
  import { Tooltip, TooltipTrigger, TooltipContent } from '$lib/components/tooltip';
</script>

<Tooltip>
  <TooltipTrigger>
    <button type="button">Hover me</button>
  </TooltipTrigger>
  <TooltipContent>
    Tooltip text
  </TooltipContent>
</Tooltip>
