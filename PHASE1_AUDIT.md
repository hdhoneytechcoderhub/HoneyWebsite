# Phase 1 — Existing Project Audit and Migration Map

## Scope and findings

Audit target: the active workspace root (`Honey Tech Website/Honey Tech Website`). No frontend, Prisma, or backend source files were changed in Phase 1; this report is the only new artifact. The configured database was not queried, so the report describes the checked-in Prisma schema/migration, not verified production row counts or live schema state. Secrets were not inspected.

**Current stack:** Next.js 15 App Router, React 19, TypeScript, Prisma 6, PostgreSQL, and a Next.js server-side layer. There is no Spring Boot project in this workspace: no `backend/`, `pom.xml`, Gradle build, Java sources, or backend tests. A separate directory at `C:/Users/dhava/Downloads/Honey Tech Website/backend` contains only a small Spring Boot health-check starter; it is outside the active checkout and was not modified or treated as the migration backend.

## 1. Current project architecture

- `app/` contains the public App Router pages, admin pages, API route handlers, root metadata, sitemap, and robots configuration.
- `components/` contains shared public, form, portfolio/career, and admin UI. Styles and responsive behavior are in `app/site.css` and `app/globals.css`.
- `lib/` contains Prisma access, public content reads/fallback behavior, form validation/writes, session/rate-limit security, CMS field definitions, and hard-coded preview content.
- `prisma/schema.prisma`, `prisma/migrations/20261005000000_init/migration.sql`, and `prisma/seed.ts` define the current PostgreSQL model, initial DDL, and starter records.
- `public/images/` contains the local brand marks/wordmark/reference image. No file-backed media store or working upload API was found in the active workspace.
- `package.json` has Next build/lint/typecheck/Vitest and Prisma scripts. `tests/` exists but contains no test files. No build or migration was run for this read-only audit.

## 2. Existing frontend pages

### Public route templates

- `/` — homepage (`app/(site)/page.tsx`)
- `/about`
- `/services` and `/services/[slug]`
- `/industries` and `/industries/[slug]`
- `/work` and `/work/[slug]`
- `/resources` and `/resources/[slug]`
- `/careers` and `/careers/[slug]`
- `/contact`
- `/book-strategy-call`
- `/privacy-policy` and `/terms`

The shared public layout is `app/(site)/layout.tsx`; the shared header/footer are `components/site-header.tsx` and `components/site-footer.tsx`. Existing visual styling, mobile behavior, and page sections should remain the UI source of truth; integration work should replace data/submission plumbing, not markup/design wholesale.

### Admin route templates

- `/admin` dashboard
- `/admin/login`
- `/admin/about`
- `/admin/inbox`
- `/admin/settings`
- `/admin/[section]` generic content manager

There is an admin navigation link for Media, but no corresponding admin media page or functioning media route was found in this checkout.

## 3. Existing backend and server-side functionality

### Database reads and writes

- `lib/db.ts` creates a Prisma client for server use.
- `lib/content.ts` reads homepage, settings, services, industries, projects, articles, jobs, legal pages, footer and sitemap data. Some reads fall back to `lib/demo-content.ts` when the database is unavailable.
- `lib/forms.ts` validates and persists enquiries and strategy-call requests to PostgreSQL, with database-backed rate limiting.
- Admin dashboard and server-rendered admin pages query Prisma directly; they will also need migration to APIs, not just the browser clients.
- `prisma/seed.ts` creates content/settings and explicitly marked sample/demo records. It is not production data and must not be treated as real content.

### Current Next.js API routes

- `POST /api/admin/login`, `POST /api/admin/logout`
- `GET/POST/PATCH/DELETE /api/admin/content` for a generic subset of CMS resources
- `GET/PUT /api/admin/about`
- `GET/PATCH /api/admin/settings`
- `GET/PATCH /api/admin/submissions`
- `POST /api/forms` for enquiry/strategy submissions
- `POST /api/forms/apply` for job applications
- `GET /api/resume` for an authenticated resume download

These are Next.js route handlers backed directly by Prisma, not Spring REST APIs. No API route currently provides the requested public content REST catalog or dashboard stats endpoint.

### Authentication and security today

- Admin login checks an email and `bcryptjs` password hash.
- `lib/security.ts` issues a random opaque, seven-day, HttpOnly cookie; only a SHA-256 token hash is stored in `AdminSession`.
- Login and submission throttles use the PostgreSQL `RateLimit` model.
- The current schema has no user role field; current admin authorization is a single admin/not-admin check, with no `SUPER_ADMIN`/`ADMIN`/`EDITOR` RBAC.
- Admin mutations have varying same-origin checks; there is no current JWT access/refresh flow or Spring Security filter chain.

