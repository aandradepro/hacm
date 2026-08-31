import { z } from 'zod';
import { ComponentBaseSchema } from '@/content-model/common';

export const FoundationDiagramContentSchema = z.object({
    left: z.object({
        eyebrow: z.string(),
        label: z.string(),
    }),
    center: z.object({
        eyebrow: z.string(),
        label: z.string(),
        capabilities: z.array(z.string()),
    }),
    right: z.object({
        eyebrow: z.string(),
        label: z.string(),
    }),
});

export type FoundationDiagramContent = z.infer<typeof FoundationDiagramContentSchema>;

export const FoundationDiagramComponentSchema = ComponentBaseSchema.extend({
    componentType: z.literal('foundationDiagram'),
    content: FoundationDiagramContentSchema,
});

export type FoundationDiagramComponent = z.infer<typeof FoundationDiagramComponentSchema>;