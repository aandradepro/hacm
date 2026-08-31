'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Navigation from '@/components/ui/Navigation';
import ResolutionBadge from '@/components/ui/ResolutionBadge';
import LanguageSelector from '@/components/ui/LanguageSelector';
import ExportButton from '@/components/ui/ExportButton';
import AnimatedSection from '@/components/ui/AnimatedSection';
import ContactButtons from '@/components/ui/ContactButtons';
import { getFileName } from '@/lib/content/getFileName';
import { exportPDF } from '@/lib/exportPDF';
import { Language, getContent, languages } from './data';
import {
    componentRegistry,
    hasComponent,
    getComponent,
    mapComponentProps
} from '@/lib/content/component-registry';
import { CoordinatingEnterpriseAnalyticsPage } from '@/content-model/pages/coordinating-enterprise-analytics';

// ── Component Renderer ────────────────────────────────────────────────────────

function ComponentRenderer({ component }: { component: any }) {
    if (!component) {
        console.warn('⚠️ ComponentRenderer: component is null/undefined');
        return null;
    }

    const { componentType, content } = component;

    //    console.log('🔍 ComponentRenderer:', { componentType, content, hasContent: !!content });

    if (!componentType) {
        console.warn('⚠️ ComponentRenderer: no componentType');
        return null;
    }

    const hasComp = hasComponent(componentType);
    //    console.log(`🔍 hasComponent("${componentType}"):`, hasComp);

    if (!hasComp) {
        console.warn(`❌ Unknown componentType: ${componentType}`);
        console.log('📋 Available types:', Object.keys(componentRegistry));
        return null;
    }

    const Component = getComponent(componentType);
    if (!Component) {
        console.warn(`❌ No component found for type: ${componentType}`);
        return null;
    }

    const props = mapComponentProps(componentType, content);
    //    console.log(`✅ Rendering ${componentType} with props:`, props);

    return <Component {...props} />;
}

// ── Section Renderer ──────────────────────────────────────────────────────────

