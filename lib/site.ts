// Facts and copy the whole site repeats, kept in one place so they can't drift apart.

export const COMPANY = {
  name: 'Chellrach Global Limited',
  legalName: 'CHELLRACH GLOBAL LIMITED',
  shortName: 'Chellrach',
  url: 'https://chellrach.com',
  email: 'info@chellrach.com',
  tagline: 'We design, build and run software and cloud platforms, for our own products and for yours.',
  description:
    'Chellrach Global Limited designs, builds and runs software and cloud platforms: web, mobile and TV apps, cloud architecture, platform engineering, DevOps, SRE, security and networking.',
} as const

export type PlatformStatus = 'live' | 'review' | 'development'

// JollofTV figures are copied by hand from what jolloftv.com shows (last
// checked 6 October 2026). Nothing syncs them: when jolloftv.com's rounded
// figures change, update these too. Platform statuses change as each store
// approves the app.
export const JOLLOFTV = {
  name: 'JollofTV',
  url: 'https://www.jolloftv.com',
  channels: '130+',
  stations: '175+',
  platforms: [
    { name: 'Web', status: 'live' },
    { name: 'iOS', status: 'review' },
    { name: 'Android', status: 'review' },
    { name: 'Android TV', status: 'review' },
    { name: 'Samsung TV', status: 'review' },
    { name: 'LG TV', status: 'development' },
  ] satisfies { name: string; status: PlatformStatus }[],
  languages: 7,
} as const

export const NAV_LINKS = [
  { href: '/#services', label: 'Services' },
  { href: '/#work', label: 'Our work' },
  { href: '/#how', label: 'How we work' },
] as const

export const CONTACT_TOPICS = [
  'Cloud architecture and migration',
  'Platform engineering',
  'DevOps and CI/CD',
  'Site reliability and scalability',
  'Security and DevSecOps',
  'Networking and connectivity',
  'Software development',
  'AI and LLM integration',
  'Ongoing support',
  'JollofTV',
  'Something else',
] as const
