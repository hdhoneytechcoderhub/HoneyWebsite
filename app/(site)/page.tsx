import Image from "next/image";
import Link from "next/link";
import {
  ArrowDownRight, ArrowRight, ArrowUpRight, BarChart3, Camera, Check, Clapperboard,
  Instagram, Lightbulb, MessageCircle, Palette, PenTool, Sparkles, Target, UsersRound,
} from "lucide-react";
import { homepageData } from "@/lib/content";
import { HomeProjects } from "@/components/home-projects";
import { ScrollReveal } from "@/components/scroll-reveal";
import { Form } from "@/components/forms";

const offerings = [
  { title: "Social Media Management", detail: "A consistent, thoughtful presence that sounds and feels like your brand.", icon: Instagram, image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1000&q=85", slug: "social-media-management" },
  { title: "Facebook & Instagram Ads", detail: "Creative-led Facebook and Instagram ads, shaped around your audience.", icon: Target, image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=85", slug: "facebook-instagram-ads" },
  { title: "Reels & Short-Form Video", detail: "Scroll-stopping stories built for the way people discover brands today.", icon: Clapperboard, image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1000&q=85", slug: "content-strategy" },
  { title: "Creative & Content", detail: "A cohesive visual world, from campaign concepts to everyday content.", icon: Palette, image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1000&q=85", slug: "content-strategy" },
  { title: "Influencer Partnerships", detail: "Creator collaborations chosen for genuine audience fit and shared values.", icon: UsersRound, image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1000&q=85", slug: "social-media-management" },
  { title: "Analytics & Reporting", detail: "Clear direction and useful reporting—so the next move has a reason.", icon: BarChart3, image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=85", slug: "analytics-reporting" },
];

const process = [
  { title: "Listen", description: "We start with your goals, audience and what makes your brand yours.", icon: MessageCircle },
  { title: "Find the story", description: "Together, we shape a clear point of view and a practical plan.", icon: Lightbulb },
  { title: "Make & launch", description: "Our team turns the strategy into distinctive, channel-ready work.", icon: Camera },
  { title: "Learn & refine", description: "We review what resonates, share what we learn and improve the next move.", icon: BarChart3 },
];

const faqs = [
  { question: "Which platforms do you work with?", answer: "We can discuss Instagram, Facebook and other relevant channels based on your audience, content and goals." },
  { question: "Can you help with short-form video and Reels?", answer: "Yes. Reels and short-form video are part of the social and content services we can scope together." },
  { question: "Do you offer paid social advertising?", answer: "Facebook and Instagram campaign planning and management can be included as part of an agreed service scope." },
  { question: "How do we get started?", answer: "Send a note through the enquiry form or contact us directly. We’ll learn what you’re working toward and discuss possible next steps." },
];

const demoImage = "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1500&q=85";

const whyUs = [
  { title: "Strategy before scrolls", text: "Every post and campaign starts with a reason to exist.", icon: Target },
  { title: "Creative with character", text: "Distinctive work that feels like you, not the algorithm.", icon: Palette },
  { title: "Clear-eyed learning", text: "Useful reporting, honest conversations, better next steps.", icon: BarChart3 },
];

export default async function Home() {
  const data = await homepageData();
  const whatsapp = typeof data.settings.whatsappNumber === "string" ? data.settings.whatsappNumber.replace(/[^+\d]/g, "").replace(/^\+/, "") : "";
  
  return <>
    <section className="studio-hero" aria-labelledby="studio-title">
      <div className="studio-hero-image"><Image src={demoImage} alt="Sunlit creative studio with a shared table and thoughtful details" fill priority sizes="100vw" /></div>
      <div className="studio-hero-grain" aria-hidden="true" />
      <div className="studio-hero-shade" aria-hidden="true" />
      <div className="studio-hero-inner">
        <div className="studio-hero-copy">
          <p className="studio-kicker"><span /> Independent social media & creative studio</p>
          <h1 id="studio-title">Make your<br />brand <em>impossible</em><br />to scroll past.</h1>
          <p className="studio-hero-lede">We turn good businesses into brands people want to follow—with thoughtful social strategy, standout creative and content made to connect.</p>
          <div className="studio-hero-actions"><Link className="studio-button" href="/contact">Let’s make a little noise <ArrowUpRight size={17}/></Link><Link className="studio-hero-link" href="/work">See the creative work <ArrowDownRight size={16}/></Link></div>
        </div>
        <div className="studio-hero-index" aria-hidden="true"><span>01 / 04</span><i /></div>
        <a className="studio-scroll-cue" href="#approach"><span>Scroll to explore</span><ArrowDownRight size={15}/></a>
        <span className="studio-orbit orbit-one" aria-hidden="true"><Instagram size={21}/></span>
        <span className="studio-orbit orbit-two" aria-hidden="true"><Sparkles size={19}/></span>
        <span className="studio-orbit orbit-three" aria-hidden="true"><Clapperboard size={18}/></span>
      </div>
      <div className="studio-hero-edge"><span>HONEY MEDIA HOUSE</span><span>STRATEGY · SOCIAL · CREATIVE</span></div>
    </section>

    <section className="studio-manifesto" id="approach"><div className="studio-shell studio-manifesto-grid"><p className="studio-kicker studio-kicker-dark">A little less noise.<br/>A lot more <span>meaning.</span></p><h2>We make the internet feel a little more <em>human.</em></h2><p>Good marketing isn’t louder. It’s the right idea, told with care, to the people who need to hear it. We bring strategy and creative together so your brand shows up with intention.</p><a href="#studio-services" className="studio-round-link" aria-label="Explore our services"><ArrowDownRight size={19}/></a></div></section>

    <section className="studio-services" id="studio-services"><div className="studio-shell"><div className="studio-section-head"><div><p className="studio-kicker studio-kicker-dark">What we do</p><h2>Small details.<br/><em>Big feelings.</em></h2></div><div><p>From the first spark to the final edit, we help your brand find its people—and give them a reason to stay.</p><Link className="studio-underlink" href="/services">Explore every service <ArrowRight size={15}/></Link></div></div>
      <div className="studio-service-grid">{offerings.map((service, index) => { const Icon = service.icon; return <ScrollReveal className={`studio-service-reveal reveal-delay-${index % 3}`} key={service.title}><Link className="studio-service-card" href={`/contact?service=${encodeURIComponent(service.title)}`}><div className="studio-service-photo"><Image src={service.image} alt="" fill sizes="(max-width:720px) 100vw, 33vw"/><span className="studio-service-no">0{index + 1}</span><span className="studio-service-arrow"><ArrowUpRight size={18}/></span></div><div className="studio-service-copy"><Icon size={19}/><h3>{service.title}</h3><p>{service.detail}</p></div></Link></ScrollReveal>; })}</div>
    </div></section>

    <section className="studio-manifesto studio-marquee-band" aria-label="Our creative principles"><div className="studio-marquee" aria-hidden="true"><span>MAKE IT MEAN SOMETHING <i>✳</i> MAKE IT MEAN SOMETHING <i>✳</i> MAKE IT MEAN SOMETHING <i>✳</i> </span></div><p>Curiosity first. People always. Good work, no shortcuts.</p></section>

    <section className="studio-work"><div className="studio-shell"><div className="studio-section-head studio-work-head"><div><p className="studio-kicker studio-kicker-dark">A peek at the possibilities</p><h2>Made to move<br/><em>people.</em></h2></div><div><p>Every brand has a story worth telling. Here are a few creative directions from the Honey Media House studio.</p><span className="studio-sample-label"><Sparkles size={14}/> Concept work · illustrative, not client case studies</span></div></div><HomeProjects projects={data.projects}/></div></section>

    <section className="studio-proof"><div className="studio-shell studio-proof-inner"><div className="studio-proof-mark" aria-hidden="true"><PenTool size={24}/></div><p className="studio-kicker">No borrowed wins</p><h2>Our work should speak for itself.<br/><em>Our numbers should tell the truth.</em></h2><p>We’re building our body of client work. Until we can share verified campaign results and genuine client words, we’ll show you what we can create—not pretend we’ve done what we haven’t.</p><Link className="studio-proof-link" href="/work">Explore our concept work <ArrowRight size={16}/></Link></div></section>

    <section className="studio-process"><div className="studio-shell"><div className="studio-process-head"><p className="studio-kicker studio-kicker-dark">A thoughtful way to work</p><h2>From first thought<br/>to <em>that’s the one.</em></h2></div><div className="studio-process-grid">{process.map((item,index)=>{const Icon=item.icon;return <ScrollReveal className={`studio-process-step reveal-delay-${index%3}`} key={item.title}><span className="studio-process-index">0{index+1}</span><span className="studio-process-icon"><Icon size={21}/></span><h3>{item.title}</h3><p>{item.description}</p></ScrollReveal>})}</div></div></section>

    <section className="studio-why"><div className="studio-shell studio-why-grid"><div className="studio-why-intro"><p className="studio-kicker">The good stuff</p><h2>Small enough<br/>to <em>care.</em><br/>Big enough<br/>to deliver.</h2><p>Thoughtful partnership, senior attention and ideas made for your brand—not a cookie-cutter playbook.</p></div>{whyUs.map((item,index)=>{const Icon=item.icon;return <article key={item.title}><span>0{index+1}</span><Icon size={22}/><h3>{item.title}</h3><p>{item.text}</p></article>})}</div></section>

    <section className="studio-faq"><div className="studio-shell studio-faq-grid"><div><p className="studio-kicker studio-kicker-dark">Good questions</p><h2>Wondering<br/>about <em>something?</em></h2><p>We like a good conversation. If you’re curious about working together, let’s talk.</p><Link className="studio-underlink" href="/contact">Ask us anything <ArrowRight size={15}/></Link></div><div className="studio-faq-list">{faqs.map((faq,index)=><details className="studio-faq-item" key={faq.question}><summary><span>0{index+1}</span>{faq.question}<i>+</i></summary><p>{faq.answer}</p></details>)}</div></div></section>

    <section className="studio-contact" id="contact"><div className="studio-contact-backdrop" aria-hidden="true"/><div className="studio-shell studio-contact-grid"><div className="studio-contact-copy"><p className="studio-kicker">Your next good idea starts here</p><h2>Let’s make<br/>something <em>matter.</em></h2><p>Tell us where you want to go. We’ll bring an open mind, a few good questions and a fresh pot of ideas.</p>{whatsapp&&<a className="studio-contact-whatsapp" href={`https://wa.me/${whatsapp}`} target="_blank" rel="noreferrer">Or say hello on WhatsApp <ArrowUpRight size={15}/></a>}<span className="studio-contact-note"><Check size={14}/> A real team. A real conversation. No pressure.</span></div><div className="studio-contact-form"><p className="studio-kicker studio-kicker-dark">Start a conversation</p><h3>Tell us a little about it.</h3><Form kind="enquiry" source="contact"/></div></div><div className="studio-contact-footer"><span>HONEY MEDIA HOUSE © {new Date().getFullYear()}</span><Link href="/contact">GOOD THINGS START WITH HELLO <ArrowUpRight size={14}/></Link></div></section>
  </>;
}
