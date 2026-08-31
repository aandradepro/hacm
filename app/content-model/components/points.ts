import { z } from 'zod';
import { ComponentBaseSchema } from '@/content-model/common';

export const PointsContentSchema = z.object({
    items: z.array(z.string()),
});

export type PointsContent = z.infer<typeof PointsContentSchema>;

export const PointsComponentSchema = ComponentBaseSchema.extend({
    componentType: z.literal('points'),
    content: PointsContentSchema,
});

export type PointsComponent = z.infer<typeof PointsComponentSchema>;