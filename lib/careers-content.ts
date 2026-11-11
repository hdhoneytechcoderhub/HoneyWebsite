export type CareerDepartment =
  | "Marketing"
  | "IT & Development"
  | "Creative"
  | "Content"
  | "Sales & Growth"
  | "Human Resources";

export type CareerRole = {
  id: string;
  slug: string;
  title: string;
  department: CareerDepartment;
  location: string;
  summary: string;
  icon: "megaphone" | "code" | "pen" | "file" | "chart" | "users";
  status: "open" | "closed";
  demo: boolean;
  overview: string;
  responsibilities: string[];
  skills: string[];
  workMode?: string;
  employmentType?: string;
  deadline?: string;
  experience?: string;
  benefits?: string[];
};

export const careerRoles: CareerRole[] = [
  {
    id: "role-digital-marketing-executive",
    slug: "digital-marketing-executive",
    title: "Digital Marketing Executive",
    department: "Marketing",
    location: "Ahmedabad / Remote",
    summary: "Plan and execute digital campaigns, manage social media and help brands grow.",
    icon: "megaphone",
    status: "open",
    demo: true,
    overview: "A sample role for a curious marketer who enjoys planning useful campaigns, creating social content and learning from performance. This illustrative listing is not a confirmed vacancy.",
    responsibilities: ["Support planning and delivery of digital campaigns.", "Coordinate social media calendars and publishing.", "Review campaign activity and share clear learnings with the team."],
    skills: ["Interest in digital marketing and social media", "Clear written and verbal communication", "Organized, collaborative approach"],
  },
  {
    id: "role-mern-stack-developer",
    slug: "mern-stack-developer",
    title: "MERN Stack Developer",
    department: "IT & Development",
    location: "Ahmedabad / Remote",
    summary: "Work on real projects, build websites and web applications using MERN stack.",
    icon: "code",
    status: "open",
    demo: true,
    overview: "A sample development role for someone interested in building thoughtful web experiences with the MERN stack. This illustrative listing does not represent an active, verified vacancy.",
    responsibilities: ["Build and refine responsive websites and web applications.", "Collaborate with design and project teams on implementation.", "Test work and contribute to maintainable project code."],
    skills: ["Familiarity with JavaScript and React", "Interest in Node.js, Express and MongoDB", "Care for usability, responsive design and code quality"],
  },
  {
    id: "role-graphic-designer",
    slug: "graphic-designer",
    title: "Graphic Designer",
    department: "Creative",
    location: "Ahmedabad / Remote",
    summary: "Design social media creatives, brand collaterals and marketing materials.",
    icon: "pen",
    status: "open",
    demo: true,
    overview: "A sample creative role for a designer who enjoys turning a brief into clear, distinctive visual communication. This illustrative listing is not a confirmed vacancy.",
    responsibilities: ["Develop social media and campaign creative concepts.", "Create brand collateral and marketing materials.", "Work with the team to keep designs consistent and on-brief."],
    skills: ["A portfolio that demonstrates visual design thinking", "Familiarity with common design tools", "Attention to detail and openness to feedback"],
  },
  {
    id: "role-content-writer",
    slug: "content-writer",
    title: "Content Writer",
    department: "Content",
    location: "Remote",
    summary: "Create engaging content for social media, websites and campaigns.",
    icon: "file",
    status: "open",
    demo: true,
    overview: "A sample writing role for someone who can make ideas clear, engaging and useful across digital channels. This illustrative listing does not represent an active, verified vacancy.",
    responsibilities: ["Draft content for social posts, websites and campaigns.", "Adapt tone and format to suit different audiences.", "Review copy for clarity, consistency and accuracy."],
    skills: ["Strong writing and editing fundamentals", "Ability to work from a brief and meet agreed timelines", "Curiosity about brands and digital content"],
  },
  {
    id: "role-business-development-executive",
    slug: "business-development-executive",
    title: "Business Development Executive",
    department: "Sales & Growth",
    location: "Ahmedabad",
    summary: "Identify new opportunities, connect with clients and help businesses grow.",
    icon: "chart",
    status: "open",
    demo: true,
    overview: "A sample growth role focused on thoughtful outreach, understanding business needs and helping build new relationships. This illustrative listing is not a confirmed vacancy.",
    responsibilities: ["Research potential business opportunities and relevant organizations.", "Support clear, helpful conversations with prospective clients.", "Coordinate with internal teams to understand needs and next steps."],
    skills: ["Confident, respectful communication", "Interest in business growth and relationship building", "Good listening, organization and follow-through"],
  },
  {
    id: "role-hr-executive",
    slug: "hr-executive",
    title: "HR Executive",
    department: "Human Resources",
    location: "Ahmedabad",
    summary: "Handle recruitment, team coordination and HR operations.",
    icon: "users",
    status: "open",
    demo: true,
    overview: "A sample people-operations role supporting thoughtful recruitment, team coordination and day-to-day HR processes. This illustrative listing is not an active, verified vacancy.",
    responsibilities: ["Assist with recruitment coordination and candidate communication.", "Support team activities, records and routine HR operations.", "Help keep people processes organized and welcoming."],
    skills: ["Interest in people operations and recruitment", "Discretion and attention to detail", "Friendly, organized communication"],
  },
];

export const careerDepartments = [
  "Marketing",
  "IT & Development",
  "Creative",
  "Content",
  "Sales & Growth",
  "Human Resources",
] as const;

export function getCareerRole(slug: string): CareerRole | null {
  return careerRoles.find((role) => role.slug === slug) ?? null;
}

export const careerImages = {
  team: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1800&q=85",
  culture: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=85",
  office: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1300&q=85",
  recruitment: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1800&q=85",
} as const;

export type CareerIcon = "chat" | "users" | "learn" | "chart" | "heart" | "calendar" | "gift" | "coffee" | "star" | "apply" | "screen" | "interview" | "check" | "rocket";
export type CareerFeature = { icon: CareerIcon; title: string; description?: string; demo?: boolean };

export const cultureFeatures: CareerFeature[] = [
  { icon: "chat", title: "Open Communication" },
  { icon: "users", title: "Team Collaboration" },
  { icon: "learn", title: "Continuous Learning" },
  { icon: "chart", title: "Career Growth" },
  { icon: "heart", title: "Work-Life Balance" },
];

export const careerPerks: CareerFeature[] = [
  { icon: "calendar", title: "Flexible Work Options", demo: true },
  { icon: "learn", title: "Learning & Development", demo: true },
  { icon: "gift", title: "Performance Rewards", demo: true },
  { icon: "users", title: "Friendly & Supportive Team", demo: true },
  { icon: "coffee", title: "Snacks & Chill Space", demo: true },
  { icon: "star", title: "Opportunity to Grow", demo: true },
];

export type HiringStep = { number: string; icon: CareerIcon; title: string };
export const hiringSteps: HiringStep[] = [
  { number: "1", icon: "apply", title: "Apply Online" },
  { number: "2", icon: "screen", title: "Initial Screening" },
  { number: "3", icon: "interview", title: "Interview" },
  { number: "4", icon: "check", title: "Final Selection" },
  { number: "5", icon: "rocket", title: "Welcome to the Team" },
];