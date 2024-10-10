"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { voteForBounty } from "@/app/actions";
import toast from "react-hot-toast";
import { Bounty } from "@/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

interface VoteButtonProps {
  bounty: Bounty;
  onVoteSuccess?: () => void;
  size?: "small" | "large";
}

export default function VoteButton({
  bounty,
  onVoteSuccess,
  size = "small",
}: VoteButtonProps) {
  const { data: session } = useSession();
  const [isVoting, setIsVoting] = useState(false);

  const handleVote = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Stop the event from bubbling up

    if (!session) {
      toast.error("Please sign in to vote");
      return;
    }

    setIsVoting(true);

    try {
      await voteForBounty(bounty.id ?? 0);
      toast.success("Vote submitted successfully!");
      if (onVoteSuccess) {
        onVoteSuccess();
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

  const baseClasses =
    "flex items-center justify-center space-x-1 border border-tango text-tango hover:bg-tango hover:text-white transition-all duration-200";
  const sizeClasses =
    size === "large" ? "px-4 py-2 text-base" : "px-2 py-1 text-sm";

  return (
    <button
      onClick={handleVote}
      disabled={isVoting}
      className={`${baseClasses} ${sizeClasses} ${isVoting ? "opacity-50 animate-pulse" : ""}`}
    >
      <FontAwesomeIcon
        icon={faArrowUp}
        className={`${isVoting ? "animate-bounce" : ""}`}
      />
      <span>{bounty.votes?.length || 0}</span>
      {size === "large" && <span>Votes</span>}
    </button>
  );
}
