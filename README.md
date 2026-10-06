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

## Security checks

`.github/workflows/security.yml` runs on pull requests only (not on push or merge to
`main`), and can be started by hand from the Actions tab:

| Check | Blocks the build on |
|-------|---------------------|
| Dependency audit (`npm audit`) | high or critical advisories |
| Secret scan (gitleaks, full git history) | any secret found |
| Trivy (dependencies, secrets, config) | high or critical findings with a fix available |
| Checkov (workflows and config) | nothing: advisory only |

gitleaks runs from its container because `gitleaks-action` needs a paid licence for
organisation repos. The run summary lists each check's result; the findings themselves
are in each job's log (code-scanning uploads need GitHub Advanced Security on private
organisation repos). Checkov always passes, so read its log for what it reported.

To stop a pull request merging when a check fails, mark **Security summary** as a
required status check in the repository's branch protection rules for `main`. Dependabot
(`.github/dependabot.yml`) keeps npm packages and the pinned actions up to date.

## Deploy

`netlify.toml` sets the build command (`npm run build`) and publish directory (`out`).
