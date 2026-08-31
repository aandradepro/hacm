'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Navigation from '@/components/ui/Navigation';
import ExportButton from '@/components/ui/ExportButton';
import ResolutionBadge from '@/components/ui/ResolutionBadge';
import LanguageSelector from '@/components/ui/LanguageSelector';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { getFileName } from '@/lib/content/getFileName';
import { exportPDF } from '@/lib/exportPDF';
import { Language, getContent, languages } from './data';
import {
    componentRegistry,
    hasComponent,
    getComponent,
    mapComponentProps
} from '@/lib/content/component-registry';
import { FromAmbiguityToArchitecturePage } from '@/content-model/pages/from-ambiguity-to-architecture';

// ── Component Renderer ────────────────────────────────────────────────────────

function ComponentRenderer({ component }: { component: any }) {
    if (!component) {
        console.warn('⚠️ ComponentRenderer: component is null/undefined');
        return null;
    }

    const { componentType, content } = component;

    if (!componentType || !hasComponent(componentType)) {
        console.warn(`❌ Unknown componentType: ${componentType}`);
        return null;
    }

    const Component = getComponent(componentType);
    if (!Component) {
        console.warn(`❌ No component found for type: ${componentType}`);
        return null;
    }

    const props = mapComponentProps(componentType, content);
    return <Component {...props} />;
}

// ── Page Content ──────────────────────────────────────────────────────────────

