import { PrismaClient, PublishStatus } from "@prisma/client";
const db = new PrismaClient();
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
};
const services = [
  ["digital-marketing", "Digital Marketing", "SEO, Google Ads, Meta Ads, Performance Marketing", "ChartNoAxesCombined", photos.digital],
  ["it-solutions", "IT Solutions", "Website, Web App, MERN Development, Software", "CodeXml", photos.tech],
  ["social-media-management", "Social Media Management", "Strategy, Content, Reels, Account Handling", "Share2", photos.social],
  ["lead-generation", "Lead Generation", "B2B, B2C, Paid Leads, CRM Solutions", "UsersRound", photos.leads],
  ["hr-solutions", "HR Solutions", "Recruitment, Staffing, HR Consulting", "Users", photos.hr],
  ["sales-business-growth", "Sales & Business Growth", "Sales Strategy, Business Development, Conversion", "TrendingUp", photos.sales],
  ["content-strategy", "Content Strategy", "Copywriting, Brand Story, Content Planning", "PanelsTopLeft", photos.content],
  ["operations-consulting", "Operations Consulting", "Process, CRM, Workflows, Business Operations", "Settings2", photos.ops],
] as const;
const industries = [["healthcare","Healthcare",photos.health],["education","Education",photos.education],["real-estate","Real Estate",photos.realestate],["fitness","Fitness",photos.fitness],["e-commerce","E-commerce",photos.ecommerce],["startups","Startups",photos.startup]] as const;
const processSteps = [["Discover","Understand your goals"],["Strategize","Create a roadmap"],["Create","Design, content and development"],["Launch","Go live with precision"],["Optimize","Track and improve"],["Grow","Scale your business"]] as const;
const categories = ["Branding","Website","Social Media","Ads","SEO","Lead Generation"];
const articleRows = [
  ["digital-marketing-trends-2026","Digital Marketing Trends in 2026","Stay ahead with the latest trends, strategies and insights.",photos.article1,"Digital Marketing", "A practical overview of the digital marketing shifts teams should watch in 2026: useful measurement, accessible creative, stronger first-party relationships and thoughtful automation."],
  ["build-strong-brand-2026","How to Build a Strong Brand in 2026","Step-by-step guide for sustainable growth.",photos.article2,"Brand Strategy", "A strong brand starts with a clear audience, consistent promise and a useful experience. This guide shares a practical framework for building and reviewing yours."],
  ["social-media-strategy-small-business","Social Media Strategy for Small Businesses","Practical tips to grow your business online.",photos.article3,"Social Media", "Build a manageable social presence by choosing a focused set of channels, creating repeatable content pillars and learning from meaningful audience signals."],
] as const;
async function main() {
  const setting = async (key: string, value: unknown) => db.siteSetting.upsert({ where:{key}, update:{value:value as object}, create:{key,value:value as object} });
  await Promise.all([
    setting("brandSummary", "A modern digital growth company helping ambitious businesses build stronger brands and sustainable opportunities. (Demo copy—edit in admin.)"),
    setting("contactEmail", "hello@honeymediahouse.com"), setting("contactPhone", ""), setting("contactAddress", "Ahmedabad, Gujarat, India"), setting("whatsappNumber", ""),
    setting("socialLinks", { instagram:"", linkedin:"", facebook:"", youtube:"" }), setting("heroVideoUrl", ""),
    setting("heroStats", [{value:"",label:"Happy clients"},{value:"",label:"Projects completed"},{value:"",label:"Industries served"},{value:"",label:"Years experience"}]),
  ]);
  const sectionRows = [
    ["hero","Creating Brands, Guiding Careers","Digital Growth Partner","Digital Marketing • IT Solutions • HR Consulting • Sales Growth • Content Strategy"],
    ["about","A Small Team With a Big Vision","About Us","Honey Media House is a startup digital agency helping businesses build stronger brands, generate leads and create meaningful growth."],
    ["services","Everything You Need to Build, Grow & Scale Your Brand","Our Services","From strategy to execution, we provide end-to-end digital, tech and business solutions."],
    ["why","Why Choose Honey Media House?","Why Choose","We don’t just create content. We create direction, opportunities and measurable growth."],
    ["industries","Customized strategies for every industry","Industries We Serve","Industry-specific solutions to meet your audience where they are."],
    ["work","Brands We’ve Helped Grow","Our Work","Representative portfolio concepts (demo content; client relationship not verified)."],
    ["process","From Idea to Impact","Our Process","A clear, collaborative path from the first conversation to ongoing growth."],
    ["testimonials","What Our Clients Say","Client Testimonials","Demo testimonials—replace or verify before publication."],
    ["conversion","Ready to Grow Your Business?","Let’s build something together","Let’s create a custom digital marketing strategy for your goals."],
    ["resources","Latest Insights, Guides & Growth Tips","Resources","Practical ideas for building, growing and scaling your brand."],
  ] as const;
  const { DEFAULT_ABOUT_CONTENT } = await import("../lib/about-page");
  for (const [key,title,eyebrow,body] of sectionRows) await db.homepageSection.upsert({ where:{key}, update:{title,eyebrow,body,visible:true,...(key === "about" && { content: DEFAULT_ABOUT_CONTENT })}, create:{key,title,eyebrow,body,visible:true,sortOrder:sectionRows.findIndex(x=>x[0]===key),...(key === "about" && { content: DEFAULT_ABOUT_CONTENT })} });
  for (let i=0;i<services.length;i++) { const [slug,title,description,icon,image]=services[i]; await db.service.upsert({ where:{slug}, update:{title,description,overview:`${description}. Honey Media House works with your team to define priorities, build a clear plan and deliver an approachable, measurable program.`,image,icon,status:PublishStatus.PUBLISHED,sortOrder:i,benefits:["A tailored plan aligned with your goals","Clear communication and collaborative delivery","A measurable approach you can review"],deliverables:["Discovery and recommendations","Implementation roadmap","Ongoing review and optimization"],process:["Discover","Strategize","Deliver","Review"],faqs:[{question:"How do we get started?",answer:"Share your goals through the project enquiry form and our team will follow up."}]}, create:{slug,title,description,overview:`${description}. Honey Media House works with your team to define priorities, build a clear plan and deliver an approachable, measurable program.`,image,icon,status:PublishStatus.PUBLISHED,sortOrder:i,benefits:["A tailored plan aligned with your goals","Clear communication and collaborative delivery","A measurable approach you can review"],deliverables:["Discovery and recommendations","Implementation roadmap","Ongoing review and optimization"],process:["Discover","Strategize","Deliver","Review"],faqs:[{question:"How do we get started?",answer:"Share your goals through the project enquiry form and our team will follow up."}]}}); }
  for(let i=0;i<industries.length;i++){const [slug,title,image]=industries[i];await db.industry.upsert({where:{slug},update:{title,image,description:`Growth support for ${title.toLowerCase()} teams.`,overview:`We help ${title.toLowerCase()} organizations communicate clearly, reach the right people and build a thoughtful growth foundation.`,challenges:["Standing out in a crowded landscape","Building trust with the right audience","Connecting effort to useful outcomes"],solutions:["Audience and positioning research","A practical digital growth roadmap","Consistent content and campaign support"],serviceSlugs:["digital-marketing","content-strategy","it-solutions"],status:PublishStatus.PUBLISHED,sortOrder:i},create:{slug,title,image,description:`Growth support for ${title.toLowerCase()} teams.`,overview:`We help ${title.toLowerCase()} organizations communicate clearly, reach the right people and build a thoughtful growth foundation.`,challenges:["Standing out in a crowded landscape","Building trust with the right audience","Connecting effort to useful outcomes"],solutions:["Audience and positioning research","A practical digital growth roadmap","Consistent content and campaign support"],serviceSlugs:["digital-marketing","content-strategy","it-solutions"],status:PublishStatus.PUBLISHED,sortOrder:i}})}
  for(const name of categories) await db.projectCategory.upsert({where:{name},update:{slug:name.toLowerCase().replace(/[^a-z0-9]+/g,"-")},create:{name,slug:name.toLowerCase().replace(/[^a-z0-9]+/g,"-")}});
  const projects = [
    ["sfw-the-gym","SFW The Gym","A sample fitness brand concept demonstrating social content and lead generation. Demo portfolio item; client relationship unverified.",photos.fitness,["Social Media","Lead Generation"]],
    ["wfs-academy","WFS Academy","An illustrative education brand direction focused on clear positioning and content. Demo portfolio item; client relationship unverified.",photos.education,["Branding","Social Media"]],
    ["twislight-lighting","TwisLight Lighting","A sample product-led website concept for a lighting brand. Demo portfolio item; client relationship unverified.",photos.ops,["Website","SEO"]],
    ["australian-premium-solar","Australian Premium Solar","A representative solar-business website concept. Demo portfolio item; client relationship unverified.",photos.realestate,["Website","Lead Generation"]],
  ] as const;
  for(let i=0;i<projects.length;i++){const [slug,title,description,image,cats]=projects[i];await db.project.upsert({where:{slug},update:{title,clientLabel:"Demo portfolio concept",description,overview:description,challenge:"Illustrative challenge for demo content: explain the offer clearly and make the next step easy.",approach:"Demo approach: align messaging, visual design and useful conversion paths.",deliverables:["Brand and audience direction","Digital content concepts","Conversion-focused experience"],gallery:[image],results:[],demoContent:true,verifiedResults:false,image,status:PublishStatus.PUBLISHED,sortOrder:i,categories:{set:[],connect:cats.map(name=>({name}))}},create:{slug,title,clientLabel:"Demo portfolio concept",description,overview:description,challenge:"Illustrative challenge for demo content: explain the offer clearly and make the next step easy.",approach:"Demo approach: align messaging, visual design and useful conversion paths.",deliverables:["Brand and audience direction","Digital content concepts","Conversion-focused experience"],gallery:[image],results:[],demoContent:true,verifiedResults:false,image,status:PublishStatus.PUBLISHED,sortOrder:i,categories:{connect:cats.map(name=>({name}))}}})}
  for(let i=0;i<processSteps.length;i++){const [title,description]=processSteps[i];await db.processStep.upsert({where:{id:`demo-process-${i+1}`},update:{title,description,sortOrder:i,visible:true},create:{id:`demo-process-${i+1}`,title,description,sortOrder:i,visible:true}})}
  await db.testimonial.deleteMany({where:{demoContent:true}});
  const demoTestimonials = [["Demo Person One","Business Owner","Demo Company","Demo testimonial—replace this placeholder with an authorized client quote."],["Demo Person Two","Founder","Demo Studio","Sample testimonial content for layout only. No client endorsement is implied."],["Demo Person Three","Director","Demo Brand","Illustrative testimonial. Replace or verify before publication."]] as const;
  for (const [i, t] of demoTestimonials.entries()) await db.testimonial.upsert({ where: { id: `demo-testimonial-${i + 1}` }, update: { name: t[0], role: t[1], company: t[2], quote: t[3], demoContent: true, status: PublishStatus.PUBLISHED, sortOrder: i }, create: { id: `demo-testimonial-${i + 1}`, name: t[0], role: t[1], company: t[2], quote: t[3], demoContent: true, status: PublishStatus.PUBLISHED, sortOrder: i } });
  for(const [slug,name] of [["digital-marketing","Digital Marketing"],["brand-strategy","Brand Strategy"],["social-media","Social Media"]]) await db.articleCategory.upsert({where:{name},update:{slug},create:{slug,name}});
  for(let i=0;i<articleRows.length;i++){const [slug,title,excerpt,image,category,body]=articleRows[i];const categoryName=category==="Digital Marketing"?category:category==="Brand Strategy"?category:"Social Media";let cat=await db.articleCategory.findUnique({where:{name:categoryName}});if(!cat)cat=await db.articleCategory.create({data:{name:categoryName,slug:categoryName.toLowerCase().replace(/ /g,"-")}});await db.article.upsert({where:{slug},update:{title,excerpt,body,image,categoryId:cat.id,status:PublishStatus.PUBLISHED,publishedAt:new Date(Date.now()-i*86400000)},create:{slug,title,excerpt,body,image,categoryId:cat.id,status:PublishStatus.PUBLISHED,publishedAt:new Date(Date.now()-i*86400000)}})}
  for(const [slug,title] of [["privacy-policy","Privacy Policy"],["terms","Terms & Conditions"]]) await db.legalPage.upsert({where:{slug},update:{title,status:PublishStatus.PUBLISHED},create:{slug,title,status:PublishStatus.PUBLISHED,body:`<p>This ${title.toLowerCase()} page is starter content. Add reviewed, jurisdiction-appropriate legal language before launch.</p><p>Contact <a href="mailto:hello@honeymediahouse.com">hello@honeymediahouse.com</a> with questions.</p>`}});
  console.log("Seed complete. Public projects/testimonials are explicitly marked demo; no client results or company metrics are asserted.");
}
main().catch(error=>{console.error(error);globalThis.process.exit(1)}).finally(()=>db.$disconnect());
