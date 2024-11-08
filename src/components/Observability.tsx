"use client"; // browser only: https://react.dev/reference/react/use-client
import { HoneycombWebSDK } from "@honeycombio/opentelemetry-web";
import { getWebAutoInstrumentations } from "@opentelemetry/auto-instrumentations-web";
import { env } from "next-runtime-env";

const configDefaults = {
  ignoreNetworkEvents: true,
  propagateTraceHeaderCorsUrls: [/.+/g],
};
const api_key = env("NEXT_PUBLIC_HONEYCOMB_API_KEY");
const isProduction = process.env.NODE_ENV === "production";
// Track if SDK has been initialized
let sdkInitialized = false;

export default function Observability() {
  if (typeof window === "undefined") return null;

  if (!sdkInitialized) {
    try {
      const sdk = new HoneycombWebSDK({
        debug: !isProduction,
        apiKey: api_key,
        serviceName: "sygzy-web",
        instrumentations: [
          getWebAutoInstrumentations({
            "@opentelemetry/instrumentation-xml-http-request": configDefaults,
            "@opentelemetry/instrumentation-fetch": configDefaults,
            "@opentelemetry/instrumentation-document-load": configDefaults,
          }),
        ],
      });

      if (!window.__HONEYCOMB_SDK__) {
        window.__HONEYCOMB_SDK__ = sdk;
        sdk.start();
        sdkInitialized = true;
      }
    } catch (e) {
      console.warn("Failed to initialize OpenTelemetry SDK:", e);
    }
  }

  return null;
}
