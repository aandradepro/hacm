import { z } from 'zod';

// ── Page Metadata ──────────────────────────────────────────────────────────────

export const PageMetadataSchema = z.object({
    id: z.string(),
    pageType: z.string(),
    language: z.enum(['en', 'pt']),
    title: z.string(),
    filename: z.string().optional(),
});

export type PageMetadata = z.infer<typeof PageMetadataSchema>;

// ── Nav ──────────────────────────────────────────────────────────────────────

export const NavItemSchema = z.object({
    label: z.string(),
    href: z.string().regex(/^#/, 'href deve começar com #'),
});

export type NavItem = z.infer<typeof NavItemSchema>;

export const NavigationSchema = z.object({
    items: z.array(NavItemSchema),
});

export type Navigation = z.infer<typeof NavigationSchema>;

// ── Section Base ─────────────────────────────────────────────────────────────

export const SectionSchema = z.object({
    id: z.string(),
    content: z.record(z.string(), z.unknown()),
});

export type Section = z.infer<typeof SectionSchema>;

// ── Component Base ───────────────────────────────────────────────────────────

export const ComponentBaseSchema = z.object({
    componentType: z.string(),
    content: z.record(z.string(), z.unknown()),
});

export type ComponentBase = z.infer<typeof ComponentBaseSchema>;