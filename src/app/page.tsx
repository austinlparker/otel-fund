import { Suspense } from "react";
import { getBounties } from "@/lib/data";
import { SortOption } from "@/types";
import BountyListContainer from "@/components/BountyListContainer";
import HomeHeader from "@/components/HomeHeader";

interface HomeProps {
  searchParams: Promise<{
    q?: string;
    sort?: string;
    page?: string;
    itemsPerPage?: string;
  }>;
}

export default async function Home(props: HomeProps) {
  const searchParams = await props.searchParams;
  const searchQuery = searchParams.q || "";
  const sortOption = (searchParams.sort as SortOption) || "all";
  const page = Math.max(1, parseInt(searchParams.page || "1", 10));
  const itemsPerPage = Math.max(
    1,
    parseInt(searchParams.itemsPerPage || "10", 10),
  );

  const { bounties, totalCount } = await getBounties(
    (page - 1) * itemsPerPage,
    itemsPerPage,
    sortOption,
    searchQuery,
  );

  return (
    <>
      <HomeHeader />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">All Bounties</h1>
        <Suspense fallback={<div>Loading bounties...</div>}>
          <BountyListContainer
            initialBounties={bounties}
            totalCount={totalCount}
            itemsPerPage={itemsPerPage}
            currentPage={page}
            currentSort={sortOption}
          />
        </Suspense>
      </div>
    </>
  );
}
