import { Request, Response } from "express";
import { Logger } from "pino";
import { fetchICalendar } from "@/lib/calendar/calendarParser";

export async function handleGetCalendar(
  request: Request,
  response: Response,
  logger: Logger,
) {
  const calendarUrl = request.query.url;

  if (typeof calendarUrl !== "string") {
    logger.warn({ calendarUrl }, "Missing or invalid calendar URL");
    response.status(400).json({ error: "Missing or invalid calendar URL" });
    return;
  }

  try {
    const calendar = await fetchICalendar(calendarUrl);
    response.json(calendar);
  } catch (error) {
    logger.error(
      { error, calendarUrl },
      "Failed to fetch or parse calendar from URL",
    );
    response
      .status(500)
      .json({ error: "Failed to fetch or parse calendar from URL" });
  }
}
