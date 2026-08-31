import { Content } from '@/types';

/**
 * Obtém o nome do arquivo para exportação de PDF
 * Prioridade: filename > id > title
 */
export function getFileName(content: Content): string {
    // 1. Usar filename se disponível
    if (content.page?.filename) {
        return content.page.filename;
    }

    // 2. Usar id como fallback
    if (content.page?.id) {
        return content.page.id;
    }

    // 3. Usar title como último fallback (sanitizado)
    if (content.page?.title) {
        return content.page.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
    }

    // 4. Fallback final
    return 'document';
}