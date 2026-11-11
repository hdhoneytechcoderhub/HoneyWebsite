import type { MetadataRoute } from "next";
import { getPublicSitemapData } from "@/lib/content";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");
  const fixed = ["", "/about", "/services", "/industries", "/work", "/careers", "/resources", "/contact", "/book-strategy-call", "/privacy-policy", "/terms"];
  const [services, industries, projects, jobs, articles] = await getPublicSitemapData();
  const lastModified = new Date();
  const links = [
    ...fixed.map(path => ({ url: `${base}${path}`, lastModified, changeFrequency: "weekly" as const, priority: path ? 0.7 : 1 })),
    ...services.map(x => ({ url: `${base}/services/${x.slug}`, lastModified })),
    ...industries.map(x => ({ url: `${base}/industries/${x.slug}`, lastModified })),
    ...projects.map(x => ({ url: `${base}/work/${x.slug}`, lastModified })),
    ...jobs.map(x => ({ url: `${base}/careers/${x.slug}`, lastModified })),
    ...articles.map(x => ({ url: `${base}/resources/${x.slug}`, lastModified })),
  ];
  return links;
}
