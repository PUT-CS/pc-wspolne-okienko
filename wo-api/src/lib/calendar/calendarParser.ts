import ICAL from "ical.js";
import { Calendar, CalendarEvent } from "@/lib/types";
import { componentAccessWrapper } from "@/lib/calendar/componentAccessWrapper";

function parseICalendar(icsContent: string): Calendar {
  try {
    if (!icsContent || typeof icsContent !== "string") {
      throw new Error("Invalid iCalendar content: expected non-empty string");
    }

    const jcalData = ICAL.parse(icsContent);
    const component = new ICAL.Component(jcalData);
    const cal = componentAccessWrapper(component);

    const events = component.getAllSubcomponents("vevent").map((vevent) => {
      const event = componentAccessWrapper(vevent);

      const id = event.getString("uid");
      const summary = event.getString("summary");
      const description = event.getString("description");
      const location = event.getString("location");
      const startTime = event.getDate("dtstart");
      const endTime = event.getDate("dtend");

      if (!id) throw new Error("Event missing required uid");
      if (!summary) throw new Error("Event missing required summary");
      if (!description) throw new Error("Event missing required description");
      if (!location) throw new Error("Event missing required location");
      if (!startTime) throw new Error("Event missing required dtstart");
      if (!endTime) throw new Error("Event missing required dtend");

      return {
        id,
        summary,
        description,
        location,
        startTime,
        endTime,
      } as CalendarEvent;
    });

    const name = cal.getString("x-wr-calname");
    if (!name) throw new Error("Calendar missing x-wr-calname");

    return {
      name,
      timezone: cal.getString("x-wr-timezone"),
      events,
    };
  } catch (error) {
    throw new Error(
      `Failed to parse iCalendar: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
}

export async function fetchICalendar(url: string): Promise<Calendar> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    const content = await response.text();
    return parseICalendar(content);
  } catch (error) {
    throw new Error(
      `Failed to parse iCalendar from URL: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
}
