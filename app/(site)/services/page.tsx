import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BarChart3, Clapperboard, Instagram, Lightbulb, Palette, Target, UsersRound } from "lucide-react";

export const metadata: Metadata = {
  title: "Social Media Services",
  description: "Social media management, Instagram campaigns, paid social, Reels, creative production, influencer partnerships and performance reporting from Honey Media House.",
  alternates: { canonical: "/services" },
};

const services = [
  { title: "Social Media Management", icon: Instagram, description: "A thoughtful, consistent presence—planned around your brand voice, community and business goals.", details: ["Monthly content planning", "Publishing and community support", "Content calendar & review"] },
  { title: "Instagram Marketing", icon: Target, description: "A distinct Instagram presence that brings your visual world, Stories and audience together.", details: ["Profile & audience strategy", "Feed, Stories and Highlights", "Organic growth direction"] },
  { title: "Facebook & Instagram Ads", icon: BarChart3, description: "Campaign thinking and creative built for Meta audiences, with clear measurement from the start.", details: ["Campaign planning & setup", "Creative and audience testing", "Performance review"] },
  { title: "Reels & Short-Form Video", icon: Clapperboard, description: "Short-form video concepts made to catch the eye and make your brand memorable.", details: ["Creative concepts & scripts", "Reels planning and production", "Platform-ready edits"] },
  { title: "Creative Design & Content Production", icon: Palette, description: "A cohesive visual identity in motion, from everyday posts to the campaign moment.", details: ["Social-first design systems", "Post and campaign creative", "Copy and content direction"] },
  { title: "Influencer Marketing", icon: UsersRound, description: "Creator partnerships selected for relevance, fit and shared audience—not follower count alone.", details: ["Creator research & shortlisting", "Partnership coordination", "Campaign recap"] },
  { title: "Social Media Strategy", icon: Lightbulb, description: "An actionable plan that connects your audience, platform choices and creative point of view.", details: ["Audience & channel review", "Content pillars & tone", "Campaign roadmap"] },
  { title: "Analytics & Performance Reporting", icon: BarChart3, description: "Straightforward reporting that turns performance signals into useful next steps.", details: ["Platform performance review", "Campaign insights", "Clear monthly reporting"] },
];

export default function Services() {
  return <div className="agency-services">
    <section className="agency-services-hero"><div className="studio-shell"><p className="studio-kicker studio-kicker-dark">What we bring to the feed</p><h1>Good strategy.<br/><em>Good-looking work.</em><br/>Good things happen.</h1><p>Social media isn’t one-size-fits-all. We help brands find a point of view, make creative people care about, and show up consistently where it counts.</p><div className="agency-service-tags"><span><Instagram size={15}/> Instagram</span><span><Clapperboard size={15}/> Short-form video</span><span><Target size={15}/> Paid social</span><span><Palette size={15}/> Creative</span></div></div></section>
    <section className="agency-services-list"><div className="studio-shell"><div className="agency-services-heading"><div><p className="studio-kicker studio-kicker-dark">A studio, not a checklist</p><h2>Pick what you need.<br/><em>Make it yours.</em></h2></div><p>Bring us in for one focused project or let’s build a rhythm together. We’ll shape a scope around your priorities.</p></div><div className="agency-services-grid">{services.map(({title,icon:Icon,description,details},index)=><article className="agency-service-item" key={title}><div className="agency-service-top"><span>0{index+1}</span><Icon size={23}/></div><h3>{title}</h3><p>{description}</p><ul>{details.map(detail=><li key={detail}>{detail}</li>)}</ul><Link href={`/contact?service=${encodeURIComponent(title)}`}>Let’s talk about it <ArrowRight size={14}/></Link></article>)}</div></div></section>
    <section className="agency-services-cta"><div className="studio-shell"><div><p className="studio-kicker">No hard sell. Just a good conversation.</p><h2>Not sure what your brand needs yet?</h2><p>That’s a perfectly good place to start. Tell us what you’re working on and we’ll figure out the right first step together.</p></div><Link className="studio-button" href="/contact">Tell us what you’re building <ArrowRight size={16}/></Link></div></section>
  </div>;
}
