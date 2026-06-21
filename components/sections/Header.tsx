"use client";

import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { MobileMenu } from "@/components/sections/MobileMenu";
import { useBooking } from "@/components/booking/BookingContext";

const navLinks = [
  { label: "Servizi", href: "#servizi" },
  { label: "Come lavoriamo", href: "#processo" },
  { label: "FAQ", href: "#faq" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { open } = useBooking();

  useEffect(() => {
    let ticking = false;
    const update = () => {
      setScrolled(window.scrollY >= 80);
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-200 ease-out",
          scrolled
            ? "border-b border-border/60 bg-bg/70 backdrop-blur-md"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <Container>
          <div className="flex h-16 items-center justify-between lg:h-20">
            {/* Logo */}
            <a
              href="#top"
              aria-label="Aegis Safety Group — home"
              className="group"
            >
              <Logo
                variant="dark"
                size={32}
                className="transition-opacity group-hover:opacity-80"
              />
            </a>

            {/* Desktop nav */}
            <nav className="hidden items-center gap-8 lg:flex">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-fg-muted transition-colors hover:text-fg"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:block">
              <Button onClick={open} variant="primary" size="md">
                Prenota una call
              </Button>
            </div>

            {/* Mobile hamburger */}
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Apri menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="-mr-2 rounded-lg p-2 text-fg transition-colors hover:bg-fg/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg lg:hidden"
            >
              <Menu className="h-6 w-6" strokeWidth={2} />
            </button>
          </div>
        </Container>
      </header>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        onOpenBooking={open}
      />
    </>
  );
}