## 4. Current Prisma/PostgreSQL models and target mapping

All 19 Prisma models should be represented by JPA entities/repositories/services where they remain in scope. The safest compatibility baseline is to preserve existing IDs, table/column names, enum values, JSONB and foreign-key semantics; map explicitly with `@Table`/`@Column` rather than casually renaming existing tables.

| Existing Prisma model/table | Existing purpose and target mapping |
| --- | --- |
| `AdminUser` | Admin identity and BCrypt hash → `AdminUser` JPA entity/repository; add roles through a reviewed, additive migration. |
| `AdminSession` | Hashed opaque cookie sessions → preserve for transition/expiry; implement refresh-token persistence/revocation deliberately rather than assuming existing sessions are JWTs. |
| `SiteSetting` | Key/value JSONB settings → `SiteSetting`; public/admin settings services. |
| `HomepageSection` | Ordered/visible section plus JSONB content → `HomepageSection`; homepage CMS/public home endpoint. |
| `Service` | Unique slug, copy, images, JSONB benefits/deliverables/process/FAQs, status/order/SEO → `Service`; public and admin services APIs. |
| `Industry` | Slug, content/image, JSONB challenges/solutions/service slugs, status/order/SEO → `Industry`; public and admin industries APIs. |
| `ProjectCategory` | Unique category slug/name → `ProjectCategory`; project category APIs. |
| `Project` | Case-study copy, JSONB lists/gallery/results, image, demo/verified flags, SEO/status/order → `Project`; public/admin projects APIs. Preserve `_ProjectToProjectCategory` many-to-many relation. |
| `Testimonial` | Quote/identity/avatar/demo flag/status/order → `Testimonial`; homepage/admin CMS. |
| `ProcessStep` | Ordered visible process content → `ProcessStep`; homepage/admin CMS. |
| `ArticleCategory` | Unique resource category → `ArticleCategory`; public/admin category APIs. |
| `Article` | Article body/image, category FK, SEO/status/published date → `Article`; public/admin resources APIs. |
| `JobOpening` | Role, requirements JSONB, SEO/status/order → `JobOpening`; public/admin careers APIs. Current `PublishStatus` is the active/draft signal. |
| `Enquiry` | Contact submission, current enquiry status, notes, timestamps → `Enquiry`; public POST and protected admin list/detail/update/delete APIs. |
| `StrategyCallRequest` | Preferred date/time/timezone, current shared submission status and notes → `StrategyCallRequest`; public POST and protected admin APIs. Target strategy statuses differ from the current enum and need an additive, data-preserving plan. |
| `JobApplication` | Candidate/role fields, optional job FK, resume metadata and current `resumeData BYTEA` → `JobApplication`; protected admin APIs. Move file bytes to secure object storage in the later upload phase; preserve metadata and existing files during migration. |
| `MediaAsset` | File metadata and private flag → `MediaAsset`; admin media APIs/storage integration. A working media upload implementation was not found. |
| `LegalPage` | Slug/body/status/SEO/updated date → `LegalPage`; public legal and admin CMS APIs. |
| `RateLimit` | Key/count/window → `RateLimit` or a separately reviewed rate-limit implementation; preserve effective throttling during cutover. |

Existing enums: `PublishStatus` = `DRAFT`/`PUBLISHED`; `EnquiryStatus` = `NEW`/`CONTACTED`/`IN_PROGRESS`/`CLOSED`; `SubmissionStatus` = `NEW`/`REVIEWED`/`ARCHIVED`. The latter is shared by applications and strategy calls today, and does not cover the requested strategy workflow. Do not silently rewrite enum values or status records.

## 5. Existing admin modules

- Dashboard: counts total records for services, industries, projects, testimonials, articles, jobs, enquiries, strategy calls, applications and media. Counts are real DB counts, but no requested filtered stats endpoint exists.
- Homepage sections: generic manager for title/eyebrow/body/visible/order; section JSON content is stored.
- About page: specialized JSON editor with draft/publish behavior, section ordering/visibility, shared statistics and SEO fields.
- Generic content manager: services, industries, projects, testimonials, process steps, articles, careers/job openings, legal pages.
- Inbox: enquiries, strategy requests, and applications; status and notes updates; resume download for applications.
- Site settings: brand summary, contact details, WhatsApp, social links, video URL and hero stats.
- Gaps: no role/permission management, no first-class project/article category manager, no strategy-call scheduling status set requested, no admin media screen/upload API, no dashboard stats API, and generic project CRUD does not provide a dedicated category-management workflow.

## 6. Existing forms and uploads

