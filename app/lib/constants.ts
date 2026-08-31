import { Language } from '@/types';

export const LANGUAGES: Language[] = ['en', 'pt'];
export const DEFAULT_LANGUAGE: Language = 'en';

export const LANGUAGE_OPTIONS: { code: Language; label: string }[] = [
    { code: 'en', label: 'English' },
    { code: 'pt', label: 'Português' },
];