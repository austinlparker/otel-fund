import { PrismaClient } from "@prisma/client";
import { GetBountiesResult, Bounty } from "@/types";

const prisma = new PrismaClient();

export async function getBounties() {
  return await prisma.bounty.findMany({
    include: {
      votes: true,
      tags: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getBounty(id: number): Promise<Bounty | null> {
  try {
    const bounty = await prisma.bounty.findUnique({
      where: { id },
      include: {
        votes: true,
      },
    });

    return bounty as Bounty | null;
  } catch (error) {
    console.error(`Failed to fetch bounty with id ${id}:`, error);
    return null;
  }
}
