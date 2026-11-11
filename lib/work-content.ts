/* Local, typed content for the /work page.
   Frontend only: no Prisma, no API, no DATABASE_URL.
   Every portfolio entry below is a concept/sample — never presented as a verified client project. */

export const workCategories = [
  "All",
  "Social Media",
  "Website",
  "Branding",
  "Ad Creatives",
  "Content Samples",
] as const;

export type WorkCategory = (typeof workCategories)[number];
export type WorkItemCategory = Exclude<WorkCategory, "All">;

export type WorkIconName =
  | "search"
  | "clipboard"
  | "pen"
  | "rocket"
  | "chart"
  | "lightbulb"
  | "target"
  | "settings"
  | "users"
  | "instagram"
  | "megaphone"
  | "monitor"
  | "tag"
  | "filetext"
  | "play"
  | "dots";

export type WorkPoster = {
  /** Poster copy drawn over the photo so the card reads like a designed concept. */
  lines: string[];
  kicker?: string;
  caption?: string;
  tone: "dark" | "gold" | "cream";
  align?: "left" | "center" | "right";
  /** Show the Honey Media House mark (used for the branding/stationery concept). */
  logo?: boolean;
};

export type WorkItem = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: WorkItemCategory;
  image: string;
  imageAlt: string;
  poster?: WorkPoster;
  overview: string;
  deliverables: string[];
  gallery?: string[];
};

