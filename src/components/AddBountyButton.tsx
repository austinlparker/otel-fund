"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

export default function AddBountyButton() {
  const { data: session } = useSession();

  if (!session) {
    return null;
  }

  return (
    <Link
      href="/add-bounty"
      prefetch={false}
      className="bg-tango text-white px-4 py-2 rounded-md hover:bg-opacity-90 font-semibold"
    >
      + Add Bounty
    </Link>
  );
}
