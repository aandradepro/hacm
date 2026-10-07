import { z } from 'zod';
import { PageMetadataSchema, NavigationSchema } from '@/content-model/common';
import {
    TagsComponentSchema,
    QuoteComponentSchema,
    PointsComponentSchema,
    FlowHDiagramComponentSchema,
    MessageComponentSchema,
    SAPPerspectiveComponentSchema,
    CardsComponentSchema,
    ListComponentSchema,
    PillarsComponentSchema,
    StepsComponentSchema,
    TradeoffsComponentSchema,
} from '../components';

// ── Hero Section ──────────────────────────────────────────────────────────────

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
        reasoning: FlowHDiagramComponentSchema,
        message: MessageComponentSchema,
    }),
});

// ── Grain Section ────────────────────────────────────────────────────────────

const GrainSectionSchema = z.object({
    id: z.literal('grain'),
    content: z.object({
        badge: z.string(),
        title: z.string(),
        subtitle: z.string(),
        steps: StepsComponentSchema,
        cardinality: CardsComponentSchema,
        SAPPerspective: SAPPerspectiveComponentSchema,
    }),
});

// ── Combination Section ──────────────────────────────────────────────────────

const CombinationSectionSchema = z.object({
    id: z.literal('combination'),
    content: z.object({
        badge: z.string(),
        title: z.string(),
        subtitle: z.string(),
        operations: PillarsComponentSchema,
        tradeoffs: TradeoffsComponentSchema,
        monthly: CardsComponentSchema,
        quote: QuoteComponentSchema,
    }),
});

// ── Calculation Section ──────────────────────────────────────────────────────

const CalculationSectionSchema = z.object({
    id: z.literal('calculation'),
    content: z.object({
        badge: z.string(),
        title: z.string(),
        subtitle: z.string(),
        layers: FlowHDiagramComponentSchema,
        placement: PillarsComponentSchema,
        message: MessageComponentSchema,
    }),
});

// ── Safeguards Section ───────────────────────────────────────────────────────

const SafeguardsSectionSchema = z.object({
    id: z.literal('safeguards'),
    content: z.object({
        badge: z.string(),
        title: z.string(),
        subtitle: z.string(),
        safeguards: z.object({
            title: z.string(),
            list: ListComponentSchema,
        }),
        performance: z.object({
            title: z.string(),
            list: ListComponentSchema,
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

export const ModelingSapAndNonSapDataPageSchema = z.object({
    page: PageMetadataSchema,
    nav: NavigationSchema,
    sections: z.tuple([
        HeroSectionSchema,
        ProblemSectionSchema,
        GrainSectionSchema,
        CombinationSectionSchema,
        CalculationSectionSchema,
        SafeguardsSectionSchema,
        TakeawaySectionSchema,
        CTASectionSchema,
        FooterSectionSchema,
    ]),
});

export type ModelingSapAndNonSapDataPage = z.infer<typeof ModelingSapAndNonSapDataPageSchema>;