import { DEFAULT_ABOUT_CONTENT } from "@/lib/about-page";

const photos = {
  office: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1800&q=85",
  meeting: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1000&q=80",
  digital: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80",
  tech: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1000&q=80",
  social: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=1000&q=80",
  leads: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1000&q=80",
  hr: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1000&q=80",
  sales: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1000&q=80",
  content: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1000&q=80",
  ops: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1000&q=80",
  health: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=80",
  education: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=900&q=80",
  realestate: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80",
  fitness: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=80",
  ecommerce: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=80",
  startup: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=80",
  article1: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
  article2: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
  article3: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1200&q=80",
} as const;

export type SiteSettings = {
  brandSummary: string;
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
  whatsappNumber: string;
  socialLinks: Record<string, string>;
  heroVideoUrl: string;
  heroStats: { value: string; label: string }[];
  officeMapUrl: string;
};
export type ContactFaq = { id: string; question: string; answer: string; draft?: boolean };
export type HomepageSection = { key: string; title: string; eyebrow: string; body: string };
export type DemoService = {
  id: string; slug: string; title: string; description: string; overview: string; icon: string; image: string;
  benefits: string[]; deliverables: string[]; process: string[]; faqs: { question: string; answer: string }[];
  seoTitle: string | null; seoDescription: string | null;
};
export type DemoIndustry = {
  id: string; slug: string; title: string; description: string; overview: string; image: string;
  challenges: string[]; solutions: string[]; serviceSlugs: string[]; seoTitle: string | null; seoDescription: string | null;
};
export type DemoCategory = { id: string; slug: string; name: string };
export type DemoProject = {
  id: string; slug: string; title: string; clientLabel: string; description: string; overview: string;
  challenge: string; approach: string; deliverables: string[]; gallery: string[]; results: string[];
  image: string; demoContent: true; verifiedResults: false; seoTitle: string | null; seoDescription: string | null;
  categories: DemoCategory[];
};
export type DemoProcessStep = { id: string; title: string; description: string };
export type DemoTestimonial = { id: string; name: string; role: string; company: string; quote: string; demoContent: true };
export type DemoArticleCategory = { id: string; slug: string; name: string };
export type DemoArticle = {
  id: string; slug: string; title: string; excerpt: string; body: string; image: string;
  seoTitle: string | null; seoDescription: string | null; publishedAt: Date; updatedAt: Date; category: DemoArticleCategory;
};
export type DemoJob = {
  id: string; slug: string; title: string; team: string; location: string; employmentType: string;
  summary: string; description: string; requirements: string[]; seoTitle: string | null; seoDescription: string | null;
  demoContent: true;
};
export type DemoLegalPage = { slug: string; title: string; body: string; updatedAt: Date };

export const demoSettings: SiteSettings = {
  brandSummary: "A modern digital growth company helping ambitious businesses build stronger brands and sustainable opportunities. (Demo copy—review before publication.)",
  contactEmail: "hello@honeymediahouse.com", contactPhone: "", contactAddress: "Ahmedabad, Gujarat, India", whatsappNumber: "",
  socialLinks: { instagram: "", linkedin: "", facebook: "", youtube: "" }, heroVideoUrl: "", officeMapUrl: "",
  heroStats: [{ value: "", label: "Happy clients" }, { value: "", label: "Projects completed" }, { value: "", label: "Industries served" }, { value: "", label: "Years experience" }],
};

export const contactFaqs: ContactFaq[] = [
  { id: "start-project", question: "How can I start a project with you?", answer: "Tell us a little about your goals in the message form or book a consultation. We can use the conversation to understand the scope and possible next steps." },
  { id: "services", question: "What services do you offer?", answer: "Our listed services include digital marketing, IT solutions, social media management, lead generation, HR solutions, sales and business growth, content strategy, and operations consulting." },
  { id: "international", question: "Do you work with clients outside India?", answer: "Please contact us with your location and project needs so we can discuss whether the right collaboration is possible.", draft: true },
  { id: "timeline", question: "What is the typical project timeline?", answer: "Timelines depend on the project scope, deliverables, and review process. We can outline an estimated schedule after learning more about your needs." },
  { id: "consultation", question: "Can I get a free consultation?", answer: "You can request a free introductory consultation using the Book a Free Consultation link. Availability and scope can be discussed when arranging it." },
  { id: "support", question: "Do you provide ongoing support?", answer: "Ongoing support can be discussed based on your requirements and the services agreed for a project.", draft: true },
  { id: "cost", question: "How much do your services cost?", answer: "Costs depend on the work involved, deliverables, and timeline. Share your goals and we can discuss a scope-specific estimate." },
];

