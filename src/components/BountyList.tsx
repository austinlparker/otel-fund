import React from "react";
import { Bounty } from "@/types";
import VoteButton from "./VoteButton";
import UserAvatar from "./UserAvatar";
import Tag from "./Tag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";

interface BountyListProps {
  bounties: Bounty[];
  onBountyClick: (bountyId: number) => void;
}

const BountyList: React.FC<BountyListProps> = ({ bounties, onBountyClick }) => {
  return (
    <div className="space-y-4">
      {bounties.length === 0 ? (
        <div className="bg-white dark:bg-slate p-4 rounded-sm shadow-sm dark:shadow-tango text-center">
          No bounties found
        </div>
      ) : (
        bounties.map((bounty) => (
          <div
            key={bounty.id}
            className="bg-white dark:bg-slate p-4 rounded-sm shadow-sm dark:shadow-tango"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between space-y-2 sm:space-y-0">
              <div className="flex-grow">
                <h2
                  className="text-lg font-semibold text-slate dark:text-white cursor-pointer hover:underline"
                  onClick={() => bounty.id && onBountyClick(bounty.id)}
                >
                  {bounty.title}
                </h2>
                <p className="text-sm text-slate dark:text-fog mt-1">
                  {bounty.description}
                </p>
              </div>
              <div className="sm:ml-4">
                <VoteButton bounty={bounty} />
              </div>
            </div>
            <div className="flex flex-wrap mt-2">
              {bounty.tags.map((tag) => (
                <Tag key={tag.id} name={tag.name} />
              ))}
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs text-slate dark:text-fog mt-2">
              <div className="flex items-center space-x-2">
                <UserAvatar user={bounty.user} size="sm" />
                <span>•</span>
                <span>{new Date(bounty.createdAt).toLocaleDateString()}</span>
              </div>
              <span className="flex items-center mt-2 sm:mt-0">
                <FontAwesomeIcon icon={faComment} className="mr-1" />
                {bounty.comments.length} comments
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default BountyList;
