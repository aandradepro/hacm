'use client';

interface TagsProps {
    items: string[];
    className?: string;
    delay?: number;
}

export default function Tags({ items, className = '' }: TagsProps) {
    if (!items || items.length === 0) return null;

    return (
        <div className={`mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-[#4A5568] ${className}`}>
            {items.map((tag, index) => (
                <span key={index} className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#00B4A0]" />
                    {tag}
                </span>
            ))}
        </div>
    );
}