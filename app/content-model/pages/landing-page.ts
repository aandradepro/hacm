import { z } from 'zod';
import { PageMetadataSchema, NavigationSchema } from '@/content-model/common';
import {
    CardsComponentSchema,
    PointsComponentSchema,
} from '../components';

// ── BalanceDiagram Component ─────────────────────────────────────────────────

const BalanceDiagramContentSchema = z.object({
    left: z.object({
        label: z.string(),
        items: z.array(z.string()),
    }),
    right: z.object({
        label: z.string(),
        items: z.array(z.string()),
    }),
    center: z.string(),
    balancePoint: z.string(),
});

const BalanceDiagramComponentSchema = z.object({
    componentType: z.literal('balanceDiagram'),
    content: BalanceDiagramContentSchema,
});

// ── Hero Section ──────────────────────────────────────────────────────────────

const HeroSectionSchema = z.object({
    id: z.literal('hero'),
    content: z.object({
        badge: z.string(),
        heading: z.string(),
        title: z.string(),
        subtitle: z.string(),
        tags: z.array(z.string()),
    }),
});

// ── Focus Section ─────────────────────────────────────────────────────────────

const FocusSectionSchema = z.object({
    id: z.literal('focus'),
    content: z.object({
        badge: z.string(),
        title: z.string(),
        subtitle: z.string(),
        cards: CardsComponentSchema,
    }),
});

// ── Architecture Section ──────────────────────────────────────────────────────

const ArchitectureSectionSchema = z.object({
    id: z.literal('architecture'),
    content: z.object({
        badge: z.string(),
        title: z.string(),
        subtitle: z.string(),
        points: PointsComponentSchema,
        balanceDiagram: BalanceDiagramComponentSchema,
    }),
});

// ── Pitch Decks Section ──────────────────────────────────────────────────────

const PitchDecksSectionSchema = z.object({
    id: z.literal('pitch-decks'),
    content: z.object({
        badge: z.string(),
        title: z.string(),
        subtitle: z.string(),
        cards: CardsComponentSchema,
    }),
});

// ── Case Studies Section ─────────────────────────────────────────────────────

const CaseStudiesSectionSchema = z.object({
    id: z.literal('case-studies'),
    content: z.object({
        badge: z.string(),
        title: z.string(),
        subtitle: z.string(),
        cards: CardsComponentSchema,
    }),
});

// ── Contact Section ──────────────────────────────────────────────────────────

const ContactSectionSchema = z.object({
    id: z.literal('contact'),
    content: z.object({
        badge: z.string(),
        title: z.string(),
        subtitle: z.string(),
        contact: z.object({
            email: z.string(),
            linkedin: z.string(),
            calendar: z.string(),
        }),
    }),
});

// ── Page Schema ──────────────────────────────────────────────────────────────

export const LandingPageSchema = z.object({
    page: PageMetadataSchema,
    nav: NavigationSchema,
    sections: z.tuple([
        HeroSectionSchema,
        FocusSectionSchema,
        ArchitectureSectionSchema,
        PitchDecksSectionSchema,
        CaseStudiesSectionSchema,
        ContactSectionSchema,
    ]),
});

export type LandingPage = z.infer<typeof LandingPageSchema>;