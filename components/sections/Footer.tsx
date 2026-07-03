import { Phone, Mail, MapPin, Clock, ArrowRight, type LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { companyInfo } from "@/lib/data";

// Brand glyphs (24×24, currentColor) — lucide-react dropped brand icons over
// trademark concerns, so we inline the official simple-icons paths.
const socials: { label: string; href: string; path: string }[] = [
  {
    label: "LinkedIn",
    href: "#",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z",
  },
  {
    label: "Instagram",
    href: "#",
    path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z",
  },
  {
    label: "Facebook",
    href: "#",
    path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
  },
  {
    label: "WhatsApp",
    href: "#",
    path: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z",
  },
];

const serviziLinks = [
  { label: "Documentazione", href: "#servizi" },
  { label: "Formazione", href: "#servizi" },
  { label: "Check-up gratuito", href: "#contatti" },
  { label: "Assistenza annuale", href: "#servizi" },
];

const aziendaLinks = [
  { label: "Come lavoriamo", href: "#processo" },
  { label: "FAQ", href: "#faq" },
  { label: "Contatti", href: "#contatti" },
  { label: "Lavora con noi", href: "#contatti" },
];

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="group inline-flex items-center gap-1.5 py-1.5 text-sm text-fg-muted transition-all hover:text-accent"
    >
      <span className="h-px w-0 bg-accent transition-all duration-300 group-hover:w-3" />
      {label}
    </a>
  );
}

function FooterContact({
  icon: Icon,
  value,
  href,
}: {
  icon: LucideIcon;
  value: string;
  href?: string;
}) {
  const content = (
    <>
      <Icon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
      <span className="text-sm text-fg-muted">{value}</span>
    </>
  );
  if (href) {
    return (
      <a
        href={href}
        className="group flex items-start gap-2.5 transition-colors [&>span]:hover:text-accent"
      >
        {content}
      </a>
    );
  }
  return <div className="flex items-start gap-2.5">{content}</div>;
}

function ColumnHeader({ children }: { children: string }) {
  return (
    <h3 className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-fg/70">
      {children}
    </h3>
  );
}

export function Footer() {
  const currentYear = new Date().getFullYear();
  const telHref = `tel:${companyInfo.phone.replace(/\s/g, "")}`;

  return (
    <footer className="border-t border-fg/[0.08] bg-[#F2F0E9]">
      {/* Fascia 1 — Mega CTA finale (chiude il cerchio con la Hero) */}
      <div className="relative overflow-hidden border-b border-fg/[0.08]">
        {/* Blob cyan decorativo */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/[0.06] blur-3xl"
        />
        <Container className="relative">
          <FadeIn>
            <div className="py-20 text-center lg:py-28">
              <p className="mb-6 text-[11px] font-medium uppercase tracking-[0.25em] text-accent">
                Pronti quando lo sei tu
              </p>
              <h2 className="text-balance text-4xl font-bold leading-[0.95] tracking-tight text-fg sm:text-5xl lg:text-6xl xl:text-7xl">
                <span className="block text-accent">
                  Conformi, sempre.
                </span>
                <span className="block">È il nostro mestiere.</span>
              </h2>
              <p className="mx-auto mt-8 max-w-xl text-balance text-lg text-fg-muted">
                Bastano 15 minuti di check-up gratuito per iniziare.
              </p>
              <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
                <Button variant="primary" size="lg" href="#contatti">
                  Richiedi un check-up gratuito
                  <ArrowRight className="ml-1.5 h-4 w-4" />
                </Button>
                <Button variant="secondary" size="lg" href={telHref}>
                  Chiamaci ora
                </Button>
              </div>
            </div>
          </FadeIn>
        </Container>
      </div>

      {/* Fascia 2 — Links */}
      <Container>
        <FadeIn delay={0.1}>
          <div className="grid grid-cols-2 gap-10 py-16 md:grid-cols-4 lg:grid-cols-[2fr_1fr_1fr_1fr] lg:py-20">
            {/* Brand */}
            <div className="col-span-2 md:col-span-4 lg:col-span-1">
              <div className="flex flex-col gap-3">
                <span className="flex items-center gap-2.5">
                  <Logo variant="dark" type="symbol" height={44} />
                  <span className="flex items-baseline gap-1.5">
                    <span className="text-xl font-bold tracking-tight text-fg">
                      Aegis
                    </span>
                    <span className="text-sm text-fg-muted">Safety Group</span>
                  </span>
                </span>
                <p className="text-[11px] uppercase tracking-[0.18em] text-fg-muted">
                  Proteggiamo il lavoro · Tuteliamo le persone · Creiamo valore
                </p>
              </div>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-fg-muted/80">
                Consulenza, documentazione e formazione per la sicurezza sul
                lavoro.
              </p>
              <div className="mt-6 flex gap-2">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="group flex h-9 w-9 items-center justify-center rounded-lg border border-fg/[0.08] bg-fg/[0.03] transition-colors hover:border-accent/50 hover:bg-accent/[0.06]"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                      className="h-4 w-4 text-fg-muted transition-colors group-hover:text-accent"
                    >
                      <path d={s.path} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Servizi */}
            <div>
              <ColumnHeader>Servizi</ColumnHeader>
              <ul>
                {serviziLinks.map((l) => (
                  <li key={l.label}>
                    <FooterLink href={l.href} label={l.label} />
                  </li>
                ))}
              </ul>
            </div>

            {/* Azienda */}
            <div>
              <ColumnHeader>Azienda</ColumnHeader>
              <ul>
                {aziendaLinks.map((l) => (
                  <li key={l.label}>
                    <FooterLink href={l.href} label={l.label} />
                  </li>
                ))}
              </ul>
            </div>

            {/* Contatti */}
            <div>
              <ColumnHeader>Contatti</ColumnHeader>
              <div className="space-y-3">
                <FooterContact icon={Phone} value={companyInfo.phone} href={telHref} />
                <FooterContact
                  icon={Mail}
                  value={companyInfo.email}
                  href={`mailto:${companyInfo.email}`}
                />
                <FooterContact icon={MapPin} value={companyInfo.address} />
                <FooterContact icon={Clock} value="Lun-Ven · 09:00-18:00" />
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Bottom bar */}
        <div className="border-t border-fg/[0.08] pt-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col gap-x-4 gap-y-1 text-xs text-fg-muted sm:flex-row sm:items-center">
              <span>
                © {currentYear} Aegis Safety Group. Tutti i diritti riservati.
              </span>
              <span className="hidden text-accent/40 sm:inline">·</span>
              <span className="font-mono">{companyInfo.vat}</span>
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-fg-muted">
              <a href="/privacy" className="transition-colors hover:text-accent">
                Privacy Policy
              </a>
              <a href="/cookie" className="transition-colors hover:text-accent">
                Cookie Policy
              </a>
              <a href="/termini" className="transition-colors hover:text-accent">
                Termini di servizio
              </a>
            </div>
          </div>
        </div>

        {/* Firma finale */}
        <div className="mt-10 border-t border-fg/[0.04] pb-8 pt-6 text-center">
          <p className="font-mono text-[11px] text-fg-muted/60">
            Aegis Safety Group · Made with care in Italy
          </p>
        </div>
      </Container>
    </footer>
  );
}
