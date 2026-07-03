export type Service = {
  slug: string; // resta per URL/routing futuri, NON visibile in UI
  code: string; // sigla breve visibile sulla card (≤ 8 char)
  title: string;
  description: string;
  icon: string; // es. "ShieldCheck", "FileText"
  subItems?: string[];
};

export type ProcessStep = {
  number: string;
  title: string;
  description: string;
  icon: string;
  mockupTitle: string;
  duration: string;
};

export type Faq = {
  id: string;
  question: string;
  answer: string;
  reference?: string;
  highlight?: {
    label: string;
    value: string;
  };
};

export const servicesDocumentazione: Service[] = [
  {
    slug: "dvr",
    code: "DVR",
    title: "DVR — Documento di Valutazione dei Rischi",
    description:
      "Elaborazione del documento obbligatorio per individuare e gestire tutti i rischi presenti nella tua azienda.",
    icon: "FileText",
  },
  {
    slug: "duvri",
    code: "DUVRI",
    title: "DUVRI — Documento Unico Rischi da Interferenze",
    description:
      "Predisposizione del DUVRI per attività svolte da appaltatori o fornitori esterni.",
    icon: "Files",
  },
  {
    slug: "pos",
    code: "POS",
    title: "POS — Piano Operativo di Sicurezza",
    description:
      "Stesura del POS per imprese che operano nei cantieri temporanei o mobili.",
    icon: "HardHat",
  },
  {
    slug: "piano-di-emergenza",
    code: "EMERG.",
    title: "Piano di Emergenza ed Evacuazione",
    description:
      "Procedure complete da adottare in caso di emergenza, evacuazione o situazioni di pericolo.",
    icon: "AlertTriangle",
  },
  {
    slug: "valutazioni-specifiche",
    code: "RISCHI",
    title: "Valutazioni Rischio Specifiche",
    description:
      "Valutazioni tecniche dedicate a particolari fattori di rischio aziendali.",
    icon: "Activity",
    subItems: [
      "Microclima",
      "Illuminamento",
      "Rumore",
      "Vibrazioni",
      "Movimentazione manuale dei carichi",
    ],
  },
  {
    slug: "legionella",
    code: "LEGION.",
    title: "Valutazione e Documento Rischio Legionella",
    description:
      "Analisi del rischio Legionella negli impianti idrici e documentazione tecnica per gestione e controllo.",
    icon: "Droplets",
  },
  {
    slug: "haccp",
    code: "HACCP",
    title: "Manuale HACCP",
    description:
      "Piano di autocontrollo alimentare per aziende del settore food, conforme alla normativa HACCP.",
    icon: "Utensils",
  },
];

export const servicesFormazione: Service[] = [
  {
    slug: "formazione-lavoratori",
    code: "ART. 37",
    title: "Art. 37 — Formazione Lavoratori",
    description:
      "Formazione generale e specifica dei lavoratori in materia di salute e sicurezza sul lavoro.",
    icon: "GraduationCap",
  },
  {
    slug: "rspp",
    code: "RSPP",
    title: "Corso RSPP / Datore di Lavoro",
    description:
      "Percorsi formativi per Responsabili del Servizio di Prevenzione e Protezione e Datori di Lavoro RSPP.",
    icon: "UserCheck",
  },
  {
    slug: "rls",
    code: "RLS",
    title: "Corso RLS",
    description:
      "Formazione obbligatoria per i Rappresentanti dei Lavoratori per la Sicurezza.",
    icon: "Users",
  },
  {
    slug: "preposto",
    code: "PREP.",
    title: "Corso Preposto",
    description:
      "Formazione dedicata ai preposti per la vigilanza e il coordinamento delle attività in sicurezza.",
    icon: "ClipboardCheck",
  },
  {
    slug: "addetti-specifici",
    code: "ADD. SP.",
    title: "Corso Addetti Specifici",
    description:
      "Formazione per figure incaricate di compiti particolari previsti dalla normativa sulla sicurezza.",
    icon: "Wrench",
  },
  {
    slug: "antincendio",
    code: "ANTINC.",
    title: "Corso Antincendio",
    description:
      "Formazione teorica e pratica per gli addetti alla prevenzione incendi e gestione emergenze.",
    icon: "Flame",
  },
  {
    slug: "primo-soccorso",
    code: "1° SOCC.",
    title: "Corso Primo Soccorso",
    description:
      "Formazione degli addetti al primo soccorso per la gestione delle emergenze sanitarie in azienda.",
    icon: "HeartPulse",
  },
];

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Check-up gratuito",
    description:
      "Analizziamo la tua situazione e le aree da mettere in regola. Senza impegno.",
    icon: "Search",
    mockupTitle: "check-up",
    duration: "15 min",
  },
  {
    number: "02",
    title: "Analisi e documentazione",
    description:
      "DVR, DUVRI, POS e tutta la documentazione obbligatoria, su misura.",
    icon: "FileText",
    mockupTitle: "documentazione",
    duration: "5-10 giorni",
  },
  {
    number: "03",
    title: "Formazione del personale",
    description:
      "Corsi obbligatori per lavoratori, RSPP, RLS, preposti, antincendio e primo soccorso.",
    icon: "GraduationCap",
    mockupTitle: "formazione",
    duration: "2-4 settimane",
  },
  {
    number: "04",
    title: "Monitoraggio continuo",
    description:
      "Aggiornamenti, scadenze e assistenza dedicata, tutto l'anno. Dormi sereno.",
    icon: "ShieldCheck",
    mockupTitle: "monitoraggio",
    duration: "tutto l'anno",
  },
];

