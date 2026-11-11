# Vercel Deployment Audit — Honey Media House

Audit date: 5 November 2026
Project root: `Honey Tech Website/Honey Tech Website`
Runtime used for verification: Node v24.13.1, npm 11.8.0, Next.js 15.5.29, Prisma 6.19.3

---

## 0. Scope correction

The brief described a **React + Vite + TypeScript** frontend with a **Java 21 / Spring Boot / JWT / Flyway** backend and a multi-tenant, organization-scoped CRM.

That architecture is **not in this repository**. This checkout is:

| Area | Actually present |
| --- | --- |
| Frontend | Next.js 15.5 App Router (`app/`), React 19, Tailwind 4 |
| Server | Next.js route handlers (`app/api/**`) — no separate API service |
| Database | PostgreSQL through Prisma 6 (`prisma/schema.prisma`, `prisma/migrations/20261005000000_init`) |
| Auth | Opaque HttpOnly cookie sessions hashed in `AdminSession` (no JWT, no refresh tokens) |
| Absent | `vite.config.*`, `dist/`, `pom.xml`, Java sources, `application.yml`, Flyway, any CRM/organization code |

This report audits the code that exists. Vite/Spring-specific items from the brief are listed in §7 as not applicable rather than faked.

**No Vercel build log was available in this environment** — there is no Vercel CLI, token, or log file in the project, and the deployment dashboard was not reachable. Findings are split into *verified here* and *environment-side configuration only you can confirm*. §9 lists exactly what remains unproven.

---

## 1. Verification performed

All commands run in the project root.

| Check | Command | Result |
| --- | --- | --- |
| Clean install | `npm install` | **pass**, exit 0, 451 packages, no `EBADENGINE` warning |
| TypeScript | `npx tsc --noEmit` | **pass**, exit 0 |
| Prisma client | `npx prisma generate` | **pass** |
| Production build | `npm run build` | **pass**, exit 0, 28 routes, `.next` generated |
| Production server | `npx next start` | starts cleanly |
| Public pages (12) | `curl` | all **200** (see §5) |
| Dynamic detail page | `/services/digital-marketing` | **200**, 50 033 bytes |
| Protected route | `/admin` | **307 → /admin/login** |
| Admin API without session | `/api/admin/content`, `/api/resume` | **401** |
| Public API | `/api/public/settings` | **200**, 594 bytes |
| Form POST, invalid payload | `/api/forms` | **422** (validation working) |
| Form POST, valid payload | `/api/forms` | **500** — no database (see §2.2) |
| Form POST, foreign Origin | `/api/forms` | **403** (blocked, correct) |
| sitemap / robots | `curl` | **200** |
| Dependency audit | `npm audit --omit=dev` | critical advisory resolved; 11 remaining (1 low, 3 moderate, 7 high) — §2.9 |

---

## 2. Root causes found

### 2.1 Same-origin guard rejected legitimate browser requests — **verified, fixed**

**File:** `lib/validation.ts` (`isSameOriginRequest`)

**Evidence (production build, `next start`):**

```
Origin: http://127.0.0.1:3078  -> 403 {"message":"Cross-origin requests are not allowed."}
Origin: http://localhost:3078  -> reached the handler
Origin: https://evil.example   -> 403
```

**Root cause:** the guard compared the browser `Origin` header against `new URL(request.url).origin`. Next.js reconstructs that URL server-side and its host does not always match the host the browser used. Behind a proxy, a Vercel preview URL, or a `www`/apex split, a genuine same-site request is rejected.

**Impact:** every non-GET endpoint using this guard returns 403 depending on how the host is presented — contact form, strategy-call form, job application, and all admin mutations (`/api/admin/content`, `/api/admin/settings`, `/api/admin/about`). This is the classic failure that works locally and breaks after deployment.

**Fix:** match the host the request actually arrived on (`x-forwarded-host`, falling back to `host`, with `x-forwarded-proto`), keeping the old comparison as a fallback. Foreign origins still return 403 (re-verified after the fix).

