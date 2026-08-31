import { z } from 'zod';
import { ComponentBaseSchema } from '@/content-model/common';

export const ContactButtonsContentSchema = z.object({
    email: z.string(),
    linkedin: z.string(),
    calendar: z.string(),
});

export type ContactButtonsContent = z.infer<typeof ContactButtonsContentSchema>;

export const ContactButtonsComponentSchema = ComponentBaseSchema.extend({
    componentType: z.literal('contactButtons'),
    content: ContactButtonsContentSchema,
});

export type ContactButtonsComponent = z.infer<typeof ContactButtonsComponentSchema>;