"use client";

import { useState } from "react";
import { Check, Calendar, Clock, User, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useBooking } from "./BookingContext";

export function StepConfirm({ onClose }: { onClose: () => void }) {
  const { data } = useBooking();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const handleConfirm = async () => {
    setIsSubmitting(true);
    // FASE A: log + delay. Fase B endpointizza.
    console.log("Booking request:", data);
    await new Promise((r) => setTimeout(r, 1200));
    setIsSubmitting(false);
    setConfirmed(true);
  };

  const dateLabel = data.date
    ? data.date.toLocaleDateString("it-IT", {
        weekday: "long",
        day: "numeric",
        month: "long",
      })
    : "";

  if (confirmed) {
    return (
      <div className="py-8 text-center">
        <div className="mb-5 inline-flex h-16 w-16 items-center justify-center rounded-full border border-emerald-200 bg-emerald-50">
          <Check className="h-8 w-8 text-emerald-600" />
        </div>
        <h3 className="mb-3 font-[family-name:var(--font-sora)] text-2xl font-medium text-fg">
          Richiesta inviata
        </h3>
        <p className="mb-2 leading-relaxed text-fg-muted">
          Ti confermiamo l&apos;appuntamento con{" "}
          <strong className="text-fg">{data.expert?.name}</strong> entro 24 ore
          via email.
        </p>
        <p className="mb-8 font-mono text-sm capitalize text-fg-muted/70">
          {dateLabel} · {data.time}
        </p>
        <button
          onClick={onClose}
          className="rounded-lg bg-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
        >
          Chiudi
        </button>
      </div>
    );
  }

  return (
    <div>
      <h3 className="mb-1 font-[family-name:var(--font-sora)] text-xl font-medium text-fg">
        Conferma la prenotazione
      </h3>
      <p className="mb-6 text-sm text-fg-muted">
        Controlla i dettagli prima di inviare.
      </p>

      {/* Riepilogo */}
      <div className="mb-6 space-y-3">
        <div className="flex items-center gap-3 rounded-lg border border-fg/[0.06] bg-fg/[0.02] p-3">
          <User className="h-4 w-4 shrink-0 text-accent" />
          <div>
            <p className="text-xs text-fg-muted">Esperto</p>
            <p className="text-sm font-medium text-fg">
              {data.expert?.name} · {data.expert?.role}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-lg border border-fg/[0.06] bg-fg/[0.02] p-3">
          <Calendar className="h-4 w-4 shrink-0 text-accent" />
          <div>
            <p className="text-xs text-fg-muted">Data</p>
            <p className="text-sm font-medium capitalize text-fg">{dateLabel}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-lg border border-fg/[0.06] bg-fg/[0.02] p-3">
          <Clock className="h-4 w-4 shrink-0 text-accent" />
          <div>
            <p className="text-xs text-fg-muted">Orario</p>
            <p className="text-sm font-medium text-fg">{data.time}</p>
          </div>
        </div>
      </div>

      {/* Disclaimer onesto */}
      <p className="mb-6 rounded-lg border border-accent/[0.15] bg-accent/[0.04] p-3 text-xs leading-relaxed text-fg-muted/70">
        Questa &egrave; una richiesta di appuntamento. Ti confermiamo la
        disponibilit&agrave; definitiva entro 24 ore via email o telefono.
      </p>

      <button
        onClick={handleConfirm}
        disabled={isSubmitting}
        className={cn(
          "flex w-full items-center justify-center gap-2 rounded-lg py-3 text-sm font-medium transition-colors",
          isSubmitting
            ? "cursor-wait bg-accent/70 text-white"
            : "bg-accent text-white hover:bg-accent-hover",
        )}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Invio...
          </>
        ) : (
          "Conferma prenotazione"
        )}
      </button>
    </div>
  );
}
