import { notFound } from "next/navigation";
import BountyDetailView from "@/components/BountyDetailView";
import Modal from "@/components/Modal";
import { getBountyById } from "@/app/actions";
import { Suspense } from "react";
import CommentSection from "@/components/CommentSection";
import { Bounty } from "@/types";

export default async function BountyDetailModal(
  props: {
    params: Promise<{ id: string }>;
    //searchParams: { [key: string]: string | string[] | undefined };
  }
) {
  const params = await props.params;
  const bountyId = parseInt(params.id, 10);
  let bounty: Bounty | null;

  try {
    bounty = await getBountyById(bountyId);
  } catch (error) {
    console.error("Error fetching bounty:", error);
    return <div>Error: Failed to fetch bounty. Please try again later.</div>;
  }

  if (!bounty) {
    notFound();
  }
  //const closeHref = `/?${new URLSearchParams(searchParams as Record<string, string>).toString()}`;
  return (
    <Modal title={bounty.title}>
      <BountyDetailView bounty={bounty} />
      <Suspense fallback={<div>Loading comments...</div>}>
        <CommentSection bountyId={bountyId} initialComments={bounty.comments} />
      </Suspense>
    </Modal>
  );
}
