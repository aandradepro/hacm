'use client';

import { useState } from 'react';
import { exportPDF } from '@/lib/exportPDF';

interface ExportButtonProps {
    /** Elemento a ser exportado (se não fornecido, usa .snap-container) */
    element?: HTMLElement;
    /** Nome do arquivo (sem extensão) */
    fileName?: string;
    /** Texto do botão */
    label?: string;
    /** Classe CSS adicional */
    className?: string;
}

export default function ExportButton({
    element,
    fileName = 'hacm-pitch',
    label = 'Export PDF',
    className = '',
}: ExportButtonProps) {
    const [isExporting, setIsExporting] = useState(false);
    const [progress, setProgress] = useState(0);

    const handleExport = async () => {
        if (isExporting) return;
        setIsExporting(true);
        setProgress(0);

        try {
            // Se não for fornecido um elemento, usar o snap-container
            const targetElement = element || document.querySelector('.snap-container') as HTMLElement;

            if (!targetElement) {
                console.error('No elemnt found to export.');
                setIsExporting(false);
                return;
            }

            await exportPDF({
                element: targetElement,
                fileName,
                onProgress: setProgress,
            });

            setIsExporting(false);
            setProgress(100);

        } catch (error) {
            console.error('Export failed:', error);
            alert('Error exporting PDF.');
            setIsExporting(false);
            setProgress(0);
        }
    };

    return (
        <button
            onClick={handleExport}
            disabled={isExporting}
            data-pdf-exclude="true"
            className={`flex items-center gap-2 px-4 py-2 bg-[#0F4C8A] text-white rounded-lg text-sm font-medium hover:bg-[#0A3A6E] transition-colors shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
            title="Export as PDF"
        >
            {isExporting ? (
                <>
                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    {progress > 0 ? `${Math.round(progress)}%` : 'Generating...'}
                </>
            ) : (
                <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    {label}
                </>
            )}
        </button>
    );
}