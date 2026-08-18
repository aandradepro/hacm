'use client';

interface SAPPerspectiveProps {
    text: string | string[];
    className?: string;
}

export default function SAPPerspective({ text, className = '' }: SAPPerspectiveProps) {
    if (!text) return null;

    // Converte para array se for string
    const items = Array.isArray(text) ? text : [text];

    return (
        <div className={`sap-perspective ${className}`}>
            <div className="sap-perspective-label">SAP Perspective</div>
            <p className="sap-perspective-text text-center">
                {items.map((item, index) => (
                    <span key={index}>
                        {item}
                        {index < items.length - 1 && (
                            <span className="mx-2 text-[#00B4A0] opacity-50">•</span>
                        )}
                    </span>
                ))}
            </p>
        </div>
    );
}