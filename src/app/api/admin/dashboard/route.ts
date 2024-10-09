import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { BountyStatus } from "@prisma/client";

export async function GET() {
  const session = await auth();

  if (!session || !session.user.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const [
      totalUsers,
      totalBounties,
      pendingBounties,
      recentUsers,
      recentBounties,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.bounty.count(),
      prisma.bounty.count({
        where: { status: BountyStatus.PENDING_MODERATION },
      }),
      prisma.user.findMany({ take: 5, orderBy: { createdAt: "desc" } }),
      prisma.bounty.findMany({ take: 5, orderBy: { createdAt: "desc" } }),
    ]);

    return NextResponse.json({
      totalUsers,
      totalBounties,
      pendingBounties,
      recentUsers,
      recentBounties,
    });
  } catch (error) {
    console.error("Failed to fetch dashboard data:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
