'use client';

interface ArchitectureModelProps {
    existingLabel: string;
    architectureLabel: string;
    evolvingLabel: string;
    capabilities?: string[];
    className?: string;
    // Novas props para os textos fixos que variam por idioma
    existingEyebrow?: string;
    architectureEyebrow?: string;
    evolvingEyebrow?: string;
}

export default function ArchitectureModel({
    existingLabel,
    architectureLabel,
    evolvingLabel,
    capabilities = [],
    className = '',
    existingEyebrow = 'Existing',
    architectureEyebrow = 'Architecture',
    evolvingEyebrow = 'Evolving',
}: ArchitectureModelProps) {
    return (
        <div className={`architecture-model-container ${className}`}>
            <div className="architecture-model-existing">
                <span className="architecture-model-eyebrow">{existingEyebrow}</span>
                <div className="architecture-model-label">{existingLabel}</div>
            </div>

            <div className="architecture-model-architecture">
                <span className="architecture-model-eyebrow">{architectureEyebrow}</span>
                <div className="architecture-model-label">{architectureLabel}</div>
                {capabilities.length > 0 && (
                    <div className="architecture-model-capabilities">
                        {capabilities.map((cap, index) => (
                            <span key={index}>{cap}</span>
                        ))}
                    </div>
                )}
                <span className="architecture-model-mark">~Å~</span>
            </div>

            <div className="architecture-model-evolving">
                <span className="architecture-model-eyebrow">{evolvingEyebrow}</span>
                <div className="architecture-model-label">{evolvingLabel}</div>
            </div>
        </div>
    );
}