import {
  ArrowRight,
  Gavel,
  Receipt,
  OctagonX,
  ShieldAlert,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";

type RiskCard = {
  number: string;
  category: string;
  title: string;
  bigValue: string;
  bigValueLabel: string;
  description: string;
  reference: string;
  icon: LucideIcon;
  featured?: boolean;
};

const risks: RiskCard[] = [
  // Card protagonista
  {
    number: "01",
    category: "Responsabilità penale",
    title: "Il datore di lavoro risponde personalmente.",
    bigValue: "Penale",
    bigValueLabel: "in caso di infortunio",
    description:
      "Con un infortunio e obblighi non rispettati, il datore di lavoro risponde personalmente, anche penalmente. Lesioni colpose gravi: reclusione da 3 mesi a 1 anno. Omicidio colposo: da 2 a 7 anni.",
    reference: "art. 590, c.3 e 589, c.2 Codice Penale",
    icon: Gavel,
    featured: true,
  },
  // 3 card medie
  {
    number: "02",
    category: "Sanzione amministrativa",
    title: "Multe per documentazione mancante",
    bigValue: "€ 7.014",
    bigValueLabel: "massimo per DVR mancante",
    description:
      "La mancata redazione del DVR comporta sanzione da € 2.740 a € 7.014. La mancata formazione dei lavoratori: arresto fino a 4 mesi o ammenda fino a € 6.388.",
    reference: "art. 55 D.Lgs. 81/2008",
    icon: Receipt,
  },
  {
    number: "03",
    category: "Provvedimento operativo",
    title: "Sospensione dell'attività",
    bigValue: "Stop",
    bigValueLabel: "alle operazioni aziendali",
    description:
      "L'Ispettorato può sospendere l'attività per gravi irregolarità, fino al ripristino della conformità.",
    reference: "art. 14 D.Lgs. 81/2008",
    icon: OctagonX,
  },
  {
    number: "04",
    category: "Procedura di accertamento",
    title: "Controlli prolungati e contestazioni",
    bigValue: "Mesi",
    bigValueLabel: "di accertamenti possibili",
    description:
      "Documentazione incompleta significa segnalazioni, ispezioni e contestazioni di INL o ASL. Procedimenti che possono durare mesi.",
    reference: "art. 13 D.Lgs. 81/2008",
    icon: ShieldAlert,
  },
];

export function Problema() {
  return (
    <section
      id="problema"
      className="bg-bg-dark pb-16 pt-24 text-fg-dark lg:pb-20 lg:pt-32"
    >
      <Container>
        {/* Intro */}
        <FadeIn delay={0}>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-accent">
              Cosa rischi
            </p>
            <h2 className="mt-4 text-balance text-3xl font-bold leading-tight tracking-tight text-fg-dark lg:text-5xl">
              I conti che{" "}
              <span className="text-accent">
                nessuno ti racconta
              </span>
              .
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-balance text-lg leading-relaxed text-fg-dark-muted lg:text-xl">
              Tre sanzioni, una procedura penale, l&apos;attività ferma. Le
              conseguenze concrete del D.Lgs. 81/2008 per chi non è in regola.
              Numeri reali, articoli precisi.
            </p>
          </div>
        </FadeIn>

        {/* Risk cards — 1 featured + 3 medium */}
        <div className="mt-16 grid grid-cols-1 gap-5 lg:mt-20 lg:grid-cols-2 lg:gap-6">
          {/* Featured — intera riga */}
          <FadeIn delay={0.15} className="lg:col-span-2">
            <RiskCardFeatured risk={risks[0]} />
          </FadeIn>

          {/* 3 medie */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:col-span-2 lg:gap-6">
            {risks.slice(1).map((risk, i) => (
              <FadeIn key={risk.number} delay={0.25 + i * 0.1} className="h-full">
                <RiskCardMedium risk={risk} />
              </FadeIn>
            ))}
          </div>
        </div>

        {/* CTA */}
        <FadeIn delay={0.55}>
          <div className="mt-16 text-center lg:mt-20">
            <p className="mx-auto max-w-xl text-balance text-base text-fg-dark-muted lg:text-lg">
              Conosci la tua esposizione reale prima che sia troppo tardi.
            </p>
            <div className="mt-6">
              <Button href="#contatti" variant="primary" size="lg">
                Verifica la tua situazione
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Button>
            </div>
            <p className="mt-4 text-sm text-fg-dark-muted">
              Check-up gratuito in 15 minuti, senza impegno
            </p>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}

function RiskCardFeatured({ risk }: { risk: RiskCard }) {
  const Icon = risk.icon;
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-white/[0.1] bg-gradient-to-br from-white/[0.04] to-white/[0.02] p-6 transition-all duration-500 hover:border-white/[0.2] lg:p-10">
      {/* Glow amber tenue in alto-destra */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-amber-500/[0.04] blur-3xl"
      />

      <div className="relative grid grid-cols-1 items-center gap-8 lg:grid-cols-[1fr_1.2fr] lg:gap-12">
        {/* Sinistra — identificatore + numero protagonista */}
        <div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-fg-dark-muted">
              {risk.number}
            </span>
            <span className="h-px w-8 bg-white/[0.15]" />
            <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-amber-400/90">
              {risk.category}
            </span>
          </div>

          {/* BIG VALUE — protagonista assoluto */}
          <div className="mt-6 lg:mt-8">
            <p className="text-6xl font-bold leading-[0.9] tracking-tight text-fg-dark lg:text-7xl xl:text-8xl">
              {risk.bigValue}
            </p>
            <p className="mt-3 text-sm text-fg-dark-muted">
              {risk.bigValueLabel}
            </p>
          </div>

          {/* Riferimento normativo come firma */}
          <div className="mt-6 border-t border-white/[0.06] pt-6">
            <p className="font-mono text-xs text-fg-dark-muted/70">
              <span className="text-amber-400/60">§</span> {risk.reference}
            </p>
          </div>
        </div>

        {/* Destra — titolo + descrizione */}
        <div className="lg:border-l lg:border-white/[0.06] lg:pl-12">
          <div className="mb-4 flex items-start gap-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-amber-500/[0.2] bg-amber-500/[0.08]">
              <Icon className="h-5 w-5 text-amber-400/90" />
            </span>
          </div>

          <h3 className="text-balance text-2xl font-semibold leading-tight tracking-tight text-fg-dark lg:text-3xl xl:text-4xl">
            {risk.title}
          </h3>

          <p className="mt-5 text-balance text-base leading-relaxed text-fg-dark-muted lg:text-lg">
            {risk.description}
          </p>
        </div>
      </div>
    </article>
  );
}

function RiskCardMedium({ risk }: { risk: RiskCard }) {
  const Icon = risk.icon;
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.02] p-6 transition-all duration-300 hover:border-white/[0.18] hover:bg-white/[0.04] lg:p-7">
      {/* Number + category */}
      <div className="mb-6 flex items-center gap-3">
        <span className="text-sm font-medium text-fg-dark-muted">
          {risk.number}
        </span>
        <span className="h-px w-6 bg-white/[0.15]" />
        <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-fg-dark-muted">
          {risk.category}
        </span>
      </div>

      {/* Icon + big value */}
      <div className="mb-2 flex items-baseline gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-accent/[0.2] bg-accent/[0.08]">
          <Icon className="h-4 w-4 text-accent" />
        </span>
        <p className="text-3xl font-medium leading-none tracking-tight text-fg-dark lg:text-4xl">
          {risk.bigValue}
        </p>
      </div>
      <p className="mb-5 mt-1 text-xs text-fg-dark-muted">{risk.bigValueLabel}</p>

      {/* Title */}
      <h3 className="mb-3 text-lg font-semibold leading-snug text-fg-dark">
        {risk.title}
      </h3>

      {/* Description */}
      <p className="flex-1 text-sm leading-relaxed text-fg-dark-muted">
        {risk.description}
      </p>

      {/* Reference */}
      <div className="mt-5 border-t border-white/[0.05] pt-4">
        <p className="font-mono text-[11px] text-fg-dark-muted/70">
          <span className="text-accent/60">§</span> {risk.reference}
        </p>
      </div>
    </article>
  );
}
