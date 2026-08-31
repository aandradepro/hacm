import { z } from 'zod';
import { ComponentBaseSchema } from '@/content-model/common';

export const FlowHDiagramContentSchema = z.object({
    title: z.string().optional(),
    steps: z.array(z.string()),
});

export type FlowHDiagramContent = z.infer<typeof FlowHDiagramContentSchema>;

export const FlowHDiagramComponentSchema = ComponentBaseSchema.extend({
    componentType: z.literal('flowHDiagram'),
    content: FlowHDiagramContentSchema,
});

export type FlowHDiagramComponent = z.infer<typeof FlowHDiagramComponentSchema>;