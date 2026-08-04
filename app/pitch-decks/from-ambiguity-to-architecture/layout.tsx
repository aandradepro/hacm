// ============================================================
// FILE: app/pitch-decks/from-ambiguity-to-architecture/layout.tsx
// PURPOSE: Layout com metadata específica para o pitch deck
// ============================================================

import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'From Ambiguity to Architecture | Alexandre de Andrade',
    description: 'An architectural approach for building trusted, governed, AI-ready enterprise analytics. A semantic-first approach to data architecture.',
    openGraph: {
        title: 'From Ambiguity to Architecture | Alexandre de Andrade',
        description: 'An architectural approach for building trusted, governed, AI-ready enterprise analytics.',
        url: 'https://aandradepro.com/pitch-decks/from-ambiguity-to-architecture',
        siteName: 'Alexandre de Andrade',
        images: [
            {
                url: 'https://aandradepro.com/images/og-image.png',
                width: 1200,
                height: 630,
                alt: 'From Ambiguity to Architecture',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'From Ambiguity to Architecture | Alexandre de Andrade',
        description: 'An architectural approach for building trusted, governed, AI-ready enterprise analytics.',
        images: ['https://aandradepro.com/images/og-image.png'],
    },
};

export default function PitchDeckLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}