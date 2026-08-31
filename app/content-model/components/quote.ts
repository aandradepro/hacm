import { z } from 'zod';
import { ComponentBaseSchema } from '@/content-model/common';

export const QuoteContentSchema = z.object({
    text: z.string(),
});

export type QuoteContent = z.infer<typeof QuoteContentSchema>;

export const QuoteComponentSchema = ComponentBaseSchema.extend({
    componentType: z.literal('quote'),
    content: QuoteContentSchema,
});

export type QuoteComponent = z.infer<typeof QuoteComponentSchema>;