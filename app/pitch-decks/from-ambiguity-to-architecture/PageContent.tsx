'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Navigation from '@/components/ui/Navigation';
import ExportButton from '@/components/ui/ExportButton';
import ResolutionBadge from '@/components/ui/ResolutionBadge';
import LanguageSelector from '@/components/ui/LanguageSelector';
import Hero from './components/sections/Hero';
import Problem from './components/sections/Problem';
import Approach from './components/sections/Approach';
import Results from './components/sections/Results';
import Architecture from './components/sections/Architecture';
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
                </section>
                {/* ── APPROACH ── */}
                <section id="approach" className="snap-section relative">
                    {isDev && (
                        <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-yellow-400 text-black text-xs font-mono font-bold rounded">
                            APPROACH
                        </div>
                    )}
                    <Approach content={content} />
                </section>
                {/* ── RESULTS ── */}
                <section id="results" className="snap-section bg-[#F8FAFC] relative">
                    {isDev && (
                        <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-yellow-400 text-black text-xs font-mono font-bold rounded">
                            RESULTS
                        </div>
                    )}
                    <Results content={content} />
                </section>

                {/* ── ARCHITECTURE ── */}
                <section id="Architecture" className="snap-section relative">
                    {isDev && (
                        <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-yellow-400 text-black text-xs font-mono font-bold rounded">
                            ARCHITECTURE
                        </div>
                    )}
                    <Architecture content={content} />
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