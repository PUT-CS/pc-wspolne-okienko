import { Logger, pino, transport } from "pino";
import { Request } from "express";

function isProd(): boolean {
  return process.env.NODE_ENV === "production";
}

const TIME_FORMAT = "yyyy-mm-dd HH:MM:ss.l";

export function getLogger() {
  if (isProd()) {
    return pino(
      {},
      transport({
        targets: [
          {
            level: "info",
            target: "pino/file",
            options: {
              destination: "logs/app.log",
              mkdir: true,
            },
          },
          {
            level: "info",
            target: "pino-pretty",
            options: {
              colorize: false,
              translateTime: TIME_FORMAT,
              singleLine: true,
            },
          },
        ],
      }),
    );
  }

  return pino(
    transport({
      target: "pino-pretty",
      options: {
        colorize: true,
        translateTime: TIME_FORMAT,
      },
    }),
  );
}

export function logRequest(request: Request, logger: Logger) {
  logger.info({
    method: request.method,
    url: request.url,
    headers: request.headers,
  });
}
