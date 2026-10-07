import { Metadata } from 'next';
import { Suspense } from 'react';
import { getContent } from './data';
import PageContent from './PageContent';

export async function generateMetadata(): Promise<Metadata> {
    const content = getContent('en');
    const heroSection = content.sections?.find(s => s.id === 'hero');
    const title = content.page?.title || 'Modeling SAP and Non-SAP Data at the Right Grain';
    const description = heroSection?.content?.subtitle || '';

    return {
        title: `${title} | Alexandre de Andrade`,
        description,
        openGraph: {
            title: `${title} | Alexandre de Andrade`,
            description,
            url: 'https://aandradepro.com/mini-cases/modeling-sap-and-non-sap-data-at-the-right-grain',
            siteName: 'Alexandre de Andrade',
            images: [
                {
                    url: 'https://aandradepro.com/images/og-image-modeling.png',
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: `${title} | Alexandre de Andrade`,
            description,
            images: ['https://aandradepro.com/images/og-image-modeling.png'],
        },
    };
}

export default function Page() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-[#0F4C8A]">Loading...</div>
            </div>
        }>
            <PageContent />
        </Suspense>
    );
}