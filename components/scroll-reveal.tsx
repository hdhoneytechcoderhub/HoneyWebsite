"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export function ScrollReveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const element = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const node = element.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }
    document.documentElement.dataset.revealReady = "true";
    setReady(true);
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.12, rootMargin: "0px 0px -28px 0px" });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return <div ref={element} className={`scroll-reveal${ready ? " reveal-ready" : ""}${visible ? " is-visible" : ""}${className ? ` ${className}` : ""}`}>{children}</div>;
}
