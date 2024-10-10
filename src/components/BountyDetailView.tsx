"use client";

import React from "react";
import { Bounty } from "@/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExternalLinkAlt,
  faQuoteLeft,
} from "@fortawesome/free-solid-svg-icons";
import UserAvatar from "./UserAvatar";
import Tag from "./Tag";
import VoteButton from "./VoteButton";
import { useRouter } from "next/navigation";

interface BountyDetailViewProps {
  bounty: Bounty;
}

const BountyDetailView: React.FC<BountyDetailViewProps> = ({ bounty }) => {
  const router = useRouter();

  const handleVoteSuccess = () => {
    router.refresh(); // This will re-fetch the data and update the UI
  };
  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4">
        <UserAvatar user={bounty.user} size="lg" />
        <div className="flex-grow w-full">
          <div className="bg-white dark:bg-slate shadow-md rounded-lg overflow-hidden">
            <div className="bg-pacific h-2"></div>
            <div className="p-4">
              <FontAwesomeIcon
                icon={faQuoteLeft}
                className="text-pacific text-2xl mb-2"
              />
              <p className="text-slate dark:text-fog text-lg">
                {bounty.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <VoteButton
          bounty={bounty}
          onVoteSuccess={handleVoteSuccess}
          size="large"
        />
        <a
          href={bounty.repoLink}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-pacific text-white px-4 py-2 rounded-md hover:bg-opacity-80 transition-colors duration-200 w-full sm:w-auto text-center"
        >
          <FontAwesomeIcon icon={faExternalLinkAlt} className="mr-2" />
          View Repository
        </a>
      </div>

      <div className="flex flex-wrap">
        {bounty.tags.map((tag) => (
          <Tag key={tag.id} name={tag.name} />
        ))}
      </div>

      {bounty.notes && (
        <>
          <hr className="border-silver dark:border-indigo" />
          <div>
            <h3 className="text-lg font-semibold mb-2 text-slate dark:text-fog">
              Extended Description
            </h3>
            <p className="text-slate dark:text-fog">{bounty.notes}</p>
          </div>
        </>
      )}

      <hr className="border-silver dark:border-indigo" />
    </div>
  );
};

export default BountyDetailView;
