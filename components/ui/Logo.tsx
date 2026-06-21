import { cn } from "@/lib/utils";

type LogoProps = {
  /** "dark" = symbol navy (for light backgrounds), "light" = symbol white (for dark backgrounds) */
  variant?: "dark" | "light";
  showText?: boolean;
  className?: string;
  /** Symbol height in px */
  size?: number;
};

export function Logo({
  variant = "dark",
  showText = true,
  className,
  size = 32,
}: LogoProps) {
  const markColor = variant === "dark" ? "#0F1B2D" : "#FFFFFF";
  const textColor = variant === "dark" ? "text-fg" : "text-fg-dark";
  const mutedColor = variant === "dark" ? "text-fg-muted" : "text-fg-dark-muted";

  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      {/* Symbol — shield + check */}
      <svg
        width={size * (100 / 116)}
        height={size}
        viewBox="0 0 100 116"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0"
      >
        <path
          d="M50 4 L88 19 L88 53 Q88 90 50 112 Q12 90 12 53 L12 19 Z"
          fill={markColor}
        />
        <path
          d="M30 70 L44 84 L72 44"
          fill="none"
          stroke="#06B6D4"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* Wordmark */}
      {showText && (
        <span className="flex items-baseline gap-1.5">
          <span
            className={cn(
              "font-[family-name:var(--font-sora)] text-lg font-medium tracking-tight",
              textColor,
            )}
          >
            Aegis
          </span>
          <span className={cn("text-xs", mutedColor)}>Safety Group</span>
        </span>
      )}
    </span>
  );
}
