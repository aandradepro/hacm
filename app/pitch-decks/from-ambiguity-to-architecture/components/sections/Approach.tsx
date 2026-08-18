// ============================================================
// FILE: app/components/sections/Approach.tsx
// PURPOSE: Approach section showing semantic-first methodology
// ============================================================

'use client';

import { Content } from '../../data';
import AnimatedSection from '@/components/ui/AnimatedSection';
import SAPPerspective from '@/components/ui/SAPPerspective';
import Steps from '@/components/ui/Steps';

interface ApproachProps {
    content: Content;
}
export default function Approach({ content }: ApproachProps) {
    const { approach } = content;

    return (
        <div className="w-full max-w-6xl mx-auto px-4">
            <AnimatedSection direction="up" delay={0}>
                <span className="text-sm font-semibold text-[#00B4A0] tracking-widest uppercase">
                    {approach.badge}
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
                <Steps items={approach.steps} />
            </AnimatedSection>

            <AnimatedSection direction="up" delay={450}>
                <SAPPerspective text={approach.sapPerspective} />
            </AnimatedSection>
        </div>
    );
}