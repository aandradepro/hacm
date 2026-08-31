import { z } from 'zod';
import { PageMetadataSchema, NavigationSchema } from '@/content-model/common';
import {
    TagsComponentSchema,
    PointsComponentSchema,
    SAPPerspectiveComponentSchema,
    CardsComponentSchema,
    PillarsComponentSchema,
} from '../components';

// ── Pills Component ──────────────────────────────────────────────────────────

const PillsContentSchema = z.object({
    items: z.array(z.string()),
});

const PillsComponentSchema = z.object({
    componentType: z.literal('pills'),
    content: PillsContentSchema,
});

// ── Steps Component ──────────────────────────────────────────────────────────

const StepSchema = z.object({
    step: z.string(),
    description: z.string(),
});

const StepsContentSchema = z.object({
    items: z.array(StepSchema),
});

const StepsComponentSchema = z.object({
    componentType: z.literal('steps'),              // ← Corrigido: steps
    content: StepsContentSchema,
});

// ── FoundationDiagram Component ─────────────────────────────────────────────

const FoundationDiagramContentSchema = z.object({
    left: z.object({
        eyebrow: z.string(),
        label: z.string(),
    }),
    center: z.object({
        eyebrow: z.string(),
        label: z.string(),
        capabilities: z.array(z.string()),
    }),
    right: z.object({
        eyebrow: z.string(),
        label: z.string(),
    }),
});

const FoundationDiagramComponentSchema = z.object({
    componentType: z.literal('foundationDiagram'),
    content: FoundationDiagramContentSchema,
});

// ── ContactButtons Component ────────────────────────────────────────────────

const ContactButtonsContentSchema = z.object({
    email: z.string(),
    linkedin: z.string(),
    calendar: z.string(),
});

const ContactButtonsComponentSchema = z.object({
    componentType: z.literal('contactButtons'),
    content: ContactButtonsContentSchema,
});

// ── Hero Section ─────────────────────────────────────────────────────────────

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
        points: PointsComponentSchema,
        SAPPerspective: SAPPerspectiveComponentSchema,
        pills: PillsComponentSchema,
    }),
});

// ── Approach Section ─────────────────────────────────────────────────────────

const ApproachSectionSchema = z.object({
    id: z.literal('approach'),
    content: z.object({
        badge: z.string(),
        title: z.string(),
        intro: z.string(),
        steps: StepsComponentSchema,                // ← Corrigido: steps
        SAPPerspective: SAPPerspectiveComponentSchema,
    }),
});

// ── Results Section ──────────────────────────────────────────────────────────

const ResultsSectionSchema = z.object({
    id: z.literal('results'),
    content: z.object({
        badge: z.string(),
        title: z.string(),
        cards: CardsComponentSchema,
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
        intro: z.string(),
        points: PointsComponentSchema,
        foundationDiagram: FoundationDiagramComponentSchema,
        SAPPerspective: SAPPerspectiveComponentSchema,
    }),
});

// ── CTA Section ──────────────────────────────────────────────────────────────

const CTASectionSchema = z.object({
    id: z.literal('cta'),
    content: z.object({
        badge: z.string(),
        title: z.string(),
        pillars: PillarsComponentSchema,
        SAPPerspective: SAPPerspectiveComponentSchema,
        contact: ContactButtonsComponentSchema,
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

export const FromAmbiguityToArchitecturePageSchema = z.object({
    page: PageMetadataSchema,
    nav: NavigationSchema,
    sections: z.tuple([
        HeroSectionSchema,
        ProblemSectionSchema,
        ApproachSectionSchema,
        ResultsSectionSchema,
        ArchitectureSectionSchema,
        CTASectionSchema,
        FooterSectionSchema,
    ]),
});

export type FromAmbiguityToArchitecturePage = z.infer<typeof FromAmbiguityToArchitecturePageSchema>;