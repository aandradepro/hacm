import enContent from './content.en.json';
import ptContent from './content.pt.json';
import { Content, Language } from '@/types';
import { LANGUAGES } from '@/lib/constants';

// Adicionar logs para debug
//console.log('📄 EN Content loaded:', enContent);
//console.log('📄 PT Content loaded:', ptContent);

export const contentMap: Record<Language, Content> = {
    en: enContent as Content,
    pt: ptContent as Content,
};

export const languages = LANGUAGES;

export function getContent(lang: Language): Content {
    const content = contentMap[lang] || contentMap[LANGUAGES[0]];
    //    console.log(`📄 getContent(${lang}) returned:`, content);
    return content;
}

export type { Content, Language };