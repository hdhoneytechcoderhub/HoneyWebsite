import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, BriefcaseBusiness, MapPin } from "lucide-react";
import { CareerApplication } from "@/components/career-application";
import { getCareerRole } from "@/lib/careers-content";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const role = getCareerRole(slug);
  if (!role) return { title: "Role not found" };
  return {
    title: role.title,
    description: role.summary,
    alternates: { canonical: `/careers/${role.slug}` },
    robots: role.demo ? { index: false, follow: true } : undefined,
  };
}

export default async function CareerDetailPage({ params }: Props) {
  const { slug } = await params;
  const role = getCareerRole(slug);
  if (!role) notFound();
  const isOpen = role.status === "open";

  return (
    <div className="career-detail-page">
      <section className="career-detail-hero">
        <div className="container">
          <nav className="career-breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link><span aria-hidden="true">/</span><Link href="/careers">Careers</Link><span aria-hidden="true">/</span><span aria-current="page">{role.title}</span>
          </nav>
          <p className="eyebrow">{role.department}</p>
          <h1>{role.title}</h1>
          {role.demo && <span className="career-demo-badge career-detail-demo">Demo opening — not a confirmed vacancy</span>}
          <p className="career-detail-summary">{role.summary}</p>
          <div className="career-detail-meta">
            <span><BriefcaseBusiness aria-hidden="true" />{role.department}</span>
            <span><MapPin aria-hidden="true" />{role.location}</span>
            {role.workMode && <span>{role.workMode}</span>}
            {role.employmentType && <span>{role.employmentType}</span>}
          </div>
          {role.deadline && <p className="career-deadline">Application deadline: {role.deadline}</p>}
        </div>
      </section>

      <section className="section career-detail-content">
        <div className="container career-detail-grid">
          <div className="career-detail-main">
            <p className="eyebrow">Role Overview</p>
            <h2 className="section-title">About this opportunity</h2>
            <p className="career-detail-text">{role.overview}</p>
            {role.demo && <p className="career-detail-notice">This is sample role information for the website preview only. Please confirm hiring status and role details before publication.</p>}
            <h2 className="section-title">Responsibilities</h2>
            <ul className="list-check">{role.responsibilities.map((item) => <li key={item}>{item}</li>)}</ul>
            <h2 className="section-title">Required skills</h2>
            <ul className="list-check">{role.skills.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
          <aside className="career-detail-aside" id="career-role-details" aria-label="Additional job information">
            <h2>Role details</h2>
            <dl>
              <div><dt>Department</dt><dd>{role.department}</dd></div>
              <div><dt>Location</dt><dd>{role.location}</dd></div>
              {role.workMode && <div><dt>Work mode</dt><dd>{role.workMode}</dd></div>}
              {role.employmentType && <div><dt>Employment type</dt><dd>{role.employmentType}</dd></div>}
              {role.experience && <div><dt>Experience</dt><dd>{role.experience}</dd></div>}
            </dl>
            {role.benefits && role.benefits.length > 0 && <><h3>Benefits</h3><ul>{role.benefits.map((benefit) => <li key={benefit}>{benefit}</li>)}</ul></>}
            <CareerApplication jobTitle={role.title} isOpen={isOpen} />
          </aside>
        </div>
      </section>
      <section className="section career-detail-back">
        <div className="container"><Link className="career-view-link" href="/careers#open-positions">See all openings <ArrowRight size={15} /></Link></div>
      </section>
    </div>
  );
}
