import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import sanitizeHtml from "sanitize-html";
import { ArrowLeft } from "lucide-react";
import { getArticle } from "@/lib/content";
import { PageHero } from "@/components/ui";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const item = await getArticle(slug);
  return item
    ? {
        title: item.seoTitle || item.title,
        description: item.seoDescription || item.excerpt,
        alternates: { canonical: `/resources/${slug}` },
        openGraph: { title: item.seoTitle || item.title, description: item.seoDescription || item.excerpt, images: [item.image] },
      }
    : { title: "Article not found" };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const item = await getArticle(slug);
  if (!item) notFound();

  const safe = sanitizeHtml(item.body, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img", "h1", "h2", "figure", "figcaption"]),
    allowedAttributes: { a: ["href", "name", "target", "rel"], img: ["src", "alt", "width", "height"], "*": ["class"] },
    allowedSchemes: ["http", "https", "mailto"],
  });

  return <>
    <PageHero eyebrow={item.category.name} title={item.title} description={item.excerpt} />

    <article className="section article-page">
      <div className="container">
        <p className="demo-banner">Demo article content — review this sample before publication.</p>

        <figure className="article-figure">
          <Image src={item.image} alt="" width={1400} height={800} priority sizes="(max-width:1000px) 100vw, 900px" />
        </figure>

        <div className="article-meta">
          <span className="pill">{item.category.name}</span>
          {item.publishedAt && (
            <time dateTime={new Date(item.publishedAt).toISOString()}>
              {new Date(item.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </time>
          )}
        </div>

        <div className="article-body" dangerouslySetInnerHTML={{ __html: safe }} />

        <div className="article-foot">
          <Link className="rs-search-button" href="/resources"><ArrowLeft size={14} /> All insights</Link>
        </div>
      </div>
    </article>
  </>;
}
