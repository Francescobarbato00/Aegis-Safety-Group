import Image from "next/image";
import { ShieldCheck, Users, Zap, type LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import teamPhoto from "@/public/team.jpg";

export function Approccio() {
  return (
    <section
      id="approccio"
      className="relative scroll-mt-24 overflow-hidden bg-bg py-24 lg:scroll-mt-28 lg:py-32"
    >
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Testo */}
          <FadeIn>
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-accent">
                Il nostro approccio
              </p>
              <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight text-fg lg:text-4xl xl:text-5xl">
                Persone competenti, metodo{" "}
                <span className="text-accent">chiaro</span>.
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-fg-muted">
                Non un portale di documenti. Consulenti che entrano in azienda,
                capiscono il tuo lavoro e costruiscono la sicurezza attorno alle
                persone.
              </p>

              <div className="mt-8 space-y-4">
                <ApproachPoint
                  icon={Users}
                  title="Persone al centro"
                  text="Prima delle pratiche ci sono lavoratori e imprenditori."
                />
                <ApproachPoint
                  icon={ShieldCheck}
                  title="Metodo, non burocrazia"
                  text="Adempimenti chiari, gestiti da chi sa cosa fa."
                />
                <ApproachPoint
                  icon={Zap}
                  title="Risposta veloce"
                  text="Ti seguiamo prima, durante e dopo. Sempre."
                />
              </div>
            </div>
          </FadeIn>

          {/* Foto */}
          <FadeIn delay={0.15}>
            <div className="relative">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-fg/[0.08] bg-fg/[0.04]">
                <Image
                  src={teamPhoto}
                  alt="Il team di Aegis Safety Group al lavoro"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  placeholder="blur"
                />
                {/* Overlay navy leggero — coerenza brand (no colori saturi) */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-bg-dark/[0.05]"
                />
              </div>
              {/* Badge esperienza */}
              <div className="absolute -bottom-4 -left-4 hidden rounded-xl bg-bg-dark p-4 text-fg-dark shadow-xl sm:block">
                <p className="text-2xl font-bold">15+ anni</p>
                <p className="text-xs text-fg-dark-muted">
                  di esperienza sul campo
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}

function ApproachPoint({
  icon: Icon,
  title,
  text,
}: {
  icon: LucideIcon;
  title: string;
  text: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-accent/[0.2] bg-accent/[0.08]">
        <Icon className="h-5 w-5 text-accent" />
      </span>
      <div>
        <p className="font-semibold text-fg">{title}</p>
        <p className="mt-0.5 text-sm text-fg-muted">{text}</p>
      </div>
    </div>
  );
}
