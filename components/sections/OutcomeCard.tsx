import * as Icons from "lucide-react";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ServiceOutcome } from "@/lib/data";

function getIcon(name: string): LucideIcon {
  return (Icons as unknown as Record<string, LucideIcon>)[name] || Icons.Box;
}

// Brand Book Aegis (pag. 25, 40): UN solo accento — il verde.
// Niente arcobaleno: le 4 card sono cromaticamente coese (verde + navy) e si
// distinguono per numero, icona e contenuto, non per colore.
const brandAccent = {
  bg: "bg-accent/[0.04]",
  border: "border-accent/[0.15]",
  iconBg: "bg-accent/[0.1]",
  iconBorder: "border-accent/[0.25]",
  iconColor: "text-accent",
  numberColor: "text-accent",
  bullet: "bg-accent/60",
  hoverBorder: "hover:border-accent/40",
  hoverShadow: "hover:shadow-[0_24px_60px_-24px_rgba(30,143,69,0.25)]",
  cta: "text-accent hover:text-accent-hover",
};

export function OutcomeCard({ outcome }: { outcome: ServiceOutcome }) {
  const Icon = getIcon(outcome.icon);
  const cls = brandAccent;

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-white p-6 transition-all duration-500 lg:p-8",
        cls.border,
        cls.hoverBorder,
        cls.hoverShadow,
      )}
    >
      {/* Tint sottile colorato */}
      <div
        aria-hidden
        className={cn("pointer-events-none absolute inset-0", cls.bg)}
      />

      {/* Glow decorativo in alto-destra al hover */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100",
          cls.bg,
        )}
      />

      <div className="relative flex h-full flex-col">
        {/* Top: numero + categoria + icona */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span
              className={cn(
                "text-sm font-medium",
                cls.numberColor,
              )}
            >
              {outcome.number}
            </span>
            <span className="h-px w-8 bg-fg/[0.15]" />
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-fg-muted">
              {outcome.category}
            </span>
          </div>
          <div
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-xl border lg:h-14 lg:w-14",
              cls.iconBg,
              cls.iconBorder,
            )}
          >
            <Icon className={cn("h-5 w-5 lg:h-6 lg:w-6", cls.iconColor)} />
          </div>
        </div>

        {/* Nome outcome + tagline */}
        <div className="mb-6">
          <h3 className="text-3xl font-bold leading-tight tracking-tight text-fg lg:text-4xl">
            {outcome.name}
          </h3>
          <p className="mt-3 text-balance text-base leading-relaxed text-fg-muted lg:text-lg">
            {outcome.tagline}
          </p>
        </div>

        {/* Divider */}
        <div className="mb-6 h-px bg-fg/[0.08]" />

        {/* Lista servizi inclusi */}
        <div className="mb-6 flex-1">
          <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.2em] text-fg-muted">
            Cosa è incluso
          </p>
          <ul className="space-y-2.5">
            {outcome.services.map((service) => (
              <li key={service} className="flex items-start gap-3">
                <span
                  className={cn(
                    "mt-2 h-1 w-1 shrink-0 rounded-full",
                    cls.bullet,
                  )}
                />
                <span className="text-sm leading-relaxed text-fg-muted/90">
                  {service}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA inline */}
        <a
          href="#contatti"
          className={cn(
            "group/cta inline-flex items-center gap-2 text-sm font-medium transition-colors",
            cls.cta,
          )}
        >
          {outcome.ctaLabel}
          <ArrowRight className="h-4 w-4 transition-transform group-hover/cta:translate-x-1" />
        </a>
      </div>
    </article>
  );
}
