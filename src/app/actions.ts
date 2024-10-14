"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  Bounty,
  SortOption,
  CommentWithReplies,
  GetBountiesResult,
} from "@/types";
import { autoMod, moderationResultToBountyStatus } from "@/lib/automod";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { calculateHotScore } from "@/lib/hotScore";
import { Prisma } from "@prisma/client";

// Bounty-related actions
export async function getBounties(
  skip: number = 0,
  take: number = 10,
  sortOption: SortOption = "all",
  searchQuery?: string,
  tag?: string,
) {
  const where: Prisma.BountyWhereInput = {
    hidden: false,
  };
  let orderBy: Prisma.BountyOrderByWithRelationInput = {};

  if (searchQuery) {
    where.OR = [
      { title: { contains: searchQuery, mode: "insensitive" } },
      { description: { contains: searchQuery, mode: "insensitive" } },
    ];
  }

  if (tag) {
    where.tags = { some: { name: tag } };
  }

  switch (sortOption) {
    case "new":
      orderBy = { createdAt: "desc" };
      break;
    case "popular":
      orderBy = { votes: { _count: "desc" } };
      break;
    case "hot":
      orderBy = { hotScore: "desc" };
      break;
    case "all":
    default:
      orderBy = { id: "asc" };
  }

  const [bounties, totalCount] = await prisma.$transaction([
    prisma.bounty.findMany({
      where,
      skip,
      take,
      orderBy,
      include: {
        votes: true,
        tags: true,
        comments: true,
        user: {
          select: {
            id: true,
            name: true,
            image: true,
            email: true,
          },
        },
      },
    }),
    prisma.bounty.count({ where }),
  ]);

  return { bounties, totalCount };
}

export async function getBountyById(id: number): Promise<Bounty | null> {
  try {
    const bounty = await prisma.bounty.findUnique({
      where: { id, hidden: false },
      include: {
        tags: true,
        votes: {
          include: {
            user: true,
          },
        },
        user: true,
      },
    });

    if (!bounty) return null;

    const comments = await getComments(id);

    return {
      ...bounty,
      comments,
    };
  } catch (error) {
    console.error("Error in getBountyById:", error);
    throw new Error("Failed to fetch bounty");
  }
}

export async function addBounty(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const repoLink = formData.get("repoLink") as string;
  const notes = formData.get("notes") as string;
  const tags = (formData.get("tags") as string)
    .split(",")
    .map((tag) => tag.trim());

  const moderationResult = autoMod({
    content: description,
    user: session.user.email || "",
  });
  const status = moderationResultToBountyStatus(moderationResult);

  await prisma.bounty.create({
    data: {
      title,
      description,
      repoLink,
      notes,
      status,
      userId: session.user.id, // This is the correct way to associate the user
      hotScore: calculateHotScore(0, new Date()),
      tags: {
        connectOrCreate: tags.map((tagName) => ({
          where: { name: tagName },
          create: { name: tagName },
        })),
      },
    },
  });

  revalidatePath("/");
  redirect("/");
}

// Vote-related actions
export async function voteForBounty(bountyId: number) {
  const session = await auth();
  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }

  try {
    const existingVote = await prisma.vote.findUnique({
      where: {
        userEmail_bountyId: {
          userEmail: session.user.email,
          bountyId: bountyId,
        },
      },
    });

    if (existingVote) {
      throw new Error("ALREADY_VOTED");
    }

    await prisma.vote.create({
      data: {
        userEmail: session.user.email,
        bountyId: bountyId,
      },
    });

    const updatedBounty = await prisma.bounty.findUnique({
      where: { id: bountyId },
      include: {
        votes: true,
        tags: true,
      },
    });

    if (updatedBounty) {
      const hotScore = calculateHotScore(
        updatedBounty.votes.length,
        updatedBounty.createdAt,
      );
      await prisma.bounty.update({
        where: { id: bountyId },
        data: { hotScore },
      });
    }

    revalidatePath("/");
    return updatedBounty;
  } catch (error) {
    if (error instanceof Error && error.message === "ALREADY_VOTED") {
      throw error;
    }
    console.error("Vote error:", error);
    throw new Error("VOTE_FAILED");
  }
}

