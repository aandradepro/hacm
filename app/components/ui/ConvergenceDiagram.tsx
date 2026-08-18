'use client';

import { useEffect, useRef, useState } from 'react';

interface ConvergenceDiagramProps {
    center: string;
    nodes: string[];
    className?: string;
}

interface NodePosition {
    x: number;
    y: number;
}

export default function ConvergenceDiagram({
    center,
    nodes,
    className = '',
}: ConvergenceDiagramProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState(600);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                setWidth(entry.contentRect.width);
            }
        });
        if (containerRef.current) {
            observer.observe(containerRef.current);
            setWidth(containerRef.current.offsetWidth);
        }
        return () => observer.disconnect();
    }, []);

    if (!center || !nodes || nodes.length === 0) return null;

    // ── Fonts & labels ────────────────────────────────────────────────────────
    const nodeFontSize = Math.max(10, Math.min(13, width * 0.022));
    const centerFontSize = Math.max(12, Math.min(16, width * 0.028));
    const lineHeight = nodeFontSize * 1.35;

    const splitLabel = (text: string): string[] => {
        if (text.length <= 14) return [text];
        const mid = Math.floor(text.length / 2);
        const before = text.lastIndexOf(' ', mid);
        const after = text.indexOf(' ', mid);
        const breakAt =
            before === -1 && after === -1 ? mid :
                before === -1 ? after :
                    after === -1 ? before :
                        mid - before <= after - mid ? before : after;
        return [text.slice(0, breakAt).trim(), text.slice(breakAt).trim()];
    };

    // ── Box sizes ─────────────────────────────────────────────────────────────
    const nodeW = Math.min(width * 0.26, 130);
    const nodeHSingle = Math.max(width * 0.076, 30);
    const nodeHTwoLine = nodeHSingle + lineHeight;

    const centerW = Math.min(width * 0.34, 165);
    const centerH = Math.max(width * 0.115, 44);

    const centerPad = Math.sqrt(centerW * centerW + centerH * centerH) / 2 + 4;
    const nodePadBase = Math.sqrt(nodeW * nodeW + nodeHTwoLine * nodeHTwoLine) / 2 + 4;

    // ── Elliptical orbit radii ────────────────────────────────────────────────
    // orbitRx sets horizontal spread; orbitRy is ~52% of that → tall savings
    const orbitRx = width * 0.3255;
    const orbitRy = orbitRx * 0.52;

    // ── Step 1: compute bounding box with centre at origin ───────────────────
    const pad = 14; // shadow + breathing room
    const halfNodeW = nodeW / 2 + pad;
    const halfNodeHTL = nodeHTwoLine / 2 + pad;

    // Start bbox from the center box itself
    let rawMinX = -(centerW / 2 + pad);
    let rawMaxX = (centerW / 2 + pad);
    let rawMinY = -(centerH / 2 + pad);
    let rawMaxY = (centerH / 2 + pad);

    const angles = nodes.map((_, i) =>
        (2 * Math.PI * i) / nodes.length - Math.PI / 2
    );

    // Expand bbox for each node position (relative to origin)
    for (const angle of angles) {
        const nx = orbitRx * Math.cos(angle);
        const ny = orbitRy * Math.sin(angle);
        rawMinX = Math.min(rawMinX, nx - halfNodeW);
        rawMaxX = Math.max(rawMaxX, nx + halfNodeW);
        rawMinY = Math.min(rawMinY, ny - halfNodeHTL);
        rawMaxY = Math.max(rawMaxY, ny + halfNodeHTL);
    }

    // ── Step 2: shift so all coords are positive ──────────────────────────────
    // cx/cy = how much we shift (offset from origin to top-left of bbox)
    const cx = -rawMinX;
    const cy = -rawMinY;

    // viewBox dimensions
    const vbW = rawMaxX - rawMinX;
    const vbH = rawMaxY - rawMinY;

    // ── Step 3: node positions in final SVG coords ────────────────────────────
    const nodePositions: NodePosition[] = angles.map(angle => ({
        x: cx + orbitRx * Math.cos(angle),
        y: cy + orbitRy * Math.sin(angle),
    }));

    const aspectRatio = vbW / vbH;

    return (
        <div
            ref={containerRef}
            className={`w-full max-w-2xl mx-auto my-6 select-none ${className}`}
        >
            <style>{`
                @keyframes orbitPulse {
                    0%, 100% { opacity: 0.18; }
                    50%       { opacity: 0.40; }
                }
                @keyframes nodeFloat {
                    0%, 100% { transform: translateY(0px); }
                    50%       { transform: translateY(-4px); }
                }
                .cv-orbit-ring { animation: orbitPulse 5s ease-in-out infinite; }
                .cv-node       { animation: nodeFloat 4s ease-in-out infinite; }
                ${nodes.map((_, i) => `.cv-node-${i} { animation-delay: ${(i * 0.45).toFixed(2)}s; }`).join('\n')}
            `}</style>

            {mounted && (
                <svg
                    viewBox={`0 0 ${vbW.toFixed(2)} ${vbH.toFixed(2)}`}
                    width="100%"
                    style={{ display: 'block', aspectRatio: aspectRatio.toFixed(4) }}
                    role="img"
                    aria-label={`Diagrama orbital: ${center} conectado a ${nodes.join(', ')}`}
                >
                    <defs>
                        <radialGradient id="cv-center-glow" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="#0F4C8A" stopOpacity="0.22" />
                            <stop offset="100%" stopColor="#0F4C8A" stopOpacity="0" />
                        </radialGradient>
                        <radialGradient id="cv-bg-glow" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="#00B4A0" stopOpacity="0.07" />
                            <stop offset="100%" stopColor="#00B4A0" stopOpacity="0" />
                        </radialGradient>
                        <filter id="cv-shadow-center" x="-30%" y="-30%" width="160%" height="160%">
                            <feDropShadow dx="0" dy="2" stdDeviation="5" floodColor="#0F4C8A" floodOpacity="0.22" />
                        </filter>
                        <filter id="cv-shadow-node" x="-30%" y="-30%" width="160%" height="160%">
                            <feDropShadow dx="0" dy="1" stdDeviation="3" floodColor="#00B4A0" floodOpacity="0.16" />
                        </filter>
                    </defs>

                    {/* Ambient glow */}
                    <ellipse cx={cx} cy={cy} rx={orbitRx * 1.05} ry={orbitRy * 1.05} fill="url(#cv-bg-glow)" />

                    {/* Elliptical orbit ring */}
                    <ellipse
                        cx={cx} cy={cy}
                        rx={orbitRx} ry={orbitRy}
                        fill="none"
                        stroke="#00B4A0"
                        strokeWidth="1"
                        strokeDasharray="5 9"
                        className="cv-orbit-ring"
                    />

                    {/* Connection lines */}
                    {nodePositions.map((pos, i) => {
                        const dx = pos.x - cx;
                        const dy = pos.y - cy;
                        const dist = Math.sqrt(dx * dx + dy * dy);
                        const ux = dx / dist;
                        const uy = dy / dist;
                        return (
                            <line
                                key={i}
                                x1={cx + ux * centerPad} y1={cy + uy * centerPad}
                                x2={pos.x - ux * nodePadBase} y2={pos.y - uy * nodePadBase}
                                stroke="#00B4A0"
                                strokeWidth="1.4"
                                strokeOpacity="0.4"
                                strokeDasharray="4 6"
                            />
                        );
                    })}

                    {/* Center halo */}
                    <ellipse cx={cx} cy={cy} rx={orbitRx * 0.28} ry={orbitRy * 0.45} fill="url(#cv-center-glow)" />

                    {/* Orbit nodes */}
                    {nodes.map((node, i) => {
                        const { x, y } = nodePositions[i];
                        const lines = splitLabel(node);
                        const twoLine = lines.length > 1;
                        const nodeH = twoLine ? nodeHTwoLine : nodeHSingle;
                        const totalTextH = twoLine ? lineHeight : 0;
                        const textStartY = y - totalTextH / 2 + nodeFontSize * 0.38;

                        return (
                            <g
                                key={i}
                                className={`cv-node cv-node-${i}`}
                                style={{ transformOrigin: `${x}px ${y}px` }}
                                filter="url(#cv-shadow-node)"
                            >
                                <circle cx={x} cy={y} r={3.5} fill="#00B4A0" opacity="0.65" />

                                <rect
                                    x={x - nodeW / 2} y={y - nodeH / 2}
                                    width={nodeW} height={nodeH}
                                    rx={nodeH / 2} ry={nodeH / 2}
                                    fill="white"
                                    stroke="#00B4A0"
                                    strokeWidth="1.2"
                                    strokeOpacity="0.5"
                                />

                                {lines.map((line, li) => (
                                    <text
                                        key={li}
                                        x={x}
                                        y={textStartY + li * lineHeight}
                                        textAnchor="middle"
                                        fontSize={nodeFontSize}
                                        fontFamily="system-ui, -apple-system, sans-serif"
                                        fontWeight="500"
                                        fill="#2D3748"
                                    >
                                        {line}
                                    </text>
                                ))}
                            </g>
                        );
                    })}

                    {/* Center node — on top */}
                    <g filter="url(#cv-shadow-center)">
                        <rect
                            x={cx - centerW / 2} y={cy - centerH / 2}
                            width={centerW} height={centerH}
                            rx={12} ry={12}
                            fill="#0F4C8A"
                        />
                        <text
                            x={cx} y={cy + centerFontSize * 0.38}
                            textAnchor="middle"
                            fontSize={centerFontSize}
                            fontFamily="system-ui, -apple-system, sans-serif"
                            fontWeight="600"
                            fill="white"
                        >
                            {center}
                        </text>
                    </g>
                </svg>
            )}
        </div>
    );
}