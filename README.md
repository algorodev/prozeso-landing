# Prozeso Landing

Marketing site for [Prozeso](https://prozeso.com) — an AI-powered workflow automation platform for service businesses (restaurants, clinics, beauty salons, hotels, real estate).

Built with **Next.js 16**, **React 19**, **Tailwind CSS v4**, and **TypeScript**.

## Features

- **AI Use-Case Analyzer** — Users describe their business pain points and receive a personalized automation report powered by Google Gemini
- **Voice AI Agent** — Floating conversational assistant via ElevenLabs with multilingual support
- **Industry Solutions** — Tailored automation showcases for 5 verticals (restaurants, clinics, beauty, hotels, real estate)
- **Internationalization** — Full Spanish/English support with localized routing
- **Assessment Wizard** — Multi-step form with email notifications via Resend
- **SEO** — Dynamic sitemap, robots.txt, Open Graph metadata

## Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript 5.9 |
| Styling | Tailwind CSS v4, Framer Motion, Anime.js |
| UI | Radix UI, shadcn/ui pattern, CVA |
| Forms | react-hook-form + Zod |
| AI | Vercel AI SDK, Google Generative AI, ElevenLabs |
| Email | Resend + React Email |
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
NEXT_PUBLIC_CLIENT_URL=http://localhost:3001
RESEND_API_KEY=re_your_key
GA_MEASUREMENT_ID=G-XXXXXXXXXX
GOOGLE_API_KEY=your_google_api_key
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
│   │   ├── start/           # Assessment wizard
│   │   ├── use-cases/       # AI use-case analyzer + report
│   │   ├── automations/     # Automation showcase
│   │   ├── verticals/       # Industry-specific pages
│   │   └── legal/           # Privacy, terms, cookies
│   └── api/                 # API routes
├── components/              # React components
│   ├── Home/                # Home page sections
│   ├── Start/               # Assessment wizard
│   ├── UseCases/            # Use-case analysis + reports
│   ├── Automations/         # Automation showcase
│   ├── Verticals/           # Industry-specific
│   ├── Legal/               # Legal pages
│   ├── ui/                  # Reusable primitives
│   └── icons/               # Custom SVG icons
├── lib/                     # Business logic
│   ├── agents/              # AI pipeline (analyzer + report)
│   ├── actions/             # Server actions
│   ├── config/              # AI provider config
│   └── prompts/             # System prompts
├── i18n/                    # i18n configuration
├── messages/                # Translation files (en.json, es.json)
├── types/                   # TypeScript definitions
├── data/                    # Static data (automations, verticals)
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
| `NEXT_PUBLIC_CLIENT_URL` | Client app URL (optional) |
| `RESEND_API_KEY` | Resend email API key |
| `GA_MEASUREMENT_ID` | Google Analytics 4 ID |
| `GOOGLE_API_KEY` | Google Generative AI key |

## License

Private project. All rights reserved.
