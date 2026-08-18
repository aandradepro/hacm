'use client';

interface RelationshipProps {
    subject: { label: string; items: string[] };
    verb: string;
    object: { label: string; items: string[] };
    meaning: string;
    className?: string;
}

export default function RelationshipDiagram({
    subject,
    verb,
    object,
    meaning,
    className = '',
}: RelationshipProps) {
    if (!subject || !object) return null;

    return (
        <div className={`w-full max-w-4xl mx-auto ${className}`}>
            <div className="rd-outer">
                {/* Subject */}
                <div className="rd-panel rd-subject">
                    <BrickWall items={subject.items} side="subject" />
                    <span className="rd-panel-label">{subject.label}</span>
                </div>

                {/* Verb */}
                <div className="rd-verb">
                    <div className="rd-verb-line" />
                    <span className="rd-verb-word">{verb}</span>
                    {meaning && <p className="rd-verb-meaning">{meaning}</p>}
                </div>

                {/* Object */}
                <div className="rd-panel rd-object">
                    <BrickWall items={object.items} side="object" />
                    <span className="rd-panel-label">{object.label}</span>
                </div>
            </div>
        </div>
    );
}

// Distributes items into rows of 2, with the last row spanning full width if odd
function BrickWall({ items, side }: { items: string[]; side: 'subject' | 'object' }) {
    const rows: string[][] = [];
    let i = 0;
    while (i < items.length) {
        const remaining = items.length - i;
        if (remaining === 1) {
            rows.push([items[i]]);
            i += 1;
        } else {
            rows.push([items[i], items[i + 1]]);
            i += 2;
        }
    }

    return (
        <div className="rd-wall">
            {rows.map((row, ri) => (
                <div key={ri} className="rd-row">
                    {row.map((item, ci) => (
                        <span key={ci} className="rd-brick" title={item}>
                            {item}
                        </span>
                    ))}
                </div>
            ))}
        </div>
    );
}