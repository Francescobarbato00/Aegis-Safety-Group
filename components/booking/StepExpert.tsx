"use client";

import { cn } from "@/lib/utils";
import { useBooking } from "./BookingContext";
import { experts, type Expert } from "@/lib/experts-data";

// Brand Book Aegis: un solo accento verde per tutti gli avatar (niente arcobaleno).
const avatarStyle = "bg-accent/10 text-accent border-accent/30";

export function StepExpert() {
  const { data, updateData, setStep } = useBooking();

  const selectExpert = (expert: Expert) => {
    updateData({ expert });
    setStep(2);
  };

  return (
    <div>
      <h3 className="mb-1 text-xl font-semibold text-fg">
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
                  "flex h-12 w-12 shrink-0 items-center justify-center rounded-full border text-sm font-medium",
                  avatarStyle,
                )}
              >
                {expert.initials}
              </div>
              {/* Info */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-medium text-fg">
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
