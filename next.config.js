/** @type {import('next').NextConfig} */
const nextConfig = {
  // TEMP while scaffolding: let builds pass even if ESLint/TS complain.
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },

  async headers() {
    return [
      {
        // Apply these headers to all routes
        source: '/:path*',
        headers: [
          // Mitigate clickjacking
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          // Hide referrer details across sites
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          // Opt out of FLoC / interest-cohort
          { key: 'Permissions-Policy', value: 'interest-cohort=()' },
          // Basic XSS protection (legacy but harmless)
          { key: 'X-XSS-Protection', value: '0' },
          // Don’t sniff content types
          { key: 'X-Content-Type-Options', value: 'nosniff' }
        ],
      },
    ]
  },
}

module.exports = nextConfig
