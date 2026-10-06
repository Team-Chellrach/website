import type { NextConfig } from 'next'

// Static export: every page is pre-rendered to plain HTML in out/, which
// Netlify serves as-is. Nothing on this site needs a server — the contact
// form posts to Netlify Forms (see public/__forms.html).
const nextConfig: NextConfig = {
  output: 'export',
  // /contact/ → out/contact/index.html, which every static host serves the same way.
  trailingSlash: true,
  images: { unoptimized: true },
}

export default nextConfig