Duplicated copies of the same helper in `app/api/admin/settings/route.ts` and `app/api/admin/content/route.ts` now import the fixed shared function.

### 2.2 `DATABASE_URL` is missing — **verified, action required**

**Evidence:** `@next/env` loads `SESSION_SECRET`, `NEXT_PUBLIC_*`, `BLOB_*`, `EMAIL_*` from `.env`, but **not** `DATABASE_URL`; the variable is absent from the file. During `next build` and at runtime the server logs:

```
Invalid `prisma.siteSetting.findMany()` invocation:
error: Environment variable not found: DATABASE_URL.
--> schema.prisma:7  url = env("DATABASE_URL")
```

26 occurrences were logged while serving the production build.

**Why the build still passes:** `lib/public-db.ts` swallows connection-initialization failures and `lib/content.ts` substitutes `lib/demo-content.ts`. The site renders — with demo content.

**Impact:** deployed this way, the site serves fallback demo content, `POST /api/admin/login` returns a bare **500**, and form submissions return **500** (verified with a fully valid payload).

**Not fixed by me** — the connection string is yours; I will not invent one. See §4.

### 2.3 `NEXT_PUBLIC_SITE_URL` points at a local dev port — **verified, action required**

**Evidence:** `/sitemap.xml` from the production build emits:

```
http://127.0.0.1:3050
http://127.0.0.1:3050/about
http://127.0.0.1:3050/services/digital-marketing
```

and `POST /api/admin/logout` redirects to `http://127.0.0.1:3050/admin/login`.

**Impact:** this value feeds `app/layout.tsx` (metadata base, canonical, OpenGraph), `app/sitemap.ts`, `app/robots.ts`, the About page canonical, and the logout redirect. Copied into Vercel, it publishes localhost URLs to search engines and breaks logout.

### 2.4 Build command omitted `prisma generate` — **preventive, fixed**

`README.md` documents `npm run build` as "prisma generate then next build"; `package.json` ran only `next build`, leaving client generation to `@prisma/client`'s postinstall hook. The build command now matches the documented behaviour. Not reproduced as a Vercel failure — treat as hardening.

### 2.5 Node version was unpinned — **fixed**

No `engines` field, so Vercel applied its own default and could change it under you. Now `"node": "24.x"`, which is a Vercel-supported version (their docs list 26.x default, 24.x, 22.x) and matches the Node 24 the project is developed on — `npm install` is warning-free.

### 2.6 Build root misdetection — **verified warning, fixed**

Every build printed:

```
Next.js inferred your workspace root, but it may not be correct.
We detected multiple lockfiles and selected C:\Users\dhava as the root directory.
```

A stray `package-lock.json` in your home directory made Next trace from `C:\Users\dhava` instead of the project. `outputFileTracingRoot: process.cwd()` pins it; the warning is gone from the build log. (You may also want to delete that stray lockfile — it is outside this project, so I did not touch it.)

### 2.7 No Vercel project configuration — **fixed**

Created `vercel.json` with an explicit framework and build/install commands.

**Deliberately no `rewrites`.** The SPA fallback from the brief (`/(.*)` → `/index.html`) belongs to Vite/React Router. This app uses the App Router with server components and route handlers; such a rewrite would break every page and API endpoint on Vercel. Next.js on Vercel needs no rewrite for client-side navigation.

### 2.8 CMS edits do not reach prerendered pages — **verified, deliberately unchanged**

`/`, `/about`, `/work`, `/careers`, `/terms`, `/privacy-policy` are statically prerendered from the database, so their HTML is frozen at build time.

Only `app/api/admin/about/route.ts` calls `revalidatePath` (for `/about` and `/`). `app/api/admin/settings/route.ts` and `app/api/admin/content/route.ts` do not. Editing site settings, jobs, projects or legal pages in the admin therefore saves successfully and **never appears on the live site until the next deployment**. `next dev` re-renders everything, which is why this is invisible locally.

