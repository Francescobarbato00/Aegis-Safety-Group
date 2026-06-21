import type { Metadata, Viewport } from "next";
import { Sora, Inter, Instrument_Serif } from "next/font/google";
import { CustomCursor } from "@/components/ui/CustomCursor";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
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
  themeColor: "#FAFAF7",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="it"
      className={`${sora.variable} ${inter.variable} ${instrumentSerif.variable}`}
    >
      <body className="font-inter">
        {children}
        <CustomCursor />
      </body>
    </html>
  );
}
