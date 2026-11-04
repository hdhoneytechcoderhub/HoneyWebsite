"use client";

import { ArrowRight } from "lucide-react";

export function AboutStoryLink({ label }: { label: string }) {
  function scrollToStory() {
    const target = document.getElementById("our-story");
    if (!target) return;
    const stickyHeader = document.querySelector<HTMLElement>(".site-header");
    const top = target.getBoundingClientRect().top + window.scrollY - (stickyHeader?.offsetHeight ?? 0) - 18;
    window.scrollTo({ top, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
    target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
  }
  return <button className="button" onClick={scrollToStory}>{label} <ArrowRight size={16}/></button>;
}
