import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight, CalendarDays, ChartNoAxesColumnIncreasing, Check, Coffee, Gift, Heart,
  MessageSquareText, PenTool, Rocket, Sprout, Star, Users, UserRoundSearch, Video,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { CareerJobs } from "@/components/career-jobs";
import {
  careerImages, careerPerks, cultureFeatures, hiringSteps, type CareerIcon,
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
  return <>
    <section className="cr-hero" aria-labelledby="cr-title">
      <div className="cr-shell cr-hero-grid">
        <div className="cr-hero-copy">
          <p className="cr-kicker">Careers at Honey Media House</p>
          <h1 id="cr-title">Build Your Career<br /><span>With Purpose</span></h1>
          <p className="cr-lead">At Honey Media House, we don’t just work on brands, we build people, ideas and brighter futures. Join a team that values creativity, learning and real growth.</p>
          <div className="cr-actions">
            <Link className="cr-btn" href="#open-positions">Explore Open Positions <ArrowRight size={15} /></Link>
            <Link className="cr-btn cr-btn-ghost" href="#life-at-honey">Life at Honey</Link>
          </div>
          <ul className="cr-hero-points">
            {heroHighlights.map(({ icon: Icon, text }) => <li key={text}><Icon size={17} aria-hidden="true" /><span>{text}</span></li>)}
          </ul>
          <p className="cr-note">Illustrative team photography — not identified Honey Media House employees.</p>
        </div>
        <div className="cr-hero-media">
          <Image src={careerImages.team} alt="Illustrative stock photograph of a team collaborating around a laptop" fill priority sizes="(max-width:980px) 100vw, 48vw" />
          <Image className="cr-hero-mark" src="/images/honey-media-house-mark.svg" alt="" width={58} height={72} />
        </div>
      </div>
    </section>

    <section className="cr-culture" id="life-at-honey" aria-labelledby="cr-culture-title">
      <div className="cr-shell cr-culture-grid">
        <div className="cr-culture-media">
          <Image src={careerImages.culture} alt="Warm, sunlit workspace with plants and a shared meeting table" fill sizes="(max-width:980px) 100vw, 46vw" />
          <Image className="cr-culture-mark" src="/images/honey-media-house-mark.svg" alt="" width={54} height={68} />
        </div>
        <div className="cr-culture-copy">
          <p className="cr-kicker">Our Culture</p>
          <h2 id="cr-culture-title">Where Ideas, People &amp; Growth Come Together</h2>
          <p>We are a young and passionate team that believes in collaboration, creativity and continuous learning. Here, you get the freedom to share ideas, take ownership and grow your skills while working on exciting real-world projects.</p>
          <ul className="cr-culture-features">
            {cultureFeatures.map(feature => {
              const Icon = careerIcons[feature.icon];
              return <li key={feature.title}><Icon size={18} aria-hidden="true" /><span>{feature.title}</span></li>;
            })}
          </ul>
        </div>
      </div>
    </section>

    <section className="cr-openings" id="open-positions" aria-labelledby="cr-openings-title">
      <div className="cr-shell">
        <div className="cr-openings-head">
          <div>
            <p className="cr-kicker">Open Positions</p>
            <h2 id="cr-openings-title">Current Job Openings</h2>
            <p>Find the right opportunity and become a part of our growing team.</p>
          </div>
        </div>
        <p className="cr-notice">All roles shown are illustrative demo openings, not confirmed hiring opportunities.</p>
        <CareerJobs />
      </div>
    </section>

    <section className="cr-perks" aria-labelledby="cr-perks-title">
      <div className="cr-shell cr-perks-layout">
        <div className="cr-perks-intro">
          <p className="cr-kicker">Why Join Us</p>
          <h2 id="cr-perks-title">Perks &amp; Benefits</h2>
          <p>We believe happy people create great work. Here’s what you get at Honey Media House.</p>
          <small>Sample copy — please confirm benefits before publication.</small>
        </div>
        <ul className="cr-perks-grid">
          {careerPerks.map(perk => {
            const Icon = careerIcons[perk.icon];
            return <li key={perk.title}><Icon size={20} aria-hidden="true" /><span>{perk.title}</span></li>;
          })}
        </ul>
      </div>
    </section>

    <section className="cr-cta-section" aria-labelledby="cr-cta-title">
      <div className="cr-shell">
        <div className="cr-cta">
          <div className="cr-cta-media">
            <Image src={careerImages.recruitment} alt="Illustrative stock image of colleagues collaborating on a project" fill sizes="(max-width:980px) 100vw, 44vw" />
            <Image className="cr-cta-mark" src="/images/honey-media-house-mark.svg" alt="" width={54} height={68} />
          </div>
          <div className="cr-cta-copy">
            <p className="cr-kicker">Come Grow With Us</p>
            <h2 id="cr-cta-title">Let’s Build Something Great Together!</h2>
            <p>If you’re passionate, creative and ready to grow, we’d love to have you on our team.</p>
            <Link className="cr-btn" href="#open-positions">Apply Now <ArrowRight size={15} /></Link>
          </div>
        </div>
      </div>
    </section>

    <section className="cr-process" aria-labelledby="cr-process-title">
      <div className="cr-shell cr-process-grid">
        <div className="cr-process-intro">
          <p className="cr-kicker">Our Hiring Process</p>
          <h2 id="cr-process-title">Simple &amp; Transparent</h2>
          <p>A smooth process to get you started with us.</p>
        </div>
        <ol className="cr-steps">
          {hiringSteps.map(step => {
            const Icon = careerIcons[step.icon];
            return <li key={step.number}>
              <span className="cr-step-icon"><Icon size={17} aria-hidden="true" /></span>
              <span className="cr-step-num">{step.number}</span>
              <span className="cr-step-title">{step.title}</span>
            </li>;
          })}
        </ol>
      </div>
    </section>
  </>;
}
