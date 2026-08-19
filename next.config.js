// ============================================================
// FILE: next.config.js
// PURPOSE: Next.js configuration for static export and optimization
// ============================================================

/** @type {import('next').NextConfig} */
const nextConfig = {
    // Enable static export for deployment on Vercel or any static host
    //    output: 'export',

    // Image optimization settings
    images: {
        unoptimized: true,
        formats: ['image/webp'],
    },

    // Disable strict mode for compatibility
    reactStrictMode: true,

    // Enable trailing slashes for static export
    trailingSlash: true,

    // Skip TypeScript type checking during build for speed
    typescript: {
        ignoreBuildErrors: false,
    },

    // Skip ESLint during build for speed
    //    eslint: {
    //        ignoreDuringBuilds: false,
    //    },

    // Compression for better performance
    compress: true,

    // Headers for security and performance
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    {
                        key: 'X-Frame-Options',
                        value: 'DENY',
                    },
                    {
                        key: 'X-XSS-Protection',
                        value: '1; mode=block',
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'strict-origin-when-cross-origin',
                    },
                ],
            },
        ];
    },
};

module.exports = nextConfig;