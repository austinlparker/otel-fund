"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function AuthButton() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (session) {
    return (
      <div className="flex items-center space-x-4">
        <button
          className="bg-tango text-white px-4 py-2 rounded-md hover:bg-opacity-90"
          onClick={() => signOut()}
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <button
      className="bg-pacific text-white px-4 py-2 rounded-md hover:bg-opacity-90"
      onClick={() => signIn("github")}
    >
      Sign in with GitHub
    </button>
  );
}
