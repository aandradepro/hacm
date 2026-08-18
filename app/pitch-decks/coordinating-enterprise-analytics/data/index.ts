import enContent from './content.en.json';
import ptContent from './content.pt.json';
import { Content, Language, languages } from '@/types';

export const contentMap: Record<Language, Content> = {
    en: enContent as Content,
    pt: ptContent as Content,
};

export { languages };

export function getContent(lang: Language): Content {
    return contentMap[lang] || contentMap.en;
}