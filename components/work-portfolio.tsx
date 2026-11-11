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

const cardSizes =
  "(max-width: 520px) calc(100vw - 40px), (max-width: 820px) 46vw, (max-width: 1100px) 31vw, 18vw";

function Poster({ item }: { item: WorkItem }) {
  const poster = item.poster;
  if (!poster) return null;
  return (
    <span className={`work-poster work-poster-${poster.tone} work-poster-${poster.align ?? "left"}`}>
      {poster.kicker && <span className="work-poster-kicker">{poster.kicker}</span>}
      {poster.logo && (
        <Image
          className="work-poster-logo"
          src="/images/honey-media-house-mark.png"
          alt=""
          width={90}
          height={99}
        />
      )}
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

  const shown =
    active === "All" ? workItems : workItems.filter((item) => item.category === active);

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
    <section className="section cream work-samples" id="sample-work">
      <div className="container">
        <div className="work-samples-head">
          <div className="work-samples-intro">
            <p className="eyebrow">Sample Work</p>
            <h2 className="section-title">Creative Concepts &amp; Sample Designs</h2>
            <p className="work-samples-lead">
              As a startup, we focus on giving you a clear idea of our creative style and
              capabilities. Here are some sample concepts we can create for your brand.
            </p>
          </div>
          <div className="work-filters" role="group" aria-label="Filter sample work by category">
            {workCategories.map((name) => (
              <button
                key={name}
                type="button"
                className="work-filter"
                aria-pressed={active === name}
                onClick={() => setActive(name)}
              >
                {name}
              </button>
            ))}
          </div>
        </div>

        <p className="work-count" role="status" aria-live="polite">
          Showing {shown.length} of {workItems.length} sample concepts
          {active !== "All" ? ` in ${active}` : ""}
        </p>

        {shown.length > 0 ? (
          <ul className="work-grid">
            {shown.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  className="work-card"
                  aria-haspopup="dialog"
                  onClick={(event) => open(item, event.currentTarget)}
                >
                  <span className="work-card-media">
                    <Image src={item.image} alt={item.imageAlt} fill sizes={cardSizes} />
                    <Poster item={item} />
                    <span className="work-card-flag">Concept sample</span>
                  </span>
                  <span className="work-card-copy">
                    <span className="work-card-title">{item.title}</span>
                    <span className="work-card-sub">{item.subtitle}</span>
                    <span className="work-card-cat">{item.category}</span>
                    <span className="demo-note">Illustrative concept · not a verified client project</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="work-empty">
            <p className="work-empty-title">No concepts in this category yet.</p>
            <p className="work-empty-text">
              We are still filling this shelf. Browse everything we have created so far, or tell us
              what you need and we will design it for you.
            </p>
            <div className="hero-actions">
              <button type="button" className="button" onClick={() => setActive("All")}>
                Show all concepts
              </button>
              <Link className="button button-outline" href="/contact">
                Request a Sample <ArrowRight size={15} />
              </Link>
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
              <Image
                src={selected.image}
                alt={selected.imageAlt}
                fill
                sizes="(max-width: 760px) calc(100vw - 40px), 700px"
              />
              <Poster item={selected} />
            </div>
            <div className="work-dialog-body">
              <p className="eyebrow">{selected.category}</p>
              <h2 id="work-dialog-title">
                {selected.title} <span>{selected.subtitle}</span>
              </h2>
              <p className="demo-note">
                Concept/sample work — illustrative design preview, not a verified client project or
                a reported business result.
              </p>
              <h3>Overview</h3>
              <p className="work-dialog-text">{selected.overview}</p>
              <h3>Deliverables</h3>
              <ul className="list-check">
                {selected.deliverables.map((item) => (
                  <li key={item}>{item}</li>
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
                        sizes="(max-width: 760px) 90vw, 340px"
                      />
                    ))}
                  </div>
                </>
              )}
              <div className="hero-actions">
                <Link
                  className="button"
                  href={`/contact?project=${encodeURIComponent(`${selected.title} ${selected.subtitle}`)}`}
                >
                  Discuss a Similar Project <ArrowRight size={15} />
                </Link>
                <Link className="button button-outline" href={`/work/${selected.slug}`}>
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
