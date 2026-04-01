import express from "express";
import { getLogger, logRequest } from "@/logger";
import { handleGetCalendar } from "@/handlers/getCalendar";

const logger = getLogger();

function main() {
  const app = express();

  app.use((request, response, next) => {
    logRequest(request, logger);
    next();
  });

  app.get("/calendar", (request, response) =>
    handleGetCalendar(request, response, logger),
  );

  app.listen(3000, (error) => {
    if (error) {
      logger.error({ error }, "Failed to start server");
      return;
    }
    logger.info("Server is running on port 3000");
  });
}

main();