- Contact page (`components/contact-page.tsx`) currently validates locally and explicitly reports that it does not transmit or save entries. It does not call the server action or `/api/forms`.
- Shared generic `components/forms.tsx` (used for enquiry sections and strategy calls) validates and reports a local-only demo success. It does not call the server action or `/api/forms`.
- `app/actions.ts` server actions call `lib/forms.ts`, which can persist enquiries and strategy calls, but no current UI use of those actions was found.
- `POST /api/forms` can also persist those two forms, but the current form UI does not call it.
- Careers uses hard-coded sample roles from `lib/careers-content.ts`; role detail lookup is local. `components/career-application.tsx` only validates in the browser and does not upload or submit.
- Separately, `POST /api/forms/apply` can persist applications and stores uploaded resume bytes in PostgreSQL `BYTEA`; it accepts PDF/DOC/DOCX by declared MIME and a 5 MB limit. `GET /api/resume` checks admin session and downloads private data. This is not the requested external secure file storage, and declared MIME alone is not content-signature validation.
- `.env.example` includes an optional Vercel Blob token, but no implemented blob upload flow was found. Do not claim resumes/media are already in object storage.

## 7. SEO and discoverability

- Root metadata (canonical base, OpenGraph, Twitter, robots defaults) lives in `app/layout.tsx`.
- Several dynamic service, industry, project and article pages call `generateMetadata`; careers metadata is currently derived from the local hard-coded role list rather than PostgreSQL.
- `app/sitemap.ts` lists static routes plus service/industry/project/job/article slugs returned by `lib/content.ts`; public DB fallback can substitute demo data.
- `app/robots.ts` disallows `/admin`, `/api` and `/resume` and references the sitemap.
- Preserve these Next.js mechanisms. Later data migration should feed existing dynamic metadata and sitemap functions from the Spring API, retaining canonical paths and published-only visibility.

## 8. What is complete versus what still requires migration

**Already present:** the full Next.js UI/page structure; PostgreSQL Prisma schema and initial migration; seed script; some Prisma-backed public CMS reads; admin login/session and content handlers; database writes for enquiry/strategy via server-side paths; a separate application API and private resume download; a CMS UI for several record types.

**Not yet complete end-to-end:** Spring Boot REST backend; Flyway compatibility with the existing database; JWT/refresh/role-based authentication; public content APIs; real contact/strategy/career form wiring from the visible UI; public dynamic careers from PostgreSQL; secure external resume/media storage; full category CRUD; requested status models; homepage/site settings APIs; dashboard statistics API; frontend API client; removal of direct Next/Prisma database access; automated frontend/backend tests.

**Important current data-source caveat:** the public services catalogue, industry list, careers roles, and work sample filter/dialog have hard-coded illustrative content. Other content loaders use demo fallback data if PostgreSQL is unavailable. A real Spring API integration must switch these data sources carefully and present honest loading/empty/error states; do not preserve fake fallback as if it were live backend data.

## 9. Migration map: existing functionality → Spring endpoints/services

| Existing feature / source | Target Spring API and service/entity |
| --- | --- |
| `lib/content.ts: homepageData`, homepage section/settings/project/service/article reads | `GET /api/public/home` → `HomeController`/`HomeService`, using `HomepageSection`, `SiteSetting`, `Service`, `Industry`, `Project`, `ProcessStep`, `Testimonial`, `Article`. |
| Service catalogue/detail (`components/services-page.tsx`, service slug page, `Service`) | `GET /api/public/services`, `GET /api/public/services/{slug}` → `ServiceController`/`ServiceService`/`ServiceRepository`; admin CRUD under `/api/admin/services`. |
| Industry listing/detail and `Industry` | `GET /api/public/industries[/{slug}]` → `IndustryController`/`IndustryService`; protected admin CRUD. |
| Work portfolio and `Project`/`ProjectCategory` | `GET /api/public/projects[/{slug}]`, category listing → `ProjectController`/`ProjectService`; protected project and category CRUD; preserve join table. Keep hand-authored sample concepts clearly distinct if they remain part of the design. |
| Resources list/detail/category and `Article`/`ArticleCategory` | `GET /api/public/articles`, `GET /api/public/articles/{slug}`, `GET /api/public/article-categories` → article/category controllers and services; admin CRUD. |
| Careers list/detail and `JobOpening` | `GET /api/public/jobs[/{slug}]` → `JobController`/`JobService`; admin job CRUD. Replace local role source only after API and page states are verified. |
| Contact form / `Enquiry` | `POST /api/public/enquiries`; protected admin list/detail/patch/delete → `EnquiryController`/`EnquiryService`/`EnquiryRepository`. |
| Strategy form / `StrategyCallRequest` | `POST /api/public/strategy-calls`; protected admin list/detail/patch → `StrategyCallController`/`StrategyCallService`. Introduce requested statuses compatibly. |
| Career application / `JobApplication` and resume data | `POST /api/public/jobs/{jobId}/applications` plus protected admin application APIs → `JobApplicationService`; store metadata in PostgreSQL and bytes in chosen private object storage. |
| `lib/security.ts`, admin login/logout, `AdminUser`/`AdminSession` | `/api/auth/login|refresh|logout|me` → `AuthController`/`AuthService`, Spring Security, BCrypt, JWT/refresh persistence and role authorization. Keep existing UI routes and cookies/token handling compatible through a deliberate transition. |
| Generic CMS + About editor, `HomepageSection`, settings, content models | protected `/api/admin/**` controllers/services/repositories; homepage/settings/about CRUD must preserve the existing draft/publish and JSON content semantics. |
| `app/admin/page.tsx` Prisma counts | `GET /api/admin/dashboard/stats` → `DashboardController`/`DashboardService`, real DB counts only. |
| Resume/media routes, `MediaAsset` | protected admin media/upload/download APIs and storage service; validate extension, MIME, signature, size and access; no large file bytes in PostgreSQL. |
| `app/sitemap.ts`, `robots.ts`, `generateMetadata()` callers | retain Next.js output and paths; use API-backed published content and SEO fields for dynamic slugs. |

