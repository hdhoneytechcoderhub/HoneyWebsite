import { db } from "@/lib/db";
import { PublishStatus } from "@prisma/client";
import { DEFAULT_ABOUT_CONTENT, parseAboutContent } from "@/lib/about-page";
import {
  demoAboutContent, demoArticles, demoIndustries, demoJobs, demoLegalPages, demoProcessSteps,
  demoProjects, demoServices, demoSettings, demoTestimonials, homepageSections,
} from "@/lib/demo-content";
import { withPublicDatabaseFallback } from "@/lib/public-db";

export const publicWhere = { status: PublishStatus.PUBLISHED } as const;
const settingsFallback = demoSettings as unknown as Record<string, unknown>;
const homepageFallback = {
  settings: settingsFallback, sections: homepageSections, services: demoServices, industries: demoIndustries,
  projects: demoProjects, process: demoProcessSteps, testimonials: demoTestimonials, articles: demoArticles,
};
const demoCategories = [...new Map(demoArticles.map(article => [article.category.id, article.category])).values()];
const demoSitemapFallback = [demoServices, demoIndustries, demoProjects, demoJobs, demoArticles].map(items =>
  items.map(item => ({ slug: item.slug, updatedAt: "updatedAt" in item ? item.updatedAt : new Date() })),
);
function findDemo<T extends { slug: string }>(items: T[], slug: string) { return items.find(item => item.slug === slug) ?? null; }
function articlesFallback(search: string, category: string, page: number, pageSize: number) {
  const normalized = search.trim().toLocaleLowerCase();
  const filtered = demoArticles.filter(article =>
    (!normalized || `${article.title} ${article.excerpt}`.toLocaleLowerCase().includes(normalized)) &&
    (!category || article.category.slug === category),
  );
  const pages = Math.ceil(filtered.length / pageSize);
  const safePage = Math.min(Math.max(1, page), Math.max(1, pages));
  return { items: filtered.slice((safePage - 1) * pageSize, safePage * pageSize), total: filtered.length, pages, page: safePage, categories: demoCategories };
}

export async function homepageData() {
  return withPublicDatabaseFallback(async () => {
    const [settings, sections, services, industries, projects, process, testimonials, articles] = await Promise.all([
      db.siteSetting.findMany(),
      db.homepageSection.findMany({ where: { visible: true }, orderBy: { sortOrder: "asc" } }),
      db.service.findMany({ where: publicWhere, orderBy: { sortOrder: "asc" }, take: 8 }),
      db.industry.findMany({ where: publicWhere, orderBy: { sortOrder: "asc" }, take: 6 }),
      db.project.findMany({ where: publicWhere, orderBy: { sortOrder: "asc" }, take: 12, include: { categories: true } }),
      db.processStep.findMany({ where: { visible: true }, orderBy: { sortOrder: "asc" } }),
      db.testimonial.findMany({ where: publicWhere, orderBy: { sortOrder: "asc" }, take: 9 }),
      db.article.findMany({ where: publicWhere, orderBy: { publishedAt: "desc" }, take: 3, include: { category: true } }),
    ]);
    return { settings: Object.fromEntries(settings.map(item => [item.key, item.value])) as Record<string, unknown>, sections, services, industries, projects, process, testimonials, articles };
  }, homepageFallback);
}