Dynamic detail routes (`/services/[slug]`, `/industries/[slug]`, `/work/[slug]`, `/careers/[slug]`, `/resources`) are server-rendered per request and unaffected.

Left unchanged because it alters rendering/caching behaviour beyond the deployment fix. Remedy: a `revalidatePath` call for the affected public paths after a successful admin mutation, matching the About route's existing pattern.

### 2.9 Critical Next.js security advisory — **fixed**

Installed `next@15.5.27` was inside the advisory range for **unauthenticated Remote Code Execution in the Image Optimization API when SVG files are used** (`GHSA-2464-fhr4-w9xw`, range `<=15.5.27`), plus a high-severity Server Actions denial of service (`GHSA-p3m5-59mp-jv5r`, range `<=15.5.27`).

Upgraded to **15.5.29**, the patched release inside your existing `^15.5.4` range. Rebuilt and re-ran the production checks afterwards — all pass.

Remaining production advisories (none critical): `postcss` bundled inside Next (fixed only by Next 16, a breaking major), `prisma`/`@prisma/config` → `deepmerge-ts` (fixed only by Prisma 7 major), `@vercel/blob` → `@fastify/busboy`/`undici` (fixed only by Blob 2.x major), and `zod`/`sanitize-html` patches. I did not force any major upgrade — those are product decisions, not deployment blockers.

---

## 3. Vercel project settings

| Setting | Value |
| --- | --- |
| Framework preset | **Next.js** (pinned in `vercel.json`) |
| Root directory | The folder containing `package.json` — `Honey Tech Website/Honey Tech Website` if you upload the parent |
| Build command | `npm run build` → `prisma generate && next build` |
| Install command | `npm install` |
| Output directory | **Leave empty** — setting `dist` breaks a Next.js deploy |
| Node.js version | 24.x (from `engines`) |

---

## 4. Environment variables required on Vercel

| Variable | Required | Used by |
| --- | --- | --- |
| `DATABASE_URL` | **Yes** | Prisma at runtime **and during `next build`** (pages are prerendered). Server-side only — never `NEXT_PUBLIC_`. |
| `NEXT_PUBLIC_SITE_URL` | **Yes** | Canonical/OG metadata, sitemap, robots, logout redirect. Real production origin, no trailing slash. |
| `SESSION_SECRET` | Documented, currently unused | No code reads it; `lib/security.ts` hashes a random opaque token stored in `AdminSession`. Keep it set for future use; not a blocker. |
| `BLOB_READ_WRITE_TOKEN` | Optional | Vercel Blob uploads (`@vercel/blob` installed). |
| `EMAIL_FROM`, `EMAIL_PROVIDER_API_KEY` | Optional | Reserved; no delivery code exists. |

`.env` is gitignored; `.env.example` holds placeholders only. No secret reaches the browser: there are no `NEXT_PUBLIC_*` secrets and `DATABASE_URL` is read only in server code (`lib/db.ts`).

Use a **pooled** connection string on Vercel — serverless instances each open their own connection and a direct URL will exhaust `max_connections`.

---

## 5. Functional test results (actually executed)

Production build served with `next start`:

| Route | Status | Bytes |
| --- | --- | --- |
| `/` | 200 | 113 688 |
| `/about` | 200 | 59 241 |
| `/services` | 200 | 54 917 |
| `/industries` | 200 | 77 463 |
| `/work` | 200 | 87 520 |
| `/careers` | 200 | 76 835 |
| `/contact` | 200 | 44 076 |
| `/book-strategy-call` | 200 | 24 751 |
| `/resources` | 200 | 31 732 |
| `/privacy-policy` | 200 | 21 883 |
| `/terms` | 200 | 21 637 |
| `/admin/login` | 200 | 9 764 |
| `/services/digital-marketing` | 200 | 50 033 |
| `/sitemap.xml` | 200 | 4 391 |
| `/robots.txt` | 200 | 145 |
| `/admin` | 307 → `/admin/login` | — |
| `/api/public/settings` | 200 | 594 |
| `/api/admin/content` (no session) | 401 | — |
| `/api/resume` (no session) | 401 | — |
| `/api/forms` invalid payload | 422 | — |
| `/api/forms` valid payload | 500 (no DB) | — |
| `/api/forms` foreign Origin | 403 | — |

