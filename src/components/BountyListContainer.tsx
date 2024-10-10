"use client";

import { useCallback, useEffect, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import BountyList from "./BountyList";
import PaginationControls from "./PaginationControls";
import SortFilter from "./SortFilter";
import { Bounty, SortOption } from "@/types";

interface BountyListContainerProps {
  initialBounties: Bounty[];
  totalCount: number;
  itemsPerPage: number;
  currentPage: number;
  currentSort: SortOption;
  tagName?: string;
}

export default function BountyListContainer({
  initialBounties,
  totalCount,
  itemsPerPage,
  currentPage,
  currentSort,
  tagName,
}: BountyListContainerProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const totalPages = Math.ceil(totalCount / itemsPerPage);

  const handleSortChange = useCallback(
    (newSort: SortOption) => {
      startTransition(() => {
        const params = new URLSearchParams(searchParams);
        params.set("sort", newSort);
        params.set("page", "1");
        const basePath = tagName ? `/tag/${encodeURIComponent(tagName)}` : "/";
        router.push(`${basePath}?${params.toString()}`);
      });
    },
    [searchParams, router, tagName],
  );

  useEffect(() => {
    const currentSortFromParams =
      (searchParams.get("sort") as SortOption) || "all";
    if (currentSortFromParams !== currentSort) {
      handleSortChange(currentSortFromParams);
    }
  }, [searchParams, currentSort, handleSortChange]);

  return (
    <div className="space-y-6">
      <SortFilter currentSort={currentSort} onSortChange={handleSortChange} />
      <div
        className={`transition-opacity duration-300 ${isPending ? "opacity-50" : "opacity-100"}`}
      >
        <BountyList bounties={initialBounties} />
      </div>
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        tagName={tagName}
      />
    </div>
  );
}
