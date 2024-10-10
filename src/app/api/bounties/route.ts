import { NextRequest, NextResponse } from "next/server";
import { getBounties, getBountiesForTag } from "@/lib/data";
import { SortOption } from "@/types";

function isValidSortOption(sort: string | null): sort is SortOption {
  return (
    sort === "new" || sort === "hot" || sort === "popular" || sort === "all"
  );
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const sortParam = searchParams.get("sort") as SortOption;
  const page = parseInt(searchParams.get("page") || "1", 10);
  const sort = isValidSortOption(sortParam) ? sortParam : "all";
  const q = searchParams.get("q") || undefined;
  const tag = searchParams.get("tag") || undefined;
  const itemsPerPage = parseInt(searchParams.get("itemsPerPage") || "10", 10);

  const skip = (page - 1) * itemsPerPage;

  try {
    const result = tag
      ? await getBountiesForTag(tag, skip, itemsPerPage, sort, q)
      : await getBounties(skip, itemsPerPage, sort, q);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching bounties:", error);
    return NextResponse.json(
      { error: "Failed to fetch bounties" },
      { status: 500 },
    );
  }
}
