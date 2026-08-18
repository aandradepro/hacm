'use client';

interface Card {
    icon?: string;
    metric: string;
    metricLabel: string;
    title: string;
    description: string;
    impact: string;
    industry?: string;
    href?: string;  // ← NOVO: URL para link
}

interface CardsProps {
    items: Card[];
    className?: string;
    columns?: 2 | 3 | 4;
}

export default function Cards({ items, className = '', columns = 3 }: CardsProps) {
    if (!items || items.length === 0) return null;

    const gridCols = {
        2: 'md:grid-cols-2',
        3: 'md:grid-cols-2 lg:grid-cols-3',
        4: 'md:grid-cols-2 lg:grid-cols-4',
    };

    return (
        <div className={`grid grid-cols-1 ${gridCols[columns]} gap-6 ${className}`}>
            {items.map((card, index) => (
                <div key={index} className="bg-white rounded-lg p-6 border border-[#E8EEF4] shadow-sm hover:shadow-md transition-shadow relative flex flex-col">
                    {card.industry && (
                        <span className="absolute top-3 right-4 text-[8px] font-medium text-[#4A5568] opacity-50 lowercase">
                            {card.industry}
                        </span>
                    )}
                    {card.icon && <span className="card-icon">{card.icon}</span>}
                    <span className="card-metric">{card.metric}</span>
                    <span className="text-xs font-medium text-[#4A5568] block mb-2">
                        {card.metricLabel}
                    </span>
                    <h3 className="card-title">{card.title}</h3>
                    <p className="card-description">{card.description}</p>

                    {/* Impact com link condicional */}
                    {card.href ? (
                        <a
                            href={card.href}
                            rel="noopener noreferrer"
                            className="card-impact inline-flex items-center gap-1 hover:text-[#00B4A0] transition-colors group"
                        >
                            {card.impact}
                            <svg
                                className="w-3 h-3 transition-transform group-hover:translate-x-0.5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </a>
                    ) : (
                        <p className="card-impact">{card.impact}</p>
                    )}
                </div>
            ))}
        </div>
    );
}