import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, BriefcaseBusiness, Gem, HeartHandshake, Lightbulb, Linkedin, Target, UsersRound, Eye } from "lucide-react";
import { getAboutPage, getSettings } from "@/lib/content";
import { AboutDepartments } from "@/components/about-departments";
import { AboutStoryLink } from "@/components/about-story-link";
import { AboutPageContent } from "@/lib/about-page";

export const dynamic = "force-dynamic";
export async function generateMetadata(): Promise<Metadata> {
  const [about, settings] = await Promise.all([getAboutPage(), getSettings()]);
  const origin = (typeof settings.siteUrl === "string" ? settings.siteUrl : process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");
  return { title: about.seo.title, description: about.seo.description, alternates: { canonical: `${origin}/about` }, openGraph: { title: about.seo.title, description: about.seo.description, url: `${origin}/about`, images: about.seo.image ? [about.seo.image] : undefined, type: "website" } };
}

const purposeIcons = { Target, Eye, Gem, Lightbulb, Heart: HeartHandshake, Compass: BriefcaseBusiness } as const;
const socialIcons = { linkedin: Linkedin, instagram: HeartHandshake, youtube: ArrowUpRight } as const;
type Settings = Record<string, unknown>;
function settingString(settings: Settings, key: string) { return typeof settings[key] === "string" ? settings[key] as string : ""; }
function orderedSections(about: AboutPageContent) { return about.sectionOrder.filter(key => about.sectionVisibility[key]); }

export default async function AboutPage() {
  const [about, settings] = await Promise.all([getAboutPage(), getSettings()]);
  const stats = Array.isArray(settings.heroStats) ? (settings.heroStats as { value?: string; label?: string }[]).filter(item => item.value?.trim() && item.label?.trim()).slice(0, 4) : [];
  const whatsApp = settingString(settings, "whatsappNumber").replace(/[^+\d]/g, "").replace(/^\+/, "");
  const socialSettings = settings.socialLinks && typeof settings.socialLinks === "object" ? settings.socialLinks as Record<string, string> : {};
  const founderLinks = { linkedin: about.founder.social.linkedin || socialSettings.linkedin || "", instagram: about.founder.social.instagram || socialSettings.instagram || "", youtube: about.founder.social.youtube || socialSettings.youtube || "" };
  const sections = orderedSections(about);

  return <div className={`about-page${about.demoContent ? " about-demo" : ""}`}>
    {about.demoContent && <div className="about-demo-note" role="note">Setup preview: founder details and story milestones are reference/demo content. Confirm or replace them in Admin → About Page before launch.</div>}
    <section className="about-hero">
      <div className="about-hero-image"><Image src={about.hero.image} alt={about.hero.imageAlt} fill priority sizes="(max-width:740px) 100vw,60vw" /></div>
      <div className="about-hero-wash" />
      <div className="container about-hero-inner">
        <div className="about-hero-copy"><p className="eyebrow">{about.hero.eyebrow}</p><h1>{about.hero.title.replace(about.hero.highlight, "")}<span>{about.hero.highlight}</span></h1><p className="about-lead">{about.hero.description}</p><div className="hero-actions"><AboutStoryLink label={about.hero.primaryLabel}/><Link className="button button-outline" href="/contact">{about.hero.secondaryLabel}</Link></div>
          {stats.length > 0 && <div className="about-stats" aria-label="Business statistics">{stats.map((stat, i) => <div className="about-stat" key={`${stat.label}-${i}`}><span className="about-stat-icon" aria-hidden="true">{i === 0 ? <HeartHandshake/> : i === 1 ? <BriefcaseBusiness/> : i === 2 ? <UsersRound/> : <Target/>}</span><span><strong>{stat.value}</strong><small>{stat.label}</small></span></div>)}</div>}
        </div>
      </div>
    </section>
    {sections.map(section => {
      if (section === "story") return <section className="section about-story" id="our-story" key={section}><div className="container about-story-grid"><div className="about-story-photo"><Image src={about.story.image} alt={about.story.imageAlt} width={1100} height={820} sizes="(max-width:740px) 100vw,34vw" loading="lazy"/></div><div className="about-story-copy"><p className="eyebrow">{about.story.eyebrow}</p><h2 className="section-title">{about.story.title}</h2>{about.story.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div><ol className="about-timeline" aria-label="Company timeline">{about.story.timeline.map((entry, i) => <li key={`${entry.year}-${i}`}><span className="about-timeline-dot"/><strong className="about-year">{entry.year}</strong><div><h3>{entry.title}</h3><p>{entry.description}</p>{entry.demo && about.demoContent && <small className="demo-note">Demo milestone</small>}</div></li>)}</ol></div></section>;
      if (section === "purpose") return <section className="section about-purpose" key={section}><div className="container"><p className="eyebrow">{about.purpose.eyebrow}</p><h2 className="section-title">{about.purpose.title}</h2><div className="about-purpose-grid">{about.purpose.cards.map((card, i) => { const Icon = purposeIcons[card.icon]; return <article className="about-purpose-card" key={`${card.title}-${i}`}><span className="about-purpose-number">{String(i + 1).padStart(2, "0")}</span><Icon className="about-purpose-icon" aria-hidden="true"/><div><h3>{card.title}</h3><p>{card.description}</p></div></article>; })}</div></div></section>;
      if (section === "founder") return <section className="section about-founder" key={section}><div className="container about-founder-grid">{about.founder.portrait ? <div className="about-founder-photo"><Image src={about.founder.portrait} alt={about.founder.portraitAlt || `Portrait of ${about.founder.name}`} width={900} height={1050} sizes="(max-width:740px) 100vw,34vw" loading="lazy"/></div> : <div className="about-founder-placeholder"><UsersRound aria-hidden="true"/><strong>Founder portrait</strong><span>Add a confirmed portrait in Admin → About Page</span></div>}<div className="about-founder-copy"><p className="eyebrow">{about.founder.eyebrow}</p><h2>{about.founder.name}</h2><p className="about-founder-role">{about.founder.role}</p>{about.founder.isDemo && <p className="demo-note">Reference identity and biography — confirm before publishing.</p>}<p>{about.founder.biography}</p><blockquote>“{about.founder.quote}”</blockquote><div className="about-socials">{Object.entries(founderLinks).filter(([, url]) => url).map(([name, url]) => { const Icon = socialIcons[name as keyof typeof socialIcons]; return <a key={name} href={url} target="_blank" rel="noreferrer" aria-label={`${name} (opens in new tab)`}><Icon size={19}/></a>; })}</div>{about.founder.signature && <Image className="about-signature" src={about.founder.signature} alt={about.founder.signatureAlt || `Signature of ${about.founder.name}`} width={260} height={90} loading="lazy"/>}</div><aside className="about-vision"><h3>{about.founder.visionTitle}</h3><p>“{about.founder.vision}”</p>{about.founder.visionImage && <Image src={about.founder.visionImage} alt={about.founder.visionImageAlt} width={760} height={440} sizes="(max-width:740px) 100vw,27vw" loading="lazy"/>}</aside></div></section>;
      if (section === "team") return <section className="section about-team" key={section}><div className="container"><div className="section-heading"><div><p className="eyebrow">{about.team.eyebrow}</p><h2 className="section-title">{about.team.title}</h2><p>{about.team.subtitle}</p></div><Link className="button button-outline" href="/careers">{about.team.joinLabel} <ArrowRight size={16}/></Link></div><AboutDepartments departments={about.team.departments}/></div></section>;
      return <section className="section about-cta-section" key={section}><div className="container"><div className="about-cta" style={{ "--about-cta-image": `url("${about.cta.image}")` } as React.CSSProperties}><div className="about-cta-copy"><h2>{about.cta.title}</h2><p>{about.cta.description}</p><div className="hero-actions"><Link className="button" href="/book-strategy-call">{about.cta.strategyLabel} <ArrowRight size={16}/></Link>{whatsApp && <a className="button button-light" href={`https://wa.me/${whatsApp}?text=${encodeURIComponent(about.cta.whatsappMessage)}`} target="_blank" rel="noreferrer">{about.cta.whatsappLabel} <ArrowUpRight size={16}/></a>}</div></div><ul>{about.cta.benefits.map((benefit, i) => <li key={`${benefit}-${i}`}>{i === 0 ? <Target/> : i === 1 ? <UsersRound/> : <Lightbulb/>}<span>{benefit}</span></li>)}</ul></div></div></section>;
    })}
  </div>;
}
