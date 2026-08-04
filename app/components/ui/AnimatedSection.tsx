// ============================================================
// FILE: app/components/ui/AnimatedSection.tsx
// PURPOSE: Wrapper component that animates content on scroll
// ============================================================

'use client';

import { useEffect, useRef, useState, ReactNode } from 'react';

interface AnimatedSectionProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    direction?: 'up' | 'down' | 'left' | 'right' | 'none';
    threshold?: number;
}

export default function AnimatedSection({
    children,
    className = '',
    delay = 0,
    direction = 'up',
    threshold = 0.15,
}: AnimatedSectionProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            {
                threshold,
                rootMargin: '0px 0px -50px 0px',
            }
        );

        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [threshold]);

    const getTransform = () => {
        if (!isVisible) {
            switch (direction) {
                case 'up':
                    return 'translateY(40px)';
                case 'down':
                    return 'translateY(-40px)';
                case 'left':
                    return 'translateX(40px)';
                case 'right':
                    return 'translateX(-40px)';
                case 'none':
                    return 'none';
                default:
                    return 'translateY(40px)';
            }
        }
        return 'none';
    };

    return (
        <div
            ref={ref}
            className={className}
            style={{
                opacity: isVisible ? 1 : 0,
                transform: getTransform(),
                transition: `opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1), transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)`,
                transitionDelay: `${delay}ms`,
                willChange: 'opacity, transform',
            }}
        >
            {children}
        </div>
    );
}