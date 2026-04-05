import { z } from 'zod/v4';
import { ThemeColor } from '$lib/types/enums';
import { BaseUIPropsSchema } from '$lib/types/base';
import type { ComponentMeta } from '$lib/theme/types';

export const CarouselSchema = BaseUIPropsSchema.extend({
  activeIndex: z.number().default(0),
  showPagination: z.boolean().default(true),
  showArrows: z.boolean().default(true),
  autoplay: z.number().optional(),
  loop: z.boolean().default(false),
  keyboard: z.boolean().default(true),
});

export type CarouselProps = z.infer<typeof CarouselSchema>;

export const meta: ComponentMeta = {
  name: 'Carousel',
  category: 'data display',
  description: 'A native, touch-friendly, CSS scroll-snap carousel supporting autoplay, looping, keyboard navigation, and mouse dragging.',
  since: '1.5.0',
  props: [
    { name: 'activeIndex', type: 'number', default: '0', description: 'The bound index of the currently active slide.' },
    { name: 'showPagination', type: 'boolean', default: 'true', description: 'Whether to show the dot pagination.' },
    { name: 'showArrows', type: 'boolean', default: 'true', description: 'Whether to show previous/next arrows.' },
    { name: 'autoplay', type: 'number', description: 'Autoplay interval in milliseconds. Omit to disable.' },
    { name: 'loop', type: 'boolean', default: 'false', description: 'Whether the carousel should wrap around when reaching the end.' },
    { name: 'keyboard', type: 'boolean', default: 'true', description: 'Whether to support Left/Right arrow keys for navigation.' },
    { name: 'color', type: "primary | secondary | accent | destructive | neutral | gradient | info | success | warning | error", description: 'Theme color for pagination/arrows.', options: ['primary', 'secondary', 'accent', 'destructive', 'neutral', 'gradient', 'info', 'success', 'warning', 'error'] },
    { name: 'glass', type: 'ultra-thin | thin | normal | thick | ultra-thick', default: 'false', description: 'Glass surface density', options: ['false', 'ultra-thin', 'thin', 'true', 'thick', 'ultra-thick'] },
    { name: 'frosted', type: 'light | medium | heavy', default: 'false', description: 'Backdrop blur intensity', options: ['false', 'light', 'true', 'heavy'] },
    { name: 'raised', type: 'boolean', default: 'true', description: 'Elevated with shadow' },
  ],
  examples: [
    { title: 'Basic', code: '<Carousel><CarouselSlide>1</CarouselSlide><CarouselSlide>2</CarouselSlide></Carousel>' },
  ],
  import: "import { Carousel, CarouselSlide } from 'glassui';",
};