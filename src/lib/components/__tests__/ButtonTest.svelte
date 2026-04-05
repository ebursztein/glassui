<script lang="ts">
  import { Button } from '$lib/components/button';

  interface Props {
    text?: string;
    disabled?: boolean;
    variant?: string;
    onclick?: () => void;
    [key: string]: unknown;
  }

  let { text = 'Click me', disabled = false, onclick, ...rest }: Props = $props();
</script>

<Button {disabled} {onclick} {...rest}>
  {text}
</Button>