export const contactPhotos = {
  reception: photos.office,
  desk: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1000&q=85",
  writing: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=80",
} as const;

export const homepageSections: HomepageSection[] = [
  { key: "hero", title: "Creating Brands, Guiding Careers", eyebrow: "Digital Growth Partner", body: "Digital Marketing • IT Solutions • HR Consulting • Sales Growth • Content Strategy" },
  { key: "about", title: "A Small Team With a Big Vision", eyebrow: "About Us", body: "Honey Media House is a startup digital agency helping businesses build stronger brands, generate leads and create meaningful growth." },
  { key: "services", title: "Everything You Need to Build, Grow & Scale Your Brand", eyebrow: "Our Services", body: "From strategy to execution, we provide end-to-end digital, tech and business solutions." },
  { key: "why", title: "Why Choose Honey Media House?", eyebrow: "Why Choose", body: "We don’t just create content. We create direction, opportunities and measurable growth." },
  { key: "industries", title: "Customized strategies for every industry", eyebrow: "Industries We Serve", body: "Industry-specific solutions to meet your audience where they are." },
  { key: "work", title: "Brands We’ve Helped Grow", eyebrow: "Our Work", body: "Representative portfolio concepts (demo content; client relationship not verified)." },
  { key: "process", title: "From Idea to Impact", eyebrow: "Our Process", body: "A clear, collaborative path from the first conversation to ongoing growth." },
  { key: "testimonials", title: "What Our Clients Say", eyebrow: "Client Testimonials", body: "Demo testimonials—replace or verify before publication." },
  { key: "conversion", title: "Ready to Grow Your Business?", eyebrow: "Let’s build something together", body: "Let’s create a custom digital marketing strategy for your goals." },
  { key: "resources", title: "Latest Insights, Guides & Growth Tips", eyebrow: "Resources", body: "Practical ideas for building, growing and scaling your brand." },
];