function SectionRenderer({ section }: { section: CoordinatingEnterpriseAnalyticsPage['sections'][number] }) {
    const { id, content } = section;

    switch (id) {
        case 'hero':
            return (
                <div className="w-full max-w-6xl mx-auto text-center px-4">
                    <AnimatedSection direction="up" delay={0}>
                        <div className="mt-8 flex items-center justify-center gap-4 mb-5">
                            <div className="w-12 h-0.5 bg-[#00B4A0]" />
                            <span className="text-sm font-medium text-[#00B4A0] tracking-widest uppercase">
                                {content.heading}
                            </span>
                            <div className="w-12 h-0.5 bg-[#00B4A0]" />
                        </div>
                    </AnimatedSection>
                    <AnimatedSection direction="up" delay={150}>
                        <h1 className="heading-1 text-[#0F4C8A] mb-4">
                            {content.title}
                        </h1>
                    </AnimatedSection>
                    <AnimatedSection direction="up" delay={300}>
                        <p className="body-text text-[#2D3748] max-w-3xl mx-auto">
                            {content.subtitle}
                        </p>
                    </AnimatedSection>
                    <AnimatedSection direction="up" delay={450}>
                        <ComponentRenderer component={content.tags} />
                    </AnimatedSection>
                </div>
            );

        case 'problem':
            return (
                <div className="w-full max-w-6xl mx-auto px-4">
                    <AnimatedSection direction="up" delay={0}>
                        <span className="text-sm font-semibold text-[#00B4A0] tracking-widest uppercase">
                            {content.badge}
                        </span>
                    </AnimatedSection>
                    <AnimatedSection direction="up" delay={150}>
                        <h2 className="heading-1 text-[#0F4C8A] mt-2 mb-2">
                            {content.title}
                        </h2>
                    </AnimatedSection>
                    <AnimatedSection direction="up" delay={300}>
                        <p className="body-text text-[#2D3748] max-w-3xl mb-6">
                            {content.subtitle}
                        </p>
                    </AnimatedSection>
                    <AnimatedSection direction="up" delay={450}>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                            <div>
                                <ComponentRenderer component={content.list} />
                            </div>
                            <div className="flex justify-center lg:justify-end">
                                <ComponentRenderer component={content.convergence} />
                            </div>
                        </div>
                    </AnimatedSection>
                    <AnimatedSection direction="up" delay={450}>
                        <ComponentRenderer component={content.SAPPerspective} />
                    </AnimatedSection>
                    <AnimatedSection direction="up" delay={450}>
                        <ComponentRenderer component={content.message} />
                    </AnimatedSection>
                </div>
            );

        case 'thesis':
            return (
                <div className="w-full max-w-6xl mx-auto px-4">
                    <AnimatedSection direction="up" delay={0}>
                        <span className="text-sm font-semibold text-[#00B4A0] tracking-widest uppercase">
                            {content.badge}
                        </span>
                    </AnimatedSection>
                    <AnimatedSection direction="up" delay={150}>
                        <h2 className="heading-1 text-[#0F4C8A] mt-2 mb-2">
                            {content.title}
                        </h2>
                    </AnimatedSection>
                    <AnimatedSection direction="up" delay={300}>
                        <p className="body-text text-[#2D3748] max-w-3xl mb-6">
                            {content.subtitle}
                        </p>
                    </AnimatedSection>
                    <AnimatedSection direction="up" delay={450}>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                            <div>
                                <ComponentRenderer component={content.list} />
                            </div>
                            <div className="flex justify-center lg:justify-end">
                                {content.flowVDiagram && (
                                    <ComponentRenderer component={content.flowVDiagram} />
                                )}
                            </div>
                        </div>
                    </AnimatedSection>
                    <AnimatedSection direction="up" delay={450}>
                        {content.SAPPerspective && (
                            <ComponentRenderer component={content.SAPPerspective} />
                        )}
                    </AnimatedSection>
                    <AnimatedSection direction="up" delay={450}>
                        {content.message && (
                            <ComponentRenderer component={content.message} />
                        )}
                    </AnimatedSection>
                </div>
            );
        case 'evidence':
            return (
                <div className="w-full max-w-6xl mx-auto px-4">
                    <AnimatedSection direction="up" delay={0}>
                        <span className="text-sm font-semibold text-[#00B4A0] tracking-widest uppercase">
                            {content.badge}
                        </span>
                    </AnimatedSection>
                    <AnimatedSection direction="up" delay={150}>
                        <h2 className="heading-1 text-[#0F4C8A] mt-2 mb-6">
                            {content.title}
                        </h2>
                    </AnimatedSection>
                    <AnimatedSection direction="up" delay={300}>
                        <ComponentRenderer component={content.cards} />
                    </AnimatedSection>
                    <AnimatedSection direction="up" delay={450}>
                        <ComponentRenderer component={content.SAPPerspective} />
                    </AnimatedSection>
                    <AnimatedSection direction="up" delay={450}>
                        <ComponentRenderer component={content.message} />
                    </AnimatedSection>
                </div>
            );

        case 'architecture':
            return (
                <div className="w-full max-w-6xl mx-auto px-4">
                    <AnimatedSection direction="up" delay={0}>
                        <span className="text-sm font-semibold text-[#00B4A0] tracking-widest uppercase">
                            {content.badge}
                        </span>
                    </AnimatedSection>
                    <AnimatedSection direction="up" delay={150}>
                        <h2 className="heading-1 text-[#0F4C8A] mt-2 mb-2">
                            {content.title}
                        </h2>
                    </AnimatedSection>
                    <AnimatedSection direction="up" delay={300}>
                        <p className="body-text text-[#2D3748] max-w-3xl mb-6">
                            {content.subtitle}
                        </p>
                    </AnimatedSection>
                    <AnimatedSection direction="up" delay={450}>
                        <ComponentRenderer component={content.relationship} />
                    </AnimatedSection>
                    <AnimatedSection direction="up" delay={450}>
                        <ComponentRenderer component={content.SAPPerspective} />
                    </AnimatedSection>
                    <AnimatedSection direction="up" delay={450}>
                        <ComponentRenderer component={content.message} />
                    </AnimatedSection>
                </div>
            );

        case 'value':
            return (
                <div className="w-full max-w-6xl mx-auto px-4">
                    <AnimatedSection direction="up" delay={0}>
                        <span className="text-sm font-semibold text-[#00B4A0] tracking-widest uppercase">
                            {content.badge}
                        </span>
                    </AnimatedSection>
                    <AnimatedSection direction="up" delay={150}>
                        <h2 className="heading-1 text-[#0F4C8A] mt-2 mb-2">
                            {content.title}
                        </h2>
                    </AnimatedSection>
                    <AnimatedSection direction="up" delay={300}>
                        <p className="body-text text-[#2D3748] max-w-3xl mb-2">
                            {content.subtitle}
                        </p>
                    </AnimatedSection>
                    <AnimatedSection direction="up" delay={450}>
                        <p className="text-lg font-semibold text-[#0F4C8A] mb-6">
                            {content.emphasis}
                        </p>
                    </AnimatedSection>
                    <AnimatedSection direction="up" delay={450}>
                        <ComponentRenderer component={content.orbit} />
                    </AnimatedSection>
                    <AnimatedSection direction="up" delay={450}>
                        <ComponentRenderer component={content.SAPPerspective} />
                    </AnimatedSection>
                    <AnimatedSection direction="up" delay={450}>
                        <ComponentRenderer component={content.message} />
                    </AnimatedSection>
                </div>
            );

        case 'cta':
            return (
                <div className="w-full max-w-6xl mx-auto px-4">
                    <AnimatedSection direction="up" delay={0}>
                        <span className="text-sm font-semibold text-[#00B4A0] tracking-widest uppercase">
                            {content.badge}
                        </span>
                    </AnimatedSection>
                    <AnimatedSection direction="up" delay={150}>
                        <h2 className="heading-1 text-[#0F4C8A] mt-2 mb-8">
                            {content.title}
                        </h2>
                    </AnimatedSection>
                    <AnimatedSection direction="up" delay={300}>
                        <ComponentRenderer component={content.pillars} />
                    </AnimatedSection>
                    {content.SAPPerspective && (
                        <AnimatedSection direction="up" delay={450}>
                            <ComponentRenderer component={content.SAPPerspective} />
                        </AnimatedSection>
                    )}
                    <AnimatedSection direction="up" delay={450}>
                        <ContactButtons contact={content.contact} />
                    </AnimatedSection>
                </div>
            );

        case 'footer':
            return (
                <footer className="bg-[#0F4C8A] py-6">
                    <div className="w-full max-w-6xl mx-auto px-4 text-center">
                        <p className="text-sm text-white/60">{content.text}</p>
                        <p className="text-xs text-white/40 mt-1">{content.brand}</p>
                    </div>
                </footer>
            );

        default:
            console.warn(`Unknown section id: ${id}`);
            return null;
    }
}

