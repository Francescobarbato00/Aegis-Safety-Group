export type Expert = {
  id: string;
  name: string;
  role: string;
  specialization: string;
  bio: string;
  initials: string;
  experience: string; // es. "12 anni"
};

export const experts: Expert[] = [
  {
    id: "marco-bianchi",
    name: "Marco Bianchi",
    role: "Responsabile Documentazione",
    specialization: "DVR, DUVRI, valutazioni rischi",
    bio: "Ingegnere della sicurezza, segue la redazione documentale per aziende di ogni settore. Esperto in valutazioni rischi specifiche.",
    initials: "MB",
    experience: "14 anni",
  },
  {
    id: "giulia-ferrari",
    name: "Giulia Ferrari",
    role: "Responsabile Formazione",
    specialization: "Corsi RSPP, RLS, Art. 37",
    bio: "Formatrice qualificata, coordina i percorsi formativi per lavoratori e figure della sicurezza in presenza e online.",
    initials: "GF",
    experience: "11 anni",
  },
  {
    id: "luca-conti",
    name: "Luca Conti",
    role: "Esperto Antincendio & Emergenze",
    specialization: "Piani emergenza, antincendio, primo soccorso",
    bio: "Tecnico antincendio, progetta piani di emergenza e gestisce la formazione pratica per squadre di emergenza.",
    initials: "LC",
    experience: "16 anni",
  },
  {
    id: "sara-greco",
    name: "Sara Greco",
    role: "Consulente Strategico",
    specialization: "Assistenza annuale, audit, espansioni",
    bio: "Coordina l'assistenza continuativa e supporta le aziende nei momenti di crescita, audit e adeguamenti normativi.",
    initials: "SG",
    experience: "13 anni",
  },
];

// ============================================
// FESTIVITÀ ITALIANE
// ============================================

// Calcolo della domenica di Pasqua (algoritmo di Gauss/Meeus) per un dato anno
function getEaster(year: number): Date {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31); // 3=marzo, 4=aprile
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(year, month - 1, day);
}

// Helper per formattare una data come "YYYY-MM-DD" (ora locale)
function fmtDate(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

// Restituisce un Set di stringhe "YYYY-MM-DD" delle festività italiane per un anno
function getItalianHolidays(year: number): Set<string> {
  const holidays = new Set<string>();

  // Festività nazionali FISSE (mese 1-based, giorno)
  const fixed: [number, number][] = [
    [1, 1], // Capodanno
    [1, 6], // Epifania
    [4, 25], // Liberazione
    [5, 1], // Festa del Lavoro
    [6, 2], // Festa della Repubblica
    [8, 15], // Ferragosto
    [11, 1], // Ognissanti
    [12, 8], // Immacolata
    [12, 25], // Natale
    [12, 26], // Santo Stefano
  ];
  fixed.forEach(([m, d]) => {
    holidays.add(fmtDate(new Date(year, m - 1, d)));
  });

  // Festività MOBILI: Pasqua e Pasquetta (Lunedì dell'Angelo)
  const easter = getEaster(year);
  holidays.add(fmtDate(easter)); // Pasqua (di solito domenica, ma la includiamo)
  const easterMonday = new Date(easter);
  easterMonday.setDate(easter.getDate() + 1);
  holidays.add(fmtDate(easterMonday)); // Pasquetta

  // ⚠️ FESTE PATRONALI LOCALI: se l'azienda ha sede in una città specifica,
  // aggiungi qui la festa del santo patrono. Esempi:
  // holidays.add(`${year}-06-29`); // San Pietro e Paolo (Roma)
  // holidays.add(`${year}-12-07`); // Sant'Ambrogio (Milano)

  return holidays;
}

// Verifica se una data è festiva
function isHoliday(date: Date): boolean {
  const holidays = getItalianHolidays(date.getFullYear());
  return holidays.has(fmtDate(date));
}

// ============================================
// GENERAZIONE GIORNI + SLOT
// ============================================

export type TimeSlot = {
  time: string;
  available: boolean;
};

export type DaySlots = {
  date: Date;
  dayLabel: string; // "Lun"
  dayNumber: string; // "23"
  monthLabel: string; // "giu"
  slots: TimeSlot[];
};

export function generateAvailableDays(count: number = 7): DaySlots[] {
  const days: DaySlots[] = [];
  const baseSlots = [
    "09:00",
    "10:00",
    "11:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
  ];
  const dayNames = ["Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"];
  const monthNames = [
    "gen",
    "feb",
    "mar",
    "apr",
    "mag",
    "giu",
    "lug",
    "ago",
    "set",
    "ott",
    "nov",
    "dic",
  ];

  const now = new Date();
  const currentHour = now.getHours();

  // CUTOFF ORARIO: se è già pomeriggio inoltrato (dopo le 16),
  // il primo giorno disponibile diventa dopodomani invece di domani
  // (diamo all'azienda il tempo di organizzarsi).
  const startOffset = currentHour >= 16 ? 2 : 1;

  const cursor = new Date(now);
  cursor.setDate(cursor.getDate() + startOffset);
  cursor.setHours(0, 0, 0, 0);

  // Guard: massimo 60 iterazioni per evitare loop infiniti (copre weekend + festività)
  let safety = 0;
  while (days.length < count && safety < 60) {
    safety++;
    const dow = cursor.getDay();
    const isWeekday = dow >= 1 && dow <= 5;

    if (isWeekday && !isHoliday(cursor)) {
      // Pattern deterministico di slot occupati (varia per giorno e mese)
      const seed = cursor.getDate() + cursor.getMonth();
      const slots: TimeSlot[] = baseSlots.map((time, i) => ({
        time,
        available: (seed + i) % 3 !== 0,
      }));
      days.push({
        date: new Date(cursor),
        dayLabel: dayNames[dow],
        dayNumber: String(cursor.getDate()),
        monthLabel: monthNames[cursor.getMonth()],
        slots,
      });
    }
    cursor.setDate(cursor.getDate() + 1);
  }

  return days;
}
