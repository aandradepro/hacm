'use client';

import { Content } from '@/types';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Points from '@/components/ui/Points';
import Quote from '@/components/ui/Quote';
import SAPPerspective from '@/components/ui/SAPPerspective';

interface ProblemProps {
    content: Content;
}

export default function Problem({ content }: ProblemProps) {
    const problemSection = content.sections?.find(s => s.id === 'problem');
    const problem = problemSection?.content;

    if (!problem) return null;

    return (
        <div className="w-full max-w-6xl mx-auto px-4">
            <AnimatedSection direction="up" delay={0}>
                <span className="text-sm font-semibold text-[#00B4A0] tracking-widest uppercase">
                    {problem.badge}
                </span>
            </AnimatedSection>
            <AnimatedSection direction="up" delay={150}>
                <h2 className="heading-1 text-[#0F4C8A] mt-2 mb-2">
                    {problem.title}
                </h2>
            </AnimatedSection>
            <AnimatedSection direction="up" delay={300}>
                <p className="body-text text-[#2D3748] max-w-3xl mb-6">
                    {problem.subtitle}
                </p>
            </AnimatedSection>
            <AnimatedSection direction="up" delay={450}>
                <Points items={problem.points} />
            </AnimatedSection>
            {problem.quote && (
                <AnimatedSection direction="up" delay={450}>
                    <Quote text={problem.quote} />
                </AnimatedSection>
            )}
            {problem.message && (
                <AnimatedSection direction="up" delay={450}>
                    <p className="text-sm font-medium text-[#0F4C8A] mt-4">
                        {problem.message}
                    </p>
                </AnimatedSection>
            )}
        </div>
    );
}