export default function PitchDeck() {
    const searchParams = useSearchParams();
    const [isClient, setIsClient] = useState(false);
    const [lang, setLang] = useState<Language>('en');
    const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState<Error | null>(null);

    // Carregar conteúdo com try-catch
    let content;
    try {
        content = getContent(lang);
        // console.log('📄 Content loaded:', {
        //     hasSections: !!content?.sections,
        //     sectionsCount: content?.sections?.length || 0
        // });
    } catch (err) {
        console.error('❌ Error loading content:', err);
        setError(err instanceof Error ? err : new Error('Unknown error'));
        content = null;
    }

    const isDev = process.env.NODE_ENV === 'development';

    useEffect(() => {
        setIsClient(true);
        console.log('✅ Client mounted');

        try {
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
        } catch (err) {
            console.error('❌ Error in useEffect:', err);
        }
    }, [searchParams]);

    const handleLanguageChange = (newLang: Language) => {
        setLang(newLang);
        localStorage.setItem('hacm-lang', newLang);
        window.history.pushState({}, '', `?lang=${newLang}`);
    };

    const handleExportPDF = async () => {
        if (isGeneratingPDF || !content) return;

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

        } catch (err) {
            console.error('Export failed:', err);
            alert('Ocorreu um erro ao gerar o PDF. Tente novamente.');
            setIsGeneratingPDF(false);
            setProgress(0);
        }
    };

    // ── Estado de erro ──
    if (error) {
        return (
            <main className="relative min-h-screen bg-white flex items-center justify-center">
                <div className="text-center p-8">
                    <h2 className="text-2xl font-bold text-red-600 mb-4">Erro ao carregar a página</h2>
                    <p className="text-[#2D3748]">{error.message}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-4 px-4 py-2 bg-[#0F4C8A] text-white rounded-lg hover:bg-[#0A3A6E]"
                    >
                        Recarregar
                    </button>
                </div>
            </main>
        );
    }

    // ── Estado de loading ──
    if (!content || !content.sections || content.sections.length < 1) {
        console.log('⏳ Loading: content or sections missing');
        return (
            <main className="relative min-h-screen bg-white flex items-center justify-center">
                <div className="text-[#0F4C8A]">Loading...</div>
            </main>
        );
    }

    // Extrair seções
    const sectionsMap = content.sections.reduce((acc, section) => {
        acc[section.id] = section;
        return acc;
    }, {} as Record<string, typeof content.sections[number]>);

    const heroSection = sectionsMap['hero'];
    const problemSection = sectionsMap['problem'];
    const approachSection = sectionsMap['approach'];
    const resultsSection = sectionsMap['results'];
    const architectureSection = sectionsMap['architecture'];
    const ctaSection = sectionsMap['cta'];
    const footerSection = sectionsMap['footer'];

    //    console.log('📊 Sections loaded:', Object.keys(sectionsMap));

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
                        fileName={getFileName(content)}
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
                {/* ── HERO ── */}
                {heroSection && (
                    <section id="hero" className="snap-section relative flex flex-col items-center justify-center min-h-screen">
                        {isDev && (
                            <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-yellow-400 text-black text-xs font-mono font-bold rounded">
                                HERO
                            </div>
                        )}
                        <div className="w-full max-w-6xl mx-auto text-center px-4">
                            <AnimatedSection direction="up" delay={0}>
                                <div className="mt-8 flex items-center justify-center gap-4 mb-5">
                                    <div className="w-12 h-0.5 bg-[#00B4A0]" />
                                    <span className="text-sm font-medium text-[#00B4A0] tracking-widest uppercase">
                                        {heroSection.content.heading}
                                    </span>
                                    <div className="w-12 h-0.5 bg-[#00B4A0]" />
                                </div>
                            </AnimatedSection>
                            <AnimatedSection direction="up" delay={150}>
                                <h1 className="heading-1 text-[#0F4C8A] mb-4">
                                    {heroSection.content.title}
                                </h1>
                            </AnimatedSection>
                            <AnimatedSection direction="up" delay={300}>
                                <p className="body-text text-[#2D3748] max-w-3xl mx-auto">
                                    {heroSection.content.subtitle}
                                </p>
                            </AnimatedSection>
                            <AnimatedSection direction="up" delay={450}>
                                <ComponentRenderer component={heroSection.content.tags} />
                            </AnimatedSection>
                        </div>
                    </section>
                )}

                {/* ── PROBLEM ── */}
                {problemSection && (
                    <section id="problem" className="snap-section relative flex flex-col items-center justify-center py-20 bg-[#F8FAFC]">
                        {isDev && (
                            <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-yellow-400 text-black text-xs font-mono font-bold rounded">
                                PROBLEM
                            </div>
                        )}
                        <div className="w-full max-w-6xl mx-auto px-4">
                            <AnimatedSection direction="up" delay={0}>
                                <span className="text-sm font-semibold text-[#00B4A0] tracking-widest uppercase">
                                    {problemSection.content.badge}
                                </span>
                            </AnimatedSection>
                            <AnimatedSection direction="up" delay={150}>
                                <h2 className="heading-1 text-[#0F4C8A] mt-2 mb-2">
                                    {problemSection.content.title}
                                </h2>
                            </AnimatedSection>
                            <AnimatedSection direction="up" delay={300}>
                                <ComponentRenderer component={problemSection.content.points} />
                            </AnimatedSection>
                            <AnimatedSection direction="up" delay={450}>
                                <ComponentRenderer component={problemSection.content.pills} />
                            </AnimatedSection>
                            <AnimatedSection direction="up" delay={450}>
                                <ComponentRenderer component={problemSection.content.SAPPerspective} />
                            </AnimatedSection>
                        </div>
                    </section>
                )}

                {/* ── APPROACH ── */}
                {approachSection && (
                    <section id="approach" className="snap-section relative flex flex-col items-center justify-center py-20">
                        {isDev && (
                            <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-yellow-400 text-black text-xs font-mono font-bold rounded">
                                APPROACH
                            </div>
                        )}
                        <div className="w-full max-w-6xl mx-auto px-4">
                            <AnimatedSection direction="up" delay={0}>
                                <span className="text-sm font-semibold text-[#00B4A0] tracking-widest uppercase">
                                    {approachSection.content.badge}
                                </span>
                            </AnimatedSection>
                            <AnimatedSection direction="up" delay={150}>
                                <h2 className="heading-1 text-[#0F4C8A] mt-2 mb-2">
                                    {approachSection.content.title}
                                </h2>
                            </AnimatedSection>
                            <AnimatedSection direction="up" delay={300}>
                                <p className="body-text text-[#2D3748] max-w-3xl mb-6">
                                    {approachSection.content.intro}
                                </p>
                            </AnimatedSection>
                            <AnimatedSection direction="up" delay={450}>
                                <ComponentRenderer component={approachSection.content.steps} />
                            </AnimatedSection>
                            <AnimatedSection direction="up" delay={450}>
                                <ComponentRenderer component={approachSection.content.SAPPerspective} />
                            </AnimatedSection>
                        </div>
                    </section>
                )}

                {/* ── RESULTS ── */}
                {resultsSection && (
                    <section id="results" className="snap-section relative flex flex-col items-center justify-center py-20 bg-[#F8FAFC]">
                        {isDev && (
                            <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-yellow-400 text-black text-xs font-mono font-bold rounded">
                                RESULTS
                            </div>
                        )}
                        <div className="w-full max-w-6xl mx-auto px-4">
                            <AnimatedSection direction="up" delay={0}>
                                <span className="text-sm font-semibold text-[#00B4A0] tracking-widest uppercase">
                                    {resultsSection.content.badge}
                                </span>
                            </AnimatedSection>
                            <AnimatedSection direction="up" delay={150}>
                                <h2 className="heading-1 text-[#0F4C8A] mt-2 mb-6">
                                    {resultsSection.content.title}
                                </h2>
                            </AnimatedSection>
                            <AnimatedSection direction="up" delay={300}>
                                <p className="body-text text-[#2D3748] max-w-3xl mb-6">
                                    {architectureSection.content.subtitle}
                                </p>
                            </AnimatedSection>
                            <AnimatedSection direction="up" delay={450}>
                                <ComponentRenderer component={resultsSection.content.cards} />
                            </AnimatedSection>
                            <AnimatedSection direction="up" delay={600}>
                                <ComponentRenderer component={resultsSection.content.SAPPerspective} />
                            </AnimatedSection>
                        </div>
                    </section>
                )}

                {/* ── ARCHITECTURE ── */}
                {architectureSection && (
                    <section id="architecture" className="snap-section relative flex flex-col items-center justify-center py-20">
                        {isDev && (
                            <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-yellow-400 text-black text-xs font-mono font-bold rounded">
                                ARCHITECTURE
                            </div>
                        )}
                        <div className="w-full max-w-6xl mx-auto px-4">
                            <AnimatedSection direction="up" delay={0}>
                                <span className="text-sm font-semibold text-[#00B4A0] tracking-widest uppercase">
                                    {architectureSection.content.badge}
                                </span>
                            </AnimatedSection>
                            <AnimatedSection direction="up" delay={150}>
                                <h2 className="heading-1 text-[#0F4C8A] mt-2 mb-2">
                                    {architectureSection.content.title}
                                </h2>
                            </AnimatedSection>
                            <AnimatedSection direction="up" delay={300}>
                                <p className="body-text text-[#2D3748] max-w-3xl mb-6">
                                    {architectureSection.content.subtitle}
                                </p>
                            </AnimatedSection>
                            <AnimatedSection direction="up" delay={450}>
                                <ComponentRenderer component={architectureSection.content.points} />
                            </AnimatedSection>
                            <AnimatedSection direction="up" delay={600}>
                                <ComponentRenderer component={architectureSection.content.dialectic} />
                            </AnimatedSection>
                            <AnimatedSection direction="up" delay={750}>
                                <ComponentRenderer component={architectureSection.content.SAPPerspective} />
                            </AnimatedSection>
                        </div>
                    </section>
                )}

                {/* ── CTA ── */}
                {ctaSection && (
                    <section id="cta" className="snap-section relative flex flex-col items-center justify-center py-20 bg-[#F8FAFC]">
                        {isDev && (
                            <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-yellow-400 text-black text-xs font-mono font-bold rounded">
                                CTA
                            </div>
                        )}
                        <div className="w-full max-w-6xl mx-auto px-4">
                            <AnimatedSection direction="up" delay={0}>
                                <span className="text-sm font-semibold text-[#00B4A0] tracking-widest uppercase">
                                    {ctaSection.content.badge}
                                </span>
                            </AnimatedSection>
                            <AnimatedSection direction="up" delay={150}>
                                <h2 className="heading-1 text-[#0F4C8A] mt-2 mb-8">
                                    {ctaSection.content.title}
                                </h2>
                            </AnimatedSection>
                            <AnimatedSection direction="up" delay={300}>
                                <p className="body-text text-[#2D3748] max-w-3xl mb-6">
                                    {architectureSection.content.subtitle}
                                </p>
                            </AnimatedSection>
                            <AnimatedSection direction="up" delay={300}>
                                <ComponentRenderer component={ctaSection.content.pillars} />
                            </AnimatedSection>
                            <AnimatedSection direction="up" delay={450}>
                                <ComponentRenderer component={ctaSection.content.SAPPerspective} />
                            </AnimatedSection>
                            <AnimatedSection direction="up" delay={450}>
                                <ComponentRenderer component={ctaSection.content.contact} />
                            </AnimatedSection>
                        </div>
                    </section>
                )}

                {/* ── FOOTER ── */}
                {footerSection && (
                    <footer className="bg-[#0F4C8A] py-6">
                        <div className="w-full max-w-6xl mx-auto px-4 text-center">
                            <p className="text-sm text-white/60">{footerSection.content.text}</p>
                            <p className="text-xs text-white/40 mt-1">{footerSection.content.brand}</p>
                        </div>
                    </footer>
                )}
            </div>
        </main>
    );
}