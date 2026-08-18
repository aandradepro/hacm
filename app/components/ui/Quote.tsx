'use client';

interface QuoteProps {
    text: string;
    className?: string;
}

export default function Quote({ text, className = '' }: QuoteProps) {
    if (!text) return null;

    return (
        <blockquote className={`text-center text-lg font-medium text-[#0F4C8A] max-w-3xl mx-auto my-6 px-4 py-3 bg-[#E8EEF4] rounded-lg ${className}`}>
            "{text}"
        </blockquote>
    );
}