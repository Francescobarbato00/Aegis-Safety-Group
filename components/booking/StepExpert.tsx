"use client";

import { cn } from "@/lib/utils";
import { useBooking } from "./BookingContext";
import { experts, type Expert } from "@/lib/experts-data";

const accentMap: Record<Expert["accent"], string> = {
  cyan: "bg-accent/10 text-accent border-accent/30",
  emerald: "bg-emerald-500/10 text-emerald-600 border-emerald-500/30",
  amber: "bg-amber-500/10 text-amber-600 border-amber-500/30",
  violet: "bg-violet-500/10 text-violet-600 border-violet-500/30",
};

export function StepExpert() {
  const { data, updateData, setStep } = useBooking();

  const selectExpert = (expert: Expert) => {
    updateData({ expert });
    setStep(2);
  };

  return (
    <div>
      <h3 className="mb-1 font-[family-name:var(--font-sora)] text-xl font-medium text-fg">
        Con chi vuoi parlare?
      </h3>
      <p className="mb-6 text-sm text-fg-muted">
        Scegli l&apos;esperto pi&ugrave; adatto alle tue esigenze.
      </p>

      <div className="space-y-3">
        {experts.map((expert) => (
          <button
            key={expert.id}
            onClick={() => selectExpert(expert)}
            className={cn(
              "group w-full rounded-xl border p-4 text-left transition-all",
              data.expert?.id === expert.id
                ? "border-accent/50 bg-accent/[0.04]"
                : "border-fg/[0.08] bg-white hover:border-fg/[0.2] hover:shadow-sm",
            )}
          >
            <div className="flex items-start gap-4">
              {/* Avatar */}
              <div
                className={cn(
                  "flex h-12 w-12 shrink-0 items-center justify-center rounded-full border font-[family-name:var(--font-sora)] text-sm font-medium",
                  accentMap[expert.accent],
                )}
              >
                {expert.initials}
              </div>
              {/* Info */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-[family-name:var(--font-sora)] font-medium text-fg">
                    {expert.name}
                  </p>
                  <span className="shrink-0 font-mono text-[10px] text-fg-muted">
                    {expert.experience}
                  </span>
                </div>
                <p className="mt-0.5 text-sm font-medium text-accent">
                  {expert.role}
                </p>
                <p className="mt-1.5 text-xs leading-relaxed text-fg-muted">
                  {expert.bio}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