**Working and verified:** routing, SPA-style client navigation, page refresh on server-rendered routes, 404 handling, protected-route redirect, admin API authorization, CSRF-style origin guard (both directions), form request validation, SEO endpoints, production compilation.

**Not verified, and not claimed:** login with real credentials, dashboard, form persistence, CMS reads/writes against a database, logout round-trip, and anything requiring `DATABASE_URL`. Registration, organization switching, JWT and refresh tokens **do not exist** in this codebase.

---

## 6. Files changed

| File | Change |
| --- | --- |
| `lib/validation.ts` | `isSameOriginRequest` trusts `x-forwarded-host`/`host` (+proto) before falling back to `request.url` |
| `app/api/admin/settings/route.ts` | Uses the shared same-origin helper |
| `app/api/admin/content/route.ts` | Uses the shared same-origin helper (POST/PATCH/DELETE) |
| `package.json` | `build` → `prisma generate && next build`; `engines.node` → `24.x`; `next` → `^15.5.29` |
| `package-lock.json` | Updated by install (Next 15.5.29) |
| `next.config.ts` | Added `outputFileTracingRoot: process.cwd()` |
| `vercel.json` | **New** — framework/build/install configuration, no rewrites |
| `.env.example` | Documented that `DATABASE_URL` is needed at build time and that a pooled URL is preferred |
| `VERCEL_DEPLOYMENT_AUDIT.md` | This report |

No component, page, API contract, Prisma model, migration or business rule was removed or rewritten.

---

## 7. Items from the brief that do not apply

- `vite.config.ts`, `dist` output, Vite build settings — not a Vite project.
- React Router SPA fallback — not a React Router SPA; the rewrite would break App Router routes.
- `VITE_API_BASE_URL` / Spring API base URL — there is no separate backend; data access lives in Next.js server code. No `localhost` API URL exists to replace.
- Spring Boot, JWT access/refresh tokens, Spring Security CORS, organization-scoped requests, Flyway — none exist here.
- CORS — same-origin only; the origin guard in §2.1 is the equivalent control.

---

## 8. Deployment steps

1. **Set Vercel environment variables** (Production *and* Preview): `DATABASE_URL` (pooled), `NEXT_PUBLIC_SITE_URL=https://your-domain`, optionally `BLOB_READ_WRITE_TOKEN`. Do **not** copy the local `.env` — it has no `DATABASE_URL` and its site URL is a dev port.
2. **Ensure the database is reachable from Vercel** (a `localhost` URL cannot resolve there; the site would silently deploy with demo content).
3. **Apply the schema once**, non-destructively:
   ```bash
   DATABASE_URL="postgresql://…" npm run db:deploy
   ```
4. **Seed** if the database is new: `npm run db:seed`
5. **Create an admin**: `npm run admin:create`
6. **Deploy.** Root directory = folder with `package.json`; output directory empty.
7. **Verify after deploy:** `/` shows real content (not demo copy), `/admin/login` accepts credentials, a contact submission appears in `/admin/inbox`, `/sitemap.xml` shows the production domain, logout returns to `https://your-domain/admin/login`.

---

## 9. What remains unverified

- **Your specific Vercel failure.** No logs were available. Mapping to the likely message: `Environment variable not found: DATABASE_URL` → §2.2; `@prisma/client did not initialize yet` → §2.4; "No Next.js version detected" or 404s after a green build → Root/Output Directory settings (§3). Paste the log and I will confirm which.
- **Database connectivity, login, persistence, migrations** — awaiting a staging `DATABASE_URL` (§2.2). No database was reachable during this audit.
- **Deployment itself** — nothing was deployed, so no success is claimed.
