"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import {
  Bounty,
  BountyStatus,
  User,
  Comment,
  CommentWithReplies,
  FlaggedItem,
  FlaggedBounty,
  FlaggedComment,
} from "@/types";
import { revalidatePath } from "next/cache";

async function checkAdminAuth() {
  const session = await auth();
  if (!session || !session.user.isAdmin) {
    throw new Error("Unauthorized");
  }
}

export async function getUsers(): Promise<User[]> {
  await checkAdminAuth();
  return prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      emailVerified: true,
      image: true,
      isAdmin: true,
      disabled: true,
      createdAt: true,
      updatedAt: true,
      githubUrl: true,
      paymentLink: true,
      socialLinks: true,
    },
  });
}

export async function toggleAdminStatus(userId: string) {
  await checkAdminAuth();
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new Error("User not found");

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: { isAdmin: !user.isAdmin },
  });

  revalidatePath("/admin");
  return updatedUser;
}

export async function toggleUserStatus(userId: string) {
  await checkAdminAuth();
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new Error("User not found");

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: { disabled: !user.disabled },
  });

  revalidatePath("/admin");
  return updatedUser;
}

export async function getBounties(): Promise<Bounty[]> {
  await checkAdminAuth();
  const bounties = await prisma.bounty.findMany({
    include: {
      tags: true,
      votes: {
        include: {
          user: true, // Include user information for each vote
        },
      },
      comments: {
        include: {
          author: true,
        },
      },
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          emailVerified: true,
          image: true,
          isAdmin: true,
          disabled: true,
          createdAt: true,
          updatedAt: true,
          githubUrl: true,
          paymentLink: true,
          socialLinks: true,
        },
      },
    },
  });

  return bounties.map(
    (bounty): Bounty => ({
      ...bounty,
      comments: bounty.comments.map(
        (comment): CommentWithReplies => ({
          ...comment,
          author: comment.author as User,
          replies: [], // You might need to fetch replies separately if needed
        }),
      ),
      votes: bounty.votes.map((vote) => ({
        ...vote,
        user: vote.user as User | null,
      })),
    }),
  );
}

export async function updateBountyStatus(
  bountyId: number,
  status: BountyStatus,
) {
  await checkAdminAuth();
  const updatedBounty = await prisma.bounty.update({
    where: { id: bountyId },
    data: { status },
  });

  revalidatePath("/admin");
  return updatedBounty;
}

export async function toggleBountyVisibility(bountyId: number) {
  await checkAdminAuth();
  const bounty = await prisma.bounty.findUnique({ where: { id: bountyId } });
  if (!bounty) throw new Error("Bounty not found");

  const updatedBounty = await prisma.bounty.update({
    where: { id: bountyId },
    data: { hidden: !bounty.hidden },
  });

  revalidatePath("/admin");
  return updatedBounty;
}

export async function getComments(): Promise<CommentWithReplies[]> {
  await checkAdminAuth();
  const comments = await prisma.comment.findMany({
    include: {
      author: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return comments.map((comment) => ({
    ...comment,
    author: comment.author,
    replies: [], // We're not fetching replies for the admin view
  }));
}

export async function toggleCommentVisibility(commentId: number) {
  await checkAdminAuth();
  const comment = await prisma.comment.findUnique({ where: { id: commentId } });
  if (!comment) throw new Error("Comment not found");

  const updatedComment = await prisma.comment.update({
    where: { id: commentId },
    data: { hidden: !comment.hidden },
  });

  revalidatePath("/admin");
  return updatedComment;
}

export async function getFlaggedContent(): Promise<FlaggedItem[]> {
  const flaggedBounties = await prisma.bounty.findMany({
    where: { status: "MODERATION_AUTO_UNSURE" },
    include: { user: true },
  });

  const flaggedComments = await prisma.comment.findMany({
    where: { hidden: true },
    include: { author: true },
  });

  return [
    ...flaggedBounties.map(
      (b): FlaggedBounty => ({
        id: b.id,
        type: "BOUNTY",
        content: `${b.title}: ${b.description}`,
        user: b.user,
        createdAt: b.createdAt,
        title: b.title,
        description: b.description,
      }),
    ),
    ...flaggedComments.map(
      (c): FlaggedComment => ({
        id: c.id,
        type: "COMMENT",
        content: c.content,
        user: c.author,
        createdAt: c.createdAt,
      }),
    ),
  ];
}

export async function reviewFlaggedContent(
  id: number,
  type: string,
  decision: "approve" | "reject",
) {
  await checkAdminAuth();

  switch (type) {
    case "BOUNTY":
      await prisma.bounty.update({
        where: { id: id },
        data: {
          status: decision === "approve" ? "ACTIVE" : "MODERATION_AUTO_REJECT",
        },
      });
      break;
    case "COMMENT":
      if (decision === "approve") {
        await prisma.comment.update({
          where: { id: id },
          data: { hidden: false },
        });
      } else {
        await prisma.comment.delete({
          where: { id: id },
        });
      }
      break;
    default:
      throw new Error("Invalid content type");
  }
}
