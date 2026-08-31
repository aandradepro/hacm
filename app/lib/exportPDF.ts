// app/lib/exportPDF.ts
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export interface ExportPDFOptions {
    element: HTMLElement;
    fileName?: string;
    contentWidth?: number;
    margin?: number;
    scale?: number;
    onProgress?: (progress: number) => void;
    includeFooter?: boolean;
    excludeSelectors?: string[];
    jpegQuality?: number;
}

// Seletores removidos sempre, sem exceção
const ALWAYS_EXCLUDE = [
    'nav',
    'footer',
    'button',
    'a[href]',
    '[role="button"]',
    '[data-pdf-exclude]',
    '.no-print',
    '.fixed',
    '.sticky',
];

// ─────────────────────────────────────────────────────────────────────────────
// Utilitário 1 — altura real do canvas
// html2canvas às vezes renderiza linhas brancas extras no final.
// Percorre de baixo para cima em faixas de STEP px e devolve a altura
// da última linha que contenha ao menos um pixel não-branco.
// ─────────────────────────────────────────────────────────────────────────────
function detectRealCanvasHeight(canvas: HTMLCanvasElement): number {
    const ctx = canvas.getContext('2d');
    if (!ctx) return canvas.height;

    const STEP = 8;
    const w = canvas.width;

    for (let y = canvas.height - STEP; y >= 0; y -= STEP) {
        const data = ctx.getImageData(0, y, w, STEP).data;
        for (let i = 0; i < data.length; i += 4) {
            const r = data[i], g = data[i + 1], b = data[i + 2], a = data[i + 3];
            if (a > 10 && !(r > 245 && g > 245 && b > 245)) {
                return Math.min(y + STEP + 2, canvas.height);
            }
        }
    }
    return canvas.height;
}

// ─────────────────────────────────────────────────────────────────────────────
// Utilitário 2 — intervalos [top, bottom] de blocos de texto
//
// USA getBoundingClientRect(el) - getBoundingClientRect(root)
// porque é a única forma confiável de medir posição relativa quando
// o root tem position:absolute (a chain de offsetParent quebra — os filhos
// com position:static têm offsetParent = body, não o wrapper).
//
// Retorna em CSS pixels relativos ao topo do root.
// ─────────────────────────────────────────────────────────────────────────────
type TextInterval = { top: number; bottom: number };

function collectTextIntervals(root: HTMLElement): TextInterval[] {
    // Seletores de blocos de texto — excluindo inline puro (span, a, strong…)
    // para evitar intervalos redundantes com o elemento pai
    const SELECTORS = 'p, h1, h2, h3, h4, h5, h6, li, td, th, blockquote, figcaption, .prose > div';
    const rootRect = root.getBoundingClientRect();
    const intervals: TextInterval[] = [];

    root.querySelectorAll<HTMLElement>(SELECTORS).forEach((el) => {
        const rect = el.getBoundingClientRect();
        const top = rect.top - rootRect.top;
        const bottom = rect.bottom - rootRect.top;
        // Descartar elementos com altura 0 (hidden/empty) e
        // elementos negativos (fora da área de renderização por cima)
        if (bottom - top > 1 && top >= 0) {
            intervals.push({ top, bottom });
        }
    });

    intervals.sort((a, b) => a.top - b.top);
    return intervals;
}

// ─────────────────────────────────────────────────────────────────────────────
// Utilitário 3 — corte seguro de página
//
// Dado o corte ideal (yOffset + altura da página), verifica se algum
// bloco de texto cruza esse ponto. Se sim, recua o corte para o topo
// desse bloco — a página termina antes do elemento, não no meio.
//
// Garantia: o recuo nunca ultrapassa MIN_BACK_FRACTION da altura da página
// (evita páginas muito curtas quando um bloco enorme começa cedo).
// ─────────────────────────────────────────────────────────────────────────────
function findSafeBreak(
    yOffset: number,
    idealBreak: number,
    intervals: TextInterval[],
    pageH: number,
    minBackFraction = 0.55,
): number {
    const minAllowed = yOffset + pageH * minBackFraction;

    for (const { top, bottom } of intervals) {
        // Bloco que cruza o corte ideal
        if (top < idealBreak && bottom > idealBreak) {
            // Recuar para o topo do bloco se isso não encurtar demais a página
            if (top >= minAllowed) return top;
            // Bloco enorme (começa muito cedo): não há como evitar o corte,
            // mantém o ideal e aceita o corte dentro do elemento.
            return idealBreak;
        }
    }
    // Nenhum bloco cruzando: corte ideal já é seguro
    return idealBreak;
}

