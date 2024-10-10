"use client";

import { useSession } from "next-auth/react";
import AuthButton from "./AuthButton";
import AddBountyButton from "./AddBountyButton";
import DarkModeToggle from "./DarkModeToggle";
import UserAvatar from "./UserAvatar";
import Link from "next/link";

export default function ClientHeader() {
  const { data: session } = useSession();

  return (
    <div className="flex items-center space-x-4">
      <AddBountyButton />
      <DarkModeToggle />
      <AuthButton />
      {session?.user && <UserAvatar user={session.user} size="sm" />}
      {session?.user?.isAdmin && (
        <Link href="/admin" className="text-pacific hover:text-opacity-80">
          Admin
        </Link>
      )}
    </div>
  );
}
