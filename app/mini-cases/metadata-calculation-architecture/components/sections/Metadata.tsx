'use client';

import { Content } from '@/types';
import AnimatedSection from '@/components/ui/AnimatedSection';
import OrbitDiagram from '@/components/ui/OrbitDiagram';
import Cards from '@/components/ui/Cards';

interface MetadataProps {
    content: Content;
}

export default function Metadata({ content }: MetadataProps) {
    const metadataSection = content.sections?.find(s => s.id === 'metadata');
    const metadata = metadataSection?.content;

    if (!metadata) return null;

    return (
        <div className="w-full max-w-6xl mx-auto px-4">
            <AnimatedSection direction="up" delay={0}>
                <span className="text-sm font-semibold text-[#00B4A0] tracking-widest uppercase">
                    {metadata.badge}
                </span>
            </AnimatedSection>
            <AnimatedSection direction="up" delay={150}>
                <h2 className="heading-1 text-[#0F4C8A] mt-2 mb-2">
                    {metadata.title}
                </h2>
            </AnimatedSection>
            <AnimatedSection direction="up" delay={300}>
                <p className="body-text text-[#2D3748] max-w-3xl mb-6">
                    {metadata.subtitle}
                </p>
            </AnimatedSection>
            {metadata.orbit && (
                <AnimatedSection direction="up" delay={450}>
                    <OrbitDiagram
                        center={metadata.orbit.center}
                        nodes={metadata.orbit.nodes}
                        outcome={metadata.orbit.outcome}
                        cycleText={metadata.orbit.cycleText}
                    />
                </AnimatedSection>
            )}
            {metadata.cards && (
                <AnimatedSection direction="up" delay={450}>
                    <Cards items={metadata.cards} columns={2} />
                </AnimatedSection>
            )}
        </div>
    );
}