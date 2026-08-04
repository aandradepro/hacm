// ============================================================
// FILE: app/components/sections/Hero.tsx
// PURPOSE: Hero section with title, subtitle, and brand mark
// ============================================================

'use client';

import content from '../../data/content.json';
import AnimatedSection from '../ui/AnimatedSection';

export default function Hero() {
    const { hero } = content;

    return (
        <div className="w-full max-w-6xl mx-auto text-center px-4">
            <AnimatedSection direction="up" delay={150}>
                <h1 className="heading-1 text-[#0F4C8A] mb-4">
                    {hero.title}
                </h1>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={300}>
                <p className="body-text text-[#2D3748] max-w-3xl mx-auto">
                    {hero.subtitle}
                </p>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={450}>
                <div className="mt-8 flex items-center justify-center gap-4">
                    <div className="w-12 h-0.5 bg-[#00B4A0]" />
                    <span className="text-sm font-medium text-[#00B4A0] tracking-widest uppercase">
                        Enterprise Data Architecture
                    </span>
                    <div className="w-12 h-0.5 bg-[#00B4A0]" />
                </div>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={600}>
                <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-[#4A5568]">
                    <span className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#00B4A0]" />
                        Semantic-First
                    </span>
                    <span className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#00B4A0]" />
                        Governance at Scale
                    </span>
                    <span className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#00B4A0]" />
                        AI-Ready Foundation
                    </span>
                </div>
            </AnimatedSection>
        </div>
    );
}