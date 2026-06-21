import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { companyInfo } from "@/lib/data";
import { legalEntity } from "@/lib/legal-data";
import type { ReactNode } from "react";

type Props = {
  title: string;
  subtitle?: string;
  children: ReactNode;
};

export function LegalLayout({ title, subtitle, children }: Props) {
  return (
    <main className="min-h-screen bg-bg">
      {/* Header minimale (no nav completa, solo wordmark + back) */}
      <header className="border-b border-fg/[0.08]">
        <Container>
          <div className="flex h-16 items-center justify-between lg:h-20">
            {/* Logo */}
            <Link href="/" aria-label="Aegis Safety Group — home" className="group">
              <Logo
                variant="dark"
                size={32}
                className="transition-opacity group-hover:opacity-80"
              />
            </Link>
            {/* Back to home */}
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sm text-fg-muted transition-colors hover:text-accent"
            >
              <ArrowLeft className="h-4 w-4" />
              Torna al sito
            </Link>
          </div>
        </Container>
      </header>

      {/* Content */}
      <Container>
        <article className="mx-auto max-w-3xl py-16 lg:py-24">
          {/* Title block */}
          <div className="mb-12 lg:mb-16">
            <h1 className="font-[family-name:var(--font-sora)] text-4xl font-medium tracking-tight text-fg lg:text-5xl">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-4 text-lg leading-relaxed text-fg-muted">
                {subtitle}
              </p>
            )}
            <p className="mt-6 font-mono text-sm text-fg-muted/70">
              Ultimo aggiornamento: {legalEntity.lastUpdated}
            </p>
          </div>

          {/* Legal content */}
          <div className="legal-content space-y-8">{children}</div>
        </article>
      </Container>

      {/* Footer minimale */}
      <footer className="border-t border-fg/[0.08] py-8">
        <Container>
          <div className="flex flex-col items-center justify-between gap-4 text-xs text-fg-muted sm:flex-row">
            <span>
              © {new Date().getFullYear()} {companyInfo.name}. Tutti i diritti
              riservati.
            </span>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="transition-colors hover:text-accent">
                Privacy Policy
              </Link>
              <Link href="/cookie" className="transition-colors hover:text-accent">
                Cookie Policy
              </Link>
              <Link href="/termini" className="transition-colors hover:text-accent">
                Termini di servizio
              </Link>
            </div>
          </div>
        </Container>
      </footer>
    </main>
  );
}

export function LegalSection({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="scroll-mt-24">
      <h2 className="mb-4 flex items-baseline gap-3 font-[family-name:var(--font-sora)] text-xl font-medium text-fg lg:text-2xl">
        <span className="text-base text-accent">{number}</span>
        {title}
      </h2>
      <div className="space-y-4 text-base leading-relaxed text-fg-muted">
        {children}
      </div>
    </section>
  );
}

export function LegalList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent/60" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
