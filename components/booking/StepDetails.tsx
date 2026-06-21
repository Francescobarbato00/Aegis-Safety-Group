"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { useBooking } from "./BookingContext";

export function StepDetails() {
  const { data, updateData, setStep } = useBooking();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (data.fullName.trim().length < 2) e.fullName = "Inserisci nome e cognome";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = "Email non valida";
    if (data.phone.trim().length < 6) e.phone = "Telefono non valido";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleContinue = () => {
    if (validate()) setStep(4);
  };

  const inputCls = (err?: string) =>
    cn(
      "w-full rounded-lg border bg-fg/[0.02] px-3.5 py-2.5 text-sm text-fg placeholder:text-fg-muted/40",
      "transition-all focus:bg-white focus:outline-none",
      err ? "border-red-500/50" : "border-fg/[0.12] focus:border-accent/60",
    );

  return (
    <div>
      <h3 className="mb-1 font-[family-name:var(--font-sora)] text-xl font-medium text-fg">
        I tuoi dati
      </h3>
      <p className="mb-6 text-sm text-fg-muted">
        Per confermarti l&apos;appuntamento e ricontattarti.
      </p>

      <div className="space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-fg">
            Nome e cognome
          </label>
          <input
            type="text"
            value={data.fullName}
            onChange={(e) => updateData({ fullName: e.target.value })}
            placeholder="Mario Rossi"
            className={inputCls(errors.fullName)}
          />
          {errors.fullName && (
            <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>
          )}
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-fg">Email</label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => updateData({ email: e.target.value })}
            placeholder="mario@azienda.it"
            className={inputCls(errors.email)}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-500">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-fg">
            Telefono
          </label>
          <input
            type="tel"
            value={data.phone}
            onChange={(e) => updateData({ phone: e.target.value })}
            placeholder="+39 ..."
            className={inputCls(errors.phone)}
          />
          {errors.phone && (
            <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
          )}
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-fg">
            Note <span className="font-normal text-fg-muted">(opzionale)</span>
          </label>
          <textarea
            value={data.notes}
            onChange={(e) => updateData({ notes: e.target.value })}
            rows={3}
            placeholder="Settore, dipendenti, di cosa vuoi parlare..."
            className={cn(inputCls(), "min-h-[80px] resize-y")}
          />
        </div>
      </div>

      <button
        onClick={handleContinue}
        className="mt-6 w-full rounded-lg bg-accent py-3 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
      >
        Rivedi e conferma
      </button>
    </div>
  );
}
