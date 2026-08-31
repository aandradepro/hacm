import { z } from 'zod';
import { ComponentBaseSchema } from '@/content-model/common';

export const PillsContentSchema = z.object({
    items: z.array(z.string()),
});

export type PillsContent = z.infer<typeof PillsContentSchema>;

export const PillsComponentSchema = ComponentBaseSchema.extend({
    componentType: z.literal('pills'),
    content: PillsContentSchema,
});

export type PillsComponent = z.infer<typeof PillsComponentSchema>;