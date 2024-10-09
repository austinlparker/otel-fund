import Modal from "./Modal";
import BountyDetailView from "./BountyDetailView";
import { getBountyById } from "@/app/actions";
import { useState, useEffect } from "react";
import { Bounty } from "@/types";

interface BountyDetailModalProps {
  bountyId: number | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function BountyDetailModal({
  bountyId,
  isOpen,
  onClose,
}: BountyDetailModalProps) {
  const [bounty, setBounty] = useState<Bounty | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen && bountyId) {
      setIsLoading(true);
      getBountyById(bountyId)
        .then((fetchedBounty) => {
          setBounty(fetchedBounty);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setBounty(null);
    }
  }, [isOpen, bountyId]);

  const handleVoteSuccess = () => {
    if (bountyId) {
      getBountyById(bountyId).then(setBounty);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={bounty?.title}>
      {isLoading ? (
        <div>Loading...</div>
      ) : bounty ? (
        <BountyDetailView bounty={bounty} onVoteSuccess={handleVoteSuccess} />
      ) : (
        <div>No bounty found</div>
      )}
    </Modal>
  );
}
