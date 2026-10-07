import { z } from 'zod';
import { ComponentBaseSchema } from '@/content-model/common';

export const FlowHInsetContentSchema = z.object({
    title: z.string().optional(),
    steps: z.array(z.string()),
});

export type FlowHInsetContent = z.infer<typeof FlowHInsetContentSchema>;

export const FlowHInsetComponentSchema = ComponentBaseSchema.extend({
    componentType: z.literal('flowHInset'),
    content: FlowHInsetContentSchema,
});

export type FlowHInsetComponent = z.infer<typeof FlowHInsetComponentSchema>;