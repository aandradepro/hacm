'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Navigation from '@/components/ui/Navigation';
import LanguageSelector from '@/components/ui/LanguageSelector';
import ResolutionBadge from '@/components/ui/ResolutionBadge';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { Language, getContent, languages } from './data';
import { componentRegistry, hasComponent, getComponent, mapComponentProps } from '@/lib/content/component-registry';
import { MovingKpiProcessingPage } from '@/content-model/pages/moving-kpi-processing-overview';

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

// ── Section Header ────────────────────────────────────────────────────────────

function SectionHeader({ badge, title, subtitle }: { badge?: string; title: string; subtitle?: string }) {
    return (
        <>
            {badge && (
                <span className="text-sm font-semibold text-[#00B4A0] tracking-widest uppercase">
                    {badge}
                </span>
            )}
            <h2 className="heading-1 text-[#0F4C8A] mt-2 mb-2">{title}</h2>
            {subtitle && (
                <p className="body-text text-[#2D3748] max-w-3xl mb-6">{subtitle}</p>
            )}
        </>
    );
}

// ── Section Renderer ──────────────────────────────────────────────────────────

function SectionRenderer({ section, isDev }: { section: any; isDev: boolean }) {
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
                        <h1 className="heading-1 text-[#0F4C8A] mb-6">
                            {content.title}
                        </h1>
                    </AnimatedSection>
                    <AnimatedSection direction="up" delay={300}>
                        <p className="body-text text-[#2D3748] max-w-3xl mx-auto mb-8">
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
                                <ComponentRenderer component={content.points} />
                            </div>
                            <div>
                                {/* Título removido - agora vem do FlowHDiagram */}
                                <ComponentRenderer component={content.actual} />
                            </div>
                        </div>
                    </AnimatedSection>
                    <AnimatedSection direction="up" delay={450}>
                        <ComponentRenderer component={content.quote} />
                    </AnimatedSection>
                    <AnimatedSection direction="up" delay={450}>
                        <ComponentRenderer component={content.message} />
                    </AnimatedSection>
                </div>
            );

        case 'decision':
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
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                            <div className="flex flex-col items-center justify-center h-full">
                                {/* Título removido - agora vem do FlowHDiagram */}
                                <ComponentRenderer component={content.common} />
                            </div>
                            <div className="space-y-6">
                                <div>
                                    {/* Título removido - agora vem do FlowHDiagram */}
                                    <ComponentRenderer component={content.before} />
                                </div>
                                <div>
                                    {/* Título removido - agora vem do FlowHDiagram */}
                                    <ComponentRenderer component={content.after} />
                                </div>
                            </div>
                        </div>
                    </AnimatedSection>
                    <AnimatedSection direction="up" delay={450}>
                        <ComponentRenderer component={content.quote} />
                    </AnimatedSection>
                    <AnimatedSection direction="up" delay={450}>
                        <ComponentRenderer component={content.sapPerspective} />
                    </AnimatedSection>
                </div>
            );

        case 'metadata':
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
                        <ComponentRenderer component={content.orbit} />
                    </AnimatedSection>
                    <AnimatedSection direction="up" delay={450}>
                        <ComponentRenderer component={content.cards} />
                    </AnimatedSection>
                </div>
            );

        case 'results':
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
                    {content.improvements && (
                        <AnimatedSection direction="up" delay={450}>
                            <div className="mt-8 p-6 bg-[#F8FAFC] rounded-lg border border-[#E8EEF4]">
                                <h3 className="text-lg font-semibold text-[#0F4C8A] mb-4">
                                    {content.improvements.title}
                                </h3>
                                <ComponentRenderer component={content.improvements.listImprovements} />
                            </div>
                        </AnimatedSection>
                    )}
                </div>
            );

        case 'takeaway':
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
                        <ComponentRenderer component={content.points} />
                    </AnimatedSection>
                    <AnimatedSection direction="up" delay={450}>
                        <ComponentRenderer component={content.sapPerspective} />
                    </AnimatedSection>
                    <AnimatedSection direction="up" delay={450}>
                        <ComponentRenderer component={content.message} />
                    </AnimatedSection>
                </div>
            );

        case 'cta':
            return (
                <div className="w-full max-w-6xl mx-auto text-center px-4">
                    <AnimatedSection direction="up" delay={0}>
                        <span className="text-sm font-semibold text-[#00B4A0] tracking-widest uppercase">
                            {content.badge}
                        </span>
                    </AnimatedSection>
                    <AnimatedSection direction="up" delay={150}>
                        <h2 className="heading-1 text-[#0F4C8A] mt-2 mb-4">
                            {content.title}
                        </h2>
                    </AnimatedSection>
                    <AnimatedSection direction="up" delay={300}>
                        <p className="body-text text-[#2D3748] max-w-3xl mx-auto mb-8">
                            {content.subtitle}
                        </p>
                    </AnimatedSection>
                    <AnimatedSection direction="up" delay={450}>
                        <a
                            href={content.button.href}
                            className="inline-block px-8 py-4 bg-[#0F4C8A] text-white font-semibold rounded-lg hover:bg-[#0A3A6A] transition-colors"
                        >
                            {content.button.label}
                        </a>
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

export default function PageContent() {
    const searchParams = useSearchParams();
    const [isClient, setIsClient] = useState(false);
    const [lang, setLang] = useState<Language>('en');
    const content = getContent(lang) as MovingKpiProcessingPage;
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

            <div className="snap-container">
                {content.sections.map((section, index) => {
                    let bgClass = '';
                    if (section.id === 'hero' || section.id === 'decision' || section.id === 'results' || section.id === 'cta') {
                        bgClass = '';
                    } else if (section.id === 'problem' || section.id === 'metadata' || section.id === 'takeaway') {
                        bgClass = 'bg-[#F8FAFC]';
                    } else if (section.id === 'footer') {
                        return <SectionRenderer key={index} section={section} isDev={isDev} />;
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
                            <SectionRenderer section={section} isDev={isDev} />
                        </section>
                    );
                })}
            </div>
        </main>
    );
}