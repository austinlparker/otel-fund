"use client";

import { useState } from "react";
import BountyList from "./BountyList";
import PaginationControls from "./PaginationControls";
import BountyDetailModal from "./BountyDetailModal";
import { Bounty } from "@/types";

interface PaginatedBountyListProps {
  initialBounties: Bounty[];
  totalCount: number;
  page: number;
  itemsPerPage: number;
}

export default function PaginatedBountyList({
  initialBounties,
  totalCount,
  page,
  itemsPerPage,
}: PaginatedBountyListProps) {
  const [selectedBountyId, setSelectedBountyId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const totalPages = Math.ceil(totalCount / itemsPerPage);

  const handleBountyClick = (bountyId: number) => {
    setSelectedBountyId(bountyId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBountyId(null);
  };

  return (
    <div>
      <BountyList
        bounties={initialBounties}
        onBountyClick={handleBountyClick}
      />
      <PaginationControls
        currentPage={page}
        totalPages={Math.ceil(totalCount / itemsPerPage)}
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
