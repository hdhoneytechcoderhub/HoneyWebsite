import { notFound } from "next/navigation";
import sanitizeHtml from "sanitize-html";
import { getPublishedLegalPage } from "@/lib/content";
export const dynamic = "force-dynamic";
export const metadata = { title: "Privacy Policy", description: "Read the Honey Media House privacy policy." };
export default async function PrivacyPage() { const page = await getPublishedLegalPage("privacy-policy"); if (!page) notFound(); const safe = sanitizeHtml(page.body); return <><section className="page-hero"><div className="container"><p className="eyebrow">Honey Media House</p><h1>{page.title}</h1><p>Last updated {page.updatedAt.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}.</p></div></section><article className="section"><div className="container article-body" dangerouslySetInnerHTML={{ __html: safe }} /></article></>; }
