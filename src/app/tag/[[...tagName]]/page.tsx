import { notFound } from "next/navigation";
import BountyListContainer from "@/components/BountyListContainer";
import { getBountiesForTag, getAllTags } from "@/lib/data";
import { SortOption, Tag } from "@/types";
import Link from "next/link";
import DefaultHeader from "@/components/DefaultHeader";

interface TagPageProps {
  params: Promise<{ tagName?: string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function TagPage(props: TagPageProps) {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const tagName = params.tagName?.[0];
  const page =
    typeof searchParams.page === "string" ? parseInt(searchParams.page, 10) : 1;
  const sortOption = (searchParams.sort as SortOption) || "all";
  const searchQuery =
    typeof searchParams.q === "string" ? searchParams.q : undefined;
  const itemsPerPage = 10;

  if (!tagName) {
    // This is the tag index page
    const tags: (Tag & { _count: { bounties: number } })[] = await getAllTags();

    return (
      <>
        <DefaultHeader />
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-6">All Tags</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {tags.map((tag) => (
              <Link
                key={tag.id}
                href={`/tag/${encodeURIComponent(tag.name)}`}
                className="bg-white dark:bg-slate p-4 rounded-md shadow hover:shadow-md transition-shadow"
              >
                <h2 className="text-lg font-semibold text-pacific">
                  {tag.name}
                </h2>
                <p className="text-sm text-slate dark:text-fog">
                  {tag._count.bounties} bounties
                </p>
              </Link>
            ))}
          </div>
        </div>
      </>
    );
  }

  // This is an individual tag page
  const { bounties, totalCount } = await getBountiesForTag(
    tagName,
    (page - 1) * itemsPerPage,
    itemsPerPage,
    sortOption,
    searchQuery,
  );

  if (totalCount === 0) {
    notFound();
  }

  return (
    <>
      <DefaultHeader />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">
          Bounties tagged with &quot;{tagName}&quot;
        </h1>
        <BountyListContainer
          initialBounties={bounties}
          totalCount={totalCount}
          itemsPerPage={itemsPerPage}
          currentPage={page}
          currentSort={sortOption}
          tagName={tagName}
        />
      </div>
    </>
  );
}
