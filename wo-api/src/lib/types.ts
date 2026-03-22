export interface CalendarEvent {
  id: string;
  summary: string;
  description: string;
  location: string;
  startTime: Date;
  endTime: Date;
}

export interface Calendar {
  name: string;
  timezone?: string;
  events: CalendarEvent[];
}
