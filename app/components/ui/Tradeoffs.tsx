'use client';

interface TradeoffsProps {
    items: string[][];  // ← Agora aceita array de [left, right]
    className?: string;
}

export default function Tradeoffs({ items, className = '' }: TradeoffsProps) {
    if (!items || items.length === 0) return null;

    return (
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-3 max-w-4xl mx-auto ${className}`}>
            {items.map((tradeoff, index) => {
                const [left, right] = tradeoff;
                return (
                    <div
                        key={index}
                        className="flex items-center justify-between gap-4 px-4 py-3 bg-[#F8FAFC] rounded-lg border border-[#E8EEF4]"
                    >
                        <span className="text-sm font-medium text-[#0F4C8A]">{left}</span>
                        <span className="text-xs text-[#4A5568] uppercase tracking-wider">↔</span>
                        <span className="text-sm font-medium text-[#2D3748]">{right}</span>
                    </div>
                );
            })}
        </div>
    );
}