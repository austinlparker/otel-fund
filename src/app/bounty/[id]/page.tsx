import { notFound } from "next/navigation";
import BountyDetailView from "@/components/BountyDetailView";
import CommentSection from "@/components/CommentSection";
import { getBountyById, getComments } from "@/app/actions";
import { Suspense } from "react";
import DefaultHeader from "@/components/DefaultHeader";

export default async function BountyDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const bountyId = parseInt(await params.id, 10);
  const bounty = await getBountyById(bountyId);

  if (!bounty) {
    notFound();
  }

  return (
    <>
      <DefaultHeader />
      <div>
        <BountyDetailView bounty={bounty} />
        <Suspense fallback={<div>Loading comments...</div>}>
          <Comments bountyId={bountyId} />
        </Suspense>
      </div>
    </>
  );
}

async function Comments({ bountyId }: { bountyId: number }) {
  const comments = await getComments(bountyId);
  return <CommentSection bountyId={bountyId} initialComments={comments} />;
}
