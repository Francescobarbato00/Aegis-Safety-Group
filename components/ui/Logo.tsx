import Image from "next/image";
import { cn } from "@/lib/utils";
import logoFull from "@/public/brand/aegis-logo-full.png";
import logoFullDark from "@/public/brand/aegis-logo-full-onDark.png";
import symbol from "@/public/brand/aegis-symbol.png";
import symbolDark from "@/public/brand/aegis-symbol-onDark.png";

type LogoProps = {
  /** "dark" = logo per sfondo chiaro; "light" = versione onDark per sfondo scuro */
  variant?: "dark" | "light";
  /** "full" = logo completo con wordmark+payoff; "symbol" = solo scudo */
  type?: "full" | "symbol";
  className?: string;
  /** Altezza in px (la larghezza si calcola dall'aspect ratio reale) */
  height?: number;
  priority?: boolean;
};

export function Logo({
  variant = "dark",
  type = "full",
  className,
  height = 40,
  priority = false,
}: LogoProps) {
  const src =
    type === "full"
      ? variant === "dark"
        ? logoFull
        : logoFullDark
      : variant === "dark"
        ? symbol
        : symbolDark;

  // Aspect ratio reali dei PNG: full = 349/255, symbol = 148/132
  const aspectRatio = type === "full" ? 349 / 255 : 148 / 132;
  const width = Math.round(height * aspectRatio);

  return (
    <Image
      src={src}
      alt="Aegis Safety Group"
      height={height}
      width={width}
      className={cn("object-contain", className)}
      priority={priority}
      style={{ height: `${height}px`, width: "auto" }}
    />
  );
}
