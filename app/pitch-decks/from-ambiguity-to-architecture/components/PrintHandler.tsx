// ============================================================
// FILE: app/components/PrintHandler.tsx
// PURPOSE: Detect print mode and adjust page for PDF export
// ============================================================

'use client';

import { useEffect, useRef } from 'react';

export default function PrintHandler() {
    const hasTriggeredPrint = useRef(false);
    const printAttempts = useRef(0);

    useEffect(() => {
        // Check if URL has print parameter
        const urlParams = new URLSearchParams(window.location.search);
        const isPrintMode = urlParams.get('print') === 'true';

        if (isPrintMode && !hasTriggeredPrint.current) {
            hasTriggeredPrint.current = true;

            // Add print styles
            const style = document.createElement('style');
            style.textContent = `
        /* Force all content to be visible */
        * {
          visibility: visible !important;
          opacity: 1 !important;
          overflow: visible !important;
        }
        
        /* Hide fixed elements */
        nav.fixed,
        .fixed {
          display: none !important;
          visibility: hidden !important;
        }
        
        /* Reset snap container */
        .snap-container {
          height: auto !important;
          overflow: visible !important;
          scroll-snap-type: none !important;
        }
        
        /* Reset sections for print */
        .snap-section {
          min-height: auto !important;
          height: auto !important;
          padding: 40px 20px !important;
          display: block !important;
          page-break-after: always;
          scroll-snap-align: none !important;
          overflow: visible !important;
        }
        
        .snap-section:last-child {
          page-break-after: avoid;
        }
        
        /* Ensure all content is visible */
        .snap-section > div {
          height: auto !important;
          min-height: auto !important;
        }
        
        /* Force background colors */
        * {
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
          color-adjust: exact !important;
        }
        
        /* Reset body */
        body {
          padding: 20px !important;
          background: #FFFFFF !important;
          margin: 0 !important;
        }
        
        /* Card grid */
        .card-grid {
          display: grid !important;
          grid-template-columns: repeat(3, 1fr) !important;
          gap: 20px !important;
          margin: 20px 0 !important;
        }
        
        @media (max-width: 768px) {
          .card-grid {
            grid-template-columns: 1fr !important;
          }
        }
        
        /* Bridge */
        .bridge-container {
          display: flex !important;
          flex-direction: row !important;
          align-items: center !important;
          gap: 16px !important;
        }
        
        @media (max-width: 768px) {
          .bridge-container {
            flex-direction: column !important;
          }
          .bridge-arrow {
            transform: rotate(90deg) !important;
          }
        }
        
        /* Ensure images and content display */
        img {
          display: block !important;
          max-width: 100% !important;
        }
        
        /* Force all text to be readable */
        .heading-1, .heading-2, .body-text {
          color: #2D3748 !important;
        }
        
        /* Remove animations */
        * {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
          transform: none !important;
        }
      `;
            document.head.appendChild(style);

            // Remove any transform styles that might hide content
            document.querySelectorAll('[style*="transform"]').forEach(el => {
                el.setAttribute('style', '');
            });

            // Force visibility of all sections
            document.querySelectorAll('.snap-section').forEach(el => {
                (el as HTMLElement).style.display = 'block';
                (el as HTMLElement).style.visibility = 'visible';
                (el as HTMLElement).style.opacity = '1';
            });

            // Trigger print only once
            const triggerPrint = () => {
                if (printAttempts.current === 0) {
                    printAttempts.current = 1;
                    window.print();

                    // Close window after print dialog is dismissed (user clicks Print or Cancel)
                    const checkPrint = setInterval(() => {
                        if (document.hidden !== undefined) {
                            // This fires when print dialog closes
                            clearInterval(checkPrint);
                            setTimeout(() => {
                                window.close();
                            }, 300);
                        }
                    }, 200);
                }
            };

            // Wait for DOM to be ready, then trigger print once
            if (document.readyState === 'complete') {
                setTimeout(triggerPrint, 300);
            } else {
                const handleLoad = () => {
                    setTimeout(triggerPrint, 300);
                    window.removeEventListener('load', handleLoad);
                };
                window.addEventListener('load', handleLoad);
            }
        }
    }, []);

    return null;
}