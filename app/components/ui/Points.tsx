'use client';

interface PointsProps {
    items?: string[];
    className?: string;
}

export default function Points({ items, className = '' }: PointsProps) {
    if (!items || items.length === 0) return null;

    return (
        <div className={`space-y-4 max-w-4xl ${className}`}>
            {items.map((item, index) => {
                // Pega a primeira letra e o resto do texto
                const firstChar = item.charAt(0);
                const rest = item.slice(1);

                return (
                    <p key={index} className="body-text text-[#2D3748]">
                        <span className="text-[#2D3748] font-semibold text-xl ">
                            {firstChar}
                        </span>
                        {rest}
                    </p>
                );
            })}
        </div>
    );
}