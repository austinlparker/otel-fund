export interface Vote {
  id: number;
  userEmail: string;
  bountyId: number;
  createdAt: Date;
}

export interface Bounty {
  id?: number;
  title: string;
  description: string;
  repoLink: string;
  notes: string;
  createdAt?: Date;
  updatedAt?: Date;
  createdBy: string;
  status: BountyStatus; // Now using the enum
  votes?: Vote[];
  tags: string[];
}

export type GetBountiesResult = Bounty[] | null;

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
