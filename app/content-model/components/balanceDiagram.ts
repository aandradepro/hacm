import { z } from 'zod';
import { ComponentBaseSchema } from '@/content-model/common';

export const BalanceDiagramContentSchema = z.object({
    left: z.object({
        label: z.string(),
        items: z.array(z.string()),
    }),
    right: z.object({
        label: z.string(),
        items: z.array(z.string()),
    }),
    center: z.string(),
    balancePoint: z.string(),
});

export type BalanceDiagramContent = z.infer<typeof BalanceDiagramContentSchema>;

export const BalanceDiagramComponentSchema = ComponentBaseSchema.extend({
    componentType: z.literal('balanceDiagram'),
    content: BalanceDiagramContentSchema,
});

export type BalanceDiagramComponent = z.infer<typeof BalanceDiagramComponentSchema>;