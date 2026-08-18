'use client';

interface ListItem {
    text: string;
    subitems?: string[];
}

interface ListProps {
    items: ListItem[] | string[];
    className?: string;
    bullet?: 'disc' | 'dash' | 'none';
}

export default function List({ items, className = '', bullet = 'disc' }: ListProps) {
    if (!items || items.length === 0) return null;

    const bulletSymbol = {
        disc: '•',
        dash: '◦',  // ← white bullet (círculo vazio) - mesmo tamanho, visual diferente
        none: '',
    };

    const normalizedItems: ListItem[] = items.map((item) =>
        typeof item === 'string' ? { text: item } : item
    );

    return (
        <div className={`space-y-4 max-w-4xl ${className}`}>
            {normalizedItems.map((item, index) => (
                <div key={index}>
                    <p className="body-text text-[#2D3748] flex items-start gap-3">
                        {bullet !== 'none' && (
                            <span className="text-[#00B4A0] font-bold mt-0.5">
                                {bulletSymbol[bullet]}
                            </span>
                        )}
                        <span>{item.text}</span>
                    </p>
                    {item.subitems && item.subitems.length > 0 && (
                        <div className="ml-8 mt-1 space-y-1">
                            {item.subitems.map((subitem, subIndex) => (
                                <p key={subIndex} className="text-sm text-[#4A5568] flex items-start gap-3">
                                    <span className="text-[#00B4A0] font-bold mt-0.5">◦</span>
                                    <span>{subitem}</span>
                                </p>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}