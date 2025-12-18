import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/private/', 
        '/admin/',
        '/home/', // Non-existent page
        '/calculators/', // Non-existent category pages
        '/calculators/algebra',
        '/calculators/geometry',
        '/calculators/calculus',
        '/calculators/combinatorics',
        '/math/simple-interest', // Non-existent calculator
        '/math/simple-interest/',
        '/_nuxt/', // Build artifacts (Nuxt.js)
        // Root-level calculator pages that don't exist (should use /math/ prefix)
        '/herons-formula',
        '/parabola',
        '/diamond-problem',
        '/area',
        '/slope',
        '/standard-form-to-slope-intercept',
        '/line-segment-length',
        '/volume',
        '/perimeter',
        '/midpoint',
        '/triangular-prism-surface-area',
        '/cross-multiplication',
      ],
    },
    sitemap: 'https://getcalculation.com/sitemap.xml',
  }
}