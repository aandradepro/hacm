'use client';

interface TradeoffsProps {
    title?: string;
    items: [string, string][];
    className?: string;
}

export default function Tradeoffs({ title, items, className = '' }: TradeoffsProps) {
    if (!items || items.length === 0) return null;

    return (
        <div className={`my-6 ${className}`}>
            {title && (
                <h3 className="text-lg font-semibold text-[#0F4C8A] mb-4 text-center">
                    {title}
                </h3>
            )}
            <div className="space-y-3">
                {items.map((pair, index) => {
                    const [left, right] = pair;
                    return (
                        <div
                            key={index}
                            className="relative grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 items-stretch"
                        >
                            <div className="bg-white border-2 border-[#0F4C8A]/30 rounded-lg p-4 flex items-center justify-center shadow-sm">
                                <span className="text-sm font-semibold text-[#0F4C8A] text-center">
                                    {left}
                                </span>
                            </div>
                            <div className="bg-[#00B4A0]/5 border-2 border-[#00B4A0]/40 rounded-lg p-4 flex items-center justify-center shadow-sm">
                                <span className="text-sm font-medium text-[#2D3748] text-center">
                                    {right}
                                </span>
                            </div>

                            {/* Símbolo ↔ entre as caixas */}
                            <div
                                className="
                                    absolute
                                    left-1/2
                                    top-1/2
                                    -translate-x-1/2
                                    -translate-y-1/2
                                    hidden md:flex
                                    items-center justify-center
                                    w-8 h-8
                                    rounded-full
                                    bg-white
                                    border-2 border-[#00B4A0]
                                    text-[#00B4A0]
                                    text-base
                                    font-bold
                                    shadow-sm
                                    pointer-events-none
                                "
                                aria-hidden="true"
                            >
                                ↔
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}