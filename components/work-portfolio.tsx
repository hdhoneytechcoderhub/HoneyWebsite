"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  workCategories,
  workItems,
  type WorkCategory,
  type WorkItem,
} from "@/lib/work-content";

const cardSizes = "(max-width: 560px) calc(100vw - 36px), (max-width: 900px) 45vw, 19vw";

function Poster({ item }: { item: WorkItem }) {
  const poster = item.poster;
  if (!poster) return null;
  return (
    <span className={`work-poster work-poster-${poster.tone} work-poster-${poster.align ?? "left"}`}>
      {poster.kicker && <span className="work-poster-kicker">{poster.kicker}</span>}
      {poster.logo && <Image className="work-poster-logo" src="/images/honey-media-house-mark.svg" alt="Honey Media House mark" width={60} height={75} />}
      <span className="work-poster-lines">
        {poster.lines.map((line) => (
          <span key={line}>{line}</span>
        ))}
      </span>
      {poster.caption && <span className="work-poster-caption">{poster.caption}</span>}
    </span>
  );
}

export function WorkPortfolio() {
  const [active, setActive] = useState<WorkCategory>("All");
  const [selected, setSelected] = useState<WorkItem | null>(null);
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const shown = active === "All" ? workItems : workItems.filter((item) => item.category === active);

  const open = (item: WorkItem, trigger: HTMLElement) => {
    triggerRef.current = trigger;
    setSelected(item);
  };

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (selected) {
      if (!dialog.open) dialog.showModal();
      document.body.classList.add("work-dialog-open");
      const target = dialog.querySelector<HTMLElement>("[data-dialog-close]");
      window.setTimeout(() => target?.focus(), 0);
    } else if (dialog.open) {
      dialog.close();
      document.body.classList.remove("work-dialog-open");
    }
  }, [selected]);

  useEffect(() => () => document.body.classList.remove("work-dialog-open"), []);

  const handleDialogClose = () => {
    document.body.classList.remove("work-dialog-open");
    setSelected(null);
    const trigger = triggerRef.current;
    triggerRef.current = null;
    if (trigger && document.contains(trigger)) trigger.focus();
  };

  /* Keep Tab focus inside the dialog while it is open. */
  const trapFocus = (event: React.KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      handleDialogClose();
      return;
    }
    if (event.key !== "Tab") return;
    const dialog = dialogRef.current;
    if (!dialog) return;
    const focusable = Array.from(
      dialog.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"]), input, select, textarea'
      )
    ).filter((el) => el.offsetParent !== null || el === document.activeElement);
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const current = document.activeElement;
    if (event.shiftKey && (current === first || !dialog.contains(current))) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && current === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return (
    <section className="wk-section wk-samples" id="sample-work" aria-labelledby="wk-samples-title">
      <div className="wk-shell">
        <div className="wk-samples-head">
          <div>
            <p className="wk-kicker">Sample Work</p>
            <h2 id="wk-samples-title">Creative Concepts<br />&amp; Sample Designs</h2>
            <p className="wk-samples-lead">As a startup, we focus on giving you a clear idea of our creative style and capabilities. Here are some sample concepts we can create for your brand.</p>
          </div>
          <div className="wk-filters" role="group" aria-label="Filter sample work by category">
            {workCategories.map((name) => (
              <button
                key={name}
                type="button"
                className="wk-filter"
                aria-pressed={active === name}
                onClick={() => setActive(name)}
              >
                {name}
              </button>
            ))}
          </div>
        </div>

        <p className="wk-count" role="status" aria-live="polite">
          Showing {shown.length} of {workItems.length} sample concepts
          {active !== "All" ? ` in ${active}` : ""}
        </p>

        {shown.length > 0 ? (
          <ul className="wk-grid">
            {shown.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  className="wk-card"
                  aria-haspopup="dialog"
                  onClick={(event) => open(item, event.currentTarget)}
                >
                  <span className="wk-card-media">
                    <Image src={item.image} alt={item.imageAlt} fill sizes={cardSizes} />
                    <Poster item={item} />
                  </span>
                  <span className="wk-card-title">{item.title}</span>
                  <span className="wk-card-sub">{item.subtitle}</span>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="wk-empty">
            <p className="wk-empty-title">No concepts in this category yet.</p>
            <p className="wk-empty-text">We are still filling this shelf. Browse everything we have created so far, or tell us what you need and we will design it for you.</p>
            <div className="wk-actions">
              <button type="button" className="wk-btn" onClick={() => setActive("All")}>Show all concepts</button>
              <Link className="wk-btn wk-btn-ghost" href="/contact">Request a Sample <ArrowRight size={15} /></Link>
            </div>
          </div>
        )}
      </div>

      <dialog
        className="work-dialog"
        ref={dialogRef}
        aria-labelledby="work-dialog-title"
        onClose={handleDialogClose}
        onKeyDown={trapFocus}
        onMouseDown={(event) => {
          if (event.target === dialogRef.current) handleDialogClose();
        }}
      >
        {selected && (
          <div className="work-dialog-card">
            <button
              type="button"
              className="work-dialog-close"
              data-dialog-close
              aria-label="Close sample preview"
              onClick={handleDialogClose}
            >
              <X size={18} />
            </button>
            <div className="work-dialog-media">
              <Image src={selected.image} alt={selected.imageAlt} fill sizes="(max-width: 760px) calc(100vw - 40px), 430px" />
              <Poster item={selected} />
            </div>
            <div className="work-dialog-body">
              <p className="wk-kicker">{selected.category}</p>
              <h2 id="work-dialog-title">{selected.title} <span>{selected.subtitle}</span></h2>
              <p className="work-dialog-note">Concept/sample work — illustrative design preview, not a verified client project or a reported business result.</p>
              <h3>Overview</h3>
              <p className="work-dialog-text">{selected.overview}</p>
              <h3>Deliverables</h3>
              <ul className="work-dialog-list">
                {selected.deliverables.map((entry) => (
                  <li key={entry}>{entry}</li>
                ))}
              </ul>
              {selected.gallery && selected.gallery.length > 0 && (
                <>
                  <h3>Gallery</h3>
                  <div className="work-dialog-gallery">
                    {selected.gallery.map((image, index) => (
                      <Image
                        key={`${selected.id}-gallery-${index}`}
                        src={image}
                        alt={`${selected.title} ${selected.subtitle} concept preview ${index + 1}`}
                        width={340}
                        height={240}
                        sizes="(max-width: 760px) 40vw, 200px"
                      />
                    ))}
                  </div>
                </>
              )}
              <div className="wk-actions">
                <Link className="wk-btn" href={`/contact?project=${encodeURIComponent(`${selected.title} ${selected.subtitle}`)}`}>
                  Discuss a Similar Project <ArrowRight size={15} />
                </Link>
                <Link className="wk-btn wk-btn-ghost" href={`/work/${selected.slug}`}>
                  View Full Details
                </Link>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}
