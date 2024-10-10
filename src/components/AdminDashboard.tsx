"use client";

import { useState, useEffect } from "react";
import { User, Bounty } from "@prisma/client";
import UserManagement from "./admin/UserManagement";
import BountyManagement from "./admin/BountyManagement";
import CommentManagement from "./admin/CommentManagement";

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
    return <p className="text-slate dark:text-fog">Loading...</p>;
  }

  if (error) {
    return <p className="text-tango">Error: {error}</p>;
  }

  if (!dashboardData) {
    return <p className="text-slate dark:text-fog">No data available</p>;
  }

  return (
    <div className="p-6 bg-white dark:bg-slate text-slate dark:text-fog">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      <div className="mb-6">
        <button
          onClick={() => setActiveTab("overview")}
          className={`mr-4 ${activeTab === "overview" ? "text-pacific" : ""}`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab("users")}
          className={`mr-4 ${activeTab === "users" ? "text-pacific" : ""}`}
        >
          Manage Users
        </button>
        <button
          onClick={() => setActiveTab("bounties")}
          className={`mr-4 ${activeTab === "bounties" ? "text-pacific" : ""}`}
        >
          Manage Bounties
        </button>
        <button
          onClick={() => setActiveTab("comments")}
          className={`${activeTab === "comments" ? "text-pacific" : ""}`}
        >
          Manage Comments
        </button>
      </div>

      {activeTab === "overview" && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Recent Users</h2>
            <UserList users={dashboardData.recentUsers} />
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Recent Bounties</h2>
            <BountyList bounties={dashboardData.recentBounties} />
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
    <div className="bg-fog dark:bg-indigo p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-2 text-slate dark:text-fog">
        {title}
      </h3>
      <p className="text-3xl font-bold text-slate dark:text-white">{value}</p>
    </div>
  );
}

function UserList({ users }: { users: User[] }) {
  return (
    <ul className="bg-fog dark:bg-indigo rounded-lg shadow-md">
      {users.map((user) => (
        <li
          key={user.id}
          className="p-4 border-b border-silver dark:border-slate last:border-b-0"
        >
          <p className="font-semibold text-slate dark:text-fog">{user.name}</p>
          <p className="text-sm text-slate dark:text-silver">{user.email}</p>
        </li>
      ))}
    </ul>
  );
}

function BountyList({ bounties }: { bounties: Bounty[] }) {
  return (
    <ul className="bg-fog dark:bg-indigo rounded-lg shadow-md">
      {bounties.map((bounty) => (
        <li
          key={bounty.id}
          className="p-4 border-b border-silver dark:border-slate last:border-b-0"
        >
          <p className="font-semibold text-slate dark:text-fog">
            {bounty.title}
          </p>
          <p className="text-sm text-slate dark:text-silver">
            Status: {bounty.status}
          </p>
        </li>
      ))}
    </ul>
  );
}
