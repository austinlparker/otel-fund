import { BountyStatus } from "@/types";
import { Filter } from "bad-words";
import natural from "natural";

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
const classifier = new natural.BayesClassifier();

classifier.addDocument("This is a great project!", "positive");
classifier.addDocument("I love this idea", "positive");
classifier.addDocument("Thanks for the suggestion", "positive");
classifier.addDocument("You suck, this is a waste", "negative");
classifier.addDocument("This is useless", "negative");
classifier.addDocument("I hate this", "negative");
classifier.train();

export function autoMod<T extends Moderatable>(
  item: T,
  config: AutoModConfig = defaultConfig,
): ModerationResult {
  const { content, type } = item;

  // Check content length
  if (
    content.length < config.minContentLength[type] ||
    content.length > config.maxContentLength[type]
  ) {
    return ModerationResult.REJECT;
  }

  // Check for profanity
  if (filter.isProfane(content)) {
    return ModerationResult.REJECT;
  }

  // Use the classifier to determine sentiment
  const classification = classifier.classify(content);
  if (classification === "negative") {
    return ModerationResult.UNSURE;
  }

  // If we've made it this far, approve the content
  return ModerationResult.APPROVE;
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
  }
}
