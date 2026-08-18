'use client';

import { Content } from '@/types';

interface FooterProps {
    content: Content;
}

export default function Footer({ content }: FooterProps) {
    const { footer } = content;

    if (!footer) return null;

    return (
        <footer className="bg-[#0F4C8A] py-6">
            <div className="w-full max-w-6xl mx-auto px-4 text-center">
                <p className="text-sm text-white/60">
                    {footer.text}
                </p>
                <p className="text-xs text-white/40 mt-1">{footer.brand}</p>
            </div>
        </footer>
    );
}