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
