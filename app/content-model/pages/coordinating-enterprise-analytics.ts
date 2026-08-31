import { z } from 'zod';
import { PageMetadataSchema, NavigationSchema } from '@/content-model/common';
import {
    TagsComponentSchema,
    ListComponentSchema,
    MessageComponentSchema,
    SAPPerspectiveComponentSchema,
    CardsComponentSchema,
    OrbitDiagramComponentSchema,
    FlowVDiagramComponentSchema,
    ConvergenceDiagramComponentSchema,      // ← Importar
    RelationshipDiagramComponentSchema,     // ← Importar
    PillarsComponentSchema,                 // ← Importar
} from '../components';

// ── Hero Section ──────────────────────────────────────────────────────────────

const HeroSectionSchema = z.object({
    id: z.literal('hero'),
    content: z.object({
        title: z.string(),
        subtitle: z.string(),
        heading: z.string(),
        brand: z.string(),
        tags: TagsComponentSchema,
    }),
});

// ── Problem Section ──────────────────────────────────────────────────────────

const ProblemSectionSchema = z.object({
    id: z.literal('problem'),
    content: z.object({
        badge: z.string(),
        title: z.string(),
        subtitle: z.string(),
        list: ListComponentSchema,
        message: MessageComponentSchema,
        SAPPerspective: SAPPerspectiveComponentSchema,
        convergence: ConvergenceDiagramComponentSchema,
    }),
});

// ── Thesis Section ───────────────────────────────────────────────────────────

const ThesisSectionSchema = z.object({
    id: z.literal('thesis'),
    content: z.object({
        badge: z.string(),
        title: z.string(),
        subtitle: z.string(),
        list: ListComponentSchema,
        message: MessageComponentSchema,
        SAPPerspective: SAPPerspectiveComponentSchema,
        flowVDiagram: FlowVDiagramComponentSchema,
    }),
});

// ── Evidence Section ──────────────────────────────────────────────────────────

const EvidenceSectionSchema = z.object({
    id: z.literal('evidence'),
    content: z.object({
        badge: z.string(),
        title: z.string(),
        cards: CardsComponentSchema,
        message: MessageComponentSchema,
        SAPPerspective: SAPPerspectiveComponentSchema,
    }),
});

// ── Architecture Section ─────────────────────────────────────────────────────

const ArchitectureSectionSchema = z.object({
    id: z.literal('architecture'),
    content: z.object({
        badge: z.string(),
        title: z.string(),
        subtitle: z.string(),
        relationship: RelationshipDiagramComponentSchema,
        message: MessageComponentSchema,
        SAPPerspective: SAPPerspectiveComponentSchema,
    }),
});

// ── Value Section ─────────────────────────────────────────────────────────────

const ValueSectionSchema = z.object({
    id: z.literal('value'),
    content: z.object({
        badge: z.string(),
        title: z.string(),
        subtitle: z.string(),
        emphasis: z.string(),
        orbit: OrbitDiagramComponentSchema,
        message: MessageComponentSchema,
        SAPPerspective: SAPPerspectiveComponentSchema,
    }),
});

// ── CTA Section ──────────────────────────────────────────────────────────────

const CTASectionSchema = z.object({
    id: z.literal('cta'),
    content: z.object({
        badge: z.string(),
        title: z.string(),
        pillars: z.array(z.object({
            icon: z.string(),
            title: z.string(),
            description: z.string(),
        })),
        SAPPerspective: z.array(z.string()),
        contact: z.object({
            email: z.string(),
            linkedin: z.string(),
            calendar: z.string(),
        }),
    }),
});

// ── Footer Section ───────────────────────────────────────────────────────────

const FooterSectionSchema = z.object({
    id: z.literal('footer'),
    content: z.object({
        text: z.string(),
        brand: z.string(),
    }),
});

// ── Page Schema ──────────────────────────────────────────────────────────────

export const CoordinatingEnterpriseAnalyticsPageSchema = z.object({
    page: PageMetadataSchema,
    nav: NavigationSchema,
    sections: z.tuple([
        HeroSectionSchema,
        ProblemSectionSchema,
        ThesisSectionSchema,
        EvidenceSectionSchema,
        ArchitectureSectionSchema,
        ValueSectionSchema,
        CTASectionSchema,
        FooterSectionSchema,
    ]),
});

export type CoordinatingEnterpriseAnalyticsPage = z.infer<typeof CoordinatingEnterpriseAnalyticsPageSchema>;