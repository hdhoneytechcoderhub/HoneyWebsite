import { z } from "zod";

const imageUrl = z.string().trim().max(2048).refine(value => {
  if (!value) return true;
  if (value.startsWith("/images/")) return true;
  try {
    const url = new URL(value);
    return url.protocol === "https:" && (url.hostname === "images.unsplash.com" || url.hostname.endsWith(".public.blob.vercel-storage.com"));
  } catch { return false; }
}, "Use an /images path, Unsplash image URL, or public Vercel Blob URL.");
const socialUrl = z.string().trim().max(2048).refine(value => {
  if (!value) return true;
  try { return new URL(value).protocol === "https:"; } catch { return false; }
}, "Enter a valid HTTPS URL or leave blank.");
const text = (max = 3000) => z.string().trim().max(max);

export const aboutPageSchema = z.object({
  demoContent: z.boolean(),
  sectionOrder: z.array(z.enum(["story", "purpose", "founder", "team", "cta"])).length(5),
  sectionVisibility: z.object({ story: z.boolean(), purpose: z.boolean(), founder: z.boolean(), team: z.boolean(), cta: z.boolean() }),
  hero: z.object({ eyebrow: text(80), title: text(160), highlight: text(80), description: text(1200), image: imageUrl, imageAlt: text(300), primaryLabel: text(80), secondaryLabel: text(80) }),
  story: z.object({ eyebrow: text(80), title: text(180), paragraphs: z.array(text(1200)).max(8), image: imageUrl, imageAlt: text(300), timeline: z.array(z.object({ year: text(12), title: text(100), description: text(500), demo: z.boolean() })).max(12) }),
  purpose: z.object({ eyebrow: text(80), title: text(180), cards: z.array(z.object({ title: text(100), description: text(600), icon: z.enum(["Target", "Eye", "Gem", "Lightbulb", "Heart", "Compass"]) })).max(8) }),
  founder: z.object({ eyebrow: text(80), name: text(100), role: text(120), biography: text(1200), quote: text(600), visionTitle: text(100), vision: text(700), portrait: imageUrl, portraitAlt: text(300), signature: imageUrl, signatureAlt: text(200), visionImage: imageUrl, visionImageAlt: text(300), isDemo: z.boolean(), social: z.object({ linkedin: socialUrl, instagram: socialUrl, youtube: socialUrl }) }),
  team: z.object({ eyebrow: text(80), title: text(180), subtitle: text(400), joinLabel: text(80), departments: z.array(z.object({ title: text(120), description: text(500), image: imageUrl, imageAlt: text(300), members: z.array(z.object({ name: text(100), role: text(120), image: imageUrl, imageAlt: text(300) })).max(20) })).max(12) }),
  cta: z.object({ title: text(180), description: text(800), image: imageUrl, imageAlt: text(300), benefits: z.array(text(80)).max(6), strategyLabel: text(100), whatsappLabel: text(100), whatsappMessage: text(300) }),
  seo: z.object({ title: text(160), description: text(500), image: imageUrl }),
});

export type AboutPageContent = z.infer<typeof aboutPageSchema>;

