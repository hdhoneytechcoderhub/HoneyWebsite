# Honey Media House

Next.js 15 (App Router) marketing site with an admin area, backed by PostgreSQL via Prisma.

## Requirements

- Node.js 20+ (developed on 24)
- A PostgreSQL 14+ server (local install, Docker, or a managed provider)

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create your local environment file from the template and fill in real values:

   ```bash
   cp .env.example .env
   ```

3. Set `DATABASE_URL` in `.env` to a PostgreSQL connection string for a database you own:

   ```
   DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/honey_media_house?schema=public"
   ```

   `DATABASE_URL` is consumed only by the Next.js server and the Prisma CLI. It is server-side
   only — never expose it as `NEXT_PUBLIC_DATABASE_URL`.

4. Create the database (once) if it does not exist, then apply the committed migrations:

   ```bash
   npm run db:deploy      # prisma migrate deploy — non-destructive
   ```

5. Seed starter content (safe to re-run; uses upserts and skips/updates demo rows):

   ```bash
   npm run db:seed
   ```

6. Start the development server:

   ```bash
   npm run dev
   ```

   Open http://localhost:3000.

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `DATABASE_URL` | Yes | PostgreSQL connection string used by Prisma (server-side only). |
| `SESSION_SECRET` | Yes (admin) | 32+ char random secret for admin sessions. `openssl rand -base64 32`. |
| `NEXT_PUBLIC_SITE_URL` | Yes | Canonical public origin, no trailing slash. |
| `NEXT_PUBLIC_STORY_VIDEO_URL` | No | Optional story video URL. |
| `BLOB_READ_WRITE_TOKEN` | No | Vercel Blob storage for uploads. |
| `EMAIL_FROM` / `EMAIL_PROVIDER_API_KEY` | No | Reserved for notification email delivery. |

## Useful scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the Next.js dev server. |
| `npm run build` | `prisma generate` then `next build`. |
| `npm run typecheck` | TypeScript check. |
| `npm run lint` | ESLint. |
| `npm run db:generate` | Regenerate the Prisma client. |
| `npm run db:migrate` | Create/apply migrations in development. |
| `npm run db:deploy` | Apply committed migrations (production/CI). |
| `npm run db:seed` | Seed starter content. |
| `npm run admin:create` | Create or update an admin account. |
