import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight, ChartNoAxesColumnIncreasing, ClipboardList, FileText, Instagram, Lightbulb,
  Megaphone, MessageCircle, Monitor, MoreHorizontal, PenTool, Play, Rocket, Search, Settings2,
  Tag, Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { WorkPortfolio } from "@/components/work-portfolio";
import { getSettings } from "@/lib/content";
import {
  approachSteps, createCapabilities, ctaHighlights, heroHighlights, whyChooseItems, workImages,
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
  const whatsapp = typeof settings.whatsappNumber === "string" ? settings.whatsappNumber.replace(/[^\d]/g, "") : "";

  return <>
    <section className="wk-hero" aria-labelledby="wk-title">
      <div className="wk-hero-media">
        <Image src={workImages.heroDesk} alt="Warm studio desk with a laptop, plant and coffee cup beside an office window" fill priority sizes="100vw" />
      </div>
      <div className="wk-hero-wash" aria-hidden="true" />
      <div className="wk-shell wk-hero-grid">
        <div className="wk-hero-copy">
          <p className="wk-kicker">Our Work</p>
          <h1 id="wk-title">Ideas Today,<br /><span>Brands Tomorrow.</span></h1>
          <p className="wk-hero-lead">We are a new-age digital agency on a mission to create meaningful brands. While we are a growing startup, we bring fresh ideas, creative strategies and a passionate team ready to turn your vision into real results.</p>
          <div className="wk-actions">
            <Link className="wk-btn" href="/contact">Discuss Your Project <ArrowRight size={15} /></Link>
            <Link className="wk-btn wk-btn-ghost" href="/services">Explore Services</Link>
          </div>
          <ul className="wk-hero-points">
            {heroHighlights.map(item => {
              const Icon = icons[item.icon];
              return <li key={item.label}><Icon size={17} aria-hidden="true" /><span>{item.label}</span></li>;
            })}
          </ul>
        </div>
      </div>
      <Image className="wk-hero-mark" src="/images/honey-media-house-mark.svg" alt="" width={58} height={72} />
    </section>

    <section className="wk-section" aria-labelledby="wk-approach-title">
      <div className="wk-shell wk-approach-grid">
        <div className="wk-approach-head">
          <p className="wk-kicker">Our Approach</p>
          <h2 id="wk-approach-title">How We Work</h2>
          <p>We follow a simple, transparent process to bring your ideas to life.</p>
        </div>
        <ol className="wk-steps">
          {approachSteps.map(step => {
            const Icon = icons[step.icon];
            return <li className="wk-step" key={step.number}>
              <span className="wk-step-icon"><Icon size={17} aria-hidden="true" /></span>
              <span className="wk-step-num">{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>;
          })}
        </ol>
      </div>
    </section>

    <WorkPortfolio />

    <section className="wk-section" aria-labelledby="wk-create-title">
      <div className="wk-shell">
        <div className="wk-create">
          <p className="wk-create-title" id="wk-create-title">What We Can Create For You</p>
          <ul className="wk-create-grid">
            {createCapabilities.map(item => {
              const Icon = icons[item.icon];
              return <li key={item.title + (item.note ?? "")}>
                <Link href={item.href}>
                  <Icon size={19} aria-hidden="true" />
                  <span>{item.title}{item.note && <small>{item.note}</small>}</span>
                </Link>
              </li>;
            })}
          </ul>
        </div>
      </div>
    </section>

    <section className="wk-section wk-why" aria-labelledby="wk-why-title">
      <div className="wk-shell wk-why-grid">
        <div>
          <p className="wk-kicker" id="wk-why-title">Why Choose Honey Media House</p>
          <div className="wk-why-cards">
            {whyChooseItems.map(item => {
              const Icon = icons[item.icon];
              return <article className="wk-why-card" key={item.title}>
                <Icon size={18} aria-hidden="true" />
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>;
            })}
          </div>
        </div>
        <div className="wk-why-media">
          <Image src={workImages.office} alt="Sunlit meeting corner with a laptop and notebook ready for a project conversation" fill sizes="(max-width:980px) 100vw, 30vw" />
          <Image className="wk-why-mark" src="/images/honey-media-house-mark.svg" alt="" width={56} height={70} />
        </div>
      </div>
    </section>

    <section className="wk-cta-section" aria-labelledby="wk-cta-title">
      <div className="wk-shell">
        <div className="wk-cta">
          <Image className="wk-cta-media" src={workImages.meeting} alt="" fill sizes="(max-width:980px) 100vw, 1180px" />
          <div className="wk-cta-copy">
            <p className="wk-kicker">Have a project in mind?</p>
            <h2 id="wk-cta-title">Let’s Create Something Amazing Together!</h2>
            <p>Share your goals with us and get a free consultation.</p>
            <div className="wk-actions">
              <Link className="wk-btn" href="/contact">Start Your Project <ArrowRight size={15} /></Link>
              <Link className="wk-btn wk-btn-light" href={whatsapp ? `https://wa.me/${whatsapp}` : "/contact"} {...(whatsapp ? { target: "_blank", rel: "noreferrer" } : {})}>
                <MessageCircle size={15} /> Chat on WhatsApp
              </Link>
            </div>
          </div>
          <ul className="wk-cta-points">
            {ctaHighlights.map(item => {
              const Icon = icons[item.icon];
              return <li key={item.label}><Icon size={19} aria-hidden="true" /><span>{item.label}</span></li>;
            })}
          </ul>
        </div>
      </div>
    </section>
  </>;
}
