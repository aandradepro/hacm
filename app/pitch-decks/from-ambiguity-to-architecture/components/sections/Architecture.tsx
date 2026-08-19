'use client';

import { Content } from '../../data';
import AnimatedSection from '@/components/ui/AnimatedSection';
import SAPPerspective from '@/components/ui/SAPPerspective';
import CompactPoints from '@/components/ui/CompactPoints';
import FoundationDiagram from '@/components/ui/FoundationDiagram';

interface architectureProps {
    content: Content;
}
export default function architecture({ content }: architectureProps) {
    const { architecture } = content;

    if (!architecture) {
        return null;
    }

    return (
        <div className="w-full max-w-6xl mx-auto px-4">
            <AnimatedSection direction="up" delay={0}>
                <span className="text-sm font-semibold text-[#00B4A0] tracking-widest uppercase">
                    {architecture.badge}
                </span>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={150}>
                <h2 className="heading-1 text-[#0F4C8A] mt-2 mb-4">
                    {architecture.title}
                </h2>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={300}>
                <p className="body-text text-[#2D3748] max-w-3xl mb-8">
                    {architecture.intro}
                </p>
            </AnimatedSection>
            <AnimatedSection direction="up" delay={450}>
                <FoundationDiagram data={architecture.foundation} />
            </AnimatedSection>

            <AnimatedSection direction="up" delay={600}>
                <div className="mb-12">
                    {architecture.points && <CompactPoints items={architecture.points} />}
                </div>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={450}>
                {architecture.sapPerspective && <SAPPerspective text={architecture.sapPerspective} />}
            </AnimatedSection>
        </div>
    );
}