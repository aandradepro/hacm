'use client';

interface PointsProps {
    items?: string[];
    className?: string;
    align?: 'left' | 'center' | 'right';
}

export default function Points({ items, className = '', align = 'left' }: PointsProps) {
    if (!items || items.length === 0) return null;

    const alignClass = {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
    };

    return (
        <div className={`space-y-4 max-w-4xl ${alignClass[align]} ${className}`}>
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