import Image from "next/image";
import Link from "next/link";
import SearchFilter from "./SearchFilter";
import ClientHeader from "./ClientHeader";

interface HeaderProps {
  showSearch?: boolean;
  initialQuery?: string;
}

export default function Header({
  showSearch = false,
  initialQuery = "",
}: HeaderProps) {
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
          {showSearch && (
            <div className="w-full md:w-1/2 lg:w-1/3">
              <SearchFilter initialQuery={initialQuery} />
            </div>
          )}
          <ClientHeader />
        </div>
      </div>
    </header>
  );
}
