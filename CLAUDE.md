# CLAUDE.md — Prozeso Landing

## Project overview

Prozeso Landing is a multi-language (es/en) marketing site for **Prozeso**, an AI-powered workflow automation platform for service businesses. Built with Next.js 16 (App Router), React 19, Tailwind CSS v4, and TypeScript.

## Tech stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Language**: TypeScript 5.9 (strict mode)
- **Styling**: Tailwind CSS v4, CSS custom properties, Framer Motion, Anime.js
- **UI**: Radix UI primitives, shadcn/ui pattern, CVA for variants
- **Forms**: react-hook-form + Zod validation
- **AI**: Vercel AI SDK + Google Generative AI (Gemini 2.0 Flash), ElevenLabs voice agent
- **Email**: Resend + React Email
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
│   │   ├── start/           # Assessment wizard
│   │   ├── use-cases/       # AI use-case analyzer + report
│   │   ├── automations/     # Automation showcase + [id] detail
│   │   ├── verticals/       # Industry solutions + [id] detail
│   │   └── legal/           # Privacy, terms, cookies
│   └── api/start/           # Email submission endpoint (Resend)
├── components/              # React components
│   ├── Home/                # Home page sections
│   ├── Start/               # Assessment wizard components
│   ├── UseCases/            # Use-case analysis + Report/
│   ├── Automations/         # Automation grid + Detail/
│   ├── Verticals/           # Industry-specific components
│   ├── Legal/               # Legal page components
│   ├── ui/                  # Reusable UI primitives (Button, Card, Form, Dialog, etc.)
│   └── icons/               # Custom SVG icon components
├── lib/
│   ├── agents/              # AI pipeline (analyzer + report generator)
│   ├── actions/             # Server actions
│   ├── config/              # Google AI config
│   └── prompts/             # AI system prompts
├── i18n/                    # i18n config + LocalizedLink
├── messages/                # Translation JSON files (en.json, es.json)
├── types/                   # TypeScript type definitions
├── data/                    # Static data (automations, verticals)
├── emails/                  # React Email templates
├── __tests__/               # Unit tests (Vitest)
└── assets/                  # Static images
```

## Architecture guidelines

- **Path alias**: `@/*` maps to `./src/*`
- **Routing**: All user-facing routes are under `src/app/[locale]/`
- **Components**: Page-specific components live in named folders (`Home/`, `Start/`, etc.); reusable primitives go in `ui/`
- **Translations**: All user-facing strings come from `src/messages/{locale}.json` via `useTranslations()`. Never hardcode display text
- **Server actions**: AI pipeline runs server-side in `src/lib/actions/`
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
- Use `BookCallButton` for any Calendly CTA links

## Environment variables

Required in `.env`:
```
NEXT_PUBLIC_BASE_URL        # App base URL
NEXT_PUBLIC_CLIENT_URL      # Client app URL
RESEND_API_KEY              # Resend email API key
GA_MEASUREMENT_ID           # Google Analytics 4
GOOGLE_API_KEY              # Google Generative AI
```

`NEXT_PUBLIC_*` vars are browser-exposed. Keep API keys server-only.

## Key patterns

- **AI pipeline**: `runUseCasePipeline()` in `src/lib/actions/use-case-pipeline.ts` orchestrates analysis and report generation via Google Gemini
- **Voice agent**: ElevenLabs integration managed by `CallContext` + `CallManager` components with a floating button (`AgentFloatButton`)
- **Form validation**: Zod schemas with react-hook-form via `@hookform/resolvers`
- **Dynamic routes**: `automations/[id]` and `verticals/[id]` use static data from `src/data/`

## CI/CD

- **GitHub Actions**: Runs lint, format, test, and build on pushes to `main` and PRs (`.github/workflows/ci.yml`)
- **Husky pre-commit**: Same pipeline runs locally before each commit
- **Vercel**: Hosted on Vercel; pushes to `main` trigger production deploys, PRs get preview URLs
- Production domain: `prozeso.com`
