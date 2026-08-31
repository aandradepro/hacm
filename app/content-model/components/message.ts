import { z } from 'zod';
import { ComponentBaseSchema } from '@/content-model/common';

export const MessageContentSchema = z.object({
    text: z.string(),
});

export type MessageContent = z.infer<typeof MessageContentSchema>;

export const MessageComponentSchema = ComponentBaseSchema.extend({
    componentType: z.literal('message'),
    content: MessageContentSchema,
});

export type MessageComponent = z.infer<typeof MessageComponentSchema>;