export async function getService(slug: string) { return withPublicDatabaseFallback(() => db.service.findFirst({ where: { slug, ...publicWhere } }), findDemo(demoServices, slug)); }
export async function getIndustry(slug: string) { return withPublicDatabaseFallback(() => db.industry.findFirst({ where: { slug, ...publicWhere } }), findDemo(demoIndustries, slug)); }
export async function getProject(slug: string) { return withPublicDatabaseFallback(() => db.project.findFirst({ where: { slug, ...publicWhere }, include: { categories: true } }), findDemo(demoProjects, slug)); }
export async function getArticle(slug: string) { return withPublicDatabaseFallback(() => db.article.findFirst({ where: { slug, ...publicWhere }, include: { category: true } }), findDemo(demoArticles, slug)); }
export async function getJob(slug: string) { return withPublicDatabaseFallback(() => db.jobOpening.findFirst({ where: { slug, ...publicWhere } }), findDemo(demoJobs, slug)); }
export async function getSettings() {
  return withPublicDatabaseFallback(async () => Object.fromEntries((await db.siteSetting.findMany()).map(item => [item.key, item.value])) as Record<string, unknown>, settingsFallback);
}
export async function getAboutPage() {
  const section = await withPublicDatabaseFallback(() => db.homepageSection.findUnique({ where: { key: "about" } }), null);
  return !section || !section.visible ? DEFAULT_ABOUT_CONTENT : parseAboutContent(section.content);
}
export async function getRelatedProjects(limit = 3) {
  return withPublicDatabaseFallback(() => db.project.findMany({ where: publicWhere, orderBy: { sortOrder: "asc" }, take: limit, include: { categories: true } }), demoProjects.slice(0, limit));
}
export async function getRelatedServices(slugs: string[]) {
  return withPublicDatabaseFallback(() => db.service.findMany({ where: { ...publicWhere, slug: { in: slugs } }, orderBy: { sortOrder: "asc" } }), demoServices.filter(service => slugs.includes(service.slug)));
}
export async function getPublishedServices() { return withPublicDatabaseFallback(() => db.service.findMany({ where: publicWhere, orderBy: { sortOrder: "asc" } }), demoServices); }
export async function getPublishedIndustries() { return withPublicDatabaseFallback(() => db.industry.findMany({ where: publicWhere, orderBy: { sortOrder: "asc" } }), demoIndustries); }
export async function getPublishedProjects() { return withPublicDatabaseFallback(() => db.project.findMany({ where: publicWhere, include: { categories: true }, orderBy: { sortOrder: "asc" }, take: 60 }), demoProjects); }
export async function getPublishedJobs() { return withPublicDatabaseFallback(() => db.jobOpening.findMany({ where: publicWhere, orderBy: { sortOrder: "asc" } }), demoJobs); }
export async function getPublishedLegalPage(slug: string) {
  return withPublicDatabaseFallback(() => db.legalPage.findFirst({ where: { slug, status: PublishStatus.PUBLISHED } }), demoLegalPages.find(page => page.slug === slug) ?? null);
}
export async function getPublicFooterData() {
  return withPublicDatabaseFallback(async () => {
    const [settings, services] = await Promise.all([db.siteSetting.findMany(), db.service.findMany({ where: publicWhere, orderBy: { sortOrder: "asc" }, take: 8 })]);
    return { settings: Object.fromEntries(settings.map(item => [item.key, item.value])) as Record<string, unknown>, services };
  }, { settings: settingsFallback, services: demoServices.slice(0, 8) });
}
export async function getPublicSitemapData() {
  return withPublicDatabaseFallback(() => Promise.all([
    db.service.findMany({ where: publicWhere, select: { slug: true, updatedAt: true } }),
    db.industry.findMany({ where: publicWhere, select: { slug: true, updatedAt: true } }),
    db.project.findMany({ where: publicWhere, select: { slug: true, updatedAt: true } }),
    db.jobOpening.findMany({ where: publicWhere, select: { slug: true, updatedAt: true } }),
    db.article.findMany({ where: publicWhere, select: { slug: true, updatedAt: true } }),
  ]), demoSitemapFallback);
}
export async function queryArticles(search = "", category = "", page = 1, pageSize = 9) {
  const where = {
    ...publicWhere,
    ...(category ? { category: { slug: category } } : {}),
    ...(search ? { OR: [{ title: { contains: search, mode: "insensitive" as const } }, { excerpt: { contains: search, mode: "insensitive" as const } }] } : {}),
  };
  try {
    const [items, total, categories] = await Promise.all([
      db.article.findMany({ where, include: { category: true }, orderBy: { publishedAt: "desc" }, skip: (page - 1) * pageSize, take: pageSize }),
      db.article.count({ where }),
      db.articleCategory.findMany({ orderBy: { name: "asc" } }),
    ]);
    return { items, total, pages: Math.ceil(total / pageSize), page, categories };
  } catch (error) {
    return withPublicDatabaseFallback(() => Promise.reject(error), articlesFallback(search, category, page, pageSize));
  }
}

export const getLegalPage = getPublishedLegalPage;
export { demoAboutContent };
