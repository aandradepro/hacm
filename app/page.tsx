// ============================================================
// FILE: app/page.tsx
// PURPOSE: Main page component assembling all sections
// ============================================================

'use client';

import { useEffect, useState } from 'react';
import Navigation from './components/ui/Navigation';
import Hero from './components/sections/Hero';
import Problem from './components/sections/Problem';
import Approach from './components/sections/Approach';
import Results from './components/sections/Results';
import Bridge from './components/sections/Bridge';
import CTA from './components/sections/CTA';
import Footer from './components/sections/Footer';
import ResolutionBadge from './components/ui/ResolutionBadge';
import ExportButton from './components/ui/ExportButton';

export default function Home() {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <main className="relative min-h-screen bg-white">
            {/* Fixed Navigation */}
            <Navigation />

            {/* Export Button - Fixed Position */}
            {isClient && (
                <div className="fixed bottom-6 right-6 z-50">
                    <ExportButton />
                </div>
            )}

            {/* Resolution Badge - Fixed Position */}
            {isClient && (
                <div className="fixed bottom-6 left-6 z-50 hidden md:block">
                    <ResolutionBadge />
                </div>
            )}

            {/* Sections */}
            <div className="snap-container">
                <section id="hero" className="snap-section">
                    <Hero />
                </section>

                <section id="problem" className="snap-section bg-[#F8FAFC]">
                    <Problem />
                </section>

                <section id="approach" className="snap-section">
                    <Approach />
                </section>

                <section id="results" className="snap-section bg-[#F8FAFC]">
                    <Results />
                </section>

                <section id="bridge" className="snap-section">
                    <Bridge />
                </section>

                <section id="cta" className="snap-section bg-[#F8FAFC]">
                    <CTA />
                </section>

                <footer className="bg-[#0F4C8A] py-6">
                    <Footer />
                </footer>
            </div>
        </main>
    );
}