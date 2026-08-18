'use client';

interface VertFlowProps {
    steps: string[];
    title?: string;
    className?: string;
}

function Arrow({
    direction,
}: {
    direction: 'right' | 'left' | 'down';
}) {
    const common = {
        viewBox: '0 0 24 24',
        fill: 'none',
        xmlns: 'http://www.w3.org/2000/svg',
        className:
            direction === 'down'
                ? 'w-[18px] h-[20px]'
                : 'w-[22px] h-[18px]',
        'aria-hidden': true,
    };

    const strokeProps = {
        stroke: '#00B4A0',
        strokeWidth: 1.8,
        strokeLinecap: 'round' as const,
        strokeLinejoin: 'round' as const,
    };

    return (
        <svg {...common}>
            {direction === 'right' && (
                <path
                    d="M3 12H20M14 6L20 12L14 18"
                    {...strokeProps}
                />
            )}

            {direction === 'left' && (
                <path
                    d="M21 12H4M10 6L4 12L10 18"
                    {...strokeProps}
                />
            )}

            {direction === 'down' && (
                <path
                    d="M12 3V20M6 14L12 20L18 14"
                    {...strokeProps}
                />
            )}
        </svg>
    );
}

export default function VertFlow({
    steps,
    title,
    className = '',
}: VertFlowProps) {
    if (!steps || steps.length === 0) return null;

    const rows: {
        left: string | null;
        right: string | null;
        direction: 'right' | 'left';
    }[] = [];

    let i = 0;
    let rowIndex = 0;

    while (i < steps.length) {
        const isEvenRow = rowIndex % 2 === 0;
        const hasPair = i + 1 < steps.length;

        if (hasPair) {
            if (isEvenRow) {
                rows.push({
                    left: steps[i],
                    right: steps[i + 1],
                    direction: 'right',
                });
            } else {
                rows.push({
                    left: steps[i + 1],
                    right: steps[i],
                    direction: 'left',
                });
            }

            i += 2;
        } else {
            const previousRowIsEven = (rowIndex - 1) % 2 === 0;

            rows.push({
                left: previousRowIsEven ? null : steps[i],
                right: previousRowIsEven ? steps[i] : null,
                direction: previousRowIsEven ? 'right' : 'left',
            });

            i++;
        }

        rowIndex++;
    }

    /*
     * Uma largura única para todos os cards.
     *
     * 220px funciona bem para labels como:
     * "Business Strategy"
     * "Business Semantics"
     * "Governance"
     * "Technology Platform"
     *
     * Textos maiores quebram dentro do mesmo card.
     */
    const cardClass = `
    w-[220px]
    max-w-full
    px-5 py-2.5
    bg-white
    border border-[#00B4A0] border-opacity-50
    rounded-lg
    text-sm font-medium text-[#2D3748]
    shadow-sm
    text-center
    leading-snug
  `;

    return (
        <div className={`flex flex-col items-center ${className}`}>
            {title && (
                <span className="text-sm font-semibold uppercase tracking-wider text-[#4A5568] opacity-60 mb-6">
                    {title}
                </span>
            )}

            <div className="w-full max-w-[500px]">
                {rows.map((row, rowIndex) => {
                    const isLastRow = rowIndex === rows.length - 1;

                    const hasLeft = row.left !== null;
                    const hasRight = row.right !== null;
                    const hasBoth = hasLeft && hasRight;

                    return (
                        <div key={rowIndex}>

                            {/* =================================================
                  CARD ROW
                  ================================================= */}
                            <div
                                className="
                  relative
                  grid
                  grid-cols-2
                  gap-6
                  items-center
                  min-h-[48px]
                "
                            >
                                {/* LEFT LANE */}
                                <div className="flex justify-center">
                                    {hasLeft && (
                                        <span className={cardClass}>
                                            {row.left}
                                        </span>
                                    )}
                                </div>

                                {/* RIGHT LANE */}
                                <div className="flex justify-center">
                                    {hasRight && (
                                        <span className={cardClass}>
                                            {row.right}
                                        </span>
                                    )}
                                </div>

                                {/* HORIZONTAL ARROW */}
                                {hasBoth && (
                                    <div
                                        className="
                      absolute
                      left-1/2
                      top-1/2
                      -translate-x-1/2
                      -translate-y-1/2
                      flex
                      items-center
                      justify-center
                      pointer-events-none
                    "
                                    >
                                        <Arrow direction={row.direction} />
                                    </div>
                                )}
                            </div>

                            {/* =================================================
                  VERTICAL ARROW
                  ================================================= */}
                            {!isLastRow && (
                                <div
                                    className="
                    grid
                    grid-cols-2
                    gap-6
                    h-7
                  "
                                >
                                    {/* LEFT LANE */}
                                    <div className="flex justify-center items-center">
                                        {row.direction === 'left' && (
                                            <Arrow direction="down" />
                                        )}
                                    </div>

                                    {/* RIGHT LANE */}
                                    <div className="flex justify-center items-center">
                                        {row.direction === 'right' && (
                                            <Arrow direction="down" />
                                        )}
                                    </div>
                                </div>
                            )}

                        </div>
                    );
                })}
            </div>
        </div>
    );
}