import enContent from './content.en.json';
import ptContent from './content.pt.json';
import { Content, Language } from '@/types';
import { LANGUAGES } from '@/lib/constants';

export const contentMap: Record<Language, Content> = {
    en: enContent as Content,
    pt: ptContent as Content,
};

export const languages = LANGUAGES;

export function getContent(lang: Language): Content {
    return contentMap[lang] || contentMap[LANGUAGES[0]];
}

export type { Content, Language };