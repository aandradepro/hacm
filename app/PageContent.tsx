'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Navigation from '@/components/ui/Navigation';
import LanguageSelector from '@/components/ui/LanguageSelector';
import ResolutionBadge from '@/components/ui/ResolutionBadge';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Tags from '@/components/ui/Tags';
import ContactButtons from '@/components/ui/ContactButtons';
import { Language, getContent, languages } from './data';
import {
    componentRegistry,
    hasComponent,
    getComponent,
    mapComponentProps
} from '@/lib/content/component-registry';
import { LandingPage } from '@/content-model/pages/landing-page';

// ── Component Renderer ────────────────────────────────────────────────────────

function ComponentRenderer({ component, ...props }: { component: any;[key: string]: any }) {
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

    const mappedProps = mapComponentProps(componentType, content);
    const finalProps = { ...mappedProps, ...props };

    return <Component {...finalProps} />;
}

// ── Section Renderer ──────────────────────────────────────────────────────────

function SectionRenderer({ section }: { section: LandingPage['sections'][number] }) {
    const { id, content } = section;

    switch (id) {
        case 'hero':
            return (
                <div className="w-full max-w-6xl mx-auto text-center px-4">
                    <AnimatedSection direction="up" delay={50}>
                        <div className="mt-8 flex items-center justify-center gap-4 mb-5">
                            <div className="w-12 h-0.5 bg-[#00B4A0]" />
                            <span className="text-sm font-medium text-[#00B4A0] tracking-widest uppercase">
                                {content.heading}
                            </span>
                            <div className="w-12 h-0.5 bg-[#00B4A0]" />
                        </div>
                    </AnimatedSection>
                    <AnimatedSection direction="up" delay={150}>
                        <h1 className="heading-1 text-[#0F4C8A] mb-9">
                            {content.title}
                        </h1>
                    </AnimatedSection>
                    <AnimatedSection direction="up" delay={300}>
                        <p className="body-text text-[#2D3748] max-w-3xl mx-auto mb-12">
                            {content.subtitle}
                        </p>
                    </AnimatedSection>
                    <AnimatedSection direction="up" delay={450}>
                        <Tags items={content.tags} />
                    </AnimatedSection>
                </div>
            );

        case 'focus':
            return (
                <div className="w-full max-w-6xl mx-auto">
                    <AnimatedSection direction="up" delay={0}>
                        <h2 className="heading-1 text-[#0F4C8A] text-center mb-2">
                            {content.title}
                        </h2>
                    </AnimatedSection>
                    <AnimatedSection direction="up" delay={150}>
                        <p className="body-text text-[#2D3748] text-center max-w-3xl mx-auto mb-8">
                            {content.subtitle}
                        </p>
                    </AnimatedSection>
                    <AnimatedSection direction="up" delay={300}>
                        <ComponentRenderer component={content.cards} />
                    </AnimatedSection>
                </div>
            );

        case 'architecture':
            return (
                <div className="w-full max-w-6xl mx-auto text-center px-4">
                    <AnimatedSection direction="up" delay={0}>
                        <h2 className="heading-1 text-[#0F4C8A] mb-2">
                            {content.title}
                        </h2>
                    </AnimatedSection>
                    <AnimatedSection direction="up" delay={150}>
                        <p className="body-text text-[#2D3748] max-w-3xl mx-auto mb-12">
                            {content.subtitle}
                        </p>
                    </AnimatedSection>
                    <AnimatedSection direction="up" delay={300}>
                        <div className="flex flex-col lg:flex-row items-center gap-8">
                            <ComponentRenderer component={content.points} align="left" />
                            <ComponentRenderer component={content.balanceDiagram} />
                        </div>
                    </AnimatedSection>
                </div>
            );

        case 'pitch-decks':
            return (
                <div className="w-full max-w-6xl mx-auto">
                    <AnimatedSection direction="up" delay={0}>
                        <h2 className="heading-1 text-[#0F4C8A] text-center mb-2">
                            {content.title}
                        </h2>
                    </AnimatedSection>
                    <AnimatedSection direction="up" delay={150}>
                        <p className="body-text text-[#2D3748] text-center max-w-3xl mx-auto mb-8">
                            {content.subtitle}
                        </p>
                    </AnimatedSection>
                    <AnimatedSection direction="up" delay={300}>
                        <ComponentRenderer component={content.cards} />
                    </AnimatedSection>
                </div>
            );

        case 'case-studies':
            return (
                <div className="w-full max-w-6xl mx-auto">
                    <AnimatedSection direction="up" delay={0}>
                        <h2 className="heading-1 text-[#0F4C8A] text-center mb-2">
                            {content.title}
                        </h2>
                    </AnimatedSection>
                    <AnimatedSection direction="up" delay={150}>
                        <p className="body-text text-[#2D3748] text-center max-w-3xl mx-auto mb-8">
                            {content.subtitle}
                        </p>
                    </AnimatedSection>
                    <AnimatedSection direction="up" delay={300}>
                        <ComponentRenderer component={content.cards} />
                    </AnimatedSection>
                </div>
            );

        case 'contact':
            return (
                <div className="w-full max-w-6xl mx-auto text-center">
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
                        <ContactButtons contact={content.contact} />
                    </AnimatedSection>
                </div>
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
    const content = getContent(lang) as LandingPage;
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

    const sectionsMap = content.sections.reduce((acc, section) => {
        acc[section.id] = section;
        return acc;
    }, {} as Record<string, typeof content.sections[number]>);

    const heroSection = sectionsMap['hero'];
    const focusSection = sectionsMap['focus'];
    const architectureSection = sectionsMap['architecture'];
    const pitchDecksSection = sectionsMap['pitch-decks'];
    const caseStudiesSection = sectionsMap['case-studies'];
    const contactSection = sectionsMap['contact'];

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
                {/* HERO */}
                {heroSection && (
                    <section id="hero" className="snap-section relative flex flex-col items-center justify-center min-h-screen">
                        {isDev && (
                            <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-yellow-400 text-black text-xs font-mono font-bold rounded">
                                HERO
                            </div>
                        )}
                        <SectionRenderer section={heroSection} />
                    </section>
                )}

                {/* FOCUS */}
                {focusSection && (
                    <section id="focus" className="snap-section relative flex flex-col items-center justify-center py-20 px-4 bg-[#F8FAFC]">
                        {isDev && (
                            <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-yellow-400 text-black text-xs font-mono font-bold rounded">
                                FOCUS
                            </div>
                        )}
                        <SectionRenderer section={focusSection} />
                    </section>
                )}

                {/* ARCHITECTURE */}
                {architectureSection && (
                    <section id="architecture" className="snap-section relative flex flex-col items-center justify-center py-20">
                        {isDev && (
                            <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-yellow-400 text-black text-xs font-mono font-bold rounded">
                                ARCHITECTURE
                            </div>
                        )}
                        <SectionRenderer section={architectureSection} />
                    </section>
                )}

                {/* PITCH DECKS */}
                {pitchDecksSection && (
                    <section id="pitch-decks" className="snap-section relative flex flex-col items-center justify-center py-20 bg-[#F8FAFC]">
                        {isDev && (
                            <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-yellow-400 text-black text-xs font-mono font-bold rounded">
                                PITCH DECKS
                            </div>
                        )}
                        <SectionRenderer section={pitchDecksSection} />
                    </section>
                )}

                {/* CASE STUDIES */}
                {caseStudiesSection && (
                    <section id="case-studies" className="snap-section relative flex flex-col items-center justify-center py-20">
                        {isDev && (
                            <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-yellow-400 text-black text-xs font-mono font-bold rounded">
                                CASE STUDIES
                            </div>
                        )}
                        <SectionRenderer section={caseStudiesSection} />
                    </section>
                )}

                {/* CONTACT */}
                {contactSection && (
                    <section id="contact" className="snap-section relative flex flex-col items-center justify-center py-20 bg-[#F8FAFC]">
                        {isDev && (
                            <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-yellow-400 text-black text-xs font-mono font-bold rounded">
                                CONTACT
                            </div>
                        )}
                        <SectionRenderer section={contactSection} />
                    </section>
                )}

                <footer className="bg-[#0F4C8A] py-6">
                    <div className="w-full max-w-6xl mx-auto px-4 text-center">
                        <p className="text-sm text-white/60">
                            Enterprise Analytics Architecture · Governance · Semantic Consistency · Modernization
                        </p>
                        <p className="text-xs text-white/40 mt-1">~Å~</p>
                    </div>
                </footer>
            </div>
        </main>
    );
}