'use client';

import { Language } from '@/types'; // ← Tipo compartilhado

interface LanguageSelectorProps {
    currentLang: Language;
    onLanguageChange: (lang: Language) => void;
    languages: { code: Language; label: string }[]; // ← Recebe via prop
}

export default function LanguageSelector({
    currentLang,
    onLanguageChange,
    languages,
}: LanguageSelectorProps) {
    return (
        <div className="flex items-center gap-1">
            {languages.map((lang) => (
                <button
                    key={lang.code}
                    onClick={() => onLanguageChange(lang.code)}
                    className={`
            px-3 py-1 text-xs font-medium rounded-md transition-all
            ${currentLang === lang.code
                            ? 'bg-[#0F4C8A] text-white'
                            : 'text-[#4A5568] hover:bg-[#E8EEF4]'
                        }
          `}
                    aria-label={`Switch to ${lang.label}`}
                >
                    {lang.label}
                </button>
            ))}
        </div>
    );
}



// 'use client';

// import { Language, languages } from '../../data';

// interface LanguageSelectorProps {
//     currentLang: Language;
//     onLanguageChange: (lang: Language) => void;
// }

// export default function LanguageSelector({
//     currentLang,
//     onLanguageChange,
// }: LanguageSelectorProps) {
//     return (
//         <div className="flex items-center gap-1">
//             {languages.map((lang) => (
//                 <button
//                     key={lang.code}
//                     onClick={() => onLanguageChange(lang.code)}
//                     className={`
//             px-3 py-1 text-xs font-medium rounded-md transition-all
//             ${currentLang === lang.code
//                             ? 'bg-[#0F4C8A] text-white'
//                             : 'text-[#4A5568] hover:bg-[#E8EEF4]'
//                         }
//           `}
//                     aria-label={`Switch to ${lang.label}`}
//                 >
//                     {lang.label}
//                 </button>
//             ))}
//         </div>
//     );
// }