export interface TimeSlot {
  day: string;
  startTime: string;
  endTime: string;
}

export const MOCK_SCHEDULES: TimeSlot[][] = [
  [
    { day: 'Monday', startTime: '09:00', endTime: '10:30' },
    { day: 'Wednesday', startTime: '14:00', endTime: '15:45' },
  ],
  [
    { day: 'Tuesday', startTime: '10:15', endTime: '11:30' },
    { day: 'Friday', startTime: '13:00', endTime: '14:20' },
  ],
  [
    { day: 'Monday', startTime: '14:30', endTime: '16:00' },
    { day: 'Thursday', startTime: '09:45', endTime: '11:15' },
  ],
  [
    { day: 'Wednesday', startTime: '11:00', endTime: '12:30' },
    { day: 'Friday', startTime: '15:30', endTime: '17:00' },
  ],
  [
    { day: 'Tuesday', startTime: '13:15', endTime: '14:45' },
    { day: 'Thursday', startTime: '15:00', endTime: '16:30' },
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
