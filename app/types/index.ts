// app/types/index.ts

// ============================================
// TIPOS COMPARTILHADOS (Base)
// ============================================

export interface NavItem {
    label: string;
    href: string;
}

export interface Tag {
    label: string;
}

export interface Point {
    text: string;
    subitems?: string[];
}

export interface Pill {
    text: string;
}

export interface ContactInfo {
    email: string;
    linkedin: string;
    calendar: string;
}

export interface Footer {
    text: string;
    brand: string;
}

// ============================================
// TIPOS DA LANDING PAGE
// ============================================

export interface Hero {
    heading: string;
    title: string;
    subtitle: string;
    credentials?: string;
    author?: string;
    tags?: string[];
    brand?: string;
}

export interface FocusItem {
    icon: string;
    title: string;
    description: string;
}

export interface Focus {
    title: string;
    items: FocusItem[];
    columns?: number;
}

export interface Balance {
    left: {
        label: string;
        items: string[];
    };
    right: {
        label: string;
        items: string[];
    };
    center: string;
    balancePoint: string;
}

export interface PitchDeckItem {
    icon: string;
    metric: string;
    metricLabel: string;
    title: string;
    description: string;
    impact: string;
    href: string;
}

export interface PitchDecks {
    title: string;
    subtitle: string;
    items: PitchDeckItem[];
    columns?: number;
}

export interface Contact {
    badge: string;
    title: string;
    description: string;
    contact: ContactInfo;
}

// ============================================
// TIPOS DO PITCH DECK (Coordinating Enterprise Analytics)
// ============================================

export interface Convergence {
    center: string;
    nodes: string[];
}

export interface Problem {
    badge: string;
    title: string;
    subtitle: string;
    message: string;

    // Campos do Coordinating Enterprise Analytics
    list?: string[];
    convergence?: Convergence;
    sapPerspective?: string[];

    // Campos do From Ambiguity to Architecture
    points?: string[];
    pills?: string[];
}

export interface ThesisListItem {
    text: string;
    subitems?: string[];
}

export interface VertFlow {
    title: string;
    steps: string[];
}

export interface Thesis {
    badge: string;
    title: string;
    subtitle: string;
    list: ThesisListItem[];
    message: string;
    sapPerspective: string[];
    vertFlow: VertFlow;
}

export interface EvidenceCard {
    icon: string;
    title: string;
    metric: string;
    metricLabel: string;
    industry: string;
    description: string;
    impact: string;
}

export interface Evidence {
    badge: string;
    title: string;
    cards: EvidenceCard[];
    message: string;
    sapPerspective: string[];
}

export interface Relationship {
    subject: {
        label: string;
        items: string[];
    };
    verb: string;
    object: {
        label: string;
        items: string[];
    };
    meaning: string;
}

export interface OrbitNode {
    icon: string;
    title: string;
    description: string;
}

export interface Orbit {
    center: string;
    nodes: OrbitNode[];
    outcome: string;
    cycleText: string;
}

export interface Value {
    badge: string;
    title: string;
    subtitle: string;
    emphasis: string;
    orbit: Orbit; // ← Nome atualizado
    message: string;
    sapPerspective: string[];
}

export interface CTAPillar {
    icon: string;
    title: string;
    description: string;
}

export interface CTA {
    badge: string;
    title: string;
    pillars: CTAPillar[];
    sapPerspective: string[];
    contact: ContactInfo;
}

// ============================================
// TIPOS DO PITCH DECK (From Ambiguity to Architecture)
// ============================================

export interface ApproachStep {
    step: string;
    description: string;
}

export interface Approach {
    badge: string;
    title: string;
    intro: string;
    steps: ApproachStep[];
    sapPerspective: string[];
}

export interface ResultCard {
    icon: string;
    title: string;
    description: string;
    impact: string;
    metric: string;
    industry: string;
    metricLabel: string;
}

export interface Results {
    badge: string;
    title: string;
    cards: ResultCard[];
    sapPerspective: string[];
}

export interface Foundation {
    left: {
        eyebrow: string;
        label: string;
    };
    center: {
        eyebrow: string;
        label: string;
        capabilities: string[];
    };
    right: {
        eyebrow: string;
        label: string;
    };
}

// ============================================
// TIPO UNIFICADO: Architecture
// ============================================

/**
 * Architecture unificado que combina todos os campos possíveis das três páginas:
 * - Landing page: points, balance
 * - Coordinating Enterprise Analytics: relationship
 * - From Ambiguity to Architecture: foundation, points (string[])
 */
export interface Architecture {
    // Campos obrigatórios (presentes em TODOS os arquivos JSON)
    badge: string;
    title: string;
    subtitle: string;
    message?: string; // Presente nos pitch decks, não na landing page

    // Campos da Landing Page (opcionais)
    points?: string[]; // Landing page usa array de strings
    balance?: Balance; // ← Nome atualizado

    // Campos do Coordinating Enterprise Analytics (opcionais)
    relationship?: Relationship;
    sapPerspective?: string[]; // Coordinating tem string

    // Campos do From Ambiguity to Architecture (opcionais)
    foundation?: Foundation; // ← Nome atualizado
    intro?: string; // Ambiguity tem intro

}

// ============================================
// TIPO UNIFICADO (Content)
// ============================================

export interface Content {
    // Campos OBRIGATÓRIOS (todas as páginas)
    nav: {
        items: NavItem[];
    };
    hero: Hero;

    // Campos OPCIONAIS
    page?: {
        title: string;
        description: string;
    };
    footer?: Footer;

    // Landing page
    focus?: Focus;
    pitch_decks?: PitchDecks;
    contact?: Contact;

    // Architecture unificado (funciona para todas as páginas)
    architecture?: Architecture;

    // Pitch Deck 1 (From Ambiguity to Architecture)
    problem?: Problem;
    approach?: Approach;
    results?: Results;
    cta?: CTA;

    // Pitch Deck 2 (Coordinating Enterprise Analytics)
    thesis?: Thesis;
    evidence?: Evidence;
    value?: Value;
}

// ============================================
// TIPOS DE UTILIDADE
// ============================================

export type Language = 'en' | 'pt';