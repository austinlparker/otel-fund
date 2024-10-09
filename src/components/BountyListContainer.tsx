"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import BountyList from "./BountyList";
import PaginationControls from "./PaginationControls";
import SortFilter from "./SortFilter";
import BountyDetailModal from "./BountyDetailModal";
import { getBounties, getBountiesForTag } from "@/lib/data";
import { Bounty, SortOption } from "@/types";

interface BountyListContainerProps {
  initialBounties: Bounty[];
  totalCount: number;
  itemsPerPage: number;
  tag?: string;
}

export default function BountyListContainer({
  initialBounties,
  totalCount,
  itemsPerPage,
  tag,
}: BountyListContainerProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [bounties, setBounties] = useState(initialBounties);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedBountyId, setSelectedBountyId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const page = parseInt(searchParams.get("page") || "1", 10);
  const sortOption = (searchParams.get("sort") as SortOption) || "all";
  const searchQuery = searchParams.get("q") || undefined;

  useEffect(() => {
    const fetchBounties = async () => {
      setIsLoading(true);
      const skip = (page - 1) * itemsPerPage;
      const { bounties: newBounties } = tag
        ? await getBountiesForTag(
            tag,
            skip,
            itemsPerPage,
            sortOption,
            searchQuery,
          )
        : await getBounties(skip, itemsPerPage, sortOption, searchQuery);
      setBounties(newBounties);
      setIsLoading(false);
    };

    fetchBounties();
  }, [page, sortOption, searchQuery, tag, itemsPerPage]);

  const handleBountyClick = (bountyId: number) => {
    setSelectedBountyId(bountyId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBountyId(null);
  };

  const handleSortChange = (newSortOption: SortOption) => {
    const params = new URLSearchParams(searchParams);
    params.set("sort", newSortOption);
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };

  const totalPages = Math.ceil(totalCount / itemsPerPage);

  return (
    <div className="space-y-6">
      <SortFilter currentSort={sortOption} onSortChange={handleSortChange} />
      {isLoading ? (
        <div>Loading bounties...</div>
      ) : (
        <BountyList bounties={bounties} onBountyClick={handleBountyClick} />
      )}
      <PaginationControls
        currentPage={page}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
      />
      <BountyDetailModal
        bountyId={selectedBountyId}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
