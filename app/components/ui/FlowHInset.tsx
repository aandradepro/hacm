'use client';

interface FlowHInsetProps {
    title?: string;
    steps: string[];
    className?: string;
}

function StepsDisplay({ steps }: { steps: string[] }) {
    return (
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
            {steps.map((step, index) => {
                const isLast = index === steps.length - 1;
                return (
                    <span key={index} className="flex items-center gap-2">
                        <span className="px-3 py-1 bg-[#0F4C8A] text-white rounded">
                            {step}
                        </span>
                        {!isLast && (
                            <span className="text-[#00B4A0] font-bold">→</span>
                        )}
                    </span>
                );
            })}
        </div>
    );
}

export default function FlowHInset({ title, steps, className = '' }: FlowHInsetProps) {
    if (!steps || steps.length === 0) return null;

    return (
        <div className={`my-6 ${className}`}>
            {/* Título fora da caixa */}
            {title && (
                <div className="text-center font-bold text-[#0F4C8A] mb-3">
                    {title}
                </div>
            )}
            {/* Caixa com os steps */}
            <div className="p-4 bg-[#F8FAFC] rounded-lg border border-[#E8EEF4]">
                <div className="text-center font-mono text-sm text-[#2D3748] whitespace-pre-wrap">
                    <StepsDisplay steps={steps} />
                </div>
            </div>
        </div>
    );
}