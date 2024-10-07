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

  if (req.method === "GET") {
    try {
      const bounties = await prisma.bounty.findMany({
        include: { votes: true },
      });
      res.status(200).json(bounties);
    } catch (error) {
      console.error("Failed to fetch bounties:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else if (req.method === "POST") {
    const { title, description } = req.body;
    try {
      const bounty = await prisma.bounty.create({
        data: {
          title,
          description,
          createdBy: { connect: { id: session.user.id } },
        },
      });
      res.status(201).json(bounty);
    } catch (error) {
      console.error("Failed to create bounty:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
