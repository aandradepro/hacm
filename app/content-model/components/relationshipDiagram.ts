import { z } from 'zod';
import { ComponentBaseSchema } from '@/content-model/common';

export const RelationshipDiagramContentSchema = z.object({
    subject: z.object({
        label: z.string(),
        items: z.array(z.string()),
    }),
    verb: z.string(),
    object: z.object({
        label: z.string(),
        items: z.array(z.string()),
    }),
    meaning: z.string(),
});

export type RelationshipDiagramContent = z.infer<typeof RelationshipDiagramContentSchema>;

export const RelationshipDiagramComponentSchema = ComponentBaseSchema.extend({
    componentType: z.literal('relationshipDiagram'),
    content: RelationshipDiagramContentSchema,
});

export type RelationshipDiagramComponent = z.infer<typeof RelationshipDiagramComponentSchema>;