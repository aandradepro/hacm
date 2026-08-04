// ============================================================
// FILE: app/lib/utils.ts
// PURPOSE: General utility functions for the application
// ============================================================

/**
 * Formats a date to a readable string
 */
export function formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

/**
 * Truncates a string to a specified length
 */
export function truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
}

/**
 * Creates a slug from a string
 */
export function slugify(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

/**
 * Debounces a function call
 */
export function debounce<T extends (...args: any[]) => any>(
    fn: T,
    delay: number
): (...args: Parameters<T>) => void {
    let timeoutId: NodeJS.Timeout | null = null;

    return function (...args: Parameters<T>) {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            fn(...args);
            timeoutId = null;
        }, delay);
    };
}

/**
 * Throttles a function call
 */
export function throttle<T extends (...args: any[]) => any>(
    fn: T,
    limit: number
): (...args: Parameters<T>) => void {
    let inThrottle = false;

    return function (...args: Parameters<T>) {
        if (!inThrottle) {
            fn(...args);
            inThrottle = true;
            setTimeout(() => {
                inThrottle = false;
            }, limit);
        }
    };
}

/**
 * Checks if the current device is mobile
 */
export function isMobile(): boolean {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < 768;
}

/**
 * Checks if the current device is tablet
 */
export function isTablet(): boolean {
    if (typeof window === 'undefined') return false;
    return window.innerWidth >= 768 && window.innerWidth < 1024;
}

/**
 * Checks if the current device is desktop
 */
export function isDesktop(): boolean {
    if (typeof window === 'undefined') return false;
    return window.innerWidth >= 1024;
}

/**
 * Gets the current device type
 */
export function getDeviceType(): 'mobile' | 'tablet' | 'desktop' | 'unknown' {
    if (typeof window === 'undefined') return 'unknown';

    if (isMobile()) return 'mobile';
    if (isTablet()) return 'tablet';
    if (isDesktop()) return 'desktop';
    return 'unknown';
}

/**
 * Returns the appropriate class name for responsive design
 */
export function responsiveClass(
    base: string,
    mobile?: string,
    tablet?: string,
    desktop?: string
): string {
    let className = base;

    if (mobile) className += ` mobile:${mobile}`;
    if (tablet) className += ` tablet:${tablet}`;
    if (desktop) className += ` desktop:${desktop}`;

    return className;
}

/**
 * Copies text to clipboard
 */
export function copyToClipboard(text: string): Promise<boolean> {
    return new Promise((resolve) => {
        if (typeof navigator === 'undefined' || !navigator.clipboard) {
            resolve(false);
            return;
        }

        navigator.clipboard
            .writeText(text)
            .then(() => resolve(true))
            .catch(() => resolve(false));
    });
}

/**
 * Smooth scrolls to an element
 */
export function scrollToElement(elementId: string, offset: number = 0): void {
    const element = document.getElementById(elementId);
    if (!element) return;

    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
    });
}

/**
 * Gets the reading time for a piece of text
 */
export function getReadingTime(text: string, wordsPerMinute: number = 200): number {
    const wordCount = text.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
}

/**
 * Generates a random ID
 */
export function generateId(length: number = 8): string {
    return Math.random()
        .toString(36)
        .substring(2, 2 + length);
}