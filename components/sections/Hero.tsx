"use client";

import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";
import { HeroVisual } from "@/components/sections/HeroVisual";
import { companyInfo } from "@/lib/data";

export function Hero() {
  const telHref = `tel:${companyInfo.phone.replace(/\s+/g, "")}`;
  const reduce = useReducedMotion();

  // H1 lines animate on mount (hero is above the fold). Line 2 (italic) enters
  // after line 1 to dramatize the claim. Reduced motion → final state instantly.
  const line = (delay: number) =>
    reduce
      ? { initial: false as const }
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, ease: "easeOut" as const, delay },
        };

  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-bg pt-20 pb-10 lg:pt-24 lg:pb-12"
    >
      {/* Layer 1 — soffuso gradient radiale dall'alto */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 1200px 600px at 50% 0%, rgba(6,182,212,0.06), transparent 60%)",
        }}
      />

      {/* Layer 2 — grain texture (inline SVG noise, carta da rivista) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' /%3E%3C/svg%3E")`,
        }}
      />

      {/* Hairline orizzontale sotto l'header */}
      <div
        aria-hidden
        className="absolute left-0 right-0 top-0 h-px bg-fg/[0.06]"
      />

      <Container className="w-full">
        <div className="relative grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          {/* Rule line editoriale: divide racconto (sx) e dato (dx), solo lg+ */}
          <div
            aria-hidden
            className="absolute bottom-0 left-[calc(52.4%-1px)] top-0 hidden w-px bg-fg/[0.06] lg:block"
          >
            <span className="absolute -left-1 -top-1 h-2 w-2 rounded-full bg-accent/40" />
            <span className="absolute -bottom-1 -left-1 h-2 w-2 rounded-full bg-accent/40" />
          </div>

          {/* Left column — text */}
          <div className="max-w-2xl">
            {/* Trust bar */}
            <FadeIn delay={0}>
              <div className="flex flex-col gap-2 text-xs sm:flex-row sm:items-center sm:gap-4">
                <span className="flex items-center gap-1.5 text-fg-muted">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500 motion-reduce:animate-none" />
                  <span className="font-mono">Servizio attivo</span>
                </span>
                <span className="hidden text-fg-muted/40 sm:inline">·</span>
                <span className="text-fg-muted">
                  <span className="font-medium text-fg">D.Lgs. 81/2008</span> ·
                  Conformi alle normative vigenti
                </span>
              </div>
            </FadeIn>

            {/* Hairline: separa la metadata bar dal main content (pattern masthead) */}
            <div className="mt-4 h-px w-full bg-fg/[0.08] lg:mt-5" aria-hidden />

            {/* Eyebrow */}
            <FadeIn delay={0.1}>
              <p className="mt-4 text-[11px] font-medium uppercase tracking-[0.25em] text-accent lg:mt-5">
                {companyInfo.name} — {companyInfo.tagline}
              </p>
            </FadeIn>

            {/* H1 — editoriale, due righe con stagger */}
            <h1 className="mt-3 text-balance font-[family-name:var(--font-sora)] text-4xl font-medium leading-[0.92] tracking-tight text-fg sm:text-5xl lg:mt-4 lg:text-[4rem] xl:text-[5rem]">
              <motion.span
                className="block font-[family-name:var(--font-instrument)] font-normal italic text-accent"
                {...line(0.2)}
              >
                Conformi, sempre.
              </motion.span>
              <motion.span className="block" {...line(0.35)}>
                È il nostro mestiere.
              </motion.span>
            </h1>

            {/* Sottotitolo */}
            <FadeIn delay={0.5}>
              <p className="mt-4 max-w-xl text-balance text-base leading-relaxed text-fg-muted lg:mt-5 lg:text-lg">
                Documentazione, formazione e monitoraggio continuo. Gestito da
                noi, perché conformi non si è mai una volta sola.
              </p>
            </FadeIn>

            {/* CTA group */}
            <FadeIn delay={0.65}>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:gap-4 lg:mt-6">
                <Button
                  href="#contatti"
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  Richiedi un check-up gratuito
                  <ArrowRight className="ml-1.5 h-4 w-4" />
                </Button>
                <Button
                  href={telHref}
                  variant="secondary"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  Parla con un consulente
                </Button>
              </div>
            </FadeIn>
          </div>

          {/* Right column — visual */}
          <HeroVisual />
        </div>
      </Container>

      {/* Scroll-down indicator (desktop, dove il fold è critico) */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex"
      >
        <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-fg-muted">
          Scopri di più
        </span>
        <div className="h-8 w-px bg-gradient-to-b from-fg-muted/40 to-transparent motion-safe:animate-pulse" />
      </div>
    </section>
  );
}
