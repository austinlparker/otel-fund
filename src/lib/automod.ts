import { BountyStatus } from "@/types";
import { Filter } from "bad-words";
import { trace, SpanStatusCode } from "@opentelemetry/api";
import OpenAI from "openai";

export enum ModerationResult {
  APPROVE = "APPROVE",
  REJECT = "REJECT",
  UNSURE = "UNSURE",
}

export enum ContentType {
  BOUNTY = "BOUNTY",
  COMMENT = "COMMENT",
  USER_PROFILE = "USER_PROFILE",
}

interface Moderatable {
  content: string;
  user: string;
  type: ContentType;
}

interface AutoModConfig {
  minContentLength: Record<ContentType, number>;
  maxContentLength: Record<ContentType, number>;
  toxicityThreshold: number;
}

const defaultConfig: AutoModConfig = {
  minContentLength: {
    [ContentType.BOUNTY]: 20,
    [ContentType.COMMENT]: 5,
    [ContentType.USER_PROFILE]: 10,
  },
  maxContentLength: {
    [ContentType.BOUNTY]: 2000,
    [ContentType.COMMENT]: 500,
    [ContentType.USER_PROFILE]: 1000,
  },
  toxicityThreshold: 0.7,
};

const filter = new Filter();
let openaiClient: OpenAI | null = null;

function getOpenAIClient(): OpenAI | null {
  if (typeof process === "undefined" || !process.env.OPENAI_API_KEY) {
    console.warn("OpenAI API key is not available");
    return null;
  }

  if (!openaiClient) {
    openaiClient = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  return openaiClient;
}

async function analyzeWithOpenAI(
  text: string,
): Promise<"positive" | "negative" | "neutral"> {
  const client = getOpenAIClient();
  if (!client) {
    console.warn(
      "OpenAI client is not available. Defaulting to neutral sentiment.",
    );
    return "neutral";
  }

  try {
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a sentiment analysis tool. Respond with only 'positive', 'negative', or 'neutral'.",
        },
        {
          role: "user",
          content: `Analyze the sentiment of this text: "${text}"`,
        },
      ],
      max_tokens: 1,
    });

    const sentiment = response.choices[0].message.content?.toLowerCase().trim();
    if (
      sentiment === "positive" ||
      sentiment === "negative" ||
      sentiment === "neutral"
    ) {
      return sentiment;
    }
    return "neutral";
  } catch (error) {
    console.error("Error analyzing sentiment with OpenAI:", error);
    return "neutral";
  }
}

export async function autoMod<T extends Moderatable>(
  item: T,
  config: AutoModConfig = defaultConfig,
): Promise<ModerationResult> {
  const tracer = trace.getTracer("automod-tracer");

  return tracer.startActiveSpan("autoMod", async (span) => {
    try {
      const { content, type } = item;

      span.setAttribute("content.type", type);
      span.setAttribute("content.length", content.length);

      // Check content length
      const lengthResult = tracer.startActiveSpan(
        "checkContentLength",
        (lengthSpan) => {
          if (
            content.length < config.minContentLength[type] ||
            content.length > config.maxContentLength[type]
          ) {
            lengthSpan.setStatus({ code: SpanStatusCode.ERROR });
            lengthSpan.end();
            return ModerationResult.REJECT;
          }
          lengthSpan.end();
          return null;
        },
      );

      if (lengthResult) return lengthResult;

      // Check for profanity
      const profanityResult = tracer.startActiveSpan(
        "checkProfanity",
        (profanitySpan) => {
          if (filter.isProfane(content)) {
            profanitySpan.setStatus({ code: SpanStatusCode.ERROR });
            profanitySpan.end();
            return ModerationResult.REJECT;
          }
          profanitySpan.end();
          return null;
        },
      );

      if (profanityResult) return profanityResult;

      return tracer.startActiveSpan(
        "analyzeSentiment",
        async (sentimentSpan) => {
          const sentiment = await analyzeWithOpenAI(content);
          sentimentSpan.setAttribute("sentiment.classification", sentiment);
          if (sentiment === "negative") {
            sentimentSpan.end();
            return ModerationResult.UNSURE;
          }
          sentimentSpan.end();

          return ModerationResult.APPROVE;
        },
      );
    } finally {
      span.end();
    }
  });
}

export function moderationResultToBountyStatus(
  result: ModerationResult,
): BountyStatus {
  switch (result) {
    case ModerationResult.APPROVE:
      return BountyStatus.ACTIVE;
    case ModerationResult.REJECT:
      return BountyStatus.MODERATION_AUTO_REJECT;
    case ModerationResult.UNSURE:
      return BountyStatus.MODERATION_AUTO_UNSURE;
    default:
      // This should never happen, but TypeScript likes exhaustive checks
      throw new Error(`Unknown ModerationResult: ${result}`);
  }
}
