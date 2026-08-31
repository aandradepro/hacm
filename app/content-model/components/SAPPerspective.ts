import { z } from 'zod';
import { ComponentBaseSchema } from '@/content-model/common';

export const SAPPerspectiveContentSchema = z.object({
    items: z.array(z.string()),
});

export type SAPPerspectiveContent = z.infer<typeof SAPPerspectiveContentSchema>;

export const SAPPerspectiveComponentSchema = ComponentBaseSchema.extend({
    componentType: z.literal('SAPPerspective'),
    content: SAPPerspectiveContentSchema,
});

export type SAPPerspectiveComponent = z.infer<typeof SAPPerspectiveComponentSchema>;