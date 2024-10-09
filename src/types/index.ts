import {
  Bounty as PrismaBounty,
  User,
  Tag,
  Vote,
  Comment,
} from "@prisma/client";

export type SortOption = "new" | "hot" | "popular" | "all";

export interface Vote {
  id: number;
  userEmail: string;
  bountyId: number;
  createdAt: Date;
}

export type CommentWithReplies = Comment & {
  author: User;
  replies: CommentWithReplies[];
};

export type Bounty = PrismaBounty & {
  tags: Tag[];
  votes: Vote[];
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

export interface Tag {
  id: number;
  name: string;
}

export enum BountyStatus {
  NEW = "NEW",
  PENDING_MODERATION = "PENDING_MODERATION",
  MODERATION_AUTO_REJECT = "MODERATION_AUTO_REJECT",
  MODERATION_AUTO_UNSURE = "MODERATION_AUTO_UNSURE",
  MODERATION_AUTO_APPROVE = "MODERATION_AUTO_APPROVE",
  ACTIVE = "ACTIVE",
  COMPLETED = "COMPLETED",
}
