// ============================================================
// FILE: app/components/sections/Approach.tsx
// PURPOSE: Approach section showing semantic-first methodology
// ============================================================

'use client';

import content from '../../data/content.json';
import AnimatedSection from '../ui/AnimatedSection';

export default function Approach() {
    const { approach } = content;

    return (
        <div className="w-full max-w-6xl mx-auto px-4">
            <AnimatedSection direction="up" delay={0}>
                <span className="text-sm font-semibold text-[#00B4A0] tracking-widest uppercase">
                    The Methodology
                </span>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={150}>
                <h2 className="heading-1 text-[#0F4C8A] mt-2 mb-4">
                    {approach.title}
                </h2>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={300}>
                <p className="body-text text-[#2D3748] max-w-3xl mb-8">
                    {approach.intro}
                </p>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={450}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {approach.steps.map((step: { step: string; description: string }, index: number) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg p-5 border border-[#E8EEF4] shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#0F4C8A] text-white text-sm font-bold">
                                    {index + 1}
                                </span>
                                <span className="font-semibold text-[#0F4C8A]">
                                    {step.step}
                                </span>
                            </div>
                            <p className="text-sm text-[#2D3748] leading-relaxed">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={600}>
                <div className="sap-perspective">
                    <div className="sap-perspective-label">SAP Perspective</div>
                    <p className="sap-perspective-text">{approach.sapPerspective}</p>
                </div>
            </AnimatedSection>
        </div>
    );
}