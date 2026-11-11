"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import {
  ArrowRight, ArrowUpRight, CalendarDays, Check, ChevronDown, Lightbulb,
  Mail, MapPin, MessageCircle, MessageSquareText, Phone, Send, Settings2,
  TrendingUp, UserRound, UsersRound, Workflow,
} from "lucide-react";
import { contactFaqs, contactPhotos, demoServices, demoSettings } from "@/lib/demo-content";

const services = [
  "Social Media Management", "Instagram Marketing", "Facebook & Instagram Ads",
  "Reels & Short-Form Video", "Creative Design & Content", "Creative Design & Content Production",
  "Influencer Marketing", "Influencer Partnerships", "Social Media Strategy",
  "Analytics & Reporting", "Analytics & Performance Reporting", "Other",
];
const highlights = [
  { title: "Quick Response", icon: MessageCircle },
  { title: "Dedicated Support", icon: UsersRound },
  { title: "Custom Solutions", icon: Lightbulb },
  { title: "Growth Focused", icon: TrendingUp },
];
const ctaPoints = [
  { title: "Creative Ideas", icon: Lightbulb },
  { title: "Practical Strategy", icon: Settings2 },
  { title: "Real Growth", icon: TrendingUp },
];

export function ContactPage({ initialService = "" }: { initialService?: string }) {
  const requestedService = initialService;
  const [values, setValues] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [contactSettings, setContactSettings] = useState(demoSettings);
  useEffect(() => {
    let active = true;
    fetch("/api/public/settings", { cache: "no-store" })
      .then(response => response.ok ? response.json() as Promise<{ settings?: Partial<typeof demoSettings> }> : null)
      .then(result => { if (active && result?.settings) setContactSettings({ ...demoSettings, ...result.settings }); })
      .catch(() => undefined);
    return () => { active = false; };
  }, []);
  useEffect(() => {
    if (!requestedService) return;
    const match = services.find((service) => service.toLocaleLowerCase() === requestedService.toLocaleLowerCase())
      ?? demoServices.find((service) => service.slug === requestedService.toLocaleLowerCase())?.title
      ?? services.find((service) => service.toLocaleLowerCase().replace(/[^a-z0-9]+/g, "-") === requestedService.toLocaleLowerCase());
    if (match) setValues((current) => ({ ...current, service: match }));
  }, [requestedService]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [notice, setNotice] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const phone = contactSettings.contactPhone.trim();
  const email = contactSettings.contactEmail.trim();
  const address = contactSettings.contactAddress.trim();
  const whatsapp = contactSettings.whatsappNumber.replace(/[^+\d]/g, "");
  const mapUrl = contactSettings.officeMapUrl.trim();
  const encodedAddress = encodeURIComponent(address || "Ahmedabad, Gujarat, India");
  const cityMap = `https://www.google.com/maps?q=${encodedAddress}&output=embed`;
  const cityMapsLink = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;

  function update(name: keyof typeof values, value: string) {
    setValues(current => ({ ...current, [name]: value }));
    setErrors(current => ({ ...current, [name]: "" }));
    setNotice("");
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: Record<string, string> = {};
    if (!values.name.trim()) nextErrors.name = "Enter your name.";
    else if (values.name.trim().length < 2) nextErrors.name = "Enter at least 2 characters.";
    if (!values.email.trim()) nextErrors.email = "Enter your email address.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) nextErrors.email = "Enter a valid email address.";
    if (values.phone.trim() && !/^[+()0-9.\-\s]{7,30}$/.test(values.phone.trim())) nextErrors.phone = "Enter a valid phone number.";
    if (!values.message.trim()) nextErrors.message = "Tell us a little about your project.";
    else if (values.message.trim().length < 10) nextErrors.message = "Please use at least 10 characters.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      setNotice("Please review the highlighted fields. Your entries are still here.");
      document.getElementById(Object.keys(nextErrors)[0])?.focus();
      return;
    }
    setSubmitting(true);
    try {
      const response = await fetch("/api/forms", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ kind: "enquiry", data: { ...values, source: "contact" } }) });
      const result = await response.json() as { ok?: boolean; message?: string; fields?: Record<string, string> };
      if (!response.ok || !result.ok) {
        setErrors(result.fields || {});
        setNotice(result.message || "We couldn’t send your message. Please try again.");
        return;
      }
      setSubmitted(true);
      setNotice("Thanks — your enquiry has been received. We’ll be in touch.");
    } catch {
      setNotice("We couldn’t reach the server. Please try again in a moment.");
    } finally {
      setSubmitting(false);
    }
  }

  return <div className="contact-page">
    <section className="contact-hero" aria-labelledby="contact-title">
      <div className="contact-hero-image"><Image src={contactPhotos.reception} alt="Warm, welcoming modern office reception" fill priority sizes="(max-width: 760px) 100vw, 60vw" /></div>
      <div className="contact-hero-wash" />
      <div className="contact-hero-inner">
        <div className="contact-hero-copy">
          <p className="eyebrow">Contact Us</p>
          <h1 id="contact-title">Let’s Create<br />Something Great<br /><span>Together</span></h1>
          <p>Have a project in mind, a question, or just want to say hello? We’d love to hear from you. Let’s discuss how Honey Media House can help your brand show up with intention.</p>
          <div className="contact-highlights">{highlights.map(({ title, icon: Icon }) => <div className="contact-highlight" key={title}><Icon aria-hidden="true"/><span>{title}</span></div>)}</div>
          <Link className="button contact-talk-link" href="#contact-form">Let’s Talk <ArrowRight size={16}/></Link>
        </div>
      </div>
    </section>

    <section className="contact-details-section" id="contact-form" aria-label="Send a message or contact us directly">
      <div className="contact-details-grid">
        <div className="contact-form-card">
          <p className="eyebrow">Send Us a Message</p>
          <h2>Get In Touch</h2>
          <p className="contact-card-intro">Tell us about your project using the form below.</p>
          <p className="contact-demo-note" role="note">Your message is sent securely to our team and is used only to respond to your enquiry.</p>
          {notice && <p className={`contact-form-status${Object.keys(errors).length || notice.startsWith("We couldn’t") ? " is-error" : ""}`} role={Object.keys(errors).length || notice.startsWith("We couldn’t") ? "alert" : "status"} aria-live="polite">{notice}</p>}
          {submitted ? <div className="contact-success"><Check aria-hidden="true"/><span>{notice}</span></div> : <form className="contact-form" onSubmit={submit} noValidate>
            <div className="contact-field"><label htmlFor="name">Your Name <span aria-hidden="true">*</span></label><div className="contact-input-wrap"><UserRound aria-hidden="true"/><input id="name" name="name" autoComplete="name" required value={values.name} onChange={e => update("name", e.target.value)} aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} placeholder="Your name"/></div>{errors.name && <span className="contact-field-error" id="name-error">{errors.name}</span>}</div>
            <div className="contact-field"><label htmlFor="email">Your Email <span aria-hidden="true">*</span></label><div className="contact-input-wrap"><Mail aria-hidden="true"/><input id="email" name="email" type="email" autoComplete="email" required value={values.email} onChange={e => update("email", e.target.value)} aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} placeholder="you@example.com"/></div>{errors.email && <span className="contact-field-error" id="email-error">{errors.email}</span>}</div>
            <div className="contact-field"><label htmlFor="phone">Phone Number <span className="optional-label">(optional)</span></label><div className="contact-input-wrap"><Phone aria-hidden="true"/><input id="phone" name="phone" type="tel" autoComplete="tel" value={values.phone} onChange={e => update("phone", e.target.value)} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "phone-error" : undefined} placeholder="Your phone number"/></div>{errors.phone && <span className="contact-field-error" id="phone-error">{errors.phone}</span>}</div>
            <div className="contact-field"><label htmlFor="service">Service Interested In <span className="optional-label">(optional)</span></label><div className="contact-input-wrap contact-select-wrap"><Workflow aria-hidden="true"/><select id="service" name="service" value={values.service} onChange={e => update("service", e.target.value)}><option value="">Choose a service</option>{services.map(service => <option key={service} value={service}>{service}</option>)}</select><ChevronDown className="select-chevron" aria-hidden="true"/></div></div>
            <div className="contact-field"><label htmlFor="message">Your Message <span aria-hidden="true">*</span></label><div className="contact-input-wrap contact-textarea-wrap"><MessageSquareText aria-hidden="true"/><textarea id="message" name="message" required minLength={10} maxLength={4000} value={values.message} onChange={e => update("message", e.target.value)} aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-error" : undefined} placeholder="Tell us about your project or question…"/></div>{errors.message && <span className="contact-field-error" id="message-error">{errors.message}</span>}</div>
            <button className="button contact-submit" type="submit" disabled={submitting}>{submitting ? "Sending…" : "Send Message"} <Send size={16}/></button>
          </form>}
        </div>
        <div className="contact-info-wrap">
          <div className="contact-info-copy">
            <p className="eyebrow">Contact Information</p>
            <h2>Reach Us Directly</h2>
            <p className="contact-card-intro">You can also connect with us through the details below.</p>
            <div className="contact-info-list">
              {phone ? <ContactInfo icon={<Phone/>} title="Phone" detail={phone} href={`tel:${phone}`} /> : <ContactInfo icon={<Phone/>} title="Phone" detail="Phone number not configured yet" />}
              {email ? <ContactInfo icon={<Mail/>} title="Email" detail={email} href={`mailto:${email}`} /> : <ContactInfo icon={<Mail/>} title="Email" detail="Email address not configured yet" />}
              <ContactInfo icon={<MapPin/>} title="Our Office" detail={address || "Location details not configured yet"} />
              {whatsapp ? <ContactInfo icon={<MessageCircle/>} title="Chat on WhatsApp" detail={contactSettings.whatsappNumber} href={`https://wa.me/${whatsapp.replace(/^\+/, "")}`} external /> : <ContactInfo icon={<MessageCircle/>} title="Chat on WhatsApp" detail="WhatsApp contact not configured yet" />}
              <ContactInfo icon={<CalendarDays/>} title="Book a Free Consultation" detail="Schedule a call with our team and discuss your goals." href="/book-strategy-call" />
            </div>
          </div>
          <div className="contact-side-image"><Image src={contactPhotos.writing} alt="Notebook and coffee on a bright planning desk" fill sizes="(max-width: 900px) 100vw, 240px"/></div>
        </div>
      </div>
    </section>

    <section className="contact-info-bottom" aria-label="Location and frequently asked questions">
      <div className="contact-location">
        <p className="eyebrow">Our Location</p>
        <h2>Find Us Here</h2>
        <p className="contact-section-intro">We’re based in {address || "Ahmedabad, Gujarat, India"}. Please contact us to confirm meeting arrangements.</p>
        <div className="contact-map">
          <iframe src={mapUrl || cityMap} title={mapUrl ? "Map to the Honey Media House office" : "City-level map of Ahmedabad, Gujarat"} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </div>
        <a className="text-link contact-map-link" href={mapUrl || cityMapsLink} target="_blank" rel="noreferrer">{mapUrl ? "Open in Maps" : "Open Ahmedabad in Maps"} <ArrowUpRight size={15}/></a>
        {!mapUrl && <p className="contact-map-note">City-level location only — no office pin is configured.</p>}
      </div>
      <div className="contact-faqs">
        <p className="eyebrow">Frequently Asked Questions</p>
        <h2>Quick Answers</h2>
        <div className="contact-accordion">{contactFaqs.map(item => {
          const expanded = openFaq === item.id;
          const panelId = `contact-faq-${item.id}`;
          return <div className={`contact-faq-item${expanded ? " is-open" : ""}`} key={item.id}>
            <h3><button type="button" aria-expanded={expanded} aria-controls={panelId} onClick={() => setOpenFaq(expanded ? null : item.id)}>{item.question}<span aria-hidden="true">{expanded ? "−" : "+"}</span></button></h3>
            <div className="contact-faq-panel" id={panelId} hidden={!expanded}><p>{item.answer}</p>{item.draft && <small>Editable draft copy — confirm this policy before publication.</small>}</div>
          </div>;
        })}</div>
      </div>
    </section>

    <section className="contact-cta-section">
      <div className="contact-bottom-cta" style={{ backgroundImage: `url("${contactPhotos.desk}")` }}>
        <div className="contact-cta-copy"><p className="eyebrow">Still Have Questions?</p><h2>Let’s Talk About Your Ideas</h2><p>We’re here to help you turn your ideas into real growth.</p><div className="contact-cta-actions"><Link className="button" href="/book-strategy-call">Book a Call <ArrowRight size={16}/></Link>{whatsapp && <a className="button button-light" href={`https://wa.me/${whatsapp.replace(/^\+/, "")}`} target="_blank" rel="noreferrer">Chat on WhatsApp <MessageCircle size={16}/></a>}</div></div>
        <div className="contact-cta-points">{ctaPoints.map(({ title, icon: Icon }) => <div key={title}><Icon aria-hidden="true"/><span>{title}</span></div>)}</div>
      </div>
    </section>
  </div>;
}

function ContactInfo({ icon, title, detail, href, external = false }: { icon: React.ReactNode; title: string; detail: string; href?: string; external?: boolean }) {
  const content = <><span className="contact-info-icon" aria-hidden="true">{icon}</span><span className="contact-info-text"><strong>{title}</strong><span>{detail}</span></span></>;
  return href ? <a className="contact-info-row" href={href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined}>{content}</a> : <div className="contact-info-row">{content}</div>;
}
