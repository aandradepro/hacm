import enContent from './content.en.json';
import ptContent from './content.pt.json';
import { Content, Language } from '@/types';
import { LANGUAGES, DEFAULT_LANGUAGE } from '@/lib/constants';

export const contentMap: Record<Language, Content> = {
    en: enContent as Content,
    pt: ptContent as Content,
};

export const languages = LANGUAGES;

export function getContent(lang: Language): Content {
    // Usar DEFAULT_LANGUAGE em vez de LANGUAGES[0]
    return contentMap[lang] || contentMap[DEFAULT_LANGUAGE];
}

export type { Content, Language };