'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Navigation from '@/components/ui/Navigation';
import ResolutionBadge from '@/components/ui/ResolutionBadge';
import LanguageSelector from '@/components/ui/LanguageSelector';
import Points from '@/components/ui/Points';
import Pillars from '@/components/ui/Pillars';
import ArchitectureBalance from '@/components/ui/ArchitectureBalance';
import Cards from '@/components/ui/Cards';
import ContactButtons from '@/components/ui/ContactButtons';
import Tags from '@/components/ui/Tags';
import { Language, getContent, languages } from './data';

export default function Home() {
    const searchParams = useSearchParams();
    const [isClient, setIsClient] = useState(false);
    const [lang, setLang] = useState<Language>('en');
    const content = getContent(lang);

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

    const isDev = process.env.NODE_ENV === 'development';

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
                {/* ── HERO ── */}
                <section id="hero" className="snap-section relative">
                    {isDev && (
                        <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-yellow-400 text-black text-xs font-mono font-bold rounded">
                            HERO
                        </div>
                    )}
                    <div className="w-full max-w-6xl mx-auto text-center px-4">
                        <AnimatedSection direction="up" delay={50}>
                            <div className="mt-8 flex items-center justify-center gap-4 mb-5">
                                <div className="w-12 h-0.5 bg-[#00B4A0]" />
                                <span className="text-sm font-medium text-[#00B4A0] tracking-widest uppercase">
                                    {content.hero.heading}
                                </span>
                                <div className="w-12 h-0.5 bg-[#00B4A0]" />
                            </div>
                        </AnimatedSection>
                        <AnimatedSection direction="up" delay={150}>
                            <h1 className="heading-1 text-[#0F4C8A] mb-9">
                                {content.hero.title}
                            </h1>
                        </AnimatedSection>
                        <AnimatedSection direction="up" delay={300}>
                            <p className="body-text text-[#2D3748] max-w-3xl mx-auto">
                                {content.hero.subtitle}
                            </p>
                        </AnimatedSection>
                        <AnimatedSection direction="up" delay={450}>
                            <Tags items={content.hero.tags} />
                        </AnimatedSection>
                    </div>
                </section>
                {/* ── FOCUS ── */}
                <section id="focus" className="snap-section min-h-screen flex items-center justify-center py-20 px-4 bg-[#F8FAFC] relative">
                    {isDev && (
                        <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-yellow-400 text-black text-xs font-mono font-bold rounded">
                            FOCUS
                        </div>
                    )}
                    <div className="w-full max-w-6xl mx-auto">
                        <AnimatedSection direction="up" delay={150}>
                            <h2 className="heading-1 text-[#0F4C8A] text-center mb-8">
                                {content.focus.title}
                            </h2>
                        </AnimatedSection>
                        <AnimatedSection direction="up" delay={300}>
                            <Pillars items={content.focus.items} columns={content.focus.columns} />
                        </AnimatedSection>
                    </div>
                </section>
                {/* ── ARCHITECTURE BALANCE ── */}
                <section id="architecture" className="snap-section relative flex flex-col items-center justify-center">
                    {isDev && (
                        <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-yellow-400 text-black text-xs font-mono font-bold rounded">
                            ARCHITECTURE
                        </div>
                    )}
                    <div className="w-full max-w-6xl mx-auto text-center px-4">
                        <AnimatedSection direction="up" delay={0}>
                            <h2 className="heading-1 text-[#0F4C8A] mb-2">
                                {content.architecture.title}
                            </h2>
                        </AnimatedSection>
                        <AnimatedSection direction="up" delay={150}>
                            <p className="body-text text-[#2D3748] max-w-3xl mx-auto mb-12">
                                {content.architecture.subtitle}
                            </p>
                        </AnimatedSection>

                    </div>
                    <AnimatedSection direction="up" delay={300}>
                        <div className="w-full max-w-6xl mx-auto px-4 flex items-center gap-8">
                            <Points items={content.architecture.points} />
                            <ArchitectureBalance data={content.architecture.architecture_balance} />
                        </div>
                    </AnimatedSection>
                </section>

                {/* ── PITCH DECKS ── */}
                <section id="pitch-decks" className="snap-section relative flex flex-col items-center justify-center bg-[#F8FAFC] relative">
                    {isDev && (
                        <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-yellow-400 text-black text-xs font-mono font-bold rounded">
                            PITCH DECKS
                        </div>
                    )}
                    <div className="w-full max-w-6xl mx-auto">
                        <h2 className="heading-1 text-[#0F4C8A] text-center mb-2">
                            {content.pitch_decks.title}
                        </h2>
                        <p className="body-text text-[#2D3748] text-center max-w-3xl mx-auto mb-8">
                            {content.pitch_decks.subtitle}
                        </p>
                        <Cards items={content.pitch_decks.items} columns={content.pitch_decks.columns} />
                    </div>
                </section>
                {/* ── CONTACT ── */}
                <section id="contact" className="snap-section relative flex flex-col items-center justify-center relative">
                    {isDev && (
                        <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-yellow-400 text-black text-xs font-mono font-bold rounded">
                            CONTACT
                        </div>
                    )}
                    <div className="w-full max-w-6xl mx-auto text-center">
                        <span className="text-sm font-semibold text-[#00B4A0] tracking-widest uppercase">
                            {content.contact.badge}
                        </span>
                        <h2 className="heading-1 text-[#0F4C8A] mt-2 mb-4">
                            {content.contact.title}
                        </h2>
                        <p className="body-text text-[#2D3748] max-w-3xl mx-auto mb-8">
                            {content.contact.description}
                        </p>
                        <ContactButtons contact={content.contact.contact} />
                    </div>
                </section>

                <footer className="bg-[#0F4C8A] py-6">
                    <div className="w-full max-w-6xl mx-auto px-4 text-center">
                        <p className="text-sm text-white/60">
                            Enterprise Analytics Architecture · Governance · Semantic Consistency · Modernization
                        </p>
                        <p className="text-xs text-white/40 mt-1">~Å~</p>
                    </div>
                </footer>
            </div >
        </main >
    );
}