const photo = (id: string, width = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=85`;

export const workImages = {
  heroDesk: photo("1497366811353-6870744d04b2", 1800),
  office: photo("1497366754035-f200968a6e72", 1400),
  meeting: photo("1521737711867-e3b97375f902", 1800),
  fitness: photo("1534438327276-14e5300c3a48"),
  food: photo("1504674900247-0877df9cc836"),
  stationery: photo("1455390582262-044cdead277a"),
  laptop: photo("1460925895917-afdab827c52f"),
  interior: photo("1600607687939-ce8a6c25118c"),
  deskSocial: photo("1522542550221-31fd19575a2d"),
  workspace: photo("1498050108023-c5249f4df085"),
} as const;

/* ---------------------------------------------------------------- portfolio */

export const workItems: WorkItem[] = [
  {
    id: "work-sample-1",
    slug: "gym-fitness-social-media-post",
    title: "Social Media Post",
    subtitle: "(Gym/Fitness)",
    category: "Social Media",
    image: workImages.fitness,
    imageAlt: "Sample fitness social post concept showing a woman training in a gym",
    poster: {
      tone: "dark",
      kicker: "Sample concept",
      lines: ["Stronger", "Everyday"],
      caption: "Fitness · Health · Lifestyle",
      align: "left",
    },
    overview:
      "An illustrative social-first concept for a gym or fitness studio: a bold, motivational feed post built around one clear message, a strong photograph and a single call to action. Shown to demonstrate our creative style for fitness brands — it is not a published client campaign.",
    deliverables: [
      "Feed post concept (1080×1080)",
      "Caption and hashtag directions",
      "Matching story frame",
      "Editable template for future posts",
    ],
    gallery: [workImages.workspace, workImages.deskSocial],
  },
  {
    id: "work-sample-2",
    slug: "food-restaurant-social-media-post",
    title: "Social Media Post",
    subtitle: "(Food/Restaurant)",
    category: "Social Media",
    image: workImages.food,
    imageAlt: "Sample restaurant social post concept featuring a plated dish photographed from above",
    poster: {
      tone: "dark",
      lines: ["Good Food", "Good Mood"],
      caption: "Fresh · Daily · Made with love",
      align: "left",
    },
    overview:
      "An illustrative social concept for a restaurant or café: warm food photography paired with playful, appetising typography. The idea is to show how a simple, repeatable template can keep a food brand looking fresh every day of the week.",
    deliverables: [
      "Feed post concept (1080×1080)",
      "Menu highlight variations",
      "Story frame with offer sticker",
      "Caption and hashtag directions",
    ],
    gallery: [workImages.stationery],
  },
  {
    id: "work-sample-3",
    slug: "branding-mockup-logo-stationery",
    title: "Branding Mockup",
    subtitle: "(Logo & Stationery)",
    category: "Branding",
    image: workImages.stationery,
    imageAlt: "Sample branding concept showing a logo applied across stationery on a warm paper surface",
    poster: {
      tone: "cream",
      lines: ["Honey Media House"],
      caption: "Logo · Identity · Stationery",
      align: "center",
      logo: true,
    },
    overview:
      "An illustrative identity concept exploring how a logo behaves across everyday stationery — letterhead, business card, envelope and notebook. The goal is a consistent, warm identity system that stays legible from a favicon to a printed page.",
    deliverables: [
      "Primary and secondary logo concepts",
      "Colour palette and typography direction",
      "Business card and letterhead mockups",
      "One-page brand usage guide",
    ],
    gallery: [workImages.laptop, workImages.deskSocial],
  },
  {
    id: "work-sample-4",
    slug: "website-design-landing-page-concept",
    title: "Website Design",
    subtitle: "(Landing Page Concept)",
    category: "Website",
    image: workImages.laptop,
    imageAlt: "Sample landing page concept displayed on a laptop showing a clean business website layout",
    poster: {
      tone: "dark",
      lines: ["Smart Solutions", "for Growing", "Businesses"],
      caption: "Landing page concept",
      align: "left",
    },
    overview:
      "An illustrative landing page concept for a growing business: a clear headline, focused service blocks, social proof and one obvious call to action. Shown to demonstrate our approach to conversion-minded layout and clean visual hierarchy.",
    deliverables: [
      "Desktop landing page design",
      "Mobile responsive layout",
      "Hero, services and CTA sections",
      "Design handoff files for development",
    ],
    gallery: [workImages.workspace, workImages.interior],
  },
  {
    id: "work-sample-5",
    slug: "ad-creative-product-promotion",
    title: "Ad Creative",
    subtitle: "(Product Promotion)",
    category: "Ad Creatives",
    image: workImages.interior,
    imageAlt: "Sample product promotion ad creative featuring warm interior lighting with the line Bright Spaces Better Lives",
    poster: {
      tone: "gold",
      lines: ["Bright Spaces", "Better Lives"],
      caption: "Product promotion · Meta & Google Ads",
      align: "right",
    },
    overview:
      "An illustrative paid-social creative for a product promotion: one hero image, one benefit-led headline and one clear action. Designed to be cropped cleanly for feed, story and display placements.",
    deliverables: [
      "Meta feed and story sizes",
      "Google Display responsive sizes",
      "Two headline variations",
      "Editable source files",
    ],
    gallery: [workImages.meeting],
  },
];

export function getWorkItem(slug: string): WorkItem | null {
  return workItems.find((item) => item.slug === slug) ?? null;
}

/* ------------------------------------------------------------- approach */

export type WorkStep = {
  number: string;
  icon: WorkIconName;
  title: string;
  text: string;
};

export const approachSteps: WorkStep[] = [
  { number: "01", icon: "search", title: "Understand Your Goals", text: "We learn about your business and needs." },
  { number: "02", icon: "clipboard", title: "Plan Strategy", text: "We create a customized strategy and roadmap." },
  { number: "03", icon: "pen", title: "Design Creative Concepts", text: "We design content, mockups and campaign ideas." },
  { number: "04", icon: "rocket", title: "Execute & Implement", text: "We bring the strategy to life across platforms." },
  { number: "05", icon: "chart", title: "Monitor & Grow", text: "We track performance and keep improving." },
];

/* ------------------------------------------------- what we can create */

export type WorkCapability = {
  icon: WorkIconName;
  title: string;
  note?: string;
  href: string;
};

export const createCapabilities: WorkCapability[] = [
  { icon: "instagram", title: "Social Media Content", href: "/services/social-media-management" },
  { icon: "megaphone", title: "Ad Creatives", note: "Meta / Google Ads", href: "/services/digital-marketing" },
  { icon: "monitor", title: "Website Design", note: "Landing Page", href: "/services/it-solutions" },
  { icon: "tag", title: "Branding", note: "Logo, Identity", href: "/services" },
  { icon: "filetext", title: "Content Strategy", note: "& Calendar", href: "/services/content-strategy" },
  { icon: "play", title: "Reels & Video Concepts", href: "/services/social-media-management" },
  { icon: "chart", title: "Lead Generation Campaigns", href: "/services/lead-generation" },
  { icon: "dots", title: "And Much More", href: "/services" },
];

/* ------------------------------------------------------- why choose us */

export type WorkBenefit = { icon: WorkIconName; title: string; text: string };

export const whyChooseItems: WorkBenefit[] = [
  { icon: "lightbulb", title: "Fresh & Creative Ideas", text: "A young team with modern perspectives." },
  { icon: "users", title: "Client-Focused Approach", text: "We listen, understand and deliver as per your goals." },
  { icon: "settings", title: "End-to-End Support", text: "From strategy to execution, we handle everything." },
  { icon: "chart", title: "Growth-Oriented", text: "Our focus is on long-term success for your brand." },
];

/* ----------------------------------------------------- hero highlights */

export type WorkHighlight = { icon: WorkIconName; label: string };

export const heroHighlights: WorkHighlight[] = [
  { icon: "lightbulb", label: "Creative Ideas" },
  { icon: "chart", label: "Strategic Planning" },
  { icon: "settings", label: "Modern Execution" },
  { icon: "users", label: "Dedicated Team" },
];

export const ctaHighlights: WorkHighlight[] = [
  { icon: "lightbulb", label: "Creative Ideas" },
  { icon: "settings", label: "Practical Strategy" },
  { icon: "chart", label: "Real Impact" },
];
