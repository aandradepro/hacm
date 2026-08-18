'use client';

interface CompactPointsProps {
    items: string[];
    className?: string;
}

export default function CompactPoints({ items, className = '' }: CompactPointsProps) {
    if (!items || items.length === 0) return null;

    return (
        <div className={`max-w-3xl mx-auto space-y-2 text-sm text-[#2D3748] mt-6 ${className}`}>
            {items.map((item, index) => {
                const firstChar = item.charAt(0);
                const rest = item.slice(1);

                return (
                    <p key={index}>
                        <span className="text-[#2D3748] font-semibold text-base">
                            {firstChar}
                        </span>
                        {rest}
                    </p>
                );
            })}
        </div>
    );
}