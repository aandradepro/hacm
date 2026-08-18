// ============================================================
// FILE: app/components/sections/CTA.tsx
// PURPOSE: Call to Action section with contact information
// ============================================================

'use client';

import { Content } from '../../data';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Pillars from '@/components/ui/Pillars';
import ContactButtons from '@/components/ui/ContactButtons';
import SAPPerspective from '@/components/ui/SAPPerspective';

interface CTAProps {
    content: Content;
}
export default function CTA({ content }: CTAProps) {
    const { cta } = content;

    return (
        <div className="w-full max-w-6xl mx-auto px-4">
            <AnimatedSection direction="up" delay={0}>
                <span className="text-sm font-semibold text-[#00B4A0] tracking-widest uppercase">
                    {cta.badge}
                </span>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={150}>
                <h2 className="heading-1 text-[#0F4C8A] mt-2 mb-8">
                    {cta.title}
                </h2>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={300}>
                <Pillars items={cta.pillars} />
            </AnimatedSection>

            <AnimatedSection direction="up" delay={450}>
                <SAPPerspective text={cta.sapPerspective} />
            </AnimatedSection>

            <AnimatedSection direction="up" delay={600}>
                <ContactButtons contact={cta.contact} />
            </AnimatedSection>


        </div>
    );
}