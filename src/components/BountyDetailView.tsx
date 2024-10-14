"use client";

import React from "react";
import { Bounty } from "@/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExternalLinkAlt,
  faQuoteLeft,
} from "@fortawesome/free-solid-svg-icons";
import UserAvatar from "@/components/UserAvatar";
import Tag from "./Tag";
import VoteButton from "./VoteButton";
import VoterAvatars from "./VoterAvatars";
import { useRouter } from "next/navigation";
import { Button } from "./Button";
import { User } from "@/types";

interface BountyDetailViewProps {
  bounty: Bounty;
}

const BountyDetailView: React.FC<BountyDetailViewProps> = ({ bounty }) => {
  const router = useRouter();
  const voters: User[] = bounty.votes
    .map((vote) => vote.user)
    .filter((user): user is NonNullable<typeof user> => user != null);

  const handleVoteSuccess = () => {
    router.refresh(); // This will re-fetch the data and update the UI
  };

  return (
    <div className="p-4 sm:p-6 space-y-8 bg-white dark:bg-sapphire_blue-900 rounded-lg shadow-md">
      <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6">
        <UserAvatar user={bounty.user} size="lg" showName={true} />
        <div className="flex-grow w-full">
          <div className="bg-sapphire_blue-50 dark:bg-sapphire_blue-800 shadow-md rounded-lg overflow-hidden">
            <div className="bg-amber-500 h-2"></div>
            <div className="p-6">
              <FontAwesomeIcon
                icon={faQuoteLeft}
                className="text-amber-500 text-2xl mb-3"
              />
              <p className="text-sapphire_blue-800 dark:text-sapphire_blue-100 text-lg leading-relaxed">
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
        <VoterAvatars voters={voters} maxDisplay={30} />
        <Button
          variant="secondary"
          as="a"
          href={bounty.repoLink}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto text-center"
        >
          <FontAwesomeIcon icon={faExternalLinkAlt} className="mr-2" />
          View Repository
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {bounty.tags.map((tag) => (
          <Tag key={tag.id} name={tag.name} />
        ))}
      </div>

      {bounty.notes && (
        <>
          <hr className="border-sapphire_blue-200 dark:border-sapphire_blue-700" />
          <div>
            <h3 className="text-xl font-semibold mb-3 text-sapphire_blue-800 dark:text-sapphire_blue-100">
              Extended Description
            </h3>
            <p className="text-sapphire_blue-700 dark:text-sapphire_blue-200 leading-relaxed">
              {bounty.notes}
            </p>
          </div>
        </>
      )}

      <hr className="border-sapphire_blue-200 dark:border-sapphire_blue-700" />
    </div>
  );
};

export default BountyDetailView;
