"use client";

import Image from "next/image";
import { useRef } from "react";
import { Plus, X } from "lucide-react";

type Member = { name: string; role: string; image: string; imageAlt: string };
type Department = { title: string; description: string; image: string; imageAlt: string; members: Member[] };

export function AboutDepartments({ departments }: { departments: Department[] }) {
  const dialogs = useRef<Record<number, HTMLDialogElement | null>>({});
  return <div className="about-departments">{departments.map((department, index) => {
    const hasDetails = department.members.length > 0;
    return <article className="about-department" key={`${department.title}-${index}`}>
      <div className="about-department-image"><Image src={department.image} alt={department.imageAlt} width={900} height={530} sizes="(max-width:740px) 100vw,25vw" loading="lazy"/></div>
      <div className="about-department-copy"><div><h3>{department.title}</h3><p>{department.description}</p></div>{hasDetails && <button className="about-department-open" type="button" aria-label={`More about ${department.title}`} aria-haspopup="dialog" onClick={() => dialogs.current[index]?.showModal()}><Plus size={18}/></button>}</div>
      {hasDetails && <dialog className="about-dialog" ref={node => { dialogs.current[index] = node; }} aria-labelledby={`about-dept-title-${index}`} onClick={event => { if (event.target === event.currentTarget) event.currentTarget.close(); }}><div className="about-dialog-card"><button className="about-dialog-close" type="button" aria-label="Close department details" onClick={() => dialogs.current[index]?.close()}><X size={20}/></button><p className="eyebrow">Our team</p><h2 id={`about-dept-title-${index}`}>{department.title}</h2><p>{department.description}</p>{department.members.map((member, memberIndex) => <div className="about-member" key={`${member.name}-${memberIndex}`}>{member.image ? <Image src={member.image} alt={member.imageAlt || `Portrait of ${member.name}`} width={80} height={80} loading="lazy"/> : <span className="about-member-placeholder" aria-hidden="true">{member.name.slice(0, 1)}</span>}<div><strong>{member.name}</strong><span>{member.role}</span></div></div>)}</div></dialog>}
    </article>;
  })}</div>;
}