const serviceRows = [
  ["digital-marketing", "Digital Marketing", "SEO, Google Ads, Meta Ads, Performance Marketing", "ChartNoAxesCombined", photos.digital],
  ["it-solutions", "IT Solutions", "Website, Web App, MERN Development, Software Solutions", "CodeXml", photos.tech],
  ["social-media-management", "Social Media Management", "Strategy, Content, Reels, Account Handling", "Share2", photos.social],
  ["lead-generation", "Lead Generation", "B2B, B2C, Paid Leads, CRM Solutions", "UsersRound", photos.leads],
  ["hr-solutions", "HR Solutions", "Recruitment, Staffing, HR Consulting", "Users", photos.hr],
  ["sales-business-growth", "Sales & Business Growth", "Sales Strategy, Business Development, Conversion", "TrendingUp", photos.sales],
  ["content-strategy", "Content Strategy", "Copywriting, Brand Story, Content Planning", "PanelsTopLeft", photos.content],
  ["operations-consulting", "Operations Consulting", "Process, CRM, Workflows, Business Operations", "Settings2", photos.ops],
] as const;
const serviceDetails: Record<string, Pick<DemoService, "deliverables" | "benefits" | "process" | "faqs">> = {
  "digital-marketing": {
    deliverables: ["Strategy & Planning", "Campaign Management", "Performance Tracking"],
    benefits: ["Coordinate campaigns around business goals", "Bring search and paid media into one plan", "Review performance with clear reporting"],
    process: ["Discover goals and audiences", "Plan channels and campaign structure", "Launch and manage campaigns", "Review performance and refine"],
    faqs: [
      { question: "Which digital marketing channels can be included?", answer: "A plan may include SEO, Google Ads, Meta Ads, or other agreed channels, depending on your goals and scope." },
      { question: "How is campaign performance reviewed?", answer: "Tracking and reporting can be agreed during planning so the team can review activity against relevant goals." },
    ],
  },
  "it-solutions": {
    deliverables: ["Custom Website Development", "Web Applications", "Technical Support"],
    benefits: ["Shape a digital product around your requirements", "Plan responsive, maintainable experiences", "Coordinate implementation and support needs"],
    process: ["Understand needs and constraints", "Map requirements and user journeys", "Design and build the solution", "Test, launch, and review"],
    faqs: [
      { question: "What kinds of IT projects can we discuss?", answer: "Website development, web applications, and MERN stack projects are examples. Final scope depends on a discovery conversation." },
      { question: "Can an existing website be updated?", answer: "Share the current website and your goals so the team can discuss whether an update is a suitable fit." },
    ],
  },
  "social-media-management": {
    deliverables: ["Content Strategy", "Creative Design", "Posting & Growth"],
    benefits: ["Give social content a consistent direction", "Coordinate creative and publishing plans", "Use ongoing review to guide refinements"],
    process: ["Understand the brand and audience", "Create content themes and a calendar", "Prepare creative and publishing", "Review activity and adapt"],
    faqs: [
      { question: "Which social platforms can be supported?", answer: "Platforms can be discussed during planning based on your audience, content, and the agreed scope." },
      { question: "Is content created as part of social media management?", answer: "Content planning and creative design can be included as agreed in the service scope." },
    ],
  },
  "lead-generation": {
    deliverables: ["Lead Strategy", "Paid Campaigns", "CRM & Follow-ups"],
    benefits: ["Connect campaign choices to audience needs", "Coordinate lead capture and follow-up workflows", "Review lead activity and qualification steps"],
    process: ["Define audiences and goals", "Plan lead capture and channels", "Launch campaigns and workflows", "Review lead quality and improve"],
    faqs: [
      { question: "Do you work with both B2B and B2C lead generation?", answer: "Both are listed areas of focus. The right audience and approach are determined with you during discovery." },
      { question: "Can you work with our CRM?", answer: "CRM and follow-up requirements can be reviewed to understand integrations and workflows within the agreed project scope." },
    ],
  },
  "hr-solutions": {
    deliverables: ["Talent Acquisition", "HR Policy Support", "Staffing Solutions"],
    benefits: ["Organize recruitment requirements", "Discuss people-process and policy needs", "Explore staffing support based on scope"],
    process: ["Understand team and hiring needs", "Agree roles and support scope", "Coordinate recruitment or HR work", "Review progress and next steps"],
    faqs: [
      { question: "What HR support can be discussed?", answer: "Recruitment, staffing, and HR consulting are areas that can be discussed according to your organization's needs." },
      { question: "Do you provide legal or compliance advice?", answer: "No legal or compliance service is represented here. Please confirm the exact scope with Honey Media House before engaging." },
    ],
  },
  "sales-business-growth": {
    deliverables: ["Sales Strategy", "Business Development", "Conversion Optimization"],
    benefits: ["Clarify sales priorities and opportunities", "Coordinate business development activity", "Review conversion paths for improvement"],
    process: ["Understand the offer and goals", "Map opportunities and sales approach", "Support agreed growth initiatives", "Review progress and optimize"],
    faqs: [
      { question: "Can you help review our sales process?", answer: "Sales strategy and conversion optimization are listed areas. A discovery discussion can help identify a suitable scope." },
      { question: "Do you guarantee sales growth?", answer: "No specific sales outcome is guaranteed. Plans and measures depend on the agreed work and business context." },
    ],
  },
  "content-strategy": {
    deliverables: ["Brand Storytelling", "Content Calendar", "Copywriting"],
    benefits: ["Organize messaging around your brand", "Plan content consistently across channels", "Coordinate copy with campaign goals"],
    process: ["Understand the brand and audience", "Define themes and key messages", "Plan and create content", "Review, refine, and schedule"],
    faqs: [
      { question: "What types of content can be planned?", answer: "Brand stories, copywriting, and content calendars are examples. Formats and channels can be agreed around your needs." },
      { question: "Can content strategy support a campaign?", answer: "Yes, campaign content planning can be discussed as part of a tailored scope." },
    ],
  },
  "operations-consulting": {
    deliverables: ["Process Improvement", "CRM Setup", "Workflow Management"],
    benefits: ["Identify process and workflow opportunities", "Plan practical CRM requirements", "Clarify operational handoffs and next steps"],
    process: ["Map current workflows", "Identify needs and priorities", "Plan process or CRM changes", "Review adoption and refine"],
    faqs: [
      { question: "What operational areas can be reviewed?", answer: "Process, CRM, workflows, and business operations can be discussed to define a practical project scope." },
      { question: "Do you require a particular CRM platform?", answer: "Platform requirements can be reviewed during discovery; no specific tool is assumed by this sample page." },
    ],
  },
};

