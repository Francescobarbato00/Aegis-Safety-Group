"use client";

import { useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Loader2,
  Check,
  ArrowRight,
  AlertCircle,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { leadSchema, type LeadFormData } from "@/lib/leadSchema";

export function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
    defaultValues: { privacy: false, employees: undefined },
  });

  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const onSubmit = async (data: LeadFormData) => {
    setSubmitError(null);
    try {
      // FASE A: log + delay. La Fase B endpointizza.
      console.log("Lead form data:", data);
      await new Promise((r) => setTimeout(r, 1200));
      setSubmitSuccess(true);
    } catch {
      setSubmitError(
        "Si è verificato un errore. Riprova o contattaci direttamente.",
      );
    }
  };

  if (submitSuccess) return <SuccessState />;

  return (
    <div className="relative">
      {/* Glow tenue dietro il form */}
      <div
        aria-hidden
        className="absolute inset-0 rounded-3xl bg-gradient-to-br from-accent/[0.04] to-transparent blur-2xl"
      />

      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="relative space-y-6 rounded-2xl border border-fg/[0.08] bg-white p-6 shadow-[0_24px_60px_-24px_rgba(15,27,45,0.12)] backdrop-blur-sm lg:p-10"
      >
        {/* Honeypot anti-bot */}
        <input
          type="text"
          {...register("website")}
          tabIndex={-1}
          aria-hidden="true"
          autoComplete="off"
          className="pointer-events-none absolute left-[-9999px] opacity-0"
        />

        {/* Nome + Email */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <FormField label="Nome e cognome" error={errors.fullName?.message}>
            <input
              type="text"
              autoComplete="name"
              placeholder="Mario Rossi"
              {...register("fullName")}
              className={inputStyles(!!errors.fullName)}
              aria-invalid={!!errors.fullName}
            />
          </FormField>

          <FormField label="Email aziendale" error={errors.email?.message}>
            <input
              type="email"
              autoComplete="email"
              placeholder="mario@azienda.it"
              {...register("email")}
              className={inputStyles(!!errors.email)}
              aria-invalid={!!errors.email}
            />
          </FormField>
        </div>

        {/* Azienda + Dipendenti */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <FormField label="Azienda" error={errors.company?.message}>
            <input
              type="text"
              autoComplete="organization"
              placeholder="Nome della tua azienda"
              {...register("company")}
              className={inputStyles(!!errors.company)}
              aria-invalid={!!errors.company}
            />
          </FormField>

          <FormField label="Numero dipendenti" error={errors.employees?.message}>
            <div className="relative">
              <select
                {...register("employees")}
                className={cn(
                  inputStyles(!!errors.employees),
                  "cursor-pointer appearance-none pr-10",
                  "text-fg [&:invalid]:text-fg-muted/40",
                )}
                aria-invalid={!!errors.employees}
                defaultValue=""
              >
                <option value="" disabled>
                  Seleziona...
                </option>
                <option value="1-5" className="bg-white text-fg">
                  1-5 dipendenti
                </option>
                <option value="6-15" className="bg-white text-fg">
                  6-15 dipendenti
                </option>
                <option value="16-50" className="bg-white text-fg">
                  16-50 dipendenti
                </option>
                <option value="51-100" className="bg-white text-fg">
                  51-100 dipendenti
                </option>
                <option value="Oltre 100" className="bg-white text-fg">
                  Oltre 100 dipendenti
                </option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-fg-muted" />
            </div>
          </FormField>
        </div>

        {/* Telefono */}
        <FormField
          label="Telefono"
          error={errors.phone?.message}
          helper="Ti chiamiamo per organizzare il check-up"
        >
          <input
            type="tel"
            autoComplete="tel"
            placeholder="+39 ..."
            {...register("phone")}
            className={inputStyles(!!errors.phone)}
            aria-invalid={!!errors.phone}
          />
        </FormField>

        {/* Messaggio */}
        <FormField
          label="Come possiamo aiutarti?"
          error={errors.message?.message}
          helper="Settore di attività e di cosa hai bisogno"
        >
          <textarea
            rows={4}
            placeholder="Es. Ho un ristorante con 12 dipendenti, devo rinnovare DVR e formazione antincendio..."
            {...register("message")}
            className={cn(
              inputStyles(!!errors.message),
              "min-h-[120px] resize-y",
            )}
            aria-invalid={!!errors.message}
          />
        </FormField>

        {/* Privacy */}
        <div className="pt-2">
          <label className="group flex cursor-pointer items-start gap-3">
            <span className="relative mt-0.5 flex shrink-0">
              <input
                type="checkbox"
                {...register("privacy")}
                className="peer sr-only"
              />
              <span
                className={cn(
                  "flex h-5 w-5 items-center justify-center rounded-md border bg-fg/[0.03]",
                  "border-fg/[0.2] transition-colors group-hover:border-fg/[0.4]",
                  "peer-checked:border-accent peer-checked:bg-accent",
                  "peer-checked:[&>svg]:opacity-100",
                  "peer-focus-visible:ring-2 peer-focus-visible:ring-accent peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-bg",
                )}
              >
                <Check className="h-3 w-3 text-white opacity-0 transition-opacity" />
              </span>
            </span>
            <span className="text-sm leading-relaxed text-fg-muted">
              Ho letto e accetto la{" "}
              <a
                href="/privacy"
                className="text-accent underline underline-offset-2 hover:text-accent-hover"
              >
                privacy policy
              </a>
              . I miei dati saranno trattati per essere ricontattato.
            </span>
          </label>
          {errors.privacy && (
            <div className="mt-2 flex items-center gap-1.5 pl-8 text-xs text-red-500">
              <AlertCircle className="h-3 w-3" />
              {errors.privacy.message}
            </div>
          )}
        </div>

        {/* Submit error */}
        {submitError && (
          <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            <AlertCircle className="h-4 w-4 shrink-0" />
            {submitError}
          </div>
        )}

        {/* Submit */}
        <div className="pt-2">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={isSubmitting}
            className="w-full disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin motion-reduce:animate-none" />
                Invio in corso...
              </>
            ) : (
              <>
                Invia richiesta
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </>
            )}
          </Button>
          <p className="mt-3 text-center text-xs text-fg-muted">
            Ti rispondiamo entro 24 ore lavorative.
          </p>
        </div>
      </form>
    </div>
  );
}

