export interface ListItem {
    text: string;
    subitems?: string[];
}

export interface NavItem {
    label: string;
    href: string;
}

export interface OrbitNode {
    icon: string;
    title: string;
    description: string;
}

export interface CardItem {
    icon?: string;
    title: string;
    description: string;
    impact: string;
    metric: string;
    metricLabel: string;
    industry?: string;
    href?: string; // Para landing page cards que são links
}

export interface Pillar {
    icon?: string;
    title: string;
    description: string;
}

export interface EvidenceCase {
    title: string;
    problem?: string;
    decision?: string;
    outcome?: string;
    metric?: string | null;
    metricLabel?: string | null;
    description?: string;
    impact?: string;
}

export interface Step {
    step: string;
    description: string;
}

export type Language = 'en' | 'pt';

export const languages: { code: Language; label: string }[] = [
    { code: 'en', label: 'English' },
    { code: 'pt', label: 'Português' },
];

// ── Landing Page Content ──────────────────────────────────────────────────────

export interface LandingAction {
    label: string;
    href: string;
}

export interface LandingHeroContent {
    heading: string;
    title: string;
    subtitle: string;
    credentials: string;
    author: string;
    tags: string[];
    actions: LandingAction[];
}

export interface LandingPerspectiveContent {
    badge: string;
    text: string;
}

export interface LandingFocusContent {
    title: string;
    items: Pillar[];
    columns: number;
}

export interface LandingArchitectureBalanceContent {
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

export interface LandingPitchDecksContent {
    title: string;
    subtitle: string;
    items: CardItem[];
    columns: number;
}

export interface LandingContactContent {
    badge: string;
    title: string;
    description: string;
    contact: {
        email: string;
        linkedin: string;
        calendar: string;
    };
}

export interface LandingContent {
    page: {
        title: string;
        description: string;
    };
    navigation: {
        component: string;
        content: {
            hero: {
                title: string;
            };
            nav: NavItem[];
        };
    };
    hero: {
        component: string;
        content: LandingHeroContent;
    };
    perspective: {
        component: string;
        content: LandingPerspectiveContent;
    };
    focus: {
        component: string;
        content: LandingFocusContent;
    };
    architecture_balance: {
        component: string;
        content: LandingArchitectureBalanceContent;
    };
    pitch_decks: {
        component: string;
        content: LandingPitchDecksContent;
    };
    contact: {
        component: string;
        content: LandingContactContent;
    };
}

// ── Pitch Deck Content ──────────────────────────────────────────────────────

export interface Content {
    // ── Campos compartilhados ──────────────────────────────────────────────
    nav: {
        items: NavItem[];
    };

    hero: {
        title: string;
        subtitle?: string;
        heading?: string;
        tags?: string[];
        brand?: string;
        author?: {
            name: string;
            role: string;
            experience?: string;
        };
        contact?: {
            email: string;
            linkedin: string;
        };
    };

    footer?: {
        text: string;
        brand: string;
    };

    // ── From Ambiguity to Architecture ──────────────────────────────────────
    problem?: {
        badge: string;
        title: string;
        subtitle?: string;
        list?: string[];
        points?: string[];
        sapPerspective: string | string[];
        quote?: string;
        message?: string;
        pill?: string[];
        diagram?: {
            center?: string;
            nodes?: string[];
            steps?: string[];
        };
        convergence?: {
            center: string;
            nodes: string[];
        };
    };

    approach?: {
        badge: string;
        title: string;
        intro: string;
        steps: Step[];
        sapPerspective: string | string[];
        quote?: string;
        message?: string;
        tradeoffs?: string[];
        principle?: string;
        diagram?: {
            center?: string;
            nodes?: string[];
            steps?: string[];
        };
        pill?: string[];
    };

    results?: {
        badge: string;
        title: string;
        cards: CardItem[];
        sapPerspective: string | string[];
        quote?: string;
        message?: string;
        pill?: string[];
        diagram?: {
            center?: string;
            nodes?: string[];
            steps?: string[];
        };
    };

    continuity?: {
        badge: string;
        title: string;
        intro: string;
        sapPerspective: string | string[];
        existingLabel: string;
        architectureLabel: string;
        evolvingLabel: string;
        existingEyebrow?: string;
        architectureEyebrow?: string;
        evolvingEyebrow?: string;
        capabilities?: string[];
        quote?: string;
        message?: string;
        technology?: string[];
        architecture?: string[];
        center?: string;
        points?: string[];
        pill?: string[];
    };

    cta?: {
        badge: string;
        title: string;
        pillars: Pillar[];
        sapPerspective: string | string[];
        contact: {
            email: string;
            linkedin: string;
            calendar?: string;
        };
        quote?: string;
        intro?: string;
        emphasis?: string;
        pill?: string[];
        closing?: {
            title: string;
            statement: string;
            author: string;
            role: string;
        };
    };

    // ── Coordinating Enterprise Analytics ──────────────────────────────────
    thesis?: {
        badge: string;
        title: string;
        subtitle: string;
        points?: string[];
        list?: ListItem[];
        tradeoffs?: string[][];
        vertFlow?: {
            title?: string;
            steps: string[];
        };
        compactPoints?: string[];
        sapPerspective: string | string[];
        quote?: string;
        message?: string;
        pill?: string[];
        diagram?: {
            center?: string;
            nodes?: string[];
            steps?: string[];
        };
    };

    evidence?: {
        badge: string;
        title: string;
        subtitle?: string;
        cases?: EvidenceCase[];
        cards?: CardItem[];
        sapPerspective: string | string[];
        quote?: string;
        message?: string;
        pill?: string[];
        diagram?: {
            center?: string;
            nodes?: string[];
            steps?: string[];
        };
    };

    architecture?: {
        badge: string;
        title: string;
        subtitle: string;
        relationship?: {
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
        };
        sapPerspective: string | string[];
        quote?: string;
        message?: string;
        pill?: string[];
        diagram?: {
            center?: string;
            nodes?: string[];
            steps?: string[];
        };
    };

    value?: {
        badge: string;
        title: string;
        subtitle: string;
        emphasis?: string;
        pillars?: Pillar[];
        orbitDiagram?: {
            center: string;
            nodes: OrbitNode[];
            outcome?: string;
            cycleText?: string;
        };
        sapPerspective: string | string[];
        quote?: string;
        message?: string;
        pill?: string[];
        diagram?: {
            center?: string;
            nodes?: string[];
            steps?: string[];
        };
    };

    closing?: {
        badge: string;
        title: string;
        message: string;
        contact: {
            email: string;
            linkedin: string;
        };
        quote?: string;
        pill?: string[];
    };

    // ── Bridge (legado para coordinating em hold) ──────────────────────────
    bridge?: {
        badge: string;
        title: string;
        intro: string;
        sapPerspective: string | string[];
        legacyLabel: string;
        governanceLabel: string;
        modernLabel: string;
        quote?: string;
        message?: string;
        technology?: string[];
        architecture?: string[];
        center?: string;
        points?: string[];
        pill?: string[];
    };
}