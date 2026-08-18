'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Navigation from '@/components/ui/Navigation';
import ExportButton from '@/components/ui/ExportButton';
import ResolutionBadge from '@/components/ui/ResolutionBadge';
import LanguageSelector from '@/components/ui/LanguageSelector';
import Quote from '@/components/ui/Quote';
import Message from '@/components/ui/Message';
import SAPPerspective from '@/components/ui/SAPPerspective';
import Points from '@/components/ui/Points';
import Tags from '@/components/ui/Tags';
import ContactButtons from '@/components/ui/ContactButtons';
import EvidenceCases from '@/components/ui/EvidenceCases';
import List from '@/components/ui/List';
import VertFlow from '@/components/ui/VertFlow';
import ConvergenceDiagram from '@/components/ui/ConvergenceDiagram';
import Cards from '@/components/ui/Cards';
import RelationshipDiagram from '@/components/ui/RelationshipDiagram';
import OrbitDiagram from '@/components/ui/OrbitDiagram';
import Pillars from '@/components/ui/Pillars';
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
                    <div className="w-full max-w-6xl mx-auto text-center px-4">
                        <h1 className="heading-1 text-[#0F4C8A] mb-4">
                            {content.hero.title}
                        </h1>
                        <p className="body-text text-[#2D3748] max-w-3xl mx-auto">
                            {content.hero.subtitle}
                        </p>
                        <div className="mt-8 flex items-center justify-center gap-4">
                            <div className="w-12 h-0.5 bg-[#00B4A0]" />
                            <span className="text-sm font-medium text-[#00B4A0] tracking-widest uppercase">
                                {content.hero.heading}
                            </span>
                            <div className="w-12 h-0.5 bg-[#00B4A0]" />
                        </div>
                        <Tags items={content.hero.tags} />
                    </div>
                </section>

                {/* ── PROBLEM ── */}
                <section id="problem" className="snap-section bg-[#F8FAFC] relative">
                    {isDev && (
                        <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-yellow-400 text-black text-xs font-mono font-bold rounded">
                            PROBLEM
                        </div>
                    )}
                    <div className="w-full max-w-6xl mx-auto px-4">
                        <span className="text-sm font-semibold text-[#00B4A0] tracking-widest uppercase">
                            {content.problem.badge}
                        </span>
                        <h2 className="heading-1 text-[#0F4C8A] mt-2 mb-2">
                            {content.problem.title}
                        </h2>
                        <p className="body-text text-[#2D3748] max-w-3xl mb-6">
                            {content.problem.subtitle}
                        </p>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                            {/* Coluna esquerda: list */}
                            <div>
                                {content.problem.list ? (
                                    <List items={content.problem.list} />
                                ) : (
                                    <Points items={content.problem.points} />
                                )}
                            </div>

                            {/* Coluna direita: diagram */}
                            {content.problem.convergence && (
                                <div className="flex justify-center lg:justify-end">
                                    <ConvergenceDiagram
                                        center={content.problem.convergence.center}
                                        nodes={content.problem.convergence.nodes}
                                        className="max-w-sm lg:max-w-md"
                                    />
                                </div>
                            )}
                        </div>
                        <Quote text={content.problem.quote} />
                        <SAPPerspective text={content.problem.sapPerspective} />
                        <Message text={content.problem.message} />
                    </div>
                </section>

                {/* ── THESIS ── */}
                <section id="thesis" className="snap-section relative">
                    {isDev && (
                        <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-yellow-400 text-black text-xs font-mono font-bold rounded">
                            THESIS
                        </div>
                    )}
                    <div className="w-full max-w-6xl mx-auto px-4">
                        <span className="text-sm font-semibold text-[#00B4A0] tracking-widest uppercase">
                            {content.thesis.badge}
                        </span>
                        <h2 className="heading-1 text-[#0F4C8A] mt-2 mb-2">
                            {content.thesis.title}
                        </h2>
                        <p className="body-text text-[#2D3748] max-w-3xl mb-6">
                            {content.thesis.subtitle}
                        </p>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                            <div>
                                {content.thesis.list ? (
                                    <List items={content.thesis.list} />
                                ) : (
                                    <Points items={content.thesis.points} />
                                )}
                            </div>
                            {content.thesis.vertFlow && (
                                <div className="flex justify-center lg:justify-end">
                                    <VertFlow
                                        steps={content.thesis.vertFlow.steps}
                                        title={content.thesis.vertFlow.title}
                                    />
                                </div>
                            )}
                        </div>
                        <Quote text={content.thesis.quote} />
                        <SAPPerspective text={content.thesis.sapPerspective} />
                        <Message text={content.thesis.message} />
                    </div>
                </section>

                {/* ── EVIDENCE ── */}
                <section id="evidence" className="snap-section bg-[#F8FAFC] relative">
                    {isDev && (
                        <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-yellow-400 text-black text-xs font-mono font-bold rounded">
                            EVIDENCE
                        </div>
                    )}
                    <div className="w-full max-w-6xl mx-auto px-4">
                        <span className="text-sm font-semibold text-[#00B4A0] tracking-widest uppercase">
                            {content.evidence.badge}
                        </span>
                        <h2 className="heading-1 text-[#0F4C8A] mt-2 mb-6">
                            {content.evidence.title}
                        </h2>

                        {/* Usa cards se existir, senão cases (fallback) */}
                        {content.evidence.cards ? (
                            <Cards items={content.evidence.cards} columns={3} />
                        ) : (
                            content.evidence.cases && <EvidenceCases cases={content.evidence.cases} />
                        )}

                        <Quote text={content.evidence.quote} />
                        <SAPPerspective text={content.evidence.sapPerspective} />
                        <Message text={content.evidence.message} />
                    </div>
                </section>

                {/* ── ARCHITECTURE ── */}
                <section id="architecture" className="snap-section relative">
                    {isDev && (
                        <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-yellow-400 text-black text-xs font-mono font-bold rounded">
                            ARCHITECTURE
                        </div>
                    )}
                    <div className="w-full max-w-6xl mx-auto px-4">
                        <span className="text-sm font-semibold text-[#00B4A0] tracking-widest uppercase">
                            {content.architecture.badge}
                        </span>
                        <h2 className="heading-1 text-[#0F4C8A] mt-2 mb-2">
                            {content.architecture.title}
                        </h2>
                        <p className="body-text text-[#2D3748] max-w-3xl mb-6">
                            {content.architecture.subtitle}
                        </p>
                        {content.architecture.relationship && (
                            <RelationshipDiagram
                                subject={content.architecture.relationship.subject}
                                verb={content.architecture.relationship.verb}
                                object={content.architecture.relationship.object}
                                meaning={content.architecture.relationship.meaning}
                            />
                        )}
                        <SAPPerspective text={content.architecture.sapPerspective} />
                        <Message text={content.architecture.message} />
                    </div>
                </section>

                {/* ── VALUE ── */}
                <section id="value" className="snap-section bg-[#F8FAFC] relative">
                    {isDev && (
                        <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-yellow-400 text-black text-xs font-mono font-bold rounded">
                            VALUE
                        </div>
                    )}
                    <div className="w-full max-w-6xl mx-auto px-4">
                        <span className="text-sm font-semibold text-[#00B4A0] tracking-widest uppercase">
                            {content.value.badge}
                        </span>
                        <h2 className="heading-1 text-[#0F4C8A] mt-2 mb-2">
                            {content.value.title}
                        </h2>
                        <p className="body-text text-[#2D3748] max-w-3xl mb-2">
                            {content.value.subtitle}
                        </p>
                        {content.value.emphasis && (
                            <p className="text-lg font-semibold text-[#0F4C8A] mb-6">
                                {content.value.emphasis}
                            </p>
                        )}

                        {/* OrbitDiagram */}
                        {content.value.orbitDiagram && (
                            <OrbitDiagram
                                center={content.value.orbitDiagram.center}
                                nodes={content.value.orbitDiagram.nodes}
                                outcome={content.value.orbitDiagram.outcome}
                                cycleText={content.value.orbitDiagram.cycleText}
                            />
                        )}

                        <SAPPerspective text={content.value.sapPerspective} />
                        <Message text={content.value.message} />
                    </div>
                </section>

                {/* ── CLOSING ── */}
                {/* ── CTA ── */}
                <section id="cta" className="snap-section bg-[#F8FAFC] relative">
                    {isDev && (
                        <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-yellow-400 text-black text-xs font-mono font-bold rounded">
                            CTA
                        </div>
                    )}
                    <div className="w-full max-w-6xl mx-auto px-4">
                        <span className="text-sm font-semibold text-[#00B4A0] tracking-widest uppercase">
                            {content.cta.badge}
                        </span>
                        <h2 className="heading-1 text-[#0F4C8A] mt-2 mb-8">
                            {content.cta.title}
                        </h2>

                        {/* Pillars */}
                        <Pillars items={content.cta.pillars} columns={3} />

                        {/* SAP Perspective */}
                        <SAPPerspective text={content.cta.sapPerspective} />

                        {/* Contact Buttons */}
                        <ContactButtons contact={content.cta.contact} />
                    </div>
                </section>

                <Footer content={content} />
            </div>
        </main>
    );
}