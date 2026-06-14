export interface TimeSlot {
  day: string;
  startTime: string;
  endTime: string;
  activity: string;
}

export const MOCK_SCHEDULES: TimeSlot[][] = [
  [
    { day: 'Monday', startTime: '09:00', endTime: '10:30', activity: 'Usługi sieciowe' },
    { day: 'Monday', startTime: '11:00', endTime: '12:15', activity: 'Sieci komputerowe' },
    { day: 'Monday', startTime: '14:30', endTime: '16:00', activity: 'Programowanie gier' },
    { day: 'Monday', startTime: '15:45', endTime: '17:00', activity: 'Laboratorium gier' },
    { day: 'Tuesday', startTime: '10:00', endTime: '11:00', activity: 'Technologie internetowe' },
    { day: 'Wednesday', startTime: '09:30', endTime: '10:30', activity: 'E-commerce' },
    { day: 'Wednesday', startTime: '14:00', endTime: '15:45', activity: 'Projektowanie aplikacji' },
    { day: 'Thursday', startTime: '10:00', endTime: '11:00', activity: 'Bazy danych' },
    { day: 'Friday', startTime: '10:00', endTime: '11:30', activity: 'Web development' },
    { day: 'Friday', startTime: '14:00', endTime: '15:30', activity: 'Bezpieczeństwo IT' },
  ],
  [
    { day: 'Monday', startTime: '08:30', endTime: '09:30', activity: 'Algorytmy i struktury' },
    { day: 'Tuesday', startTime: '10:15', endTime: '11:30', activity: 'Projektowanie gier' },
    { day: 'Tuesday', startTime: '14:00', endTime: '15:30', activity: 'Grafika komputerowa' },
    { day: 'Wednesday', startTime: '09:00', endTime: '10:00', activity: 'Usługi sieciowe' },
    { day: 'Wednesday', startTime: '13:00', endTime: '14:30', activity: 'Architektura systemów' },
    { day: 'Thursday', startTime: '11:00', endTime: '12:45', activity: 'E-commerce' },
    { day: 'Thursday', startTime: '14:00', endTime: '15:00', activity: 'Testowanie oprogramowania' },
    { day: 'Friday', startTime: '13:00', endTime: '14:20', activity: 'Praktyka zawodowa' },
    { day: 'Friday', startTime: '15:30', endTime: '17:00', activity: 'Seminarium' },
    { day: 'Friday', startTime: '11:00', endTime: '12:00', activity: 'Sztuczna inteligencja' },
  ],
  [
    { day: 'Monday', startTime: '09:30', endTime: '10:30', activity: 'Inżynieria oprogramowania' },
    { day: 'Monday', startTime: '13:00', endTime: '14:30', activity: 'Technologie internetowe' },
    { day: 'Tuesday', startTime: '09:00', endTime: '10:15', activity: 'Sprint project' },
    { day: 'Tuesday', startTime: '14:30', endTime: '16:00', activity: 'Programowanie gier' },
    { day: 'Wednesday', startTime: '10:00', endTime: '11:00', activity: 'Konsultacje' },
    { day: 'Wednesday', startTime: '15:00', endTime: '16:00', activity: 'Mentoring' },
    { day: 'Thursday', startTime: '09:45', endTime: '11:15', activity: 'Projektowanie baz danych' },
    { day: 'Thursday', startTime: '13:00', endTime: '14:00', activity: 'Kryptografia' },
    { day: 'Friday', startTime: '09:00', endTime: '10:00', activity: 'Społeczność akademicka' },
    { day: 'Friday', startTime: '14:00', endTime: '15:30', activity: 'Retrospektywa projektu' },
  ],
  [
    { day: 'Monday', startTime: '10:00', endTime: '11:30', activity: 'Bazy danych' },
    { day: 'Monday', startTime: '14:00', endTime: '15:30', activity: 'Administracja systemami' },
    { day: 'Tuesday', startTime: '09:30', endTime: '10:30', activity: 'Analiza wymagań' },
    { day: 'Tuesday', startTime: '13:00', endTime: '14:30', activity: 'UX/UI design' },
    { day: 'Wednesday', startTime: '11:00', endTime: '12:30', activity: 'Usługi sieciowe' },
    { day: 'Wednesday', startTime: '15:30', endTime: '16:30', activity: 'Design patterns' },
    { day: 'Thursday', startTime: '10:00', endTime: '11:00', activity: 'REST API' },
    { day: 'Thursday', startTime: '14:00', endTime: '15:00', activity: 'DevOps' },
    { day: 'Friday', startTime: '10:00', endTime: '11:00', activity: 'Raport postępu' },
    { day: 'Friday', startTime: '15:30', endTime: '17:00', activity: 'Współpraca zespołu' },
  ],
  [
    { day: 'Monday', startTime: '09:15', endTime: '10:15', activity: 'Projektowanie gier' },
    { day: 'Monday', startTime: '15:00', endTime: '16:30', activity: 'Analiza ryzyka' },
    { day: 'Tuesday', startTime: '13:15', endTime: '14:45', activity: 'Konsultacje projektowe' },
    { day: 'Tuesday', startTime: '15:30', endTime: '16:30', activity: 'Dokumentacja techniczna' },
    { day: 'Wednesday', startTime: '09:00', endTime: '10:30', activity: 'Strategia biznesowa' },
    { day: 'Wednesday', startTime: '14:00', endTime: '15:00', activity: 'Zapewnianie jakości' },
    { day: 'Thursday', startTime: '15:00', endTime: '16:30', activity: 'Testowanie gier' },
    { day: 'Thursday', startTime: '10:00', endTime: '11:30', activity: 'Spotkanie z interesariuszami' },
    { day: 'Friday', startTime: '09:30', endTime: '10:30', activity: 'Planowanie release' },
    { day: 'Friday', startTime: '14:00', endTime: '15:30', activity: 'Przegląd zespołu' },
  ],
  [
    { day: 'Monday', startTime: '08:45', endTime: '09:45', activity: 'Briefing poranny' },
    { day: 'Monday', startTime: '11:30', endTime: '12:30', activity: 'Lunch & Learn' },
    { day: 'Tuesday', startTime: '09:30', endTime: '10:45', activity: 'Prezentacja E-commerce' },
    { day: 'Tuesday', startTime: '14:00', endTime: '15:30', activity: 'Sprint review' },
    { day: 'Wednesday', startTime: '10:30', endTime: '11:30', activity: 'Rozmowa z gościem' },
    { day: 'Wednesday', startTime: '14:30', endTime: '15:45', activity: 'Team building' },
    { day: 'Thursday', startTime: '09:00', endTime: '10:30', activity: 'Synchronizacja produktu' },
    { day: 'Thursday', startTime: '13:30', endTime: '14:30', activity: 'Przegląd budżetu' },
    { day: 'Friday', startTime: '10:30', endTime: '11:30', activity: 'Aktualizacja projektu' },
    { day: 'Friday', startTime: '15:00', endTime: '16:30', activity: 'Planowanie sprintu' },
  ],
  [
    { day: 'Monday', startTime: '09:30', endTime: '10:45', activity: 'Cele tygodnia' },
    { day: 'Monday', startTime: '13:30', endTime: '14:30', activity: 'Przegląd roadmap' },
    { day: 'Tuesday', startTime: '10:00', endTime: '11:15', activity: 'Dopracowanie Features' },
    { day: 'Tuesday', startTime: '14:30', endTime: '15:45', activity: 'Synchronizacja zespołu' },
    { day: 'Wednesday', startTime: '09:15', endTime: '10:15', activity: 'Spotkanie interdyscyplinarne' },
    { day: 'Wednesday', startTime: '15:00', endTime: '16:15', activity: 'Dyskusja tech debt' },
    { day: 'Thursday', startTime: '10:30', endTime: '11:45', activity: 'Metryki wydajności' },
    { day: 'Thursday', startTime: '14:00', endTime: '15:00', activity: 'Standardy kodowania' },
    { day: 'Friday', startTime: '09:00', endTime: '10:00', activity: 'Standup tygodniowy' },
    { day: 'Friday', startTime: '14:30', endTime: '16:00', activity: 'Zamknięcie projektu' },
  ],
];

export function getScheduleForUser(userId: string): TimeSlot[] {
  let hash = 0;
  for (let i = 0; i < userId.length; i++) {
    const char = userId.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  const scheduleIndex = Math.abs(hash) % MOCK_SCHEDULES.length;
  return MOCK_SCHEDULES[scheduleIndex];
}

export function timeToMinutes(timeStr: string): number {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return (hours - 8) * 60 + minutes;
}

export function minutesToTime(minutes: number): string {
  const hours = Math.floor(minutes / 60) + 8;
  const mins = minutes % 60;
  return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
}

export function getRowForTime(timeStr: string): number {
  const minutes = timeToMinutes(timeStr);
  return Math.floor(minutes / 5);
}

export function getSpanForTimeSlot(startTime: string, endTime: string): number {
  const startMinutes = timeToMinutes(startTime);
  const endMinutes = timeToMinutes(endTime);
  const durationMinutes = endMinutes - startMinutes;
  return Math.ceil(durationMinutes / 5);
}