export const faqs: Faq[] = [
  {
    id: "tempi",
    question: "Quanto tempo serve per mettere in regola un'azienda?",
    answer:
      "Dipende da dimensione e complessità. Per una PMI fino a 20 dipendenti, dal primo contatto alla documentazione completa (DVR, formazione iniziale, RSPP) servono in media 3-4 settimane. Per realtà più strutturate o cantieri (POS, rumore, vibrazioni) serve più tempo: la stima precisa te la diamo dopo il check-up gratuito.",
    highlight: {
      label: "Tempo medio PMI standard",
      value: "3-4 settimane",
    },
  },
  {
    id: "costi",
    question: "Quanto costa il servizio?",
    answer:
      "Nessun listino fisso: ogni azienda ha esigenze diverse (dipendenti, settore, sedi, rischio). Dopo il check-up ricevi un preventivo chiaro, voce per voce (RSPP, DVR, corsi). Di solito lavoriamo con assistenza annuale che include gli adempimenti ricorrenti, ma sono possibili anche incarichi puntuali.",
  },
  {
    id: "formazione-online",
    question: "La formazione si svolge online o in presenza?",
    answer:
      "Entrambe. Formazione generale (4 ore) e aggiornamenti periodici in e-learning, come previsto dall'Accordo Stato-Regioni. I corsi con prova pratica (Antincendio, Primo Soccorso, Preposti) si svolgono in presenza, alla tua sede o nelle nostre aule. Per i clienti in assistenza annuale il calendario formativo lo gestiamo noi.",
    reference: "Accordo Stato-Regioni 21 dicembre 2011",
  },
  {
    id: "ispezione",
    question:
      "Cosa succede se ricevo un'ispezione mentre siete il mio consulente?",
    answer:
      "Ti affianchiamo in ogni fase del controllo. Per i clienti in assistenza annuale l'assistenza durante le ispezioni (Ispettorato del Lavoro, ASL, Vigili del Fuoco) è inclusa: ci confrontiamo con gli ispettori, forniamo la documentazione, gestiamo le contestazioni. Con la documentazione sempre aggiornata, all'ispezione hai già tutto in ordine — è il motivo per cui esistiamo.",
  },
  {
    id: "territorio",
    question: "Operate in tutta Italia?",
    answer:
      "Sì. La parte documentale (DVR, DUVRI, POS, valutazioni specifiche, HACCP) la gestiamo da remoto in tutta Italia. Per formazione in presenza e sopralluoghi raggiungiamo la tua sede — modalità e tempi li confermiamo nel preventivo, in base alla zona.",
  },
  {
    id: "certificazioni",
    question: "Siete autorizzati a erogare formazione obbligatoria?",
    answer:
      "Sì. La nostra formazione è conforme all'Accordo Stato-Regioni del 21 dicembre 2011, che disciplina i corsi sulla sicurezza previsti dall'art. 37 del D.Lgs. 81/2008. I docenti hanno i requisiti del D.I. 6 marzo 2013 e gli attestati sono validi a tutti gli effetti di legge.",
    reference: "art. 37 D.Lgs. 81/2008 · D.I. 6 marzo 2013",
  },
  {
    id: "rischi",
    question: "Cosa rischio davvero se non sono in regola?",
    answer:
      "Molto. Il DVR mancante costa da € 2.740 a € 7.014; la mancata formazione arresto da 2 a 4 mesi o ammenda da € 1.474 a € 6.388. In caso di infortunio il datore di lavoro risponde personalmente, anche penalmente. E l'Ispettorato può sospendere l'attività per gravi irregolarità.",
    reference: "art. 55 D.Lgs. 81/2008",
    highlight: {
      label: "Sanzione massima DVR mancante",
      value: "€ 7.014",
    },
  },
  {
    id: "disdetta",
    question: "Posso disdire l'assistenza annuale se non sono soddisfatto?",
    answer:
      "Sì. Disdetta con preavviso, senza penali. Garantiamo continuità fino a fine periodo e ti consegniamo tutti i file in formato modificabile — sono tuoi, non nostri. Niente vincoli pluriennali: se non siamo all'altezza, devi poter andare via senza ostacoli.",
    highlight: {
      label: "Vincoli pluriennali",
      value: "Mai",
    },
  },
];

