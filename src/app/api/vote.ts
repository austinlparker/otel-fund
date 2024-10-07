import { NextApiRequest, NextApiResponse } from "next";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await auth();

  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.method === "POST") {
    const { bountyId } = req.body;
    try {
      const vote = await prisma.vote.create({
        data: {
          user: { connect: { id: session.user.id } },
          bounty: { connect: { id: bountyId } },
        },
      });
      res.status(201).json(vote);
    } catch (error: any) {
      console.error("Failed to create vote:", error);
      if (error.code === "P2002") {
        // Unique constraint failed
        res.status(400).json({ error: "Already voted" });
      } else {
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
