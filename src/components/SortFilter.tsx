"use client";

import { SortOption } from "@/types";

interface SortFilterProps {
  currentSort: SortOption;
  onSortChange: (sort: SortOption) => void;
}

export default function SortFilter({
  currentSort,
  onSortChange,
}: SortFilterProps) {
  return (
    <div className="flex space-x-2">
      {(["all", "new", "popular", "hot"] as SortOption[]).map((option) => (
        <button
          key={option}
          onClick={() => onSortChange(option)}
          className={`px-3 py-2 rounded-md transition-colors ${
            currentSort === option
              ? "bg-pacific text-white"
              : "bg-fog dark:bg-slate text-slate dark:text-white hover:bg-pacific hover:text-white"
          }`}
        >
          {option.charAt(0).toUpperCase() + option.slice(1)}
        </button>
      ))}
    </div>
  );
}
