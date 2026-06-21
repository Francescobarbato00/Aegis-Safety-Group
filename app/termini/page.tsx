import type { Metadata } from "next";
import {
  LegalLayout,
  LegalSection,
  LegalList,
} from "@/components/legal/LegalLayout";
import { legalEntity } from "@/lib/legal-data";

export const metadata: Metadata = {
  title: "Termini di servizio",
  description:
    "Termini e condizioni di utilizzo del sito web di Aegis Safety Group.",
  robots: { index: true, follow: true },
};

export default function TerminiPage() {
  return (
    <LegalLayout
      title="Termini di servizio"
      subtitle="Termini e condizioni di utilizzo del sito web. Utilizzando questo sito, l'utente accetta integralmente i presenti termini."
    >
      <LegalSection number="01" title="Oggetto e ambito di applicazione">
        <p>
          I presenti Termini di servizio regolano l&apos;utilizzo del sito web
          di {legalEntity.companyName} (di seguito &quot;il Sito&quot;). Il Sito
          ha finalità informative e di contatto: presenta i servizi di
          consulenza in materia di salute e sicurezza sul lavoro offerti dal
          Titolare e consente agli utenti di richiedere informazioni o un primo
          contatto.
        </p>
        <p>
          L&apos;accesso e l&apos;utilizzo del Sito implicano
          l&apos;accettazione integrale dei presenti termini. Qualora
          l&apos;utente non intenda accettarli, è invitato a non utilizzare il
          Sito.
        </p>
      </LegalSection>

      <LegalSection number="02" title="Natura informativa dei contenuti">
        <p>
          I contenuti presenti sul Sito (descrizioni dei servizi, riferimenti
          normativi, informazioni sulla sicurezza sul lavoro) hanno carattere
          puramente informativo e divulgativo. Non costituiscono consulenza
          professionale personalizzata, né parere legale o tecnico vincolante.
        </p>
        <p>
          Ogni servizio di consulenza è oggetto di specifico contratto, che
          definisce condizioni economiche, prestazioni, tempi e responsabilità.
          Le informazioni sul Sito non costituiscono offerta contrattuale ai
          sensi dell&apos;art. 1336 del Codice Civile.
        </p>
      </LegalSection>

      <LegalSection number="03" title="Richieste di contatto">
        <p>
          Attraverso il modulo di contatto l&apos;utente può richiedere
          informazioni o un check-up gratuito. L&apos;invio di una richiesta non
          genera alcun obbligo contrattuale per nessuna delle parti: rappresenta
          unicamente una manifestazione di interesse a essere ricontattati.
        </p>
        <p>
          Il Titolare si impegna a dare riscontro alle richieste nei tempi
          indicati sul Sito, fatte salve cause di forza maggiore o periodi di
          indisponibilità.
        </p>
      </LegalSection>

      <LegalSection number="04" title="Proprietà intellettuale">
        <p>
          Tutti i contenuti del Sito — inclusi testi, grafica, loghi, marchi,
          immagini, layout e codice — sono di proprietà di{" "}
          {legalEntity.companyName} o dei rispettivi titolari e sono protetti
          dalla normativa vigente in materia di proprietà intellettuale e
          diritto d&apos;autore.
        </p>
        <p>
          È vietata la riproduzione, distribuzione, modifica o utilizzo, anche
          parziale, dei contenuti del Sito senza il preventivo consenso scritto
          del Titolare, salvo per uso personale e non commerciale.
        </p>
      </LegalSection>

      <LegalSection number="05" title="Utilizzo consentito del sito">
        <p>
          L&apos;utente si impegna a utilizzare il Sito in conformità alla legge
          e ai presenti termini, e in particolare a non:
        </p>
        <LegalList
          items={[
            "Utilizzare il Sito per finalità illecite o non autorizzate;",
            "Tentare di accedere ad aree riservate o compromettere la sicurezza del Sito;",
            "Trasmettere virus, codice dannoso o effettuare attività che possano danneggiare il funzionamento del Sito;",
            "Raccogliere dati di altri utenti in modo automatizzato (scraping) senza autorizzazione.",
          ]}
        />
      </LegalSection>

      <LegalSection number="06" title="Limitazione di responsabilità">
        <p>
          Il Titolare si impegna a mantenere le informazioni del Sito accurate e
          aggiornate, ma non garantisce l&apos;assenza di errori o omissioni. I
          riferimenti normativi sono forniti a scopo informativo e potrebbero
          non riflettere modifiche legislative successive alla pubblicazione.
        </p>
        <p>
          Il Titolare non è responsabile per eventuali danni derivanti
          dall&apos;utilizzo o dall&apos;impossibilità di utilizzo del Sito, né
          per decisioni assunte dall&apos;utente sulla base delle sole
          informazioni in esso contenute, in assenza di una consulenza
          professionale formalizzata.
        </p>
      </LegalSection>

      <LegalSection number="07" title="Collegamenti a siti terzi">
        <p>
          Il Sito può contenere collegamenti a siti web di terze parti. Il
          Titolare non esercita alcun controllo su tali siti e non è
          responsabile dei loro contenuti, della loro disponibilità o delle loro
          politiche sulla privacy.
        </p>
      </LegalSection>

      <LegalSection number="08" title="Modifiche ai termini">
        <p>
          Il Titolare si riserva il diritto di modificare in qualsiasi momento i
          presenti Termini di servizio. Le modifiche avranno effetto dalla
          pubblicazione sul Sito. Si invita l&apos;utente a consultare
          periodicamente questa pagina.
        </p>
      </LegalSection>

      <LegalSection number="09" title="Legge applicabile e foro competente">
        <p>
          I presenti Termini di servizio sono regolati dalla legge italiana. Per
          qualsiasi controversia relativa all&apos;interpretazione, esecuzione o
          validità dei presenti termini sarà competente il Foro del luogo in cui
          il Titolare ha la propria sede legale, fatte salve le diverse
          competenze inderogabili previste dalla legge a tutela del consumatore.
        </p>
      </LegalSection>

      <LegalSection number="10" title="Contatti">
        <p>
          Per qualsiasi informazione relativa ai presenti Termini di servizio è
          possibile contattare {legalEntity.companyName} all&apos;indirizzo{" "}
          <a
            href={`mailto:${legalEntity.email}`}
            className="text-accent hover:underline"
          >
            {legalEntity.email}
          </a>
          .
        </p>
      </LegalSection>

      {/* Disclaimer placeholder visibile (DA RIMUOVERE dopo validazione) */}
      <div className="mt-12 rounded-xl border border-amber-200 bg-amber-50 p-5">
        <p className="text-sm leading-relaxed text-amber-800">
          <strong>Nota per il committente:</strong> base professionale conforme,
          ma con dati titolare placeholder e da validare con un legale prima
          della pubblicazione, in particolare le clausole su limitazione di
          responsabilità e foro competente. Rimuovere questo riquadro una volta
          validato.
        </p>
      </div>
    </LegalLayout>
  );
}
