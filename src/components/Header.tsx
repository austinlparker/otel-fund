"use client";

import Image from "next/image";
import AuthButton from "./AuthButton";
import AddBountyButton from "./AddBountyButton";
import SearchFilter from "./SearchFilter";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import DarkModeToggle from "./DarkModeToggle";
import UserAvatar from "./UserAvatar";

export default function Header() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  return (
    <header className="bg-white dark:bg-slate shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4 w-full md:w-auto">
            <Link
              href="/"
              className="flex items-center flex-shrink-0 cursor-pointer"
            >
              <Image
                src="/images/telescopepixel.png"
                alt="OpenTelemetry Logo"
                width={32}
                height={32}
              />
              <h1 className="ml-2 text-xl font-bold text-slate dark:text-fog whitespace-nowrap">
                OpenTelemetry Fund
              </h1>
            </Link>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3">
            <SearchFilter initialQuery={initialQuery} />
          </div>
          <div className="flex items-center space-x-4">
            <AddBountyButton />
            <DarkModeToggle />
            <AuthButton />
            {session?.user && <UserAvatar user={session.user} size="sm" />}
            {session?.user?.isAdmin && (
              <Link
                href="/admin"
                className="text-pacific hover:text-opacity-80"
              >
                Admin
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