// ── Page Content ──────────────────────────────────────────────────────────────

export default function PitchDeck() {
    const searchParams = useSearchParams();
    const [isClient, setIsClient] = useState(false);
    const [lang, setLang] = useState<Language>('en');
    const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
    const [progress, setProgress] = useState(0);
    const content = getContent(lang) as CoordinatingEnterpriseAnalyticsPage;
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
        if (isGeneratingPDF) return;

        setIsGeneratingPDF(true);
        setProgress(0);

        try {
            const fileName = getFileName(content);

            await exportPDF({
                element: document.querySelector('.snap-container') as HTMLElement,
                fileName,
                contentWidth: 1152,
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
                <div className="fixed bottom-6 right-6 z-50">
                    <ExportButton
                        fileName={getFileName(content)}  // ← Usar getFileName
                        label="Export PDF"
                    />
                </div>
            )}
            {isClient && (
                <div className="fixed bottom-6 left-6 z-50 hidden md:block">
                    <ResolutionBadge />
                </div>
            )}

            <div className="snap-container">
                {content.sections.map((section, index) => {
                    // Determinar cor de fundo
                    let bgClass = '';
                    if (section.id === 'hero' || section.id === 'thesis' || section.id === 'architecture' || section.id === 'cta') {
                        bgClass = '';
                    } else if (section.id === 'problem' || section.id === 'evidence' || section.id === 'value') {
                        bgClass = 'bg-[#F8FAFC]';
                    } else if (section.id === 'footer') {
                        return <SectionRenderer key={index} section={section} />;
                    }

                    return (
                        <section
                            key={index}
                            id={section.id}
                            className={`snap-section relative flex flex-col items-center justify-center ${section.id === 'hero' ? 'min-h-screen' : 'py-20'} ${bgClass}`}
                        >
                            {isDev && (
                                <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-yellow-400 text-black text-xs font-mono font-bold rounded">
                                    {section.id.toUpperCase()}
                                </div>
                            )}
                            <SectionRenderer section={section} />
                        </section>
                    );
                })}
            </div>
        </main>
    );
}