import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

export function TrustBand() {
  return (
    <section className="relative overflow-hidden border-y border-fg/[0.06] bg-bg">
      {/* Gradient sottile verticale per stacco morbido */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.5) 0%, transparent 40%, transparent 60%, rgba(15,27,45,0.02) 100%)",
        }}
      />

      <Container className="relative py-12 lg:py-14">
        {/* Fascia 1 — Stat con gerarchia */}
        <StatRow />

        {/* Hairline 1 */}
        <div className="my-6 h-px bg-fg/[0.06] lg:my-8" />

        {/* Fascia 2 — Marquee settori */}
        <ClientsMarquee />

        {/* Hairline 2 */}
        <div className="my-6 h-px bg-fg/[0.06] lg:my-8" />

        {/* Fascia 3 — Live note + mini-CTA */}
        <LiveNote />
      </Container>
    </section>
  );
}

function StatRow() {
  return (
    <div className="grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-8">
      {/* Stat HERO (più grande) */}
      <div className="lg:col-span-1">
        <div className="flex items-baseline gap-1">
          <AnimatedCounter
            target={200}
            duration={1.8}
            className="text-4xl font-medium leading-none tracking-tight text-fg lg:text-5xl xl:text-6xl"
          />
          <span className="text-2xl font-medium leading-none text-accent lg:text-3xl">
            +
          </span>
        </div>
        <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.2em] text-fg-muted">
          Aziende seguite
        </p>
      </div>

      {/* Stat medio 1 */}
      <div>
        <div className="flex items-baseline gap-0.5">
          <AnimatedCounter
            target={24}
            duration={1.5}
            className="text-3xl font-medium leading-none tracking-tight text-fg lg:text-4xl"
          />
          <span className="text-xl font-medium leading-none text-fg-muted lg:text-2xl">
            h
          </span>
        </div>
        <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.2em] text-fg-muted">
          Risposta media
        </p>
      </div>

      {/* Stat medio 2 */}
      <div>
        <div className="flex items-baseline gap-0.5">
          <AnimatedCounter
            target={100}
            duration={1.8}
            className="text-3xl font-medium leading-none tracking-tight text-fg lg:text-4xl"
          />
          <span className="text-xl font-medium leading-none text-fg-muted lg:text-2xl">
            %
          </span>
        </div>
        <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.2em] text-fg-muted">
          Conformità garantita
        </p>
      </div>

      {/* Stat piccolo */}
      <div>
        <div className="flex items-baseline gap-1">
          <AnimatedCounter
            target={15}
            duration={1.2}
            className="text-2xl font-medium leading-none tracking-tight text-fg lg:text-3xl"
          />
          <span className="text-lg font-medium leading-none text-fg-muted lg:text-xl">
            +
          </span>
        </div>
        <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.2em] text-fg-muted">
          Anni nel settore
        </p>
      </div>
    </div>
  );
}

const categories = [
  "Manifatturiero",
  "Edilizia & Cantieri",
  "HoReCa",
  "Industria 4.0",
  "GDO & Retail",
  "Strutture sanitarie",
  "Logistica",
  "Servizi & Uffici",
  "Studi professionali",
  "Settore alimentare",
];

function ClientsMarquee() {
  // Duplica per loop continuo (translateX(-50%) = esattamente una copia)
  const items = [...categories, ...categories];

  return (
    <div className="relative">
      {/* Label sinistra (sovrapposta, copre l'inizio del marquee) */}
      <p className="absolute left-0 top-1/2 z-10 hidden -translate-y-1/2 bg-bg pr-4 text-[11px] font-medium uppercase tracking-[0.2em] text-fg-muted sm:block">
        Settori serviti
      </p>

      {/* Marquee container */}
      <div className="overflow-hidden sm:pl-40 lg:pl-44">
        <div className="flex animate-marquee gap-8 whitespace-nowrap motion-reduce:animate-none">
          {items.map((cat, i) => (
            <div key={i} className="flex shrink-0 items-center gap-3">
              <span className="text-xs text-accent/60">›</span>
              <span className="text-sm font-medium text-fg lg:text-base">
                {cat}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Fade edges */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 top-0 w-16 bg-gradient-to-r from-bg to-transparent lg:w-24"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 top-0 w-16 bg-gradient-to-l from-bg to-transparent lg:w-24"
      />
    </div>
  );
}

function LiveNote() {
  // Hardcoded per ora — TODO: timestamp dinamico a build-time (seeded random 1-5h)
  const hoursAgo = 2;

  return (
    <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
      {/* Live indicator + note */}
      <div className="flex items-center gap-3">
        <span className="relative flex shrink-0">
          <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-accent opacity-75 motion-reduce:hidden" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
        </span>
        <p className="text-sm text-fg-muted">
          Ultimo check-up completato{" "}
          <span className="font-medium text-fg">{hoursAgo} ore fa</span>
          <span className="mx-2 hidden text-fg-muted/40 sm:inline">·</span>
          <span className="hidden font-mono text-xs text-fg-muted/60 sm:inline">
            aggiornato in tempo reale
          </span>
        </p>
      </div>

      {/* Mini CTA */}
      <a
        href="#contatti"
        className="group inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-accent-hover"
      >
        Prenota il tuo
        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
      </a>
    </div>
  );
}
