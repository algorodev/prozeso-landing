# Prospector Landing — Onboarding & Environments

A production‑ready landing site built with Next.js 16 (App Router), React 19, Tailwind CSS v4, and i18n via `next-intl`. This guide explains how to run the project locally and how production is set up on Vercel.

## Tech stack
- Next.js 16 (App Router, Turbopack)
- React 19
- Tailwind CSS v4
- next-intl (routing under `[locale]`)
- next-themes (dark/system theme)
- Biome (format + lint)
- Resend (transactional email)
- GA4 (analytics)

## Project structure
Key paths only (not exhaustive):
- `src/app/[locale]/layout.tsx` — per-locale root layout with providers (theme, i18n)
- `src/app/[locale]/page.tsx` — main localized page
- `src/app/layout.tsx` — app root shell
- `src/app/robots.ts`, `src/app/sitemap.ts` — SEO helpers
- `public/` — static assets (e.g., `og-image.png`)
- `next.config.ts`, `tsconfig.json` — config files
- `biome.json` — linter/formatter rules

## Prerequisites
- Node.js 20+ (recommended LTS)
- pnpm, npm, bun, or yarn (examples use `pnpm`)
- A Resend account (if you plan to test email sending)
- A GA4 property (optional for local)

## Environment variables
Create a `.env` file in the project root (already present in this repo for local). Example values:

```
# Public URLs used by the app (local)
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_CLIENT_URL=http://localhost:3001

# Email (Resend)
RESEND_API_KEY=your_resend_api_key

# Google Analytics (GA4)
GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

Notes:
- Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser—do not put secrets there.
- Keep `.env` out of version control if it contains secrets.

## Local development
1) Install dependencies
```
pnpm install
```

2) Run the dev server
```
pnpm dev
```

3) Open the site
- App: http://localhost:3000

4) Lint and format
```
pnpm lint
pnpm format
```

5) Production build locally (optional)
```
pnpm build
pnpm start
```

## Internationalization (i18n)
- Localized routes live under `src/app/[locale]`.
- Supported locales are defined in `@/i18n/config` and loaded in `[locale]/layout.tsx`.
- Translations are loaded from `@/messages/<locale>.json`.
- To add a new language: add the locale to the config, create a matching messages JSON file, and ensure `generateStaticParams` includes it.

## Theming
- Dark/System themes are handled by `next-themes` in `src/app/[locale]/layout.tsx`.

## Emails (Resend)
- Ensure `RESEND_API_KEY` is set (local `.env` and Vercel project settings for prod).
- When deploying to Vercel, add the same key to Environment Variables (see below).

## Analytics (GA4)
- `GA_MEASUREMENT_ID` should be set in local `.env` (optional) and in Vercel for production.

---

# Environments

## Local
- URL: http://localhost:3000
- Required env: `NEXT_PUBLIC_BASE_URL`, (optional) `NEXT_PUBLIC_CLIENT_URL`, `RESEND_API_KEY`, `GA_MEASUREMENT_ID`.
- Start with `pnpm dev`.

## Production (Vercel)
The app is designed to be deployed on Vercel.

1) Create/Link project
- Push the repository to GitHub.
- Import it in Vercel and select the `landing` project root.

2) Build configuration
- Framework: Next.js
- Build command: `pnpm build` (Vercel auto-detects; this project uses Turbopack)
- Output: `.vercel/output` (handled by Next.js)

3) Environment Variables (Vercel → Settings → Environment Variables)
Set the following for Production (and Preview, if needed):
- `NEXT_PUBLIC_BASE_URL` → your production URL (`https://prozeso.com`)
- `NEXT_PUBLIC_CLIENT_URL` → external client app origin if used (optional)
- `RESEND_API_KEY` → your Resend secret key
- `GA_MEASUREMENT_ID` → your GA4 ID

4) Domains
- Add your custom domain in Vercel → Project → Domains.
- Configure DNS as instructed by Vercel; wait for propagation.

5) Previews
- Every PR to the default branch gets a Preview URL with the same env configuration (if set for the Preview environment in Vercel).

## Deploy workflow
- Commit to the default branch → Vercel builds and deploys Production.
- Open PR → Vercel builds and deploys a Preview.

## Troubleshooting
- Build fails on Vercel: verify all required env vars are present for the environment (Preview vs Production).
- 404 for localized routes: ensure the locale is listed in `@/i18n/config` and messages file exists.
- Styling issues: ensure Tailwind CSS v4 is installed and `postcss.config.mjs` is present.
- Emails not sending: check `RESEND_API_KEY` and any domain verification steps required by Resend.

## Useful scripts
- `pnpm dev` — start development server (Turbopack)
- `pnpm build` — production build
- `pnpm start` — run built app locally
- `pnpm lint` — biome lint
- `pnpm format` — biome format write

## License
Private project. All rights reserved.
