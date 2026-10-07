'use client';

import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import Navigation from '@/components/ui/Navigation';
import LanguageSelector from '@/components/ui/LanguageSelector';
import ResolutionBadge from '@/components/ui/ResolutionBadge';
import { exportPDF } from '@/lib/exportPDF';
import { Language, getContent, languages } from './data';
import { getFileName } from '@/lib/content/getFileName';
import {
    componentRegistry,
    hasComponent,
    getComponent,
    mapComponentProps
} from '@/lib/content/component-registry';
import { ModelingSapAndNonSapDataDetailPage } from '@/content-model/pages/modeling-sap-and-non-sap-data-detail';

// ── Component Renderer ────────────────────────────────────────────────────────

function ComponentRenderer({ component }: { component: any }) {
    if (!component) return null;

    const { componentType, content } = component;

    if (!componentType || !hasComponent(componentType)) {
        console.warn(`Unknown componentType: ${componentType}`);
        return null;
    }

    const Component = getComponent(componentType);
    if (!Component) {
        console.warn(`No component found for type: ${componentType}`);
        return null;
    }

    const props = mapComponentProps(componentType, content);
    return <Component {...props} />;
}

// ── Section Renderer ──────────────────────────────────────────────────────────

function SectionRenderer({ section, index }: { section: any; index: number }) {
    const { id, content: sectionContent } = section;

    // ── Hero ──
    if (id === 'hero') {
        const hero = sectionContent as {
            badge: string;
            title: string;
            subtitle: string;
            heading: string;
            brand: string;
            tags: string[];
        };

        return (
            <div className="text-center mb-12">
                <div className="flex items-center justify-center gap-4 mb-5">
                    <div className="w-12 h-0.5 bg-[#00B4A0]" />
                    <span className="text-sm font-medium text-[#00B4A0] tracking-widest uppercase">
                        {hero.heading}
                    </span>
                    <div className="w-12 h-0.5 bg-[#00B4A0]" />
                </div>
                <h1 className="heading-1 text-[#0F4C8A] mb-6">
                    {hero.title}
                </h1>
                <p className="body-text text-[#2D3748] max-w-3xl mx-auto">
                    {hero.subtitle}
                </p>
            </div>
        );
    }

    // ── Content sections (como Markdown) ──
    if ('heading' in sectionContent && 'items' in sectionContent) {
        const content = sectionContent as {
            heading: string;
            items: any[];
        };

        return (
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-[#0F4C8A] mt-8 mb-4">
                    {content.heading}
                </h2>
                <div className="prose prose-lg max-w-none text-[#2D3748]">
                    {content.items.map((item: any, itemIndex: number) => {
                        if (typeof item === 'string') {
                            return (
                                <p key={itemIndex} className="text-[#2D3748] leading-relaxed mb-4">
                                    {item}
                                </p>
                            );
                        }

                        if (item && typeof item === 'object' && 'componentType' in item) {
                            return (
                                <div key={itemIndex} className="my-4">
                                    <ComponentRenderer component={item} />
                                </div>
                            );
                        }

                        return null;
                    })}
                </div>
            </div>
        );
    }

    return null;
}

// ── Page Content ──────────────────────────────────────────────────────────────

export default function PageContent() {
    const searchParams = useSearchParams();
    const [isClient, setIsClient] = useState(false);
    const [lang, setLang] = useState<Language>('en');
    const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
    const [progress, setProgress] = useState(0);
    const content = getContent(lang) as ModelingSapAndNonSapDataDetailPage;
    const contentRef = useRef<HTMLDivElement>(null);
    const isDev = process.env.NODE_ENV === 'development';

    useEffect(() => {
        setIsClient(true);

        const urlLang = searchParams.get('lang') as Language;
        if (urlLang && (urlLang === 'en' || urlLang === 'pt')) {
            setLang(urlLang);
            localStorage.setItem('hacm-lang', urlLang);
            return;
        }

        const savedLang = localStorage.getItem('hacm-lang') as Language;
        if (savedLang && (savedLang === 'en' || savedLang === 'pt')) {
            setLang(savedLang);
        }
    }, [searchParams]);

    const handleLanguageChange = (newLang: Language) => {
        setLang(newLang);
        localStorage.setItem('hacm-lang', newLang);
        window.history.pushState({}, '', `?lang=${newLang}`);
    };

    const handleExportPDF = async () => {
        if (isGeneratingPDF || !contentRef.current) return;

        setIsGeneratingPDF(true);
        setProgress(0);

        try {
            const fileName = getFileName(content);

            await exportPDF({
                element: contentRef.current,
                fileName,
                contentWidth: 900,
                margin: 40,
                scale: 2,
                includeFooter: true,
                onProgress: setProgress,
            });

            setIsGeneratingPDF(false);
            setProgress(100);

        } catch (error) {
            console.error('Export failed:', error);
            alert('Ocorreu um erro ao gerar o PDF. Tente novamente.');
            setIsGeneratingPDF(false);
            setProgress(0);
        }
    };

    if (!content || !content.sections || content.sections.length < 1) {
        return (
            <main className="relative min-h-screen bg-white flex items-center justify-center">
                <div className="text-[#0F4C8A]">Loading...</div>
            </main>
        );
    }

    return (
        <main className="relative min-h-screen bg-white">
            <Navigation content={content} lang={lang} />

            {isClient && (
                <div className="fixed top-4 right-4 z-50">
                    <LanguageSelector
                        currentLang={lang}
                        onLanguageChange={handleLanguageChange}
                        languages={languages}
                    />
                </div>
            )}

            {isClient && (
                <div className="fixed bottom-6 left-6 z-50 hidden md:block">
                    <ResolutionBadge />
                </div>
            )}

            <div className="pt-20 pb-16 max-w-4xl mx-auto px-4" ref={contentRef} id="case-study">
                {content.sections.map((section, index) => (
                    <SectionRenderer key={index} section={section} index={index} />
                ))}

                {/* ── Botões ── */}
                <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a
                        href="/mini-cases/modeling-sap-and-non-sap-data-at-the-right-grain"
                        className="inline-block px-6 py-3 text-[#0F4C8A] border border-[#0F4C8A] rounded-lg hover:bg-[#0F4C8A] hover:text-white transition-colors"
                    >
                        ← {content.backLabel || 'Back to case study'}
                    </a>
                    <button
                        onClick={handleExportPDF}
                        disabled={isGeneratingPDF}
                        className="inline-block px-6 py-3 bg-[#00B4A0] text-white rounded-lg hover:bg-[#009B8A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 min-w-[160px] justify-center"
                    >
                        {isGeneratingPDF ? (
                            <>
                                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                {progress > 0 ? `${Math.round(progress)}%` : 'Gerando...'}
                            </>
                        ) : (
                            <>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                Salvar como PDF
                            </>
                        )}
                    </button>
                </div>
            </div>

            <footer className="bg-[#0F4C8A] py-6">
                <div className="w-full max-w-6xl mx-auto px-4 text-center">
                    <p className="text-sm text-white/60">
                        {content.footer?.text || 'Enterprise Analytics Architecture'}
                    </p>
                    <p className="text-xs text-white/40 mt-1">
                        {content.footer?.brand || '~Å~'}
                    </p>
                </div>
            </footer>
        </main>
    );
}