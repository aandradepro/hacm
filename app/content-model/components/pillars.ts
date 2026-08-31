import { z } from 'zod';
import { ComponentBaseSchema } from '@/content-model/common';

// ── Pillar Item Schema ─────────────────────────────────────────────────────────

export const PillarSchema = z.object({
    icon: z.string().optional(),
    title: z.string(),
    description: z.string(),
});

export type Pillar = z.infer<typeof PillarSchema>;

// ── Pillars Content Schema ────────────────────────────────────────────────────

export const PillarsContentSchema = z.object({
    items: z.array(PillarSchema),
    columns: z.number().min(2).max(4).optional().default(3),
});

export type PillarsContent = z.infer<typeof PillarsContentSchema>;

// ── Pillars Component Schema ─────────────────────────────────────────────────

export const PillarsComponentSchema = ComponentBaseSchema.extend({
    componentType: z.literal('pillars'),
    content: PillarsContentSchema,
});

export type PillarsComponent = z.infer<typeof PillarsComponentSchema>;