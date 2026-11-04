import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getPublishedServices } from "@/lib/content";
import { PageHero,CTA } from "@/components/ui";
export const metadata={title:"Services",description:"Digital marketing, IT solutions, social media, lead generation, HR, sales, content and operations consulting."};
export default async function Services(){const services=await getPublishedServices();return <><PageHero eyebrow="What we do" title="Everything you need to build, grow & scale" description="Flexible strategy and hands-on delivery across digital, technology, people and business growth."/><section className="section"><div className="container"><div className="service-grid">{services.map(item=><Link href={`/services/${item.slug}`} className="service-card" key={item.id}><div className="service-image"><Image src={item.image} alt="" fill sizes="(max-width:740px) 50vw,25vw"/></div><div className="service-content"><h2>{item.title}</h2><p>{item.description}</p><span className="text-link">Explore service <ArrowRight size={15}/></span></div></Link>)}</div>{!services.length&&<p className="empty-state">Services are being updated. Please contact us to discuss your needs.</p>}</div></section><CTA/></>}
