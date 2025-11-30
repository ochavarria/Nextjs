import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./lib/i18n.ts');

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dyjpxetgowxitpjykxsu.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
  compress: true,
  poweredByHeader: false,
};

export default withNextIntl(nextConfig);
