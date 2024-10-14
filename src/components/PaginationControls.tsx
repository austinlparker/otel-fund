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

  const getPageNumbers = () => {
    const delta = 5;
    const range: number[] = [];
    const rangeWithDots: (number | string)[] = [];
    let l: number | undefined;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        range.push(i);
      }
    }

    range.forEach((i) => {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push("...");
        }
      }
      rangeWithDots.push(i);
      l = i;
    });

    return rangeWithDots;
  };

  return (
    <nav
      className="flex justify-center items-center space-x-1 mt-8 flex-wrap"
      aria-label="Pagination"
    >
      {currentPage > 1 && (
        <PageLink
          href={createPageURL(currentPage - 1)}
          className="font-semibold"
        >
          Previous
        </PageLink>
      )}

      {getPageNumbers().map((pageNumber, index) =>
        pageNumber === "..." ? (
          <span
            key={`ellipsis-${index}`}
            className="px-3 py-2 text-sapphire_blue-400 dark:text-sapphire_blue-500"
          >
            ...
          </span>
        ) : (
          <PageLink
            key={pageNumber}
            href={createPageURL(pageNumber as number)}
            className={
              currentPage === pageNumber ? "bg-amber-500 text-white" : ""
            }
            ariaCurrent={currentPage === pageNumber ? "page" : undefined}
          >
            {pageNumber}
          </PageLink>
        ),
      )}

      {currentPage < totalPages && (
        <PageLink
          href={createPageURL(currentPage + 1)}
          className="font-semibold"
        >
          Next
        </PageLink>
      )}
    </nav>
  );
}

interface PageLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  ariaCurrent?: "page" | undefined;
}

const PageLink = ({
  href,
  children,
  className = "",
  ariaCurrent,
}: PageLinkProps) => (
  <Link
    href={href}
    className={`px-3 py-2 rounded-md transition-colors bg-sapphire_blue-100 dark:bg-sapphire_blue-800 text-sapphire_blue-800 dark:text-sapphire_blue-100 hover:bg-amber-500 hover:text-white ${className}`}
    aria-current={ariaCurrent}
  >
    {children}
  </Link>
);
