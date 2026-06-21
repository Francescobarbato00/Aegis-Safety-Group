"use client";

import { useEffect, useRef } from "react";

const INTERACTIVE =
  'a, button, [role="button"], [role="tab"], input, textarea, select, label';
const TEXT_FIELD = "input, textarea, select, [contenteditable='true']";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Solo desktop con mouse fine + no reduced motion.
    // Altrimenti: nessun listener → i div restano invisibili (opacity 0) e
    // il cursore di sistema resta attivo (vedi globals.css).
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!hasFinePointer || reducedMotion) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let rafId = 0;
    let isVisible = false;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) {
        isVisible = true;
        dot.style.opacity = "1";
        ring.style.opacity = "1";
      }
      // Il dot segue immediato (preciso) — solo transform, mai top/left.
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    };

    // L'anello insegue con lerp (morbido) via requestAnimationFrame.
    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      rafId = requestAnimationFrame(animateRing);
    };
    animateRing();

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(INTERACTIVE)) return;
      if (target.closest(TEXT_FIELD)) {
        // Su campi testo: nascondi cursore custom, torna a sistema (I-beam).
        dot.style.opacity = "0";
        ring.style.opacity = "0";
      } else {
        // Su link/bottoni: anello cresce, dot si rimpicciolisce.
        ring.classList.add("cursor-ring--hover");
        dot.classList.add("cursor-dot--hover");
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(INTERACTIVE)) return;
      if (target.closest(TEXT_FIELD)) {
        dot.style.opacity = "1";
        ring.style.opacity = "1";
      } else {
        ring.classList.remove("cursor-ring--hover");
        dot.classList.remove("cursor-dot--hover");
      }
    };

    const onMouseDown = () => {
      dot.classList.add("cursor-dot--down");
      ring.classList.add("cursor-ring--down");
    };
    const onMouseUp = () => {
      dot.classList.remove("cursor-dot--down");
      ring.classList.remove("cursor-ring--down");
    };

    // Nascondi quando il mouse esce dalla finestra.
    const onMouseLeave = () => {
      dot.style.opacity = "0";
      ring.style.opacity = "0";
      isVisible = false;
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", onMouseOver);
    window.addEventListener("mouseout", onMouseOut);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseleave", onMouseLeave);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      window.removeEventListener("mouseout", onMouseOut);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <>
      {/* Dot piccolo (preciso) */}
      <div ref={dotRef} aria-hidden className="cursor-dot" style={{ opacity: 0 }} />
      {/* Anello esterno (morbido) */}
      <div ref={ringRef} aria-hidden className="cursor-ring" style={{ opacity: 0 }} />
    </>
  );
}
