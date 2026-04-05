<script lang="ts">
  import { Button } from '$lib/components/button';
  import { Icon } from '$lib/components/icon';
  import type { Size, ThemeColor, RenderStyle } from '$lib/types/enums';
  import type { GlassDensity } from '$lib/interactions/glass';

  interface Props {
    value: string;
    iconOnly?: boolean;
    size?: Size;
    color?: ThemeColor;
    style?: RenderStyle;
    glass?: GlassDensity | boolean;
    disabled?: boolean;
    class?: string;
  }

  let {
    value,
    iconOnly = true,
    size = 'md',
    color = 'neutral',
    style = 'ghost',
    glass,
    disabled = false,
    class: className,
    ...rest
  }: Props = $props();

  let isCopied = $state(false);

  const handleCopy = async () => {
    if (disabled || isCopied) return;
    
    try {
      await navigator.clipboard.writeText(value);
      isCopied = true;
      setTimeout(() => {
        isCopied = false;
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const iconSizeMap: Record<Size, number> = {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
  };
</script>

<Button
  {size}
  color={isCopied ? 'success' : color}
  style={isCopied && style === 'ghost' ? 'outline' : style}
  {glass}
  {disabled}
  class={className}
  onclick={handleCopy}
  title="Copy to clipboard"
  {...rest}
>
  {#if isCopied}
    <Icon name="check" size={iconSizeMap[size]} weight="bold" />
    {#if !iconOnly}<span>Copied!</span>{/if}
  {:else}
    <Icon name="copy" size={iconSizeMap[size]} />
    {#if !iconOnly}<span>Copy</span>{/if}
  {/if}
</Button>