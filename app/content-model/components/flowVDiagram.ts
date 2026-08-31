import { z } from 'zod';
import { ComponentBaseSchema } from '@/content-model/common';

export const FlowVDiagramContentSchema = z.object({
    title: z.string(),
    steps: z.array(z.string()),
});

export type FlowVDiagramContent = z.infer<typeof FlowVDiagramContentSchema>;

export const FlowVDiagramComponentSchema = ComponentBaseSchema.extend({
    componentType: z.literal('flowVDiagram'),
    content: FlowVDiagramContentSchema,
});

export type FlowVDiagramComponent = z.infer<typeof FlowVDiagramComponentSchema>;