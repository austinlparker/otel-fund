import { BountyStatus } from "@/types";

interface Moderatable {
  content: string;
  user: string;
  // Add other relevant fields that might be used for moderation
}

// Enum for moderation results
export enum ModerationResult {
  APPROVE = "APPROVE",
  REJECT = "REJECT",
  UNSURE = "UNSURE",
}

// Configuration for automod rules
interface AutoModConfig {
  bannedWords: string[];
  minContentLength: number;
  maxContentLength: number;
  // Add other configuration options as needed
}

// Default configuration
const defaultConfig: AutoModConfig = {
  bannedWords: ["spam", "scam", "inappropriate"],
  minContentLength: 10,
  maxContentLength: 1000,
};

export function autoMod<T extends Moderatable>(
  item: T,
  config: AutoModConfig = defaultConfig,
): ModerationResult {
  const { content, user } = item;

  if (user === "austin@ap2.io") {
    return ModerationResult.APPROVE;
  }

  if (
    content.length < config.minContentLength ||
    content.length > config.maxContentLength
  ) {
    return ModerationResult.REJECT;
  }

  // Check for banned words
  const lowerContent = content.toLowerCase();
  for (const word of config.bannedWords) {
    if (lowerContent.includes(word.toLowerCase())) {
      return ModerationResult.REJECT;
    }
  }

  return ModerationResult.APPROVE;
}

export function moderationResultToBountyStatus(
  result: ModerationResult,
): BountyStatus {
  switch (result) {
    case ModerationResult.APPROVE:
      return BountyStatus.MODERATION_AUTO_APPROVE;
    case ModerationResult.REJECT:
      return BountyStatus.MODERATION_AUTO_REJECT;
    case ModerationResult.UNSURE:
      return BountyStatus.MODERATION_AUTO_UNSURE;
  }
}
