import React from "react";
import { User } from "@/types";
import UserAvatar from "./UserAvatar";

interface VoterAvatarsProps {
  voters: User[];
  maxDisplay?: number;
}

const VoterAvatars: React.FC<VoterAvatarsProps> = ({
  voters,
  maxDisplay = 5,
}) => {
  const displayedVoters = voters.slice(0, maxDisplay);
  const remainingCount = voters.length - maxDisplay;

  return (
    <div className="flex items-center">
      <div className="flex -space-x-2 overflow-hidden">
        {displayedVoters.map((voter, index) => (
          <div
            key={voter.id}
            className="inline-block ring-2 ring-white dark:ring-slate rounded-full"
          >
            <UserAvatar user={voter} size="sm" showName={false} />
          </div>
        ))}
      </div>
      {remainingCount > 0 && (
        <div className="ml-2 text-sm text-slate dark:text-fog">
          +{remainingCount} more
        </div>
      )}
    </div>
  );
};

export default VoterAvatars;
