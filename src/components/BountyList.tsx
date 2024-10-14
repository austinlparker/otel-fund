import React from "react";
import { Bounty, SortOption } from "@/types";
import VoteButton from "./VoteButton";
import UserAvatar from "@/components/UserAvatar";
import Link from "next/link";
import Tag from "./Tag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { useSearchParams } from "next/navigation";

interface BountyListProps {
  bounties: Bounty[];
  currentSort: SortOption;
}

const BountyList: React.FC<BountyListProps> = ({ bounties, currentSort }) => {
  const searchParams = useSearchParams();

  const createBountyLink = (bountyId: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("sort", currentSort);
    const linkString = `/bounty/${bountyId}?${searchParams.toString()}`;
    return linkString;
  };

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
            className="bg-white dark:bg-sapphire_blue-800 p-4 rounded-sm shadow-sm"
          >
            <div className="flex flex-col space-y-3">
              <div className="flex justify-between items-start">
                <div className="flex-grow">
                  <Link
                    href={createBountyLink(bounty.id)}
                    prefetch={false}
                    className="text-lg font-semibold text-sapphire_blue-900 dark:text-sapphire_blue-50 hover:underline"
                  >
                    {bounty.title}
                  </Link>
                  <p className="text-sm text-sapphire_blue-700 dark:text-sapphire_blue-200 mt-1">
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
