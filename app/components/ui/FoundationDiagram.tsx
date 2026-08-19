'use client';

interface FoundationDiagramProps {
    data?: {
        left: {
            label: string;
            eyebrow?: string;
        };
        center: {
            label: string;
            eyebrow?: string;
            capabilities?: string[];
        };
        right: {
            label: string;
            eyebrow?: string;
        };
    };
    className?: string;
}

export default function FoundationDiagram({
    data,
    className = '',
}: FoundationDiagramProps) {
    // Fallback se data for undefined
    if (!data) {
        return null;
    }

    const { left, center, right } = data;

    return (
        <div className={`foundation-diagram-container ${className}`}>
            <div className="foundation-diagram-left">
                <span className="foundation-diagram-eyebrow">{left.eyebrow}</span>
                <div className="foundation-diagram-label">{left.label}</div>
            </div>

            <div className="foundation-diagram-center">
                <span className="foundation-diagram-eyebrow">{center.eyebrow}</span>
                <div className="foundation-diagram-label">{center.label}</div>
                {center.capabilities && center.capabilities.length > 0 && (
                    <div className="foundation-diagram-capabilities">
                        {center.capabilities.map((cap, index) => (
                            <span key={index}>{cap}</span>
                        ))}
                    </div>
                )}
                <span className="foundation-diagram-mark">~Å~</span>
            </div>

            <div className="foundation-diagram-right">
                <span className="foundation-diagram-eyebrow">{right.eyebrow}</span>
                <div className="foundation-diagram-label">{right.label}</div>
            </div>
        </div>
    );
}