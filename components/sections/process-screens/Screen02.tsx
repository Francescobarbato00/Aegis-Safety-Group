import { FileText, Check, Loader2, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

export function Screen02() {
  return (
    <div className="flex h-full flex-col gap-5">
      {/* Header */}
      <div className="flex items-end justify-between gap-4">
        <div>
          <h4 className="text-lg font-semibold text-fg">
            Documentazione in redazione
          </h4>
          <p className="mt-1 font-mono text-xs text-fg-muted">
            Cliente: Logistica Padana S.r.l.{" "}
            <span className="opacity-50">·</span> Aggiornato 14:32
          </p>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-2xl font-medium leading-none text-fg">
            <span className="text-accent">4</span>
            <span className="text-fg-muted">/7</span>
          </p>
          <p className="mt-1 text-xs text-fg-muted">completati</p>
        </div>
      </div>

      {/* Document list */}
      <div className="flex flex-1 flex-col gap-2.5">
        <DocRow
          name="DVR — Documento Valutazione Rischi"
          status="done"
          progress={100}
        />
        <DocRow
          name="DUVRI — Rischi da Interferenze"
          status="done"
          progress={100}
        />
        <DocRow name="Piano di Emergenza" status="done" progress={100} />
        <DocRow name="Valutazione Rumore" status="done" progress={100} />
        <DocRow name="Valutazione Microclima" status="active" progress={70} />
        <DocRow name="Manuale HACCP" status="active" progress={45} />
        <DocRow name="Piano Operativo Sicurezza" status="queued" progress={0} />
      </div>
    </div>
  );
}

function DocRow({
  name,
  status,
  progress,
}: {
  name: string;
  status: "done" | "active" | "queued";
  progress: number;
}) {
  const statusConfig = {
    done: {
      icon: <Check className="h-3.5 w-3.5 text-accent" />,
      badge: "Pronto",
      badgeClass: "bg-accent/10 text-accent border-accent/30",
      progressClass: "bg-accent",
    },
    active: {
      icon: (
        <Loader2 className="h-3.5 w-3.5 animate-spin text-amber-600 motion-reduce:animate-none" />
      ),
      badge: "In redazione",
      badgeClass: "bg-amber-50 text-amber-700 border-amber-200",
      progressClass: "bg-amber-500",
    },
    queued: {
      icon: <Circle className="h-3 w-3 text-fg-muted/40" />,
      badge: "In coda",
      badgeClass: "bg-fg/[0.04] text-fg-muted border-fg/[0.08]",
      progressClass: "bg-fg/20",
    },
  }[status];

  return (
    <div className="group">
      <div className="flex items-center gap-3 py-2">
        <span className="flex w-5 shrink-0 items-center justify-center">
          {statusConfig.icon}
        </span>
        <FileText className="h-3.5 w-3.5 shrink-0 text-fg-muted" />
        <span
          className={cn(
            "flex-1 truncate text-sm",
            status === "queued" ? "text-fg-muted/70" : "text-fg",
          )}
        >
          {name}
        </span>
        <span
          className={cn(
            "shrink-0 rounded-md border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider",
            statusConfig.badgeClass,
          )}
        >
          {statusConfig.badge}
        </span>
      </div>
      {/* Progress bar under the row */}
      <div className="h-[2px] overflow-hidden rounded-full bg-fg/[0.04]">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500",
            statusConfig.progressClass,
          )}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
