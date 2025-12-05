// Si usas Sentry u otra herramienta, la importas aquí
// import * as Sentry from "@sentry/react";

export const Logger = {
  warn: (message: string, metadata?: Record<string, unknown>): void => {
    if (import.meta.env.MODE === 'development') {
      console.warn(`⚠️ [Data Integrity]: ${message}`, metadata);
    }

    // 2. En Producción: Enviar a Sentry / Datadog / LogRocket
    if (import.meta.env.PROD) {
      // Sentry.captureMessage(message, { level: "warning", extra: metadata });
      // console.warn("Sent to Sentry:", message); // Fallback
    }
  },

  error: (message: string, error?: unknown): void => {
    console.error(message, error);
    // Sentry.captureException(error);
  },
};
