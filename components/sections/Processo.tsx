import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import { ProcessoInteractive } from "@/components/sections/ProcessoInteractive";

export function Processo() {
  return (
    <section
      id="processo"
      className="relative overflow-hidden bg-bg py-24 text-fg lg:py-32"
    >
      {/* Bridge cromatico: fil rouge amber → cyan che scende dal Problema */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-24 w-px -translate-x-1/2 bg-gradient-to-b from-amber-500/40 via-accent/50 to-transparent lg:h-32"
      />

      <Container className="relative">
        {/* Intro */}
        <FadeIn delay={0}>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-accent">
              Come lavoriamo
            </p>
            <h2 className="mt-4 text-balance text-3xl font-bold leading-tight tracking-tight text-fg lg:text-5xl">
              Un processo{" "}
              <span className="text-accent">
                strutturato
              </span>
              , dal primo contatto in poi.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-balance text-lg leading-relaxed text-fg-muted lg:text-xl">
              Quattro fasi per portarti alla piena conformità. Alla burocrazia
              pensiamo noi.
            </p>
          </div>
        </FadeIn>

        {/* Interactive process */}
        <ProcessoInteractive />
      </Container>
    </section>
  );
}
