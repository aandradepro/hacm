'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Navigation from '@/components/ui/Navigation';
import ExportButton from '@/components/ui/ExportButton';
import ResolutionBadge from '@/components/ui/ResolutionBadge';
import LanguageSelector from '@/components/ui/LanguageSelector';
import Diagram from '@/components/ui/Diagram';
import Quote from '@/components/ui/Quote';
import Message from '@/components/ui/Message';
import Hero from './components/sections/Hero';
import Problem from './components/sections/Problem';
import Approach from './components/sections/Approach';
import Results from './components/sections/Results';
import Continuity from './components/sections/Continuity';
import CTA from './components/sections/CTA';
import Footer from '@/components/sections/Footer';
import { Language, getContent, languages } from './data';

export default function PitchDeck() {
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

    // ── Helper para identificar seções em development ──────────────────────
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
                <div className="fixed bottom-6 right-6 z-50">
                    <ExportButton content={content} />
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
                    <Hero content={content} />
                </section>

                {/* ── PROBLEM ── */}
                <section id="problem" className="snap-section bg-[#F8FAFC] relative">
                    {isDev && (
                        <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-yellow-400 text-black text-xs font-mono font-bold rounded">
                            PROBLEM
                        </div>
                    )}
                    <Problem content={content} />
                    {content.problem.diagram && (
                        <div className="w-full max-w-4xl mx-auto mt-4">
                            <Diagram data={content.problem.diagram} />
                        </div>
                    )}
                    {content.problem.quote && (
                        <div className="w-full max-w-4xl mx-auto mt-4">
                            <Quote text={content.problem.quote} />
                        </div>
                    )}
                    {content.problem.message && (
                        <div className="w-full max-w-4xl mx-auto mt-4">
                            <Message text={content.problem.message} />
                        </div>
                    )}
                </section>

                {/* ── APPROACH ── */}
                <section id="approach" className="snap-section relative">
                    {isDev && (
                        <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-yellow-400 text-black text-xs font-mono font-bold rounded">
                            APPROACH
                        </div>
                    )}
                    <Approach content={content} />
                    {content.approach.diagram && (
                        <div className="w-full max-w-4xl mx-auto mt-4">
                            <Diagram data={content.approach.diagram} />
                        </div>
                    )}
                    {content.approach.quote && (
                        <div className="w-full max-w-4xl mx-auto mt-4">
                            <Quote text={content.approach.quote} />
                        </div>
                    )}
                    {content.approach.message && (
                        <div className="w-full max-w-4xl mx-auto mt-4">
                            <Message text={content.approach.message} />
                        </div>
                    )}
                </section>

                {/* ── RESULTS ── */}
                <section id="results" className="snap-section bg-[#F8FAFC] relative">
                    {isDev && (
                        <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-yellow-400 text-black text-xs font-mono font-bold rounded">
                            RESULTS
                        </div>
                    )}
                    <Results content={content} />
                    {content.results.diagram && (
                        <div className="w-full max-w-4xl mx-auto mt-4">
                            <Diagram data={content.results.diagram} />
                        </div>
                    )}
                    {content.results.quote && (
                        <div className="w-full max-w-4xl mx-auto mt-4">
                            <Quote text={content.results.quote} />
                        </div>
                    )}
                    {content.results.message && (
                        <div className="w-full max-w-4xl mx-auto mt-4">
                            <Message text={content.results.message} />
                        </div>
                    )}
                </section>

                {/* ── CONTINUITY ── */}
                <section id="continuity" className="snap-section relative">
                    {isDev && (
                        <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-yellow-400 text-black text-xs font-mono font-bold rounded">
                            CONTINUITY
                        </div>
                    )}
                    <Continuity content={content} />
                    {/* {content.continuity.quote && (
                        <div className="w-full max-w-4xl mx-auto mt-4">
                            <Quote text={content.continuity.quote} />
                        </div>
                    )}
                    {content.continuity.message && (
                        <div className="w-full max-w-4xl mx-auto mt-4">
                            <Message text={content.continuity.message} />
                        </div>
                    )} */}
                </section>

                {/* ── CTA ── */}
                <section id="cta" className="snap-section bg-[#F8FAFC] relative">
                    {isDev && (
                        <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-yellow-400 text-black text-xs font-mono font-bold rounded">
                            CTA
                        </div>
                    )}
                    <CTA content={content} />
                </section>

                {/* ── FOOTER ── */}
                <Footer content={content} />
            </div>
        </main>
    );
}