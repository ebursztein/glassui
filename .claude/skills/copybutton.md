# CopyButton

A small utility button that copies text to the clipboard and provides visual feedback.

## Import

```ts
import { CopyButton } from 'glassui';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| value | `string` | — | The text to copy to the clipboard. |
| iconOnly | `boolean` | `true` | If true, only shows the icon. If false, shows "Copy" text. |
| size | `xs | sm | md | lg | xl` | `md` | Button size |
| color | `primary | secondary | accent | destructive | neutral | gradient | info | success | warning | error` | — | Theme color |
| style | `solid | outline | ghost` | `ghost` | Render style |
| glass | `ultra-thin | thin | normal | thick | ultra-thick` | `false` | Glass surface density |
| disabled | `boolean` | `false` | Disabled state |

## Examples

### Basic

```svelte
<CopyButton value="npm install glassui" />
```

## Full Source

```svelte
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
```