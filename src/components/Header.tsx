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
    <header className="bg-white dark:bg-sapphire_blue-800 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4 w-full md:w-auto">
            <Link
              href="/"
              className="flex items-center flex-shrink-0 cursor-pointer"
            >
              <Image
                src="/images/syzy_logo.png"
                alt="syzygetic.dev logo"
                width={64}
                height={64}
              />
              <div className="ml-2 flex flex-col">
                <div className="flex items-baseline">
                  <h1 className="text-xl font-bold text-sapphire_blue-900 dark:text-sapphire_blue-50 whitespace-nowrap font-silkscreen">
                    syzygetic.dev
                  </h1>
                </div>
                <span className="text-xs font-medium text-sapphire_blue-600 dark:text-sapphire_blue-300 font-silkscreen">
                  funny name, serious business
                </span>
              </div>
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
