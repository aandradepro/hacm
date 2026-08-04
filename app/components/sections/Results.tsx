// ============================================================
// FILE: app/components/sections/Results.tsx
// PURPOSE: Results section with metric cards
// ============================================================

'use client';

import content from '../../data/content.json';
import AnimatedSection from '../ui/AnimatedSection';

export default function Results() {
    const { results } = content;

    return (
        <div className="w-full max-w-6xl mx-auto px-4">
            <AnimatedSection direction="up" delay={0}>
                <span className="text-sm font-semibold text-[#00B4A0] tracking-widest uppercase">
                    Proven Impact
                </span>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={150}>
                <h2 className="heading-1 text-[#0F4C8A] mt-2 mb-8">
                    {results.title}
                </h2>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={300}>
                <div className="card-grid">
                    {results.cards.map((card: any, index: number) => (
                        <div key={index} className="card">
                            <span className="card-icon">{card.icon}</span>
                            <span className="card-metric">{card.metric}</span>
                            <span className="text-xs font-medium text-[#4A5568] block mb-2">
                                {card.metricLabel}
                            </span>
                            <h3 className="card-title">{card.title}</h3>
                            <p className="card-description">{card.description}</p>
                            <p className="card-impact">{card.impact}</p>
                        </div>
                    ))}
                </div>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={450}>
                <div className="sap-perspective">
                    <div className="sap-perspective-label">SAP Perspective</div>
                    <p className="sap-perspective-text">{results.sapPerspective}</p>
                </div>
            </AnimatedSection>
        </div>
    );
}