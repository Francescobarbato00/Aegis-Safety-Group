import { z } from "zod";

export const leadSchema = z.object({
  fullName: z.string().min(2, "Inserisci nome e cognome").max(100),
  email: z.email("Email non valida"),
  phone: z
    .string()
    .min(6, "Numero di telefono non valido")
    .max(20)
    .regex(/^[\d\s+\-().]+$/, "Caratteri non validi"),
  company: z.string().min(2, "Nome azienda richiesto").max(100),
  employees: z.enum(["1-5", "6-15", "16-50", "51-100", "Oltre 100"], {
    message: "Seleziona il numero di dipendenti",
  }),
  message: z.string().min(10, "Raccontaci almeno qualche dettaglio").max(2000),
  privacy: z
    .boolean()
    .refine((v) => v === true, { message: "Devi accettare la privacy policy" }),
  website: z.string().optional(), // honeypot
});

export type LeadFormData = z.infer<typeof leadSchema>;
