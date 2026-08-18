'use client';

import { useEffect, useRef, useState } from 'react';

interface ArchitectureBalanceProps {
    data: {
        left: { label: string; items: string[] };
        right: { label: string; items: string[] };
        center: string;
        balancePoint: string;
    };
    className?: string;
}

export default function ArchitectureBalance({ data, className = '' }: ArchitectureBalanceProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const centerRef = useRef<HTMLDivElement>(null);
    const leftRef = useRef<HTMLDivElement>(null);
    const rightRef = useRef<HTMLDivElement>(null);

    const [svg, setSvg] = useState<{
        w: number; h: number;
        fx: number; fy: number;
        ltx: number; lty: number; lrx: number; lry: number;
        rtx: number; rty: number; rlx: number; rly: number;
    } | null>(null);

    useEffect(() => {
        const compute = () => {
            const wrap = containerRef.current;
            const center = centerRef.current;
            const left = leftRef.current;
            const right = rightRef.current;
            if (!wrap || !center || !left || !right) return;

            const wRect = wrap.getBoundingClientRect();
            const toL = (r: DOMRect) => ({
                x: r.left - wRect.left, y: r.top - wRect.top,
                w: r.width, h: r.height,
            });

            const c = toL(center.getBoundingClientRect());
            const l = toL(left.getBoundingClientRect());
            const r = toL(right.getBoundingClientRect());

            setSvg({
                w: wRect.width, h: wRect.height,
                fx: c.x + c.w / 2, fy: c.y + c.h,
                ltx: l.x + l.w / 2, lty: l.y,
                lrx: l.x + l.w, lry: l.y + l.h / 2,
                rtx: r.x + r.w / 2, rty: r.y,
                rlx: r.x, rly: r.y + r.h / 2,
            });
        };

        compute();
        const obs = new ResizeObserver(compute);
        if (containerRef.current) obs.observe(containerRef.current);
        return () => obs.disconnect();
    }, [data]);

    if (!data) return null;

    return (
        <div ref={containerRef} className={`w-full max-w-5xl mx-auto relative ${className}`}>
            {/* SVG: balance arm lines */}
            {svg && (
                <svg
                    className="ab-svg"
                    viewBox={`0 0 ${svg.w} ${svg.h}`}
                    preserveAspectRatio="none"
                    aria-hidden="true"
                >
                    <defs>
                        <linearGradient id="ab-arm-grad" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#0F4C8A" stopOpacity="0.6" />
                            <stop offset="50%" stopColor="#00B4A0" stopOpacity="0.9" />
                            <stop offset="100%" stopColor="#0F4C8A" stopOpacity="0.6" />
                        </linearGradient>
                    </defs>

                    {/* Fulcrum stem */}
                    <line
                        x1={svg.fx} y1={svg.fy}
                        x2={svg.fx} y2={svg.lry}
                        stroke="#00B4A0"
                        strokeWidth="2"
                        strokeOpacity="0.6"
                    />

                    {/* Balance arm */}
                    <line
                        x1={svg.lrx} y1={svg.lry}
                        x2={svg.rlx} y2={svg.rly}
                        stroke="url(#ab-arm-grad)"
                        strokeWidth="2.5"
                    />

                    {/* Left arm cap */}
                    <circle cx={svg.lrx} cy={svg.lry} r="4" fill="#0F4C8A" opacity="0.45" />

                    {/* Right arm cap */}
                    <circle cx={svg.rlx} cy={svg.rly} r="4" fill="#00B4A0" opacity="0.45" />

                    {/* Pulse rings */}
                    <circle cx={svg.fx} cy={svg.lry} r="8" fill="#00B4A0" className="ab-pulse-1" />
                    <circle cx={svg.fx} cy={svg.lry} r="8" fill="#0F4C8A" className="ab-pulse-2" />
                    <circle cx={svg.fx} cy={svg.lry} r="8" fill="#2E86AB" className="ab-pulse-3" />

                    {/* Solid fulcrum dot */}
                    <circle cx={svg.fx} cy={svg.lry} r="5" fill="#00B4A0" opacity="0.9" />
                    <circle cx={svg.fx} cy={svg.lry} r="2.5" fill="#ffffff" opacity="0.95" />

                    {/* Hanging lines */}
                    <line
                        x1={svg.lrx} y1={svg.lry}
                        x2={svg.ltx} y2={svg.lty}
                        stroke="#0F4C8A" strokeWidth="1.2" strokeOpacity="0.3" strokeDasharray="3 4"
                    />
                    <line
                        x1={svg.rlx} y1={svg.rly}
                        x2={svg.rtx} y2={svg.rty}
                        stroke="#00B4A0" strokeWidth="1.2" strokeOpacity="0.3" strokeDasharray="3 4"
                    />
                </svg>
            )}

            {/* Row 1: center box */}
            <div className="flex justify-center relative z-10">
                <div ref={centerRef} className="ab-center-box">
                    <span className="ab-balance-point">{data.balancePoint}</span>
                    <p className="ab-center-text">{data.center}</p>
                </div>
            </div>

            {/* Spacer */}
            <div className="h-14" />

            {/* Row 2: left + right panels */}
            <div className="ab-row relative z-10">
                <div ref={leftRef} className="ab-panel">
                    <span className="ab-panel-label">{data.left.label}</span>
                    <div className="ab-pills">
                        {data.left.items.map((item, i) => (
                            <span key={i} className="ab-pill-left">{item}</span>
                        ))}
                    </div>
                </div>
                <div ref={rightRef} className="ab-panel">
                    <span className="ab-panel-label">{data.right.label}</span>
                    <div className="ab-pills">
                        {data.right.items.map((item, i) => (
                            <span key={i} className="ab-pill-right">{item}</span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}