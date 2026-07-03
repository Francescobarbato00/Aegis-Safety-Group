"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";
import { FaqItem } from "@/components/sections/FaqItem";
import { faqs, companyInfo } from "@/lib/data";

export function Faq() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="faq"
      className="relative overflow-hidden bg-bg-dark py-24 lg:py-32"
    >
      {/* Background: blob cyan in alto + grain */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-accent/[0.06] blur-3xl"
        style={{ transform: "translateX(-50%) translateZ(0)", contain: "paint" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-screen"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' /%3E%3C/svg%3E")`,
        }}
      />

      <Container className="relative">
        {/* Intro */}
        <FadeIn>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-accent">
              Domande frequenti
            </p>
            <h2 className="mt-4 text-balance text-3xl font-bold leading-tight tracking-tight text-fg-dark lg:text-5xl xl:text-6xl">
              Domande?{" "}
              <span className="text-accent">
                Risposte.
              </span>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-balance text-lg leading-relaxed text-fg-dark-muted">
              Se hai un dubbio specifico non in elenco, scrivici direttamente —
              ti rispondiamo entro 24 ore.
            </p>
          </div>
        </FadeIn>

        {/* Accordion */}
        <FadeIn delay={0.1}>
          <div className="mx-auto mt-16 flex max-w-3xl flex-col gap-3 lg:mt-20">
            {faqs.map((faq, i) => (
              <FaqItem
                key={faq.id}
                faq={faq}
                index={i + 1}
                isOpen={openId === faq.id}
                onToggle={() => toggle(faq.id)}
              />
            ))}
          </div>
        </FadeIn>

        {/* CTA finale */}
        <FadeIn delay={0.2}>
          <div className="mx-auto mt-16 max-w-2xl text-center lg:mt-20">
            <p className="text-balance text-base text-fg-dark-muted lg:text-lg">
              Hai una domanda diversa?
            </p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <Button variant="primary" size="md" href="#contatti">
                Contattaci
              </Button>
              <Button
                variant="secondary-dark"
                size="md"
                href={`mailto:${companyInfo.email}`}
              >
                Scrivici una mail
              </Button>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
