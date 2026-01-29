import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Redirect root-level calculator pages to their /math/ equivalents
      {
        source: '/herons-formula',
        destination: '/math/herons-formula',
        permanent: true,
      },
      {
        source: '/parabola',
        destination: '/math/parabola',
        permanent: true,
      },
      {
        source: '/diamond-problem',
        destination: '/math/diamond-problem',
        permanent: true,
      },
      {
        source: '/area',
        destination: '/math/area',
        permanent: true,
      },
      {
        source: '/slope',
        destination: '/math/slope',
        permanent: true,
      },
      {
        source: '/standard-form-to-slope-intercept',
        destination: '/math/standard-form-to-slope-intercept',
        permanent: true,
      },
      {
        source: '/line-segment-length',
        destination: '/math/line-segment-length',
        permanent: true,
      },
      {
        source: '/volume',
        destination: '/math/volume',
        permanent: true,
      },
      {
        source: '/perimeter',
        destination: '/math/perimeter',
        permanent: true,
      },
      {
        source: '/midpoint',
        destination: '/math/midpoint',
        permanent: true,
      },
      {
        source: '/triangular-prism-surface-area',
        destination: '/math/triangular-prism-surface-area',
        permanent: true,
      },
      {
        source: '/cross-multiplication',
        destination: '/math/cross-multiplication',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