// Comment-related actions
export async function addComment(formData: FormData) {
  const session = await auth();
  if (!session?.user) {
    throw new Error("NOT_LOGGED_IN");
  }
  if (session?.user.disabled) {
    throw new Error("ACCOUNT_DISABLED");
  }

  const content = formData.get("content") as string;
  const bountyId = parseInt(formData.get("bountyId") as string, 10);
  const parentId = formData.get("parentId")
    ? parseInt(formData.get("parentId") as string, 10)
    : undefined;

  if (!content || !bountyId) {
    throw new Error("INTERNAL_ERROR");
  }

  const bounty = await prisma.bounty.findFirst({
    where: { id: bountyId, hidden: false },
  });

  if (!bounty) {
    throw new Error("BOUNTY_NOT_FOUND");
  }

  const comment = await prisma.comment.create({
    data: {
      content,
      authorId: session.user.id,
      bountyId,
      parentId,
    },
  });

  revalidatePath(`/bounty/${bountyId}`);
  return comment;
}

export async function getComments(
  bountyId: number,
): Promise<CommentWithReplies[]> {
  const comments = await prisma.comment.findMany({
    where: { bountyId, hidden: false },
    include: {
      author: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // Create a map of comments by their ID
  const commentMap = new Map(
    comments.map((comment) => [
      comment.id,
      { ...comment, replies: [] } as CommentWithReplies,
    ]),
  );

  // Organize comments into a tree structure
  const rootComments: CommentWithReplies[] = [];
  comments.forEach((comment) => {
    if (comment.parentId === null) {
      rootComments.push(commentMap.get(comment.id) as CommentWithReplies);
    } else {
      const parentComment = commentMap.get(comment.parentId);
      if (parentComment) {
        parentComment.replies.push(
          commentMap.get(comment.id) as CommentWithReplies,
        );
      }
    }
  });

  // Sort replies recursively
  const sortReplies = (
    comments: CommentWithReplies[],
  ): CommentWithReplies[] => {
    return comments.map((comment) => ({
      ...comment,
      replies: sortReplies(comment.replies).sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      ),
    }));
  };

  return sortReplies(rootComments);
}

// Utility functions
export async function updateHotScores() {
  const bounties = await prisma.bounty.findMany({
    include: { votes: true },
  });

  for (const bounty of bounties) {
    const hotScore = calculateHotScore(bounty.votes.length, bounty.createdAt);
    await prisma.bounty.update({
      where: { id: bounty.id },
      data: { hotScore },
    });
  }
}

export async function getBountiesForUser(
  userId: string,
  skip: number = 0,
  take: number = 10,
): Promise<GetBountiesResult> {
  const [bounties, totalCount] = await prisma.$transaction([
    prisma.bounty.findMany({
      where: { userId },
      skip,
      take,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        status: true,
        createdAt: true,
        votes: { select: { id: true } },
      },
    }),
    prisma.bounty.count({ where: { userId } }),
  ]);

  return {
    bounties: bounties as Bounty[],
    totalCount,
  };
}

export async function getCommentsForUser(
  userId: string,
): Promise<CommentWithReplies[]> {
  const comments = await prisma.comment.findMany({
    where: { authorId: userId },
    orderBy: { createdAt: "desc" },
    include: {
      author: true,
      bounty: {
        select: {
          id: true,
          title: true,
        },
      },
    },
  });

  return comments.map((comment) => ({
    ...comment,
    replies: [],
  }));
}

export async function getUserProfile(userId: string) {
  return prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      createdAt: true,
    },
  });
}

export async function getBountiesUserCommentedOn(
  userId: string,
  skip: number = 0,
  take: number = 10,
) {
  const bounties = await prisma.bounty.findMany({
    where: {
      comments: {
        some: {
          authorId: userId,
        },
      },
    },
    select: {
      id: true,
      title: true,
      status: true,
      createdAt: true,
      _count: {
        select: { comments: true },
      },
    },
    orderBy: {
      comments: {
        _count: "desc",
      },
    },
    skip,
    take,
    distinct: ["id"],
  });

  const totalCount = await prisma.bounty.count({
    where: {
      comments: {
        some: {
          authorId: userId,
        },
      },
    },
  });

  return { bounties, totalCount };
}
