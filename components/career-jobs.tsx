"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, BriefcaseBusiness, ChartNoAxesColumnIncreasing, Code2, FileText, MapPin, Megaphone, PenTool, Users } from "lucide-react";
import { careerDepartments, careerRoles, type CareerRole } from "@/lib/careers-content";

const roleIcons = {
  megaphone: Megaphone,
  code: Code2,
  pen: PenTool,
  file: FileText,
  chart: ChartNoAxesColumnIncreasing,
  users: Users,
} as const;

export function CareerJobs() {
  const [query, setQuery] = useState("");
  const [department, setDepartment] = useState("");
  const roles = useMemo(() => {
    const term = query.trim().toLocaleLowerCase();
    return careerRoles.filter((role) => {
      if (role.status !== "open") return false;
      const textMatches = !term || [role.title, role.department, role.summary, role.location, ...role.skills, ...role.responsibilities].join(" ").toLocaleLowerCase().includes(term);
      const departmentMatches = !department || role.department === department;
      return textMatches && departmentMatches;
    });
  }, [query, department]);

  const clearFilters = () => {
    setQuery("");
    setDepartment("");
  };

  return (
    <div className="career-listing">
      <div className="career-filter-bar">
        <label className="career-search" htmlFor="career-search">
          <span className="sr-only">Search by job title, department or keywords</span>
          <SearchIcon />
          <input id="career-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search job title, department, keywords…" />
        </label>
        <label className="career-department-select" htmlFor="career-department">
          <span className="sr-only">Filter by department</span>
          <select id="career-department" value={department} onChange={(event) => setDepartment(event.target.value)}>
            <option value="">All Departments</option>
            {careerDepartments.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </label>
        {(query || department) && <button className="career-clear" type="button" onClick={clearFilters}>Clear Filters</button>}
      </div>
      <p className="career-result-count" role="status" aria-live="polite">Showing {roles.length} {roles.length === 1 ? "opening" : "openings"}</p>
      {roles.length ? (
        <ul className="career-role-grid">
          {roles.map((role) => <CareerCard key={role.id} role={role} />)}
        </ul>
      ) : careerRoles.every((role) => role.status !== "open") ? (
        <div className="career-empty" role="status">
          <BriefcaseBusiness aria-hidden="true" />
          <h3>There are no open roles right now</h3>
          <p>Please check back later for new opportunities at Honey Media House.</p>
        </div>
      ) : (
        <div className="career-empty" role="status">
          <BriefcaseBusiness aria-hidden="true" />
          <h3>No roles match those filters</h3>
          <p>Try another search or clear the filters to see all sample openings.</p>
          <button className="button button-outline" type="button" onClick={clearFilters}>Clear Filters</button>
        </div>
      )}
    </div>
  );
}

function SearchIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 5 5"/></svg>;
}

function CareerCard({ role }: { role: CareerRole }) {
  const Icon = roleIcons[role.icon];
  return (
    <li>
      <article className="career-role-card">
        <Icon className="career-role-icon" aria-hidden="true" />
        <div className="career-role-copy">
          <h3>{role.title}</h3>
          <div className="career-role-badges"><span>{role.department}</span><span><MapPin aria-hidden="true" />{role.location}</span></div>
          {role.demo && <span className="career-demo-badge">Demo opening</span>}
          <p>{role.summary}</p>
          <Link href={`/careers/${role.slug}`} className="career-view-link">View Details <ArrowRight size={15} aria-hidden="true" /></Link>
        </div>
      </article>
    </li>
  );
}
