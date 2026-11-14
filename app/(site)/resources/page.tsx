import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { queryArticles } from "@/lib/content";
import { PageHero } from "@/components/ui";

export const metadata = {
  title: "Resources",
  description: "Search Honey Media House insights, growth tips, brand guides and digital marketing articles.",
};

type Props = { searchParams: Promise<{ q?: string; category?: string; page?: string }> };

const dateFormat = (value: Date | string | null | undefined) =>
  value ? new Date(value).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) : "";

export default async function Resources({ searchParams }: Props) {
  const query = await searchParams;
  const page = Math.max(1, Number(query.page) || 1);
  const search = query.q ?? "";
  const category = query.category ?? "";
  const result = await queryArticles(search, category, page, 9);
  const pageHref = (target: number) =>
    `/resources?q=${encodeURIComponent(search)}&category=${encodeURIComponent(category)}&page=${target}`;

  return <>
    <PageHero
      eyebrow="Resources"
      title="Latest insights, guides & growth tips"
      description="Practical ideas to help you build, grow and scale a stronger brand."
    />

    <section className="section rs-section">
      <div className="container">
        <form className="search-row" action="/resources" role="search">
          <label className="sr-only" htmlFor="q">Search articles</label>
          <input id="q" name="q" type="search" defaultValue={search} placeholder="Search insights…" />
          <label className="sr-only" htmlFor="category">Category</label>
          <select id="category" name="category" defaultValue={category}>
            <option value="">All categories</option>
            {result.categories.map(entry => <option value={entry.slug} key={entry.id}>{entry.name}</option>)}
          </select>
          <button className="rs-search-button">Search</button>
        </form>

        <div className="rs-result-bar">
          <p className="rs-count" role="status">
            {result.total} {result.total === 1 ? "insight" : "insights"}
            {category ? " in the selected category" : ""}
            {search ? ` for “${search}”` : ""}
          </p>
          {(search || category) && <Link className="rs-reset" href="/resources">Clear filters</Link>}
        </div>

        {result.items.length ? (
          <>
            <div className="article-grid">
              {result.items.map(article => (
                <Link href={`/resources/${article.slug}`} className="article-card" key={article.id}>
                  <span className="article-card-media">
                    <Image src={article.image} alt="" width={1000} height={650} sizes="(max-width:740px) 90vw, 30vw" />
                    <span className="article-flag">Sample</span>
                  </span>
                  <div className="article-card-copy">
                    <span className="pill">{article.category.name}</span>
                    <h2>{article.title}</h2>
                    <p>{article.excerpt}</p>
                    <span className="article-date">
                      {dateFormat(article.publishedAt)}
                      <b>Read article <ArrowRight size={12} /></b>
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {result.pages > 1 && (
              <nav className="pagination" aria-label="Resource pages">
                {page > 1 && <Link href={pageHref(page - 1)}>Previous</Link>}
                {Array.from({ length: result.pages }, (_, index) => index + 1).map(number =>
                  number === page
                    ? <span className="current" aria-current="page" key={number}>{number}</span>
                    : <Link key={number} href={pageHref(number)}>{number}</Link>,
                )}
                {page < result.pages && <Link href={pageHref(page + 1)}>Next</Link>}
              </nav>
            )}
          </>
        ) : (
          <div className="rs-empty">
            <h2>No insights match that search</h2>
            <p>Try a different phrase, or browse every published article.</p>
            <Link className="rs-search-button" href="/resources">View all insights</Link>
          </div>
        )}
      </div>
    </section>
  </>;
}
