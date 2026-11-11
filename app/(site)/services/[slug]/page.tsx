import type { Metadata } from "next";
import type { DemoService } from "@/lib/demo-content";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ChevronRight } from "lucide-react";
import { ServiceFaqs } from "@/components/service-faqs";
import { getRelatedServices, getService } from "@/lib/content";

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
  const related = await getRelatedServices(
    ["digital-marketing", "it-solutions", "social-media-management", "lead-generation", "hr-solutions", "sales-business-growth", "content-strategy", "operations-consulting"].filter((item) => item !== slug).slice(0, 3),
  );
  const contactHref = `/contact?service=${encodeURIComponent(service.slug)}`;
  const asStringList = (value: unknown): string[] => Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
  const benefits = asStringList(service.benefits);
  const deliverables = asStringList(service.deliverables);
  const process = asStringList(service.process);
  const faqs = Array.isArray(service.faqs) ? service.faqs.filter((item): item is { question: string; answer: string } => typeof item === "object" && item !== null && "question" in item && "answer" in item && typeof item.question === "string" && typeof item.answer === "string") : [];

  return <div className="service-detail-page">
    <section className="service-detail-hero">
      <div className="service-detail-image"><Image src={service.image} alt={`Illustrative image representing ${service.title.toLowerCase()}`} fill priority sizes="(max-width: 760px) 100vw, 55vw" /></div>
      <div className="service-detail-wash" aria-hidden="true" />
      <div className="container service-detail-hero-inner">
        <nav className="service-breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><ChevronRight aria-hidden="true"/><Link href="/services">Services</Link><ChevronRight aria-hidden="true"/><span aria-current="page">{service.title}</span></nav>
        <p className="eyebrow">Our Services</p>
        <h1>{service.title}</h1>
        <p>{service.description}</p>
        <span className="service-detail-demo">Illustrative service information — confirm scope before publication.</span>
        <Link className="button" href={contactHref}>Discuss This Service <ArrowRight size={16}/></Link>
      </div>
    </section>
    <section className="section service-detail-overview">
      <div className="container service-detail-layout">
        <div><p className="eyebrow">Overview</p><h2 className="section-title">A thoughtful approach to {service.title.toLowerCase()}.</h2><p>{service.overview}</p><p className="service-detail-note">This page describes sample service scope, not a binding offer. We’ll clarify requirements together before any work begins.</p></div>
        <div className="service-detail-benefits"><h2>Potential Benefits</h2><ul className="list-check">{benefits.map((benefit) => <li key={benefit}>{benefit}</li>)}</ul></div>
      </div>
    </section>
    <section className="section service-detail-deliverables"><div className="container"><p className="eyebrow">What We Deliver</p><h2 className="section-title">A scope shaped around your goals</h2><ul className="service-deliverable-grid">{deliverables.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span><h3>{item}</h3></li>)}</ul></div></section>
    <section className="section service-detail-process"><div className="container"><p className="eyebrow">Our Process</p><h2 className="section-title">Clear steps from first conversation to review</h2><ol className="service-detail-process-grid">{process.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span><h3>{item}</h3></li>)}</ol></div></section>
    <section className="section service-detail-faq"><div className="container"><p className="eyebrow">Good to Know</p><h2 className="section-title">Frequently Asked Questions</h2><ServiceFaqs faqs={faqs}/></div></section>
    <section className="section service-related"><div className="container"><div className="section-heading"><div><p className="eyebrow">Explore More</p><h2 className="section-title">Related Services</h2></div><Link className="text-link" href="/services">All Services <ArrowRight size={15}/></Link></div><div className="service-grid">{related.map((item) => <Link href={`/services/${item.slug}`} className="service-card" key={item.id}><div className="service-image"><Image src={item.image} alt={`Illustrative image representing ${item.title.toLowerCase()} services`} fill sizes="(max-width:740px) 50vw,25vw"/></div><div className="service-content"><h3>{item.title}</h3><p>{item.description}</p><span className="text-link">Know More <ArrowRight size={15}/></span></div></Link>)}</div></div></section>
    <section className="section service-detail-contact"><div className="container"><div className="service-detail-contact-card"><p className="eyebrow">Let’s Talk</p><h2>Discuss {service.title.toLowerCase()} with our team.</h2><p>Tell us what you’re looking to achieve. The contact form is a frontend demo; information is not sent or saved.</p><Link className="button" href={contactHref}>Discuss This Service <ArrowRight size={16}/></Link></div></div></section>
  </div>;
}
