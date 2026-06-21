"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Check, Clock, MoreHorizontal } from "lucide-react";

type ComplianceItem = {
  label: string;
  status: string;
  state: "ok" | "warning";
};

const items: ComplianceItem[] = [
  { label: "DVR aggiornato", status: "Conforme", state: "ok" },
  { label: "Formazione lavoratori", status: "Conforme", state: "ok" },
  { label: "RSPP nominato", status: "Conforme", state: "ok" },
  { label: "Antincendio scade tra", status: "47 giorni", state: "warning" },
  { label: "Piano emergenza", status: "Conforme", state: "ok" },
];

export function HeroVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const reduceMotion = useReducedMotion();
  const animate = inView && !reduceMotion;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="relative flex justify-center lg:justify-end"
    >
      {/* Floating accent blob — promosso a layer GPU isolato + blur più leggero
          per non rallentare il compositor di Safari (estetica quasi identica). */}
      <div
        className="pointer-events-none absolute -right-6 -top-10 h-48 w-48 rounded-full bg-accent/30 blur-2xl"
        style={{
          transform: "translateZ(0)",
          willChange: "transform",
          contain: "layout style",
        }}
      />

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, x: 40 }}
        animate={animate ? { opacity: 1, x: 0 } : reduceMotion ? { opacity: 1, x: 0 } : undefined}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="relative w-full max-h-[560px] max-w-[440px] rotate-[1.5deg] rounded-2xl border border-border bg-white p-8 shadow-[0_30px_80px_-20px_rgba(15,27,45,0.25)] transition-transform duration-500 hover:rotate-0"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60 motion-reduce:hidden" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>
            <span className="text-sm font-medium text-fg">Stato conformità</span>
          </div>
          <MoreHorizontal className="h-5 w-5 text-fg-muted" strokeWidth={2} />
        </div>

        {/* Score */}
        <div className="mt-8">
          <div className="flex items-baseline gap-1.5">
            <span className="font-[family-name:var(--font-sora)] text-6xl font-medium leading-none tracking-tight text-fg">
              87
            </span>
            <span className="text-3xl font-medium text-fg-muted">/ 100</span>
          </div>
          <p className="mt-2 text-sm text-fg-muted">Conformità complessiva</p>

          {/* Progress bar */}
          <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-border">
            <motion.div
              className="h-full rounded-full bg-accent"
              initial={reduceMotion ? false : { width: "0%" }}
              animate={
                animate
                  ? { width: "87%" }
                  : reduceMotion
                    ? { width: "87%" }
                    : undefined
              }
              transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
              style={reduceMotion ? { width: "87%" } : undefined}
            />
          </div>
        </div>

        {/* Items */}
        <ul className="mt-8 divide-y divide-border">
          {items.map((item, i) => (
            <motion.li
              key={item.label}
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={
                animate
                  ? { opacity: 1, y: 0 }
                  : reduceMotion
                    ? { opacity: 1, y: 0 }
                    : undefined
              }
              transition={{ duration: 0.4, delay: 0.6 + i * 0.1, ease: "easeOut" }}
              className="flex items-center justify-between py-3"
            >
              <div className="flex items-center gap-2.5">
                {item.state === "ok" ? (
                  <Check className="h-4 w-4 shrink-0 text-accent" strokeWidth={2.5} />
                ) : (
                  <Clock className="h-4 w-4 shrink-0 text-amber-500" strokeWidth={2.5} />
                )}
                <span className="text-sm text-fg">{item.label}</span>
              </div>
              <span
                className={cnBadge(item.state)}
              >
                {item.status}
              </span>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}

function cnBadge(state: "ok" | "warning") {
  return [
    "shrink-0 rounded-md px-2 py-0.5 text-xs font-medium",
    state === "ok"
      ? "bg-emerald-50 text-emerald-700"
      : "bg-amber-50 text-amber-700",
  ].join(" ");
}
