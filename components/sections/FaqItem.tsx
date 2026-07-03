"use client";

import { Plus } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Faq } from "@/lib/data";

type Props = {
  faq: Faq;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
};

export function FaqItem({ faq, index, isOpen, onToggle }: Props) {
  const reduced = useReducedMotion();

  return (
    <div
      className={cn(
        "rounded-xl border transition-all duration-300",
        isOpen
          ? "border-accent/30 bg-white/[0.04]"
          : "border-white/[0.08] bg-white/[0.02] hover:border-white/[0.18]",
      )}
    >
      {/* Header */}
      <button
        id={`faq-header-${faq.id}`}
        aria-expanded={isOpen}
        aria-controls={`faq-content-${faq.id}`}
        onClick={onToggle}
        className={cn(
          "flex w-full items-center justify-between gap-6 rounded-xl p-5 text-left lg:p-6",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-dark",
          "transition-colors",
        )}
      >
        <div className="flex min-w-0 flex-1 items-start gap-4">
          {/* Numero */}
          <span
            className={cn(
              "mt-0.5 shrink-0 text-sm font-medium transition-colors",
              isOpen ? "text-accent" : "text-fg-dark-muted",
            )}
          >
            {String(index).padStart(2, "0")}
          </span>
          {/* Domanda */}
          <span className="text-base font-semibold leading-snug text-fg-dark lg:text-lg">
            {faq.question}
          </span>
        </div>

        {/* Plus icona */}
        <span className="mt-0.5 shrink-0">
          <motion.span
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={
              reduced ? { duration: 0 } : { duration: 0.25, ease: "easeOut" }
            }
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-lg border transition-colors",
              isOpen
                ? "border-accent/40 bg-accent/[0.15]"
                : "border-white/[0.08] bg-white/[0.03]",
            )}
          >
            <Plus
              className={cn(
                "h-4 w-4 transition-colors",
                isOpen ? "text-accent" : "text-fg-dark-muted",
              )}
            />
          </motion.span>
        </span>
      </button>

      {/* Body collassabile */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`faq-content-${faq.id}`}
            role="region"
            aria-labelledby={`faq-header-${faq.id}`}
            initial={reduced ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduced ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.2, ease: "easeOut" }}
            className="overflow-hidden"
            style={reduced ? undefined : { willChange: "height" }}
          >
            <div className="px-5 pb-5 lg:px-6 lg:pb-6">
              <div className="ml-1 space-y-4 border-l border-accent/[0.2] pl-9 lg:pl-10">
                {/* Answer */}
                <p className="text-sm leading-relaxed text-fg-dark-muted lg:text-base">
                  {faq.answer}
                </p>

                {/* Highlight box */}
                {faq.highlight && (
                  <div className="flex items-baseline gap-3 rounded-lg border border-accent/[0.2] bg-accent/[0.06] p-3">
                    <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-accent">
                      {faq.highlight.label}
                    </span>
                    <span className="ml-auto text-lg font-medium text-fg-dark lg:text-xl">
                      {faq.highlight.value}
                    </span>
                  </div>
                )}

                {/* Riferimento normativo */}
                {faq.reference && (
                  <div className="flex items-center gap-2 font-mono text-xs text-fg-dark-muted/80">
                    <span className="text-accent/60">§</span>
                    <span>{faq.reference}</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
