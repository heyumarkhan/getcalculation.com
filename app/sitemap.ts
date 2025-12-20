import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://getcalculation.com'
  
  // Define all your calculator pages
  const calculators = [
    { slug: 'math/area', priority: 0.8 },
    { slug: 'math/circumference', priority: 0.8 },
    { slug: 'math/radius-of-a-circle', priority: 0.8 },
    { slug: 'math/area-of-a-circle', priority: 0.8 },
    { slug: 'math/distance-formula', priority: 0.8 },
    { slug: 'math/angle-between-two-vectors', priority: 0.8 },
    { slug: 'math/direction-of-vector', priority: 0.8 },
    { slug: 'math/diagonal-of-rectangle', priority: 0.8 },
    { slug: 'math/polygon', priority: 0.8 },
    { slug: 'math/rectangular-prism', priority: 0.8 },
    { slug: 'math/hypotenuse', priority: 0.8 },
    { slug: 'math/sphere-volume', priority: 0.8 },
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
    { slug: 'math/standard-notation', priority: 0.8 },
    { slug: 'math/round-to-nearest-cent', priority: 0.8 },
    { slug: 'math/inverse-modulo', priority: 0.7 },
    { slug: 'math/triangular-pyramid-volume', priority: 0.7 },
    { slug: 'math/average-rate-of-change', priority: 0.8 },
    { slug: 'math/least-squares-regression', priority: 0.8 },
    { slug: 'math/binomial-coefficient', priority: 0.8 },
    { slug: 'math/isosceles-triangle', priority: 0.8 },
    { slug: 'math/log', priority: 0.8 },
    { slug: 'math/golden-ratio', priority: 0.8 },
    { slug: 'math/hexagon', priority: 0.8 },
    { slug: 'math/octagon', priority: 0.8 },
    { slug: 'math/slope-intercept-form', priority: 0.8 },
    { slug: 'math/equilateral-triangle', priority: 0.8 },
    { slug: 'math/multiplication', priority: 0.8 },
    { slug: 'math/sinh', priority: 0.8 },
    { slug: 'math/cylinder-volume', priority: 0.8 },
    { slug: 'math/mean', priority: 0.8 },
    { slug: 'math/time-percentage', priority: 0.8 },
    { slug: 'math/fraction', priority: 0.8 },
    { slug: 'math/remainder', priority: 0.8 },
    { slug: 'math/chinese-remainder-theorem', priority: 0.8 },
    { slug: 'math/error-function', priority: 0.8 },
    { slug: 'math/lagrange-error-bound', priority: 0.8 },
    { slug: 'math/percent-error', priority: 0.8 },
    { slug: 'math/percentage-difference', priority: 0.8 },
    { slug: 'math/twos-complement', priority: 0.8 },
    { slug: 'physics/velocity-calculator', priority: 0.8 },
    { slug: 'physics/acceleration-calculator', priority: 0.8 },
    { slug: 'physics/watt-calculator', priority: 0.8 },
    { slug: 'physics/wet-bulb-calculator', priority: 0.8 },
    { slug: 'physics/density-mass-volume-calculator', priority: 0.8 },
    { slug: 'physics/specific-heat-calculator', priority: 0.8 },
    { slug: 'physics/flow-rate-calculator', priority: 0.8 },
    { slug: 'physics/torque-calculator', priority: 0.8 },
    { slug: 'physics/power-to-weight-ratio-calculator', priority: 0.8 }
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