'use client';

import { Content } from '@/types';
import AnimatedSection from '@/components/ui/AnimatedSection';
import FlowHDiagram from '@/components/ui/FlowHDiagram';
import Quote from '@/components/ui/Quote';
import SAPPerspective from '@/components/ui/SAPPerspective';

interface DecisionProps {
    content: Content;
}

export default function Decision({ content }: DecisionProps) {
    const decisionSection = content.sections?.find(s => s.id === 'decision');
    const decision = decisionSection?.content;

    if (!decision) return null;

    return (
        <div className="w-full max-w-6xl mx-auto px-4">
            <AnimatedSection direction="up" delay={0}>
                <span className="text-sm font-semibold text-[#00B4A0] tracking-widest uppercase">
                    {decision.badge}
                </span>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={150}>
                <h2 className="heading-1 text-[#0F4C8A] mt-2 mb-2">
                    {decision.title}
                </h2>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={300}>
                <p className="body-text text-[#2D3748] max-w-3xl mb-6">
                    {decision.subtitle}
                </p>
            </AnimatedSection>

            {/* Layout: Diagram à esquerda | Before + After à direita */}
            <AnimatedSection direction="up" delay={450}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    {/* Coluna esquerda: Diagram completo - centralizado verticalmente */}
                    {decision.diagram && (
                        <div className="flex flex-col items-center justify-center h-full">
                            <h3 className="text-lg font-semibold text-[#0F4C8A] mb-4 text-center">
                                {decision.diagram.title || 'Architecture Flow'}
                            </h3>
                            <FlowHDiagram
                                title={decision.diagram.title || 'Architecture Flow'}
                                steps={decision.diagram.steps}
                            />
                        </div>
                    )}

                    {/* Coluna direita: Before (acima) e After (abaixo) */}
                    <div className="space-y-6">
                        {/* Before */}
                        <div>
                            <h3 className="text-lg font-semibold text-[#6B7280] mb-4">
                                {decision.before.title}
                            </h3>
                            <FlowHDiagram
                                title={decision.before.title}
                                steps={decision.before.steps}
                            />
                        </div>

                        {/* After */}
                        <div>
                            <h3 className="text-lg font-semibold text-[#00B4A0] mb-4">
                                {decision.after.title}
                            </h3>
                            <FlowHDiagram
                                title={decision.after.title}
                                steps={decision.after.steps}
                            />
                        </div>
                    </div>
                </div>
            </AnimatedSection>

            {decision.quote && (
                <AnimatedSection direction="up" delay={450}>
                    <Quote text={decision.quote} />
                </AnimatedSection>
            )}

            {decision.sapPerspective && (
                <AnimatedSection direction="up" delay={450}>
                    <SAPPerspective text={decision.sapPerspective} />
                </AnimatedSection>
            )}
        </div>
    );
}