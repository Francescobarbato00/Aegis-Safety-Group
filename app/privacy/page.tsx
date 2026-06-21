import type { Metadata } from "next";
import {
  LegalLayout,
  LegalSection,
  LegalList,
} from "@/components/legal/LegalLayout";
import { legalEntity } from "@/lib/legal-data";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Informativa sul trattamento dei dati personali di Aegis Safety Group, ai sensi del Regolamento UE 2016/679 (GDPR).",
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <LegalLayout
      title="Privacy Policy"
      subtitle="Informativa sul trattamento dei dati personali ai sensi del Regolamento UE 2016/679 (GDPR) e del D.Lgs. 196/2003 come modificato dal D.Lgs. 101/2018."
    >
      <LegalSection number="01" title="Titolare del trattamento">
        <p>
          Il Titolare del trattamento dei dati personali è{" "}
          {legalEntity.companyName}
          {legalEntity.legalForm !== "[FORMA GIURIDICA]" &&
            `, ${legalEntity.legalForm}`}
          , con sede legale in {legalEntity.address}, P.IVA {legalEntity.vat}.
        </p>
        <p>
          Per qualsiasi richiesta relativa al trattamento dei dati personali è
          possibile contattare il Titolare all&apos;indirizzo email:{" "}
          <a
            href={`mailto:${legalEntity.email}`}
            className="text-accent hover:underline"
          >
            {legalEntity.email}
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection number="02" title="Tipologie di dati raccolti">
        <p>
          Attraverso il modulo di contatto presente sul sito, raccogliamo i
          seguenti dati personali che l&apos;utente fornisce volontariamente:
        </p>
        <LegalList
          items={[
            "Nome e cognome",
            "Indirizzo email",
            "Numero di telefono",
            "Nome dell'azienda e numero di dipendenti",
            "Eventuali informazioni fornite liberamente nel campo messaggio",
          ]}
        />
        <p>
          Durante la navigazione, il sito può inoltre raccogliere
          automaticamente alcuni dati tecnici (indirizzo IP, tipo di browser,
          dati di navigazione) come descritto nella{" "}
          <a href="/cookie" className="text-accent hover:underline">
            Cookie Policy
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection number="03" title="Finalità del trattamento">
        <p>I dati personali forniti vengono trattati per le seguenti finalità:</p>
        <LegalList
          items={[
            "Rispondere alle richieste di contatto e fornire le informazioni richieste sui nostri servizi di consulenza in materia di sicurezza sul lavoro;",
            "Organizzare e fornire il check-up gratuito richiesto;",
            "Elaborare preventivi personalizzati;",
            "Adempiere a eventuali obblighi di legge.",
          ]}
        />
      </LegalSection>

      <LegalSection number="04" title="Base giuridica del trattamento">
        <p>
          Il trattamento dei dati per rispondere alle richieste di contatto si
          basa sul consenso dell&apos;interessato (art. 6, par. 1, lett. a del
          GDPR) e sull&apos;esecuzione di misure precontrattuali adottate su
          richiesta dello stesso (art. 6, par. 1, lett. b del GDPR).
        </p>
      </LegalSection>

      <LegalSection number="05" title="Modalità del trattamento">
        <p>
          I dati sono trattati con strumenti informatici e telematici, con
          logiche strettamente correlate alle finalità indicate e con misure
          tecniche e organizzative adeguate a garantire la sicurezza e la
          riservatezza dei dati.
        </p>
        <p>
          I dati raccolti tramite il modulo di contatto possono essere gestiti
          attraverso servizi di terze parti (fornitori di servizi email e
          archiviazione cloud) che operano in qualità di Responsabili del
          trattamento, nel rispetto del GDPR.
        </p>
      </LegalSection>

      <LegalSection number="06" title="Comunicazione e diffusione dei dati">
        <p>
          I dati personali non saranno diffusi né comunicati a terzi per
          finalità diverse da quelle indicate. Potranno essere comunicati
          esclusivamente a soggetti che forniscono servizi strumentali
          all&apos;attività del Titolare (es. fornitori di servizi
          informatici), nominati Responsabili del trattamento, e ad autorità
          competenti ove richiesto per legge.
        </p>
      </LegalSection>

      <LegalSection number="07" title="Periodo di conservazione">
        <p>
          I dati personali saranno conservati per il tempo strettamente
          necessario a conseguire le finalità per cui sono stati raccolti. I
          dati relativi a richieste di contatto non seguite da un rapporto
          contrattuale saranno conservati per un massimo di 24 mesi, salvo
          diversa necessità legata a obblighi di legge.
        </p>
      </LegalSection>

      <LegalSection number="08" title="Diritti dell'interessato">
        <p>In qualità di interessato, l&apos;utente ha il diritto di:</p>
        <LegalList
          items={[
            "Accedere ai propri dati personali (art. 15 GDPR);",
            "Richiederne la rettifica (art. 16 GDPR);",
            "Richiederne la cancellazione (art. 17 GDPR);",
            "Ottenere la limitazione del trattamento (art. 18 GDPR);",
            "Opporsi al trattamento (art. 21 GDPR);",
            "Ricevere i dati in formato strutturato — portabilità (art. 20 GDPR);",
            "Revocare il consenso in qualsiasi momento;",
            "Proporre reclamo all'Autorità Garante per la protezione dei dati personali.",
          ]}
        />
        <p>
          Per esercitare tali diritti è possibile scrivere a{" "}
          <a
            href={`mailto:${legalEntity.email}`}
            className="text-accent hover:underline"
          >
            {legalEntity.email}
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection number="09" title="Modifiche alla presente informativa">
        <p>
          Il Titolare si riserva il diritto di modificare la presente
          informativa in qualsiasi momento, dandone comunicazione agli utenti
          tramite la pubblicazione sul sito. Si invita a consultare
          periodicamente questa pagina.
        </p>
      </LegalSection>

      {/* Disclaimer placeholder visibile (DA RIMUOVERE dopo compilazione dati reali) */}
      <div className="mt-12 rounded-xl border border-amber-200 bg-amber-50 p-5">
        <p className="text-sm leading-relaxed text-amber-800">
          <strong>Nota per il committente:</strong> questo testo è una base
          conforme alla struttura GDPR ma contiene dati placeholder (ragione
          sociale, sede, P.IVA) e va validato da un consulente privacy/DPO prima
          della pubblicazione. Rimuovere questo riquadro una volta completato.
        </p>
      </div>
    </LegalLayout>
  );
}
