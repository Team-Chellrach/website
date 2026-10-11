import type { Metadata, Viewport } from 'next'
import { IBM_Plex_Mono, Instrument_Sans, Newsreader } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Reveal from '@/components/Reveal'
import ConsentBanner from '@/components/ConsentBanner'
import { COMPANY, JOLLOFTV } from '@/lib/site'
import { themeInitScript } from '@/lib/theme'
import './globals.css'

const body = Instrument_Sans({ subsets: ['latin'], variable: '--font-body', display: 'swap' })
const serif = Newsreader({ subsets: ['latin'], variable: '--font-serif', style: ['normal', 'italic'], axes: ['opsz'], display: 'swap' })
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
    { media: '(prefers-color-scheme: light)', color: '#f3f0e9' },
    { media: '(prefers-color-scheme: dark)', color: '#141615' },
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
    <html lang="en" suppressHydrationWarning className={`${body.variable} ${serif.variable} ${code.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className="flex min-h-screen flex-col font-sans text-[16px] leading-[1.65]">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:border focus:border-fg focus:bg-bg focus:px-4 focus:py-2 focus:text-sm"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <Reveal />
        <ConsentBanner />
      </body>
    </html>
  )
}
