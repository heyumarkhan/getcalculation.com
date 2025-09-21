import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/embed/',
    },
    sitemap: 'https://getcalculation.com/sitemap.xml',
  }
}
