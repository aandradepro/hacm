import { z } from 'zod';
import { ComponentBaseSchema } from '@/content-model/common';

export const OrbitDiagramNodeSchema = z.object({
    icon: z.string().optional().default(''),
    title: z.string(),
    description: z.string(),
});

export type OrbitDiagramNode = z.infer<typeof OrbitDiagramNodeSchema>;

export const OrbitDiagramContentSchema = z.object({
    center: z.string(),
    nodes: z.array(OrbitDiagramNodeSchema),
    outcome: z.string(),
    cycleText: z.string().optional(),
});

export type OrbitDiagramContent = z.infer<typeof OrbitDiagramContentSchema>;

export const OrbitDiagramComponentSchema = ComponentBaseSchema.extend({
    componentType: z.literal('orbitDiagram'),
    content: OrbitDiagramContentSchema,
});

export type OrbitDiagramComponent = z.infer<typeof OrbitDiagramComponentSchema>;