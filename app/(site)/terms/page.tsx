import sanitizeHtml from "sanitize-html";
import { getLegalPage } from "@/lib/content";
export const metadata = { title: "Terms & Conditions", description: "Read the Honey Media House terms and conditions." };
export default async function TermsPage() { const page = await getLegalPage("terms"); if (!page) return null; const safe = sanitizeHtml(page.body); return <><section className="page-hero"><div className="container"><p className="eyebrow">Honey Media House</p><h1>{page.title}</h1><p>Last updated {page.updatedAt.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}.</p></div></section><article className="section"><div className="container article-body" dangerouslySetInnerHTML={{ __html: safe }} /></article></>; }
