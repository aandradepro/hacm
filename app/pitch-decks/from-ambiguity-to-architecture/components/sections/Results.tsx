// ============================================================
// FILE: app/components/sections/Results.tsx
// PURPOSE: Results section with metric cards
// ============================================================

'use client';

import AnimatedSection from '@/components/ui/AnimatedSection';
import Cards from '@/components/ui/Cards';
import SAPPerspective from '@/components/ui/SAPPerspective';
import { Content } from '../../data';

interface ResultsProps {
    content: Content;
}
export default function Results({ content }: ResultsProps) {
    const { results } = content;

    return (
        <div className="w-full max-w-6xl mx-auto px-4">
            <AnimatedSection direction="up" delay={0}>
                <span className="text-sm font-semibold text-[#00B4A0] tracking-widest uppercase">
                    {results.badge}
                </span>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={150}>
                <h2 className="heading-1 text-[#0F4C8A] mt-2 mb-8">
                    {results.title}
                </h2>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={300}>
                <Cards items={results.cards} />
            </AnimatedSection>

            <AnimatedSection direction="up" delay={450}>
                <SAPPerspective text={results.sapPerspective} />
            </AnimatedSection>
        </div>
    );
}