// ─────────────────────────────────────────────────────────────────────────────
// Função principal
// ─────────────────────────────────────────────────────────────────────────────
export async function exportPDF({
    element,
    fileName = 'document',
    contentWidth = 1152,
    margin = 40,
    scale = 2,
    onProgress,
    includeFooter = true,
    excludeSelectors = [],
    jpegQuality = 0.92,
}: ExportPDFOptions): Promise<void> {
    if (!element) throw new Error('Elemento não encontrado para exportação');

    onProgress?.(5);

    // ── 1. Clonar ─────────────────────────────────────────────────────────────
    const clone = element.cloneNode(true) as HTMLElement;
    onProgress?.(10);

    // ── 2. Remover elementos indesejados ──────────────────────────────────────
    [...ALWAYS_EXCLUDE, ...excludeSelectors].forEach((selector) => {
        try { clone.querySelectorAll(selector).forEach((el) => el.remove()); }
        catch { /* selector inválido */ }
    });

    // ── 3. Normalizar estilos ─────────────────────────────────────────────────
    // Regra geral: só normalizar containers de seção/layout, NUNCA
    // elementos de conteúdo interno (flowdiagrams, flex rows com gap pequeno, etc.)

    clone.style.scrollSnapType = 'none';
    clone.style.overflow = 'visible';
    clone.style.height = 'auto';
    clone.style.width = `${contentWidth}px`;
    clone.style.maxWidth = `${contentWidth}px`;
    clone.style.backgroundColor = '#FFFFFF';
    clone.style.padding = '0';
    clone.style.margin = '0';

    // Seções snap: virar blocos contínuos
    clone.querySelectorAll<HTMLElement>('.snap-section').forEach((el) => {
        el.style.scrollSnapAlign = 'none';
        el.style.minHeight = 'auto';
        el.style.height = 'auto';
        el.style.overflow = 'visible';
        el.style.position = 'relative';
        el.style.display = 'block';
        el.style.alignItems = 'unset';
        el.style.justifyContent = 'unset';
        if (!el.style.backgroundColor) {
            el.style.backgroundColor = el.classList.contains('bg-[#F8FAFC]')
                ? '#F8FAFC' : '#FFFFFF';
        }
    });

    // Containers de largura máxima: expandir para preencher o contentWidth
    clone.querySelectorAll<HTMLElement>('.max-w-6xl, .max-w-4xl, .max-w-3xl').forEach((el) => {
        el.style.width = '100%';
        el.style.maxWidth = '100%';
        el.style.margin = '0 auto';
        el.style.overflow = 'visible';
    });

    // Grids de cards: garantir que não quebrem estranhamente
    clone.querySelectorAll<HTMLElement>('.grid').forEach((el) => {
        el.style.overflow = 'visible';
        el.style.width = '100%';
    });

    // !! NÃO normalizar .flex globalmente !!
    // Flowdiagrams e outros componentes visuais usam flex com gap, justify-center
    // e items-center específicos. Sobrescrever gap/width quebra o layout deles.
    // Apenas garantir que não haja overflow hidden que oculte conteúdo:
    clone.querySelectorAll<HTMLElement>('.flex').forEach((el) => {
        if (el.style.overflow === 'hidden') el.style.overflow = 'visible';
    });

    // Forçar visibilidade
    clone.querySelectorAll<HTMLElement>('*').forEach((el) => {
        el.style.visibility = 'visible';
        el.style.opacity = '1';
    });

    onProgress?.(20);

    // ── 4. Montar wrapper e inserir no DOM ────────────────────────────────────
    // position:fixed + visibility:hidden é a única combinação que garante:
    //   a) layout calculado corretamente (width, height, wrapping)
    //   b) getBoundingClientRect retorna coordenadas reais (sem offset -9999px)
    //   c) offsetParent dos filhos aponta para o wrapper (não o body)
    //   d) conteúdo não aparece na tela para o usuário
    // position:absolute com top:-9999px quebra (b) e (c) para documentos longos.
    const wrapper = document.createElement('div');
    Object.assign(wrapper.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: `${contentWidth}px`,
        backgroundColor: '#FFFFFF',
        overflow: 'visible',
        display: 'block',
        padding: '0',
        margin: '0',
        visibility: 'hidden',   // oculto mas com layout calculado
        pointerEvents: 'none',
        zIndex: '-1',
    });
    wrapper.appendChild(clone);

    // Footer opcional
    if (includeFooter) {
        const footerEl = document.querySelector('footer');
        if (footerEl && !clone.querySelector('footer')) {
            const fc = footerEl.cloneNode(true) as HTMLElement;
            Object.assign(fc.style, {
                display: 'block', width: '100%', padding: '40px 24px',
                backgroundColor: '#0F4C8A', color: '#FFFFFF',
                position: 'relative', marginTop: '0', boxSizing: 'border-box',
            });
            fc.querySelectorAll<HTMLElement>('*').forEach((el) => {
                el.style.color = '#FFFFFF';
                el.style.visibility = 'visible';
                el.style.opacity = '1';
            });
            wrapper.appendChild(fc);
        }
    }

    document.body.appendChild(wrapper);
    void wrapper.offsetHeight; // força reflow
    // Dois frames para garantir que Tailwind JIT e fontes aplicaram
    await new Promise<void>((r) =>
        requestAnimationFrame(() => requestAnimationFrame(() => r())),
    );

    onProgress?.(30);

    // ── 5. Coletar intervalos de texto enquanto wrapper está no DOM ───────────
    // CRÍTICO: coletar AGORA, com o wrapper no DOM e o layout calculado.
    // Com position:fixed, scrollHeight = viewport height (inútil para conteúdo longo).
    // Usar bottom do último filho relativo ao topo do wrapper = altura real do conteúdo.
    const wrapperTop = wrapper.getBoundingClientRect().top;
    const lastChild = wrapper.lastElementChild as HTMLElement;
    const contentCssH = Math.round(lastChild.getBoundingClientRect().bottom - wrapperTop);

    const textIntervals = collectTextIntervals(wrapper);

    //console.log(`📐 CSS: ${contentWidth}×${contentCssH}px | Blocos de texto: ${textIntervals.length}`);
    if (textIntervals.length < 5) {
        console.warn('⚠️ Few text intervals collected - safe-break may not work well');
    }

    onProgress?.(40);

    // ── 6. Capturar canvas ────────────────────────────────────────────────────
    // Tornar visível temporariamente para o html2canvas (ele clona internamente,
    // mas o elemento root precisa estar visível para o clone herdar corretamente)
    wrapper.style.visibility = 'visible';

    const canvas = await html2canvas(wrapper, {
        scale,
        useCORS: true,
        allowTaint: false,
        logging: false,
        width: contentWidth,
        height: contentCssH,
        windowWidth: contentWidth,
        windowHeight: contentCssH,
        x: 0,
        y: 0,
        backgroundColor: '#FFFFFF',
        onclone: (clonedDoc) => {
            clonedDoc.querySelectorAll<HTMLElement>('*').forEach((child) => {
                child.style.visibility = 'visible';
                child.style.opacity = '1';
            });
        },
    });

    onProgress?.(60);

    document.body.removeChild(wrapper);

    // ── 7. Detectar altura real do canvas (elimina brancos extras do fim) ─────
    const realCanvasH = detectRealCanvasHeight(canvas);
    //console.log(`📐 Canvas: ${canvas.width}×${canvas.height}px → real: ×${realCanvasH}px`);

    // ── 8. Configurar PDF ─────────────────────────────────────────────────────
    const pdf = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4', compress: true });

    const PAGE_W = pdf.internal.pageSize.getWidth();   // 595.28pt
    const PAGE_H = pdf.internal.pageSize.getHeight();  // 841.89pt
    const INNER_W = PAGE_W - margin * 2;
    const INNER_H = PAGE_H - margin * 2;

    // cssPxToPt: CSS pixels → pontos PDF (sem o fator scale)
    // CSS px * scale = canvas px  →  CSS px / (canvas px / INNER_W) * scale
    // simplificando: INNER_W / contentWidth
    const cssPxToPt = INNER_W / contentWidth;

    // Alturas em CSS pixels (domínio do safe-break, coerente com getBoundingClientRect)
    // A altura real usa o canvas detectado para eliminar páginas em branco
    // canvas px = CSS px * scale  →  CSS px = canvas px / scale
    const totalCssPxH = realCanvasH / scale;
    const innerHCssPx = INNER_H / cssPxToPt;

    //console.log(`📄 Total CSS: ${totalCssPxH.toFixed(0)}px | Página útil: ${innerHCssPx.toFixed(0)}px`);

    if (totalCssPxH < 5) {
        console.warn('⚠️ Content too small');
        return;
    }

    // ── 9. Paginação com safe-break ───────────────────────────────────────────
    const MIN_SLICE_CSS = 4; // px CSS — slices menores que isso são descartados

    // Passagem 1: calcular todos os pontos de corte para conhecer o total de páginas
    // antes de renderizar qualquer uma (necessário para imprimir "X/Total").
    const pageBreaks: number[] = [0]; // yOffsetCss de início de cada página
    {
        let y = 0;
        while (y < totalCssPxH - MIN_SLICE_CSS) {
            const remaining = totalCssPxH - y;
            const idealBreakCss = y + Math.min(innerHCssPx, remaining);
            const safeBreakCss =
                remaining <= innerHCssPx
                    ? idealBreakCss
                    : findSafeBreak(y, idealBreakCss, textIntervals, innerHCssPx);
            const sliceCss = safeBreakCss - y;
            if (sliceCss < MIN_SLICE_CSS) break;
            y = safeBreakCss;
            if (y < totalCssPxH - MIN_SLICE_CSS) pageBreaks.push(y);
        }
    }
    const totalPages = pageBreaks.length;

    // Passagem 2: renderizar cada página com a imagem + número de página
    // Configuração da numeração
    const PAGE_NUM_FONT_SIZE = 9;   // pt
    const PAGE_NUM_MARGIN_B = 14;  // pt acima da borda inferior
    const PAGE_NUM_COLOR = '#94A3B8'; // cinza discreto

    for (let pageIdx = 0; pageIdx < totalPages; pageIdx++) {
        const yOffsetCss = pageBreaks[pageIdx];
        const nextBreak = pageIdx + 1 < totalPages ? pageBreaks[pageIdx + 1] : totalCssPxH;
        const sliceCss = nextBreak - yOffsetCss;

        if (pageIdx > 0) pdf.addPage();

        // Imagem da fatia
        const srcY = Math.round(yOffsetCss * scale);
        const sliceCanH = Math.round(sliceCss * scale);
        const slicePt = sliceCss * cssPxToPt;

        const pageCanvas = document.createElement('canvas');
        pageCanvas.width = canvas.width;
        pageCanvas.height = sliceCanH;

        const ctx = pageCanvas.getContext('2d');
        if (ctx) {
            ctx.drawImage(canvas, 0, srcY, canvas.width, sliceCanH, 0, 0, canvas.width, sliceCanH);
            pdf.addImage(pageCanvas.toDataURL('image/jpeg', jpegQuality), 'JPEG',
                margin, margin, INNER_W, slicePt);
        }

        // Numeração de página — rodapé direita: "página/total"
        const label = `${pageIdx + 1}/${totalPages}`;
        pdf.setFontSize(PAGE_NUM_FONT_SIZE);
        pdf.setTextColor(PAGE_NUM_COLOR);
        pdf.text(
            label,
            PAGE_W - margin,                    // borda direita
            PAGE_H - PAGE_NUM_MARGIN_B,         // próximo à borda inferior
            { align: 'right' },
        );

        onProgress?.(60 + ((pageIdx + 1) / totalPages) * 35);
    }

    // Restaurar cor padrão do PDF
    pdf.setTextColor('#000000');

    onProgress?.(98);
    pdf.save(`${fileName}.pdf`);
    onProgress?.(100);

    //console.log(`✅ PDF exportado! Páginas: ${totalPages}`);
}