// ============================================================
// FILE: app/components/ui/Navigation.tsx
// PURPOSE: Fixed navigation with smooth scroll links and active section indicator
// ============================================================

'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import content from '../../data/content.json';

const NAV_ITEMS = [
    { label: 'Problem', href: '#problem' },
    { label: 'Approach', href: '#approach' },
    { label: 'Results', href: '#results' },
    { label: 'Bridge', href: '#bridge' },
    { label: 'Contact', href: '#cta' },
];

export default function Navigation() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('');
    const observerRef = useRef<IntersectionObserver | null>(null);
    const isScrollingRef = useRef(false);

    const pitchTitle = content.hero.title;
    useEffect(() => {
        // Setup IntersectionObserver for active section detection
        const sections = NAV_ITEMS.map(item =>
            document.getElementById(item.href.replace('#', ''))
        ).filter(Boolean);

        observerRef.current = new IntersectionObserver(
            (entries) => {
                if (isScrollingRef.current) return;

                let bestEntry = entries[0];
                entries.forEach((entry) => {
                    if (entry.intersectionRatio > (bestEntry?.intersectionRatio || 0)) {
                        bestEntry = entry;
                    }
                });

                if (bestEntry && bestEntry.isIntersecting) {
                    setActiveSection(bestEntry.target.id);
                }
            },
            {
                root: null,
                rootMargin: '-30% 0px -30% 0px',
                threshold: [0, 0.25, 0.5, 0.75, 1],
            }
        );

        sections.forEach((section) => {
            if (section) {
                observerRef.current?.observe(section);
            }
        });

        return () => {
            observerRef.current?.disconnect();
        };
    }, []);

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        setIsMobileMenuOpen(false);

        const element = document.querySelector(href);
        if (element) {
            isScrollingRef.current = true;

            const sectionId = href.replace('#', '');
            setActiveSection(sectionId);

            element.scrollIntoView({ behavior: 'smooth' });

            setTimeout(() => {
                isScrollingRef.current = false;
                checkActiveSection();
            }, 800);
        }
    };

    const checkActiveSection = () => {
        const sections = NAV_ITEMS.map(item =>
            document.getElementById(item.href.replace('#', ''))
        ).filter(Boolean);

        let bestSection = '';
        let bestRatio = 0;

        sections.forEach((section) => {
            if (section) {
                const rect = section.getBoundingClientRect();
                const viewportHeight = window.innerHeight;
                const visibleTop = Math.max(0, rect.top);
                const visibleBottom = Math.min(viewportHeight, rect.bottom);
                const visibleHeight = Math.max(0, visibleBottom - visibleTop);
                const ratio = visibleHeight / viewportHeight;

                if (ratio > bestRatio) {
                    bestRatio = ratio;
                    bestSection = section.id;
                }
            }
        });

        if (bestSection) {
            setActiveSection(bestSection);
        }
    };

    const isActive = (href: string) => {
        return activeSection === href.replace('#', '');
    };

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 bg-white shadow-sm py-3`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    {/* Brand */}
                    <Link
                        href="#hero"
                        onClick={(e) => handleNavClick(e, '#hero')}
                        className="text-base font-medium text-[#0F4C8A] hover:text-[#00B4A0] transition-colors"
                    >
                        Alexandre de Andrade <span className="text-[13px] font-light text-[#4A5568] opacity-50">~Å~</span>
                    </Link>
                    {/* Center: Pitch title (hidden on mobile) */}
                    <div className="hidden md:block text-sm font-medium text-[#2D3748] opacity-60">
                        {pitchTitle}
                    </div>
                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {NAV_ITEMS.map((item) => (
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

                    {/* Mobile Menu Button */}
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

                {/* Mobile Navigation */}
                {isMobileMenuOpen && (
                    <div className="md:hidden mt-4 pt-4 border-t border-[#E8EEF4]">
                        <div className="flex flex-col space-y-4">
                            {NAV_ITEMS.map((item) => (
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