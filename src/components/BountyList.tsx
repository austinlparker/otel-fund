import VoteButton from "./VoteButton";
import { getBounties } from "@/lib/data";
import { Bounty } from "@/types";

export default async function BountyList() {
  const bounties = await getBounties();

  return (
    <div className="space-y-4">
      {bounties.map((bounty: Bounty) => (
        <div
          key={bounty.id}
          className="bg-white dark:bg-indigo p-4 rounded-lg shadow"
        >
          <h2 className="text-xl font-semibold mb-2">{bounty.title}</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {bounty.description}
          </p>
          <div className="flex justify-between items-center">
            <span className="text-indigo-600 dark:text-indigo-400 font-medium">
              Votes: {bounty.votes?.length || 0}
            </span>
            <VoteButton bounty={bounty} />
          </div>
        </div>
      ))}
    </div>
  );
}
