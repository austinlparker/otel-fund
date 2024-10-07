"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Bounty, BountyStatus, Tag } from "@/types";
import { autoMod, moderationResultToBountyStatus } from "@/lib/automod";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";

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

    revalidatePath("/");
    return { success: true };
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

export async function getTags(): Promise<Tag[]> {
  return await prisma.tag.findMany();
}

export async function addTag(name: string): Promise<Tag> {
  return await prisma.tag.create({ data: { name } });
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
    user: session.user,
  });
  const status = moderationResultToBountyStatus(moderationResult);

  const newBounty = await prisma.bounty.create({
    data: {
      title,
      description,
      repoLink,
      notes,
      createdBy: session.user.email,
      status,
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
