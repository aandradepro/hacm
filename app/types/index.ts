// app/types/index.ts

// ============================================
// NOVA VERSÃO
// ============================================
// Content Model
export * from '@/content-model/common';
export * from '@/content-model/components';
export * from '@/content-model/pages/moving-kpi-processing-overview';

// Component Registry
export * from '@/lib/content/component-registry';

export type Language = 'en' | 'pt';

export interface Content {
    page?: {
        id?: string;
        pageType?: string;
        language?: Language;
        title?: string;
        filename?: string;
    };
    nav?: {
        items: Array<{
            label: string;
            href: string;
        }>;
    };
    sections?: Array<{
        id: string;
        content: any;
    }>;
}

export interface NavItem {
    label: string;
    href: string;
}

export interface ContactInfo {
    email: string;
    linkedin: string;
    calendar: string;
}