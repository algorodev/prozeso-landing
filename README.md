# Prozeso Landing

Marketing site for [Prozeso](https://prozeso.com) — an AI-powered workflow automation platform for service businesses (restaurants, clinics, beauty salons, hotels, real estate).

Built with **Next.js 16**, **React 19**, **Tailwind CSS v4**, and **TypeScript**.

> **Note**: Prozeso has shut down. The landing page stays up as a static informational site — email sending, the ElevenLabs voice agent, and the calendar booking CTA have been intentionally removed to eliminate ongoing costs.

## Features

- **Solutions Showcase** — Tailored automation showcases across verticals (restaurants, clinics, beauty, hotels, real estate)
- **About Page** — Team and company background
- **Internationalization** — Full Spanish/English support with localized routing
- **Assessment Wizard** — Multi-step form (email notifications disabled)
- **SEO** — Dynamic sitemap, robots.txt, Open Graph metadata

## Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript 5.9 |
| Styling | Tailwind CSS v4, Framer Motion, Anime.js |
| UI | Radix UI, shadcn/ui pattern, CVA |
| Forms | react-hook-form + Zod |
| Email | React Email templates (sending disabled) |
| i18n | next-intl |
| Testing | Vitest, React Testing Library, @vitest/coverage-v8 |
| Linting | Biome |
| CI | GitHub Actions |
| Git hooks | Husky |

## Prerequisites

- Node.js 20+
- pnpm (recommended)

## Getting Started

1. **Install dependencies**

```bash
pnpm install
```

2. **Set up environment variables**

Create a `.env` file in the project root:

```env
NEXT_PUBLIC_BASE_URL=http://localhost:3000
GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

> `NEXT_PUBLIC_*` variables are exposed to the browser. Keep API keys server-only.

3. **Run the dev server**

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start dev server (Turbopack) |
| `pnpm build` | Production build |
| `pnpm start` | Serve production build |
| `pnpm lint` | Run Biome lint |
| `pnpm format` | Run Biome format (auto-fix) |
| `pnpm test` | Run all tests (Vitest) |
| `pnpm test:cov` | Run tests with coverage report |

## Project Structure

```
src/
├── app/                     # Next.js App Router
│   ├── [locale]/            # Localized routes (es, en)
│   │   ├── about/           # About / team page
│   │   ├── start/           # Assessment wizard
│   │   ├── solutions/       # Automations + industry solutions showcase
│   │   └── legal/           # Privacy, terms, cookies
│   └── api/start/           # No-op endpoint (email sending disabled)
├── components/              # React components
│   ├── Home/                # Home page sections
│   ├── About/               # About page (Hero, Team)
│   ├── Start/               # Assessment wizard
│   ├── Solutions/           # Solutions grid + detail dialog
│   ├── Legal/               # Legal pages
│   ├── ui/                  # Reusable primitives
│   └── icons/               # Custom SVG icons
├── lib/                     # Misc helpers + SEO
├── i18n/                    # i18n configuration
├── messages/                # Translation files (en.json, es.json)
├── data/                    # Static data (automations)
├── emails/                  # React Email templates
└── __tests__/               # Unit tests (Vitest)
```

## Internationalization

- Supported locales: **Spanish** (default), **English**
- Routes are under `src/app/[locale]/`
- Translations live in `src/messages/{locale}.json`
- Use `useTranslations()` from `next-intl` for all display text
- To add a locale: update `src/i18n/config.ts`, create the messages file, and add to `generateStaticParams`

## CI/CD

- **GitHub Actions** runs lint, format, test, and build on every push to `main` and on PRs
- **Husky pre-commit hook** runs the same pipeline locally before each commit
- All checks must pass before code can be merged

## Deployment

The app is deployed on **Vercel**.

- Pushes to `main` trigger production deploys
- PRs get automatic preview URLs
- Set the same environment variables in Vercel project settings

### Required Vercel Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_BASE_URL` | Production URL (`https://prozeso.com`) |
| `GA_MEASUREMENT_ID` | Google Analytics 4 ID |

## License

Private project. All rights reserved.
