"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import {
  Bounty,
  User,
  //Comment,
  CommentWithReplies,
  BountyStatus,
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

export async function getFlaggedContent() {
  await checkAdminAuth();

  const flaggedBounties = await prisma.bounty.findMany({
    where: { status: "MODERATION_AUTO_UNSURE" },
    select: {
      id: true,
      title: true,
      description: true,
      createdAt: true,
      user: { select: { id: true, name: true, email: true } },
    },
  });

  const flaggedComments = await prisma.comment.findMany({
    where: { hidden: true },
    select: {
      id: true,
      content: true,
      createdAt: true,
      author: { select: { id: true, name: true, email: true } },
    },
  });

  return [
    ...flaggedBounties.map((b) => ({
      ...b,
      type: "BOUNTY",
      content: b.title + ": " + b.description,
    })),
    ...flaggedComments.map((c) => ({ ...c, type: "COMMENT", user: c.author })),
  ];
}

export async function reviewFlaggedContent(
  id: string,
  type: string,
  decision: "approve" | "reject",
) {
  await checkAdminAuth();

  switch (type) {
    case "BOUNTY":
      await prisma.bounty.update({
        where: { id: parseInt(id) },
        data: {
          status: decision === "approve" ? "ACTIVE" : "MODERATION_AUTO_REJECT",
        },
      });
      break;
    case "COMMENT":
      if (decision === "approve") {
        await prisma.comment.update({
          where: { id: parseInt(id) },
          data: { hidden: false },
        });
      } else {
        await prisma.comment.delete({
          where: { id: parseInt(id) },
        });
      }
      break;
    default:
      throw new Error("Invalid content type");
  }
}
