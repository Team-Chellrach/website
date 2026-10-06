// Generates every brand image the site serves from the designer's logo files
// in assets/brand/ (CorelDRAW SVG exports, converted to UTF-8). Run with
// `npm run gen:brand` after replacing any of them; the outputs are committed,
// so a normal build never needs sharp.
//
// The CorelDRAW exports sit on a 10000×10000 page with the logo in the middle,
// so each one is cropped to its artwork before use:
//
//   full-color-horizontal-on-white.svg → public/brand/chellrach-logo-light.svg  (grey lettering, light theme)
//   full-color-horizontal-on-black.svg → public/brand/chellrach-logo-dark.svg   (white lettering, dark theme)
//   icon-full-color.svg                → public/brand/chellrach-icon.svg, app/icon.png,
//                                        app/apple-icon.png, public/favicon.ico
//   all of the above                   → public/og-image.png (1200×630 social share card)
import sharp from 'sharp'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const src = name => path.join(root, 'assets/brand', name)
const out = rel => path.join(root, rel)

// Brand colours, as used in the designer's files.
const BLUE = '#1d70be'
const GREEN = '#00b189'
const INK = '#141516'

const PAGE = 10000 // CorelDRAW page size in SVG user units

await mkdir(out('public/brand'), { recursive: true })

/** Returns the SVG cropped to its artwork (plus a little breathing room),
 *  with the fixed 10in width/height removed so CSS can size it. */
async function cropSvg(file, padUnits = 20) {
  const svg = (await readFile(src(file), 'utf8'))
    .replace(/<!DOCTYPE[^>]*>\s*/, '')
    .replace(/<!--[^]*?-->\s*/g, '')
  // Render the whole page, measure the artwork, and map pixels back to units.
  const probe = sharp(Buffer.from(svg), { density: 200 })
  const { width: pagePx } = await probe.metadata()
  const { info } = await probe.trim().toBuffer({ resolveWithObject: true })
  const scale = PAGE / pagePx
  const round = n => Math.round(n * 100) / 100
  const x = round(-info.trimOffsetLeft * scale - padUnits)
  const y = round(-info.trimOffsetTop * scale - padUnits)
  const w = round(info.width * scale + padUnits * 2)
  const h = round(info.height * scale + padUnits * 2)
  return svg
    .replace(/\swidth="10in"\s+height="10in"/, '')
    .replace(/viewBox="0 0 10000 10000"/, `viewBox="${x} ${y} ${w} ${h}"`)
}

const logoLight = await cropSvg('full-color-horizontal-on-white.svg')
const logoDark = await cropSvg('full-color-horizontal-on-black.svg')
const icon = await cropSvg('icon-full-color.svg')

await writeFile(out('public/brand/chellrach-logo-light.svg'), logoLight)
await writeFile(out('public/brand/chellrach-logo-dark.svg'), logoDark)
await writeFile(out('public/brand/chellrach-icon.svg'), icon)

// --- Icons -------------------------------------------------------------------
async function squareIcon(size, { padding, background }) {
  const inner = Math.round(size * (1 - padding * 2))
  const mark = await sharp(Buffer.from(icon))
    .resize(inner, inner, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer()
  return sharp({ create: { width: size, height: size, channels: 4, background } })
    .composite([{ input: mark, gravity: 'centre' }])
    .png()
}

const transparent = { r: 0, g: 0, b: 0, alpha: 0 }
const white = { r: 255, g: 255, b: 255, alpha: 1 }

await (await squareIcon(512, { padding: 0.04, background: transparent })).toFile(out('app/icon.png'))
// iOS ignores transparency on home-screen icons, so give it an opaque tile.
await (await squareIcon(180, { padding: 0.14, background: white })).toFile(out('app/apple-icon.png'))

// favicon.ico holding PNG-encoded 16, 32 and 48px images.
{
  const sizes = [16, 32, 48]
  const pngs = await Promise.all(sizes.map(async s => (await squareIcon(s, { padding: 0, background: transparent })).toBuffer()))
  const header = Buffer.alloc(6)
  header.writeUInt16LE(0, 0) // reserved
  header.writeUInt16LE(1, 2) // type: icon
  header.writeUInt16LE(sizes.length, 4)
  const entries = []
  let offset = 6 + 16 * sizes.length
  sizes.forEach((s, i) => {
    const e = Buffer.alloc(16)
    e.writeUInt8(s, 0)
    e.writeUInt8(s, 1)
    e.writeUInt16LE(1, 4) // colour planes
    e.writeUInt16LE(32, 6) // bits per pixel
    e.writeUInt32LE(pngs[i].length, 8)
    e.writeUInt32LE(offset, 12)
    offset += pngs[i].length
    entries.push(e)
  })
  await writeFile(out('public/favicon.ico'), Buffer.concat([header, ...entries, ...pngs]))
}

// --- Social share card -------------------------------------------------------
{
  const W = 1200, H = 630
  const font = 'Helvetica Neue, Helvetica, Arial, sans-serif'
  const background = Buffer.from(`
    <svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
      <defs>
        <radialGradient id="glowBlue" cx="15%" cy="10%" r="70%">
          <stop offset="0" stop-color="${BLUE}" stop-opacity="0.45"/>
          <stop offset="1" stop-color="${BLUE}" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="glowGreen" cx="95%" cy="100%" r="65%">
          <stop offset="0" stop-color="${GREEN}" stop-opacity="0.35"/>
          <stop offset="1" stop-color="${GREEN}" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="bar" x1="0" x2="1">
          <stop offset="0" stop-color="${BLUE}"/>
          <stop offset="1" stop-color="${GREEN}"/>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="${INK}"/>
      <rect width="100%" height="100%" fill="url(#glowBlue)"/>
      <rect width="100%" height="100%" fill="url(#glowGreen)"/>
      <rect x="100" y="372" width="120" height="5" rx="2.5" fill="url(#bar)"/>
      <text x="100" y="440" font-family="${font}" font-size="36" fill="#d5d9de">We design, build and run software</text>
      <text x="100" y="488" font-family="${font}" font-size="36" fill="#d5d9de">and cloud platforms.</text>
    </svg>`)
  const logo = await sharp(Buffer.from(logoDark)).resize({ width: 760 }).toBuffer()
  await sharp(background)
    .composite([{ input: logo, left: 92, top: 150 }])
    .png()
    .toFile(out('public/og-image.png'))
}

console.log('Brand assets generated.')
