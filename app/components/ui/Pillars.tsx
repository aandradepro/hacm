'use client';

interface Pillar {
    icon?: string;
    title: string;
    description: string;
}

interface PillarsProps {
    items: Pillar[];
    className?: string;
    columns?: 2 | 3 | 4;
}

export default function Pillars({ items, className = '', columns = 3 }: PillarsProps) {
    if (!items || items.length === 0) return null;

    const gridCols = {
        2: 'md:grid-cols-2',
        3: 'md:grid-cols-2 lg:grid-cols-3',
        4: 'md:grid-cols-2 lg:grid-cols-4',
    };

    return (
        <div className={`grid grid-cols-1 ${gridCols[columns]} gap-6 ${className}`}>
            {items.map((pillar, index) => (
                <div
                    key={index}
                    className="bg-white rounded-lg p-6 border border-[#E8EEF4] shadow-sm hover:shadow-md transition-shadow"
                >
                    {pillar.icon && <div className="text-3xl mb-3">{pillar.icon}</div>}
                    <h3 className="text-lg font-semibold text-[#0F4C8A] mb-2">
                        {pillar.title}
                    </h3>
                    <p className="text-sm text-[#2D3748] leading-relaxed">
                        {pillar.description}
                    </p>
                </div>
            ))}
        </div>
    );
}