"use client";

import { useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X, ArrowLeft, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useBooking } from "./BookingContext";
import { StepExpert } from "./StepExpert";
import { StepDateTime } from "./StepDateTime";
import { StepDetails } from "./StepDetails";
import { StepConfirm } from "./StepConfirm";

const steps = [
  { n: 1, label: "Esperto" },
  { n: 2, label: "Data e ora" },
  { n: 3, label: "I tuoi dati" },
  { n: 4, label: "Conferma" },
];

export function BookingDrawer() {
  const { isOpen, close, step, setStep, reset } = useBooking();
  const reduced = useReducedMotion();

  // ESC per chiudere
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) close();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, close]);

  const handleClose = () => {
    close();
    // reset dopo l'animazione di chiusura
    setTimeout(reset, 300);
  };

  const goBack = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduced ? undefined : { opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={handleClose}
            className="fixed inset-0 z-[70] bg-fg/40 backdrop-blur-sm"
            aria-hidden
          />

          {/* Drawer */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Prenota una call"
            initial={reduced ? false : { x: "100%" }}
            animate={{ x: 0 }}
            exit={reduced ? undefined : { x: "100%" }}
            transition={{
              type: "tween",
              duration: 0.35,
              ease: [0.32, 0.72, 0, 1],
            }}
            className={cn(
              "fixed bottom-0 right-0 top-0 z-[71] flex flex-col",
              "w-full sm:w-[480px] lg:w-[520px]",
              "bg-bg shadow-[-24px_0_70px_-15px_rgba(15,27,45,0.3)]",
            )}
          >
            {/* Header drawer */}
            <div className="shrink-0 border-b border-fg/[0.08] px-6 py-5">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {step > 1 && step < 4 && (
                    <button
                      onClick={goBack}
                      className="-ml-1.5 rounded-lg p-1.5 transition-colors hover:bg-fg/[0.05]"
                      aria-label="Indietro"
                    >
                      <ArrowLeft className="h-5 w-5 text-fg-muted" />
                    </button>
                  )}
                  <div>
                    <h2 className="text-lg font-semibold text-fg">
                      Prenota una call
                    </h2>
                    <p className="text-xs text-fg-muted">
                      Gratuita · 15 minuti · senza impegno
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleClose}
                  className="rounded-lg p-2 transition-colors hover:bg-fg/[0.05]"
                  aria-label="Chiudi"
                >
                  <X className="h-5 w-5 text-fg-muted" />
                </button>
              </div>

              {/* Progress steps */}
              {step < 4 && (
                <div className="flex items-center gap-2">
                  {steps.slice(0, 3).map((s, i) => (
                    <div key={s.n} className="flex flex-1 items-center gap-2">
                      <div className="flex flex-1 items-center gap-2">
                        <span
                          className={cn(
                            "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-medium transition-colors",
                            step > s.n
                              ? "bg-accent text-white"
                              : step === s.n
                                ? "border border-accent/40 bg-accent/15 text-accent"
                                : "bg-fg/[0.05] text-fg-muted",
                          )}
                        >
                          {step > s.n ? <Check className="h-3 w-3" /> : s.n}
                        </span>
                        <span
                          className={cn(
                            "hidden text-xs font-medium transition-colors sm:block",
                            step >= s.n ? "text-fg" : "text-fg-muted",
                          )}
                        >
                          {s.label}
                        </span>
                      </div>
                      {i < 2 && (
                        <div className="h-px min-w-[12px] flex-1 bg-fg/[0.1]" />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Step content (scrollable) */}
            <div className="flex-1 overflow-y-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={reduced ? false : { opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reduced ? undefined : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                  className="p-6"
                >
                  {step === 1 && <StepExpert />}
                  {step === 2 && <StepDateTime />}
                  {step === 3 && <StepDetails />}
                  {step === 4 && <StepConfirm onClose={handleClose} />}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
