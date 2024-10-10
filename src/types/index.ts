import {
  Bounty as PrismaBounty,
  User as PrismaUser,
  Tag as PrismaTag,
  Vote as PrismaVote,
  Comment as PrismaComment,
} from "@prisma/client";

export type SortOption = "new" | "hot" | "popular" | "all";

export type Vote = PrismaVote;
export type User = PrismaUser;
export type Comment = PrismaComment;

export type CommentWithReplies = Comment & {
  author: User;
  replies: CommentWithReplies[];
};

export type Bounty = PrismaBounty & {
  tags: PrismaTag[];
  votes: PrismaVote[];
  comments: CommentWithReplies[];
  user: User | null;
};

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
