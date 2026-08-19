'use client';

interface PillsProps {
    items?: string[];
    className?: string;
}

export default function Pills({ items, className = '' }: PillsProps) {
    if (!items || items.length === 0) return null;

    return (
        <div className={`mt-8 flex flex-wrap items-center justify-center gap-4 ${className}`}>
            {items.map((item, index) => (
                <span
                    key={index}
                    className="px-2 py-1 bg-[#E8EEF4] rounded-full text-sm font-medium text-[#0F4C8A] border border-[#00B4A0]/20 shadow-sm"
                >
                    {item}
                </span>
            ))}
        </div>
    );
}