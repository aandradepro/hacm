import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './styles/globals.css';  // ← Estilos globais (todos os componentes usam)

const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-inter',
});

export const metadata: Metadata = {
    title: 'Alexandre de Andrade',
    description: 'Senior SAP Analytics Architect',
    keywords: 'data architecture, semantic governance, enterprise data, SAP',
    authors: [{ name: 'Alexandre Andrade' }],
    creator: 'Alexandre Andrade',
    icons: {
        icon: '/favicon.ico',
    },
    viewport: {
        width: 'device-width',
        initialScale: 1,
        maximumScale: 5,
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${inter.variable}`}>
            <body>{children}</body>
        </html>
    );
}