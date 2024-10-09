import React from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
}

export default function PaginationControls({
  currentPage,
  totalPages,
  itemsPerPage,
}: PaginationControlsProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const siblingCount = 1;
    const boundaryCount = 1;

    const range = (start: number, end: number) => {
      const length = end - start + 1;
      return Array.from({ length }, (_, i) => start + i);
    };

    const startPages = range(1, Math.min(boundaryCount, totalPages));
    const endPages = range(
      Math.max(totalPages - boundaryCount + 1, boundaryCount + 1),
      totalPages,
    );

    const siblingsStart = Math.max(
      Math.min(
        currentPage - siblingCount,
        totalPages - boundaryCount - siblingCount * 2 - 1,
      ),
      boundaryCount + 2,
    );

    const siblingsEnd = Math.min(
      Math.max(
        currentPage + siblingCount,
        boundaryCount + siblingCount * 2 + 2,
      ),
      endPages.length > 0 ? endPages[0] - 2 : totalPages - 1,
    );

    // Render start pages
    pageNumbers.push(...startPages);

    // Render ellipsis if needed
    if (siblingsStart > boundaryCount + 2) {
      pageNumbers.push("...");
    } else if (boundaryCount + 1 < siblingsStart) {
      pageNumbers.push(boundaryCount + 1);
    }

    // Render sibling pages
    pageNumbers.push(...range(siblingsStart, siblingsEnd));

    // Render ellipsis if needed
    if (siblingsEnd < totalPages - boundaryCount - 1) {
      pageNumbers.push("...");
    } else if (totalPages - boundaryCount > siblingsEnd) {
      pageNumbers.push(totalPages - boundaryCount);
    }

    // Render end pages
    pageNumbers.push(...endPages);

    // Remove duplicates and sort
    return [...new Set(pageNumbers)].sort((a, b) => {
      if (a === "...") return 0;
      if (b === "...") return 0;
      return Number(a) - Number(b);
    });
  };

  const pageNumbers = renderPageNumbers();

  return (
    <div className="flex justify-center items-center space-x-2 mt-4">
      {currentPage > 1 && (
        <Link
          href={createPageURL(currentPage - 1)}
          className="px-3 py-2 rounded-md bg-white text-slate hover:bg-fog"
        >
          Previous
        </Link>
      )}
      {pageNumbers.map((pageNumber, index) => (
        <React.Fragment key={index}>
          {pageNumber === "..." ? (
            <span className="px-3 py-2">...</span>
          ) : (
            <Link
              href={createPageURL(pageNumber)}
              className={`px-3 py-2 rounded-md ${
                currentPage === pageNumber
                  ? "bg-pacific text-white"
                  : "bg-white text-slate hover:bg-fog"
              }`}
            >
              {pageNumber}
            </Link>
          )}
        </React.Fragment>
      ))}
      {currentPage < totalPages && (
        <Link
          href={createPageURL(currentPage + 1)}
          className="px-3 py-2 rounded-md bg-white text-slate hover:bg-fog"
        >
          Next
        </Link>
      )}
    </div>
  );
}
