"use client";

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type ButtonProps = {
  variant?: "primary" | "secondary" | "secondary-dark";
  size?: "md" | "lg";
  href?: string;
  children: ReactNode;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement>;

const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary: "bg-accent text-white hover:bg-accent-hover",
  secondary:
    "bg-transparent text-fg border border-fg/15 hover:border-fg/40 hover:bg-fg/[0.03]",
  "secondary-dark":
    "bg-transparent text-fg-dark border border-white/[0.2] hover:border-white/[0.4] hover:bg-white/[0.05]",
};

export function Button({
  variant = "primary",
  size = "md",
  href,
  children,
  className,
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-lg font-[family-name:var(--font-inter)] font-medium transition-colors duration-200",
    "active:scale-[0.98] motion-reduce:active:scale-100",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
    size === "lg" ? "px-7 py-3.5 text-base" : "px-6 py-3 text-sm",
    variants[variant],
    className,
  );

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
