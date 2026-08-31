import { z } from 'zod';
import { PageMetadataSchema, NavigationSchema } from '../common';
import {
    FlowHDiagramComponentSchema,
    ListComponentSchema,
} from '../components';

// ── Page Metadata com filename ──────────────────────────────────────────────

export const PageMetadataWithFilenameSchema = PageMetadataSchema.extend({
    filename: z.string().optional(),
});

export type PageMetadataWithFilename = z.infer<typeof PageMetadataWithFilenameSchema>;

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

export const ContentSectionSchema = z.object({
    id: z.string(),
    content: z.object({
        heading: z.string(),
        items: z.array(ContentItemSchema),
    }),
});

export type ContentSection = z.infer<typeof ContentSectionSchema>;

// ── Page Schema ─────────────────────────────────────────────────────────────

export const MovingKpiProcessingDetailPageSchema = z.object({
    page: PageMetadataWithFilenameSchema,
    nav: NavigationSchema,
    sections: z.array(
        z.discriminatedUnion('id', [
            HeroSectionSchema,
            ContentSectionSchema,
        ])
    ),
    backLabel: z.string().optional(),
    footer: z.object({
        text: z.string(),
        brand: z.string(),
    }),
});

export type MovingKpiProcessingDetailPage = z.infer<typeof MovingKpiProcessingDetailPageSchema>;