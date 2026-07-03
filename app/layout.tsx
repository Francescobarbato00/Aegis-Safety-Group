import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { CustomCursor } from "@/components/ui/CustomCursor";
import "./globals.css";

// Brand Book Aegis (pag. 26): Inter primario per body/UI/dati.
// I titoli ("Inter Display Bold") usano Inter weight 700 + tracking-tight.
// Inter è variable font e include già le ottiche display via next/font/google.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Aegis Safety Group — Consulenza sicurezza sul lavoro",
    template: "%s | Aegis Safety Group",
  },
  description:
    "Affianchiamo aziende e professionisti nella gestione completa degli obblighi sulla sicurezza sul lavoro: DVR, RSPP, formazione e aggiornamenti normativi. Check-up gratuito.",
  keywords: [
    "sicurezza sul lavoro",
    "DVR",
    "RSPP",
    "consulenza sicurezza",
    "formazione lavoratori",
    "HACCP",
    "valutazione rischi",
  ],
  authors: [{ name: "Aegis Safety Group" }],
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: "https://aegissafetygroup.it",
    title: "Aegis Safety Group — Consulenza sicurezza sul lavoro",
    description:
      "Affianchiamo aziende e professionisti nella gestione completa degli obblighi sulla sicurezza sul lavoro: DVR, RSPP, formazione e aggiornamenti normativi. Check-up gratuito.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aegis Safety Group — Consulenza sicurezza sul lavoro",
    description:
      "Affianchiamo aziende e professionisti nella gestione completa degli obblighi sulla sicurezza sul lavoro: DVR, RSPP, formazione e aggiornamenti normativi. Check-up gratuito.",
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#071E3A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className={inter.variable}>
      <body className="font-[family-name:var(--font-inter)]">
        {children}
        <CustomCursor />
      </body>
    </html>
  );
}
