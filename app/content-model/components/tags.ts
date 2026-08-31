import { z } from 'zod';
import { ComponentBaseSchema } from '@/content-model/common';

export const TagsContentSchema = z.object({
    items: z.array(z.string()),
});

export type TagsContent = z.infer<typeof TagsContentSchema>;

export const TagsComponentSchema = ComponentBaseSchema.extend({
    componentType: z.literal('tags'),
    content: TagsContentSchema,
});

export type TagsComponent = z.infer<typeof TagsComponentSchema>;