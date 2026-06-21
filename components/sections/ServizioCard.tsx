import { createElement } from "react";
import * as Icons from "lucide-react";
import { ArrowUpRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Service } from "@/lib/data";

function getIcon(name: string): LucideIcon {
  return (Icons as unknown as Record<string, LucideIcon>)[name] || Icons.Box;
}

export function ServizioCard({ service }: { service: Service }) {
  return (
    <article
      className={cn(
        "group relative flex h-full flex-col gap-4 rounded-xl border border-fg/[0.08] bg-white p-5 lg:p-6",
        "transition-all duration-300 ease-out",
        "hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-[0_8px_24px_-12px_rgba(6,182,212,0.2)]",
        "motion-reduce:hover:translate-y-0",
      )}
    >
      {/* Code tag + hover arrow */}
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-2 rounded-md border border-accent/[0.2] bg-accent/[0.08] px-2.5 py-1">
          {createElement(getIcon(service.icon), {
            className: "h-3.5 w-3.5 text-accent",
          })}
          <span className="font-[family-name:var(--font-sora)] text-[11px] font-medium uppercase tracking-wider text-accent">
            {service.code}
          </span>
        </span>
        <ArrowUpRight
          className={cn(
            "h-4 w-4 text-fg-muted transition-all duration-300",
            "-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100",
          )}
        />
      </div>

      {/* Title */}
      <h4 className="font-[family-name:var(--font-sora)] text-lg font-medium leading-tight text-fg lg:text-xl">
        {service.title}
      </h4>

      {/* Description */}
      <p className="flex-1 text-sm leading-relaxed text-fg-muted">
        {service.description}
      </p>

      {/* Sub-items */}
      {service.subItems && service.subItems.length > 0 && (
        <div className="flex flex-wrap gap-1.5 border-t border-fg/[0.06] pt-3">
          {service.subItems.slice(0, 3).map((item) => (
            <span
              key={item}
              className="rounded-md border border-fg/[0.06] bg-fg/[0.04] px-2 py-0.5 text-[11px] text-fg-muted"
            >
              {item}
            </span>
          ))}
          {service.subItems.length > 3 && (
            <span className="rounded-md border border-fg/[0.06] bg-fg/[0.04] px-2 py-0.5 text-[11px] text-fg-muted">
              +{service.subItems.length - 3}
            </span>
          )}
        </div>
      )}
    </article>
  );
}
