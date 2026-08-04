// ============================================================
// FILE: app/components/sections/Bridge.tsx
// PURPOSE: Bridge section connecting legacy to modern architectures
// ============================================================

'use client';

import content from '../../data/content.json';
import AnimatedSection from '../ui/AnimatedSection';

export default function Bridge() {
    const { bridge } = content;

    return (
        <div className="w-full max-w-6xl mx-auto px-4">
            <AnimatedSection direction="up" delay={0}>
                <span className="text-sm font-semibold text-[#00B4A0] tracking-widest uppercase">
                    The Transition
                </span>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={150}>
                <h2 className="heading-1 text-[#0F4C8A] mt-2 mb-4">
                    {bridge.title}
                </h2>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={300}>
                <p className="body-text text-[#2D3748] max-w-3xl mb-8">
                    {bridge.intro}
                </p>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={450}>
                <div className="bridge-container">
                    <div className="bridge-legacy">
                        <span className="text-sm font-medium opacity-75">Legacy</span>
                        <div className="text-lg font-bold mt-1">{bridge.legacyLabel}</div>
                    </div>

                    <div className="text-2xl text-[#00B4A0] font-bold bridge-arrow">→</div>

                    <div className="bridge-glow">
                        <span className="text-xs font-semibold uppercase tracking-wider text-[#00B4A0]">
                            The Bridge
                        </span>
                        <div className="text-base font-bold mt-1 text-[#0F4C8A]">
                            {bridge.governanceLabel}
                        </div>
                        <div className="w-full h-1 bg-[#FFD700] rounded-full mt-3 opacity-50" />
                    </div>

                    <div className="text-2xl text-[#00B4A0] font-bold bridge-arrow">→</div>

                    <div className="bridge-modern">
                        <span className="text-sm font-medium opacity-75">Modern</span>
                        <div className="text-lg font-bold mt-1">{bridge.modernLabel}</div>
                    </div>
                </div>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={600}>
                <ul className="max-w-3xl mx-auto space-y-2 text-[#2D3748] text-sm mt-6">
                    {bridge.points.map((point: string, index: number) => (
                        <li key={index} className="flex items-start gap-3">
                            <span className="text-[#00B4A0] font-bold mt-0.5">◆</span>
                            <span>{point}</span>
                        </li>
                    ))}
                </ul>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={750}>
                <div className="sap-perspective">
                    <div className="sap-perspective-label">SAP Perspective</div>
                    <p className="sap-perspective-text">{bridge.sapPerspective}</p>
                </div>
            </AnimatedSection>
        </div>
    );
}