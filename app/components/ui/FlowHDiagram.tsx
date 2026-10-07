'use client';

interface FlowHDiagramProps {
    title?: string;
    steps: string[];
    className?: string;
}

function Arrow({ direction }: { direction: 'right' | 'down' | 'up' }) {
    const strokeProps = {
        stroke: '#00B4A0',
        strokeWidth: 1.8,
        strokeLinecap: 'round' as const,
        strokeLinejoin: 'round' as const,
    };

    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={
                direction === 'right' ? 'w-[22px] h-[18px]' : 'w-[18px] h-[20px]'
            }
            aria-hidden
        >
            {direction === 'right' && (
                <path d="M3 12H20M14 6L20 12L14 18" {...strokeProps} />
            )}
            {direction === 'down' && (
                <path d="M12 3V20M6 14L12 20L18 14" {...strokeProps} />
            )}
            {direction === 'up' && (
                <path d="M12 21V4M6 10L12 4L18 10" {...strokeProps} />
            )}
        </svg>
    );
}

function Card({ children }: { children: React.ReactNode }) {
    return (
        <div
            className="
                w-[150px] h-[52px]
                px-3
                flex items-center justify-center
                bg-white
                border border-[#00B4A0] border-opacity-50
                rounded-lg
                text-sm font-medium text-[#2D3748] leading-snug
                shadow-sm text-center
                overflow-hidden
            "
        >
            <span className="line-clamp-2">{children}</span>
        </div>
    );
}

/*
 * Zigzag em 2 linhas:
 *
 *   [A]   [D] → [E]   [H]
 *    ↓     ↑     ↓     ↑
 *   [B] → [C]   [F] → [G]
 *
 * Grid: colunas alternam card (150px) / conector (40px).
 * Linhas: 1 = topo, 2 = seta vertical, 3 = base.
 *
 * Coluna par:   steps[2c] em cima, steps[2c+1] embaixo (↓)
 * Coluna ímpar: steps[2c] embaixo, steps[2c+1] em cima (↑)
 * Conector após coluna par → linha 3 (base); após ímpar → linha 1 (topo).
 */
export default function FlowHDiagram({
    steps,
    title,
    className = '',
}: FlowHDiagramProps) {
    if (!steps || steps.length === 0) return null;

    const columnCount = Math.ceil(steps.length / 2);

    const gridTemplateColumns = Array.from({ length: columnCount * 2 - 1 }, (_, i) =>
        i % 2 === 0 ? '150px' : '40px'
    ).join(' ');

    const items: React.ReactNode[] = [];

    for (let c = 0; c < columnCount; c++) {
        const isEven = c % 2 === 0;
        const first = steps[c * 2] ?? null;
        const second = steps[c * 2 + 1] ?? null;

        const topStep = isEven ? first : second;
        const bottomStep = isEven ? second : first;
        const gridCol = c * 2 + 1; // 1-based

        if (topStep) {
            items.push(
                <div
                    key={`top-${c}`}
                    style={{ gridColumn: gridCol, gridRow: 1 }}
                    className="flex items-center justify-center"
                >
                    <Card>{topStep}</Card>
                </div>
            );
        }

        if (topStep && bottomStep) {
            items.push(
                <div
                    key={`v-${c}`}
                    style={{ gridColumn: gridCol, gridRow: 2 }}
                    className="flex items-center justify-center"
                >
                    <Arrow direction={isEven ? 'down' : 'up'} />
                </div>
            );
        }

        if (bottomStep) {
            items.push(
                <div
                    key={`bottom-${c}`}
                    style={{ gridColumn: gridCol, gridRow: 3 }}
                    className="flex items-center justify-center"
                >
                    <Card>{bottomStep}</Card>
                </div>
            );
        }

        if (c < columnCount - 1) {
            items.push(
                <div
                    key={`h-${c}`}
                    style={{ gridColumn: gridCol + 1, gridRow: isEven ? 3 : 1 }}
                    className="flex items-center justify-center"
                >
                    <Arrow direction="right" />
                </div>
            );
        }
    }

    return (
        <div className={`flex flex-col items-center ${className}`}>
            {title && (
                <span className="text-sm font-semibold uppercase tracking-wider text-[#4A5568] opacity-60 mb-6">
                    {title}
                </span>
            )}

            <div
                className="grid gap-y-3"
                style={{
                    gridTemplateColumns,
                    gridTemplateRows: '52px 20px 52px',
                }}
            >
                {items}
            </div>
        </div>
    );
}