export const DEFAULT_ABOUT_CONTENT: AboutPageContent = {
  demoContent: true,
  sectionOrder: ["story", "purpose", "founder", "team", "cta"],
  sectionVisibility: { story: true, purpose: true, founder: true, team: true, cta: true },
  hero: {
    eyebrow: "About Us",
    title: "A Small Team With a Big Vision",
    highlight: "Big Vision",
    description: "Honey Media House is a startup digital agency helping businesses build stronger brands, generate leads and create meaningful growth. We also guide talented individuals toward the right career opportunities.",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1800&q=85",
    imageAlt: "A warm, sunlit collaborative office space",
    primaryLabel: "Our Story",
    secondaryLabel: "Work With Us",
  },
  story: {
    eyebrow: "Our Story",
    title: "From an Idea to a Growing Brand",
    paragraphs: [
      "Honey Media House started with a simple belief — every business deserves the right strategy, creative direction and digital support to grow, and every individual deserves real career opportunities.",
      "We began as a small team with big dreams, and today we are building a brand that combines creativity, technology and people to create real impact.",
    ],
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1100&q=85",
    imageAlt: "A bright office meeting space with natural materials",
    timeline: [
      { year: "2024", title: "The Beginning", description: "Started with an idea to help businesses grow digitally.", demo: true },
      { year: "2025", title: "First Clients", description: "Worked with our first clients and delivered successful projects.", demo: true },
      { year: "2026", title: "Expanding", description: "Growing our services and team with a bigger vision for the future.", demo: true },
    ],
  },
  purpose: {
    eyebrow: "Our Purpose",
    title: "Building Brands & Careers for a Better Tomorrow",
    cards: [
      { title: "Our Mission", description: "To create impactful brands and open new career opportunities for the next generation.", icon: "Target" },
      { title: "Our Vision", description: "To become a trusted growth partner for businesses and professionals worldwide.", icon: "Eye" },
      { title: "Our Values", description: "Creativity, Integrity, Growth, Collaboration and Impact in everything we do.", icon: "Gem" },
    ],
  },
  founder: {
    eyebrow: "Meet Our Founder",
    name: "Divya Rana",
    role: "Founder & CEO",
    biography: "A passionate entrepreneur dedicated to building brands, creating opportunities and helping businesses grow with the right strategy and technology.",
    quote: "I believe in the power of ideas, the strength of strategy and the potential of people.",
    visionTitle: "Her Vision",
    vision: "To build an international brand from Gujarat that creates real opportunities for businesses and careers worldwide.",
    portrait: "",
    portraitAlt: "Founder portrait to be supplied by Honey Media House",
    signature: "",
    signatureAlt: "",
    visionImage: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80",
    visionImageAlt: "Books and greenery in a thoughtfully designed office",
    isDemo: true,
    social: { linkedin: "", instagram: "", youtube: "" },
  },
  team: {
    eyebrow: "Our Team",
    title: "The People Behind Honey Media House",
    subtitle: "A small but passionate team working towards a bigger vision.",
    joinLabel: "Join Our Team",
    departments: [
      { title: "Marketing & Strategy", description: "Creating ideas that make brands grow.", image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=80", imageAlt: "A team collaborating around a table", members: [] },
      { title: "IT & Development", description: "Building modern digital solutions.", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80", imageAlt: "A modern digital workspace", members: [] },
      { title: "Content & Social Media", description: "Telling stories that create impact.", image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=900&q=80", imageAlt: "Colleagues sharing ideas in a meeting", members: [] },
      { title: "Operations & Support", description: "Keeping everything on track.", image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=900&q=80", imageAlt: "An organized collaborative workspace", members: [] },
    ],
  },
  cta: {
    title: "Let’s Create Something Great Together!",
    description: "Whether you’re a business looking to grow or an individual looking for the right opportunity — we’re here to help.",
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1800&q=85",
    imageAlt: "Warmly lit office prepared for a collaborative meeting",
    benefits: ["Grow Your Brand", "Build Your Career", "Create New Opportunities"],
    strategyLabel: "Book a Free Strategy Call",
    whatsappLabel: "Chat on WhatsApp",
    whatsappMessage: "Hello Honey Media House, I’d like to explore how we can work together.",
  },
  seo: {
    title: "About Honey Media House | Our Story, Vision & Team",
    description: "Meet Honey Media House: a digital agency building stronger brands, meaningful growth and career opportunities.",
    image: "",
  },
};

export function parseAboutContent(value: unknown): AboutPageContent {
  const parsed = aboutPageSchema.safeParse(value);
  return parsed.success ? parsed.data : DEFAULT_ABOUT_CONTENT;
}

export function isSafeAboutImage(value: string) {
  return imageUrl.safeParse(value).success;
}
