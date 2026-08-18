'use client';

import { useState } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { Content } from '@/types';

// A4 dimensions in points
const A4_WIDTH_PT = 595.28;
const A4_HEIGHT_PT = 841.89;

// Content width - matches max-w-6xl from Tailwind
const CONTENT_WIDTH = 1152;

interface ExportButtonProps {
    content: Content;
}

export default function ExportButton({ content }: ExportButtonProps) {
    const [isExporting, setIsExporting] = useState(false);
    const [progress, setProgress] = useState(0);

    const handleExport = async () => {
        if (isExporting) return;
        setIsExporting(true);
        setProgress(0);

        try {
            // Get the snap container (contains all sections)
            const snapContainer = document.querySelector('.snap-container') as HTMLElement;
            if (!snapContainer) {
                console.error('Snap container not found');
                setIsExporting(false);
                return;
            }

            // Get the footer separately
            const footerElement = document.querySelector('footer') as HTMLElement;

            setProgress(10);

            // Clone the snap container
            const clone = snapContainer.cloneNode(true) as HTMLElement;

            // ── CRITICAL: Remove any footer from the clone ──────────────────────
            const footerInsideClone = clone.querySelector('footer');
            if (footerInsideClone) {
                footerInsideClone.remove();
            }

            // Remove fixed elements
            const fixedElements = clone.querySelectorAll('.fixed');
            fixedElements.forEach(el => el.remove());

            // Remove navigation
            const nav = clone.querySelector('nav');
            if (nav) nav.remove();

            // Remove export buttons
            const buttons = clone.querySelectorAll('button');
            buttons.forEach(el => {
                if (el.textContent?.includes('Export') || el.textContent?.includes('PDF')) {
                    el.remove();
                }
            });

            setProgress(20);

            // ── Fix container ──────────────────────────────────────────────────────
            Object.assign(clone.style, {
                width: `${CONTENT_WIDTH}px`,
                maxWidth: `${CONTENT_WIDTH}px`,
                height: 'auto',
                overflow: 'visible',
                scrollSnapType: 'none',
                overflowY: 'visible',
                scrollBehavior: 'auto',
                display: 'block',
                backgroundColor: '#FFFFFF',
            });

            // ── Fix sections ──────────────────────────────────────────────────────
            clone.querySelectorAll('.snap-section').forEach((el) => {
                const section = el as HTMLElement;

                const isLight = section.classList.contains('bg-[#F8FAFC]');
                const bgColor = isLight ? '#F8FAFC' : '#FFFFFF';

                Object.assign(section.style, {
                    minHeight: 'auto',
                    height: 'auto',
                    padding: '60px 24px 60px',
                    display: 'block',
                    overflow: 'visible',
                    position: 'relative',
                    boxSizing: 'border-box',
                    width: '100%',
                    maxWidth: '100%',
                    backgroundColor: bgColor,
                    marginBottom: '30px',
                    borderBottom: '1px solid #E8EEF4',
                    alignItems: 'unset',
                    justifyContent: 'unset',
                });
            });

            // ── Hero section ──────────────────────────────────────────────────────
            const heroSection = clone.querySelector('#hero');
            if (heroSection) {
                (heroSection as HTMLElement).style.padding = '80px 24px 60px';
                (heroSection as HTMLElement).style.minHeight = 'auto';
                (heroSection as HTMLElement).style.marginBottom = '30px';
                (heroSection as HTMLElement).style.backgroundColor = '#FFFFFF';
                (heroSection as HTMLElement).style.borderBottom = 'none';
            }

            // ── Fix inner containers ──────────────────────────────────────────────
            clone.querySelectorAll('.max-w-6xl, .max-w-3xl, .max-w-4xl, .w-full, .mx-auto').forEach((el) => {
                (el as HTMLElement).style.width = '100%';
                (el as HTMLElement).style.maxWidth = '100%';
                (el as HTMLElement).style.margin = '0 auto';
                (el as HTMLElement).style.paddingLeft = '20px';
                (el as HTMLElement).style.paddingRight = '20px';
            });

            // ── Fix card grid ──────────────────────────────────────────────────────
            clone.querySelectorAll('.card-grid').forEach((el) => {
                (el as HTMLElement).style.display = 'grid';
                (el as HTMLElement).style.gridTemplateColumns = 'repeat(3, 1fr)';
                (el as HTMLElement).style.gap = '20px';
                (el as HTMLElement).style.width = '100%';
                (el as HTMLElement).style.marginTop = '20px';
                (el as HTMLElement).style.marginBottom = '20px';
            });

            // ── Fix bridge container ──────────────────────────────────────────────
            clone.querySelectorAll('.bridge-container').forEach((el) => {
                (el as HTMLElement).style.display = 'flex';
                (el as HTMLElement).style.flexDirection = 'row';
                (el as HTMLElement).style.alignItems = 'center';
                (el as HTMLElement).style.gap = '16px';
                (el as HTMLElement).style.width = '100%';
                (el as HTMLElement).style.marginTop = '20px';
                (el as HTMLElement).style.marginBottom = '20px';
            });

            // ── Fix SAP Perspective boxes ─────────────────────────────────────────
            clone.querySelectorAll('.sap-perspective').forEach((el) => {
                (el as HTMLElement).style.marginTop = '24px';
                (el as HTMLElement).style.marginBottom = '24px';
            });

            // ── Create wrapper ────────────────────────────────────────────────────
            const wrapper = document.createElement('div');
            wrapper.style.position = 'absolute';
            wrapper.style.top = '-9999px';
            wrapper.style.left = '0';
            wrapper.style.width = `${CONTENT_WIDTH}px`;
            wrapper.style.backgroundColor = '#FFFFFF';
            wrapper.style.overflow = 'visible';
            wrapper.style.display = 'block';
            wrapper.appendChild(clone);

            // ── Add footer to wrapper (ONLY ONCE) ─────────────────────────────────
            if (footerElement) {
                const footerClone = footerElement.cloneNode(true) as HTMLElement;
                Object.assign(footerClone.style, {
                    display: 'block',
                    width: '100%',
                    padding: '40px 24px',
                    backgroundColor: '#0F4C8A',
                    color: '#FFFFFF',
                    position: 'relative',
                    marginTop: '0',
                });
                footerClone.querySelectorAll('*').forEach(el => {
                    (el as HTMLElement).style.color = '#FFFFFF';
                    (el as HTMLElement).style.visibility = 'visible';
                    (el as HTMLElement).style.opacity = '1';
                });
                wrapper.appendChild(footerClone);
            }

            setProgress(30);

            // Append wrapper to body
            document.body.appendChild(wrapper);

            // Force layout recalculation
            void wrapper.offsetHeight;

            await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));

            setProgress(40);

            // ── Capture ──────────────────────────────────────────────────────────
            const captureHeight = wrapper.scrollHeight;

            console.log(`📐 Capture: ${CONTENT_WIDTH}×${captureHeight}px`);

            const canvas = await html2canvas(wrapper, {
                scale: 2,
                useCORS: true,
                allowTaint: false,
                logging: true,
                windowWidth: CONTENT_WIDTH,
                windowHeight: captureHeight,
                height: captureHeight,
                width: CONTENT_WIDTH,
                y: 0,
                x: 0,
                backgroundColor: '#FFFFFF',
                onclone: (clonedDoc) => {
                    clonedDoc.querySelectorAll('*').forEach(el => {
                        (el as HTMLElement).style.visibility = 'visible';
                        (el as HTMLElement).style.opacity = '1';
                        (el as HTMLElement).style.overflow = 'visible';
                    });
                    const wrapperClone = clonedDoc.querySelector('div');
                    if (wrapperClone) {
                        (wrapperClone as HTMLElement).style.height = 'auto';
                        (wrapperClone as HTMLElement).style.overflow = 'visible';
                    }
                }
            });

            setProgress(60);

            console.log(`📐 Canvas result: ${canvas.width}×${canvas.height}px`);

            // ── Generate PDF ────────────────────────────────────────────────────
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'pt',
                format: 'a4',
                compress: true,
            });

            const PAGE_W = pdf.internal.pageSize.getWidth();
            const PAGE_H = pdf.internal.pageSize.getHeight();
            const MARGIN = 40;
            const INNER_W = PAGE_W - MARGIN * 2;

            const imgData = canvas.toDataURL('image/jpeg', 0.95);
            const pxPerPt = canvas.width / INNER_W;
            const totalPtH = canvas.height / pxPerPt;

            console.log(`📄 Total height: ${totalPtH}pt`);

            let yOffset = 0;
            let pageNum = 0;

            while (yOffset < totalPtH) {
                if (yOffset > 0) {
                    pdf.addPage();
                }

                const sliceH = Math.min(PAGE_H - MARGIN * 2, totalPtH - yOffset);
                const slicePx = sliceH * pxPerPt;

                const pageCanvas = document.createElement('canvas');
                pageCanvas.width = canvas.width;
                pageCanvas.height = slicePx;

                const ctx = pageCanvas.getContext('2d');
                if (!ctx) continue;

                const sourceY = yOffset * pxPerPt;
                ctx.drawImage(
                    canvas,
                    0, sourceY,
                    canvas.width, slicePx,
                    0, 0,
                    canvas.width, slicePx
                );

                const pageImgData = pageCanvas.toDataURL('image/jpeg', 0.92);

                pdf.addImage(
                    pageImgData,
                    'JPEG',
                    MARGIN,
                    MARGIN,
                    INNER_W,
                    sliceH
                );

                yOffset += sliceH;
                pageNum++;

                setProgress(60 + ((pageNum) / Math.ceil(totalPtH / sliceH)) * 35);
            }

            setProgress(98);

            pdf.save(`hacm-pitch-${new Date().toISOString().split('T')[0]}.pdf`);

            document.body.removeChild(wrapper);
            setIsExporting(false);
            setProgress(100);

            console.log(`✅ PDF export complete! Pages: ${pageNum}`);

        } catch (error) {
            console.error('Export failed:', error);
            setIsExporting(false);
            setProgress(0);
        }
    };

    return (
        <button
            onClick={handleExport}
            disabled={isExporting}
            data-pdf-exclude="true"
            className="flex items-center gap-2 px-4 py-2 bg-[#0F4C8A] text-white rounded-lg text-sm font-medium hover:bg-[#0A3A6E] transition-colors shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            title="Export full site as PDF"
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
                    Export PDF
                </>
            )}
        </button>
    );
}