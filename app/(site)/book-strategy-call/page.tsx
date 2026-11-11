import { Form } from "@/components/forms";
import { PageHero } from "@/components/ui";
export const metadata = { title: "Book a Strategy Call", description: "Request a social media strategy call with Honey Media House. Share your goals and preferred time so our team can follow up." };
export default function StrategyCallPage() { return <><PageHero eyebrow="Plan your next step" title="Let’s talk about your social strategy." description="Share a little about your brand and choose a preferred time. We’ll follow up to confirm the conversation." /><section className="section cream"><div className="container"><div className="form-wrap"><p className="eyebrow">Strategy call request</p><h2 className="section-title">Bring your big question.</h2><Form kind="strategy" /></div></div></section></>; }
