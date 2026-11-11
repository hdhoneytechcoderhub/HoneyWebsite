import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  ChartNoAxesCombined,
  Check,
  CodeXml,
  Lightbulb,
  PanelsTopLeft,
  Settings2,
  Share2,
  Users,
  UsersRound,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { demoIndustries, demoProcessSteps, demoServices, demoSettings } from "@/lib/demo-content";

const icons: Record<string, LucideIcon> = {
  ChartNoAxesCombined,
  CodeXml,
  Share2,
  UsersRound,
  Users,
  TrendingUp,
  PanelsTopLeft,
  Settings2,
};
const processDescriptions = [
  "Understand your goals and business needs.",
  "Create a tailored roadmap for growth.",
  "Design, develop and craft the solution.",
  "Go live with precision and planning.",
  "Track, analyze and improve performance.",
  "Scale your business to new heights.",
];
const demoStats = [
  { value: "10+", label: "Happy Clients" },
  { value: "25+", label: "Projects Completed" },
  { value: "5+", label: "Industries Served" },
  { value: "1+", label: "Years of Journey" },
];
const processIcons: LucideIcon[] = [Lightbulb, ChartNoAxesCombined, PanelsTopLeft, ArrowUpRight, TrendingUp, UsersRound];
const photos = {
  hero: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1900&q=85",
  process: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1000&q=85",
  cta: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1800&q=85",
};

export function ServicesPage() {
  const configuredStats = demoSettings.heroStats;
  const stats = configuredStats.some((stat) => stat.value.trim())
    ? configuredStats.filter((stat) => stat.value.trim() && stat.label.trim()).slice(0, 4)
    : demoStats;
  const whatsapp = demoSettings.whatsappNumber.replace(/[^+\d]/g, "");

  return <div className="services-page">
    <section className="services-hero" aria-labelledby="services-title">
      <div className="services-hero-image"><Image src={photos.hero} alt="Warm creative studio workspace with a shared planning table" fill priority sizes="(max-width: 760px) 100vw, 60vw" /></div>
      <div className="services-hero-wash" aria-hidden="true" />
      <div className="container services-hero-inner">
        <div className="services-hero-copy">
          <p className="eyebrow">Our Services</p>
          <h1 id="services-title">Strategic Solutions<br />for <span>Your Growth</span></h1>
          <p>From branding to lead generation, we provide end-to-end digital solutions to help your business grow and create new opportunities.</p>
          <div className="services-hero-actions">
            <Link className="button" href="/contact">Get a Free Consultation <ArrowRight size={16} /></Link>
            <Link className="button button-outline" href="/work">View Our Work</Link>
          </div>
          <div className="services-stats" aria-label="Illustrative company statistics">
            {stats.map((stat, index) => <div className="services-stat" key={`${stat.label}-${index}`}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}
          </div>
          <p className="services-demo-note">Illustrative figures for design preview — replace with verified statistics.</p>
        </div>
      </div>
    </section>

    <section className="section services-catalogue" aria-labelledby="services-catalogue-title">
      <div className="container">
        <div className="services-section-heading">
          <div><p className="eyebrow">Our Services</p><h2 className="section-title" id="services-catalogue-title">Everything You Need to Build, Grow &amp; Scale Your Brand</h2></div>
          <div className="services-heading-aside"><p>We combine strategy, creativity and technology to deliver solutions that create real business impact.</p><Link className="button button-outline" href="/contact">Discuss Your Requirements <ArrowRight size={15} /></Link></div>
        </div>
        <div className="services-catalogue-grid">
          {demoServices.map((service, index) => {
            const Icon = icons[service.icon] ?? Lightbulb;
            return <article className="services-catalogue-card" key={service.id}>
              <Link className="services-card-image" href={`/services/${service.slug}`} aria-label={`Learn more about ${service.title}`}>
                <Image src={service.image} alt={`Illustrative image representing ${service.title.toLowerCase()} services`} fill sizes="(max-width: 620px) 100vw, (max-width: 1120px) 50vw, 25vw" />
                <span className="services-card-number">{String(index + 1).padStart(2, "0")}</span>
              </Link>
              <div className="services-card-copy">
                <Icon className="services-card-icon" aria-hidden="true" />
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <ul>{service.deliverables.slice(0, 3).map((item) => <li key={item}><Check aria-hidden="true" />{item}</li>)}</ul>
                <Link className="services-know-more" href={`/services/${service.slug}`}>Know More <ArrowRight size={15} /></Link>
              </div>
            </article>;
          })}
        </div>
      </div>
    </section>

    <section className="section services-process" aria-labelledby="services-process-title">
      <div className="container">
        <div className="services-process-heading"><p className="eyebrow">Our Process</p><h2 className="section-title" id="services-process-title">From Strategy to Success</h2><p>A simple and transparent process to ensure the best results for your business.</p></div>
        <div className="services-process-layout">
          <ol className="services-process-steps">
            {demoProcessSteps.map((step, index) => {
              const Icon = processIcons[index] ?? Lightbulb;
              return <li key={step.id}><span className="services-process-icon"><Icon aria-hidden="true" /></span><span className="services-process-number">{String(index + 1).padStart(2, "0")}</span><h3>{step.title}</h3><p>{processDescriptions[index]}</p></li>;
            })}
          </ol>
          <div className="services-process-image"><Image src={photos.process} alt="Illustrative bright office workspace prepared for planning and collaboration" fill sizes="(max-width: 760px) 100vw, 28vw" /></div>
        </div>
      </div>
    </section>

    <section className="section services-industries" aria-labelledby="services-industries-title">
      <div className="container">
        <div className="services-industries-heading"><div><p className="eyebrow">Industries We Serve</p><h2 className="section-title" id="services-industries-title">Solutions for Every Industry</h2></div><div><p>We understand every industry is different. Our strategies are customized to your business needs.</p><Link className="button button-outline" href="/industries">View All Industries <ArrowRight size={15} /></Link></div></div>
        <div className="services-industries-grid">
          {demoIndustries.slice(0, 6).map((industry) => <Link className="services-industry-card" href={`/industries/${industry.slug}`} key={industry.id}>
            <Image src={industry.image} alt={`Illustrative ${industry.title.toLowerCase()} industry image`} width={600} height={430} sizes="(max-width: 620px) 45vw, (max-width: 980px) 30vw, 16vw" />
            <span>{industry.title}</span><span className="services-industry-arrow" aria-hidden="true"><ArrowRight size={15} /></span>
          </Link>)}
        </div>
      </div>
    </section>

    <section className="services-cta-wrap">
      <div className="container">
        <div className="services-cta" style={{ backgroundImage: `url("${photos.cta}")` }}>
          <div className="services-cta-copy"><h2>Let’s Build Something Great Together!</h2><p>Share your goals with us and get a free consultation.</p><div className="services-cta-actions"><Link className="button" href="/book-strategy-call">Book a Free Strategy Call <ArrowRight size={16} /></Link>{whatsapp && <a className="button button-light" href={`https://wa.me/${whatsapp.replace(/^\+/, "")}`} target="_blank" rel="noreferrer">Chat on WhatsApp</a>}</div></div>
          <ul className="services-cta-points"><li><Lightbulb aria-hidden="true" /><span>Creative Ideas</span></li><li><Settings2 aria-hidden="true" /><span>Practical Strategies</span></li><li><TrendingUp aria-hidden="true" /><span>Real Growth</span></li></ul>
        </div>
      </div>
    </section>
  </div>;
}
