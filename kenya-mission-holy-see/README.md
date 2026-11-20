# Kenya Mission to the Holy See

Foundation for the official diplomatic institutional website of the Embassy of the Republic of Kenya to the Holy See.

## Status

Phase 1 establishes the application, routing, design-system, security, SEO and multilingual foundations. It does not contain approved institutional copy, official contact details, accredited mission details, national symbols or diplomatic events.

## Technology

- Next.js App Router
- React and strict TypeScript
- Tailwind CSS
- npm
- Vercel deployment configuration
- Supabase integration boundary reserved for a later CMS phase

## Phase 2 visual system

The homepage uses an institutional Kenya-led design system with shared spacing, typography, national-colour details, editorial layouts and reusable diplomatic sections.

Approved Coat of Arms, flag, ambassador portrait, President portrait and diplomatic photography are not recreated or substituted. They are documented asset slots until authorised source files and usage approvals are provided. See `docs/media-assets.md`.

## Prerequisites

- Node.js 20 or newer
- npm 10 or newer
- Git
- Optional: authorised Vercel and GitHub accounts

## Local installation

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`. The root redirects to `/en`.

## Environment

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | No locally | Authorised public domain used for metadata and sitemap generation |
| `NEXT_PUBLIC_DEFAULT_LOCALE` | No | Defaults to `en` |
| `NEXT_PUBLIC_SUPPORTED_LOCALES` | No | Configured locales: `en,it,sw` |

## Phase 3 content architecture

Institutional route content uses typed models in `src/types/content.ts` and approved/static content modules in `src/content/institutional.ts`. News and diplomatic engagement detail routes are prepared for CMS-backed records while remaining database-free.

Empty content collections intentionally do not generate fictitious articles, events or publications. Approved records can replace them without redesigning the routes.

## Phase 4 multilingual system

Interface dictionaries are stored in `src/i18n/dictionaries/en.json`, `it.json` and `sw.json`. Shared types and loading are in `src/i18n/types.ts` and `src/i18n/get-dictionary.ts`. Diplomatic terminology is maintained in `src/i18n/terminology.json`.

Run `npm run validate:i18n` to verify shared keys, empty values and unexpected or invalid locale entries. Locale-aware date and number helpers are in `src/lib/format.ts`.

Do not put secrets in `NEXT_PUBLIC_*` variables. No database credentials or fake Supabase configuration are included.

## Routes

Public content uses locale-prefixed URLs:

- `/en`, `/it`, `/sw`
- `/[locale]/about`
- `/[locale]/ambassador`
- `/[locale]/relations`
- `/[locale]/engagements`
- `/[locale]/kenya`
- `/[locale]/cooperation`
- `/[locale]/news`
- `/[locale]/events`
- `/[locale]/publications`
- `/[locale]/media`
- `/[locale]/contact`
- `/[locale]/privacy`
- `/[locale]/accessibility`

Locale configuration is in `src/config/locales.ts`. Navigation labels and editorial copy structures are in `src/lib/navigation.ts` and `src/i18n/messages.ts`.

## Architecture

- `src/app/[locale]`: locale-aware public routes
- `src/components/layout`: header, footer and content containers
- `src/components/navigation`: navigation and language switching
- `src/components/shared`: reusable pages, states, links and cards
- `src/i18n`: translation structure
- `src/config`: application configuration
- `src/content`: reserved for approved content
- `src/lib`: reusable server and application helpers
- `public/images`: approved image asset directories

Server Components are the default. The mobile menu is one isolated Client Component.

## Translation workflow

English is the default language. Italian and Kiswahili use the same route structure. Official diplomatic and institutional wording must be reviewed and approved before publication; this repository does not machine-translate or fabricate official statements.

## Components and design

Reuse the shared layout and content components rather than creating page-specific variants. Use restrained Kenya green, red and black accents. National or Holy See seals and logos must not be recreated or published without verified authority and approval.

## Validation

```bash
npm run typecheck
npm run lint
npm run check
npm run build
npm start
```

Route smoke testing can be performed against a running server:

```bash
for path in /en /it /sw /en/about /it/ambassador /sw/contact; do
  curl -I "http://localhost:3000${path}"
done
```

## Git workflow

Keep the main branch deployable. Use short feature branches, run `npm run check` and `npm run build`, and open pull requests for review.

The intended dedicated repository is `kenya-mission-holy-see`; the primary branch is `main`. This project must not be connected to unrelated repositories or existing deployments.

## Vercel deployment

Connect an authorised account to this independent repository, select the Next.js framework, set `NEXT_PUBLIC_SITE_URL` to the authorised public domain after it is confirmed, and isolate production and preview environments. Do not deploy while institutional approvals or the approved domain are unresolved.

## Security

- Strict TypeScript
- Security response headers
- No secrets in source or public environment variables
- External links use safe `rel` attributes
- No database, authentication or visitor analytics connection in Phase 1
- Administration and role-based access are deferred until the CMS phase

## Outstanding institutional approvals

- Authorised public domain
- Official branding assets and usage permissions
- Mission designation and accreditation details
- Approved physical address and contact details
- Ambassador identity and approved biography
- Approved leadership imagery
- Approved diplomatic relations, engagement and cooperation content
- Reviewed Italian and Kiswahili translations
