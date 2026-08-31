'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
type Language = 'en' | 'pt';

interface NavItem {
    label: string;
    href: string;
}

interface Content {
    page?: {
        title?: string;
    };
    hero?: {
        title?: string;
    };
    nav?: {
        items: NavItem[];
    };
}

interface NavigationProps {
    content: Content;
    lang: Language;
}

export default function Navigation({ content, lang }: NavigationProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('');

    const isScrollingProgrammatically = useRef(false);
    const rafRef = useRef<number | null>(null);

    const pageTitle = content.page?.title || content.hero?.title || '';
    const navItems = content.nav?.items || [];

    /**
     * Lógica central de decisão: qual seção está ativa agora?
     * Retorna '' quando o hero ocupa mais de 40% da viewport.
     * Retorna o id da seção do menu com maior visibilidade caso contrário.
     */
    const computeActiveSection = useCallback((): string => {
        const viewportHeight = window.innerHeight;

        // 1. Checar se o hero está suficientemente visível
        const hero = document.getElementById('hero');
        if (hero) {
            const { top, bottom } = hero.getBoundingClientRect();
            const visible = Math.max(0, Math.min(viewportHeight, bottom) - Math.max(0, top));
            if (visible / viewportHeight > 0.4) return '';
        }

        // 2. Encontrar a seção do menu com maior área visível
        let bestId = '';
        let bestVisible = 0;

        navItems.forEach((item) => {
            const id = item.href.replace('#', '');
            const el = document.getElementById(id);
            if (!el) return;

            const { top, bottom } = el.getBoundingClientRect();
            const visible = Math.max(0, Math.min(viewportHeight, bottom) - Math.max(0, top));

            if (visible > bestVisible) {
                bestVisible = visible;
                bestId = id;
            }
        });

        return bestId;
    }, [navItems]);

    // Atualiza o estado a partir do cálculo acima
    const updateActive = useCallback(() => {
        if (isScrollingProgrammatically.current) return;
        setActiveSection(computeActiveSection());
    }, [computeActiveSection]);

    // Scroll listener com rAF para não travar a UI
    useEffect(() => {
        const onScroll = () => {
            if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
            rafRef.current = requestAnimationFrame(updateActive);
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        updateActive(); // estado inicial

        return () => {
            window.removeEventListener('scroll', onScroll);
            if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
        };
    }, [updateActive]);

    // IntersectionObserver como reforço (captura casos de scroll muito lento)
    useEffect(() => {
        const ids = [
            'hero',
            ...navItems.map((item) => item.href.replace('#', '')),
        ];

        const observer = new IntersectionObserver(
            () => {
                if (!isScrollingProgrammatically.current) updateActive();
            },
            {
                root: null,
                rootMargin: '0px',
                threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
            }
        );

        ids.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [navItems, updateActive]);

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        setIsMobileMenuOpen(false);

        const el = document.querySelector(href);
        if (!el) return;

        const sectionId = href.replace('#', '');
        isScrollingProgrammatically.current = true;
        setActiveSection(sectionId);

        el.scrollIntoView({ behavior: 'smooth' });

        // Libera o lock após a animação de scroll terminar (~800 ms)
        setTimeout(() => {
            isScrollingProgrammatically.current = false;
            setActiveSection(computeActiveSection());
        }, 900);
    };

    const handleTitleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const el = document.querySelector('#hero');
        if (!el) return;

        isScrollingProgrammatically.current = true;
        setActiveSection('');

        el.scrollIntoView({ behavior: 'smooth' });

        setTimeout(() => {
            isScrollingProgrammatically.current = false;
            setActiveSection(computeActiveSection());
        }, 900);
    };

    const isActive = (href: string) => activeSection === href.replace('#', '');

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm py-3">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    <Link
                        href="/"
                        className="text-base font-medium text-[#0F4C8A] hover:text-[#00B4A0] transition-colors"
                    >
                        Alexandre de Andrade{' '}
                        <span className="text-[13px] font-light text-[#4A5568] opacity-50">~Å~</span>
                    </Link>

                    <a
                        href="#hero"
                        onClick={handleTitleClick}
                        className="hidden md:block text-sm font-medium text-[#2D3748] opacity-60 hover:opacity-100 hover:text-[#0F4C8A] transition-all cursor-pointer"
                    >
                        {pageTitle}
                    </a>

                    <div className="hidden md:flex items-center space-x-8">
                        {navItems.map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                onClick={(e) => handleNavClick(e, item.href)}
                                className={`text-sm font-medium transition-colors relative group ${isActive(item.href)
                                    ? 'text-[#00B4A0]'
                                    : 'text-[#2D3748] hover:text-[#00B4A0]'
                                    }`}
                            >
                                {item.label}
                                <span
                                    className={`absolute -bottom-1 left-0 h-0.5 bg-[#00B4A0] transition-all duration-300 ${isActive(item.href) ? 'w-full' : 'w-0 group-hover:w-full'
                                        }`}
                                />
                            </a>
                        ))}
                    </div>

                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden p-2 rounded-lg hover:bg-[#E8EEF4] transition-colors"
                        aria-label="Toggle menu"
                    >
                        <svg
                            className="w-6 h-6 text-[#0F4C8A]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            {isMobileMenuOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            )}
                        </svg>
                    </button>
                </div>

                {isMobileMenuOpen && (
                    <div className="md:hidden mt-4 pt-4 border-t border-[#E8EEF4]">
                        <div className="flex flex-col space-y-4">
                            <a
                                href="#hero"
                                onClick={handleTitleClick}
                                className="text-sm font-medium text-[#2D3748] opacity-60 hover:opacity-100 hover:text-[#0F4C8A] transition-all cursor-pointer px-2 py-1"
                            >
                                {pageTitle}
                            </a>
                            {navItems.map((item) => (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    onClick={(e) => handleNavClick(e, item.href)}
                                    className={`text-base font-medium transition-colors px-2 py-1 ${isActive(item.href)
                                        ? 'text-[#00B4A0]'
                                        : 'text-[#2D3748] hover:text-[#00B4A0]'
                                        }`}
                                >
                                    {item.label}
                                </a>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}