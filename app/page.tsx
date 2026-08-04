'use client';

import { useEffect } from 'react';

export default function Home() {
    useEffect(() => {
        window.location.href = '/pitch-decks/from-ambiguity-to-architecture';
    }, []);

    return (
        <div className="flex items-center justify-center min-h-screen font-sans">
            <p className="text-[#4A5568]">Redirecting to pitch deck "From Ambiguity to Architecture"...</p>
        </div>
    );
}