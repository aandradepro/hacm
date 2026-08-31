import { z } from 'zod';
import { ComponentBaseSchema } from '@/content-model/common';

export const StepSchema = z.object({
    step: z.string(),
    description: z.string(),
});

export type Step = z.infer<typeof StepSchema>;

export const StepsContentSchema = z.object({
    items: z.array(StepSchema),
});

export type StepsContent = z.infer<typeof StepsContentSchema>;

export const StepsComponentSchema = ComponentBaseSchema.extend({
    componentType: z.literal('steps'),
    content: StepsContentSchema,
});

export type StepsComponent = z.infer<typeof StepsComponentSchema>;