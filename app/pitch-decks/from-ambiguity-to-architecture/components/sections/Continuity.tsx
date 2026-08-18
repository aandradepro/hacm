'use client';

import { Content } from '../../data';
import AnimatedSection from '@/components/ui/AnimatedSection';
import SAPPerspective from '@/components/ui/SAPPerspective';
import CompactPoints from '@/components/ui/CompactPoints';
import ArchitectureModel from '@/components/ui/ArchitectureModel';

interface continuityProps {
    content: Content;
}
export default function Continuity({ content }: continuityProps) {
    const { continuity } = content;

    return (
        <div className="w-full max-w-6xl mx-auto px-4">
            <AnimatedSection direction="up" delay={0}>
                <span className="text-sm font-semibold text-[#00B4A0] tracking-widest uppercase">
                    {continuity.badge}
                </span>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={150}>
                <h2 className="heading-1 text-[#0F4C8A] mt-2 mb-4">
                    {continuity.title}
                </h2>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={300}>
                <p className="body-text text-[#2D3748] max-w-3xl mb-8">
                    {continuity.intro}
                </p>
            </AnimatedSection>

            {/* <AnimatedSection direction="up" delay={450}>
                <div className="continuity-container">
                    <div className="continuity-legacy">
                        <span className="text-sm font-medium opacity-75">Legacy</span>
                        <div className="text-lg font-bold mt-1">{continuity.legacyLabel}</div>
                    </div>

                    <div className="text-2xl text-[#00B4A0] font-bold continuity-arrow">→</div>

                    <div className="continuity-glow">
                        <span className="text-xs font-semibold uppercase tracking-wider text-[#00B4A0]">
                            The continuity
                        </span>
                        <div className="text-base font-bold mt-1 text-[#0F4C8A]">
                            {continuity.governanceLabel}
                        </div>
                        <div className="w-full h-1 bg-[#FFD700] rounded-full mt-3 opacity-50" />
                    </div>

                    <div className="text-2xl text-[#00B4A0] font-bold continuity-arrow">→</div>

                    <div className="continuity-modern">
                        <span className="text-sm font-medium opacity-75">Modern</span>
                        <div className="text-lg font-bold mt-1">{continuity.modernLabel}</div>
                    </div>
                </div>
            </AnimatedSection> */}
            <AnimatedSection direction="up" delay={450}>
                <ArchitectureModel
                    existingLabel={continuity.existingLabel}
                    architectureLabel={continuity.architectureLabel}
                    evolvingLabel={continuity.evolvingLabel}
                    existingEyebrow={continuity.existingEyebrow}
                    architectureEyebrow={continuity.architectureEyebrow}
                    evolvingEyebrow={continuity.evolvingEyebrow}
                    capabilities={continuity.capabilities}
                />
            </AnimatedSection>

            <AnimatedSection direction="up" delay={600}>
                <CompactPoints items={continuity.points} />
            </AnimatedSection>

            <AnimatedSection direction="up" delay={450}>
                <SAPPerspective text={continuity.sapPerspective} />
            </AnimatedSection>
        </div>
    );
}