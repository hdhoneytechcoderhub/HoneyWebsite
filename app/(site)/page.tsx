import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight, ArrowUpRight, BarChart3, Code2, LayoutPanelLeft, LineChart, MessageCircle,
  Palette, Play, Quote, Settings2, Share2, Target, TrendingUp, Users, UsersRound,
} from "lucide-react";
import { homepageData } from "@/lib/content";
import { HomeProjects } from "@/components/home-projects";

const heroImage = "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=85";
const ctaImage = "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1600&q=85";
const processImage = "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=900&q=85";

const serviceIcons = {
  "digital-marketing": LineChart,
  "it-solutions": Code2,
  "social-media-management": Share2,
  "lead-generation": UsersRound,
  "hr-solutions": Users,
  "sales-business-growth": TrendingUp,
  "content-strategy": LayoutPanelLeft,
  "operations-consulting": Settings2,
} as const;

const whyCards = [
  { title: "Tailored Strategies", text: "A plan shaped around your business goals, not a template.", icon: Target },
  { title: "Data-Driven Approach", text: "Decisions reviewed against the numbers that matter to you.", icon: BarChart3 },
  { title: "Creative Execution", text: "Work with a clear point of view and a consistent look.", icon: Palette },
  { title: "Measurable Results", text: "Reporting you can read, with the next step made obvious.", icon: TrendingUp },
];

