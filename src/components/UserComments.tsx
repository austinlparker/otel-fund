import Link from "next/link";
import { getBountiesUserCommentedOn } from "@/app/actions";

export default async function UserComments({ userId }: { userId: string }) {
  const { bounties } = await getBountiesUserCommentedOn(userId);

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Bounties Commented On</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-sapphire_blue-800 rounded-lg overflow-hidden">
          <thead className="bg-sapphire_blue-100 dark:bg-sapphire_blue-700">
            <tr>
              <th className="px-4 py-2 text-left">Bounty Title</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">User&apos;s Comments</th>
              <th className="px-4 py-2 text-left">Bounty Created At</th>
            </tr>
          </thead>
          <tbody>
            {bounties.map((bounty) => (
              <tr
                key={bounty.id}
                className="border-b border-sapphire_blue-200 dark:border-sapphire_blue-600"
              >
                <td className="px-4 py-2">
                  <Link
                    href={`/bounty/${bounty.id}`}
                    className="text-amber-600 hover:text-amber-800 dark:text-amber-400 dark:hover:text-amber-200"
                  >
                    {bounty.title}
                  </Link>
                </td>
                <td className="px-4 py-2">{bounty.status}</td>
                <td className="px-4 py-2">{bounty._count.comments}</td>
                <td className="px-4 py-2">
                  {new Date(bounty.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {bounties.length === 0 && (
        <p className="text-sapphire_blue-600 dark:text-sapphire_blue-300 mt-4">
          This user hasn&apos;t commented on any bounties yet.
        </p>
      )}
    </div>
  );
}
