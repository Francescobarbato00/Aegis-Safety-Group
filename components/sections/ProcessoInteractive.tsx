"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { processSteps } from "@/lib/data";
import { Screen01 } from "@/components/sections/process-screens/Screen01";
import { Screen02 } from "@/components/sections/process-screens/Screen02";
import { Screen03 } from "@/components/sections/process-screens/Screen03";
import { Screen04 } from "@/components/sections/process-screens/Screen04";

const STEP_COUNT = processSteps.length;

const screens = [Screen01, Screen02, Screen03, Screen04];

export function ProcessoInteractive() {
  const reduceMotion = useReducedMotion();
  const [activeStep, setActiveStep] = useState(0);
  const [userTookControl, setUserTookControl] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const pillRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const pillContainerRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  // Autoplay is allowed only if the user hasn't taken control and motion is ok
  const autoplayActive = !reduceMotion && !userTookControl;
  // The progress animation actually runs only when not paused by hover / tab-out
  const playing = autoplayActive && !isHovering && !isHidden;

  // Pause when the tab is hidden, resume when visible (unless user took control)
  useEffect(() => {
    const onVisibility = () => {
      setIsHidden(document.visibilityState === "hidden");
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  // Center the active pill horizontally (mobile).
  // Uses scrollLeft on the pill container — NOT scrollIntoView, which also moves
  // the page vertically and would pull the whole page down to this section on
  // load. Also skips the first render so nothing scrolls at mount.
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const pill = pillRefs.current[activeStep];
    const container = pillContainerRef.current;
    if (!pill || !container) return;
    const targetScroll =
      pill.offsetLeft - container.offsetWidth / 2 + pill.offsetWidth / 2;
    container.scrollTo({
      left: targetScroll,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }, [activeStep, reduceMotion]);

  const handleSelect = (i: number) => {
    setActiveStep(i);
    setUserTookControl(true);
  };

  const advance = () => setActiveStep((s) => (s + 1) % STEP_COUNT);

  const currentStep = processSteps[activeStep];
  const ActiveScreen = screens[activeStep];

  return (
    <div
      className="mt-14 lg:mt-20"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Hidden driver: advances the autoplay; runs across viewports since it is
          never inside a display:none subtree. */}
      {autoplayActive && (
        <span
          key={`driver-${activeStep}`}
          aria-hidden="true"
          onAnimationEnd={advance}
          style={{
            animation: "process-progress 4s linear forwards",
            animationPlayState: playing ? "running" : "paused",
          }}
          className="pointer-events-none fixed left-0 top-0 h-px w-px opacity-0"
        />
      )}

      {/* Reduced-motion hint */}
      <p className="mb-4 hidden text-center text-xs text-fg-muted motion-reduce:block lg:text-left">
        Clicca uno step per esplorare il processo
      </p>

      {/* Mobile: horizontal pills */}
      <div
        ref={pillContainerRef}
        role="tablist"
        aria-label="Fasi del processo"
        className="relative -mx-6 flex gap-2 overflow-x-auto scrollbar-hide px-6 pb-1 lg:hidden"
      >
        {processSteps.map((step, i) => {
          const active = i === activeStep;
          return (
            <button
              key={step.number}
              ref={(el) => {
                pillRefs.current[i] = el;
              }}
              role="tab"
              aria-selected={active}
              aria-controls="dashboard-screen"
              onClick={() => handleSelect(i)}
              className={cn(
                "flex shrink-0 snap-start items-center gap-2.5 rounded-lg border px-4 py-2.5 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
                active
                  ? "border-accent/50 bg-accent/[0.08] text-accent shadow-[0_4px_20px_-6px_rgba(30,143,69,0.3)]"
                  : "border-fg/[0.08] bg-white text-fg-muted active:bg-fg/[0.04]",
              )}
            >
              <span
                className={cn(
                  "rounded border px-1.5 py-0.5 text-xs font-medium",
                  active
                    ? "border-accent/50 bg-accent/[0.12]"
                    : "border-fg/[0.08] bg-fg/[0.04]",
                )}
              >
                {step.number}
              </span>
              <span className="whitespace-nowrap text-sm">{step.title}</span>
              <span className="flex items-center gap-1 whitespace-nowrap font-mono text-[10px] text-fg-muted/70">
                <Clock className="h-2.5 w-2.5" />
                {step.duration}
              </span>
            </button>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-[380px_1fr] lg:gap-10">
        {/* Desktop: vertical step list */}
        <div
          role="tablist"
          aria-label="Fasi del processo"
          className="hidden flex-col gap-3 lg:flex"
        >
          {processSteps.map((step, i) => {
            const active = i === activeStep;
            return (
              <button
                key={step.number}
                role="tab"
                aria-selected={active}
                aria-controls="dashboard-screen"
                onClick={() => handleSelect(i)}
                className={cn(
                  "group relative w-full rounded-xl border p-5 text-left transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
                  active
                    ? "border-accent/50 bg-accent/[0.04] shadow-[0_0_0_1px_rgba(30,143,69,0.08),0_12px_32px_-12px_rgba(30,143,69,0.2)] active:bg-accent/[0.08] motion-reduce:active:bg-accent/[0.04]"
                    : "border-fg/[0.08] bg-white hover:border-fg/[0.2] hover:shadow-sm active:bg-accent/[0.08] motion-reduce:active:bg-accent/[0.04]",
                )}
              >
                <div className="flex items-start gap-4">
                  {/* Number chip */}
                  <span
                    className={cn(
                      "flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border text-sm font-medium transition-all duration-300",
                      active
                        ? "border-accent/50 bg-accent/[0.12] text-accent"
                        : "border-fg/[0.08] bg-fg/[0.04] text-fg-muted group-hover:border-fg/[0.2]",
                    )}
                  >
                    {step.number}
                  </span>

                  {/* Text */}
                  <div className="min-w-0 flex-1 pt-0.5">
                    <h3 className="text-base font-semibold leading-snug text-fg lg:text-[17px]">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-fg-muted">
                      {step.description}
                    </p>
                    {/* Sub-info — tempo medio (metadata) */}
                    <div className="mt-3 flex items-center gap-2">
                      <Clock className="h-3 w-3 text-fg-muted/60" />
                      <span className="font-mono text-[11px] text-fg-muted/80">
                        {step.duration}
                      </span>
                    </div>
                  </div>

                  {/* Arrow indicator */}
                  <ArrowRight
                    className={cn(
                      "mt-3 h-4 w-4 shrink-0 transition-all duration-300",
                      active
                        ? "translate-x-0 text-accent opacity-100"
                        : "-translate-x-1 text-fg-muted opacity-0 group-hover:translate-x-0 group-hover:opacity-60",
                    )}
                  />
                </div>

                {/* Visual progress bar (mirrors the driver) */}
                {active && autoplayActive && (
                  <span
                    key={`bar-${activeStep}`}
                    aria-hidden="true"
                    style={{
                      animation: "process-progress 4s linear forwards",
                      animationPlayState: playing ? "running" : "paused",
                      boxShadow: "0 0 6px rgba(30,143,69,0.4)",
                    }}
                    className="absolute bottom-0 left-0 h-[2px] rounded-full bg-accent"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Dashboard mockup */}
        <div
          id="dashboard-screen"
          role="tabpanel"
          className="relative overflow-hidden rounded-2xl border border-fg/[0.08] bg-white shadow-[0_24px_60px_-20px_rgba(15,27,45,0.15)]"
        >
          {/* Flash cyan trasversale: parte a ogni cambio di activeStep */}
          <motion.div
            key={`flash-${activeStep}`}
            aria-hidden
            className="pointer-events-none absolute inset-0 z-10 overflow-hidden rounded-2xl"
            initial={{ opacity: 0 }}
            animate={reduceMotion ? {} : { opacity: [0, 0.4, 0] }}
            transition={{ duration: 0.6, ease: "easeOut", times: [0, 0.3, 1] }}
          >
            <div
              className="screen-flash-sweep absolute inset-y-0 -left-1/2 w-full"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(30,143,69,0.15), transparent)",
                filter: "blur(40px)",
              }}
            />
          </motion.div>

          {/* Browser-like header */}
          <div className="flex h-10 items-center justify-between border-b border-fg/[0.06] bg-fg/[0.02] px-4">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-fg/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-fg/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-fg/15" />
            </div>
            <span className="font-mono text-xs text-fg-muted">
              aegis.dashboard / {currentStep.mockupTitle}
            </span>
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:hidden" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              <span className="font-mono text-xs text-fg-muted">live</span>
            </div>
          </div>

          {/* Screen content */}
          <div className="aspect-[4/5] p-5 sm:aspect-[4/3] lg:aspect-auto lg:min-h-[480px] lg:p-6">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeStep}
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
                transition={{ duration: reduceMotion ? 0 : 0.4, ease: "easeOut" }}
                className="h-full"
              >
                <ActiveScreen />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