export default async function Home() {
  const data = await homepageData();
  const section = (key: string) => data.sections.find(item => item.key === key);
  const hero = section("hero");
  const services = section("services");
  const why = section("why");
  const industries = section("industries");
  const work = section("work");
  const process = section("process");
  const voices = section("testimonials");
  const conversion = section("conversion");
  const resources = section("resources");

  const settings = data.settings as Record<string, unknown>;
  const text = (key: string, fallback = "") => (typeof settings[key] === "string" ? (settings[key] as string) : fallback);
  const whatsapp = text("whatsappNumber").replace(/[^+\d]/g, "").replace(/^\+/, "");
  const storyVideo = text("heroVideoUrl");

  const cmsStats = Array.isArray(settings.heroStats)
    ? (settings.heroStats as { value: string; label: string }[]).filter(stat => stat?.value)
    : [];
  const stats = cmsStats.length
    ? cmsStats
    : [
        { value: String(data.services.length).padStart(2, "0"), label: "Service lines" },
        { value: String(data.industries.length).padStart(2, "0"), label: "Industries served" },
        { value: String(data.projects.length).padStart(2, "0"), label: "Portfolio concepts" },
        { value: String(data.process.length).padStart(2, "0"), label: "Process steps" },
      ];

  const heroTitle = hero?.title ?? "Creating Brands, Guiding Careers";
  const [heroLineOne = "Creating Brands", heroLineTwo = "Guiding Careers"] = heroTitle.split(",").map(part => part.trim());
  const heroWords = heroLineOne.split(" ");

  const articles = data.articles.slice(0, 3);
  const dateFormat = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" });

  return <>
    <section className="hny-hero" aria-labelledby="hny-title">
      <div className="hny-shell hny-hero-grid">
        <div className="hny-hero-copy">
          <p className="hny-kicker">{hero?.eyebrow ?? "Digital Growth Partner"}</p>
          <h1 id="hny-title">{heroWords[0]}{" "}<em>{heroWords.slice(1).join(" ")}</em><br />{" "}{heroLineTwo}</h1>
          <p className="hny-hero-services">{hero?.body ?? "Digital Marketing • IT Solutions • HR Consulting • Sales Growth • Content Strategy"}</p>
          <div className="hny-hero-actions">
            <Link className="hny-btn" href="/contact">Start Your Project <ArrowUpRight size={16} /></Link>
            <Link className="hny-btn hny-btn-ghost" href="/services">Explore Our Services <ArrowRight size={15} /></Link>
          </div>
          <ul className="hny-stats" aria-label="Company at a glance">
            {stats.slice(0, 4).map(stat => <li className="hny-stat" key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></li>)}
          </ul>
        </div>
        <div className="hny-hero-media">
          <Image src={heroImage} alt="Honey Media House studio interior with a shared table" fill priority sizes="(max-width:960px) 100vw, 46vw" />
          <Image className="hny-hero-mark" src="/images/honey-media-house-mark.svg" alt="" width={52} height={65} />
          <Link className="hny-hero-story" href={storyVideo || "/about"}>
            <span className="hny-hero-play"><Play size={13} fill="currentColor" /></span>
            <span><strong>{storyVideo ? "Watch Our Story" : "Meet The Studio"}</strong><small>Let’s build something great together</small></span>
          </Link>
        </div>
      </div>
    </section>

    <section className="hny-section hny-section-cream" aria-labelledby="hny-services-title">
      <div className="hny-shell">
        <div className="hny-head">
          <div>
            <p className="hny-kicker">{services?.eyebrow ?? "Our Services"}</p>
            <h2 id="hny-services-title">{services?.title ?? "Everything You Need to Build, Grow & Scale Your Brand"}</h2>
          </div>
          <div className="hny-head-side">
            <p>{services?.body ?? "From strategy to execution, we provide end-to-end digital, tech and business solutions."}</p>
            <Link className="hny-btn hny-btn-small" href="/services">View All Services <ArrowRight size={14} /></Link>
          </div>
        </div>
        <div className="hny-grid-4">
          {data.services.map(service => {
            const Icon = serviceIcons[service.slug as keyof typeof serviceIcons] ?? LayoutPanelLeft;
            return <Link className="hny-service" href={`/services/${service.slug}`} key={service.id}>
              <span className="hny-service-thumb">
                <Image src={service.image} alt="" fill sizes="80px" />
                <span className="hny-service-icon"><Icon size={14} /></span>
              </span>
              <span className="hny-service-body"><h3>{service.title}</h3><p>{service.description}</p></span>
            </Link>;
          })}
        </div>
      </div>
    </section>

    <section className="hny-why" aria-labelledby="hny-why-title">
      <div className="hny-shell hny-why-grid">
        <div className="hny-why-intro">
          <p className="hny-kicker">{why?.eyebrow ?? "Why Choose"}</p>
          <h2 id="hny-why-title">{why?.title ?? "Why Choose Honey Media House?"}</h2>
          <p>{why?.body ?? "We don’t just create content. We create direction, opportunities and measurable growth."}</p>
          <Link className="hny-btn" href="/about">Let’s Grow Together <ArrowRight size={15} /></Link>
        </div>
        <div className="hny-why-cards">
          {whyCards.map(item => {
            const Icon = item.icon;
            return <article key={item.title}><Icon size={20} /><h3>{item.title}</h3><p>{item.text}</p></article>;
          })}
        </div>
      </div>
    </section>

    <section className="hny-section" aria-labelledby="hny-industries-title">
      <div className="hny-shell">
        <div className="hny-head hny-head-inline">
          <div>
            <p className="hny-kicker">{industries?.eyebrow ?? "Industries We Serve"}</p>
            <h2 id="hny-industries-title">{industries?.title ?? "Customized strategies for every industry"}</h2>
          </div>
          <Link className="hny-underlink" href="/industries">View All Industries <ArrowRight size={14} /></Link>
        </div>
        <div className="hny-grid-6">
          {data.industries.map(industry => <Link className="hny-industry" href={`/industries/${industry.slug}`} key={industry.id}>
            <span className="hny-industry-photo"><Image src={industry.image} alt="" fill sizes="(max-width:900px) 50vw, 16vw" /><span className="hny-industry-arrow"><ArrowUpRight size={13} /></span></span>
            <span className="hny-industry-copy"><strong>{industry.title}</strong><small>{industry.description}</small></span>
          </Link>)}
        </div>
      </div>
    </section>

    <section className="hny-section hny-section-cream hny-work" aria-labelledby="hny-work-title">
      <div className="hny-shell">
        <div className="hny-head hny-head-inline">
          <div>
            <p className="hny-kicker">{work?.eyebrow ?? "Our Work"}</p>
            <h2 id="hny-work-title">{work?.title ?? "Brands We’ve Helped Grow"}</h2>
          </div>
          <Link className="hny-underlink" href="/work">See All Work <ArrowRight size={14} /></Link>
        </div>
        <HomeProjects projects={data.projects} />
      </div>
    </section>

    <section className="hny-section" aria-labelledby="hny-process-title">
      <div className="hny-shell">
        <div className="hny-head hny-head-inline">
          <div>
            <p className="hny-kicker">{process?.eyebrow ?? "Our Process"}</p>
            <h2 id="hny-process-title">{process?.title ?? "From Idea to Impact"}</h2>
          </div>
          <p className="hny-head-copy">{process?.body ?? "A clear, collaborative path from the first conversation to ongoing growth."}</p>
        </div>
        <div className="hny-process-wrap">
          <ol className="hny-process">
            {data.process.map((step, index) => <li key={step.id}>
              <span className="hny-process-num">{String(index + 1).padStart(2, "0")}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </li>)}
          </ol>
          <div className="hny-process-media">
            <Image src={processImage} alt="Team reviewing a growth plan together" fill sizes="(max-width:900px) 100vw, 260px" />
            <span>Turning ideas into impact</span>
          </div>
        </div>
      </div>
    </section>

    <section className="hny-section hny-section-cream" aria-labelledby="hny-voices-title">
      <div className="hny-shell">
        <div className="hny-head hny-head-inline">
          <div>
            <p className="hny-kicker">{voices?.eyebrow ?? "Client Testimonials"}</p>
            <h2 id="hny-voices-title">{voices?.title ?? "What Our Clients Say"}</h2>
          </div>
          <Link className="hny-underlink" href="/contact">Share Your Experience <ArrowRight size={14} /></Link>
        </div>
        <div className="hny-grid-3">
          {data.testimonials.slice(0, 3).map(item => <figure className="hny-quote" key={item.id}>
            <Quote size={18} />
            <blockquote><p>{item.quote}</p></blockquote>
            <figcaption>
              <span className="hny-quote-avatar" aria-hidden="true">{item.name.slice(0, 1)}</span>
              <span><strong>{item.name}</strong><small>{item.role}{item.company ? ` · ${item.company}` : ""}</small></span>
            </figcaption>
            {item.demoContent && <span className="hny-sample">Sample layout copy</span>}
          </figure>)}
        </div>
      </div>
    </section>

    <section className="hny-cta" aria-labelledby="hny-cta-title">
      <Image className="hny-cta-image" src={ctaImage} alt="" fill sizes="100vw" />
      <div className="hny-shell hny-cta-inner">
        <div>
          <p className="hny-kicker">{conversion?.eyebrow ?? "Let’s build something together"}</p>
          <h2 id="hny-cta-title">{conversion?.title ?? "Ready to Grow Your Business?"}</h2>
          <p>{conversion?.body ?? "Let’s create a custom digital marketing strategy for your goals."}</p>
        </div>
        <div className="hny-cta-actions">
          <Link className="hny-btn" href="/book-strategy-call">Book a Free Strategy Call <ArrowRight size={15} /></Link>
          <Link className="hny-btn hny-btn-light" href={whatsapp ? `https://wa.me/${whatsapp}` : "/contact"} {...(whatsapp ? { target: "_blank", rel: "noreferrer" } : {})}>
            <MessageCircle size={15} /> Chat on WhatsApp
          </Link>
        </div>
      </div>
    </section>

    <section className="hny-section hny-journal" aria-labelledby="hny-journal-title">
      <div className="hny-shell">
        <div className="hny-head hny-head-inline">
          <div>
            <p className="hny-kicker">{resources?.eyebrow ?? "Resources"}</p>
            <h2 id="hny-journal-title">{resources?.title ?? "Latest Insights, Guides & Growth Tips"}</h2>
          </div>
          <Link className="hny-underlink" href="/resources">View All Articles <ArrowRight size={14} /></Link>
        </div>
        <div className="hny-grid-3">
          {articles.map(article => <Link className="hny-article" href={`/resources/${article.slug}`} key={article.id}>
            <span className="hny-article-photo"><Image src={article.image} alt="" fill sizes="(max-width:900px) 100vw, 33vw" /></span>
            <span className="hny-article-copy">
              <small>{article.category.name}</small>
              <h3>{article.title}</h3>
              <p>{article.excerpt}</p>
              <span className="hny-article-meta"><time dateTime={new Date(article.publishedAt).toISOString()}>{dateFormat.format(new Date(article.publishedAt))}</time><b>Read More <ArrowRight size={12} /></b></span>
            </span>
          </Link>)}
        </div>
      </div>
    </section>
  </>;
}
