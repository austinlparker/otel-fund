import SearchFilter from "./SearchFilter";
import ClientHeader from "./ClientHeader";
import LogoTitle from "./LogoTitle";

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
            <LogoTitle />
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
