import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";
import { OutcomeCard } from "@/components/sections/OutcomeCard";
import { outcomes } from "@/lib/data";

export function Servizi() {
  return (
    <section
      id="servizi"
      className="relative overflow-hidden bg-bg py-24 lg:py-32"
    >
      {/* Grain sottile (coerenza con la Hero) */}
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
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-accent">
              I nostri servizi
            </p>
            <h2 className="mt-4 text-balance font-[family-name:var(--font-sora)] text-3xl font-medium leading-tight tracking-tight text-fg lg:text-5xl xl:text-6xl">
              Quattro risultati,{" "}
              <em className="font-[family-name:var(--font-instrument)] italic text-accent">
                un solo partner
              </em>
              .
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-balance text-lg leading-relaxed text-fg-muted lg:text-xl">
              Scegli il risultato che ti serve. Documentazione, formazione,
              assistenza, crescita: tutto gestito da noi, senza che tu debba
              coordinare consulenti diversi.
            </p>
          </div>
        </FadeIn>

        {/* Grid 4 outcome */}
        <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-2 lg:mt-20 lg:gap-6">
          {outcomes.map((outcome, i) => (
            <FadeIn key={outcome.number} delay={i * 0.1} className="h-full">
              <OutcomeCard outcome={outcome} />
            </FadeIn>
          ))}
        </div>

        {/* CTA finale */}
        <FadeIn delay={0.5}>
          <div className="mt-16 text-center lg:mt-20">
            <p className="mx-auto max-w-xl text-balance text-base text-fg-muted lg:text-lg">
              Non sei sicuro di quale percorso scegliere?
            </p>
            <div className="mt-6">
              <Button variant="primary" size="lg" href="#contatti">
                Richiedi un check-up gratuito
              </Button>
            </div>
            <p className="mt-4 text-sm text-fg-muted">
              In 15 minuti capiamo insieme cosa serve alla tua azienda.
            </p>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
