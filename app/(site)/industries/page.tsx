import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  HeartPulse,
  GraduationCap,
  Building2,
  Dumbbell,
  ShoppingBag,
  Rocket,
  type LucideIcon,
} from "lucide-react";
import { demoIndustries } from "@/lib/demo-content";

export const metadata: Metadata = {
  title: "Industries We Serve",
  description:
    "Explore thoughtful social media and creative strategies for healthcare, education, real estate, fitness, e-commerce and startup brands.",
  alternates: { canonical: "/industries" },
};

const industryDetails: Record<string, { icon: LucideIcon; note: string; focus: string }> = {
  healthcare: {
    icon: HeartPulse,
    note: "Trust comes before the scroll.",
    focus: "Human, helpful communication that makes complex care feel clear and approachable.",
  },
  education: {
    icon: GraduationCap,
    note: "Make learning impossible to ignore.",
    focus: "Stories that bring your people, programs and points of view to life.",
  },
  "real-estate": {
    icon: Building2,
    note: "Help people picture what’s next.",
    focus: "Visual-first content that gives every space and opportunity a stronger story.",
  },
  fitness: {
    icon: Dumbbell,
    note: "Build a community that keeps showing up.",
    focus: "Energizing creative that captures the people and progress behind your brand.",
  },
  "e-commerce": {
    icon: ShoppingBag,
    note: "Turn a good first look into a closer one.",
    focus: "Product storytelling and campaigns that make discovery feel natural.",
  },
  startups: {
    icon: Rocket,
    note: "Give your next big idea a clear voice.",
    focus: "A flexible content foundation for ambitious brands finding their audience.",
  },
};

const principles = [
  {
    number: "01",
    title: "Start with people",
    copy: "We get to know the audience, the questions they have and what would earn their attention.",
  },
  {
    number: "02",
    title: "Find your point of view",
    copy: "Your category is context, not a template. We shape a voice and visual direction that feels like you.",
  },
  {
    number: "03",
    title: "Make it useful",
    copy: "From the first idea to the final post, every piece has a purpose and a next step in mind.",
  },
];

const heroImage =
  "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=2000&q=85";

export default function IndustriesPage() {
  const industries = demoIndustries;

  return (
    <div className="industries-page">
      <section className="industries-hero" aria-labelledby="industries-title">
        <Image
          className="industries-hero-image"
          src={heroImage}
          alt="Creative team sharing ideas around a studio table"
          fill
          priority
          sizes="100vw"
        />
        <div className="industries-hero-shade" aria-hidden="true" />
        <div className="industries-shell industries-hero-inner">
          <div className="industries-hero-copy">
            <p className="industries-kicker"><span /> Different worlds. One thoughtful approach.</p>
            <h1 id="industries-title">Your industry.<br /><em>Your kind of</em><br />good story.</h1>
            <p className="industries-hero-lede">
              We work with brands at every stage to turn what makes them different into social
              content people want to spend time with.
            </p>
            <div className="industries-hero-actions">
              <Link className="industries-button" href="#industry-list">
                Find your industry <ArrowDown size={16} aria-hidden="true" />
              </Link>
              <span>Strategy shaped around your people, not a playbook.</span>
            </div>
          </div>
          <div className="industries-hero-caption"><span>01 / 06</span><i />Thoughtful by nature</div>
        </div>
      </section>

      <section className="industries-intro" aria-label="Our industry perspective">
        <div className="industries-shell industries-intro-grid">
          <p className="industries-kicker industries-kicker-dark"><span /> No copy-and-paste plans</p>
          <h2>Every audience<br />has its own <em>language.</em></h2>
          <p>
            The right social presence looks different in every field. We take time to understand
            the culture, the customer and the moments that matter—then build creative around them.
          </p>
        </div>
      </section>

      <section className="industries-list" id="industry-list" aria-labelledby="industry-list-title">
        <div className="industries-shell">
          <div className="industries-section-head">
            <div>
              <p className="industries-kicker industries-kicker-dark"><span /> Markets we understand</p>
              <h2 id="industry-list-title">A closer look at<br /><em>who we work with.</em></h2>
            </div>
            <p>
              These are starting points, not boxes. If your business doesn’t fit neatly into one,
              that’s often where the most interesting work begins.
            </p>
          </div>

          {industries.length > 0 ? (
            <div className="industries-grid">
              {industries.map((industry, index) => {
                const details = industryDetails[industry.slug] ?? {
                  icon: Rocket,
                  note: "Let’s find your brand’s next chapter.",
                  focus: industry.description,
                };
                const Icon = details.icon;
                return (
                  <Link
                    href={`/industries/${industry.slug}`}
                    className="industry-editorial-card"
                    key={industry.id}
                  >
                    <div className="industry-card-image">
                      <Image
                        src={industry.image}
                        alt={`${industry.title} setting`}
                        fill
                        sizes="(max-width: 650px) 100vw, (max-width: 980px) 50vw, 33vw"
                      />
                      <span className="industry-card-number">0{index + 1}</span>
                      <span className="industry-card-icon"><Icon size={20} aria-hidden="true" /></span>
                      <span className="industry-card-open" aria-hidden="true"><ArrowUpRight size={18} /></span>
                    </div>
                    <div className="industry-card-copy">
                      <div className="industry-card-heading"><h3>{industry.title}</h3><span>{details.note}</span></div>
                      <p>{details.focus}</p>
                      <span className="industry-card-link">Explore the possibilities <ArrowRight size={14} aria-hidden="true" /></span>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <p className="empty-state">Tell us about your market and we’ll explore the right approach together.</p>
          )}
          <p className="industries-demo-note">Industry examples are illustrative. Every engagement is shaped around your actual audience and goals.</p>
        </div>
      </section>

      <section className="industries-approach" aria-labelledby="industries-approach-title">
        <div className="industries-shell industries-approach-grid">
          <div className="industries-approach-intro">
            <p className="industries-kicker"><span /> The Honey approach</p>
            <h2 id="industries-approach-title">Different sectors.<br /><em>Shared good sense.</em></h2>
            <p>We bring curiosity, clear thinking and care to every brief—whatever your business does.</p>
            <Link className="industries-approach-link" href="/services">See how we can help <ArrowRight size={15} /></Link>
          </div>
          <ol className="industries-principles">
            {principles.map((principle) => (
              <li key={principle.number}>
                <span>{principle.number}</span>
                <div><h3>{principle.title}</h3><p>{principle.copy}</p></div>
                <ArrowUpRight size={18} aria-hidden="true" />
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="industries-cta">
        <div className="industries-shell industries-cta-inner">
          <div><p className="industries-kicker"><span /> Your market is yours</p><h2>Let’s make your<br /><em>next move matter.</em></h2></div>
          <div className="industries-cta-copy"><p>Bring us the big picture, the messy middle or just a question. We’ll find a thoughtful place to begin.</p><Link className="industries-button industries-button-dark" href="/contact">Tell us what you’re building <ArrowRight size={16} /></Link></div>
          <span className="industries-cta-mark" aria-hidden="true">H.</span>
        </div>
      </section>
    </div>
  );
}