function FormField({
  label,
  error,
  helper,
  children,
}: {
  label: string;
  error?: string;
  helper?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-fg">
        {label}
      </label>
      {children}
      {helper && !error && (
        <p className="mt-1.5 text-xs text-fg-muted/70">{helper}</p>
      )}
      {error && (
        <div className="mt-1.5 flex items-center gap-1.5 text-xs text-red-500">
          <AlertCircle className="h-3 w-3" />
          {error}
        </div>
      )}
    </div>
  );
}

function inputStyles(hasError: boolean) {
  return cn(
    "w-full rounded-lg px-3.5 py-3",
    "border bg-fg/[0.02] text-fg placeholder:text-fg-muted/40",
    "transition-all duration-200",
    "focus:bg-white focus:outline-none",
    hasError
      ? "border-red-500/50 focus:border-red-500"
      : "border-fg/[0.12] focus:border-accent/60",
  );
}

function SuccessState() {
  return (
    <div className="rounded-2xl border border-fg/[0.08] bg-white p-8 text-center shadow-[0_24px_60px_-24px_rgba(15,27,45,0.12)] lg:p-12">
      <div className="mb-5 inline-flex h-16 w-16 items-center justify-center rounded-full border border-accent/30 bg-accent/10">
        <Check className="h-8 w-8 text-accent" />
      </div>
      <h3 className="mb-3 text-2xl font-semibold text-fg">
        Richiesta inviata
      </h3>
      <p className="mx-auto max-w-md leading-relaxed text-fg-muted">
        Grazie. Un nostro consulente ti contatterà entro 24 ore per organizzare
        il check-up gratuito.
      </p>
      <p className="mt-6 font-mono text-xs text-fg-muted/60">
        Conferma inviata · in attesa di chiamata
      </p>
    </div>
  );
}
