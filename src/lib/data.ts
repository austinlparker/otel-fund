"use server";

import prisma from "@/lib/prisma";
import { GetBountiesResult, Bounty, SortOption, Tag } from "@/types";
import { Prisma } from "@prisma/client";

export async function getBountiesForTag(
  tag: string,
  skip: number = 0,
  take: number = 10,
  sortOption: SortOption = "all",
  searchQuery?: string,
): Promise<GetBountiesResult> {
  let orderBy: Prisma.BountyOrderByWithRelationInput = {};
  const where: Prisma.BountyWhereInput = {
    tags: {
      some: {
        name: tag,
      },
    },
  };

  if (searchQuery) {
    where.OR = [
      { title: { contains: searchQuery, mode: "insensitive" } },
      { description: { contains: searchQuery, mode: "insensitive" } },
    ];
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

  return {
    bounties: bounties as Bounty[],
    totalCount,
  };
}

export async function getBounties(
  skip: number = 0,
  take: number = 10,
  sortOption: SortOption = "all",
  searchQuery?: string,
): Promise<GetBountiesResult> {
  let orderBy: Prisma.BountyOrderByWithRelationInput = {};
  let where: Prisma.BountyWhereInput = {};

  if (searchQuery) {
    where = {
      OR: [
        { title: { contains: searchQuery, mode: "insensitive" } },
        { description: { contains: searchQuery, mode: "insensitive" } },
      ],
    };
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

  return {
    bounties: bounties as Bounty[],
    totalCount,
  };
}

export async function searchBounties(
  query: string,
  skip: number = 0,
  take: number = 10,
): Promise<GetBountiesResult> {
  const [bounties, totalCount] = await Promise.all([
    prisma.bounty.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: "insensitive" } },
          { description: { contains: query, mode: "insensitive" } },
        ],
      },
      skip,
      take,
      orderBy: { createdAt: "desc" },
      include: {
        votes: true,
        tags: true,
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
    prisma.bounty.count({
      where: {
        OR: [
          { title: { contains: query, mode: "insensitive" } },
          { description: { contains: query, mode: "insensitive" } },
        ],
      },
    }),
  ]);

  return {
    bounties: bounties as Bounty[],
    totalCount,
  };
}

export async function getAllTags(): Promise<
  (Tag & { _count: { bounties: number } })[]
> {
  const tags = await prisma.tag.findMany({
    include: {
      _count: {
        select: { bounties: true },
      },
    },
    orderBy: {
      bounties: {
        _count: "desc",
      },
    },
  });

  return tags;
}
