import {
  HoneycombWebSDK,
  WebVitalsInstrumentation,
} from "@honeycombio/opentelemetry-web";
import { getWebAutoInstrumentations } from "@opentelemetry/auto-instrumentations-web";

const sdk = new HoneycombWebSDK({
  apiKey: process.env.HONEYCOMB_API_KEY,
  serviceName: "syzgy",
  instrumentations: [
    getWebAutoInstrumentations(),
    new WebVitalsInstrumentation(),
  ],
});
sdk.start();
