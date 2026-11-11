import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getProject } from "@/lib/content";
import { getWorkItem, type WorkItem } from "@/lib/work-content";
import { PageHero, CTA, EnquirySection } from "@/components/ui";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const workItem = getWorkItem(slug);
  if (workItem) {
    return {
      title: `${workItem.title} ${workItem.subtitle}`,
      description: workItem.overview,
      alternates: { canonical: `/work/${slug}` },
    };
  }
  const item = await getProject(slug);
  return item
    ? { title: item.seoTitle || item.title, description: item.seoDescription || item.description, alternates: { canonical: `/work/${slug}` } }
    : { title: "Case study not found" };
}

/* Detail page for a local sample concept — same data as the /work preview dialog. */
function SampleConcept({ item }: { item: WorkItem }) {
  return (
    <>
      <PageHero
        eyebrow="Sample concept"
        title={`${item.title} ${item.subtitle}`}
        description={item.overview}
      />
      <div className="container">
        <p className="demo-banner">
          Illustrative concept/sample work — created to show our creative style. This is not a
          verified client project and no business results are claimed.
        </p>
      </div>
      <section className="section">
        <div className="container content-layout">
          <div>
            <p className="eyebrow">{item.category}</p>
            <h2 className="section-title">Overview</h2>
            <p>{item.overview}</p>
            <h2 className="section-title">Deliverables</h2>
            <ul className="list-check">
              {item.deliverables.map((entry) => (
                <li key={entry}>{entry}</li>
              ))}
            </ul>
            <div className="hero-actions">
              <Link
                className="button"
                href={`/contact?project=${encodeURIComponent(`${item.title} ${item.subtitle}`)}`}
              >
                Discuss a Similar Project <ArrowRight size={15} />
              </Link>
              <Link className="button button-outline" href="/work">
                Back to Our Work
              </Link>
            </div>
          </div>
          <Image src={item.image} alt={item.imageAlt} width={1200} height={850} priority />
        </div>
      </section>
      {item.gallery && item.gallery.length > 0 && (
        <section className="section cream">
          <div className="container">
            <h2 className="section-title">Gallery</h2>
            <div className="industry-grid work-gallery">
              {item.gallery.map((image, index) => (
                <Image
                  key={`${item.id}-gallery-${index}`}
                  src={image}
                  alt={`${item.title} ${item.subtitle} concept preview ${index + 1}`}
                  width={720}
                  height={540}
                  sizes="(max-width: 740px) 45vw, 20vw"
                />
              ))}
            </div>
          </div>
        </section>
      )}
      <CTA />
    </>
  );
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;

  const workItem = getWorkItem(slug);
  if (workItem) return <SampleConcept item={workItem} />;

  const item = await getProject(slug);
  if (!item) notFound();
  const arr = (value: unknown): string[] => (Array.isArray(value) ? value.filter((x): x is string => typeof x === "string") : []);
  const deliverables = arr(item.deliverables), gallery = arr(item.gallery), results = arr(item.results);
  return <><PageHero eyebrow={item.demoContent ? "Demo portfolio concept" : "Case study"} title={item.title} description={item.description}/>{item.demoContent && <div className="container"><p className="demo-banner">Illustrative demo content — client relationship and outcomes are not verified.</p></div>}<section className="section"><div className="container content-layout"><div><p className="eyebrow">Overview</p><h2 className="section-title">The opportunity</h2><p>{item.overview}</p></div><Image src={item.image} alt="" width={1200} height={850}/></div></section><section className="section cream"><div className="container content-layout"><div><p className="eyebrow">The challenge</p><h2 className="section-title">Understanding the need</h2><p>{item.challenge}</p><h2 className="section-title">Our approach</h2><p>{item.approach}</p></div><div><h2 className="section-title">Deliverables</h2><ul className="list-check">{deliverables.map((x,i)=><li key={i}>{x}</li>)}</ul></div></div></section>{item.verifiedResults&&!item.demoContent&&results.length>0&&<section className="section"><div className="container"><h2 className="section-title">Verified results</h2><ul className="list-check">{results.map((x,i)=><li key={i}>{x}</li>)}</ul></div></section>}{gallery.length>0&&<section className="section"><div className="container"><h2 className="section-title">Gallery</h2><div className="industry-grid">{gallery.map((image,i)=><Image src={image} alt={`${item.title} gallery ${i+1}`} width={720} height={540} key={`${image}-${i}`}/>)}</div></div></section>}<EnquirySection title="Have a project in mind?" source="project"/><CTA/></>
}
