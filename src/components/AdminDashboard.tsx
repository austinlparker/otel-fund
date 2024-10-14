"use client";

import { useState, useEffect } from "react";
import { User, Bounty } from "@prisma/client";
import UserManagement from "./admin/UserManagement";
import BountyManagement from "./admin/BountyManagement";
import CommentManagement from "./admin/CommentManagement";
import { Button } from "./Button";

interface DashboardData {
  totalUsers: number;
  totalBounties: number;
  pendingBounties: number;
  recentUsers: User[];
  recentBounties: Bounty[];
}

export default function AdminDashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<
    "overview" | "users" | "bounties" | "comments"
  >("overview");

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const response = await fetch("/api/admin/dashboard");
        if (!response.ok) {
          throw new Error("Failed to fetch dashboard data");
        }
        const data = await response.json();
        setDashboardData(data);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError(
          err instanceof Error ? err.message : "An unknown error occurred",
        );
      } finally {
        setIsLoading(false);
      }
    }
    fetchDashboardData();
  }, []);

  if (isLoading) {
    return (
      <p className="text-sapphire_blue-600 dark:text-sapphire_blue-300">
        Loading...
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-fuschia-600 dark:text-fuschia-300">Error: {error}</p>
    );
  }

  if (!dashboardData) {
    return (
      <p className="text-sapphire_blue-600 dark:text-sapphire_blue-300">
        No data available
      </p>
    );
  }

  return (
    <div className="p-6 bg-white dark:bg-sapphire_blue-900 text-sapphire_blue-900 dark:text-sapphire_blue-50">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="mb-8 flex space-x-4">
        {["overview", "users", "bounties", "comments"].map((tab) => (
          <Button
            key={tab}
            variant={activeTab === tab ? "primary" : "secondary"}
            onClick={() => setActiveTab(tab as typeof activeTab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </Button>
        ))}
      </div>

      {activeTab === "overview" && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <DashboardCard
              title="Total Users"
              value={dashboardData.totalUsers}
            />
            <DashboardCard
              title="Total Bounties"
              value={dashboardData.totalBounties}
            />
            <DashboardCard
              title="Pending Bounties"
              value={dashboardData.pendingBounties}
            />
          </div>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Recent Users</h2>
              <UserList users={dashboardData.recentUsers} />
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Recent Bounties</h2>
              <BountyList bounties={dashboardData.recentBounties} />
            </section>
          </div>
        </div>
      )}

      {activeTab === "users" && <UserManagement />}
      {activeTab === "bounties" && <BountyManagement />}
      {activeTab === "comments" && <CommentManagement />}
    </div>
  );
}

function DashboardCard({ title, value }: { title: string; value: number }) {
  return (
    <div className="bg-sapphire_blue-100 dark:bg-sapphire_blue-800 p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-2 text-sapphire_blue-800 dark:text-sapphire_blue-100">
        {title}
      </h3>
      <p className="text-3xl font-bold text-amber-600 dark:text-amber-300">
        {value}
      </p>
    </div>
  );
}

function UserList({ users }: { users: User[] }) {
  return (
    <ul className="bg-sapphire_blue-50 dark:bg-sapphire_blue-800 rounded-lg shadow-md divide-y divide-sapphire_blue-200 dark:divide-sapphire_blue-700">
      {users.map((user) => (
        <li key={user.id} className="p-4">
          <p className="font-semibold text-sapphire_blue-800 dark:text-sapphire_blue-100">
            {user.name}
          </p>
          <p className="text-sm text-sapphire_blue-600 dark:text-sapphire_blue-300">
            {user.email}
          </p>
        </li>
      ))}
    </ul>
  );
}

function BountyList({ bounties }: { bounties: Bounty[] }) {
  return (
    <ul className="bg-sapphire_blue-50 dark:bg-sapphire_blue-800 rounded-lg shadow-md divide-y divide-sapphire_blue-200 dark:divide-sapphire_blue-700">
      {bounties.map((bounty) => (
        <li key={bounty.id} className="p-4">
          <p className="font-semibold text-sapphire_blue-800 dark:text-sapphire_blue-100">
            {bounty.title}
          </p>
          <p className="text-sm text-sapphire_blue-600 dark:text-sapphire_blue-300">
            Status: {bounty.status}
          </p>
        </li>
      ))}
    </ul>
  );
}
