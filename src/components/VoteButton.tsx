"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { voteForBounty } from "@/app/actions";
import toast from "react-hot-toast";
import { Bounty } from "@/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";

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

  const buttonClasses =
    size === "large"
      ? "flex items-center space-x-2 bg-tango text-white px-4 py-2 rounded-md transition-all duration-200"
      : "flex flex-col items-center";

  const iconClasses =
    size === "large"
      ? "w-6 h-6"
      : "w-6 h-6 text-tango hover:text-fog transition-colors duration-200";

  const textClasses =
    size === "large"
      ? "text-white"
      : "text-sm font-semibold text-slate dark:text-fog mt-1";

  return (
    <button
      onClick={handleVote}
      disabled={isVoting}
      className={`${buttonClasses} ${isVoting ? "opacity-50" : "hover:bg-opacity-80"} ${isVoting ? "animate-pulse" : ""}`}
    >
      <FontAwesomeIcon
        icon={faThumbsUp}
        className={`${iconClasses} ${isVoting ? "animate-bounce" : ""}`}
      />
      <span className={textClasses}>
        {bounty.votes?.length || 0} {size === "large" ? "Votes" : ""}
      </span>
    </button>
  );
}
