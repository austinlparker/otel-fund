import {
  Bounty as PrismaBounty,
  User,
  Tag as PrismaTag,
  Vote as PrismaVote,
  Comment,
} from "@prisma/client";

export type SortOption = "new" | "hot" | "popular" | "all";

export type Vote = PrismaVote;

export type CommentWithReplies = Comment & {
  author: {
    id: string;
    name: string | null;
    email: string;
    image: string | null;
    emailVerified: Date | null;
    isAdmin?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
  };
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
