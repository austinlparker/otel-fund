"use client";

import { useState, useEffect } from "react";
import { Bounty, BountyStatus } from "@/types";
import {
  getBounties,
  updateBountyStatus,
  toggleBountyVisibility,
} from "@/app/adminActions";

export default function BountyManagement() {
  const [bounties, setBounties] = useState<Bounty[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchBounties();
  }, []);

  async function fetchBounties() {
    setIsLoading(true);
    try {
      const data = await getBounties();
      setBounties(data as Bounty[]);
    } catch (error) {
      console.error("Error fetching bounties:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleUpdateBountyStatus(
    bountyId: number,
    newStatus: BountyStatus,
  ) {
    try {
      await updateBountyStatus(bountyId, newStatus);
      await fetchBounties(); // Refresh the bounty list
    } catch (error) {
      console.error("Error updating bounty status:", error);
    }
  }

  async function handleToggleBountyVisibility(bountyId: number) {
    try {
      await toggleBountyVisibility(bountyId);
      await fetchBounties(); // Refresh the bounty list
    } catch (error) {
      console.error("Error toggling bounty visibility:", error);
    }
  }

  if (isLoading) return <div>Loading bounties...</div>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Bounty Management</h2>
      <table className="w-full">
        <thead>
          <tr>
            <th>Title</th>
            <th>Status</th>
            <th>Visibility</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bounties.map((bounty) => (
            <tr key={bounty.id}>
              <td>{bounty.title}</td>
              <td>{bounty.status}</td>
              <td>{bounty.hidden ? "Hidden" : "Visible"}</td>
              <td>
                <select
                  value={bounty.status}
                  onChange={(e) =>
                    handleUpdateBountyStatus(
                      bounty.id,
                      e.target.value as BountyStatus,
                    )
                  }
                  className="mr-2"
                >
                  {Object.values(BountyStatus).map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
                <button onClick={() => handleToggleBountyVisibility(bounty.id)}>
                  {bounty.hidden ? "Show" : "Hide"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
