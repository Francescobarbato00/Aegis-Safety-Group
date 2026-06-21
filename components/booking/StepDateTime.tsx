"use client";

import { useState, useMemo, useRef } from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { useBooking } from "./BookingContext";
import { generateAvailableDays } from "@/lib/experts-data";

export function StepDateTime() {
  const { data, updateData, setStep } = useBooking();
  const days = useMemo(() => generateAvailableDays(7), []);
  const [selectedDayIdx, setSelectedDayIdx] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollDays = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 200;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  const canProceed = selectedDayIdx !== null && data.date && data.time;

  return (
    <div>
      <h3 className="mb-1 font-[family-name:var(--font-sora)] text-xl font-medium text-fg">
        Quando ti viene comodo?
      </h3>
      <p className="mb-6 text-sm text-fg-muted">
        Scegli giorno e orario. Confermiamo entro 24h.
      </p>

      {/* Selettore giorni con frecce + fade */}
      <div className="relative mb-6">
        {/* Freccia sinistra */}
        <button
          onClick={() => scrollDays("left")}
          className="absolute left-0 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-fg/[0.1] bg-white shadow-sm transition-colors hover:border-accent/40 hover:text-accent"
          aria-label="Giorni precedenti"
        >
          <ChevronLeft className="h-4 w-4 text-fg-muted" />
        </button>

        {/* Freccia destra */}
        <button
          onClick={() => scrollDays("right")}
          className="absolute right-0 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-fg/[0.1] bg-white shadow-sm transition-colors hover:border-accent/40 hover:text-accent"
          aria-label="Giorni successivi"
        >
          <ChevronRight className="h-4 w-4 text-fg-muted" />
        </button>

        {/* Fade sinistro */}
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-10 bg-gradient-to-r from-bg to-transparent"
        />
        {/* Fade destro */}
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-10 bg-gradient-to-l from-bg to-transparent"
        />

        {/* Lista giorni scrollabile */}
        <div
          ref={scrollRef}
          className="scrollbar-hide flex gap-2 overflow-x-auto scroll-smooth px-10"
        >
          {days.map((day, i) => (
            <button
              key={i}
              onClick={() => setSelectedDayIdx(i)}
              className={cn(
                "flex min-w-[64px] shrink-0 flex-col items-center gap-1 rounded-xl border px-4 py-3 transition-all",
                selectedDayIdx === i
                  ? "border-accent bg-accent/[0.06] shadow-[0_0_0_1px_rgba(6,182,212,0.2)]"
                  : "border-fg/[0.08] bg-white hover:border-fg/[0.2]",
              )}
            >
              <span
                className={cn(
                  "text-[10px] font-medium uppercase tracking-wider",
                  selectedDayIdx === i ? "text-accent" : "text-fg-muted",
                )}
              >
                {day.dayLabel}
              </span>
              <span className="font-[family-name:var(--font-sora)] text-lg font-medium text-fg">
                {day.dayNumber}
              </span>
              <span className="text-[10px] text-fg-muted">{day.monthLabel}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Slot orari — visibili solo dopo aver scelto un giorno */}
      {selectedDayIdx === null ? (
        <div className="px-4 py-8 text-center">
          <Calendar className="mx-auto mb-3 h-8 w-8 text-fg-muted/40" />
          <p className="text-sm text-fg-muted">
            Seleziona un giorno per vedere gli orari disponibili
          </p>
        </div>
      ) : (
        <>
          <div className="mb-3 flex items-center gap-2">
            <Calendar className="h-4 w-4 text-fg-muted" />
            <span className="text-sm font-medium text-fg">
              Orari disponibili · {days[selectedDayIdx].dayLabel}{" "}
              {days[selectedDayIdx].dayNumber} {days[selectedDayIdx].monthLabel}
            </span>
          </div>
          <div className="mb-6 grid grid-cols-3 gap-2">
            {days[selectedDayIdx].slots.map((slot) => {
              const isSelected =
                data.time === slot.time &&
                data.date?.getTime() === days[selectedDayIdx].date.getTime();
              return (
                <button
                  key={slot.time}
                  disabled={!slot.available}
                  onClick={() =>
                    updateData({
                      date: days[selectedDayIdx].date,
                      time: slot.time,
                    })
                  }
                  className={cn(
                    "rounded-lg border py-2.5 text-sm font-medium transition-all",
                    !slot.available
                      ? "cursor-not-allowed border-fg/[0.05] bg-fg/[0.02] text-fg-muted/40 line-through"
                      : isSelected
                        ? "border-accent bg-accent text-white shadow-[0_4px_12px_-4px_rgba(6,182,212,0.4)]"
                        : "border-fg/[0.1] bg-white text-fg hover:border-accent/40 hover:bg-accent/[0.04]",
                  )}
                >
                  {slot.time}
                </button>
              );
            })}
          </div>
        </>
      )}

      {/* CTA continua */}
      <button
        onClick={() => setStep(3)}
        disabled={!canProceed}
        className={cn(
          "w-full rounded-lg py-3 text-sm font-medium transition-all",
          canProceed
            ? "bg-accent text-white hover:bg-accent-hover"
            : "cursor-not-allowed bg-fg/[0.05] text-fg-muted",
        )}
      >
        Continua
      </button>
    </div>
  );
}
