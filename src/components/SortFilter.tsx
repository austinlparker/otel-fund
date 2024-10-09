"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SortOption } from "@/types";
import {
  faFire,
  faClock,
  faStar,
  faList,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter, useSearchParams } from "next/navigation";

const sortOptions: {
  [key in SortOption]: { icon: IconDefinition; label: string };
} = {
  new: { icon: faClock, label: "New" },
  hot: { icon: faFire, label: "Hot" },
  popular: { icon: faStar, label: "Popular" },
  all: { icon: faList, label: "All" },
};

export default function SortFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeSort, setActiveSort] = useState<SortOption>(
    (searchParams.get("sort") as SortOption) || "all",
  );

  const handleSort = (sort: SortOption) => {
    setActiveSort(sort);
    const params = new URLSearchParams(searchParams);
    params.set("sort", sort);
    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="flex space-x-4">
      {(Object.keys(sortOptions) as SortOption[]).map((option) => (
        <button
          key={option}
          onClick={() => handleSort(option)}
          className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
            activeSort === option
              ? "bg-tango text-white"
              : "bg-fog dark:bg-slate text-slate dark:text-white hover:bg-tango hover:text-white"
          }`}
        >
          <FontAwesomeIcon icon={sortOptions[option].icon} />
          <span>{sortOptions[option].label}</span>
        </button>
      ))}
    </div>
  );
}
