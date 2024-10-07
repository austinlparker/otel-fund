import React from "react";
import { Bounty } from "@/types";
import VoteButton from "./VoteButton";

interface BountyDetailViewProps {
  bounty: Bounty;
  onVoteSuccess: (updatedBounty: Bounty) => void;
}

const BountyDetailView: React.FC<BountyDetailViewProps> = ({
  bounty,
  onVoteSuccess,
}) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{bounty.title}</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        {bounty.description}
      </p>
      <div className="flex justify-between items-center">
        <span className="text-indigo-600 dark:text-indigo-400 font-medium">
          Votes: {bounty.votes?.length || 0}
        </span>
        <VoteButton bounty={bounty} onVoteSuccess={onVoteSuccess} />
      </div>
    </div>
  );
};

export default BountyDetailView;
