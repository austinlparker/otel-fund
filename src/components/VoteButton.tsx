"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { voteForBounty } from "@/app/actions";
import toast from "react-hot-toast";
import { Bounty } from "@/types";

interface VoteButtonProps {
  bounty: Bounty;
  onVoteSuccess?: (updatedBounty: Bounty) => void;
}

export default function VoteButton({ bounty, onVoteSuccess }: VoteButtonProps) {
  const { data: session } = useSession();
  const [isVoting, setIsVoting] = useState(false);

  const handleVote = async () => {
    if (!session) {
      toast.error("Please sign in to vote");
      return;
    }

    setIsVoting(true);

    try {
      const updatedBounty = await voteForBounty(bounty.id);
      toast.success("Vote submitted successfully!");
      if (onVoteSuccess && updatedBounty) {
        onVoteSuccess(updatedBounty);
      }
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "ALREADY_VOTED") {
          toast.error("You have already voted for this bounty");
        } else if (error.message === "VOTE_FAILED") {
          toast.error("Failed to submit your vote. Please try again.");
        } else {
          toast.error("An unexpected error occurred");
        }
      }
    } finally {
      setIsVoting(false);
    }
  };

  return (
    <button
      onClick={handleVote}
      disabled={isVoting}
      className="bg-pacific text-white px-3 py-1 rounded hover:bg-opacity-90 disabled:opacity-50"
    >
      {isVoting ? "Voting..." : "Vote"}
    </button>
  );
}
