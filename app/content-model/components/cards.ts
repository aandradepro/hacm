import { z } from 'zod';
import { ComponentBaseSchema } from '@/content-model/common';

export const CardItemSchema = z.object({
    icon: z.string().optional().default(''),
    metric: z.string().optional().default(''),
    metricLabel: z.string().optional().default(''),
    title: z.string(),
    description: z.string(),
    impact: z.string().optional().default(''),
    href: z.string().optional(),
});

export type CardItem = z.infer<typeof CardItemSchema>;

export const CardsContentSchema = z.object({
    items: z.array(CardItemSchema),
    columns: z.number().optional().default(3),  // ← Adicionar columns
});

export type CardsContent = z.infer<typeof CardsContentSchema>;

export const CardsComponentSchema = ComponentBaseSchema.extend({
    componentType: z.literal('cards'),
    content: CardsContentSchema,
});

export type CardsComponent = z.infer<typeof CardsComponentSchema>;