export const demoServices: DemoService[] = serviceRows.map(([slug, title, description, icon, image], index) => ({
  id: `demo-service-${index + 1}`, slug, title, description,
  overview: `${description}. This sample describes a collaborative program; confirm service scope before publication.`, icon, image,
  ...(serviceDetails[slug] ?? { deliverables: [], benefits: [], process: [], faqs: [] }),
  seoTitle: null, seoDescription: null,
}));

const industryRows = [
  ["healthcare", "Healthcare", photos.health], ["education", "Education", photos.education],
  ["real-estate", "Real Estate", photos.realestate], ["fitness", "Fitness", photos.fitness],
  ["e-commerce", "E-commerce", photos.ecommerce], ["startups", "Startups", photos.startup],
] as const;
export const demoIndustries: DemoIndustry[] = industryRows.map(([slug, title, image], index) => ({
  id: `demo-industry-${index + 1}`, slug, title, image,
  description: `Demo sample: growth support for ${title.toLowerCase()} teams.`,
  overview: `This sample outlines ways ${title.toLowerCase()} organizations might communicate clearly, reach the right people and build a thoughtful growth foundation.`,
  challenges: ["Standing out in a crowded landscape", "Building trust with the right audience", "Connecting effort to useful outcomes"],
  solutions: ["Audience and positioning research", "A practical digital growth roadmap", "Consistent content and campaign support"],
  serviceSlugs: ["digital-marketing", "content-strategy", "it-solutions"], seoTitle: null, seoDescription: null,
}));

