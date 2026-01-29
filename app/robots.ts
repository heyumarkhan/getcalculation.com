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
        '/calculators/algebra',
        '/calculators/geometry',
        '/calculators/calculus',
        '/calculators/combinatorics',
        '/math/simple-interest', // Non-existent calculator
        '/math/simple-interest/',
        '/_nuxt/', // Build artifacts (Nuxt.js)
      ],
    },
    sitemap: 'https://getcalculation.com/sitemap.xml',
  }
}