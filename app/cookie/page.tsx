import type { Metadata } from "next";
import {
  LegalLayout,
  LegalSection,
  LegalList,
} from "@/components/legal/LegalLayout";
import { legalEntity } from "@/lib/legal-data";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "Informativa sull'utilizzo dei cookie sul sito di Aegis Safety Group, ai sensi delle Linee Guida del Garante per la protezione dei dati personali.",
  robots: { index: true, follow: true },
};

export default function CookiePage() {
  return (
    <LegalLayout
      title="Cookie Policy"
      subtitle="Informativa sull'utilizzo dei cookie ai sensi del Provvedimento del Garante per la protezione dei dati personali del 10 giugno 2021 e dell'art. 122 del D.Lgs. 196/2003."
    >
      <LegalSection number="01" title="Cosa sono i cookie">
        <p>
          I cookie sono piccoli file di testo che i siti visitati inviano al
          dispositivo dell&apos;utente, dove vengono memorizzati per essere
          ritrasmessi agli stessi siti alla visita successiva. Servono a far
          funzionare il sito o a migliorarne l&apos;efficienza, oltre che a
          fornire informazioni al gestore.
        </p>
        <p>
          I cookie si distinguono in <strong>cookie tecnici</strong> (necessari
          al funzionamento del sito) e <strong>cookie di profilazione</strong>{" "}
          (utilizzati per tracciare l&apos;utente e inviare messaggi
          pubblicitari mirati).
        </p>
      </LegalSection>

      <LegalSection number="02" title="Cookie utilizzati da questo sito">
        <p>
          Questo sito utilizza{" "}
          <strong>esclusivamente cookie tecnici</strong>, necessari al corretto
          funzionamento e alla navigazione. Non utilizziamo cookie di
          profilazione, né strumenti di tracciamento o analisi di terze parti
          che richiedano il consenso dell&apos;utente.
        </p>
        <p>
          In conformità alle Linee Guida del Garante, per i soli cookie tecnici
          non è richiesto il consenso preventivo dell&apos;utente.
        </p>
      </LegalSection>

      <LegalSection number="03" title="Tipologie di cookie tecnici presenti">
        <p>I cookie tecnici utilizzati rientrano nelle seguenti categorie:</p>
        <LegalList
          items={[
            "Cookie di navigazione o di sessione: garantiscono la normale navigazione e fruizione del sito (ad esempio per gestire la sessione). Vengono eliminati alla chiusura del browser;",
            "Cookie funzionali: permettono di memorizzare le preferenze di navigazione dell'utente (ad esempio le impostazioni di visualizzazione) per migliorare l'esperienza d'uso.",
          ]}
        />
        <p>
          Tutti i cookie tecnici utilizzati sono di prima parte (impostati
          direttamente da questo sito) e non vengono condivisi con terze parti
          per finalità di profilazione.
        </p>
      </LegalSection>

      <LegalSection
        number="04"
        title="Assenza di cookie di profilazione e di terze parti"
      >
        <p>
          Allo stato attuale, questo sito{" "}
          <strong>non installa cookie di profilazione</strong>, non utilizza
          strumenti di analisi del traffico (come Google Analytics) né pixel di
          tracciamento pubblicitario (come Meta Pixel). Di conseguenza, non
          viene mostrato alcun banner di richiesta del consenso, in quanto non
          necessario per i soli cookie tecnici.
        </p>
        <p>
          Qualora in futuro venissero introdotti strumenti di profilazione o
          cookie di terze parti, la presente informativa sarà aggiornata e verrà
          richiesto il consenso preventivo dell&apos;utente tramite apposito
          banner.
        </p>
      </LegalSection>

      <LegalSection number="05" title="Gestione dei cookie dal browser">
        <p>
          L&apos;utente può gestire o disabilitare i cookie direttamente dalle
          impostazioni del proprio browser. Si segnala che la disabilitazione
          dei cookie tecnici potrebbe compromettere il corretto funzionamento di
          alcune parti del sito.
        </p>
        <p>
          Le istruzioni per la gestione dei cookie sono disponibili sui siti
          ufficiali dei principali browser:
        </p>
        <LegalList
          items={[
            "Google Chrome: Impostazioni → Privacy e sicurezza → Cookie",
            "Mozilla Firefox: Impostazioni → Privacy e sicurezza → Cookie e dati dei siti web",
            "Safari: Preferenze → Privacy → Gestione dati siti web",
            "Microsoft Edge: Impostazioni → Cookie e autorizzazioni sito",
          ]}
        />
      </LegalSection>

      <LegalSection number="06" title="Titolare del trattamento">
        <p>
          Il Titolare del trattamento dei dati è {legalEntity.companyName}, con
          sede legale in {legalEntity.address}, P.IVA {legalEntity.vat}. Per
          qualsiasi richiesta è possibile scrivere a{" "}
          <a
            href={`mailto:${legalEntity.email}`}
            className="text-accent hover:underline"
          >
            {legalEntity.email}
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection number="07" title="Ulteriori informazioni">
        <p>
          Per maggiori dettagli sul trattamento dei dati personali si rimanda
          alla{" "}
          <a href="/privacy" className="text-accent hover:underline">
            Privacy Policy
          </a>{" "}
          del sito.
        </p>
      </LegalSection>

      {/* Disclaimer placeholder visibile (DA RIMUOVERE dopo verifica) */}
      <div className="mt-12 rounded-xl border border-amber-200 bg-amber-50 p-5">
        <p className="text-sm leading-relaxed text-amber-800">
          <strong>Nota per il committente:</strong> questa policy dichiara soli
          cookie tecnici. Se verranno installati Google Analytics, Meta Pixel
          (per le ads social) o altri strumenti di tracciamento, questa pagina va
          aggiornata e diventa obbligatorio un banner di consenso cookie.
          Verificare anche i dati del titolare (placeholder). Rimuovere questo
          riquadro una volta validato.
        </p>
      </div>
    </LegalLayout>
  );
}
