"use client";

import Link from "next/link";
import { Button } from "./Button";
import { useSession } from "next-auth/react";

export default function AddBountyButton() {
  const { data: session } = useSession();

  if (!session) {
    return null;
  }

  return (
    <Link href="/add-bounty" prefetch={false}>
      <Button variant="primary"> + Add Bounty </Button>
    </Link>
  );
}
