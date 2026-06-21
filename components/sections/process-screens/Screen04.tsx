import { Bell, FileCheck, BookOpen, GraduationCap } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Screen04() {
  return (
    <div className="flex h-full flex-col gap-5">
      {/* Header */}
      <div className="flex items-end justify-between gap-4">
        <div>
          <h4 className="font-[family-name:var(--font-sora)] text-lg font-medium text-fg">
            Monitoraggio attivo
          </h4>
          <p className="mt-1 font-mono text-xs text-fg-muted">
            Logistica Padana S.r.l. <span className="opacity-50">·</span> ultimo
            check 2 ore fa
          </p>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="relative flex">
            <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-emerald-500 opacity-75 motion-reduce:hidden" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <span className="font-mono text-[10px] uppercase tracking-wider text-emerald-700">
            attivo
          </span>
        </div>
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-3 gap-2.5">
        <MetricCard label="Conformità" value="96%" accent="emerald" />
        <MetricCard label="Prossima scadenza" value="47gg" accent="amber" />
        <MetricCard label="Aggiornamenti" value="3" accent="accent" />
      </div>

      {/* Event timeline */}
      <div className="flex flex-1 flex-col">
        <p className="mb-3 text-[11px] font-medium uppercase tracking-wider text-fg-muted">
          Eventi recenti
        </p>
        <div className="flex flex-col gap-3">
          <TimelineEvent
            date="12 nov"
            icon={<Bell className="h-3.5 w-3.5 text-amber-600" />}
            label="Notifica: corso RSPP in scadenza tra 60 giorni"
          />
          <TimelineEvent
            date="08 nov"
            icon={<BookOpen className="h-3.5 w-3.5 text-accent" />}
            label="Aggiornamento normativo applicato — Circolare INL 4/2025"
          />
          <TimelineEvent
            date="02 nov"
            icon={<FileCheck className="h-3.5 w-3.5 text-emerald-600" />}
            label="Audit interno completato — nessuna criticità rilevata"
          />
          <TimelineEvent
            date="28 ott"
            icon={<GraduationCap className="h-3.5 w-3.5 text-accent" />}
            label="Formazione antincendio rinnovata per 4 dipendenti"
          />
        </div>
      </div>
    </div>
  );
}

function MetricCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent: "accent" | "emerald" | "amber";
}) {
  const valueColor = {
    accent: "text-accent",
    emerald: "text-emerald-700",
    amber: "text-amber-700",
  }[accent];

  return (
    <div className="rounded-lg border border-fg/[0.06] bg-fg/[0.02] p-3">
      <p className="text-[10px] font-medium uppercase tracking-wider text-fg-muted">
        {label}
      </p>
      <p
        className={cn(
          "mt-1.5 font-[family-name:var(--font-sora)] text-xl font-medium leading-none",
          valueColor,
        )}
      >
        {value}
      </p>
    </div>
  );
}

function TimelineEvent({
  date,
  icon,
  label,
}: {
  date: string;
  icon: ReactNode;
  label: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="w-12 shrink-0 pt-0.5 font-mono text-[11px] text-fg-muted">
        {date}
      </span>
      <span className="mt-0.5 shrink-0">{icon}</span>
      <span className="flex-1 text-xs leading-relaxed text-fg">{label}</span>
    </div>
  );
}
