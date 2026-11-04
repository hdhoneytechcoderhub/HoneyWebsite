"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DEFAULT_ABOUT_CONTENT, type AboutPageContent } from "@/lib/about-page";

type AdminValue = { content: AboutPageContent; visible: boolean; stats: { value: string; label: string }[]; publishState: boolean };
const statsDefault = Array.from({ length: 4 }, () => ({ value: "", label: "" }));

export function AdminAboutEditor() {
  const router = useRouter();
  const [value, setValue] = useState<AdminValue>({ content: DEFAULT_ABOUT_CONTENT, visible: false, stats: statsDefault, publishState: false });
  const [jsonDrafts, setJsonDrafts] = useState<Partial<Record<"hero" | "story" | "purpose" | "founder" | "team" | "cta" | "seo", string>>>({});
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    let alive = true;
    fetch("/api/admin/about", { cache: "no-store" }).then(async response => {
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Unable to load About content.");
      if (alive) {
        setValue({ content: data.content, visible: false, stats: Array.isArray(data.stats) ? data.stats : statsDefault, publishState: data.visible });
        setJsonDrafts(Object.fromEntries(["hero", "story", "purpose", "founder", "team", "cta", "seo"].map(key => [key, JSON.stringify(data.content[key], null, 2)])));
      }
    }).catch(reason => { if (alive) setError(reason instanceof Error ? reason.message : "Unable to load About content."); });
    return () => { alive = false; };
  }, []);

  function updateContent(section: "hero" | "story" | "purpose" | "founder" | "team" | "cta" | "seo", text: string) {
    setJsonDrafts(current => ({ ...current, [section]: text }));
    try {
      const parsed = JSON.parse(text);
      setValue(current => ({ ...current, content: { ...current.content, [section]: parsed } }));
      setError("");
    } catch { setError(`${section} JSON is incomplete. Finish the edit before saving.`); }
  }
  function updateStat(index: number, key: "value" | "label", next: string) {
    setValue(current => ({ ...current, stats: current.stats.map((item, i) => i === index ? { ...item, [key]: next } : item) }));
  }
  function moveSection(index: number, direction: -1 | 1) {
    setValue(current => {
      const sectionOrder = [...current.content.sectionOrder];
      const next = index + direction;
      if (next < 0 || next >= sectionOrder.length) return current;
      [sectionOrder[index], sectionOrder[next]] = [sectionOrder[next], sectionOrder[index]];
      return { ...current, content: { ...current.content, sectionOrder } };
    });
  }
  async function save(publish: boolean) {
    for (const [section, text] of Object.entries(jsonDrafts)) {
      if (text === undefined) continue;
      try { JSON.parse(text); }
      catch { setError(`${section} JSON is incomplete. Finish the edit before saving.`); return; }
    }
    setBusy(true); setMessage(""); setError("");
    try {
      const content = { ...value.content, demoContent: !publish || value.content.founder.isDemo || value.content.story.timeline.some(item => item.demo) };
      const response = await fetch("/api/admin/about", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ content, visible: publish, stats: value.stats }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Unable to save About content.");
      setValue({ content: result.content, visible: false, stats: result.stats, publishState: publish });
      setJsonDrafts(Object.fromEntries(["hero", "story", "purpose", "founder", "team", "cta", "seo"].map(key => [key, JSON.stringify(result.content[key], null, 2)])));
      setMessage(publish ? "About page published. Public content has been refreshed." : "Draft saved. The current public About page is unchanged.");
      router.refresh();
    } catch (reason) { setError(reason instanceof Error ? reason.message : "Unable to save About content."); }
    finally { setBusy(false); }
  }

  const editSection = (key: "hero" | "story" | "purpose" | "founder" | "team" | "cta" | "seo", title: string, note: string) => <details className="about-admin-section" key={key} open={key === "hero" || key === "seo"}>
    <summary>{title}</summary><p>{note}</p>
    <label className="field"><span>{title} content (JSON)</span><textarea aria-label={`${title} JSON`} rows={key === "story" || key === "team" ? 14 : 11} value={jsonDrafts[key] ?? JSON.stringify(value.content[key], null, 2)} onChange={event => updateContent(key, event.target.value)}/></label>
  </details>;

  return <form className="admin-panel admin-about-editor" onSubmit={event => { event.preventDefault(); void save(false); }}>
    <p className="about-admin-help">Edit section JSON, keeping the shown field structure. Image uploads are handled through the existing media storage configuration; use an /images path or approved HTTPS media URL.</p>
    <p className="about-admin-publish-state">Public page status: <strong>{value.publishState ? "Published" : "Draft / default preview"}</strong></p>
    <h2>Section visibility and order</h2><ol className="about-admin-order">{value.content.sectionOrder.map((section, index) => <li key={section}><label><input type="checkbox" checked={value.content.sectionVisibility[section]} onChange={event => setValue(current => ({ ...current, content: { ...current.content, sectionVisibility: { ...current.content.sectionVisibility, [section]: event.target.checked } } }))}/>{section[0].toUpperCase() + section.slice(1)}</label><div><button className="button button-small button-outline" type="button" aria-label={`Move ${section} up`} disabled={index === 0} onClick={() => moveSection(index, -1)}>↑</button><button className="button button-small button-outline" type="button" aria-label={`Move ${section} down`} disabled={index === value.content.sectionOrder.length - 1} onClick={() => moveSection(index, 1)}>↓</button></div></li>)}</ol>
    <h2>Shared business statistics</h2><p>These are the same site settings shown on the homepage. Leave metrics blank until confirmed.</p><div className="admin-form-grid">{value.stats.map((stat, index) => <fieldset className="admin-stat-editor" key={index}><legend>Statistic {index + 1}</legend><div className="field"><label htmlFor={`about-stat-value-${index}`}>Value</label><input id={`about-stat-value-${index}`} maxLength={40} value={stat.value} onChange={event => updateStat(index, "value", event.target.value)}/></div><div className="field"><label htmlFor={`about-stat-label-${index}`}>Label</label><input id={`about-stat-label-${index}`} maxLength={80} value={stat.label} onChange={event => updateStat(index, "label", event.target.value)}/></div></fieldset>)}</div>
    {editSection("hero", "Hero", "Heading, image, buttons and descriptive text.")}
    {editSection("story", "Our Story", "Story paragraphs and ordered timeline entries. Mark unverified milestones as demo.")}
    {editSection("purpose", "Our Purpose", "Mission, vision and values cards, including Lucide icon names.")}
    {editSection("founder", "Founder", "Only publish confirmed founder details and supplied portraits/signature. Social URLs must be HTTPS.")}
    {editSection("team", "Team Departments", "Manage department cards and configured team members. Keep member identities blank until confirmed.")}
    {editSection("cta", "Bottom CTA", "Banner copy, image, benefits, strategy and WhatsApp labels/message.")}
    {editSection("seo", "SEO", "Metadata title, description and social image.")}
    {error && <p role="alert" className="field-error">{error}</p>}{message && <p role="status" className="success-message">{message}</p>}
    <div className="inline-form"><button className="button" type="button" disabled={busy} onClick={() => void save(true)}>{busy ? "Saving…" : "Save & publish"}</button><button className="button button-outline" type="button" disabled={busy} onClick={() => void save(false)}>Save as draft</button></div>
  </form>;
}
