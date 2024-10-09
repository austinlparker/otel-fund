"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Bounty } from "@/types";
import { autoMod, moderationResultToBountyStatus } from "@/lib/automod";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { calculateHotScore } from "@/lib/hotScore";
import { Prisma } from "@prisma/client";

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

export async function voteForBounty(bountyId: number) {
  const session = await auth();
  if (!session || !session.user || !session.user.email) {
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
    if (error instanceof Error) {
      if (error.message === "ALREADY_VOTED") {
        throw error;
      }
    }
    console.error("Vote error:", error);
    throw new Error("VOTE_FAILED");
  }
}

export async function getBountyById(id: number): Promise<Bounty | null> {
  const bounty = await prisma.bounty.findUnique({
    where: { id },
    include: {
      tags: true,
      votes: true,
      user: {
        select: {
          id: true,
          name: true,
          image: true,
          email: true,
        },
      },
    },
  });

  if (!bounty) return null;

  const comments = await getComments(id);

  return {
    ...bounty,
    comments,
  };
}

export async function addBounty(formData: FormData) {
  const session = await auth();
  if (!session || !session.user?.email) {
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
    user: session.user.email,
  });
  const status = moderationResultToBountyStatus(moderationResult);

  await prisma.bounty.create({
    data: {
      title,
      description,
      repoLink,
      notes,
      createdBy: session.user.email,
      status,
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

export async function addComment(
  bountyId: number,
  content: string,
  parentId?: number,
) {
  const session = await auth();
  if (!session?.user) {
    throw new Error("You must be logged in to comment");
  }

  const comment = await prisma.comment.create({
    data: {
      content,
      authorId: session.user.id,
      bountyId,
      parentId,
    },
    include: {
      author: true,
    },
  });

  revalidatePath(`/bounty/${bountyId}`);

  return comment;
}

type CommentWithReplies = Prisma.CommentGetPayload<{
  include: {
    author: {
      select: {
        id: true;
        name: true;
        image: true;
        email: true;
      };
    };
    replies: {
      include: {
        author: {
          select: {
            id: true;
            name: true;
            image: true;
            email: true;
          };
        };
      };
    };
  };
}> & { replies: CommentWithReplies[] };

const includeReplies = (depth: number): Prisma.CommentInclude => ({
  author: {
    select: {
      id: true,
      name: true,
      image: true,
      email: true,
    },
  },
  replies:
    depth > 0
      ? {
          include: includeReplies(depth - 1),
        }
      : false,
});

export async function getComments(
  bountyId: number,
  maxDepth = 10,
): Promise<CommentWithReplies[]> {
  const comments = await prisma.comment.findMany({
    where: { bountyId, parentId: null },
    include: includeReplies(maxDepth),
    orderBy: {
      createdAt: "desc",
    },
  });

  // Recursively sort replies
  const sortReplies = (
    comments: CommentWithReplies[],
  ): CommentWithReplies[] => {
    return comments.map((comment) => ({
      ...comment,
      replies: sortReplies(comment.replies).sort(
        (a, b) => a.createdAt.getTime() - b.createdAt.getTime(),
      ),
    }));
  };

  return sortReplies(comments);
}
