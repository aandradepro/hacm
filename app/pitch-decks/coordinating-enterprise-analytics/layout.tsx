import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Coordinating Enterprise Analytics | Alexandre de Andrade',
    description: 'An architectural perspective on semantic consistency, governance and modernization.',
    openGraph: {
        title: 'Coordinating Enterprise Analytics | Alexandre de Andrade',
        description: 'An architectural perspective on semantic consistency, governance and modernization.',
        url: 'https://aandradepro.com/pitch-decks/coordinating-enterprise-analytics',
        siteName: 'Alexandre de Andrade',
        images: [
            {
                url: 'https://aandradepro.com/images/og-image-coordinating.png',
                width: 1200,
                height: 630,
                alt: 'Coordinating Enterprise Analytics',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Coordinating Enterprise Analytics | Alexandre de Andrade',
        description: 'An architectural perspective on semantic consistency, governance and modernization.',
        images: ['https://aandradepro.com/images/og-image-coordinating.png'],
    },
};

export default function PitchDeckLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}