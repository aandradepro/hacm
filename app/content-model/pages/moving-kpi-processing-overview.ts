import { z } from 'zod';
import { PageMetadataSchema, NavigationSchema } from '@/content-model/common';
import {
    TagsComponentSchema,
    QuoteComponentSchema,
    PointsComponentSchema,
    FlowHDiagramComponentSchema,
    MessageComponentSchema,
    SAPPerspectiveComponentSchema,
    OrbitDiagramComponentSchema,
    CardsComponentSchema,
    ListComponentSchema,
} from '../components';

// ... restante dos schemas usando os novos nomes ...


// ── Hero Section ─────────────────────────────────────────────────────────────

const HeroSectionSchema = z.object({
    id: z.literal('hero'),
    content: z.object({
        badge: z.string(),
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
        quote: QuoteComponentSchema,
        points: PointsComponentSchema,
        actual: FlowHDiagramComponentSchema,
        message: MessageComponentSchema,
    }),
});

// ── Decision Section ─────────────────────────────────────────────────────────

const DecisionSectionSchema = z.object({
    id: z.literal('decision'),
    content: z.object({
        badge: z.string(),
        title: z.string(),
        subtitle: z.string(),
        before: FlowHDiagramComponentSchema,
        after: FlowHDiagramComponentSchema,
        common: FlowHDiagramComponentSchema,
        quote: QuoteComponentSchema,
        SAPPerspective: SAPPerspectiveComponentSchema,
    }),
});

// ── Metadata Section ─────────────────────────────────────────────────────────

const MetadataSectionSchema = z.object({
    id: z.literal('metadata'),
    content: z.object({
        badge: z.string(),
        title: z.string(),
        subtitle: z.string(),
        orbit: OrbitDiagramComponentSchema,
        cards: CardsComponentSchema,
    }),
});

// ── Results Section ──────────────────────────────────────────────────────────

const ResultsSectionSchema = z.object({
    id: z.literal('results'),
    content: z.object({
        badge: z.string(),
        title: z.string(),
        cards: CardsComponentSchema,
        improvements: z.object({
            title: z.string(),
            listImprovements: ListComponentSchema,
        }),
    }),
});

// ── Takeaway Section ─────────────────────────────────────────────────────────

const TakeawaySectionSchema = z.object({
    id: z.literal('takeaway'),
    content: z.object({
        badge: z.string(),
        title: z.string(),
        subtitle: z.string(),
        points: PointsComponentSchema,
        SAPPerspective: SAPPerspectiveComponentSchema,
        message: MessageComponentSchema,
    }),
});

// ── CTA Section ──────────────────────────────────────────────────────────────

const CTASectionSchema = z.object({
    id: z.literal('cta'),
    content: z.object({
        badge: z.string(),
        title: z.string(),
        subtitle: z.string(),
        button: z.object({
            label: z.string(),
            href: z.string(),
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

export const MovingKpiProcessingPageSchema = z.object({
    page: PageMetadataSchema,
    nav: NavigationSchema,
    sections: z.tuple([
        HeroSectionSchema,
        ProblemSectionSchema,
        DecisionSectionSchema,
        MetadataSectionSchema,
        ResultsSectionSchema,
        TakeawaySectionSchema,
        CTASectionSchema,
        FooterSectionSchema,
    ]),
});

export type MovingKpiProcessingPage = z.infer<typeof MovingKpiProcessingPageSchema>;