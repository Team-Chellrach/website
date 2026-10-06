import type { MetadataRoute } from 'next'
import { COMPANY } from '@/lib/site'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  return ['', '/contact/', '/privacy/', '/terms/'].map(path => ({
    url: `${COMPANY.url}${path}`,
    changeFrequency: 'monthly',
    priority: path === '/' ? 1 : 0.5,
  }))
}