export const companyInfo = {
  name: "Aegis Safety Group",
  tagline: "Consulenza sicurezza sul lavoro",
  email: "info@aegissafetygroup.it",
  phone: "+39 000 000 0000",
  vat: "P.IVA 00000000000",
  address: "Roma, Italia",
};

export type ServiceOutcome = {
  number: string;
  category: string;
  name: string;
  tagline: string;
  icon: string;
  services: string[];
  ctaLabel: string;
};

export const outcomes: ServiceOutcome[] = [
  {
    number: "01",
    category: "Documentazione",
    name: "Sii conforme",
    tagline:
      "Tutta la documentazione obbligatoria, pronta e sempre aggiornata.",
    icon: "FileCheck",
    services: [
      "DVR — Documento Valutazione Rischi",
      "DUVRI — Rischi da Interferenze",
      "POS — Piano Operativo Sicurezza",
      "Piano di Emergenza",
      "Valutazioni Specifiche (rumore, vibrazioni, microclima, MMC)",
      "Valutazione Rischio Legionella",
      "Manuale HACCP",
    ],
    ctaLabel: "Voglio essere in regola",
  },
  {
    number: "02",
    category: "Formazione",
    name: "Forma i tuoi",
    tagline:
      "Il tuo team formato, certificato e sempre in regola con la normativa.",
    icon: "GraduationCap",
    services: [
      "Art. 37 — Formazione generale e specifica lavoratori",
      "Corso RSPP / Datore di Lavoro RSPP",
      "Corso RLS — Rappresentanti dei Lavoratori",
      "Corso Preposto",
      "Corso Addetti Specifici",
      "Corso Antincendio",
      "Corso Primo Soccorso",
    ],
    ctaLabel: "Voglio formare il team",
  },
  {
    number: "03",
    category: "Assistenza annuale",
    name: "Dormi sereno",
    tagline: "Un consulente dedicato che pensa a tutto, tutto l'anno.",
    icon: "ShieldCheck",
    services: [
      "Incarico RSPP esterno",
      "Assistenza continuativa e supporto telefonico h24",
      "Aggiornamenti normativi automatici",
      "Gestione scadenze documentali e formative",
      "Assistenza in caso di ispezioni",
      "Audit interni periodici",
    ],
    ctaLabel: "Voglio assistenza dedicata",
  },
  {
    number: "04",
    category: "Consulenza strategica",
    name: "Cresci protetto",
    tagline: "Quando l'azienda cresce, la sicurezza cresce con lei.",
    icon: "TrendingUp",
    services: [
      "Audit preventivi per nuove sedi",
      "Consulenza per espansioni e nuove attività",
      "Gestione cambi normativi nel tempo",
      "Supporto per certificazioni di sistema",
      "Due diligence per acquisizioni",
      "Formazione manageriale sulla sicurezza",
    ],
    ctaLabel: "Voglio crescere protetto",
  },
];
