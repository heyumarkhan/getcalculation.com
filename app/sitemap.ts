import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://getcalculation.com'
  
  // Define all your calculator pages
  const calculators = [
    { slug: 'area', priority: 0.8 },
    { slug: 'volume', priority: 0.8 },
    { slug: 'perimeter', priority: 0.8 },
    { slug: 'slope', priority: 0.8 },
    { slug: 'parabola', priority: 0.7 },
    { slug: 'diamond-problem', priority: 0.7 },
    { slug: 'cross-multiplication', priority: 0.7 },
    { slug: 'herons-formula', priority: 0.7 },
    { slug: 'similar-triangles', priority: 0.7 },
    { slug: 'line-segment-length', priority: 0.7 },
    { slug: 'midpoint', priority: 0.7 },
    { slug: 'triangular-prism-surface-area', priority: 0.7 },
    { slug: 'standard-form-to-slope-intercept', priority: 0.7 }
  ]

  // Generate sitemap entries
  const calculatorPages = calculators.map((calc) => ({
    url: `${baseUrl}/${calc.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: calc.priority,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...calculatorPages,
  ]
}