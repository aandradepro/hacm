'use client';

import { useEffect, useRef, useState } from 'react';

// ── Types ─────────────────────────────────────────────────────────────────────
// interface OrbitNode {
//     icon: string;
//     title: string;
//     description: string;
// }

interface OrbitDiagramProps {
    center: string;
    nodes: OrbitDiagramNode[];
    outcome?: string;
    cycleText?: string;
    className?: string;
}

interface Pos { x: number; y: number; }


import { z } from 'zod';
import { ComponentBaseSchema } from '@/content-model/common';

export const OrbitDiagramNodeSchema = z.object({
    icon: z.string().optional().default(''),
    title: z.string(),
    description: z.string(),
});

export type OrbitDiagramNode = z.infer<typeof OrbitDiagramNodeSchema>;

export const OrbitDiagramContentSchema = z.object({
    center: z.string(),
    nodes: z.array(OrbitDiagramNodeSchema),
    outcome: z.string(),
    cycleText: z.string().optional(),
});

export type OrbitDiagramContent = z.infer<typeof OrbitDiagramContentSchema>;

export const OrbitDiagramComponentSchema = ComponentBaseSchema.extend({
    componentType: z.literal('orbitDiagram'),
    content: OrbitDiagramContentSchema,
});

export type OrbitDiagramComponent = z.infer<typeof OrbitDiagramComponentSchema>;

