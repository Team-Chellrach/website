import type { Metadata, Viewport } from 'next'
import { IBM_Plex_Mono, IBM_Plex_Sans, Plus_Jakarta_Sans } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Reveal from '@/components/Reveal'
import Spotlight from '@/components/Spotlight'
import ConsentBanner from '@/components/ConsentBanner'
import { COMPANY, JOLLOFTV } from '@/lib/site'
import { themeInitScript } from '@/lib/theme'
import './globals.css'

const body = IBM_Plex_Sans({ subsets: ['latin'], variable: '--font-body', weight: ['400', '500', '600'], display: 'swap' })
const heading = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-heading', weight: ['600', '700', '800'], display: 'swap' })
const code = IBM_Plex_Mono({ subsets: ['latin'], variable: '--font-code', weight: ['400', '500'], display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL(COMPANY.url),
  title: {
    default: `${COMPANY.name} | Software and cloud platforms`,
    template: `%s | ${COMPANY.shortName}`,
  },
  description: COMPANY.description,
  applicationName: COMPANY.name,
  openGraph: {
    type: 'website',
    siteName: COMPANY.name,
    url: '/',
    title: `${COMPANY.name} | Software and cloud platforms`,
    description: COMPANY.description,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: COMPANY.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${COMPANY.name} | Software and cloud platforms`,
    description: COMPANY.description,
    images: ['/og-image.png'],
  },
  alternates: { canonical: '/' },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f5f7fa' },
    { media: '(prefers-color-scheme: dark)', color: '#0f1216' },
  ],
}

// Tells search engines who the company is and that JollofTV is one of its brands.
const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: COMPANY.name,
  legalName: COMPANY.legalName,
  alternateName: COMPANY.shortName,
  url: COMPANY.url,
  logo: `${COMPANY.url}/brand/chellrach-logo-light.svg`,
  email: COMPANY.email,
  description: COMPANY.description,
  brand: {
    '@type': 'Brand',
    name: JOLLOFTV.name,
    url: JOLLOFTV.url,
  },
  knowsAbout: [
    'Software development',
    'Cloud architecture',
    'Platform engineering',
    'Kubernetes',
    'DevOps',
    'Site reliability engineering',
    'DevSecOps',
    'Cloud networking',
    'AI and LLM integration',
    'Video streaming',
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning: the theme script adds `dark` before React loads.
    <html lang="en" suppressHydrationWarning className={`${body.variable} ${heading.variable} ${code.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className="flex min-h-screen flex-col font-sans">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-surface focus:px-4 focus:py-2 focus:text-sm focus:shadow"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <Reveal />
        <Spotlight />
        <ConsentBanner />
      </body>
    </html>
  )
}
