import { pino } from "pino";

function isProd(): boolean {
  return process.env.NODE_ENVIRONMENT === "production";
}

export function getLogger() {
  return pino({
    transport: {
      target: "pino-pretty",
      options: {
        colorize: true,
      },
    },
  });
}
