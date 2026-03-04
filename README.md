# Forte AI Solutions

Marketing site for Forte AI Solutions. Built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion (LazyMotion)
- **Validation**: Zod
- **Rate Limiting**: Upstash Redis
- **Analytics**: Google Analytics + Vercel Analytics
- **Fonts**: Cormorant, IBM Plex Sans, IBM Plex Mono (self-hosted via next/font)

## Getting Started

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.local.example .env.local

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Site URL for canonical links and OG images |
| `NEXT_PUBLIC_GA_ID` | Google Analytics measurement ID |
| `UPSTASH_REDIS_REST_URL` | Upstash Redis URL for rate limiting |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash Redis auth token |

## Deployment

Deploy to Vercel:

```bash
npx vercel
```

The build script automatically generates `public/llms.txt` from `lib/constants.ts`.

## Project Structure

```
app/           — Pages, layouts, API routes
components/    — UI components, layout, sections
lib/           — Constants, utilities, hooks, metadata
types/         — TypeScript interfaces
scripts/       — Build-time scripts
public/        — Static assets
```

## Branching Strategy

- `main` — Production (deployed to Vercel)
- `dev` — Development branch
- All branches get Vercel preview deployments
