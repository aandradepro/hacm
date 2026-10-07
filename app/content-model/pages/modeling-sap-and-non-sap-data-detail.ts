import { z } from 'zod';
import { PageMetadataSchema, NavigationSchema } from '@/content-model/common';
import {
    FlowHDiagramComponentSchema,
    ListComponentSchema,
} from '../components';

// ── Page Metadata com filename ──────────────────────────────────────────────

export const ModelingPageMetadataSchema = PageMetadataSchema.extend({
    filename: z.string().optional(),
});

export type ModelingPageMetadata = z.infer<typeof ModelingPageMetadataSchema>;

// ── Seção Hero ──────────────────────────────────────────────────────────────

const HeroSectionSchema = z.object({
    id: z.literal('hero'),
    content: z.object({
        badge: z.string(),
        title: z.string(),
        subtitle: z.string(),
        heading: z.string(),
        brand: z.string(),
        tags: z.array(z.string()).optional().default([]),
    }),
});

// ── Seção de conteúdo ────────────────────────────────────────────────────────

const ContentItemSchema = z.union([
    z.string(),
    FlowHDiagramComponentSchema,
    ListComponentSchema,
]);

export const ModelingContentSectionSchema = z.object({
    id: z.string(),
    content: z.object({
        heading: z.string(),
        items: z.array(ContentItemSchema),
    }),
});

export type ModelingContentSection = z.infer<typeof ModelingContentSectionSchema>;

// ── Page Schema ─────────────────────────────────────────────────────────────

export const ModelingSapAndNonSapDataDetailPageSchema = z.object({
    page: ModelingPageMetadataSchema,
    nav: NavigationSchema,
    sections: z.array(
        z.discriminatedUnion('id', [
            HeroSectionSchema,
            ModelingContentSectionSchema,
        ])
    ),
    backLabel: z.string().optional(),
    footer: z.object({
        text: z.string(),
        brand: z.string(),
    }),
});

export type ModelingSapAndNonSapDataDetailPage = z.infer<typeof ModelingSapAndNonSapDataDetailPageSchema>;