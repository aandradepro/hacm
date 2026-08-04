// ============================================================
// FILE: app/components/sections/CTA.tsx
// PURPOSE: Call to Action section with contact information
// ============================================================

'use client';

import content from '../../data/content.json';
import AnimatedSection from '../ui/AnimatedSection';

export default function CTA() {
    const { cta } = content;

    return (
        <div className="w-full max-w-6xl mx-auto px-4">
            <AnimatedSection direction="up" delay={0}>
                <span className="text-sm font-semibold text-[#00B4A0] tracking-widest uppercase">
                    Next Steps
                </span>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={150}>
                <h2 className="heading-1 text-[#0F4C8A] mt-2 mb-8">
                    {cta.title}
                </h2>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={300}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {cta.pillars.map((pillar: any, index: number) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg p-6 border border-[#E8EEF4] shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="text-3xl mb-3">{pillar.icon}</div>
                            <h3 className="text-lg font-semibold text-[#0F4C8A] mb-2">
                                {pillar.title}
                            </h3>
                            <p className="text-sm text-[#2D3748] leading-relaxed">
                                {pillar.description}
                            </p>
                        </div>
                    ))}
                </div>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={450}>
                <div className="sap-perspective">
                    <div className="sap-perspective-label">SAP Perspective</div>
                    <p className="sap-perspective-text whitespace-pre-line">
                        {cta.sapPerspective}
                    </p>
                </div>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={600}>
                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6">
                    <a
                        href={`mailto:${cta.contact.email}`}
                        className="px-8 py-3 bg-[#0F4C8A] text-white rounded-lg font-medium hover:bg-[#0A3A6E] transition-colors shadow-md hover:shadow-lg"
                    >
                        📧 {cta.contact.email}
                    </a>
                    <a
                        href={cta.contact.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-8 py-3 bg-[#E8EEF4] text-[#0F4C8A] rounded-lg font-medium hover:bg-[#D5DEE8] transition-colors"
                    >
                        🔗 LinkedIn
                    </a>
                    <a
                        href={cta.contact.calendar}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-8 py-3 bg-[#00B4A0] text-white rounded-lg font-medium hover:bg-[#009A88] transition-colors shadow-md hover:shadow-lg"
                    >
                        📅 Schedule a Conversation
                    </a>
                </div>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={750}>
                <div className="mt-8 text-center text-sm text-[#4A5568]">
                    <span className="inline-block px-4 py-1 bg-[#E8EEF4] rounded-full text-xs font-medium text-[#0F4C8A]">
                        Enterprise Analytics Architecture • Semantic Governance • SAP Transformation
                    </span>
                </div>
            </AnimatedSection>
        </div>
    );
}