## 10. Files/modules likely to change later (not changed in Phase 1)

### Existing frontend integration points

- Data/server access: `lib/content.ts`, `lib/db.ts`, `lib/public-db.ts`, `lib/forms.ts`, `lib/security.ts`, `lib/validation.ts`, `app/actions.ts`, `prisma/seed.ts`, and the corresponding `app/api/**` handlers.
- UI data clients: `components/contact-page.tsx`, `components/forms.tsx`, `components/career-application.tsx`, `components/career-jobs.tsx`, `components/services-page.tsx`, `components/admin-content-manager.tsx`, `components/admin-about-editor.tsx`, `components/admin-inbox.tsx`, `components/admin-settings-form.tsx`; admin dashboard and dynamic public page loaders/metadata/sitemap may also need small data-fetching edits.
- Configuration/dependency cleanup is late-stage only: `package.json`, lockfile, environment template, and README. Prisma must remain until each read/write path is migrated and verified.

### New backend modules planned under `backend/`

- Build/config: `pom.xml`; `src/main/resources/application.yml`, `application-dev.yml`, `application-prod.yml`; `src/main/resources/db/migration/V*.sql`.
- Java packages: `com.honeytech.config`, `controller`, `service`, `repository`, `entity`, `dto`, `mapper`, `security`, `exception`, and `validation`.
- Controllers/services grouped by auth, public home/content, enquiries, strategy calls, careers/applications, admin CMS, dashboard, and media. Entities/repositories follow the existing Prisma model map above. Add JUnit/Mockito/MockMvc and PostgreSQL integration tests before switching a frontend feature.

## 11. Migration risks and safeguards

1. The actual live PostgreSQL schema, row counts, database ownership, and deployed Prisma migration state were not inspected. Before any Flyway or JPA schema change, inventory the target database and take a verified backup; never reset, drop, or auto-recreate production tables.
2. The checked-in initial DDL uses quoted PascalCase table names, quoted camelCase columns, PostgreSQL enums, JSONB, CUID-like text IDs, a many-to-many join table, and a resume `BYTEA`. Mapping these to newly named/default-lowercase Hibernate tables would silently break compatibility.
3. Flyway must be introduced with a plan appropriate to the existing schema (existing database baseline versus a clean database). Do not run an initial create-all migration blindly against an existing installation; keep Hibernate in validation mode, not production schema-generation mode.
4. Existing database records may contain demo/seed content as well as real submissions. Audit/label records and preserve IDs/content/status; do not overwrite or reseed production during migration.
5. Current UI demo behavior and backend writes are disconnected for key forms. Verify API persistence before replacing the visible local success states.
6. JWT migration changes the admin authentication boundary. Define short-lived access token, refresh rotation/revocation, secure cookie/storage and role mapping before switching admin clients; do not treat current random sessions as JWTs.
7. Resume storage migration needs a non-destructive copy/verification/retention plan and a private storage provider. Keep the current authenticated download available until copied files and authorization are verified.

## Phase 1 exit

Architecture, page/admin inventory, server-side features, Prisma model inventory, forms/uploads, SEO and migration touchpoints are recorded here. No UI or backend implementation was started. The next authorized roadmap step is Phase 2: create the separate Spring Boot project and configuration; database/Flyway changes and feature-by-feature API cutover follow only after that backend can be built and tested.
