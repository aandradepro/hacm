// ============================================================
// FILE: app/components/sections/Hero.tsx
// PURPOSE: Hero section with title, subtitle, and brand mark
// ============================================================

'use client';

import AnimatedSection from '@/components/ui/AnimatedSection';
import Tags from '@/components/ui/Tags';
import { Content } from '../../data';

interface HeroProps {
    content: Content;
}

export default function Hero({ content }: HeroProps) {
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
                        {hero.heading}
                    </span>
                    <div className="w-12 h-0.5 bg-[#00B4A0]" />
                </div>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={550}>
                <Tags items={hero.tags} />
            </AnimatedSection>

            {hero.author && (
                <AnimatedSection direction="up" delay={450}>
                    <div className="mt-6 text-[#4A5568]">
                        <p className="text-lg font-medium text-[#0F4C8A]">{hero.author}</p>
                        <p className="text-sm">{hero.role}</p>
                        <p className="text-sm opacity-70">{hero.experience}</p>
                    </div>
                </AnimatedSection>
            )}
            {hero.role && (
                <AnimatedSection direction="up" delay={600}>
                    <div className="mt-8 flex items-center justify-center gap-4">
                        <div className="w-12 h-0.5 bg-[#00B4A0]" />
                        <span className="text-sm font-medium text-[#00B4A0] tracking-widest uppercase">
                            {hero.role}
                        </span>
                        <div className="w-12 h-0.5 bg-[#00B4A0]" />
                    </div>
                </AnimatedSection>
            )}
        </div>
    );
}