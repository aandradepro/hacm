'use client';

interface MessageProps {
    text: string;
    className?: string;
}

export default function Message({ text, className = '' }: MessageProps) {
    if (!text) return null;

    return (
        <div className={`mt-6 text-center ${className}`}>
            <span className="inline-block px-6 py-2 bg-[#0F4C8A] text-white rounded-full text-sm font-medium">
                {text}
            </span>
        </div>
    );
}