// ── Helpers ───────────────────────────────────────────────────────────────────
function wrapText(text: string, maxChars: number): string[] {
    const words = text.split(' ');
    const lines: string[] = [];
    let cur = '';
    for (const w of words) {
        const next = cur ? `${cur} ${w}` : w;
        if (next.length > maxChars && cur) { lines.push(cur); cur = w; }
        else cur = next;
    }
    if (cur) lines.push(cur);
    return lines;
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function OrbitDiagram({
    center,
    nodes,
    outcome,
    cycleText,
    className = '',
}: OrbitDiagramProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState(700);
    const [mounted, setMounted] = useState(false);
    const [hovered, setHovered] = useState<number | null>(null);

    useEffect(() => {
        setMounted(true);
        const observer = new ResizeObserver(entries => {
            for (const e of entries) setWidth(e.contentRect.width);
        });
        if (containerRef.current) {
            observer.observe(containerRef.current);
            setWidth(containerRef.current.offsetWidth);
        }
        return () => observer.disconnect();
    }, []);

    if (!center || !nodes || nodes.length === 0) return null;

    const isMobile = width < 520;

    // ── Typography ────────────────────────────────────────────────────────────
    const centerFontSize = Math.max(13, Math.min(18, width * 0.032));
    const iconFontSize = Math.max(18, Math.min(28, width * 0.044));
    const titleFont = Math.max(10, Math.min(13, width * 0.022));
    const descFont = Math.max(8, Math.min(10, width * 0.016));
    const descLineH = descFont * 1.45;
    const cycleFont = Math.max(11, Math.min(14, width * 0.020));
    const outcomeFont = Math.max(10, Math.min(13, width * 0.020));

    // ── cycleText: SVG arc path for textPath ──────────────────────────────────
    const buildCycleArcPath = (
        pcx: number, pcy: number, prx: number, pry: number
    ): string => {
        const x1 = pcx - prx;
        const x2 = pcx + prx;
        const y = pcy;
        return `M ${x1},${y} A ${prx},${pry} 0 1,1 ${x2},${y}`;
    };

    // ── Node box geometry ─────────────────────────────────────────────────────
    // Verificar se o nó tem ícone
    const hasIcon = (node: OrbitDiagramNode) => node.icon && node.icon.trim() !== '';

    // Altura do ícone (0 se não tiver ícone)
    const getIconHeight = (node: OrbitDiagramNode) => hasIcon(node) ? iconFontSize : 0;

    const nodeW = Math.min(width * 0.28, 155);
    const descChars = Math.floor(nodeW / (descFont * 0.56));
    const descLines = (desc: string) => wrapText(desc, descChars);
    const nodeH = (node: OrbitDiagramNode) => {
        const dl = descLines(node.description).length;
        const iconH = getIconHeight(node);
        // Se tiver ícone: iconFontSize + titleFont*1.6 + desc + padding
        // Se não tiver ícone: apenas titleFont*1.6 + desc + padding (sem espaço para ícone)
        const titleSpace = titleFont * 1.6;
        const padding = 22;
        const iconSpace = iconH > 0 ? iconH + 4 : 0; // 4px de gap se tiver ícone
        return iconSpace + titleSpace + dl * descLineH + padding;
    };
    const maxNodeH = Math.max(...nodes.map(n => nodeH(n)));

    // ── Orbit ellipse ─────────────────────────────────────────────────────────
    const orbitRx = width * 0.3255;
    const orbitRy = orbitRx * 0.52;

    const outerRx = orbitRx + nodeW * 0.52 + (cycleText ? 18 : 0);
    const outerRy = orbitRy + maxNodeH * 0.52 + (cycleText ? 14 : 0);

    // ── Center box ────────────────────────────────────────────────────────────
    const centerW = Math.min(width * 0.32, 160);
    const centerH = Math.max(width * 0.12, 52);
    const centerPad = Math.sqrt(centerW * centerW + centerH * centerH) / 2 + 6;
    const nodePadFn = (node: OrbitDiagramNode) => {
        const h = nodeH(node);
        return Math.sqrt(nodeW * nodeW + h * h) / 2 + 4;
    };

    // ── Bounding box → viewBox ────────────────────────────────────────────────
    const pad = 16;
    let rawMinX = -(outerRx + pad);
    let rawMaxX = (outerRx + pad);
    let rawMinY = -(outerRy + pad);
    let rawMaxY = (outerRy + pad);

    if (outcome) rawMaxY += outcomeFont * 7;

    const angles: number[] = nodes.map((_, i) =>
        (2 * Math.PI * i) / nodes.length - Math.PI / 2
    );

    for (let i = 0; i < nodes.length; i++) {
        const angle = angles[i];
        const nx = orbitRx * Math.cos(angle);
        const ny = orbitRy * Math.sin(angle);
        const h = nodeH(nodes[i]);
        rawMinX = Math.min(rawMinX, nx - nodeW / 2 - pad);
        rawMaxX = Math.max(rawMaxX, nx + nodeW / 2 + pad);
        rawMinY = Math.min(rawMinY, ny - h / 2 - pad);
        rawMaxY = Math.max(rawMaxY, ny + h / 2 + pad);
    }

    const cx = -rawMinX;
    const cy = -rawMinY;
    const vbW = rawMaxX - rawMinX;
    const vbH = rawMaxY - rawMinY;

    const nodePositions: Pos[] = angles.map(angle => ({
        x: cx + orbitRx * Math.cos(angle),
        y: cy + orbitRy * Math.sin(angle),
    }));

    const outcomeY = cy + orbitRy + maxNodeH * 0.55 + outcomeFont * 5.5;

    // ── Mobile fallback ───────────────────────────────────────────────────────
    if (isMobile) {
        return (
            <div ref={containerRef} className={`w-full max-w-xl mx-auto my-6 ${className}`}>
                {cycleText && <div className="od-mobile-cycle">↻ {cycleText}</div>}
                <div className="od-mobile-center">{center}</div>
                <div className="od-mobile-grid">
                    {nodes.map((n, i) => (
                        <div key={i} className="od-mobile-node">
                            {hasIcon(n) && <span className="od-mobile-icon">{n.icon}</span>}
                            <div className="od-mobile-title">{n.title}</div>
                            <div className="od-mobile-desc">{n.description}</div>
                        </div>
                    ))}
                </div>
                {outcome && <div className="od-mobile-outcome">⟶ {outcome}</div>}
            </div>
        );
    }

    // ── SVG desktop ───────────────────────────────────────────────────────────
    return (
        <div
            ref={containerRef}
            className={`w-full max-w-4xl mx-auto my-6 select-none ${className}`}
            role="img"
            aria-label={`${center}: ${nodes.map(n => n.title).join(', ')}${outcome ? `. ${outcome}` : ''}`}
        >
            {mounted && (
                <svg
                    viewBox={`0 0 ${vbW.toFixed(1)} ${vbH.toFixed(1)}`}
                    width="100%"
                    style={{ display: 'block', aspectRatio: (vbW / vbH).toFixed(4) }}
                    aria-hidden="true"
                >
                    <defs>
                        <radialGradient id="od-center-glow-grad" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="#0F4C8A" stopOpacity="0.28" />
                            <stop offset="100%" stopColor="#0F4C8A" stopOpacity="0" />
                        </radialGradient>
                        <radialGradient id="od-bg-glow" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="#00B4A0" stopOpacity="0.06" />
                            <stop offset="100%" stopColor="#00B4A0" stopOpacity="0" />
                        </radialGradient>
                        <filter id="od-shadow-center" x="-40%" y="-40%" width="180%" height="180%">
                            <feDropShadow dx="0" dy="3" stdDeviation="7" floodColor="#0F4C8A" floodOpacity="0.30" />
                        </filter>
                        <filter id="od-shadow-node" x="-20%" y="-20%" width="140%" height="140%">
                            <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#00B4A0" floodOpacity="0.15" />
                        </filter>
                        <filter id="od-shadow-node-hover" x="-20%" y="-20%" width="140%" height="140%">
                            <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#00B4A0" floodOpacity="0.30" />
                        </filter>
                        <linearGradient id="od-center-grad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#1A5EA8" />
                            <stop offset="100%" stopColor="#0A3D70" />
                        </linearGradient>
                        <linearGradient id="od-outcome-grad" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#0F4C8A" />
                            <stop offset="100%" stopColor="#00B4A0" />
                        </linearGradient>
                        <filter id="od-outcome-shadow" x="-8%" y="-20%" width="116%" height="140%">
                            <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#00B4A0" floodOpacity="0.35" />
                        </filter>
                    </defs>

                    {/* Ambient background */}
                    <ellipse cx={cx} cy={cy} rx={outerRx * 0.95} ry={outerRy * 0.95} fill="url(#od-bg-glow)" />

                    {/* Outer ring (cycle) + cycleText via textPath */}
                    {cycleText && (() => {
                        const arcPath = buildCycleArcPath(cx, cy, outerRx, outerRy);
                        return (
                            <>
                                <ellipse
                                    cx={cx} cy={cy}
                                    rx={outerRx} ry={outerRy}
                                    fill="none"
                                    stroke="#0F4C8A"
                                    strokeWidth="1.5"
                                    strokeDasharray="3 8"
                                    className="od-outer-ring"
                                />
                                <defs>
                                    <path id="od-cycle-arc" d={arcPath} fill="none" />
                                </defs>
                                <text
                                    fontFamily="system-ui, sans-serif"
                                    fontSize={cycleFont}
                                    fontWeight="700"
                                    fill="#2E86AB"
                                    letterSpacing="0.18em"
                                >
                                    <textPath href="#od-cycle-arc" startOffset="50%" textAnchor="middle">
                                        {cycleText.toUpperCase()}
                                    </textPath>
                                </text>
                            </>
                        );
                    })()}

                    {/* Orbit ring */}
                    <ellipse
                        cx={cx} cy={cy}
                        rx={orbitRx} ry={orbitRy}
                        fill="none"
                        stroke="#007A6E"
                        strokeWidth="1.8"
                        strokeDasharray="5 9"
                        className="od-orbit-ring"
                    />

                    {/* Connection lines */}
                    {nodePositions.map((pos, i) => {
                        const dx = pos.x - cx;
                        const dy = pos.y - cy;
                        const dist = Math.sqrt(dx * dx + dy * dy);
                        const ux = dx / dist;
                        const uy = dy / dist;
                        const np = nodePadFn(nodes[i]);
                        return (
                            <line
                                key={i}
                                x1={cx + ux * centerPad} y1={cy + uy * centerPad}
                                x2={pos.x - ux * np} y2={pos.y - uy * np}
                                stroke="#00B4A0"
                                strokeWidth="1.4"
                                strokeOpacity={hovered === i ? 0.7 : 0.35}
                                strokeDasharray="4 6"
                            />
                        );
                    })}

                    {/* Center halo */}
                    <ellipse
                        cx={cx} cy={cy}
                        rx={orbitRx * 0.26} ry={orbitRy * 0.44}
                        fill="url(#od-center-glow-grad)"
                        className="od-center-glow"
                    />

                    {/* ── Orbit nodes ── */}
                    {nodes.map((node, i) => {
                        const { x, y } = nodePositions[i];
                        const h = nodeH(node);
                        const dLines = descLines(node.description);
                        const isHov = hovered === i;
                        const hasNodeIcon = hasIcon(node);
                        const iconH = getIconHeight(node);

                        // Posicionamento: se tiver ícone, começa com ele; senão, começa direto com o título
                        const innerTop = y - h / 2 + 10;
                        let currentY = innerTop;

                        // Só adiciona espaço para ícone se existir
                        const iconY = hasNodeIcon ? currentY + iconH * 0.8 : currentY;
                        if (hasNodeIcon) currentY += iconH + 4;

                        const titleY = currentY + titleFont * 0.8;
                        currentY += titleFont * 1.6;

                        const descStartY = currentY + descFont * 0.4;

                        return (
                            <g
                                key={i}
                                className={`od-node od-node-${i}`}
                                style={{ transformOrigin: `${x}px ${y}px` }}
                                filter={isHov ? 'url(#od-shadow-node-hover)' : 'url(#od-shadow-node)'}
                                onMouseEnter={() => setHovered(i)}
                                onMouseLeave={() => setHovered(null)}
                                role="button"
                                aria-label={`${node.title}: ${node.description}`}
                                tabIndex={0}
                            >
                                <circle cx={x} cy={y} r={3} fill="#00B4A0" opacity="0.6" />

                                <rect
                                    x={x - nodeW / 2} y={y - h / 2}
                                    width={nodeW} height={h}
                                    rx={10} ry={10}
                                    fill={isHov ? '#F0FAFA' : 'white'}
                                    stroke={isHov ? '#00B4A0' : '#B8E0DC'}
                                    strokeWidth={isHov ? 1.5 : 1}
                                />

                                {/* Ícone - só renderiza se existir */}
                                {hasNodeIcon && (
                                    <text x={x} y={iconY} textAnchor="middle" fontSize={iconFontSize}>
                                        {node.icon}
                                    </text>
                                )}

                                <text
                                    x={x} y={titleY}
                                    textAnchor="middle"
                                    fontSize={titleFont}
                                    fontFamily="system-ui, sans-serif"
                                    fontWeight="700"
                                    fill="#0F4C8A"
                                >
                                    {node.title}
                                </text>

                                {dLines.map((ln, li) => (
                                    <text
                                        key={li}
                                        x={x} y={descStartY + li * descLineH}
                                        textAnchor="middle"
                                        fontSize={descFont}
                                        fontFamily="system-ui, sans-serif"
                                        fontWeight="400"
                                        fill="#4A5568"
                                    >
                                        {ln}
                                    </text>
                                ))}
                            </g>
                        );
                    })}

                    {/* ── Center node ── */}
                    <g filter="url(#od-shadow-center)">
                        <rect
                            x={cx - centerW / 2 - 4} y={cy - centerH / 2 - 4}
                            width={centerW + 8} height={centerH + 8}
                            rx={16} ry={16}
                            fill="none"
                            stroke="#00B4A0"
                            strokeWidth="1.5"
                            strokeOpacity="0.4"
                        />
                        <rect
                            x={cx - centerW / 2} y={cy - centerH / 2}
                            width={centerW} height={centerH}
                            rx={12} ry={12}
                            fill="url(#od-center-grad)"
                        />
                        <text
                            x={cx} y={cy + centerFontSize * 0.38}
                            textAnchor="middle"
                            fontSize={centerFontSize}
                            fontFamily="system-ui, sans-serif"
                            fontWeight="700"
                            fill="white"
                            letterSpacing="0.03em"
                        >
                            {center}
                        </text>
                    </g>

                    {/* ── Outcome badge ── */}
                    {outcome && (() => {
                        const badgeW = Math.min(vbW * 0.62, 380);
                        const badgeH = outcomeFont * 2.8;
                        const badgeX = cx - badgeW / 2;
                        const badgeY = outcomeY - badgeH / 2;
                        const connectorTopY = cy + orbitRy + maxNodeH * 0.55 + 6;
                        const gapTop = connectorTopY + 25;
                        const gapBot = badgeY - 6;
                        const gapH = gapBot - gapTop;
                        const numChevrons = 4;
                        const topW = Math.min(vbW * 0.225, 130);
                        const botW = Math.min(badgeW * 0.14, 40);
                        const chevH = 11;
                        const overlap = 4;
                        const step = chevH - overlap;
                        const funnelH = chevH + step * (numChevrons - 1);
                        const extra = gapH - funnelH;
                        const stackTop = gapTop + (extra * 0.9);

                        return (
                            <g>
                                {/* Chevron funnel */}
                                {Array.from({ length: numChevrons }).map((_, i) => {
                                    const t = i / (numChevrons - 1);
                                    const w = topW + (botW - topW) * t;
                                    const yTop = stackTop + i * step;
                                    const yBot = yTop + chevH;
                                    const opacity = 0.55 - t * 0.18;
                                    return (
                                        <polygon
                                            key={i}
                                            points={`${cx - w / 2},${yTop} ${cx + w / 2},${yTop} ${cx},${yBot}`}
                                            fill="#0F4C8A"
                                            opacity={opacity}
                                        />
                                    );
                                })}

                                {/* Horizontal rules */}
                                <line
                                    x1={cx - badgeW * 0.55} y1={outcomeY}
                                    x2={badgeX - 8} y2={outcomeY}
                                    stroke="#0F4C8A" strokeWidth="1" strokeOpacity="0.25"
                                />
                                <line
                                    x1={badgeX + badgeW + 8} y1={outcomeY}
                                    x2={cx + badgeW * 0.55} y2={outcomeY}
                                    stroke="#0F4C8A" strokeWidth="1" strokeOpacity="0.25"
                                />

                                {/* Badge pill */}
                                <rect
                                    x={badgeX} y={badgeY}
                                    width={badgeW} height={badgeH}
                                    rx={badgeH / 2} ry={badgeH / 2}
                                    fill="url(#od-outcome-grad)"
                                    filter="url(#od-outcome-shadow)"
                                />

                                {/* Badge text */}
                                <text
                                    x={cx} y={outcomeY + outcomeFont * 0.38}
                                    textAnchor="middle"
                                    fontSize={outcomeFont}
                                    fontFamily="system-ui, sans-serif"
                                    fontWeight="700"
                                    fill="white"
                                    letterSpacing="0.10em"
                                >
                                    {outcome.toUpperCase()}
                                </text>
                            </g>
                        );
                    })()}
                </svg>
            )}
        </div>
    );
}