// app/pitch-decks/coordinating-enterprise-analytics/page.tsx
import { Suspense } from 'react';
import PageContent from './PageContent';

export default function Page() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-[#0F4C8A]">Loading...</div>
            </div>
        }>
            <PageContent />
        </Suspense>
    );
}