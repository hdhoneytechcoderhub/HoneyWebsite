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

## Runtime database fallback

The public marketing pages use local illustrative content if Prisma cannot initialize its PostgreSQL connection (for example, invalid credentials or an offline server). A single generic warning is logged server-side; query/programming errors still surface, and admin/data writes are never reported as successful or silently redirected into demo storage. Correct `DATABASE_URL` and run the existing Prisma migration/seed steps to restore CMS data. The current admin CMS and form writes still require a healthy database.

## Spring Boot + PostgreSQL backend roadmap

The optional Java API lives separately at [`backend/`](backend/README.md); it does not replace Prisma or become the owner of the existing schema by default. Follow the roadmap before routing production traffic:

1. **Bring up the isolated backend first:** choose the Java/Spring versions supported by the target host, provide a separate `SPRING_DATASOURCE_*` connection, and run the backend health/integration checks against a disposable PostgreSQL database.
2. **Inventory and back up:** compare the Prisma schema/migrations and actual database objects/data; keep Prisma as the only schema and write owner for current application tables during initial development.
3. **Define ownership boundaries:** if Spring needs persistence before a domain is migrated, isolate its new tables/schema and restrict its database role to that area. Do not let Prisma and Flyway migrate or write the same tables concurrently.
4. **Move one domain at a time:** publish versioned Flyway migrations, validate JPA with `ddl-auto=validate`, and transfer a domain only after a reviewed baseline, backfill/reconciliation plan, compatibility window, and tested rollback are ready.
5. **Connect Next.js deliberately:** add a server-side API client only after the Spring endpoint contract and auth are ready; test signed-out/admin access, errors, and data parity before switching reads, then switch writes and retire Prisma access only after stable cutover.

The backend starter at [`backend/`](backend/README.md) implements only a PostgreSQL `SELECT 1` health route; it has no existing-site models, migrations, or production table writes. Java/JDK availability and valid external PostgreSQL credentials must be verified on the target machine before it can be run against a live database.

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
