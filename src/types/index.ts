import {
  Bounty as PrismaBounty,
  User as PrismaUser,
  Tag as PrismaTag,
  Vote as PrismaVote,
  Comment as PrismaComment,
} from "@prisma/client";

export type SortOption = "new" | "hot" | "popular" | "all";

export type Vote = PrismaVote;
export interface User extends PrismaUser {}
export interface Bounty extends PrismaBounty {
  user: User | null;
}
export interface Comment extends PrismaComment {
  author: User;
}

export type CommentWithReplies = Comment & {
  author: User;
  replies: CommentWithReplies[];
};

export interface Bounty extends PrismaBounty {
  tags: Tag[];
  votes: (Vote & { user: User | null })[];
  user: User | null;
  comments: CommentWithReplies[];
}

export interface GetBountiesResult {
  bounties: Bounty[];
  totalCount: number;
}

export interface BountyListProps {
  initialBounties: Bounty[];
}

export type Tag = PrismaTag;

export enum BountyStatus {
  NEW = "NEW",
  PENDING_MODERATION = "PENDING_MODERATION",
  MODERATION_AUTO_REJECT = "MODERATION_AUTO_REJECT",
  MODERATION_AUTO_UNSURE = "MODERATION_AUTO_UNSURE",
  MODERATION_AUTO_APPROVE = "MODERATION_AUTO_APPROVE",
  ACTIVE = "ACTIVE",
  COMPLETED = "COMPLETED",
}

export type FlaggedContentType = "BOUNTY" | "COMMENT" | "USER_PROFILE";

export interface BaseFlaggedItem {
  id: number;
  type: FlaggedContentType;
  content: string;
  user: User | null;
  createdAt: Date;
}

export interface FlaggedBounty extends BaseFlaggedItem {
  type: "BOUNTY";
  title: string;
  description: string;
}

export interface FlaggedComment extends BaseFlaggedItem {
  type: "COMMENT";
}

export interface FlaggedUserProfile extends BaseFlaggedItem {
  type: "USER_PROFILE";
}

export type FlaggedItem = FlaggedBounty | FlaggedComment | FlaggedUserProfile;
