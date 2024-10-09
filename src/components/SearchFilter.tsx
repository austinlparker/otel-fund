"use client";

import { useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SearchFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");

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
    <input
      type="text"
      placeholder="Search bounties..."
      className="w-full p-2 border rounded-md bg-fog dark:bg-slate text-slate dark:text-white"
      aria-label="Search bounties"
      value={searchTerm}
      onChange={(e) => handleSearch(e.target.value)}
    />
  );
}
