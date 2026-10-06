# chellrach.com

The company website for **Chellrach Global Limited**: our products (starting with
[JollofTV](https://www.jolloftv.com)) and our cloud and platform engineering services.

Next.js (static export) + TypeScript + Tailwind CSS, hosted on Netlify.

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck
npm run build      # static site in out/
```

## Where things live

| What | Where |
|------|-------|
| Company facts, JollofTV figures, nav, contact topics | `lib/site.ts` |
| Pages | `app/` (home, contact, privacy, terms) |
| Light/dark colours and brand tokens | `app/globals.css` |
| Designer's logo files (source) | `assets/brand/` |
| Generated logos, favicons, share card | `public/brand/`, `app/icon.png`, `app/apple-icon.png`, `public/favicon.ico`, `public/og-image.png` |

**JollofTV figures and availability** in `lib/site.ts` mirror what jolloftv.com shows.
Update them when that site's change. Add an app platform to `availableOn` only once
its store has approved it.

**Logos:** after replacing a file in `assets/brand/`, run `npm run gen:brand` and commit
the outputs.

## Contact form

The form on `/contact/` submits to **Netlify Forms**. Netlify registers the form at
deploy time from `public/__forms.html`, so keep that file's fields in sync with
`components/ContactForm.tsx`. Turn on form detection and email notifications in the
Netlify dashboard (Site configuration → Forms) and send them to hello@chellrach.com.

## Deploy

`netlify.toml` sets the build command (`npm run build`) and publish directory (`out`).
