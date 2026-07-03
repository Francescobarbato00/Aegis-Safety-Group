import { Phone, Mail, Clock, Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import { ContactForm } from "@/components/sections/ContactForm";
import { companyInfo } from "@/lib/data";

export function Contatti() {
  const telHref = `tel:${companyInfo.phone.replace(/\s+/g, "")}`;

  return (
    <section className="relative overflow-hidden bg-bg py-24 lg:py-32">
      {/* Blob cyan grande in alto-destra */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 h-[600px] w-[800px] -translate-y-1/4 translate-x-1/4 rounded-full bg-accent/[0.06] blur-3xl"
      />
      {/* Blob secondario in basso-sinistra */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 h-[400px] w-[600px] -translate-x-1/4 translate-y-1/4 rounded-full bg-accent/[0.04] blur-3xl"
      />
      {/* Grain */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' /%3E%3C/svg%3E")`,
        }}
      />

      <Container className="relative">
        {/* Intro */}
        <FadeIn>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-accent">
              Iniziamo
            </p>
            <h2 className="mt-4 text-balance text-3xl font-bold leading-[1.05] tracking-tight text-fg lg:text-5xl xl:text-6xl">
              Raccontaci la tua azienda,{" "}
              <span className="text-accent">
                pensiamo a tutto noi
              </span>
              .
            </h2>
            <p className="mt-6 text-balance text-lg leading-relaxed text-fg-muted">
              Compila il form: ti contattiamo entro 24h per un check-up gratuito
              di 15 minuti. Senza impegno.
            </p>

            {/* Trust micro-signals */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm">
              <TrustMicroSignal icon={Clock} text="Risposta entro 24h" />
              <span className="hidden text-fg-muted/30 sm:inline">·</span>
              <TrustMicroSignal icon={Check} text="Check-up gratuito" />
              <span className="hidden text-fg-muted/30 sm:inline">·</span>
              <TrustMicroSignal icon={Check} text="Nessun impegno" />
            </div>
          </div>
        </FadeIn>

        {/* Form */}
        <FadeIn delay={0.1}>
          <div
            id="contatti"
            className="mx-auto mt-16 max-w-2xl lg:mt-20"
          >
            <ContactForm />
          </div>
        </FadeIn>

        {/* Contatti diretti */}
        <FadeIn delay={0.2}>
          <div className="mx-auto mt-16 max-w-2xl lg:mt-20">
            <div className="mb-10 flex items-center gap-4">
              <div className="h-px flex-1 bg-fg/[0.08]" />
              <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-fg-muted">
                Oppure scrivici diretto
              </span>
              <div className="h-px flex-1 bg-fg/[0.08]" />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <DirectContactCard
                icon={Phone}
                label="Chiamaci"
                value={companyInfo.phone}
                href={telHref}
                helper="Lun-Ven · 09:00-18:00"
              />
              <DirectContactCard
                icon={Mail}
                label="Email"
                value={companyInfo.email}
                href={`mailto:${companyInfo.email}`}
                helper="Risposta entro 24h"
              />
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}

function TrustMicroSignal({
  icon: Icon,
  text,
}: {
  icon: typeof Clock;
  text: string;
}) {
  return (
    <span className="inline-flex items-center gap-2 text-fg-muted">
      <Icon className="h-3.5 w-3.5 text-accent" />
      {text}
    </span>
  );
}

function DirectContactCard({
  icon: Icon,
  label,
  value,
  href,
  helper,
}: {
  icon: typeof Phone;
  label: string;
  value: string;
  href: string;
  helper: string;
}) {
  return (
    <a
      href={href}
      className="group flex items-start gap-4 rounded-xl border border-fg/[0.08] bg-white p-5 transition-all duration-300 hover:border-accent/40 hover:bg-fg/[0.02]"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-accent/[0.2] bg-accent/[0.06]">
        <Icon className="h-4 w-4 text-accent" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-fg-muted">
          {label}
        </p>
        <p className="mt-1 truncate text-sm font-medium text-fg transition-colors group-hover:text-accent">
          {value}
        </p>
        <p className="mt-1 text-xs text-fg-muted/70">{helper}</p>
      </div>
    </a>
  );
}
