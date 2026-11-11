import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ChartNoAxesColumnIncreasing,
  ClipboardList,
  FileText,
  Instagram,
  Lightbulb,
  Megaphone,
  Monitor,
  MoreHorizontal,
  PenTool,
  Play,
  Rocket,
  Search,
  Settings2,
  Tag,
  Users,
  MessageCircle,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { WorkPortfolio } from "@/components/work-portfolio";
import { getSettings } from "@/lib/content";
import {
  approachSteps,
  createCapabilities,
  ctaHighlights,
  heroHighlights,
  whyChooseItems,
  workImages,
  type WorkIconName,
} from "@/lib/work-content";

export const metadata = {
  title: "Our Work",
  description:
    "Creative concepts and sample designs from Honey Media House — social media posts, branding mockups, landing pages and ad creatives.",
};

const icons: Record<WorkIconName, LucideIcon> = {
  search: Search,
  clipboard: ClipboardList,
  pen: PenTool,
  rocket: Rocket,
  chart: ChartNoAxesColumnIncreasing,
  lightbulb: Lightbulb,
  target: Settings2,
  settings: Settings2,
  users: Users,
  instagram: Instagram,
  megaphone: Megaphone,
  monitor: Monitor,
  tag: Tag,
  filetext: FileText,
  play: Play,
  dots: MoreHorizontal,
};

export default async function Work() {
  const settings = await getSettings();
  const whatsapp =
    typeof settings.whatsappNumber === "string"
      ? settings.whatsappNumber.replace(/[^\d]/g, "")
      : "";

  return (
    <>
      {/* ------------------------------------------------------------ hero */}
      <section className="work-hero">
        <div className="work-hero-media">
          <Image
            src={workImages.heroDesk}
            alt="Warm office desk with a laptop, notebook and coffee cup in soft evening light"
            fill
            priority
            sizes="(max-width: 760px) 100vw, 55vw"
          />
        </div>
        <div className="work-hero-wash" aria-hidden="true" />
        <div className="container work-hero-inner">
          <div className="work-hero-copy">
            <p className="eyebrow">Our Work</p>
            <h1>
              Ideas Today,
              <br />
              <span>Brands Tomorrow.</span>
            </h1>
            <p className="work-hero-lead">
              We are a new-age digital agency on a mission to create meaningful brands. While we are
              a growing startup, we bring fresh ideas, creative strategies and a passionate team
              ready to turn your vision into real results.
            </p>
            <div className="hero-actions">
              <Link className="button" href="/contact">
                Discuss Your Project <ArrowRight size={16} />
              </Link>
              <Link className="button button-outline" href="/services">
                Explore Services
              </Link>
            </div>
            <ul className="work-hero-highlights">
              {heroHighlights.map((item) => {
                const Icon = icons[item.icon];
                return (
                  <li key={item.label}>
                    <Icon aria-hidden="true" />
                    <span>{item.label}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- approach */}
      <section className="section work-approach">
        <div className="container work-approach-layout">
          <div className="work-approach-head">
            <p className="eyebrow">Our Approach</p>
            <h2 className="section-title">How We Work</h2>
            <p className="work-approach-lead">
              We follow a simple, transparent process to bring your ideas to life.
            </p>
          </div>
          <ol className="work-steps">
            {approachSteps.map((step) => {
              const Icon = icons[step.icon];
              return (
                <li className="work-step" key={step.number}>
                  <span className="work-step-icon">
                    <Icon aria-hidden="true" />
                  </span>
                  <span className="work-step-number">{step.number}</span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* --------------------------------------------------- sample work */}
      <WorkPortfolio />

      {/* -------------------------------------------- what we can create */}
      <section className="section work-create">
        <div className="container">
          <div className="work-panel">
            <p className="eyebrow">What We Can Create For You</p>
            <ul className="work-panel-grid">
              {createCapabilities.map((item) => {
                const Icon = icons[item.icon];
                return (
                  <li key={item.title + (item.note ?? "")}>
                    <Link className="work-capability" href={item.href}>
                      <span className="work-capability-icon">
                        <Icon aria-hidden="true" />
                      </span>
                      <span className="work-capability-title">{item.title}</span>
                      {item.note && <span className="work-capability-note">{item.note}</span>}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ why choose */}
      <section className="section cream work-why">
        <div className="container work-why-layout">
          <div className="work-why-main">
            <p className="eyebrow">Why Choose Honey Media House</p>
            <div className="work-why-cards">
              {whyChooseItems.map((item) => {
                const Icon = icons[item.icon];
                return (
                  <article className="work-why-card" key={item.title}>
                    <Icon aria-hidden="true" />
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </article>
                );
              })}
            </div>
          </div>
          <div className="work-why-media">
            <Image
              src={workImages.office}
              alt="Honey Media House team working together in a bright modern office"
              fill
              sizes="(max-width: 980px) 100vw, 32vw"
            />
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- bottom CTA */}
      <section className="section work-cta-section">
        <div className="container">
          <div className="work-cta">
            <div className="work-cta-media">
              <Image
                src={workImages.meeting}
                alt="Warmly lit meeting space with plants and a laptop ready for a project discussion"
                fill
                sizes="(max-width: 980px) 100vw, 1240px"
              />
            </div>
            <div className="work-cta-copy">
              <p className="eyebrow">Have a Project in Mind?</p>
              <h2>Let’s Create Something Amazing Together!</h2>
              <p>Share your goals with us and get a free consultation.</p>
              <div className="hero-actions">
                <Link className="button" href="/contact">
                  Start Your Project <ArrowRight size={16} />
                </Link>
                {whatsapp && (
                  <a
                    className="button button-light"
                    href={`https://wa.me/${whatsapp}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <MessageCircle size={16} /> Chat on WhatsApp
                  </a>
                )}
              </div>
            </div>
            <ul className="work-cta-points">
              {ctaHighlights.map((item) => {
                const Icon = icons[item.icon];
                return (
                  <li key={item.label}>
                    <Icon aria-hidden="true" />
                    <span>{item.label}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
