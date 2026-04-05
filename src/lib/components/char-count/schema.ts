import { z } from 'zod/v4';
import { BaseUIPropsSchema } from '$lib/types/base';
import type { ComponentMeta } from '$lib/theme/types';

export const CharCountSchema = BaseUIPropsSchema.extend({
  value: z.string().default(''),
  maxLength: z.number().optional(),
});

export type CharCountProps = z.infer<typeof CharCountSchema>;

export const meta: ComponentMeta = {
  name: 'CharCount',
  category: 'input',
  description: 'A character counter utility usually paired with a Textarea or Input to show remaining or total characters.',
  since: '1.1.0',
  props: [
    { name: 'value', type: 'string', default: "''", description: 'The text value to count characters from.' },
    { name: 'maxLength', type: 'number', description: 'The maximum length allowed (optional).' },
    { name: 'color', type: "primary | secondary | accent | destructive | neutral | gradient | info | success | warning | error", description: 'Theme color for the counter text.' },
  ],
  examples: [
    { title: 'Basic', code: '<CharCount value="Hello world" />' },
    { title: 'With Max Length', code: '<CharCount value="Hello" maxLength={100} />' },
  ],
  import: "import { CharCount } from 'glassui';",
};