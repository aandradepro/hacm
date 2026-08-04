// ============================================================
// FILE: app/components/sections/Problem.tsx
// PURPOSE: Problem section describing semantic ambiguity
// ============================================================

'use client';

import content from '../../data/content.json';
import AnimatedSection from '../ui/AnimatedSection';

export default function Problem() {
    const { problem } = content;

    return (
        <div className="w-full max-w-6xl mx-auto px-4">
            <AnimatedSection direction="up" delay={0}>
                <span className="text-sm font-semibold text-[#00B4A0] tracking-widest uppercase">
                    The Challenge
                </span>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={150}>
                <h2 className="heading-1 text-[#0F4C8A] mt-2 mb-6">
                    {problem.title}
                </h2>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={300}>
                <div className="space-y-4 max-w-4xl">
                    {problem.points.map((point: string, index: number) => (
                        <p key={index} className="body-text text-[#2D3748]">
                            {point}
                        </p>
                    ))}
                </div>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={450}>
                <div className="sap-perspective">
                    <div className="sap-perspective-label">SAP Perspective</div>
                    <p className="sap-perspective-text">{problem.sapPerspective}</p>
                </div>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={600}>
                <div className="mt-8 flex items-center gap-4 text-sm text-[#4A5568]">
                    <span className="px-3 py-1 bg-[#E8EEF4] rounded-full text-xs font-medium text-[#0F4C8A]">
                        Ambiguity → Noise
                    </span>
                    <span className="px-3 py-1 bg-[#E8EEF4] rounded-full text-xs font-medium text-[#0F4C8A]">
                        Multiple Versions of Truth
                    </span>
                    <span className="px-3 py-1 bg-[#E8EEF4] rounded-full text-xs font-medium text-[#0F4C8A]">
                        Eroded Trust
                    </span>
                </div>
            </AnimatedSection>
        </div>
    );
}