const category = (name: string): DemoCategory => ({ id: `demo-category-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`, name, slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-") });
const projectRows = [
  ["sfw-the-gym", "SFW The Gym", "An illustrative fitness brand concept exploring social content and lead generation.", photos.fitness, ["Social Media", "Lead Generation"]],
  ["wfs-academy", "WFS Academy", "An illustrative education brand direction focused on clear positioning and content.", photos.education, ["Branding", "Social Media"]],
  ["twislight-lighting", "TwisLight Lighting", "A sample product-led website concept for a lighting brand.", photos.ops, ["Website", "SEO"]],
  ["australian-premium-solar", "Australian Premium Solar", "A representative solar-business website concept.", photos.realestate, ["Website", "Lead Generation"]],
] as const;
export const demoProjects: DemoProject[] = projectRows.map(([slug, title, description, image, names], index) => ({
  id: `demo-project-${index + 1}`, slug, title, clientLabel: "Illustrative demo concept", description,
  overview: `${description} This sample is provided to demonstrate the portfolio layout only.`,
  challenge: "Illustrative sample challenge: explain an offer clearly and make the next step easy.",
  approach: "Illustrative sample approach: align messaging, visual design and useful conversion paths.",
  deliverables: ["Brand and audience direction", "Digital content concepts", "Conversion-focused experience"], gallery: [image], results: [], image,
  demoContent: true, verifiedResults: false, seoTitle: null, seoDescription: null, categories: names.map(category),
}));

export const demoProcessSteps: DemoProcessStep[] = [
  ["Discover", "Understand your goals"], ["Strategize", "Create a roadmap"], ["Create", "Design, content and development"],
  ["Launch", "Go live with precision"], ["Optimize", "Track and improve"], ["Grow", "Scale your business"],
].map(([title, description], index) => ({ id: `demo-process-${index + 1}`, title, description }));

export const demoTestimonials: DemoTestimonial[] = [
  { id: "demo-testimonial-1", name: "Demo Person One", role: "Business Owner", company: "Demo Company", quote: "Demo testimonial placeholder for layout only. Replace with an authorized client quote.", demoContent: true },
  { id: "demo-testimonial-2", name: "Demo Person Two", role: "Founder", company: "Demo Studio", quote: "Sample testimonial content. No client endorsement is implied.", demoContent: true },
  { id: "demo-testimonial-3", name: "Demo Person Three", role: "Director", company: "Demo Brand", quote: "Illustrative testimonial. Replace or verify before publication.", demoContent: true },
];

const articleCategories: Record<string, DemoArticleCategory> = {
  "Digital Marketing": { id: "demo-article-category-digital-marketing", slug: "digital-marketing", name: "Digital Marketing" },
  "Brand Strategy": { id: "demo-article-category-brand-strategy", slug: "brand-strategy", name: "Brand Strategy" },
  "Social Media": { id: "demo-article-category-social-media", slug: "social-media", name: "Social Media" },
};
const articleRows = [
  ["digital-marketing-trends-2026", "Digital Marketing Trends in 2026", "Demo article: a sample overview of trends, strategies and insights.", photos.article1, "Digital Marketing", "A practical overview of digital marketing shifts teams may watch in 2026: useful measurement, accessible creative, stronger first-party relationships and thoughtful automation."],
  ["build-strong-brand-2026", "How to Build a Strong Brand in 2026", "Demo article: a sample guide to building a clear brand.", photos.article2, "Brand Strategy", "A strong brand starts with a clear audience, consistent promise and a useful experience. This guide shares a practical framework for building and reviewing yours."],
  ["social-media-strategy-small-business", "Social Media Strategy for Small Businesses", "Demo article: sample ideas for a manageable social strategy.", photos.article3, "Social Media", "Build a manageable social presence by choosing focused channels, creating repeatable content pillars and learning from meaningful audience signals."],
] as const;
export const demoArticles: DemoArticle[] = articleRows.map(([slug, title, excerpt, image, categoryName, body], index) => {
  const publishedAt = new Date(Date.UTC(2026, 9, 8 - index));
  return { id: `demo-article-${index + 1}`, slug, title, excerpt, body: `<p>${body}</p><p><strong>Demo article:</strong> Review this sample content before publication.</p>`, image, seoTitle: null, seoDescription: null, publishedAt, updatedAt: publishedAt, category: articleCategories[categoryName] };
});

export const demoJobs: DemoJob[] = [{
  id: "demo-job-marketing-associate", slug: "digital-marketing-associate", title: "Digital Marketing Associate", team: "Marketing & Strategy",
  location: "Ahmedabad, Gujarat (sample location)", employmentType: "Full-time (sample role)", summary: "Illustrative job listing for preview only. Confirm role details before accepting applications.",
  description: "This sample listing demonstrates the careers detail page and local-only application form. It is not an active verified vacancy.",
  requirements: ["Interest in digital marketing", "Clear written communication", "Willingness to learn and collaborate"],
  seoTitle: null, seoDescription: null, demoContent: true,
}];

export const demoLegalPages: DemoLegalPage[] = [
  { slug: "privacy-policy", title: "Privacy Policy", body: "<p>This privacy policy is starter demo content. Add reviewed, jurisdiction-appropriate privacy language before launch.</p><p>Demo forms on this website do not transmit or save submitted information.</p><p>Contact <a href=\"mailto:hello@honeymediahouse.com\">hello@honeymediahouse.com</a> with questions.</p>", updatedAt: new Date("2026-10-08T00:00:00.000Z") },
  { slug: "terms", title: "Terms & Conditions", body: "<p>These terms are starter demo content. Add reviewed, jurisdiction-appropriate terms before launch.</p><p>Website content and example portfolio material are illustrative and should be verified before publication.</p>", updatedAt: new Date("2026-10-08T00:00:00.000Z") },
];

export const demoAboutContent = DEFAULT_ABOUT_CONTENT;
