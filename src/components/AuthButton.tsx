"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "./Button";

export default function AuthButton() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (session) {
    return (
      <div className="flex items-center space-x-4">
        <Button variant="secondary" onClick={() => signOut()}>
          Sign out
        </Button>
      </div>
    );
  }

  return (
    <Button variant="primary" onClick={() => signIn("github")}>
      Sign in with GitHub
    </Button>
  );
}
