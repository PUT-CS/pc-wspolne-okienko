import express from "express";
import { getLogger } from "@/logger";

const logger = getLogger();

function main() {
  const app = express();

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.listen(3000, (error) => {
    if (error) {
      logger.error({ error }, "Failed to start server");
      return;
    }
    logger.info("Server is running on port 3000");
  });
}

main();
