"use client";

import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { X } from "lucide-react";

const MAX_RESUME_BYTES = 5 * 1024 * 1024;
const RESUME_EXTENSIONS = [".pdf", ".docx"];
type Errors = Record<string, string>;

export function CareerApplication({ jobTitle, isOpen }: { jobTitle: string; isOpen: boolean }) {
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [feedback, setFeedback] = useState("");
  const [fileName, setFileName] = useState("");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      document.body.classList.add("career-dialog-open");
      window.setTimeout(() => dialog.querySelector<HTMLElement>("[data-application-close]")?.focus(), 0);
    } else if (!open && dialog.open) {
      dialog.close();
      document.body.classList.remove("career-dialog-open");
    }
  }, [open]);

  useEffect(() => () => document.body.classList.remove("career-dialog-open"), []);

  const restoreFocus = () => {
    setOpen(false);
    document.body.classList.remove("career-dialog-open");
    window.setTimeout(() => triggerRef.current?.focus(), 0);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      restoreFocus();
    }
    if (event.key !== "Tab") return;
    const dialog = dialogRef.current;
    if (!dialog) return;
    const nodes = Array.from(dialog.querySelectorAll<HTMLElement>('button:not([disabled]), input:not([disabled]), textarea:not([disabled]), a[href]'));
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    if (!first || !last) return;
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const validate = (form: HTMLFormElement): Errors => {
    const data = new FormData(form);
    const next: Errors = {};
    const fullName = String(data.get("fullName") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    if (fullName.length < 2 || fullName.length > 120) next.fullName = "Enter your full name (2–120 characters).";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Enter a valid email address.";
    if (!/^[+()0-9.\-\s]{7,30}$/.test(phone)) next.phone = "Enter a valid phone number.";
    const resume = data.get("resume");
    if (!(resume instanceof File) || resume.size === 0) {
      next.resume = "Choose a PDF or DOCX resume file.";
    } else {
      const lower = resume.name.toLocaleLowerCase();
      if (!RESUME_EXTENSIONS.some((extension) => lower.endsWith(extension))) next.resume = "Resume must be a PDF or DOCX file.";
      else if (resume.size > MAX_RESUME_BYTES) next.resume = "Resume must be 5 MB or smaller.";
    }
    for (const [field, label] of [["portfolioUrl", "Portfolio"], ["linkedinUrl", "LinkedIn"]] as const) {
      const value = String(data.get(field) ?? "").trim();
      if (value && !/^https?:\/\/\S+$/i.test(value)) next[field] = `Enter a valid ${label} URL starting with http:// or https://.`;
    }
    return next;
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next = validate(event.currentTarget);
    setErrors(next);
    if (Object.keys(next).length) {
      setFeedback("Please review the highlighted fields.");
      dialogRef.current?.querySelector<HTMLElement>(`[name="${Object.keys(next)[0]}"]`)?.focus();
      return;
    }
    setFeedback("Demo only — your application has not been submitted or saved.");
  };

  const errorFor = (name: string) => errors[name] ? <span className="career-field-error" id={`${name}-error`}>{errors[name]}</span> : null;
  const invalidProps = (name: string) => ({ "aria-invalid": Boolean(errors[name]), "aria-describedby": errors[name] ? `${name}-error` : undefined });

  return (
    <>
      <button ref={triggerRef} className="button" type="button" onClick={() => { setFeedback(""); setErrors({}); setOpen(true); }} disabled={!isOpen}>
        {isOpen ? "Apply Now" : "Applications Closed"}
      </button>
      <dialog
        className="career-application-dialog"
        ref={dialogRef}
        aria-labelledby="career-application-title"
        onClose={restoreFocus}
        onKeyDown={onKeyDown}
        onMouseDown={(event) => { if (event.target === dialogRef.current) restoreFocus(); }}
      >
        <div className="career-application-card">
          <button className="career-application-close" type="button" data-application-close aria-label="Close application form" onClick={restoreFocus}><X size={19} /></button>
          <p className="eyebrow">Frontend demo</p>
          <h2 id="career-application-title">Apply for {jobTitle}</h2>
          <p className="career-application-notice">Frontend demo — applications are not sent or saved.</p>
          {feedback && <p className={`career-form-feedback${Object.keys(errors).length ? " is-error" : ""}`} role={Object.keys(errors).length ? "alert" : "status"}>{feedback}</p>}
          <form className="career-application-form" onSubmit={submit} noValidate>
            <input type="hidden" name="jobTitle" value={jobTitle} readOnly />
            <div className="career-form-grid">
              <div className="career-field"><label htmlFor="career-fullName">Full name <span>*</span></label><input id="career-fullName" name="fullName" autoComplete="name" required {...invalidProps("fullName")} />{errorFor("fullName")}</div>
              <div className="career-field"><label htmlFor="career-email">Email <span>*</span></label><input id="career-email" name="email" type="email" autoComplete="email" required {...invalidProps("email")} />{errorFor("email")}</div>
              <div className="career-field"><label htmlFor="career-phone">Phone <span>*</span></label><input id="career-phone" name="phone" type="tel" autoComplete="tel" required {...invalidProps("phone")} />{errorFor("phone")}</div>
              <div className="career-field"><label htmlFor="career-city">Current city</label><input id="career-city" name="city" autoComplete="address-level2" /></div>
              <div className="career-field"><label htmlFor="career-experience">Experience</label><input id="career-experience" name="experience" placeholder="e.g. 2 years" /></div>
              <div className="career-field career-field-file"><label htmlFor="career-resume">Resume <span>*</span></label><input id="career-resume" name="resume" type="file" accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document" required aria-invalid={Boolean(errors.resume)} aria-describedby={errors.resume ? "resume-error" : "career-resume-help"} onChange={(event) => { setFileName(event.currentTarget.files?.[0]?.name ?? ""); setErrors((current) => { const copy = { ...current }; delete copy.resume; return copy; }); }} />{errorFor("resume")}<small id="career-resume-help">PDF or DOCX, up to 5 MB. Selected file stays on this device.</small>{fileName && <span className="career-file-name">Selected: {fileName}</span>}</div>
              <div className="career-field"><label htmlFor="career-portfolio">Portfolio URL</label><input id="career-portfolio" name="portfolioUrl" type="url" placeholder="https://" {...invalidProps("portfolioUrl")} />{errorFor("portfolioUrl")}</div>
              <div className="career-field"><label htmlFor="career-linkedin">LinkedIn URL</label><input id="career-linkedin" name="linkedinUrl" type="url" placeholder="https://linkedin.com/in/…" {...invalidProps("linkedinUrl")} />{errorFor("linkedinUrl")}</div>
              <div className="career-field career-field-full"><label htmlFor="career-message">Optional message</label><textarea id="career-message" name="message" rows={4} /></div>
            </div>
            <button className="button" type="submit">Review Application</button>
            <small className="career-application-notice">No file upload, email, API call, or personal-data storage occurs.</small>
          </form>
        </div>
      </dialog>
    </>
  );
}
