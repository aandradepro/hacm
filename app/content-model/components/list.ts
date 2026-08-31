import { z } from 'zod';
import { ComponentBaseSchema } from '@/content-model/common';

export const ListContentSchema = z.object({
    items: z.array(z.string()),
});

export type ListContent = z.infer<typeof ListContentSchema>;

export const ListComponentSchema = ComponentBaseSchema.extend({
    componentType: z.literal('list'),
    content: ListContentSchema,
});

export type ListComponent = z.infer<typeof ListComponentSchema>;