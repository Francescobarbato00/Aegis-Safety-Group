import { cn } from "@/lib/utils";

export function Screen03() {
  const days = ["LUN", "MAR", "MER", "GIO", "VEN"];
  const timeSlots = ["09:00", "11:00", "14:00", "16:00"];

  const sessions = [
    { day: 0, slot: 0, name: "Art. 37 — Formaz. generale", color: "accent" },
    { day: 0, slot: 1, name: "Art. 37 — Formaz. specifica", color: "accent" },
    { day: 1, slot: 2, name: "Antincendio", color: "amber" },
    { day: 2, slot: 0, name: "RLS", color: "emerald" },
    { day: 3, slot: 2, name: "Primo Soccorso", color: "rose" },
  ];

  return (
    <div className="flex h-full flex-col gap-5">
      {/* Header */}
      <div className="flex items-end justify-between gap-4">
        <div>
          <h4 className="text-lg font-semibold text-fg">
            Calendario formazione
          </h4>
          <p className="mt-1 font-mono text-xs text-fg-muted">
            Logistica Padana S.r.l. <span className="opacity-50">·</span> 47
            lavoratori coinvolti
          </p>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-2xl font-medium leading-none text-fg">
            <span className="text-accent">5</span>
          </p>
          <p className="mt-1 text-xs text-fg-muted">sessioni</p>
        </div>
      </div>

      {/* Calendar grid */}
      <div className="flex flex-1 flex-col gap-1">
        {/* Day header */}
        <div className="mb-1 grid grid-cols-[60px_repeat(5,1fr)] gap-1">
          <div />
          {days.map((d) => (
            <div
              key={d}
              className="py-1.5 text-center text-[11px] font-medium uppercase tracking-wider text-fg-muted"
            >
              {d}
            </div>
          ))}
        </div>

        {/* Time rows */}
        {timeSlots.map((time, slotIdx) => (
          <div
            key={time}
            className="grid grid-cols-[60px_repeat(5,1fr)] gap-1"
          >
            <div className="flex items-center justify-end pr-2 font-mono text-[11px] text-fg-muted">
              {time}
            </div>
            {days.map((_, dayIdx) => {
              const session = sessions.find(
                (s) => s.day === dayIdx && s.slot === slotIdx,
              );
              return (
                <div
                  key={dayIdx}
                  className={cn(
                    "min-h-[44px] rounded-md border transition-all",
                    session
                      ? sessionColorClass(session.color)
                      : "border-fg/[0.04] bg-fg/[0.02]",
                  )}
                >
                  {session && (
                    <div className="flex h-full items-center p-1.5">
                      <p className="text-[10px] font-medium leading-tight">
                        {session.name}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 border-t border-fg/[0.06] pt-3">
        <LegendDot color="accent" label="Sicurezza generale" />
        <LegendDot color="amber" label="Antincendio" />
        <LegendDot color="emerald" label="RLS" />
        <LegendDot color="rose" label="Primo Soccorso" />
      </div>
    </div>
  );
}

function sessionColorClass(color: string) {
  const map: Record<string, string> = {
    accent: "bg-accent/10 border-accent/30 text-accent",
    amber: "bg-amber-100 border-amber-300 text-amber-800",
    emerald: "bg-emerald-100 border-emerald-300 text-emerald-800",
    rose: "bg-rose-100 border-rose-300 text-rose-800",
  };
  return map[color] || "";
}

function LegendDot({ color, label }: { color: string; label: string }) {
  const dotColor = {
    accent: "bg-accent",
    amber: "bg-amber-500",
    emerald: "bg-emerald-500",
    rose: "bg-rose-500",
  }[color];
  return (
    <div className="flex items-center gap-1.5">
      <span className={cn("h-2 w-2 rounded-sm", dotColor)} />
      <span className="text-[11px] text-fg-muted">{label}</span>
    </div>
  );
}
