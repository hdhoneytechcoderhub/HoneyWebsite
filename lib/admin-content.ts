export const resources = {
  homepage: { model: "homepageSection", title: "Homepage sections", fields: ["key", "title", "eyebrow", "body", "visible", "sortOrder"] },
  services: { model: "service", title: "Services", fields: ["slug", "title", "description", "overview", "icon", "image", "benefits", "deliverables", "process", "faqs", "seoTitle", "seoDescription", "status", "sortOrder"] },
  industries: { model: "industry", title: "Industries", fields: ["slug", "title", "description", "overview", "image", "challenges", "solutions", "serviceSlugs", "seoTitle", "seoDescription", "status", "sortOrder"] },
  projects: { model: "project", title: "Projects", fields: ["slug", "title", "clientLabel", "description", "overview", "challenge", "approach", "deliverables", "gallery", "results", "image", "demoContent", "verifiedResults", "seoTitle", "seoDescription", "status", "sortOrder"] },
  testimonials: { model: "testimonial", title: "Testimonials", fields: ["name", "role", "company", "quote", "avatar", "demoContent", "status", "sortOrder"] },
  process: { model: "processStep", title: "Process steps", fields: ["title", "description", "sortOrder", "visible"] },
  articles: { model: "article", title: "Articles", fields: ["slug", "title", "excerpt", "body", "image", "categoryId", "seoTitle", "seoDescription", "status", "publishedAt"] },
  careers: { model: "jobOpening", title: "Job openings", fields: ["slug", "title", "team", "location", "employmentType", "summary", "description", "requirements", "seoTitle", "seoDescription", "status", "sortOrder"] },
  legal: { model: "legalPage", title: "Legal pages", fields: ["slug", "title", "body", "seoTitle", "seoDescription", "status"] },
} as const;
export type ResourceName = keyof typeof resources;
export function isResource(value: string): value is ResourceName { return Object.prototype.hasOwnProperty.call(resources, value); }
export const jsonFields = new Set(["benefits", "deliverables", "process", "faqs", "challenges", "solutions", "serviceSlugs", "gallery", "results", "requirements"]);
export const booleanFields = new Set(["visible", "demoContent", "verifiedResults"]);
export const numberFields = new Set(["sortOrder"]);
