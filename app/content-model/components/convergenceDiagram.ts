import { z } from 'zod';
import { ComponentBaseSchema } from '@/content-model/common';

export const ConvergenceDiagramContentSchema = z.object({
    center: z.string(),
    nodes: z.array(z.string()),
});

export type ConvergenceDiagramContent = z.infer<typeof ConvergenceDiagramContentSchema>;

export const ConvergenceDiagramComponentSchema = ComponentBaseSchema.extend({
    componentType: z.literal('convergenceDiagram'),
    content: ConvergenceDiagramContentSchema,
});

export type ConvergenceDiagramComponent = z.infer<typeof ConvergenceDiagramComponentSchema>;