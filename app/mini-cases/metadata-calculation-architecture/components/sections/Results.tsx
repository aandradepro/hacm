'use client';

import { Content } from '@/types';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Cards from '@/components/ui/Cards';
import List from '@/components/ui/List';

interface ResultsProps {
    content: Content;
}

export default function Results({ content }: ResultsProps) {
    const resultsSection = content.sections?.find(s => s.id === 'results');
    const results = resultsSection?.content;

    if (!results) return null;

    return (
        <div className="w-full max-w-6xl mx-auto px-4">
            <AnimatedSection direction="up" delay={0}>
                <span className="text-sm font-semibold text-[#00B4A0] tracking-widest uppercase">
                    {results.badge}
                </span>
            </AnimatedSection>
            <AnimatedSection direction="up" delay={150}>
                <h2 className="heading-1 text-[#0F4C8A] mt-2 mb-6">
                    {results.title}
                </h2>
            </AnimatedSection>
            <AnimatedSection direction="up" delay={300}>
                <Cards items={results.cards} columns={2} />
            </AnimatedSection>
            {results.improvements && (
                <AnimatedSection direction="up" delay={450}>
                    <div className="mt-8 p-6 bg-[#F8FAFC] rounded-lg border border-[#E8EEF4]">
                        <h3 className="text-lg font-semibold text-[#0F4C8A] mb-4">
                            {results.improvements.title}
                        </h3>
                        <List items={results.improvements.listImprovements} />
                    </div>
                </AnimatedSection>
            )}
        </div>
    );
}