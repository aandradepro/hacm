// ============================================================
// FILE: app/components/sections/Problem.tsx
// PURPOSE: Problem section describing semantic ambiguity
// ============================================================

'use client';

import AnimatedSection from '@/components/ui/AnimatedSection';
import SAPPerspective from '@/components/ui/SAPPerspective';
import Pills from '@/components/ui/Pills';
import Points from '@/components/ui/Points';
import { Content } from '../../data';

interface ProblemProps {
    content: Content;
}
export default function Problem({ content }: ProblemProps) {
    const { problem } = content;
    if (!problem) {
        return null;
    }
    return (
        <div className="w-full max-w-6xl mx-auto px-4">
            <AnimatedSection direction="up" delay={0}>
                <span className="text-sm font-semibold text-[#00B4A0] tracking-widest uppercase">
                    {problem.badge}
                </span>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={150}>
                <h2 className="heading-1 text-[#0F4C8A] mt-2 mb-6">
                    {problem.title}
                </h2>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={300}>
                {problem.points && <Points items={problem.points} />}
            </AnimatedSection>

            <AnimatedSection direction="up" delay={450}>
                {problem.sapPerspective && <SAPPerspective text={problem.sapPerspective} />}
            </AnimatedSection>

            <AnimatedSection direction="up" delay={550}>
                {problem.pills && <Pills items={problem.pills} />}
            </AnimatedSection>
        </div>
    );
}