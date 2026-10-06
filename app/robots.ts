import type { MetadataRoute } from 'next'
import { COMPANY } from '@/lib/site'

export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/contact/thanks/', '/__forms.html'] },
    sitemap: `${COMPANY.url}/sitemap.xml`,
  }
}
