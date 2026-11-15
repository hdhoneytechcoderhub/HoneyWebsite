import type { Metadata } from "next";
import type { DemoService } from "@/lib/demo-content";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ChartNoAxesColumnIncreasing, Check, ChevronRight, CodeXml, Headphones, Layers, Megaphone, MessageSquareText, PanelsTopLeft, Settings2, Share2, Target, UsersRound } from "lucide-react";
import { ServiceFaqs } from "@/components/service-faqs";
import { getRelatedServices, getService } from "@/lib/content";

const serviceHeroImage = "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=2000&q=85";
const deliverablesImage = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=85";
const teamImage = "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1800&q=85";
const processIcons = [MessageSquareText, Target, Settings2, ChartNoAxesColumnIncreasing];

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const result = await getService(slug);
  if (!result) return { title: "Service not found" };
  const service = result as unknown as DemoService;
  return {
    title: service.seoTitle || service.title,
    description: service.seoDescription || service.description,
    alternates: { canonical: `/services/${slug}` },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const result = await getService(slug);
  if (!result) notFound();
  const service = result as unknown as DemoService;
  const isSocialMedia = service.slug === "social-media-management";
  const relatedSlugs = isSocialMedia
    ? ["digital-marketing", "lead-generation", "sales-business-growth", "content-strategy"]
    : ["digital-marketing", "social-media-management", "lead-generation", "content-strategy", "it-solutions", "sales-business-growth", "operations-consulting", "hr-solutions"].filter((item) => item !== slug).slice(0, 4);
  const relatedResults = await getRelatedServices(relatedSlugs);
  const related = isSocialMedia
    ? relatedResults.sort((a, b) => relatedSlugs.indexOf(a.slug) - relatedSlugs.indexOf(b.slug))
    : relatedResults;
  const contactHref = `/contact?service=${encodeURIComponent(service.slug)}`;
  const isItSolutions = service.slug === "it-solutions";
  const asStringList = (value: unknown): string[] => Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
  const benefits = asStringList(service.benefits);
  const deliverables = asStringList(service.deliverables);
  const process = asStringList(service.process);
  const serviceFaqs = Array.isArray(service.faqs) ? service.faqs.filter((item): item is { question: string; answer: string } => typeof item === "object" && item !== null && "question" in item && "answer" in item && typeof item.question === "string" && typeof item.answer === "string") : [];
  const faqs = isItSolutions ? [
    { question: "What services do you offer?", answer: "We discuss website development, web applications, and technical support tailored to your requirements." },
    { question: "How do you get started with a project?", answer: "We begin by understanding your goals, users, requirements, and technical constraints, then outline a suitable scope and next steps." },
    { question: "What is the typical project timeline?", answer: "Timelines depend on the project scope, features, and review process. We’ll discuss an estimate after learning more about your requirements." },
    { question: "Do you provide post-launch support?", answer: "Technical support needs can be discussed and included in a project scope where appropriate." },
  ] : isSocialMedia ? [
    { question: "Which social platforms can be supported?", answer: "Platforms can be discussed during planning based on your audience, content, and the agreed scope." },
    { question: "Is content created as part of social media management?", answer: "Content planning and creative design can be included as agreed in the service scope." },
    { question: "How do you measure performance?", answer: "We can agree on relevant goals and reporting during planning, then review activity to guide future refinements." },
    { question: "Can we customize the engagement based on our goals?", answer: "Yes. We’ll discuss your audience, priorities, and desired level of support to define an appropriate scope together." },
  ] : serviceFaqs;
  const areaIcons = [CodeXml, Layers, Headphones];
  const socialFocusAreas = ["Social Media Strategy", "Content & Creative", "Reels & Short-Form Video", "Account Handling"];
  const socialIcons = [Share2, MessageSquareText, Megaphone, PanelsTopLeft];
  const relatedIcons: Record<string, typeof Share2> = {
    "digital-marketing": ChartNoAxesColumnIncreasing,
    "lead-generation": UsersRound,
    "sales-business-growth": Target,
    "content-strategy": PanelsTopLeft,
  };

  return <div className="service-detail-page">
    <section className={`service-detail-hero${isSocialMedia ? " service-detail-hero-social" : ""}`}>
      <div className="service-detail-image"><Image src={serviceHeroImage} alt="Sunlit modern studio workspace with a table prepared for planning and collaboration" fill priority sizes="100vw" /></div>
      <div className="service-detail-wash" aria-hidden="true" />
      <div className="container service-detail-hero-inner">
        <nav className="service-breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><ChevronRight aria-hidden="true"/><Link href="/services">Services</Link><ChevronRight aria-hidden="true"/><span aria-current="page">{service.title}</span></nav>
        <p className="service-detail-kicker">{isItSolutions ? "Consulting & Solutions" : isSocialMedia ? "Social Media Marketing" : `${service.title} Agency`}</p>
        <h1>A scope shaped<br />around your goals</h1>
        <p className="service-detail-tagline">{isItSolutions ? "Tailored services that help you build, scale and sustain a stronger, more efficient business." : isSocialMedia ? "Tailored social media strategy and content to build a stronger, more visible brand." : "Strategy. Execution. Growth."}</p>
        <div className="service-detail-hero-actions"><Link className="button" href={isItSolutions || isSocialMedia ? "#service-scope-title" : contactHref}>{isItSolutions || isSocialMedia ? "Explore Our Services" : "Discuss This Service"} <ArrowRight size={16}/></Link>{isSocialMedia && <Link className="button service-detail-hero-secondary" href={contactHref}>Get a Consultation</Link>}</div>
        <span className="service-detail-demo">Illustrative service information — confirm scope before publication.</span>
      </div>
    </section>
    <section className={`service-detail-scope${isItSolutions ? " service-detail-scope-it" : ""}${isSocialMedia ? " service-detail-scope-social" : ""}`} aria-labelledby="service-scope-title">
      {isItSolutions || isSocialMedia ? <div className="container service-detail-it-scope">
        <p className="eyebrow">What We Deliver</p>
        <h2 className="section-title" id="service-scope-title">{isSocialMedia ? "Our Social Media Focus" : "Our Service Areas"}</h2>
        <p className="service-detail-overview-copy">{isSocialMedia ? "A focused approach to social media that connects your strategy, creative and community." : "A focused suite of services to support every stage of your business journey."}</p>
        <div className="service-area-grid">{(isSocialMedia ? socialFocusAreas : deliverables).map((item, index) => { const Icon = isSocialMedia ? socialIcons[index % socialIcons.length] : areaIcons[index % areaIcons.length]; return <article className="service-area-card" key={item}><span className="service-area-icon"><Icon aria-hidden="true"/></span><h3>{item}</h3><a href={contactHref} aria-label={`Discuss ${item}`}> <ArrowRight aria-hidden="true"/></a></article>; })}</div>
        <div className="service-detail-it-summary"><p>{service.overview}</p><ul className="service-detail-benefits">{benefits.map((benefit) => <li key={benefit}><Check aria-hidden="true"/><span>{benefit}</span></li>)}</ul></div>
        <p className="service-detail-note">This page describes sample service scope, not a binding offer. We’ll clarify requirements together before any work begins.</p>
      </div> : <div className="container service-detail-scope-grid">
        <div className="service-detail-scope-copy">
          <p className="eyebrow">What We Deliver</p>
          <h2 className="section-title" id="service-scope-title">A scope shaped around your goals</h2>
          <p className="service-detail-overview-copy">{service.overview}</p>
          <ul className="service-deliverable-list">
            {deliverables.map((item) => <li key={item}><Check aria-hidden="true"/><span>{item}</span><ChevronRight aria-hidden="true"/></li>)}
          </ul>
          <div className="service-detail-benefits"><h3>Potential Benefits</h3><ul>{benefits.map((benefit) => <li key={benefit}><Check aria-hidden="true"/><span>{benefit}</span></li>)}</ul></div>
          <p className="service-detail-note">This page describes sample service scope, not a binding offer. We’ll clarify requirements together before any work begins.</p>
        </div>
        <div className="service-detail-scope-image"><Image src={service.image || deliverablesImage} alt={`Illustrative ${service.title.toLowerCase()} planning workspace`} fill sizes="(max-width: 760px) 100vw, 42vw" /></div>
      </div>}
    </section>
    <section className={`service-detail-process${isItSolutions ? " service-detail-process-it" : ""}${isSocialMedia ? " service-detail-process-social" : ""}`} aria-labelledby="service-process-title">
      <div className={isItSolutions || isSocialMedia ? "container service-detail-process-layout" : "container"}>
        <div className="service-detail-process-intro"><p className="eyebrow">Our Process</p><h2 className="section-title" id="service-process-title">Clear steps from first conversation to review</h2>{(isItSolutions || isSocialMedia) && <p>{isSocialMedia ? "A consistent workflow keeps your brand active and your content moving forward." : "A simple, transparent process that keeps you informed at every step."}</p>}</div>
        <ol className="service-detail-process-grid">
          {process.map((item, index) => {
            const Icon = processIcons[index % processIcons.length];
            return <li key={item}><span className="service-process-icon"><Icon aria-hidden="true"/></span><span className="service-process-number">{String(index + 1).padStart(2, "0")}</span><h3>{item}</h3></li>;
          })}
        </ol>
      </div>
    </section>
    <section className={`service-detail-faq${isItSolutions ? " service-detail-faq-it" : ""}${isSocialMedia ? " service-detail-faq-social" : ""}`} aria-labelledby="service-faq-title">
      <div className="container service-faq-layout">
        {(isItSolutions || isSocialMedia) && <div className="service-faq-photo"><Image src={service.image} alt={isSocialMedia ? "Social media content being prepared on a laptop" : "Illustrative IT planning workspace"} fill sizes="(max-width: 760px) 100vw, 24vw"/></div>}
        <div className="service-faq-copy"><p className="eyebrow">Got a Question?</p><h2 className="section-title" id="service-faq-title">Frequently Asked Questions</h2><p className="service-faq-intro">Find quick answers to common questions about {service.title.toLowerCase()}, our services and how we work.</p><ServiceFaqs faqs={faqs}/></div>
        {!isItSolutions && !isSocialMedia && <div className="service-faq-art" aria-hidden="true"><span>Q</span><span>A</span><i>✦</i></div>}
      </div>
    </section>
    <section className="service-related" aria-labelledby="related-services-title"><div className="container"><div className="section-heading"><div><p className="eyebrow">Explore More</p><h2 className="section-title" id="related-services-title">Related Services</h2></div><Link className="text-link" href="/services">All Services <ArrowRight size={15}/></Link></div><div className="service-related-grid">{related.map((item) => <Link href={`/services/${item.slug}`} className="service-related-card" key={item.id}><span className="service-related-icon" aria-hidden="true">{isSocialMedia ? (() => { const Icon = relatedIcons[item.slug] ?? Share2; return <Icon size={21}/>; })() : <ArrowRight size={21}/>}</span><h3>{item.title}</h3><p>{item.description}</p><span className="service-related-link">Explore service <ArrowRight size={14}/></span></Link>)}</div></div></section>
    <section className={`service-team${isSocialMedia ? " service-team-social" : ""}`} aria-labelledby="service-team-title">
      <Image className="service-team-image" src={isSocialMedia ? service.image : teamImage} alt="" fill sizes="100vw" />
      <div className="service-team-shade" aria-hidden="true" />
      <div className="container service-team-content"><p className="eyebrow">Meet Our Team</p><h2 id="service-team-title">Discuss {service.title.toLowerCase()} with our team.</h2><p>Talk to us to explore your goals, find the right strategy and plan the next step for your business.</p><Link className="button" href={contactHref}>Book a Consultation <ArrowRight size={16}/></Link></div>
    </section>
  </div>;
}
