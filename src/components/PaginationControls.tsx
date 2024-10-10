"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback } from "react";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  tagName?: string;
}

export default function PaginationControls({
  currentPage,
  totalPages,
  tagName,
}: PaginationControlsProps) {
  const searchParams = useSearchParams();

  const createPageURL = useCallback(
    (pageNumber: number) => {
      const params = new URLSearchParams(searchParams);
      params.set("page", pageNumber.toString());
      const basePath = tagName ? `/tag/${encodeURIComponent(tagName)}` : "/";
      return `${basePath}?${params.toString()}`;
    },
    [searchParams, tagName],
  );

  return (
    <div className="flex justify-center items-center space-x-2 mt-4">
      {currentPage > 1 && (
        <Link
          href={createPageURL(currentPage - 1)}
          className="px-3 py-2 rounded-md bg-fog dark:bg-slate text-slate dark:text-white hover:bg-pacific hover:text-white transition-colors"
        >
          Previous
        </Link>
      )}

      {[...Array(totalPages)].map((_, index) => {
        const pageNumber = index + 1;
        return (
          <Link
            key={pageNumber}
            href={createPageURL(pageNumber)}
            className={`px-3 py-2 rounded-md transition-colors ${
              currentPage === pageNumber
                ? "bg-pacific text-white"
                : "bg-fog dark:bg-slate text-slate dark:text-white hover:bg-pacific hover:text-white"
            }`}
            aria-current={currentPage === pageNumber ? "page" : undefined}
          >
            {pageNumber}
          </Link>
        );
      })}

      {currentPage < totalPages && (
        <Link
          href={createPageURL(currentPage + 1)}
          className="px-3 py-2 rounded-md bg-fog dark:bg-slate text-slate dark:text-white hover:bg-pacific hover:text-white transition-colors"
        >
          Next
        </Link>
      )}
    </div>
  );
}
