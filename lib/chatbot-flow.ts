export type ChatAction =
  | { type: "goto"; nodeId: string }
  | { type: "link"; href: string; label: string }
  | { type: "restart" };

export type ChatOption = {
  label: string; // testo del bottone cliccabile (dall'utente)
  action: ChatAction;
};

export type ChatNode = {
  id: string;
  messages: string[]; // uno o più messaggi del bot (appaiono in sequenza)
  options: ChatOption[];
  showContactCta?: boolean; // mostra CTA prenota/chiama sotto le opzioni
};

export const chatbotPersona = {
  name: "Giulia",
  role: "Aegis Safety",
  initial: "G",
};

export const chatFlow: Record<string, ChatNode> = {
  start: {
    id: "start",
    messages: [
      "Ciao! Sono Giulia di Aegis Safety 👋",
      "Posso aiutarti a capire come mettere in regola la tua azienda. Su cosa hai dubbi?",
    ],
    options: [
      { label: "Quanto costa?", action: { type: "goto", nodeId: "costi" } },
      { label: "Quanto tempo serve?", action: { type: "goto", nodeId: "tempi" } },
      {
        label: "Cosa rischio se non sono in regola?",
        action: { type: "goto", nodeId: "rischi" },
      },
      {
        label: "Voglio parlare con qualcuno",
        action: { type: "goto", nodeId: "contatto" },
      },
    ],
  },

  costi: {
    id: "costi",
    messages: [
      "Ottima domanda. Non abbiamo un listino fisso: ogni azienda è diversa per dimensione, settore e attività.",
      "Dopo un check-up gratuito di 15 minuti ti inviamo un preventivo chiaro e dettagliato, voce per voce. La maggior parte dei clienti sceglie la formula di assistenza annuale.",
    ],
    options: [
      {
        label: "Come funziona l'assistenza annuale?",
        action: { type: "goto", nodeId: "assistenza" },
      },
      { label: "Quanto tempo serve?", action: { type: "goto", nodeId: "tempi" } },
      { label: "Ho un'altra domanda", action: { type: "goto", nodeId: "start" } },
    ],
    showContactCta: true,
  },

  tempi: {
    id: "tempi",
    messages: [
      "Per una PMI fino a 20 dipendenti, dal primo contatto alla documentazione completa servono in media 3-4 settimane.",
      "Per cantieri o realtà più strutturate i tempi variano, ma dopo il check-up ti diamo sempre una stima precisa.",
    ],
    options: [
      { label: "Quanto costa?", action: { type: "goto", nodeId: "costi" } },
      {
        label: "Fate formazione online?",
        action: { type: "goto", nodeId: "formazione" },
      },
      { label: "Ho un'altra domanda", action: { type: "goto", nodeId: "start" } },
    ],
    showContactCta: true,
  },

  rischi: {
    id: "rischi",
    messages: [
      "Le sanzioni sono concrete: la mancata redazione del DVR costa da € 2.740 a € 7.014, e la formazione mancante può comportare ammende fino a € 6.388.",
      "In caso di infortunio, il datore di lavoro risponde personalmente, anche penalmente. Meglio prevenire — ed è esattamente quello che facciamo.",
    ],
    options: [
      {
        label: "Come mi mettete in regola?",
        action: { type: "goto", nodeId: "tempi" },
      },
      { label: "Quanto costa?", action: { type: "goto", nodeId: "costi" } },
      { label: "Ho un'altra domanda", action: { type: "goto", nodeId: "start" } },
    ],
    showContactCta: true,
  },

  assistenza: {
    id: "assistenza",
    messages: [
      "Con l'assistenza annuale hai un consulente dedicato tutto l'anno: aggiornamenti normativi, gestione scadenze, supporto in caso di ispezioni e formazione del personale.",
      "In pratica, pensiamo noi a tutto — tu pensi alla tua attività.",
    ],
    options: [
      { label: "Quanto costa?", action: { type: "goto", nodeId: "costi" } },
      { label: "Ho un'altra domanda", action: { type: "goto", nodeId: "start" } },
    ],
    showContactCta: true,
  },

  formazione: {
    id: "formazione",
    messages: [
      "Sì! La formazione generale e gli aggiornamenti si possono fare in e-learning, come previsto dall'Accordo Stato-Regioni.",
      "I corsi con prova pratica (Antincendio, Primo Soccorso) si svolgono in presenza, nella tua sede o nelle nostre aule.",
    ],
    options: [
      { label: "Quanto tempo serve?", action: { type: "goto", nodeId: "tempi" } },
      { label: "Ho un'altra domanda", action: { type: "goto", nodeId: "start" } },
    ],
    showContactCta: true,
  },

  contatto: {
    id: "contatto",
    messages: [
      "Volentieri! Il modo più veloce è prenotare un check-up gratuito: ti ricontattiamo entro 24 ore.",
      "Oppure puoi chiamarci direttamente — siamo disponibili Lun-Ven, 09:00-18:00.",
    ],
    options: [{ label: "Ricomincia", action: { type: "restart" } }],
    showContactCta: true,
  },
};
