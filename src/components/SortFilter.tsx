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
    <div className="flex flex-wrap gap-2">
      {(["all", "new", "popular", "hot"] as SortOption[]).map((option) => (
        <button
          key={option}
          onClick={() => onSortChange(option)}
          className={`px-4 py-2 rounded-md transition-all duration-200 text-sm font-medium ${
            currentSort === option
              ? "bg-amber-500 text-white shadow-md"
              : "bg-sapphire_blue-100 dark:bg-sapphire_blue-700 text-sapphire_blue-800 dark:text-sapphire_blue-100 hover:bg-amber-400 dark:hover:bg-amber-600 hover:text-white"
          }`}
        >
          {option.charAt(0).toUpperCase() + option.slice(1)}
        </button>
      ))}
    </div>
  );
}
