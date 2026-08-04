// ============================================================
// FILE: app/components/sections/Footer.tsx
// PURPOSE: Footer section with copyright and brand
// ============================================================

'use client';

import content from '../../data/content.json';

export default function Footer() {
    const { footer } = content;

    return (
        <div className="w-full max-w-6xl mx-auto px-4 text-center">
            <p className="text-sm text-white/60">
                {footer.copyright} {footer.brand}
            </p>
            <p className="text-xs text-white/40 mt-1">
                {footer.version}
            </p>
        </div>
    );
}