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
      <div className="flex -space-x-3 overflow-hidden">
        {displayedVoters.map((voter) => (
          <div
            key={voter.id}
            className="inline-block ring-2 ring-white dark:ring-sapphire_blue-800 rounded-full shadow-sm hover:z-10 transition-transform duration-200 hover:scale-110"
          >
            <UserAvatar user={voter} size="sm" showName={false} />
          </div>
        ))}
      </div>
      {remainingCount > 0 && (
        <div className="ml-3 text-sm font-medium text-sapphire_blue-600 dark:text-sapphire_blue-300">
          +{remainingCount} more
        </div>
      )}
    </div>
  );
};

export default VoterAvatars;
