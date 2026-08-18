'use client';

interface DiagramProps {
    data: {
        center?: string;
        nodes?: string[];
        steps?: string[];
    };
    className?: string;
}

export default function Diagram({ data, className = '' }: DiagramProps) {
    if (!data) return null;

    // Check if there's any content to render
    const hasContent = data.center || (data.nodes && data.nodes.length > 0) || (data.steps && data.steps.length > 0);
    if (!hasContent) return null;

    return (
        <div className={`my-6 p-4 bg-[#F8FAFC] rounded-lg border border-[#E8EEF4] ${className}`}>
            <div className="font-mono text-sm text-[#2D3748] whitespace-pre-wrap">
                {/* Center */}
                {data.center && (
                    <div className="text-center font-bold text-[#0F4C8A] mb-3">
                        ─── {data.center} ───
                    </div>
                )}

                {/* Nodes (as tags/badges) */}
                {data.nodes && data.nodes.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-2 mb-2">
                        {data.nodes.map((node, index) => (
                            <span
                                key={index}
                                className="px-3 py-1 bg-white border border-[#E8EEF4] rounded text-xs text-[#2D3748]"
                            >
                                {node}
                            </span>
                        ))}
                    </div>
                )}

                {/* Steps (as a flow) */}
                {data.steps && data.steps.length > 0 && (
                    <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
                        {data.steps.map((step, index) => (
                            <span key={index} className="flex items-center gap-2">
                                <span className="px-3 py-1 bg-[#0F4C8A] text-white rounded">
                                    {step}
                                </span>
                                {index < data.steps.length - 1 && (
                                    <span className="text-[#00B4A0] font-bold">→</span>
                                )}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}