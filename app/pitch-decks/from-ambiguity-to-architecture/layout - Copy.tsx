// ============================================================
// FILE: app/layout.tsx
// PURPOSE: Root layout component with metadata and global styles
// ============================================================

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './styles/globals.css';
import PrintHandler from './components/PrintHandler';

const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-inter',
});

export const metadata: Metadata = {
    title: 'HACM — From Ambiguity to Architecture',
    description: 'Structuring enterprise data for trust, governance, and AI-readiness. Senior Data Architect specializing in semantic-first architecture for complex SAP and hybrid environments.',
    keywords: 'data architecture, semantic governance, enterprise data, SAP, Business Data Cloud, data products, AI-readiness, data trust',
    authors: [{ name: 'Alexandre Andrade' }],
    creator: 'Alexandre Andrade',
    openGraph: {
        title: 'HACM — From Ambiguity to Architecture',
        description: 'Structuring enterprise data for trust, governance, and AI-readiness.',
        type: 'website',
        url: 'https://hacm.vercel.app',
        siteName: 'HACM',
        images: [
            {
                url: '/images/og-image.png',
                width: 1200,
                height: 630,
                alt: 'HACM — From Ambiguity to Architecture',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'HACM — From Ambiguity to Architecture',
        description: 'Structuring enterprise data for trust, governance, and AI-readiness.',
        images: ['/images/og-image.png'],
    },
    icons: {
        icon: '/favicon.ico',
    },
    viewport: {
        width: 'device-width',
        initialScale: 1,
        maximumScale: 5,
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${inter.variable}`}>
            <body>
                <PrintHandler />
                {children}
            </body>
        </html>
    );
}