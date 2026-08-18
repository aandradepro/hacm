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

// import enContent from './content.en.json';
// import ptContent from './content.pt.json';

// export type Language = 'en' | 'pt';
// // export type Content = typeof enContent;

// export interface NavItem {
//     label: string;
//     href: string;
// }
// export interface Content {
//     site: {
//         title: string;
//         subtitle: string;
//         brand: string;
//     };
//     nav: {
//         items: NavItem[];
//     };
//     hero: {
//         title: string;
//         subtitle: string;
//         brand: string;
//     };
//     problem: {
//         badge: string;
//         title: string;
//         points: string[];
//         sapPerspective: string;
//     };
//     approach: {
//         badge: string;
//         title: string;
//         intro: string;
//         steps: Array<{
//             step: string;
//             description: string;
//         }>;
//         sapPerspective: string;
//     };
//     results: {
//         badge: string;
//         title: string;
//         cards: Array<{
//             icon: string;
//             title: string;
//             description: string;
//             impact: string;
//             metric: string;
//             metricLabel: string;
//         }>;
//         sapPerspective: string;
//     };
//     bridge: {
//         badge: string;
//         title: string;
//         intro: string;
//         points: string[];
//         legacyLabel: string;
//         governanceLabel: string;
//         modernLabel: string;
//         sapPerspective: string;
//     };
//     cta: {
//         badge: string;
//         title: string;
//         pillars: Array<{
//             icon: string;
//             title: string;
//             description: string;
//         }>;
//         sapPerspective: string;
//         contact: {
//             email: string;
//             linkedin: string;
//             calendar: string;
//         };
//     };
//     footer: {
//         brand: string;
//         copyright: string;
//         version: string;
//     };
// }

// export const contentMap: Record<Language, Content> = {
//     en: enContent,
//     pt: ptContent,
// };

// export const languages: { code: Language; label: string }[] = [
//     { code: 'en', label: 'English' },
//     { code: 'pt', label: 'Português' },
// ];

// export function getContent(lang: Language): Content {
//     return contentMap[lang] || contentMap.en;
// }