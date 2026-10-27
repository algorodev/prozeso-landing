# CLAUDE.md — Prozeso Landing

## Project overview

Prozeso Landing is a multi-language (es/en) marketing site for **Prozeso**, an automation consultancy that builds the internal operations panel of companies with 10-200 employees (an in-house base plus modules tailored to each client, connected to the tools they already use, with AI working on their real data). Built with Next.js 16 (App Router), React 19, Tailwind CSS v4, and TypeScript.

> **Note**: Prozeso operates as a small automation agency rather than a self-serve product. The landing page positions the team as an agency (see the "Cómo trabajamos" / "How we work" process page and the client case study). The only real client is The Fitzgerald: do not add other client logos, testimonials, metrics or review markup (JSON-LD included) that are not real. The ElevenLabs voice agent and the calendar booking CTA remain removed to keep the site lean; the `/start` assessment form sends a real lead notification to the team via Telegram.

## Tech stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Language**: TypeScript 5.9 (strict mode)
- **Styling**: Tailwind CSS v4, CSS custom properties, Framer Motion, Anime.js
- **UI**: Radix UI primitives, shadcn/ui pattern, CVA for variants
- **Forms**: react-hook-form + Zod validation
- **Lead notifications**: `/start` form submissions are sent to the team via the Telegram Bot API (`src/app/api/start/route.ts`). React Email templates in `src/emails/` still exist but are unused.
- **i18n**: next-intl (locales: `es` default, `en`)
- **Testing**: Vitest, React Testing Library, @vitest/coverage-v8
- **Linting/Formatting**: Biome
- **CI**: GitHub Actions (lint, format, test, build)
- **Git hooks**: Husky pre-commit (lint, format, test, build)
- **Package manager**: pnpm

## Common commands

```bash
pnpm dev          # Dev server with Turbopack
pnpm build        # Production build
pnpm start        # Serve production build
pnpm lint         # Biome lint check
pnpm format       # Biome format (auto-fix)
pnpm test         # Run all tests (Vitest)
pnpm test:cov     # Run tests with coverage report
```

## Project structure

```
src/
├── app/                     # Next.js App Router
│   ├── [locale]/            # Localized routes (es, en)
│   │   ├── page.tsx         # Home
│   │   ├── about/           # About / team page
│   │   ├── start/           # Assessment wizard
│   │   ├── solutions/       # "How we work" process page
│   │   ├── case-studies/    # Client case studies (The Fitzgerald)
│   │   └── legal/           # Privacy, terms, cookies
│   └── api/start/           # Sends lead notifications to Telegram
├── components/              # React components
│   ├── Home/                # Home page sections (Hero, Understanding, FeaturedCase, Process, ...)
│   ├── About/               # About page (Hero, Team)
│   ├── Start/               # Assessment wizard components
│   ├── Process/             # Process page (hero, timeline, detail dialog)
│   ├── CaseStudy/           # Case study page sections
│   ├── Legal/               # Legal page components
│   ├── ui/                  # Reusable UI primitives (Button, Card, Form, Dialog, etc.)
│   └── icons/               # Custom SVG icon components
├── lib/
│   ├── seo/                 # SEO helpers (breadcrumb JSON-LD)
│   └── utils.ts             # Misc helpers
├── i18n/                    # i18n config + LocalizedLink
├── messages/                # Translation JSON files (en.json, es.json)
├── emails/                  # React Email templates
├── __tests__/               # Unit tests (Vitest)
└── assets/                  # Static images
```

## Architecture guidelines

- **Path alias**: `@/*` maps to `./src/*`
- **Routing**: All user-facing routes are under `src/app/[locale]/`
- **Components**: Page-specific components live in named folders (`Home/`, `Start/`, etc.); reusable primitives go in `ui/`
- **Translations**: All user-facing strings come from `src/messages/{locale}.json` via `useTranslations()`. Never hardcode display text
- **Styling**: Use Tailwind utility classes. Brand colors are defined as CSS variables in `globals.css` (lavender, blue, cyan, mint, orange). Dark theme is the default (forced)
- **Fonts**: Inter Tight (body) and Sora (headings), loaded via `next/font`

## Testing

- **Framework**: Vitest with jsdom environment
- **Setup**: `src/__tests__/setup.ts` loads `@testing-library/jest-dom/vitest`
- **Convention**: All test files in `src/__tests__/` with `.test.ts` or `.test.tsx` extension
- **Mocking**: Use `vi.hoisted()` for mock variables referenced inside `vi.mock()` factories (they are hoisted above `const` declarations)
- **Coverage**: Run `pnpm test:cov` for v8 coverage reports
- Pre-commit hook runs `pnpm lint && pnpm format && pnpm test && pnpm build` automatically

## Code style

- Biome handles linting and formatting — run `pnpm lint` and `pnpm format` before committing
- 2-space indentation
- Follow existing patterns: named exports for components, default exports for pages
- Use `LocalizedLink` from `@/i18n/LocalizedLink` instead of raw `next/link` for internal navigation

## Environment variables

Required in `.env`:
```
NEXT_PUBLIC_BASE_URL        # App base URL
GA_MEASUREMENT_ID           # Google Analytics 4
TELEGRAM_BOT_TOKEN          # Bot token from @BotFather, used to send lead notifications
TELEGRAM_CHAT_ID            # Chat/user ID the bot sends /start form leads to
```

`NEXT_PUBLIC_*` vars are browser-exposed. Keep API keys server-only.

## Key patterns

- **Form validation**: Zod schemas with react-hook-form via `@hookform/resolvers`
- **Process page**: `solutions/` renders the "How we work" timeline from `src/components/Process/` (stages come from `home.process` translations)
- **Featured case**: `Home/FeaturedCase.tsx` shows The Fitzgerald on the home (copy in `home.featuredCase`); keep its figures and modules in sync with the case study

## CI/CD

- **GitHub Actions**: Runs lint, format, test, and build on pushes to `main` and PRs (`.github/workflows/ci.yml`)
- **Husky pre-commit**: Same pipeline runs locally before each commit
- **Vercel**: Hosted on Vercel; pushes to `main` trigger production deploys, PRs get preview URLs
- Production domain: `prozeso.com`
