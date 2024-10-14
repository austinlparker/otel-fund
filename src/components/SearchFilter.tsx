"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

interface SearchFilterProps {
  initialQuery: string;
}

export default function SearchFilter({ initialQuery }: SearchFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(initialQuery);

  useEffect(() => {
    setSearchTerm(initialQuery);
  }, [initialQuery]);

  const handleSearch = useCallback(
    (value: string) => {
      setSearchTerm(value);
      const params = new URLSearchParams(searchParams);
      if (value) {
        params.set("q", value);
      } else {
        params.delete("q");
      }
      router.push(`/?${params.toString()}`);
    },
    [router, searchParams],
  );

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search bounties..."
        className="w-full p-2 pl-10 border border-sapphire_blue-300 dark:border-sapphire_blue-600 rounded-md bg-white dark:bg-sapphire_blue-800 text-sapphire_blue-900 dark:text-sapphire_blue-100 placeholder-sapphire_blue-400 dark:placeholder-sapphire_blue-300 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all duration-200"
        aria-label="Search bounties"
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <FontAwesomeIcon
        icon={faSearch}
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sapphire_blue-400 dark:text-sapphire_blue-300"
      />
    </div>
  );
}
