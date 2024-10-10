import React from "react";
import { Bounty } from "@/types";
import VoteButton from "./VoteButton";
import UserAvatar from "@/components/UserAvatar";
import Link from "next/link";
import Tag from "./Tag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";

interface BountyListProps {
  bounties: Bounty[];
}

const BountyList: React.FC<BountyListProps> = ({ bounties }) => {
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
            <div className="flex flex-col space-y-3">
              <div className="flex justify-between items-start">
                <div className="flex-grow">
                  <Link
                    href={`/bounty/${bounty.id}`}
                    prefetch={false}
                    className="text-lg font-semibold text-slate dark:text-white hover:underline"
                  >
                    {bounty.title}
                  </Link>
                  <p className="text-sm text-slate dark:text-fog mt-1">
                    {bounty.description}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <VoteButton bounty={bounty} />
                  <span className="flex items-center text-sm text-slate dark:text-fog">
                    <FontAwesomeIcon icon={faComment} className="mr-1" />
                    {bounty.comments?.length || 0}
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap -mx-1">
                {bounty.tags.map((tag) => (
                  <div key={tag.id} className="px-1 mb-1">
                    <Tag name={tag.name} />
                  </div>
                ))}
              </div>
              <div className="flex items-center text-xs text-slate dark:text-fog">
                <UserAvatar user={bounty.user} size="sm" showName={true} />
                <span className="mx-2">•</span>
                <span>{new Date(bounty.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default BountyList;
