"use client";

import { useSession } from "next-auth/react";
import AuthButton from "./AuthButton";
import AddBountyButton from "./AddBountyButton";
import DarkModeToggle from "./DarkModeToggle";
import UserAvatar from "@/components/UserAvatar";
import Link from "next/link";
import { Button } from "./Button";

export default function ClientHeader() {
  const { data: session } = useSession();

  return (
    <div className="flex items-center space-x-4">
      <AddBountyButton />
      <div className="flex-grow"></div>
      <DarkModeToggle />
      {session?.user && (
        <Link href={`/profile/${session.user.id}`}>
          <UserAvatar user={session.user} size="sm" showName={false} />
        </Link>
      )}
      <AuthButton />
      {session?.user?.isAdmin && (
        <Link href="/admin" passHref>
          <Button variant="secondary" className="text-sm py-1 px-2">
            Admin
          </Button>
        </Link>
      )}
    </div>
  );
}
