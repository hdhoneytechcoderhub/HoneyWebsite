import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Lightbulb, Target, UsersRound } from "lucide-react";

const benefits = [
  { title: "Grow Your Brand", icon: Target },
  { title: "Build Your Career", icon: UsersRound },
  { title: "Create New Opportunities", icon: Lightbulb },
];

export function SiteConversionCTA() {
  return (
    <section className="site-conversion" aria-labelledby="site-conversion-title">
      <Image
        className="site-conversion-image"
        src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1800&q=85"
        alt=""
        fill
        sizes="(max-width: 760px) calc(100vw - 36px), 1280px"
      />
      <div className="site-conversion-shade" aria-hidden="true" />
      <div className="site-conversion-grid">
        <div className="site-conversion-copy">
          <p className="site-conversion-kicker">Let’s build something together</p>
          <h2 id="site-conversion-title">Let’s Create Something Great Together!</h2>
          <p>Whether you’re a business looking to grow or an individual looking for the right opportunity — we’re here to help.</p>
          <Link className="button" href="/contact">
            Let’s talk about your goals <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <ul className="site-conversion-benefits" aria-label="How Honey Media House can help">
          {benefits.map(({ title, icon: Icon }) => (
            <li key={title}><Icon aria-hidden="true" /><span>{title}</span></li>
          ))}
        </ul>
      </div>
    </section>
  );
}