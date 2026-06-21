"use client";

import { useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X, Phone, Mail, ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { companyInfo } from "@/lib/data";

type NavItem = { label: string; href: string };

const navItems: NavItem[] = [
  { label: "Servizi", href: "#servizi" },
  { label: "Come lavoriamo", href: "#processo" },
  { label: "FAQ", href: "#faq" },
  { label: "Contatti", href: "#contatti" },
];

type Props = {
  open: boolean;
  onClose: () => void;
  onOpenBooking?: () => void; // apre il booking drawer
};

export function MobileMenu({ open, onClose, onOpenBooking }: Props) {
  const reduced = useReducedMotion();

  // ESC + scroll lock
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const handleNavClick = (href: string) => {
    onClose();
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  const handleBookingClick = () => {
    onClose();
    setTimeout(() => onOpenBooking?.(), 300);
  };

  // Stagger config
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
  };
  const itemVariants = {
    hidden: reduced ? {} : { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.32, 0.72, 0, 1] as const },
    },
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduced ? undefined : { opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[55] overflow-hidden bg-bg lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Menu di navigazione"
        >
          {/* Blob decorativo */}
          <div
            aria-hidden
            className="pointer-events-none absolute right-0 top-0 h-[400px] w-[400px] -translate-y-1/4 translate-x-1/4 rounded-full bg-accent/[0.06] blur-3xl"
          />
          {/* Grain */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-multiply"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' /%3E%3C/svg%3E")`,
            }}
          />

          <div className="relative flex h-full flex-col px-6 py-5">
            {/* Header */}
            <div className="flex shrink-0 items-center justify-between">
              <Logo variant="dark" size={30} />
              <button
                onClick={onClose}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-fg/[0.1] transition-colors hover:border-fg/[0.3]"
                aria-label="Chiudi menu"
              >
                <X className="h-5 w-5 text-fg" />
              </button>
            </div>

            {/* Nav con stagger */}
            <motion.nav
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-1 flex-col justify-center"
            >
              {navItems.map((item, i) => (
                <motion.button
                  key={item.href}
                  variants={itemVariants}
                  onClick={() => handleNavClick(item.href)}
                  className="group flex items-baseline gap-4 py-3 text-left"
                >
                  <span className="w-8 font-[family-name:var(--font-sora)] text-sm font-medium text-accent/60">
                    0{i + 1}
                  </span>
                  <span className="font-[family-name:var(--font-sora)] text-4xl font-medium tracking-tight text-fg transition-colors group-hover:text-accent">
                    {item.label}
                  </span>
                  <ArrowUpRight className="h-5 w-5 self-center text-fg-muted opacity-0 transition-opacity group-hover:opacity-100" />
                </motion.button>
              ))}
            </motion.nav>

            {/* Footer: CTA + contatti */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.5 }}
              className="shrink-0 space-y-5"
            >
              {/* CTA booking */}
              <button
                onClick={handleBookingClick}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent py-4 font-medium text-white transition-colors hover:bg-accent-hover"
              >
                Prenota check-up gratuito
                <ArrowUpRight className="h-4 w-4" />
              </button>

              {/* Contatti diretti */}
              <div className="flex items-center justify-center gap-6 pt-2">
                <a
                  href={`tel:${companyInfo.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-accent"
                >
                  <Phone className="h-4 w-4" />
                  Chiama
                </a>
                <span className="h-4 w-px bg-fg/[0.15]" />
                <a
                  href={`mailto:${companyInfo.email}`}
                  className="flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-accent"
                >
                  <Mail className="h-4 w-4" />
                  Email
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
