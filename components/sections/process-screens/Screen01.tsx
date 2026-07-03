import { Check, Loader2, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

type ScanStatus = "done" | "running" | "pending";

type ScanItem = {
  label: string;
  status: ScanStatus;
  meta?: string;
};

const items: ScanItem[] = [
  { label: "Anagrafica azienda verificata", status: "done" },
  { label: "Documenti caricati", status: "done", meta: "12" },
  { label: "Settore: industria manifatturiera", status: "done" },
  { label: "Analisi rischi in corso...", status: "running" },
  { label: "Confronto normativo", status: "pending" },
  { label: "Report finale", status: "pending" },
];

export function Screen01() {
  return (
    <div className="flex h-full flex-col gap-6">
      {/* Header info */}
      <div>
        <h4 className="text-lg font-semibold text-fg">
          Analisi azienda
        </h4>
        <p className="mt-1 font-mono text-xs text-fg-muted">
          Cliente: Logistica Padana S.r.l.{" "}
          <span className="opacity-50">·</span> ID #A-2847
        </p>
      </div>

      {/* Scan indicator — card-in-card with faint cyan tint */}
      <div className="flex items-center gap-4 rounded-xl border border-accent/[0.2] bg-accent/[0.06] p-4">
        <div className="relative flex h-12 w-12 shrink-0 items-center justify-center">
          {/* Static track */}
          <div className="absolute inset-0 rounded-full border-2 border-accent/[0.2]" />
          {/* Spinning arc */}
          <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-accent motion-reduce:animate-none" />
          <span className="text-xs font-medium text-accent">
            63%
          </span>
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium text-fg">Scansione in corso</p>
          <p className="mt-0.5 text-xs text-fg-muted">
            Analisi dei requisiti normativi...
          </p>
        </div>
      </div>

      {/* Scan rows */}
      <div className="flex-1 border-t border-fg/[0.04]">
        {items.map((item) => (
          <ScanRow
            key={item.label}
            status={item.status}
            label={item.label}
            meta={item.meta}
          />
        ))}
      </div>
    </div>
  );
}

function ScanRow({
  status,
  label,
  meta,
}: {
  status: ScanStatus;
  label: string;
  meta?: string;
}) {
  return (
    <div className="flex items-center gap-3 border-b border-fg/[0.04] py-2.5 last:border-b-0">
      <span className="flex w-5 shrink-0 items-center justify-center">
        {status === "done" && <Check className="h-4 w-4 text-accent" />}
        {status === "running" && (
          <Loader2 className="h-4 w-4 animate-spin text-accent motion-reduce:animate-none" />
        )}
        {status === "pending" && (
          <Circle className="h-3 w-3 text-fg-muted/40" />
        )}
      </span>
      <span
        className={cn(
          "flex-1 text-sm",
          status === "pending" ? "text-fg-muted/60" : "text-fg",
        )}
      >
        {label}
      </span>
      {meta && (
        <span className="shrink-0 font-mono text-xs text-fg-muted">
          {meta}
        </span>
      )}
    </div>
  );
}
