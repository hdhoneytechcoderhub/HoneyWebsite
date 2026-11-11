import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  ChartNoAxesColumnIncreasing,
  Check,
  Coffee,
  Gift,
  Heart,
  MessageSquareText,
  PenTool,
  Rocket,
  Sprout,
  Star,
  Users,
  UserRoundSearch,
  Video,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { CareerJobs } from "@/components/career-jobs";
import {
  careerImages,
  careerPerks,
  cultureFeatures,
  hiringSteps,
  type CareerIcon,
} from "@/lib/careers-content";

export const metadata = {
  title: "Careers",
  description:
    "Explore illustrative career openings at Honey Media House, a creative team focused on learning, collaboration and growth.",
};

const careerIcons: Record<CareerIcon, LucideIcon> = {
  chat: MessageSquareText,
  users: Users,
  learn: Sprout,
  chart: ChartNoAxesColumnIncreasing,
  heart: Heart,
  calendar: CalendarDays,
  gift: Gift,
  coffee: Coffee,
  star: Star,
  apply: PenTool,
  screen: UserRoundSearch,
  interview: Video,
  check: Check,
  rocket: Rocket,
};

const heroHighlights = [
  { icon: Users, text: "Creative Work Culture" },
  { icon: Sprout, text: "Learning & Growth Opportunities" },
  { icon: Star, text: "Work on Real Projects" },
  { icon: Heart, text: "Supportive Team Environment" },
];

export default function Careers() {
  return (
    <>
      <section className="career-hero">
        <div className="career-hero-image">
          <Image
            src={careerImages.team}
            alt="Illustrative stock photograph of a diverse team collaborating around a laptop"
            fill
            priority
            sizes="(max-width: 760px) 100vw, 58vw"
          />
        </div>
        <div className="career-hero-wash" aria-hidden="true" />
        <div className="container career-hero-inner">
          <div className="career-hero-copy">
            <p className="eyebrow">Careers at Honey Media House</p>
            <h1>
              Build Your Career
              <br />
              <span>With Purpose</span>
            </h1>
            <p className="career-hero-lead">
              At Honey Media House, we don’t just work on brands, we build people, ideas and brighter
              futures. Join a team that values creativity, learning and real growth.
            </p>
            <div className="hero-actions">
              <Link className="button" href="#open-positions">
                Explore Open Positions <ArrowRight size={16} />
              </Link>
              <Link className="button button-outline" href="#life-at-honey">
                Life at Honey
              </Link>
            </div>
            <ul className="career-hero-highlights">
              {heroHighlights.map(({ icon: Icon, text }) => (
                <li key={text}>
                  <Icon aria-hidden="true" />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
            <p className="career-image-note">Illustrative team photography — not identified Honey Media House employees.</p>
          </div>
        </div>
      </section>

      <section className="section career-culture" id="life-at-honey">
        <div className="container career-culture-layout">
          <div className="career-culture-image">
            <Image
              src={careerImages.culture}
              alt="Warm, sunlit office workspace with plants and a collaborative meeting table"
              fill
              sizes="(max-width: 760px) 100vw, 46vw"
            />
          </div>
          <div className="career-culture-copy">
            <p className="eyebrow">Our Culture</p>
            <h2 className="section-title">Where Ideas, People &amp; Growth Come Together</h2>
            <p>
              We are a young and passionate team that believes in collaboration, creativity and
              continuous learning. Here, you get the freedom to share ideas, take ownership and grow
              your skills while working on exciting real-world projects.
            </p>
            <ul className="career-culture-features">
              {cultureFeatures.map((feature) => {
                const Icon = careerIcons[feature.icon];
                return (
                  <li key={feature.title}>
                    <Icon aria-hidden="true" />
                    <span>{feature.title}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      <section className="section career-openings" id="open-positions">
        <div className="container">
          <div className="career-section-heading">
            <div>
              <p className="eyebrow">Open Positions</p>
              <h2 className="section-title">Current Job Openings</h2>
              <p>Find the right opportunity and become a part of our growing team.</p>
            </div>
          </div>
          <p className="career-openings-notice">All roles shown are illustrative demo openings, not confirmed hiring opportunities.</p>
          <CareerJobs />
        </div>
      </section>

      <section className="section career-perks">
        <div className="container career-perks-layout">
          <div className="career-perks-intro">
            <p className="eyebrow">Why Join Us</p>
            <h2 className="section-title">Perks &amp; Benefits</h2>
            <p>We believe happy people create great work. Here’s what you get at Honey Media House.</p>
            <small>Sample copy — please confirm benefits before publication.</small>
          </div>
          <ul className="career-perks-grid">
            {careerPerks.map((perk) => {
              const Icon = careerIcons[perk.icon];
              return (
                <li key={perk.title}>
                  <Icon aria-hidden="true" />
                  <span>{perk.title}</span>
                  {perk.demo && <small>Sample</small>}
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="career-recruitment-section">
        <div className="container">
          <div className="career-recruitment">
            <div className="career-recruitment-image">
              <Image
                src={careerImages.recruitment}
                alt="Illustrative stock image of colleagues collaborating together on a project"
                fill
                sizes="(max-width: 760px) 100vw, 48vw"
              />
            </div>
            <div className="career-recruitment-copy">
              <p className="eyebrow">Come Grow With Us</p>
              <h2>Let’s Build Something Great Together!</h2>
              <p>If you’re passionate, creative and ready to grow, we’d love to have you on our team.</p>
              <Link className="button" href="#open-positions">
                Apply Now <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section career-process">
        <div className="container career-process-layout">
          <div className="career-process-intro">
            <p className="eyebrow">Our Hiring Process</p>
            <h2 className="section-title">Simple &amp; Transparent</h2>
            <p>A smooth process to get you started with us.</p>
          </div>
          <ol className="career-process-steps">
            {hiringSteps.map((step) => {
              const Icon = careerIcons[step.icon];
              return (
                <li key={step.number}>
                  <span className="career-process-icon"><Icon aria-hidden="true" /></span>
                  <span className="career-process-number">{step.number}</span>
                  <span className="career-process-title">{step.title}</span>
                </li>
              );
            })}
          </ol>
        </div>
      </section>
    </>
  );
}
