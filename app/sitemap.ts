import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://getcalculation.com'
  
  // Define all your calculator pages
  const calculators = [
    { slug: 'math/area', priority: 0.8 },
    { slug: 'math/volume', priority: 0.8 },
    { slug: 'math/perimeter', priority: 0.8 },
    { slug: 'math/slope', priority: 0.8 },
    { slug: 'math/parabola', priority: 0.7 },
    { slug: 'math/diamond-problem', priority: 0.7 },
    { slug: 'math/cross-multiplication', priority: 0.7 },
    { slug: 'math/herons-formula', priority: 0.7 },
    { slug: 'math/similar-triangles', priority: 0.7 },
    { slug: 'math/line-segment-length', priority: 0.7 },
    { slug: 'math/midpoint', priority: 0.7 },
    { slug: 'math/triangular-prism-surface-area', priority: 0.7 },
    { slug: 'math/standard-form-to-slope-intercept', priority: 0.7 },
    { slug: 'math/exponential-function', priority: 0.8 },
    { slug: 'physics/velocity-calculator', priority: 0.8 }
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
    {
      url: `${baseUrl}/math`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/physics`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...calculatorPages,
  ]
}