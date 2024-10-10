import { CommentWithReplies } from "@/types";
import ClientCommentSection from "./ClientCommentSection";

interface CommentSectionProps {
  bountyId: number;
  initialComments: CommentWithReplies[];
}

export default function CommentSection({
  bountyId,
  initialComments,
}: CommentSectionProps) {
  return (
    <div className="mt-6 bg-white dark:bg-slate rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4">Comments</h3>
      <ClientCommentSection
        bountyId={bountyId}
        initialComments={initialComments}
      />
    </div>
  );
}
