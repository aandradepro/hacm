// ============================================================
// FILE: app/components/ui/ResolutionBadge.tsx
// PURPOSE: Displays current screen resolution as evidence of responsiveness
// ============================================================

'use client';

import { useState, useEffect } from 'react';

export default function ResolutionBadge() {
    const [resolution, setResolution] = useState({ width: 0, height: 0 });
    const [deviceType, setDeviceType] = useState('');

    useEffect(() => {
        const updateResolution = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            setResolution({ width, height });

            if (width < 480) {
                setDeviceType('Mobile');
            } else if (width < 768) {
                setDeviceType('Tablet');
            } else if (width < 1024) {
                setDeviceType('Small Desktop');
            } else if (width < 1280) {
                setDeviceType('Desktop');
            } else {
                setDeviceType('Large Desktop');
            }
        };

        updateResolution();
        window.addEventListener('resize', updateResolution);
        return () => window.removeEventListener('resize', updateResolution);
    }, []);

    // Don't render on server
    if (resolution.width === 0) return null;

    return (
        <div className="flex items-center gap-2 px-3 py-1.5 bg-white/90 backdrop-blur-sm border border-[#E8EEF4] rounded-lg shadow-sm text-xs font-mono">
            <span className="flex items-center gap-1.5">
                <span
                    className="w-2 h-2 rounded-full"
                    style={{
                        backgroundColor:
                            resolution.width < 480 ? '#FF6B6B' :
                                resolution.width < 768 ? '#FFD93D' :
                                    resolution.width < 1024 ? '#6BCB77' :
                                        resolution.width < 1280 ? '#4D96FF' :
                                            '#00B4A0'
                    }}
                />
                <span className="text-[#2D3748] font-medium">{deviceType}</span>
            </span>
            <span className="text-[#4A5568]">
                {resolution.width} × {resolution.height}
            </span>
            <span className="text-[#4A5568] text-[10px] opacity-50">
                ✓ Responsive
            </span>
        </div>
    );
}