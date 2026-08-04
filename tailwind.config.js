// ============================================================
// FILE: tailwind.config.js
// PURPOSE: Tailwind CSS configuration with custom colors and fonts
// ============================================================

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './app/components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#0F4C8A',
                    light: '#1A6BB5',
                    dark: '#0A3A6E',
                },
                secondary: {
                    DEFAULT: '#00B4A0',
                    light: '#33C6B5',
                    dark: '#009A88',
                },
                gold: '#FFD700',
                gray: {
                    technical: '#2D3748',
                    light: '#E8EEF4',
                    text: '#4A5568',
                },
                white: '#FFFFFF',
            },
            fontFamily: {
                sans: ['var(--font-inter)', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
            },
            spacing: {
                '18': '4.5rem',
                '88': '22rem',
                '120': '30rem',
            },
            maxWidth: {
                '8xl': '88rem',
                '9xl': '96rem',
            },
            animation: {
                'fade-in': 'fadeIn 0.8s ease-out forwards',
                'slide-up': 'slideUp 0.8s ease-out forwards',
                'slide-in-left': 'slideInLeft 0.8s ease-out forwards',
                'slide-in-right': 'slideInRight 0.8s ease-out forwards',
                'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { opacity: '0', transform: 'translateY(40px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                slideInLeft: {
                    '0%': { opacity: '0', transform: 'translateX(-40px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
                slideInRight: {
                    '0%': { opacity: '0', transform: 'translateX(40px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
                pulseGlow: {
                    '0%, 100%': { opacity: '0.5' },
                    '50%': { opacity: '1' },
                },
            },
            screens: {
                'xs': '480px',
                'sm': '640px',
                'md': '768px',
                'lg': '1024px',
                'xl': '1280px',
                '2xl': '1536px',
            },
        },
    },
    plugins: [],
};