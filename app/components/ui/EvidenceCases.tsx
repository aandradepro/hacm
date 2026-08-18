'use client';

export interface EvidenceCase {
    title: string;
    problem: string;
    decision: string;
    outcome: string;
    metric?: string;
    metricLabel?: string;
}

interface EvidenceCasesProps {
    cases: EvidenceCase[];
    className?: string;
}

export default function EvidenceCases({
    cases,
    className = '',
}: EvidenceCasesProps) {
    if (!cases || cases.length === 0) return null;

    return (
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
            {cases.map((item, index) => (
                <article
                    key={`${item.title}-${index}`}
                    className="bg-white rounded-lg p-6 border border-[#E8EEF4] shadow-sm hover:shadow-md transition-shadow flex flex-col h-full"
                >
                    {/* Header */}
                    <div className="mb-4 flex items-start justify-between gap-4">
                        <div>
                            <span className="text-xs font-semibold uppercase tracking-wider text-[#4A5568] opacity-60">
                                Case {index + 1}
                            </span>
                            <h3 className="mt-1 text-lg font-semibold text-[#0F4C8A]">
                                {item.title}
                            </h3>
                        </div>

                        {item.metric && (
                            <div className="shrink-0 text-right">
                                <div className="text-2xl font-bold text-[#0F4C8A]">
                                    {item.metric}
                                </div>
                                {item.metricLabel && (
                                    <div className="text-xs text-[#4A5568] max-w-[110px] leading-tight">
                                        {item.metricLabel}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Case progression */}
                    <div className="flex flex-col flex-1">
                        <CaseBlock label="Problem" text={item.problem} />

                        <CaseConnector />

                        <CaseBlock label="Architectural Decision" text={item.decision} />

                        <CaseConnector />

                        <CaseBlock label="Business Outcome" text={item.outcome} emphasis />
                    </div>
                </article>
            ))}
        </div>
    );
}

interface CaseBlockProps {
    label: string;
    text: string;
    emphasis?: boolean;
}

function CaseBlock({ label, text, emphasis = false }: CaseBlockProps) {
    return (
        <div className={emphasis ? 'bg-[#F8FAFC] rounded-lg p-4' : 'p-1'}>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#4A5568] opacity-60">
                {label}
            </div>
            <p
                className={
                    emphasis
                        ? 'mt-1 text-sm font-medium leading-relaxed text-[#0F4C8A]'
                        : 'mt-1 text-sm leading-relaxed text-[#2D3748]'
                }
            >
                {text}
            </p>
        </div>
    );
}

function CaseConnector() {
    return (
        <div aria-hidden="true" className="my-2 flex items-center justify-center">
            <div className="h-4 w-px bg-[#E8EEF4]" />
        </div>
    );
}