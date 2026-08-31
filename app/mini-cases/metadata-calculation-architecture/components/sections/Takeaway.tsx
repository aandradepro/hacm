'use client';

import { Content } from '@/types';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Points from '@/components/ui/Points';
import SAPPerspective from '@/components/ui/SAPPerspective';

interface TakeawayProps {
    content: Content;
}

export default function Takeaway({ content }: TakeawayProps) {
    const takeawaySection = content.sections?.find(s => s.id === 'takeaway');
    const takeaway = takeawaySection?.content;

    if (!takeaway) return null;

    return (
        <div className="w-full max-w-6xl mx-auto px-4">
            <AnimatedSection direction="up" delay={0}>
                <span className="text-sm font-semibold text-[#00B4A0] tracking-widest uppercase">
                    {takeaway.badge}
                </span>
            </AnimatedSection>
            <AnimatedSection direction="up" delay={150}>
                <h2 className="heading-1 text-[#0F4C8A] mt-2 mb-2">
                    {takeaway.title}
                </h2>
            </AnimatedSection>
            <AnimatedSection direction="up" delay={300}>
                <p className="body-text text-[#2D3748] max-w-3xl mb-6">
                    {takeaway.subtitle}
                </p>
            </AnimatedSection>
            <AnimatedSection direction="up" delay={450}>
                <Points items={takeaway.points} />
            </AnimatedSection>
            <AnimatedSection direction="up" delay={450}>
                <SAPPerspective text={takeaway.sapPerspective} />
            </AnimatedSection>
            {takeaway.message && (
                <AnimatedSection direction="up" delay={450}>
                    <p className="text-lg font-semibold text-[#0F4C8A] mt-6">
                        {takeaway.message}
                    </p>
                </AnimatedSection>
            )}
        </div>
    );
}