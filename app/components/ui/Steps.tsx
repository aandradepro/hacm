'use client';

interface Step {
    step: string;
    description: string;
}

interface StepsProps {
    items: Step[];
    className?: string;
    columns?: 2 | 3 | 4;
}

export default function Steps({ items, className = '', columns = 4 }: StepsProps) {
    if (!items || items.length === 0) return null;

    const gridCols = {
        2: 'md:grid-cols-2',
        3: 'md:grid-cols-3',
        4: 'md:grid-cols-2 lg:grid-cols-4',
    };

    return (
        <div className={`grid grid-cols-1 ${gridCols[columns]} gap-4 ${className}`}>
            {items.map((step, index) => (
                <div
                    key={index}
                    className="bg-white rounded-lg p-5 border border-[#E8EEF4] shadow-sm hover:shadow-md transition-shadow"
                >
                    <div className="flex items-center gap-3 mb-2">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#0F4C8A] text-white text-sm font-bold">
                            {index + 1}
                        </span>
                        <span className="font-semibold text-[#0F4C8A]">
                            {step.step}
                        </span>
                    </div>
                    <p className="text-sm text-[#2D3748] leading-relaxed">
                        {step.description}
                    </p>
                </div>
            ))}
        </div>
    );
}